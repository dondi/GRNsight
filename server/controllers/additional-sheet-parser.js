// Parses "optimization_paramters," expression data sheets, and 2-column sheets
// from GRNmap input or output workbook

var TWO_COL_SHEET_NAMES = [
    "production_rates",
    "degradation_rates",
    "threshold_b",
    "optimized_production_rates",
    "optimized_threshold_b"];

var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

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

var parseMetaDataSheet = function (sheet) {
    var meta = {};
    sheet.data.forEach(function (element, index) {
        if (index !== 0) {
            var value = element.slice(1);
            // Extract element from array if array contains only 1 value
            meta[element[0]] = value.length > 1 ? value : value[0];
        }
    });
    return meta;
};

var parseTwoColumnSheet = function (sheet) {
    var data = {};
    sheet.data.forEach(function (element, index) {
        if (index !== 0) {
            data[element[0]] = element[1];
        }
    });
    return data;
};

var parseExpressionSheet = function (sheet) {
    var expressionData = {};
    var geneData = {};
    expressionData["time_points"] = sheet.data[0].slice(1);
    var numberOfDataPoints = expressionData["time_points"].length;
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
    return expressionData;
};

module.exports = function (workbook) {

    var output = {
        expression: {}, // expression data
        meta: {},
        test: {} // 2-column data
    };

    for (var i = 0; i < workbook.length; i++) {
        var sheet = workbook[i];
        // Parse meta data in "optimization_parameters" sheet
        if (sheet.name === "optimization_parameters") {
            output["meta"] = parseMetaDataSheet(sheet);
        // Parse 2-column sheets
        } else if (TWO_COL_SHEET_NAMES.includes(sheet.name)) {
            output["test"][sheet.name] = parseTwoColumnSheet(sheet);
        // Parse expression sheets
        } else if (isExpressionSheet(sheet.name)) {
            output["expression"][sheet.name] = parseExpressionSheet(sheet);
        }
    }
    return output;
};
