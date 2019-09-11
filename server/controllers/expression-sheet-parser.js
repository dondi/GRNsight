// Parses "optimization_paramters," expression data sheets, and 2-column sheets
// from GRNmap input or output workbook

var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];
var spreadsheetController = require(__dirname + "/spreadsheet-controller");

// var additionalSheetParser = require(__dirname + "/additional-sheet-parser.js");

var errorList = spreadsheetController.errorList;
var warningsList = spreadsheetController.warningsList;

var addMessageToArray = spreadsheetController.addMessageToArray;

var addWarning = spreadsheetController.addWarning;

var addError = spreadsheetController.addError;

var isExpressionSheet = function (sheetName) {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.includes(suffix);
    });
};

var fillArray = function (value, array, length) { // mutator
    while (array.length < length) {
        array.push(value);
    }
    return array;
};

// Going to continue basing this section off of the parseSheet function in spreadsheet-controller.js
var parseExpressionSheet = function (sheet) {
    var geneData = {};
    var expressionData = {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: "unweighted",
    };
    var output = {
        expression: {} // expression data
    };
    expressionData["time_points"] = sheet.data[0].slice(1);
    var numberOfDataPoints = expressionData["time_points"].length;
    sheet.data.forEach(function (sheet) {
        var geneName = sheet[0];
        if (geneName) {
            var rowData = sheet.slice(1);
            // Sometimes, missing data is at the end of the row. In this case, pad the
            // array with nulls
            if (rowData.length < numberOfDataPoints) {
                fillArray(null, rowData, numberOfDataPoints);
            }
            geneData[geneName] = rowData;
        }
    });
    expressionData["data"] = geneData;
    return expressionData;
};

module.exports = function (workbook) {
    var output = {
        expression: {} // expression data
    };
    workbook.forEach(function (sheet) {
        if (isExpressionSheet(sheet.name)) {
            output["expression"][sheet.name] = parseExpressionSheet(sheet);
        }
    });
    // First try adding in a warning message. Is this a good place to do warning/error checks?
    if (output["expression"].length === 0) {
        addWarning(output["expression"][sheet.name], warningsList.missingExpressionWarning);
    }
    return output;
};

