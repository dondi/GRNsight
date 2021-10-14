/* eslint-disable max-len */

// import { FILE_NAME } from "./constants";
// const workbookName = document.getElementById(FILE_NAME);
// import { EXPRESSION_SOURCE } from "./constants";
import { grnState } from "./grnstate";
import { performExport } from "./upload";


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
                    <label for=\'exportExcelExpressionSource-userInputCheckbox\' id=\'exportExcelExpressionSource-userInput\' class=\'export-radio-label\'> </label>
                </li>
                <li>
                    <input type=\'radio\' name=\'expressionSource\' value=\"Dahlquist_2018\" id=\'exportExcelExpressionSource-DahlquistRadio\' class=\'export-radio\' />
                    <label for=\'exportExcelExpressionSource-DahlquistCheckbox\' id=\'exportExcelExpressionSource-Dahlquist\' class=\'export-radio-label\'>  </label>
                </li>
                <li>
                    <input type=\'radio\' name=\'expressionSource\' value=\"Kitagawa_2002\" id=\'exportExcelExpressionSource-KitagawaRadio\' class=\'export-radio\' />
                    <label for=\'exportExcelExpressionSource-KitagawaCheckbox\' id=\'exportExcelExpressionSource-Kitagawa\' class=\'export-radio-label\'> </label>
                </li>
                <li>
                    <input type=\'radio\' name=\'expressionSource\' value=\"Thorsen_2007\" id=\'exportExcelExpressionSource-ThorsenRadio\' class=\'export-radio\' />
                    <label for=\'exportExcelExpressionSource-ThorsenCheckbox\' id=\'exportExcelExpressionSource-Thorsen\' class=\'export-radio-label\'> </label>
                </li>
                <li>
                    <input type=\'radio\' name=\'expressionSource\' value=\"Barreto_2012\" id=\'exportExcelExpressionSource-BarretoRadio\' class=\'export-radio\' />
                    <label for=\'exportExcelExpressionSource-BarretoCheckbox\' id=\'exportExcelExpressionSource-Barreto\' class=\'export-radio-label\'> </label>
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
        <button type=\'submit\' class=\'btn btn-default\' id=\'exportExcelButton\'> Export Workbook </button>
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
    console.log(source);
    $(".export-excel-expression-sheet-option").remove();
    // check if user updated data is selected
    let result =  `
        <li class=\'export-excel-expression-sheet-option\'>
            <input type=\'checkbox\' checked=\"true\" value=\"select all\" id=\'exportExcelExpression-All\' class=\'export-checkbox\' />
            <label for=\'exportExcelExpression-All\' id=\'exportExcelExpression-All-label\' class=\'export-checkbox-label\' >
                All Expression Sheets
            </label>
        </li>
        `;
    if (source === "userInput") {
        for (let expression in grnState.workbook.expression) {
            // console.log(expression);
            result = result + `
            <li class=\'export-excel-expression-sheet-option\'>
                <input type=\'checkbox\' checked=\"true\" value=\"select all\" id=\'exportExcelExpression-${expression}\' class=\'export-checkbox\' />
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
            <input type=\'checkbox\' checked=\"true\" value=\"Dahlquist_2018_dcin5\" id=\'exportExcelExpression-Dahlquist_2018_dcin5\' class=\'export-checkbox\' />
            <label for=\'exportExcelExpression-Dahlquist_2018_dcin5\' id=\'exportExcelExpression-Dahlquist_2018_dcin5-label\' class=\'export-checkbox-label\' >
                Dahlquist_2018_dcin5
            </label>
        </li>
        <li class=\'export-excel-expression-sheet-option\'>
            <input type=\'checkbox\' checked=\"true\" value=\"sDahlquist_2018_dgin3\" id=\'exportExcelExpression-Dahlquist_2018_dgin3\' class=\'export-checkbox\' />
            <label for=\'exportExcelExpression-Dahlquist_2018_dgin3\' id=\'exportExcelExpression-Dahlquist_2018_dgin3-label\' class=\'export-checkbox-label\' >
                Dahlquist_2018_dgin3
            </label>
        </li>
        <li class=\'export-excel-expression-sheet-option\'>
            <input type=\'checkbox\' checked=\"true\" value=\"Dahlquist_2018_dhap4\" id=\'exportExcelExpression-Dahlquist_2018_dhap4\' class=\'export-checkbox\' />
            <label for=\'exportExcelExpression-Dahlquist_2018_dhap4\' id=\'exportExcelExpression-Dahlquist_2018_dhap4-label\' class=\'export-checkbox-label\' >
                Dahlquist_2018_dhap4
            </label>
        </li>
        <li class=\'export-excel-expression-sheet-option\'>
            <input type=\'checkbox\' checked=\"true\" value=\"Dahlquist_2018_dzap1\" id=\'exportExcelExpression-Dahlquist_2018_dzap1\' class=\'export-checkbox\' />
            <label for=\'exportExcelExpression-Dahlquist_2018_dzap1\' id=\'exportExcelExpression-Dahlquist_2018_dzap1-label\' class=\'export-checkbox-label\' >
                Dahlquist_2018_dzap1
            </label>
        </li>
        `;
    } else if (source === "Kitagawa_2002") {
        // if the source is from a database
        result = result +  `
        <li class=\'export-excel-expression-sheet-option\'>
            <input type=\'checkbox\' checked=\"true\" value=\"Kitagawa_2002_wt\" id=\'exportExcelExpression-Kitagawa_2002_wt\' class=\'export-checkbox\' />
            <label for=\'exportExcelExpression-Kitagawa_2002_wt\' id=\'exportExcelExpression-Kitagawa_2002_wt-label\' class=\'export-checkbox-label\' >
                Kitagawa_2002_wt
            </label>
        </li>
        `;
    } else if (source === "Thorsen_2007") {
        // if the source is from a database
        result = result +  `
        <li class=\'export-excel-expression-sheet-option\'>
            <input type=\'checkbox\' checked=\"true\" value=\"Thorsen_2007_wt\" id=\'exportExcelExpression-Thorsen_2007_wt\' class=\'export-checkbox\' />
            <label for=\'exportExcelExpression-Thorsen_2007_wt\' id=\'exportExcelExpression-Thorsen_2007_wt-label\' class=\'export-checkbox-label\' >
                Thorsen_2007_wt
            </label>
        </li>
        `;
    } else if (source === "Barreto_2012") {
        // if the source is from a database
        result = result + `
        <li class=\'export-excel-expression-sheet-option\'>
            <input type=\'checkbox\' checked=\"true\" value=\"Barreto_2012_wt\" id=\'exportExcelExpression-Barreto_2012_wt\' class=\'export-checkbox\' />
            <label for=\'exportExcelExpression-Barreto_2012_wt\' id=\'exportExcelExpression-Barreto_2012_wt-label\' class=\'export-checkbox-label\' >
            Barreto_2012_wt
            </label>
        </li>
        `;
    }
    return result;
};

const handleExportExcelButton = () => {
    console.log("continue");
    const source = $("input[name=expressionSource]:checked")[0].value;
    const weight = $("input[name=network-weights]:checked")[0].value;
    $("#exportExcelForm1").remove();
    // $("#exportExcelForm1")[0].style = "display:none;";
    $("#exportExcelQuestions-containter").append(createHTMLforForm2);
    $("#exportExcelExpressionSheets").html("Select Expression Sheets:");
    $("#export-excel-expression-sheet-list").append(createHTMLforExpressionSheets(source));
    $("#exportExcelButton").on("click", performExport("export-to-excel", "xlsx", weight));
};

export var displayExportExcelModal = function () {
    $("#exportExcelQuestions-containter").append(createHTMLforForm1);
    // console.log($("input[name=expressionSource]:checked")[0].value);
    // console.log(grnState.workbook.expression);
    // console.log($("#exportExcelExpressionSource-userInput"));
    // console.log($("#fileName").text()x);
    $("#exportExcelNetwork").html("Select the workbooks export type:");
    $("#export-excel-weights-list").append(createHTMLforWeights());

    $("#exportExcelExpressionSources").html("Select the Expression Data Source:");
    $("#exportExcelExpressionSource-userInput").html(grnState.name);
    $("#exportExcelExpressionSource-Dahlquist").html("Dahlquist_2018");
    $("#exportExcelExpressionSource-Kitagawa").html("Kitagawa_2002");
    $("#exportExcelExpressionSource-Thorsen").html("Thorsen_2007");
    $("#exportExcelExpressionSource-Barreto").html("Barreto_2012");
    $("#exportExcelContinueButton").on("click", () => handleExportExcelButton());
    $("#exportExcelModal").modal("show");
};


export { createHTMLforExpressionSheets };