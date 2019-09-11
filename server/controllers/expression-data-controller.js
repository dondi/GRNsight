var spreadsheetController = require(__dirname + "/spreadsheet-controller");

// var additionalSheetParser = require(__dirname + "/additional-sheet-parser.js");

var errorList = spreadsheetController.errorList;
var warningsList = spreadsheetController.warningsList;

// var addMessageToArray = spreadsheetController.addMessageToArray;

var addWarning = spreadsheetController.addWarning;

var addError = spreadsheetController.addError;

// var TWO_COL_SHEET_NAMES = [
//     "production_rates",
//     "degradation_rates",
//     "threshold_b",
//     "optimized_production_rates",
//     "optimized_threshold_b"];
console.log("beginning");
var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

var isExpressionSheet = function (sheetName) {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.includes(suffix);
    });
};

// if (isExpressionSheet.length === 0) {
//     throw new Error("Need at least one expression sheet");
// }

var fillArray = function (value, array, length) { // mutator
    while (array.length < length) {
        array.push(value);
    }
    return array;
};

var parseExpressionSheet = function (sheet) {

    var currentSheet;
    var network = {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: "unweighted",
    };
    // var currentLink;
    // var currentGene;
    // var sourceGene;
    // var targetGene;
    // var sourceGeneNumber;
    // var targetGeneNumber;
    // var genesList = []; // This will contain all of the genes in upper case for use in error checking
    // var sourceGenes = [];
    // var targetGenes = [];

    // Look for the worksheet containing the network data
    var k = 0;
    for (var i = 0; i < sheet.length; i++) {
        if (isExpressionSheet(sheet[i])) {
            // We found a sheet with optimized weights, which is the ideal data source.
            // So we stop looking.
            console.log("Found an expression sheet");
            currentSheet = sheet[k];
            network.sheetType = "expression";
            k++;
            // break;
        }
    }

    // If it didn't find a network/network_optimized_weights sheet
    // TODO For expediency, we are wrapping every `return network` statement in `semanticChecker`.
    //      Some refactoring may be desirable to prevent excessive repetition.
    if (currentSheet === undefined) {
        addWarning(network, warningsList.missingExpressionWarning);
        return network;
    }

    for (var row = 0, column = 1; row < currentSheet.data.length; row++) {
        if (currentSheet.data[row].length === 0) { // if the current row is empty
            console.log("Empty row");
            if (addError(network, errorList.emptyRowError(row)) === false) {
                return network;
            }
        } else if (currentSheet.data[column].length === 0) { // if the current row is empty
            if (addError(network, errorList.emptyRowError(row)) === false) {
                return network;
            }
        }
    }
    var expressionData = {};
    var geneData = {};
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
        expression: {}
    };
    workbook.forEach(function (sheet) {
        if (isExpressionSheet(sheet.name)) {
            output["expression"][sheet.name] = parseExpressionSheet(sheet);
        }
    });
    return output;
};
