// TODO Likely a temporary location, while things are being moved to their "true" homes.
//      But placed here for now so that the true MVC cycle of grnState, updateApp, and the
//      controller code installed by setupHandlers can access them.

// import { displayExportExcelModal } from "./exportHelper";
/* eslint-disable max-len */
import { grnState } from "./grnstate";

import {
    buildURL,
    responseData,
    stopLoadingIcon
} from "./update-app";

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
                    action: $("#service-root").val() + "/" + route
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
                let queryURL = buildURL({ dataset: sheet });
                responseData("", queryURL).then(function (response) {
                    exportSheets[sheet] = response;
                    if (exportSheets[sheet]) {
                        stopLoadingIcon();
                        if (Object.keys(exportSheets).length === chosenSheets.length) {
                            // we have all of the sheets so lets initilize the export process
                            grnState.workbook.exportExpression = exportSheets;
                            if (!$(this).parent().hasClass("disabled")) {
                                var workbookToExport = flattenWorkbook(uploadState.currentWorkbook, sheetType);
                                var workbookFilename = filenameWithExtension(sheetType !== uploadState.currentWorkbook.sheetType ?
                                    sheetType : "", extension);
                                workbookToExport.filename = workbookFilename;
                                var exportForm = $("<form></form>").attr({
                                    method: "POST",
                                    action: $("#service-root").val() + "/" + route
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
                                console.log(grnState.workbook);
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
                        action: $("#service-root").val() + "/" + route
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
        return `
            <form id=\'exportExcelForm1\'>
                <div class=\'form-group\'>
                    <p id=\'exportExcelNetwork\'></p>
                    <ul class=\'export-radio-group\' id=\'export-excel-weights-list\' style=\"list-style-type:none;\"> </ul>
                </div>
                <div class=\'form-group\'>
                    <p id=\'exportExcelExpressionSources\'> </p>
                    <ul class=\'export-radio-group\' id=\'export-excel-expression-source-list\' style=\"list-style-type:none;\">
                        <li>
                            <input type=\'radio\' name=\'expressionSource\' checked=\"true\" value=\"userInput\" id=\'exportExcelExpressionSource-userInputRadio\' class=\'export-radio\' />
                            <label for=\'exportExcelExpressionSource-userInputRadio\' id=\'exportExcelExpressionSource-userInput\' class=\'export-radio-label\'> </label>
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
                        <li>
                            <input type=\'radio\' name=\'expressionSource\' value=\"Barreto_2012\" id=\'exportExcelExpressionSource-BarretoRadio\' class=\'export-radio\' />
                            <label for=\'exportExcelExpressionSource-BarretoRadio\' id=\'exportExcelExpressionSource-Barreto\' class=\'export-radio-label\'> </label>
                        </li>
                    </ul>
                </div>
                <button type=\'submit\' class=\'btn btn-default\' id=\'exportExcelContinueButton\'> Continue </button>
            </form>
        `;
    };

    const createHTMLforForm2 = () => {
        return `
        <form id=\'exportExcelForm2\'>
            <div class=\'form-group\'>
                <p id=\'exportExcelExpressionSheets\'></p>
                <ul class=\'exportExcelExpressionSheets\' id=\'export-excel-expression-sheet-list\' style=\"list-style-type:none;\"> </ul>
            </div>
            <input type=\'button\' class=\'btn btn-default\' id=\'exportExcelButton\' value=\'Export Workbook\' />
        </form>
        `;
    };
    const createHTMLforWeights = () => {
        $(".export-excel-weighted-option").remove();
        if (grnState.workbook.sheetType !== "weighted") {
            return `
            <li class=\'export-excel-weighted-option\'>
                <input type=\'radio\' checked=\"true\" name=\'network-weights\' value=\"unweighted\" id=\'exportExcelUnweightedRadio\' class=\'export-radio\' />
                <label for=\'exportExcelUnweightedRadio\' id=\'exportExcelUnweighted\' class=\'export-radio-label\' >
                    Unweighted
                </label>
            </li>`;
        } else {
            return `
            <li class=\'export-excel-weighted-option\'>
                <input type=\'radio\' checked=\"true\" name=\'network-weights\' value=\"weighted\" id=\'exportExcelWeightedRadio\' class=\'export-radio\' />
                <label for=\'exportExcelWeightedRadio\' id=\'exportExcelWeighted\' class=\'export-radio-label\' >
                    Weighted
                </label>
            </li>
            <li class=\'export-excel-weighted-option\'>
                <input type=\'radio\' name=\'network-weights\' value=\"unweighted\" id=\'exportExcelUnweightedRadio\' class=\'export-radio\' />
                <label for=\'exportExcelUnweightedRadio\' id=\'exportExcelUnweighted\' class=\'export-radio-label\' >
                    Unweighted
                </label>
            </li>
            `;
        }
    };

    const createHTMLforExpressionSheets = (source) => {
        $(".export-excel-expression-sheet-option").remove();
        // check if user updated data is selected
        let result =  `
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' name=\'expressionSheets\' checked=\"true\" value=\"select all\" id=\'exportExcelExpression-All\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-All\' id=\'exportExcelExpression-All-label\' class=\'export-checkbox-label\' >
                    All Expression Sheets
                </label>
            </li>
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' name=\'expressionSheets\' checked=\"true\" value=\"break\" id=\'exportExcelExpression-All\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-All\' id=\'exportExcelExpression-All-label\' class=\'export-checkbox-label\' >
                    Will break the database query
            </label>
        </li>
            `;
        if (source === "userInput") {
            for (let expression in grnState.workbook.expression) {
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
                    Dahlquist_2018_dcin5
                </label>
            </li>
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Dahlquist_2018_dgln3\" id=\'exportExcelExpression-Dahlquist_2018_dgln3\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Dahlquist_2018_dgln3\' id=\'exportExcelExpression-Dahlquist_2018_dgln3-label\' class=\'export-checkbox-label\' >
                    Dahlquist_2018_dgln3
                </label>
            </li>
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Dahlquist_2018_dhap4\" id=\'exportExcelExpression-Dahlquist_2018_dhap4\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Dahlquist_2018_dhap4\' id=\'exportExcelExpression-Dahlquist_2018_dhap4-label\' class=\'export-checkbox-label\' >
                    Dahlquist_2018_dhap4
                </label>
            </li>
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" name=\'expressionSheets\' value=\"Dahlquist_2018_dzap1\" id=\'exportExcelExpression-Dahlquist_2018_dzap1\' class=\'export-checkbox\' />
                <label for=\'exportExcelExpression-Dahlquist_2018_dzap1\' id=\'exportExcelExpression-Dahlquist_2018_dzap1-label\' class=\'export-checkbox-label\' >
                    Dahlquist_2018_dzap1
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
                    Kitagawa_2002_wt
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
                    Thorsen_2007_wt
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
                Barreto_2012_wt
                </label>
            </li>
            <div class=\'expression-db-loader\'></div>
            <div class=\'expression-db-loader-text\'>Expression Database is Loading</div>
            `;
        }
        return result;
    };

    const handleExportExcelButtonContinue = () => {
        const weight = $("input[name=network-weights]:checked")[0].value;
        const source = $("input[name=expressionSource]:checked")[0].value;
        $("#exportExcelForm1").remove();
        // $("#exportExcelForm1")[0].style = "display:none;";
        $("#exportExcelQuestions-containter").append(createHTMLforForm2);
        $("#exportExcelExpressionSheets").html("Select Expression Sheets:");
        $("#export-excel-expression-sheet-list").append(createHTMLforExpressionSheets(source));
        $("#exportExcelButton").on("click", performExport("export-to-excel", "xlsx", weight, source));
    };

    var displayExportExcelModal = function () {
        $("#exportExcelForm2").remove();
        $("#exportExcelQuestions-containter").append(createHTMLforForm1);
        $("#exportExcelNetwork").html("Select the workbooks export type:");
        $("#export-excel-weights-list").append(createHTMLforWeights());

        $("#exportExcelExpressionSources").html("Select the Expression Data Source:");
        $("#exportExcelExpressionSource-userInput").html(grnState.name);
        $("#exportExcelExpressionSource-Dahlquist").html("Dahlquist_2018");
        $("#exportExcelExpressionSource-Kitagawa").html("Kitagawa_2002");
        $("#exportExcelExpressionSource-Thorsen").html("Thorsen_2007");
        $("#exportExcelExpressionSource-Barreto").html("Barreto_2012");
        $("#exportExcelContinueButton").on("click", () => handleExportExcelButtonContinue());
        $("#exportExcelModal").modal("show");
    };

    var performExcelExport = function () {
        return function () {
            if (!$(this).parent().hasClass("disabled")) {
                displayExportExcelModal();
            }
        };
    };

    // $("#exportAsExcelWkbk").click(performExport("export-to-excel", "xlsx", "unweighted"));
    $("#exportAsUnweightedSif").on("click", performExport("export-to-sif", "sif", "unweighted"));
    $("#exportAsWeightedSif").on("click", performExport("export-to-sif", "sif", "weighted"));
    $("#exportAsUnweightedGraphMl").on("click", performExport("export-to-graphml", "graphml", "unweighted"));
    $("#exportAsWeightedGraphMl").on("click", performExport("export-to-graphml", "graphml", "weighted"));
    // $("#exportAsUnweightedExcel").on("click", performExport("export-to-excel", "xlsx", "unweighted"));
    // $("#exportAsWeightedExcel").on("click", performExport("export-to-excel", "xlsx", "weighted"));
    $("#exportAsExcel").on("click", performExcelExport());

};
