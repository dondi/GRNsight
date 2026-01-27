// TODO Likely a temporary location, while things are being moved to their "true" homes.
//      But placed here for now so that the true MVC cycle of grnState, updateApp, and the
//      controller code installed by setupHandlers can access them.

import { grnState } from "./grnstate";

import { stopLoadingIcon, startLoadingIcon } from "./update-app";

import { queryExpressionDatabase } from "./api/grnsight-api.js";
import { NETWORK_PPI_MODE, NETWORK_GRN_MODE } from "./constants.js";
import { displayExportWarnings } from "./warnings.js";
import { warnings } from "./export-warning-constants.js";
import { buildWorkbookTwoColumnMissingGenesWarnings } from "./two_column_sheets_warnings.js";

const EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

const isExpressionSheet = sheetName => {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.includes(suffix);
    });
};

const removeExpressionSuffix = sheetName => {
    let sheet = sheetName.split("_log2").join("").split("_log").join("");
    for (let suffix of EXPRESSION_SHEET_SUFFIXES) {
        sheet = sheet.split(suffix).join("");
    }
    return sheet;
};

const isDataValid = data => {
    if (data === undefined || data === null) {
        return false;
    }

    if (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0) {
        return false;
    }

    return true;
};

export const uploadState = {
    currentWorkbook: null,
};

export const upload = function () {
    // Values
    var TOOLTIP_SHOW_DELAY = 700;
    var TOOLTIP_HIDE_DELAY = 100;

    // Settings Stuff
    var styleLabelTooltips = function () {
        $(".info").tooltip({
            placement: "top",
            delay: { show: TOOLTIP_SHOW_DELAY, hide: TOOLTIP_HIDE_DELAY },
        });
    };

    styleLabelTooltips();

    $("#printGraph").click(function () {
        if (uploadState.currentWorkbook) {
            window.print();
        }
    });

    // Style of the tooltips when the user mouses over the label names
    $(".info").tooltip({
        placement: "top",
        delay: { show: 700, hide: 100 },
    });

    $("#warningsModal").on("hidden.bs.modal", function () {
        if ($("#warningsInfo").hasClass("in")) {
            $("#warningsInfo").removeClass("in");
        }
    });

    var flattenWorkbook = function (workbook, sheetType) {
        var result = $.extend(true, {}, workbook, { sheetType: sheetType });
        result.links.forEach(function (link) {
            link.source = link.source.index;
            link.target = link.target.index;
            delete link.weightElement;
        });
        return result;
    };

    var filenameWithExtension = function (suffix, extension) {
        var filename = $("#fileName").text();
        var currentExtension = filename.match(/\.[^\.]+$/);
        if (currentExtension && currentExtension.length) {
            filename = filename.substr(0, filename.length - currentExtension[0].length);
        }
        if (suffix) {
            filename = filename + "_" + suffix;
        }

        return filename + "." + extension;
    };

    const download = (workbook, route, extension, sheetType) => {
        const workbookToExport = flattenWorkbook(workbook, sheetType);
        const workbookFilename = filenameWithExtension(
            sheetType !== workbook.sheetType ? sheetType : "",
            extension
        );
        workbookToExport.filename = workbookFilename;

        const exportForm = $("<form></form>")
            .attr({
                method: "POST",
                action: $(".service-root").val() + "/" + route,
            })
            .append(
                $("<input>").attr({
                    type: "hidden",
                    name: "filename",
                    value: workbookFilename,
                })
            )
            .append(
                $("<input>").attr({
                    type: "hidden",
                    name: "workbook",
                    value: JSON.stringify(workbookToExport),
                })
            );

        $("body").append(exportForm);
        exportForm.submit();
        exportForm.remove();
    };

    const exportExcel = (route, extension, sheetType) => {
        const warnings = uploadState.currentWorkbook.exportSheets.warnings;

        if (!$(this).parent().hasClass("disabled")) {
            if (warnings.length > 0) {
                displayExportWarnings(warnings);
                $("#warningsModal").one("hidden.bs.modal", () => {
                    download(uploadState.currentWorkbook, route, extension, sheetType);
                });
            } else {
                download(uploadState.currentWorkbook, route, extension, sheetType);
            }
        }

        $("#exportExcelModal").modal("hide");
    };

    const updateOptimizationParameters = finalExportSheets => {
        let optimizationParameters = {
            data:
                grnState.mode === NETWORK_GRN_MODE
                    ? {
                          alpha: 0.02,
                          kk_max: 1,
                          MaxIter: 100000000,
                          TolFun: 0.000001,
                          MaxFunEval: 100000000,
                          TolX: 0.000001,
                          production_function: "Sigmoid",
                          L_curve: 0,
                          estimate_params: 1,
                          make_graphs: 1,
                          fix_P: 0,
                          fix_b: 0,
                          species: "Saccharomyces cerevisiae",
                          taxon_id: 559292,
                          workbookType: NETWORK_GRN_MODE,
                      }
                    : {
                          species: "Saccharomyces cerevisiae",
                          taxon_id: 559292,
                          workbookType: NETWORK_PPI_MODE,
                      },
        };
        if (grnState.mode === NETWORK_GRN_MODE) {
            const expression = Object.keys(finalExportSheets.expression);
            let expTimepoints =
                expression.length > 0
                    ? finalExportSheets.expression[expression[0]].timePoints
                    : null;
            expTimepoints = expTimepoints
                ? [...new Set(expTimepoints)].sort(function (a, b) {
                      return a - b;
                  })
                : null;
            const simTimepoints = expTimepoints
                ? Array.from(Array(expTimepoints[expTimepoints.length - 1] + 1).keys()).filter(
                      x => x % 5 === 0
                  )
                : null;
            const strain =
                expression.length > 0 ? expression.map(x => removeExpressionSuffix(x)) : null;
            if (expTimepoints) {
                optimizationParameters.data["expression_timepoints"] = expTimepoints;
            }
            if (strain) {
                optimizationParameters.data.Strain = strain;
            }
            if (simTimepoints) {
                optimizationParameters.data["simulation_timepoints"] = simTimepoints;
            }
        }
        return optimizationParameters;
    };

    // helper method for handleExpressionDataAndExport to reduce indentation
    const expressionDataHandler = (
        expressionData,
        sheet,
        route,
        extension,
        sheetType,
        finalExportSheets
    ) => {
        finalExportSheets.expression[sheet] = expressionData;
        if (finalExportSheets.expression[sheet]) {
            stopLoadingIcon();
            if (!Object.values(finalExportSheets.expression).includes(null)) {
                // we have all of the expression sheets so lets initilize the export process
                Object.keys(finalExportSheets.expression).forEach(sheet => {
                    // make sure that the sheets we queried are populated with the correct data
                    if (
                        !(
                            finalExportSheets.expression[sheet].data &&
                            finalExportSheets.expression[sheet].timePoints
                        )
                    ) {
                        // if the resulting query doesn't contains both the timePoint data and
                        // the gene data then don't export it. If not don't :)
                        finalExportSheets.expression[sheet] = null;
                    }
                });
                if (finalExportSheets["optimization_parameters"] === null) {
                    finalExportSheets["optimization_parameters"] =
                        updateOptimizationParameters(finalExportSheets);
                }
                grnState.workbook.exportSheets = finalExportSheets;
                exportExcel(route, extension, sheetType);
            }
        }
    };

    // helper method for handleExpressionDataAndExport and handleExportExcelButtonExport to avoid redundant code
    const expressionExportErrorHandler = error => {
        console.log(error.stack);
        console.log(error.name);
        console.log(error.message);
    };

    const handleExpressionDataAndExport = (
        route,
        extension,
        sheetType,
        source,
        finalExportSheets
    ) => {
        const hasExpressionData = Object.keys(finalExportSheets.expression).length > 0;
        if (!hasExpressionData) {
            // No expression sheets selected - proceed directly to export
            if (finalExportSheets["optimization_parameters"]) {
                finalExportSheets["optimization_parameters"] =
                    updateOptimizationParameters(finalExportSheets);
            }
            grnState.workbook.exportSheets = finalExportSheets;
            exportExcel(route, extension, sheetType);
            return;
        } else if (source === "userInput" && grnState.workbook.expression) {
            // make sure that the optimization parameters sheet is actually properly formatted
            if (finalExportSheets["optimization_parameters"]) {
                finalExportSheets["optimization_parameters"] =
                    updateOptimizationParameters(finalExportSheets);
            }
            grnState.workbook.exportSheets = finalExportSheets;
            exportExcel(route, extension, sheetType);
        } else {
            // expression source is from database so lets query her up
            for (let sheet in finalExportSheets.expression) {
                startLoadingIcon();
                const dataset = `${source}_${sheet.replace("_log2_expression", "")}`;
                queryExpressionDatabase({
                    type: "ExpressionTimePoints",
                    dataset,
                })
                    .then(function (timepointsResponse) {
                        queryExpressionDatabase({
                            type: "ExpressionData",
                            dataset,
                            genes: grnState.workbook.genes
                                .map(x => {
                                    return x.name;
                                })
                                .join(","),
                            timepoints: timepointsResponse[dataset],
                        })
                            .then(expressionData =>
                                expressionDataHandler(
                                    expressionData,
                                    sheet,
                                    route,
                                    extension,
                                    sheetType,
                                    finalExportSheets
                                )
                            )
                            .catch(error => expressionExportErrorHandler(error));
                    })
                    .catch(error => expressionExportErrorHandler(error));
            }
        }
    };

    const determineChosenSheets = () => {
        const workbookSheets = $("input[name=workbookSheets]:checked");
        let chosenSheets = [];

        workbookSheets.each(function () {
            const value = $(this).val();

            if (value === "select all") {
                chosenSheets = [];
                $("input[name=workbookSheets]").each(function () {
                    const sheetValue = $(this).val();
                    if (sheetValue !== "select all") {
                        chosenSheets.push(sheetValue);
                    }
                });
                return false;
            }
            chosenSheets.push(value);
        });
        return chosenSheets;
    };

    const prepareFinalExportSheets = (chosenSheets, source) => {
        const finalExportSheets = {
            networks: {},
            expression: {},
            two_column_sheets: {},
            warnings: [...grnState.workbook.warnings],
        };

        const twoColumnSheets = grnState.workbook.twoColumnSheets
            ? Object.keys(grnState.workbook.twoColumnSheets)
            : [];

        for (let sheet of chosenSheets) {
            if (sheet === "network_optimized_weights") {
                finalExportSheets.networks[sheet] = grnState.workbook.networkOptimizedWeights;
            } else if (sheet === "network") {
                finalExportSheets.networks[sheet] = grnState.workbook.network;
            } else if (sheet === "network_weights") {
                finalExportSheets.networks[sheet] = grnState.workbook.network; // network_weights is identical to network
            } else if (sheet === "optimization_diagnostics") {
                // Get the additional Sheets
                finalExportSheets[sheet] = grnState.workbook.meta2;
            } else if (sheet === "optimization_parameters") {
                finalExportSheets[sheet] = source === "userInput" ? grnState.workbook.meta : null;
            } else if (isExpressionSheet(sheet)) {
                finalExportSheets.expression[sheet] =
                    source === "userInput" ? grnState.workbook.expression[sheet] : null;
            } else {
                if (source === "userInput" && twoColumnSheets.indexOf(sheet) !== -1) {
                    finalExportSheets.two_column_sheets[sheet] =
                        grnState.workbook.twoColumnSheets[sheet];
                } else {
                    // Generate the two column sheet specified
                    if (
                        source === "userInput" &&
                        Object.keys(finalExportSheets.two_column_sheets).includes(sheet)
                    ) {
                        finalExportSheets.two_column_sheets[sheet] =
                            grnState.workbook.two_column_sheets[sheet];
                    } else if (sheet === "threshold_b") {
                        finalExportSheets.two_column_sheets[sheet] = {
                            data: {},
                            errors: [],
                            warnings: [],
                        };
                        for (let g of grnState.workbook.genes) {
                            finalExportSheets.two_column_sheets[sheet].data[g.name] = 0;
                        }
                    } else {
                        finalExportSheets.two_column_sheets[sheet] = null;
                    }
                }
            }
        }

        return finalExportSheets;
    };

    const fetchTwoColumnSheets = async (finalExportSheets, chosenSheets) => {
        const twoColumnSheetType = {
            production_rates: "ProductionRates",
            degradation_rates: "DegradationRates",
        };

        const chosenTwoColumnSheets = Object.keys(twoColumnSheetType).filter(sheet =>
            chosenSheets.includes(sheet)
        );

        const missingTwoColumnSheets = [];

        for (let sheet of chosenTwoColumnSheets) {
            const sheetData = finalExportSheets.two_column_sheets[sheet];
            if (
                sheetData === null ||
                (sheetData && Object.keys(sheetData.data || {}).length === 0)
            ) {
                missingTwoColumnSheets.push(sheet);
            } else {
                finalExportSheets.two_column_sheets[sheet] = sheetData;
            }
        }

        if (missingTwoColumnSheets.length > 0) {
            await Promise.all(
                missingTwoColumnSheets.map(async sheet => {
                    const genes = grnState.workbook.genes.map(g => g.name).join(",");
                    try {
                        const response = await queryExpressionDatabase({
                            type: twoColumnSheetType[sheet],
                            genes,
                        });
                        finalExportSheets.two_column_sheets[sheet] = {
                            data: response,
                            errors: [],
                            warnings: [],
                        };
                    } catch (error) {
                        expressionExportErrorHandler(error);
                        finalExportSheets.two_column_sheets[sheet] = {
                            data: {},
                            errors: [error],
                            warnings: [],
                        };
                    }
                })
            );
        }

        const exportWorkbookView = {
            genes: grnState.workbook.genes,
            twoColumnSheets: finalExportSheets.two_column_sheets,
        };

        const exportWarnings = buildWorkbookTwoColumnMissingGenesWarnings(
            exportWorkbookView,
            warnings,
            chosenTwoColumnSheets
        );

        const existingDescriptions = new Set(
            finalExportSheets.warnings.map(w => w.errorDescription)
        );
        const uniqueWarnings = exportWarnings.filter(
            w => !existingDescriptions.has(w.errorDescription)
        );
        finalExportSheets.warnings.push(...uniqueWarnings);

        return finalExportSheets;
    };

    const handleExportExcelButtonExport = async (route, extension, sheetType, source) => {
        grnState.workbook.exportNetworkType = sheetType;

        const chosenSheets = determineChosenSheets();
        let finalExportSheets = prepareFinalExportSheets(chosenSheets, source);
        finalExportSheets = await fetchTwoColumnSheets(finalExportSheets, chosenSheets);

        handleExpressionDataAndExport(route, extension, sheetType, source, finalExportSheets);
    };

    const determineWorkbookType = function () {
        const workbookSheets = $("input[name=workbookSheets]:checked");
        for (const [key, value] of Object.entries(workbookSheets)) {
            if (!isNaN(parseInt(key, 10))) {
                if (
                    value.value === "network_weights" ||
                    value.value === "network_optimized_weights"
                ) {
                    return "weighted";
                }
            }
        }
        return "unweighted";
    };

    var performExport = function (route, extension, sheetType, source) {
        return async function (e) {
            if (e) {
                e.preventDefault();
            }
            // Deleted event parameter
            if (route === "export-to-excel" && source) {
                await handleExportExcelButtonExport(
                    route,
                    extension,
                    determineWorkbookType(),
                    source
                );
            } else {
                if (!$(this).parent().hasClass("disabled")) {
                    download(uploadState.currentWorkbook, route, extension, sheetType);
                }
            }
        };
    };

    const createHTMLforGRNForm = () => {
        const sources = [
            ...new Set(
                grnState.database.expressionDatasets.map(s => s.slice(0, s.lastIndexOf("_")))
            ),
        ];
        let result = `
            <form id='exportExcelForm'>
                <div class='form-group export-form-group'>
                    <p id='exportExcelExpressionSources'></p>
                    <ul class='export-radio-group' id='export-excel-expression-source-list' style="list-style-type:none;">
                    
        `;
        // Add "None" option
        result += `
                    <li>
                        <input type='radio' name='expressionSource' checked="true" value="none" id='exportExcelExpressionSource-noneRadio' class='export-radio' />
                        <label for='exportExcelExpressionSource-noneRadio' id='exportExcelExpressionSource-none' class='export-radio-label'>None</label>
                    </li>
    `;
        if (Object.keys(grnState.workbook.expression).length > 0) {
            result += `
                        <li>
                            <input type='radio' name='expressionSource' checked="true" value="userInput" id='exportExcelExpressionSource-userInputRadio' class='export-radio' />
                            <label for='exportExcelExpressionSource-userInputRadio' id='exportExcelExpressionSource-userInput' class='export-radio-label'></label>
                        </li>
            `;
        }
        for (let [index, source] of sources.entries()) {
            if (grnState.nodeColoring.topDataset) {
                const isChecked = grnState.nodeColoring.topDataset
                    .toLowerCase()
                    .startsWith(source.toLowerCase())
                    ? `checked="true"`
                    : "";
                result += `
                            <li>
                                <input type='radio' name='expressionSource' ${isChecked} value="${source}" id='exportExcelExpressionSource-${source}Radio' class='export-radio' />
                                <label for='exportExcelExpressionSource-${source}Radio' id='exportExcelExpressionSource-${source}' class='export-radio-label'>${source}</label>
                            </li>
                `;
            } else {
                result += `
                            <li>
                                <input type='radio' name='expressionSource' value="${source}" id='exportExcelExpressionSource-${source}Radio' class='export-radio' />
                                <label for='exportExcelExpressionSource-${source}Radio' id='exportExcelExpressionSource-${source}' class='export-radio-label'>${source}</label>
                            </li>
                `;
            }
        }
        result += `
                    </ul>
                </div>
                <div class='form-group export-form-group'>
                    <p id='exportExcelWorkbookSheets'></p>
                    <ul class='exportExcelWorkbookSheets' id='export-excel-workbook-sheet-list' style="list-style-type:none;"></ul>
                </div>
            </form>
        `;
        return result;
    };

    const createHTMLforSheets = source => {
        $(".export-excel-workbook-sheet-option").remove();
        // check if user updated data is selected
        let result = `
            <li class=\'export-excel-workbook-sheet-option export-excel-workbook-sheet-option-subheader\'>
                <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"select all\" id=\'exportExcelWorkbookSheet-All\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-All\' id=\'exportExcelWorkbookSheet-All-label\' class=\'export-checkbox-label\' >
                    Select All
                </label>
            </li>

            <p class=\'export-excel-workbook-sheet-option-subheader\'> Network Sheets </p>
            `;
        const optionalAdditionalSheets = [
            "optimization_parameters",
            "production_rates",
            "degradation_rates",
            "threshold_b",
        ];
        let networks = [
            [isDataValid(grnState.workbook.network), "network"],
            [isDataValid(grnState.workbook.networkOptimizedWeights), "network_optimized_weights"],
            [isDataValid(grnState.workbook.networkWeights), "network_weights"],
        ]; // network_weights is always available if network is available
        // networks = networks.filter(x => x !== false);
        let additionalsheets = grnState.workbook.twoColumnSheets
            ? [
                  ...Object.keys(grnState.workbook.twoColumnSheets),
                  grnState.workbook.meta2 !== undefined && "optimization_diagnostics",
              ]
            : [grnState.workbook.meta2 !== undefined && "optimization_diagnostics"];
        additionalsheets = additionalsheets.filter(
            sheet => sheet && -1 !== optionalAdditionalSheets.indexOf(sheet)
        );
        additionalsheets = [...optionalAdditionalSheets, ...additionalsheets].sort();
        additionalsheets = [...new Set(additionalsheets)];
        for (let n of networks) {
            const state = n[0];
            const network = n[1];
            result =
                result +
                `
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' name=\'workbookSheets\' ${state ? 'checked="true"' : ""} value=\"${network}\" id=\'exportExcelWorkbookSheet-${network}\' class=\'export-checkbox\' ${state ? "" : "disabled"}/>
                <label for=\'exportExcelWorkbookSheet-${network}\' id=\'exportExcelWorkbookSheet-${network}-label\' class=\'export-checkbox-label\' >
                    ${network}
                </label>
            </li>
            `;
        }
        if (source === "userInput") {
            result += grnState.workbook.expressionNames
                ? "<p class=\'export-excel-workbook-sheet-option-subheader\'> Expression Sheets </p>"
                : "";
            if (grnState.workbook.expressionNames) {
                for (let expression of grnState.workbook.expressionNames) {
                    result += `
                    <li class=\'export-excel-workbook-sheet-option\'>
                        <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"${expression}\" id=\'exportExcelWorkbookSheet-${expression}\' class=\'export-checkbox\' />
                        <label for=\'exportExcelWorkbookSheet-${expression}\' id=\'exportExcelWorkbookSheet-${expression}-label\' class=\'export-checkbox-label\' >
                            ${expression}
                        </label>
                    </li>
                    `;
                }
            }
            result +=
                "<p class=\'export-excel-workbook-sheet-option-subheader\'> Additional Sheets </p>";
            for (let sheet of additionalsheets) {
                result =
                    result +
                    `
                <li class=\'export-excel-workbook-sheet-option\'>
                    <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"${sheet}\" id=\'exportExcelWorkbookSheet-${sheet}\' class=\'export-checkbox\' />
                    <label for=\'exportExcelWorkbookSheet-${sheet}\' id=\'exportExcelWorkbookSheet-${sheet}-label\' class=\'export-checkbox-label\' >
                        ${sheet}
                    </label>
                </li>
                `;
            }
        } else {
            // if the source is from a database
            result +=
                "<p class=\'export-excel-workbook-sheet-option-subheader\'> Expression Sheets </p>";
            const expressionSheets = grnState.database.expressionDatasets.filter(s =>
                s.includes(source)
            );
            for (let sheet of expressionSheets) {
                result += `
                <li class=\'export-excel-workbook-sheet-option\'>
                    <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"${sheet.slice(sheet.lastIndexOf("_") + 1) + "_log2_expression"}\" id=\'exportExcelWorkbookSheet-${sheet}\' class=\'export-checkbox\' />
                    <label for=\'exportExcelWorkbookSheet-${sheet}\' id=\'exportExcelWorkbookSheet-${sheet}-label\' class=\'export-checkbox-label\' >
                        ${sheet.slice(sheet.lastIndexOf("_") + 1) + "_log2_expression"}
                    </label>
                </li>`;
            }

            result +=
                "<p class=\'export-excel-workbook-sheet-option-subheader\'> Additional Sheets </p>";
            for (let sheet of additionalsheets) {
                result += `
                <li class=\'export-excel-workbook-sheet-option\'>
                    <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"${sheet}\" id=\'exportExcelWorkbookSheet-${sheet}\' class=\'export-checkbox\' />
                    <label for=\'exportExcelWorkbookSheet-${sheet}\' id=\'exportExcelWorkbookSheet-${sheet}-label\' class=\'export-checkbox-label\' >
                        ${sheet}
                    </label>
                </li>
                `;
            }
            result += `
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        }
        return result;
    };

    const createHTMLforModalButtons = () => {
        return `
            <div id=\'exportExcelFooter\' class=\'modal-footer-div\'>
                <div>
                    <input type=\'button\' class=\'btn btn-default\' id=\'Export-Excel-Button\' />
                    <input type=\'button\' class=\'btn btn-default\' data-dismiss=\'modal\' value=\'Cancel\'  />
                <div>
            </div>
        `;
    };

    const createHTMLforProteinProteinPhysicalInteractionForm = () => {
        $(".export-excel-workbook-sheet-option").remove();
        // check if user updated data is selected
        let result = `
            <form id=\'exportExcelForm\'>
                <div class=\'form-group export-form-group\'>
                    <p id=\'exportExcelWorkbookSheets\'></p>
                    <ul class=\'exportExcelWorkbookSheets\' id=\'export-excel-workbook-sheet-list\' style=\"list-style-type:none;\">
                        <p class=\'export-excel-workbook-sheet-option-subheader\'> Network Sheets </p>
                        <li class=\'export-excel-workbook-sheet-option\'>
                            <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"network\" id=\'exportExcelWorkbookSheet-network\' class=\'export-checkbox\'/>
                            <label for=\'exportExcelWorkbookSheet-network\' id=\'exportExcelWorkbookSheet-network-label\' class=\'export-checkbox-label\' >
                                network
                            </label>
                        </li>
                        <p class=\'export-excel-workbook-sheet-option-subheader\'> Additional Sheets </p>
                        <li class=\'export-excel-workbook-sheet-option\'>
                            <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"optimization_parameters\" id=\'exportExcelWorkbookSheet-optimization_parameters\' class=\'export-checkbox\' />
                            <label for=\'exportExcelWorkbookSheet-optimization_parameters\' id=\'exportExcelWorkbookSheet-optimization_parameters-label\' class=\'export-checkbox-label\' >
                                optimization_parameters
                            </label>
                        </li>
                    </ul>
                </div>
            </form>`;
        return result;
    };

    var handleWorkbookSheetCheckboxBehaviour = () => {
        $("input[name=workbookSheets]")
            .not($("#exportExcelWorkbookSheet-All"))
            .on("click", () => {
                const selectAll = $("#exportExcelWorkbookSheet-All");
                const allSheets = $("input[name=workbookSheets]");
                if (selectAll[0].checked) {
                    for (let i in allSheets) {
                        if (typeof allSheets[i] === "object") {
                            if (allSheets[i].checked !== selectAll[0].checked) {
                                selectAll[0].checked = false;
                            }
                        }
                    }
                }
                let anyExpressionChecked = false;
                for (let i in allSheets) {
                    if (
                        typeof allSheets[i] === "object" &&
                        allSheets[i].id !== "exportExcelWorkbookSheet-All" &&
                        allSheets[i].value &&
                        allSheets[i].value.includes("expression") &&
                        allSheets[i].checked
                    ) {
                        anyExpressionChecked = true;
                        break;
                    }
                }
                if (!anyExpressionChecked) {
                    $("#exportExcelExpressionSource-noneRadio").prop("checked", true);
                }
            });
        $("#exportExcelWorkbookSheet-All").on("click", () => {
            const allSheets = $("input[name=workbookSheets]").not(":disabled");
            const selectAll = $("#exportExcelWorkbookSheet-All");
            for (let i in allSheets) {
                if (typeof allSheets[i] === "object") {
                    allSheets[i].checked = selectAll[0].checked;
                }
            }
        });
    };

    const handleExpressionSheetsFromSource = function (source) {
        $("#export-excel-workbook-sheet-list").append(createHTMLforSheets(source));
        handleWorkbookSheetCheckboxBehaviour();
        $("#Export-Excel-Button").off("click");
        $("#Export-Excel-Button").on(
            "click",
            performExport("export-to-excel", "xlsx", null, source)
        );
    };
    const handleExportExcelModal = function () {
        if (grnState.mode === NETWORK_GRN_MODE) {
            $("#exportExcelForm").remove();
            $("#exportExcelFooter").remove();
            $("#exportExcelQuestions-containter").append(createHTMLforGRNForm);
            $("#exportExcelFooter-container").append(createHTMLforModalButtons());
            $("#Export-Excel-Button").prop("value", "Export Workbook");
            $("#exportExcelExpressionSources").html("Select the Expression Data Source:");
            $("#exportExcelExpressionSource-userInput").html(grnState.name);
            $("#exportExcelWorkbookSheets").html("Select Workbook Sheets to Export:");
            let source = $("input[name=expressionSource]:checked")[0].value;
            $("#exportExcelForm").on("change", function () {
                const selectedValue = $("input[name=expressionSource]:checked")[0].value;
                if (selectedValue !== source) {
                    source = selectedValue;
                    $(".export-excel-workbook-sheet-option-subheader").remove();
                    handleExpressionSheetsFromSource(source);
                }
            });
            handleExpressionSheetsFromSource(source);
        } else if (grnState.mode === NETWORK_PPI_MODE) {
            const source = "userInput";
            $("#exportExcelForm").remove();
            $("#exportExcelFooter").remove();
            $("#exportExcelQuestions-containter").append(
                createHTMLforProteinProteinPhysicalInteractionForm
            );
            $("#exportExcelFooter-container").append(createHTMLforModalButtons());
            $("#Export-Excel-Button").prop("value", "Export Workbook");
            $("#exportExcelWorkbookSheets").html("Select Workbook Sheets to Export:");
            handleWorkbookSheetCheckboxBehaviour();
            $("#Export-Excel-Button").off("click");
            $("#Export-Excel-Button").on(
                "click",
                performExport("export-to-excel", "xlsx", null, source)
            );
        }
    };

    var displayExportExcelModal = function () {
        handleExportExcelModal();
        // $("#Export-Excel-Button-Continue").on("click", () => handleExportExcelButtonContinue());
        $("#exportExcelModal").modal("show");
    };

    var performExcelExport = function () {
        return function () {
            if (!$(this).parent().hasClass("disabled")) {
                displayExportExcelModal();
            }
        };
    };

    $("#exportAsUnweightedSif").on("click", performExport("export-to-sif", "sif", "unweighted"));
    $("#exportAsWeightedSif").on("click", performExport("export-to-sif", "sif", "weighted"));
    $("#exportAsUnweightedGraphMl").on(
        "click",
        performExport("export-to-graphml", "graphml", "unweighted")
    );
    $("#exportAsWeightedGraphMl").on(
        "click",
        performExport("export-to-graphml", "graphml", "weighted")
    );
    $("#exportAsExcel").on("click", performExcelExport());
};
