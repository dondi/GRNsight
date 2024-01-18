// TODO Likely a temporary location, while things are being moved to their "true" homes.
//      But placed here for now so that the true MVC cycle of grnState, updateApp, and the
//      controller code installed by setupHandlers can access them.

/* eslint-disable max-len */
import { grnState } from "./grnstate";


import {
    stopLoadingIcon,
    startLoadingIcon
} from "./update-app";

import { queryExpressionDatabase } from "./api/grnsight-api.js";


const EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

const isExpressionSheet = (sheetName) => {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.includes(suffix);
    });
};

const removeExpressionSuffix = (sheetName) => {
    let sheet = sheetName.split("_log2").join("").split("_log").join("");
    for (let suffix of EXPRESSION_SHEET_SUFFIXES) {
        sheet = sheet.split(suffix).join("");
    }
    return sheet;
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
            delay: { show: TOOLTIP_SHOW_DELAY, hide: TOOLTIP_HIDE_DELAY }
        });
    };

    styleLabelTooltips();

    $("#printGraph").click(function () {
        if (!$(".startDisabled").hasClass("disabled")) {
            window.print();
        }
    });

    // Style of the tooltips when the user mouses over the label names
    $(".info").tooltip({
        placement: "top",
        delay: { show: 700, hide: 100 }
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

    const exportExcel = (route, extension, sheetType) => {
        if (!$(this).parent().hasClass("disabled")) {
            var workbookToExport = flattenWorkbook(uploadState.currentWorkbook, sheetType);
            var workbookFilename = filenameWithExtension(sheetType !== uploadState.currentWorkbook.sheetType ?
                sheetType : "", extension);
            workbookToExport.filename = workbookFilename;
            var exportForm = $("<form></form>").attr({
                method: "POST",
                action: $(".service-root").val() + "/" + route
            }).append($("<input></input>").attr({
                type: "hidden",
                name: "filename",
                value: workbookFilename
            })).append($("<input></input>").attr({
                type: "hidden",
                name: "workbook",
                value: JSON.stringify(workbookToExport)
            }));
            $("body").append(exportForm);
            exportForm.submit();
            exportForm.remove();
        }
        $("#exportExcelModal").modal("hide");
    };

    const updateOptimizationParameters = (finalExportSheets) => {
        let optimizationParameters = {
            data: grnState.mode === "grn" ? {
                alpha: 0.002,
                "kk_max": 1,
                MaxIter: 100000000,
                TolFun: 0.000001,
                MaxFunEval: 100000000,
                TolX: 0.000001,
                "production_function": "Sigmoid",
                "L_curve": 0,
                "estimate_params": 1,
                "make_graphs": 1,
                "fix_P": 0,
                "fix_b": 0,
                species: "Saccharomyces cerevisiae",
                "taxon_id":559292,
                workbookType: "grn"
            } : {
                species: "Saccharomyces cerevisiae",
                "taxon_id":559292,
                workbookType: "protein-protein-physical-interaction"
            }
        };
        if (grnState.mode === "grn") {
            const expression = Object.keys(finalExportSheets.expression);
            let expTimepoints = expression.length > 0 ? finalExportSheets.expression[expression[0]].timePoints : null;
            expTimepoints = expTimepoints ? [...(new Set(expTimepoints))].sort(function (a, b) {
                return a - b;
            }) : null;
            const simTimepoints = expTimepoints ? Array.from(Array(expTimepoints[expTimepoints.length - 1] + 1).keys()).filter(x => x % 5 === 0) : null;
            const strain = expression.length > 0 ? expression.map(x => removeExpressionSuffix(x)) : null;
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

    const handleExpressionDataAndExport = (route, extension, sheetType, source, finalExportSheets) => {
        if (source === "userInput" && grnState.workbook.expression) {
            // make sure that the optimization parameters sheet is actually properly formatted
            if (finalExportSheets["optimization_parameters"]) {
                finalExportSheets["optimization_parameters"] = updateOptimizationParameters(finalExportSheets);
            }
            grnState.workbook.exportSheets = finalExportSheets;
            exportExcel(route, extension, sheetType);
        } else {
            // expression source is from database so lets query her up
            for (let sheet in finalExportSheets.expression) {
                startLoadingIcon();
                const dataset = `${source}_${sheet.replace("_log2_expression", "")}`;
                console.log('in handleExpressionDataAndExport')
                queryExpressionDatabase({
                  type: "ExpressionTimePoints",
                  dataset,
                })
                  .then(function(timepointsResponse) {
                    queryExpressionDatabase({
                      type: "ExpressionData",
                      dataset,
                      genes: grnState.workbook.genes
                        .map((x) => {
                          return x.name;
                        })
                        .join(","),
                      timepoints: timepointsResponse[dataset],
                    })
                      .then((expressionData) =>
                        expressionDataHandler(expressionData, sheet)
                      )
                      .catch((error) => expressionExportErrorHandler(error));
                  })
                  .catch((error) => expressionExportErrorHandler(error));
            }
        }
    };

    const expressionDataHandler = (expressionData, sheet) => {
        console.log('in expression data handler')
        finalExportSheets.expression[sheet] = expressionData;
        if (finalExportSheets.expression[sheet]) {
            stopLoadingIcon();
            if (!Object.values(finalExportSheets.expression).includes(null)) {
                // we have all of the expression sheets so lets initilize the export process
                Object.keys(finalExportSheets.expression).forEach((sheet) => {
                    // make sure that the sheets we queried are populated with the correct data
                    if (!(finalExportSheets.expression[sheet].data && finalExportSheets.expression[sheet].timePoints)) {
                        // if the resulting query doesn't contains both the timePoint data and
                        // the gene data then don't export it. If not don't :)
                        finalExportSheets.expression[sheet] = null;
                    }
                });
                if (finalExportSheets["optimization_parameters"] === null) {
                    finalExportSheets["optimization_parameters"] = updateOptimizationParameters(finalExportSheets);
                }
                grnState.workbook.exportSheets = finalExportSheets;
                exportExcel(route, extension, sheetType);
            }
        }
    }

    const handleExportExcelButtonExport = (route, extension, sheetType, source) => {
        grnState.workbook.exportNetworkType = sheetType;
        const workbookSheets = $("input[name=workbookSheets]:checked");
        var chosenSheets = [];
        for (const [key, value] of Object.entries(workbookSheets)) {
            if (!isNaN(parseInt(key, 10))) {
                if (value.value === "select all") {
                    const allWorkbookSheets = $("input[name=workbookSheets]");
                    chosenSheets = [];
                    for (const [k, v] of Object.entries(allWorkbookSheets)) {
                        if (!isNaN(parseInt(k, 10))) {
                            if (v.value !== "select all") {
                                chosenSheets.push(v.value);
                            }
                        }
                    }
                    break;
                } else {
                    chosenSheets.push(value.value);
                }
            }
        }
        const finalExportSheets = {
            networks: {},
            expression: {},
            "two_column_sheets": {}
        };
        const twoColumnSheets = grnState.workbook.twoColumnSheets ? Object.keys(grnState.workbook.twoColumnSheets) : [];
        // Collect all of the Sheets to be exported
        for (let sheet of chosenSheets) {
            if (sheet === "network_optimized_weights") {
                finalExportSheets.networks[sheet] = grnState.workbook.networkOptimizedWeights;
            } else if (sheet === "network") {
                finalExportSheets.networks[sheet] = grnState.workbook.network;
            } else if (sheet === "network_weights") {
                finalExportSheets.networks[sheet] = grnState.workbook.networkWeights;
            } else if (sheet === "optimization_diagnostics") { // Get the additional Sheets
                finalExportSheets[sheet] = grnState.workbook.meta2;
            } else if (sheet === "optimization_parameters") {
                finalExportSheets[sheet] = source === "userInput" ? grnState.workbook.meta : null;
            } else if (isExpressionSheet(sheet)) {
                finalExportSheets.expression[sheet] = source === "userInput" ? grnState.workbook.expression[sheet] : null;
            } else {
                if (source === "userInput" && twoColumnSheets.indexOf(sheet) !== -1) {
                    finalExportSheets.two_column_sheets[sheet] = grnState.workbook.twoColumnSheets[sheet];
                } else {
                    // Generate the two column sheet specified
                    if (source === "userInput" && Object.keys(finalExportSheets.two_column_sheets).includes(sheet)) {
                        finalExportSheets.two_column_sheets[sheet] = grnState.workbook.two_column_sheets[sheet];
                    } else if (sheet === "threshold_b") {
                        finalExportSheets.two_column_sheets[sheet] = {
                            data: {},
                            errors: [],
                            warnings: []
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
        const twoColumnSheetType = { "production_rates": "ProductionRates", "degradation_rates": "DegradationRates" };
        const twoColumnQuerySheets = Object.keys(finalExportSheets.two_column_sheets).filter(x => finalExportSheets.two_column_sheets[x] === null);
        if (twoColumnQuerySheets.length > 0) {
            // if we need to query production rates and degradation rates
            for (let sheet of twoColumnQuerySheets) {
                if (finalExportSheets.two_column_sheets[sheet] === null) {
                    let result = {
                        data: {},
                        errors: [],
                        warnings: []
                    };
                    let genes = [];
                    for (let g of grnState.workbook.genes) {
                        genes.push(g.name);
                    }

                    queryExpressionDatabase({
                      type: twoColumnSheetType[sheet],
                      genes: grnState.workbook.genes
                        .map((x) => {
                          return x.name;
                        })
                        .join(","),
                    })
                      .then(function(response) {
                        result.data = response;
                        finalExportSheets.two_column_sheets[sheet] = result;
                        if (
                          !Object.values(
                            finalExportSheets.two_column_sheets
                          ).includes(null)
                        ) {
                          // if we got all of the two column sheets, then proceed with export
                          handleExpressionDataAndExport(
                            route,
                            extension,
                            sheetType,
                            source,
                            finalExportSheets
                          );
                        }
                      })
                      .catch(error => expressionExportErrorHandler(error));

                }
            }
        } else {
            // you already have all of your two column sheet, so move through expressi5on
            handleExpressionDataAndExport(route, extension, sheetType, source, finalExportSheets);
        }
    };

    const expressionExportErrorHandler = (error) => {
      console.log(error.stack);
      console.log(error.name);
      console.log(error.message);
    };

    const determineWorkbookType = function () {
        const workbookSheets = $("input[name=workbookSheets]:checked");
        for (const [key, value] of Object.entries(workbookSheets)) {
            if (!isNaN(parseInt(key, 10))) {
                if (value.value === "network_weights" || value.value === "network_optimized_weights") {
                    return "weighted";
                }
            }
        }
        return "unweighted";
    };

    var performExport = function (route, extension, sheetType, source) {
        return function () {
            // Deleted event parameter
            if (route === "export-to-excel" && source) {
                handleExportExcelButtonExport(route, extension, determineWorkbookType(), source);
            } else {
                if (!$(this).parent().hasClass("disabled")) {
                    var workbookToExport = flattenWorkbook(uploadState.currentWorkbook, sheetType);
                    var workbookFilename = filenameWithExtension(sheetType !== uploadState.currentWorkbook.sheetType ?
                        sheetType : "", extension);
                    workbookToExport.filename = workbookFilename;

                    var exportForm = $("<form></form>").attr({
                        method: "POST",
                        action: $(".service-root").val() + "/" + route
                    }).append($("<input></input>").attr({
                        type: "hidden",
                        name: "filename",
                        value: workbookFilename
                    })).append($("<input></input>").attr({
                        type: "hidden",
                        name: "workbook",
                        value: JSON.stringify(workbookToExport)
                    }));
                    $("body").append(exportForm);
                    exportForm.submit();
                    exportForm.remove();
                }

            }
        };
    };

    const createHTMLforGRNForm = () => {
        const sources = [...new Set(grnState.database.expressionDatasets.map(s => s.slice(0, s.lastIndexOf("_"))))];
        let result = `
        <form id=\'exportExcelForm\'>
            <div class=\'form-group export-form-group\'>
                <p id=\'exportExcelExpressionSources\'> </p>
                <ul class=\'export-radio-group\' id=\'export-excel-expression-source-list\' style=\"list-style-type:none;\">
                    <li>
                        <input type=\'radio\' name=\'expressionSource\' checked=\"true\" value=\"userInput\" id=\'exportExcelExpressionSource-userInputRadio\' class=\'export-radio\' />
                        <label for=\'exportExcelExpressionSource-userInputRadio\' id=\'exportExcelExpressionSource-userInput\' class=\'export-radio-label\'> </label>
                    </li>`;
        for (let source of sources) {
            result += `
            <li>
                <input type=\'radio\' name=\'expressionSource\' value=\"${source}\" id=\'exportExcelExpressionSource-${source}Radio\' class=\'export-radio\' />
                <label for=\'exportExcelExpressionSource-${source}Radio\' id=\'exportExcelExpressionSource-${source}\' class=\'export-radio-label\'>${source}</label>
            </li>`;
        }

        result += `</ul>
            </div>
            <div class=\'form-group export-form-group\'>
                <p id=\'exportExcelWorkbookSheets\'></p>
                <ul class=\'exportExcelWorkbookSheets\' id=\'export-excel-workbook-sheet-list\' style=\"list-style-type:none;\"> </ul>
            </div>
        </form>`;

        return result;

    };

    const createHTMLforSheets = (source) => {
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
        const optionalAdditionalSheets = ["optimization_parameters", "production_rates", "degradation_rates", "threshold_b"];
        let networks = [
            [grnState.workbook.network !== undefined, "network"],
            [grnState.workbook.networkOptimizedWeights !== undefined, "network_optimized_weights"],
            [grnState.workbook.networkWeights !== undefined, "network_weights"]];
        // networks = networks.filter(x => x !== false);
        let additionalsheets = grnState.workbook.twoColumnSheets ? [
            ...Object.keys(grnState.workbook.twoColumnSheets),
            (grnState.workbook.meta2 !== undefined && "optimization_diagnostics")
        ] : [
            (grnState.workbook.meta2 !== undefined && "optimization_diagnostics")
        ];
        additionalsheets = additionalsheets.filter(x => (x !== false && -1 !== optionalAdditionalSheets.indexOf(x)));
        additionalsheets = [...optionalAdditionalSheets, ...additionalsheets].sort();
        additionalsheets = [...(new Set(additionalsheets))];
        for (let n of networks) {
            const state = n[0];
            const network = n[1];
            result = result + `
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' name=\'workbookSheets\' checked=\"${state}\" value=\"${network}\" id=\'exportExcelWorkbookSheet-${network}\' class=\'export-checkbox\' ${!state && "disabled"}/>
                <label for=\'exportExcelWorkbookSheet-${network}\' id=\'exportExcelWorkbookSheet-${network}-label\' class=\'export-checkbox-label\' >
                    ${network}
                </label>
            </li>
            `;
        }
        if (source === "userInput") {
            result += grnState.workbook.expressionNames ? "<p class=\'export-excel-workbook-sheet-option-subheader\'> Expression Sheets </p>" : "";
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
            result += "<p class=\'export-excel-workbook-sheet-option-subheader\'> Additional Sheets </p>";
            for (let sheet of additionalsheets) {
                result = result + `
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
            result += "<p class=\'export-excel-workbook-sheet-option-subheader\'> Expression Sheets </p>";
            const expressionSheets = grnState.database.expressionDatasets.filter(s => s.includes(source));
            for (let sheet of expressionSheets) {
                result += `
                <li class=\'export-excel-workbook-sheet-option\'>
                    <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"${sheet.slice(sheet.lastIndexOf("_") + 1) + "_log2_expression"}\" id=\'exportExcelWorkbookSheet-${sheet}\' class=\'export-checkbox\' />
                    <label for=\'exportExcelWorkbookSheet-${sheet}\' id=\'exportExcelWorkbookSheet-${sheet}-label\' class=\'export-checkbox-label\' >
                        ${sheet.slice(sheet.lastIndexOf("_") + 1) + "_log2_expression"}
                    </label>
                </li>`;
            }

            result += "<p class=\'export-excel-workbook-sheet-option-subheader\'> Additional Sheets </p>";
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
        $("input[name=workbookSheets]").not($("#exportExcelWorkbookSheet-All")).on("click", () => {
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
        });
        $("#exportExcelWorkbookSheet-All").on("click", () => {
            const allSheets = $("input[name=workbookSheets]");
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
        $("#Export-Excel-Button").on("click", performExport("export-to-excel", "xlsx", null, source));
    };
    const handleExportExcelModal = function () {
        if (grnState.mode === "grn") {
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
        } else if (grnState.mode === "protein-protein-physical-interaction") {
            const source = "userInput";
            $("#exportExcelForm").remove();
            $("#exportExcelFooter").remove();
            $("#exportExcelQuestions-containter").append(createHTMLforProteinProteinPhysicalInteractionForm);
            $("#exportExcelFooter-container").append(createHTMLforModalButtons());
            $("#Export-Excel-Button").prop("value", "Export Workbook");
            $("#exportExcelWorkbookSheets").html("Select Workbook Sheets to Export:");
            handleWorkbookSheetCheckboxBehaviour();
            $("#Export-Excel-Button").on("click", performExport("export-to-excel", "xlsx", null, source));

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
    $("#exportAsUnweightedGraphMl").on("click", performExport("export-to-graphml", "graphml", "unweighted"));
    $("#exportAsWeightedGraphMl").on("click", performExport("export-to-graphml", "graphml", "weighted"));
    $("#exportAsExcel").on("click", performExcelExport());

};
