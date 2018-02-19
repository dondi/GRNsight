// Parses "optimization_paramters," expression data sheets, and 2-column sheets
// from GRNmap input or output workbook

// var xlsx = require("node-xlsx");
// var outputWorkbookPath = "../../test-files/spreadsheet-controller-test-files/" +
  // "15-genes_28-edges_db5-MO-LK_Sigmoid_estimation_missing-values_output.xlsx";

var TWO_COL_SHEET_NAMES = [
    "production_rates",
    "degradation_rates",
    "threshold_b",
    "optimized_production_rates",
    "optimized_threshold_b"];

var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

var isExpressionSheet = function (sheetName) {
    for (var i = 0; i < EXPRESSION_SHEET_SUFFIXES.length; i++) {
        var suffix = EXPRESSION_SHEET_SUFFIXES[i];
        if (sheetName.includes(suffix)) {
            return true;
        }
    }
    return false;
};

// Helper function, to be replaced with the includes() method when GRNsight is ported to ES6
var isInArray = function (value, array) {
    return array.indexOf(value) > -1;
};

var fillArray = function (value, array, length) { // mutator
    while (array.length < length) {
        array.push(value);
    }
    return array;
};

// var workbook = xlsx.parse(outputWorkbookPath);
// var data = parseAdditionalSheets(workbook);
// console.log(JSON.stringify(data));

module.exports = function (workbook) {

    var output = {};
    output["expression"] = {}; // expression data
    output["meta"] = {};
    // TODO: Need better name to generalize 2-column data
    output["test"] = {}; // 2-column data

    // First, extract meta data from optimization_parameters
    for (var i = 0; i < workbook.length; i++) {
        var sheet = workbook[i];
        // Parse meta data in "optimization_parameters" sheet
        if (sheet.name === "optimization_parameters") {
            var meta = {};
            sheet.data.forEach(function (element, index) {
                if (index !== 0) {
                    var value = element.slice(1);
                    // Extract element from array if array contains only 1 value
                    meta[element[0]] = value.length > 1 ? value : value[0];
                }
            });
            output["meta"] = meta;
        // Parse 2-column sheets
        } else if (isInArray(sheet.name, TWO_COL_SHEET_NAMES)) {
            var data = {};
            sheet.data.forEach(function (element, index) {
                if (index !== 0) {
                    data[element[0]] = element[1];
                }
            });
            output["test"][sheet.name] = data;
        // Parse expression sheets
        } else if (isExpressionSheet(sheet.name)) {
            var expressionData = {};
            expressionData["time_points"] = sheet.data[0].slice(1);
            var numberOfDataPoints = expressionData["time_points"].length;
            var geneData = {};
            for (var j = 1; j < sheet.data.length; j++) {
                var geneName = sheet.data[j][0];
                if (geneName) {
                    var rowData = sheet.data[j].slice(1);
                    // Sometimes, missing data is at the end of the row. In this case, pad the
                    // array with nulls
                    if (rowData.length < numberOfDataPoints) {
                        fillArray(null, rowData, numberOfDataPoints);
                    }
                    geneData[geneName] = rowData;
                }
            }
            expressionData["data"] = geneData;
            output["expression"][sheet.name] = expressionData;
        }
    }
    return output;
};
