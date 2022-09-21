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

export const uploadState = {
    currentWorkbook: null,
};

export const upload = function () {

  // Values
    var TOOLTIP_SHOW_DELAY    = 700;
    var TOOLTIP_HIDE_DELAY    = 100;

  // Settings Stuff
    var styleLabelTooltips = function () {
        $(".info").tooltip({
            placement: "top",
            delay: { show: TOOLTIP_SHOW_DELAY, hide: TOOLTIP_HIDE_DELAY }
        });
    };

    styleLabelTooltips();

    $("#printGraph").click( function () {
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
        var result = $.extend(true, { }, workbook, { sheetType: sheetType });
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

    const handleExportExcelButtonExport = (route, extension, sheetType, source) => {
        grnState.workbook.exportNetworkType = sheetType;
        const expressionSheets = $("input[name=expressionSheets]:checked");
        var chosenSheets = [];
        for (const [key, value] of Object.entries(expressionSheets)) {
            if (!isNaN(parseInt(key, 10))) {
                if (value.value === "select all") {
                    const allExpressionSheets = $("input[name=expressionSheets]");
                    chosenSheets = [];
                    for (const [k, v] of Object.entries(allExpressionSheets)) {
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
        const exportSheets = {};

        if (source === "userInput" && grnState.workbook.expression) {
            // source is from user speadsheet
            // parse through grnState expression sheets and collect the sheets to be exported
            for (let sheet of chosenSheets) {
                if (grnState.workbook.expression[sheet]) {
                    exportSheets[sheet] = grnState.workbook.expression[sheet];
                }
            }
            grnState.workbook.exportExpression = exportSheets;
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
        } else {
            // source is from database so lets query her up
            for (let sheet of chosenSheets) {
                startLoadingIcon();
                queryExpressionDatabase({
                    dataset: sheet,
                    genes : grnState.workbook.genes
                }).then(function (response) {
                    exportSheets[sheet] = response;
                    if (exportSheets[sheet]) {
                        stopLoadingIcon();
                        if (Object.keys(exportSheets).length === chosenSheets.length) {
                            // we have all of the sheets so lets initilize the export process
                            const finalExportSheets = {};
                            Object.keys(exportSheets).forEach((sheet) => {
                                // make sure that the sheets we queried are populated with the correct data
                                if (exportSheets[sheet].data && exportSheets[sheet].timePoints) {
                                    // if the resulting query contains both the timePoint data and
                                    // the gene data then export it. If not don't :)
                                    finalExportSheets[sheet] = exportSheets[sheet];
                                }
                            });
                            grnState.workbook.exportExpression = finalExportSheets;
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
                        }
                    }
                }).catch(function (error) {
                    console.log(error.stack);
                    console.log(error.name);
                    console.log(error.message);
                });
            }
        }
    };

    var performExport = function (route, extension, sheetType, source) {
        return function () {
            // Deleted event parameter
            if (route === "export-to-excel" && source) {
                handleExportExcelButtonExport(route, extension, sheetType, source);
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

    const createHTMLforForm1 = () => {
        // $(".export-form-group").remove();
        return `
            <form id=\'exportExcelForm1\'>
                <div class=\'form-group export-form-group\'>
                    <p id=\'exportExcelNetwork\'></p>
                    <ul class=\'export-radio-group\' id=\'export-excel-weights-list\' style=\"list-style-type:none;\"> </ul>
                </div>
                <div class=\'form-group export-form-group\'>
                    <p id=\'exportExcelExpressionSources\'> </p>
                    <ul class=\'export-radio-group\' id=\'export-excel-expression-source-list\' style=\"list-style-type:none;\">
                        <li>
                            <input type=\'radio\' name=\'expressionSource\' checked=\"true\" value=\"userInput\" id=\'exportExcelExpressionSource-userInputRadio\' class=\'export-radio\' />
                            <label for=\'exportExcelExpressionSource-userInputRadio\' id=\'exportExcelExpressionSource-userInput\' class=\'export-radio-label\'> </label>
                        </li>

                        <li>
                            <input type=\'radio\' name=\'expressionSource\' value=\"Barreto_2012\" id=\'exportExcelExpressionSource-BarretoRadio\' class=\'export-radio\' />
                            <label for=\'exportExcelExpressionSource-BarretoRadio\' id=\'exportExcelExpressionSource-Barreto\' class=\'export-radio-label\'> </label>
                        </li>
                        <li>
                            <input type=\'radio\' name=\'expressionSource\' value=\"Dahlquist_2018\" id=\'exportExcelExpressionSource-DahlquistRadio\' class=\'export-radio\' />
                            <label for=\'exportExcelExpressionSource-DahlquistRadio\' id=\'exportExcelExpressionSource-Dahlquist\' class=\'export-radio-label\'>  </label>
                        </li>
                        <li>
                            <input type=\'radio\' name=\'expressionSource\' value=\"Kitagawa_2002\" id=\'exportExcelExpressionSource-KitagawaRadio\' class=\'export-radio\' />
                            <label for=\'exportExcelExpressionSource-KitagawaRadio\' id=\'exportExcelExpressionSource-Kitagawa\' class=\'export-radio-label\'> </label>
                        </li>
                        <li>
                            <input type=\'radio\' name=\'expressionSource\' value=\"Thorsen_2007\" id=\'exportExcelExpressionSource-ThorsenRadio\' class=\'export-radio\' />
                            <label for=\'exportExcelExpressionSource-ThorsenRadio\' id=\'exportExcelExpressionSource-Thorsen\' class=\'export-radio-label\'> </label>
                        </li>
                    </ul>
                </div>
            </form>
        `;
    };

    const createHTMLforForm2 = () => {
        return `
        <form id=\'exportExcelForm2\'>
            <div class=\'form-group export-form-group\'>
                <p id=\'exportExcelWorkbookSheets\'></p>
                <ul class=\'exportExcelWorkbookSheets\' id=\'export-excel-workbook-sheet-list\' style=\"list-style-type:none;\"> </ul>
            </div>
        </form>
        `;
        // return `
        // <form id=\'exportExcelForm2\'>
        //     <div class=\'form-group export-form-group\'>
        //         <p id=\'exportExcelExpressionSheets\'></p>
        //         <ul class=\'exportExcelExpressionSheets\' id=\'export-excel-expression-sheet-list\' style=\"list-style-type:none;\"> </ul>
        //     </div>
        //     <div class=\'form-group export-form-group\'>
        //         <p id=\'exportExcelWorkbookSheets\'></p>
        //         <ul class=\'exportExcelWorkbookSheets\' id=\'export-excel-workbook-sheet-list\' style=\"list-style-type:none;\"> </ul>
        //     </div>
        // </form>
        // `;
    };
    const createHTMLforWeights = () => {
        // $(".export-excel-weighted-option").remove();
        return `
        <li class=\'export-excel-weighted-option\'>
            <input type=\'radio\' ${grnState.workbook.sheetType === "weighted"?"checked":"disabled"}=\"true\" name=\'network-weights\' value=\"weighted\" id=\'exportExcelWeightedRadio\' class=\'export-radio\' />
            <label for=\'exportExcelWeightedRadio\' id=\'exportExcelWeighted\' class=\'export-radio-label ${grnState.workbook.sheetType !== "weighted" && 'disabled'}\' >
                Weighted
            </label>
        </li>
        <li class=\'export-excel-weighted-option\'>
            <input type=\'radio\'   ${grnState.workbook.sheetType !== "weighted"&& 'checked=\"true\"'} name=\'network-weights\' value=\"unweighted\" id=\'exportExcelUnweightedRadio\' class=\'export-radio\' />
            <label for=\'exportExcelUnweightedRadio\' id=\'exportExcelUnweighted\' class=\'export-radio-label\' >
                Unweighted
            </label>
        </li>`;
    };

    const createHTMLforSheets = (source) => {
        $(".export-excel-workbook-sheet-option").remove();

        // check if user updated data is selected
        let result =  `
            <li class=\'export-excel-workbook-sheet-option export-excel-workbook-sheet-option-subheader\'>
                <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"select all\" id=\'exportExcelWorkbookSheet-All\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-All\' id=\'exportExcelWorkbookSheet-All-label\' class=\'export-checkbox-label\' >
                    Select All
                </label>
            </li>

            <p class=\'export-excel-workbook-sheet-option-subheader\'> Network Sheets </p>
            `;
        let networks = [
            (grnState.workbook.networkOptimizedWeights !== undefined && "network_optimized_weights"),
            (grnState.workbook.network !== undefined> 0 && "network"),
            (grnState.workbook.networkWeights !== undefined && "network_weights")]
        networks = networks.filter(x=>x !== false);
        let additionalsheets = [
            ...Object.keys(grnState.workbook.two_column_sheets),
            (grnState.workbook.meta2 !== undefined && "optimization_diagnostics")
        ]
        additionalsheets = additionalsheets.filter(x=>x !== false && x !=="optimization_parameters");
        additionalsheets = ["optimization_parameters", ...additionalsheets].sort()
        for (let network of networks) {
            result = result + `
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"${network}\" id=\'exportExcelWorkbookSheet-${network}\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-${network}\' id=\'exportExcelWorkbookSheet-${network}-label\' class=\'export-checkbox-label\' >
                    ${network}
                </label>
            </li>
            `;
        }
        result += `<p class=\'export-excel-workbook-sheet-option-subheader\'> Expression Sheets </p>`
        if (source === "userInput") {
            for (let expression of grnState.workbook.expressionNames) {
                result = result + `
                <li class=\'export-excel-workbook-sheet-option\'>
                    <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"${expression}\" id=\'exportExcelWorkbookSheet-${expression}\' class=\'export-checkbox\' />
                    <label for=\'exportExcelWorkbookSheet-${expression}\' id=\'exportExcelWorkbookSheet-${expression}-label\' class=\'export-checkbox-label\' >
                        ${expression}
                    </label>
                </li>
                `;
            }
            result += `
            <p class=\'export-excel-workbook-sheet-option-subheader\'> Additional Sheets </p>`
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
        } else if (source === "Dahlquist_2018") {
            // if the source is from a database
            result = result +  `
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' name=\'workbookSheets\' checked=\"true\" value=\"Dahlquist_2018_dcin5\" id=\'exportExcelWorkbookSheet-Dahlquist_2018_dcin5\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-Dahlquist_2018_dcin5\' id=\'exportExcelWorkbookSheet-Dahlquist_2018_dcin5-label\' class=\'export-checkbox-label\' >
                    dcin5_log2_expression
                </label>
            </li>
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'workbookSheets\' value=\"Dahlquist_2018_dgln3\" id=\'exportExcelWorkbookSheet-Dahlquist_2018_dgln3\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-Dahlquist_2018_dgln3\' id=\'exportExcelWorkbookSheet-Dahlquist_2018_dgln3-label\' class=\'export-checkbox-label\' >
                    dgln3_log2_expression
                </label>
            </li>
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'workbookSheets\' value=\"Dahlquist_2018_dhap4\" id=\'exportExcelWorkbookSheet-Dahlquist_2018_dhap4\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-Dahlquist_2018_dhap4\' id=\'exportExcelWorkbookSheet-Dahlquist_2018_dhap4-label\' class=\'export-checkbox-label\' >
                    dhap4_log2_expression
                </label>
            </li>
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'workbookSheets\' value=\"Dahlquist_2018_dzap1\" id=\'exportExcelWorkbookSheet-Dahlquist_2018_dzap1\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-Dahlquist_2018_dzap1\' id=\'exportExcelWorkbookSheet-Dahlquist_2018_dzap1-label\' class=\'export-checkbox-label\' >
                    dzap1_log2_expression
                </label>
            </li>
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'workbookSheets\' value=\"Dahlquist_2018_wt\" id=\'exportExcelWorkbookSheet-Dahlquist_2018_wt\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-Dahlquist_2018_wt\' id=\'exportExcelWorkbookSheet-Dahlquist_2018_wt-label\' class=\'export-checkbox-label\' >
                    wt_log2_expression
                </label>
            </li>`
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
            result += `
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        } else if (source === "Kitagawa_2002") {
            // if the source is from a database
            result = result +  `
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'workbookSheets\' value=\"Kitagawa_2002_wt\" id=\'exportExcelWorkbookSheet-Kitagawa_2002_wt\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-Kitagawa_2002_wt\' id=\'exportExcelWorkbookSheet-Kitagawa_2002_wt-label\' class=\'export-checkbox-label\' >
                    wt_log2_expression
                </label>
            </li>
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        } else if (source === "Thorsen_2007") {
            // if the source is from a database
            result = result +  `
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'workbookSheets\' value=\"Thorsen_2007_wt\" id=\'exportExcelWorkbookSheet-Thorsen_2007_wt\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-Thorsen_2007_wt\' id=\'exportExcelWorkbookSheet-Thorsen_2007_wt-label\' class=\'export-checkbox-label\' >
                    wt_log2_expression
                </label>
            </li>
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        } else if (source === "Barreto_2012") {
            // if the source is from a database
            result = result + `
            <li class=\'export-excel-workbook-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'workbookSheets\' value=\"Barreto_2012_wt\" id=\'exportExcelWorkbookSheet-Barreto_2012_wt\' class=\'export-checkbox\' />
                <label for=\'exportExcelWorkbookSheet-Barreto_2012_wt\' id=\'exportExcelWorkbookSheet-Barreto_2012_wt-label\' class=\'export-checkbox-label\' >
                    wt_log2_expression
                </label>
            </li>
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        }
        return result
    }
    const createHTMLforExpressionSheets = (source) => {
        console.log(grnState.workbook)
        $(".export-excel-expression-sheet-option").remove();
        // check if user updated data is selected
        let result =  `
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' name=\'expressionSheets\' checked=\"true\" value=\"select all\" id=\'exportExcelExpression-All\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-All\' id=\'exportExcelExpression-All-label\' class=\'export-checkbox-label\' >
                    Select All
                </label>
            </li>
            `;
        if (source === "userInput") {
            for (let expression of grnState.workbook.expressionNames) {
                result = result + `
                <li class=\'export-excel-expression-sheet-option\'>
                    <input type=\'checkbox\' name=\'expressionSheets\' checked=\"true\" value=\"${expression}\" id=\'exportExcelExpression-${expression}\' class=\'export-checkbox\' />
                    <label for=\'exportExcelExpression-${expression}\' id=\'exportExcelExpression-${expression}-label\' class=\'export-checkbox-label\' >
                        ${expression}
                    </label>
                </li>
                `;
            }
        } else if (source === "Dahlquist_2018") {
            // if the source is from a database
            result = result +  `
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' name=\'expressionSheets\' checked=\"true\" value=\"Dahlquist_2018_dcin5\" id=\'exportExcelExpression-Dahlquist_2018_dcin5\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Dahlquist_2018_dcin5\' id=\'exportExcelExpression-Dahlquist_2018_dcin5-label\' class=\'export-checkbox-label\' >
                    dcin5_log2_expression
                </label>
            </li>
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Dahlquist_2018_dgln3\" id=\'exportExcelExpression-Dahlquist_2018_dgln3\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Dahlquist_2018_dgln3\' id=\'exportExcelExpression-Dahlquist_2018_dgln3-label\' class=\'export-checkbox-label\' >
                    dgln3_log2_expression
                </label>
            </li>
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Dahlquist_2018_dhap4\" id=\'exportExcelExpression-Dahlquist_2018_dhap4\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Dahlquist_2018_dhap4\' id=\'exportExcelExpression-Dahlquist_2018_dhap4-label\' class=\'export-checkbox-label\' >
                    dhap4_log2_expression
                </label>
            </li>
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Dahlquist_2018_dzap1\" id=\'exportExcelExpression-Dahlquist_2018_dzap1\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Dahlquist_2018_dzap1\' id=\'exportExcelExpression-Dahlquist_2018_dzap1-label\' class=\'export-checkbox-label\' >
                    dzap1_log2_expression
                </label>
            </li>
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Dahlquist_2018_wt\" id=\'exportExcelExpression-Dahlquist_2018_wt\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Dahlquist_2018_wt\' id=\'exportExcelExpression-Dahlquist_2018_wt-label\' class=\'export-checkbox-label\' >
                    wt_log2_expression
                </label>
            </li>
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        } else if (source === "Kitagawa_2002") {
            // if the source is from a database
            result = result +  `
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Kitagawa_2002_wt\" id=\'exportExcelExpression-Kitagawa_2002_wt\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Kitagawa_2002_wt\' id=\'exportExcelExpression-Kitagawa_2002_wt-label\' class=\'export-checkbox-label\' >
                    wt_log2_expression
                </label>
            </li>
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        } else if (source === "Thorsen_2007") {
            // if the source is from a database
            result = result +  `
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Thorsen_2007_wt\" id=\'exportExcelExpression-Thorsen_2007_wt\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Thorsen_2007_wt\' id=\'exportExcelExpression-Thorsen_2007_wt-label\' class=\'export-checkbox-label\' >
                    wt_log2_expression
                </label>
            </li>
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        } else if (source === "Barreto_2012") {
            // if the source is from a database
            result = result + `
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Barreto_2012_wt\" id=\'exportExcelExpression-Barreto_2012_wt\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Barreto_2012_wt\' id=\'exportExcelExpression-Barreto_2012_wt-label\' class=\'export-checkbox-label\' >
                    wt_log2_expression
                </label>
            </li>
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        }
        return result;
    };

    const createHTMLforModalButtons = (isInitialModal) => {
        return `
            <div id=\'exportExcelFooter\'>
                ${ !isInitialModal ?
                    `<div>
                        <input type=\'button\' class=\'btn btn-default\' id=\'Export-Excel-Button-Back\' value=\'Back\'  />
                    </div>` : ""
                }
                <div>
                    <input type=\'button\' class=\'btn btn-default\' id=\'Export-Excel-Button${isInitialModal ? "-Continue" : ""}\' />
                    <input type=\'button\' class=\'btn btn-default\' data-dismiss=\'modal\' value=\'Cancel\'  />
                <div>
            </div>
        `;
    };

    var handleExportExcelModal = function () {
        $("#exportExcelForm1").remove();
        $("#exportExcelForm2").remove();
        $("#exportExcelFooter").remove();
        $("#exportExcelQuestions-containter").append(createHTMLforForm1);
        $("#exportExcelFooter-container").append(createHTMLforModalButtons(true));

        $("#exportExcelNetwork").html("Select the edge type:");
        $("#export-excel-weights-list").append(createHTMLforWeights());
        $("#Export-Excel-Button-Continue").prop("value", "Continue");
        $("#exportExcelExpressionSources").html("Select the Expression Data Source:");
        $("#exportExcelExpressionSource-userInput").html(grnState.name);
        $("#exportExcelExpressionSource-Barreto").html("Barreto_2012");
        $("#exportExcelExpressionSource-Dahlquist").html("Dahlquist_2018");
        $("#exportExcelExpressionSource-Kitagawa").html("Kitagawa_2002");
        $("#exportExcelExpressionSource-Thorsen").html("Thorsen_2007");
    };

    var handleWorkbookSheetCheckboxBehaviour = () => {
        $("input[name=workbookSheets]").not($("#exportExcelWorkbookSheet-All")).on("click", ()=>{
            const selectAll = $("#exportExcelWorkbookSheet-All");
            const allSheets = $("input[name=workbookSheets]");
            if (selectAll[0].checked) {
                for (let i in allSheets) {
                    if (typeof allSheets[i] === "object") {
                        if (allSheets[i].checked !==  selectAll[0].checked) {
                            selectAll[0].checked = false
                        }
                    }
                }
            }
            
        })
        $("#exportExcelWorkbookSheet-All").on("click", ()=>{
            const allSheets = $("input[name=workbookSheets]");
            const selectAll = $("#exportExcelWorkbookSheet-All");
            console.log(selectAll)
            for (let i in allSheets) {
                if (typeof allSheets[i] === "object") {
                    allSheets[i].checked = selectAll[0].checked
                }
            }
        })
    }

    var handleExportExcelButtonContinue = () => {
        const weight = $("input[name=network-weights]:checked")[0].value;
        const source = $("input[name=expressionSource]:checked")[0].value;
        $("#exportExcelForm1").remove();
        $("#exportExcelFooter").remove();
        $("#exportExcelFooter-container").append(createHTMLforModalButtons(false));
        $("#Export-Excel-Button").prop("value", "Export Workbook");
        $("#exportExcelQuestions-containter").append(createHTMLforForm2);
        $("#exportExcelWorkbookSheets").html("Select Workbook Sheets to Export:");
        $("#export-excel-workbook-sheet-list").append(createHTMLforSheets(source));
        handleWorkbookSheetCheckboxBehaviour()
        $("#Export-Excel-Button-Back").on("click", () => {
            handleExportExcelModal();
            $("input[name=network-weights]").removeAttr("checked");
            $("input[name=network-weights][value=" + weight + "]").prop("checked", true);
            $("input[name=expressionSource]").removeAttr("checked");
            $("input[name=expressionSource][value=" + source + "]").prop("checked", true);
            $("#Export-Excel-Button-Continue").on("click", () => handleExportExcelButtonContinue());
        });
        $("#Export-Excel-Button").on("click", performExport("export-to-excel", "xlsx", weight, source));
    };

    var displayExportExcelModal = function () {
        handleExportExcelModal();
        $("#Export-Excel-Button-Continue").on("click", () => handleExportExcelButtonContinue());
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
