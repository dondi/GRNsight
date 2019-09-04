// Parses "optimization_paramters," expression data sheets, and 2-column sheets
// from GRNmap input or output workbook

var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

var isExpressionSheet = function (sheetName) {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.includes(suffix);
    });
};

var parseExpressionSheet = function (sheet) {
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
        expression: {} // expression data
    };
    workbook.forEach(function (sheet) {
        if (isExpressionSheet(sheet.name)) {
            output["expression"][sheet.name] = parseExpressionSheet(sheet);
        }
    });
    return output;
};
