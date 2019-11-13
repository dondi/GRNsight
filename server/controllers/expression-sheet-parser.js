// Parses "optimization_paramters," expression data sheets, and 2-column sheets
// from GRNmap input or output workbook

var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];
var spreadsheetController = require(__dirname + "/spreadsheet-controller");

var addExpWarning = function (network, message) {
    var warningsCount
    if(!Object.keys(network).includes('warnings')) {
        warningsCount = 0;
        network['warnings'] = [];
    } else {
        warningsCount = network.warnings.length;
    }
    var MAX_WARNINGS = 75;
    if (warningsCount < MAX_WARNINGS) {
        network.warnings.push(message);
    } else {
        network.errors.push(errorList.warningsCountError);
        return false;
    }
};

var addExpError = function (network, message) {
    var errorsCount = network.errors.length;
    var MAX_ERRORS = 20;
    if (errorsCount < MAX_ERRORS) {
        network.errors.push(message);
    } else {
        network.errors.push(errorList.errorsCountError);
        return false;
    }
};

var errorsList = {
    idLabelError: function () {
        return {
            errorCode: "MISLABELED_ID_CELL",
            possibleCause: "The top left cell of the expression sheet is mislabeled.",
            suggestedFix: "Replace the incorrect label with \'id\' exactly."
        };
    },
    missingColumnHeaderError: function () {
        return {
            errorCode: "MISSING_COLUMN_HEADER",
            possibleCause: "A column in the expression sheet is missing a header.",
            suggestedFix: "Add headers to all columns."
        };
    },
    emptyExpressionRowError: function () {
        return {
            errorCode: "EMPTY_ROW",
            possibleCause: "There is an empty row in the input sheet.",
            suggestedFix: "Delete empty row, or populate with data."
        };
    },
};

var warningsList = {
    missingExpressionWarning: function () {
        return {
            warningCode: "MISSING_EXPRESSION_SHEET",
            errorDescription: "_log2_expression or _log2_optimized_expression worksheet was not detected. The network graph will display without node coloring."
        };
    },
    extraneousDataWarning: function () {
        return {
            warningCode: "EXTRANEOUS_DATA",
            errorDescription: "There is extraneous data outside of the set rows and columns of the expression sheet."
        };        
    }
};

var fillArray = function (value, array, length) { // mutator
    while (array.length < length) {
        array.push(value);
    }
    return array;
};

var isExpressionSheet = function (sheetName) {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.includes(suffix);
    });
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
        time_points: []
    };

    // Check that id label is correct. Throw error if not.
    var idLabel = sheet['data'][0][0];
    if(idLabel !== 'id') {
        addExpError(expressionData, errorsList.idLabelError());
    }

    expressionData["time_points"] = sheet.data[0].slice(1);
    var numberOfDataPoints = expressionData["time_points"].length;
    var geneNames = [];
    sheet.data.forEach(function (sheet) {
        var geneName = sheet[0];
        if (geneName) {
            geneNames.push(geneName)
            var rowData = sheet.slice(1);
            // Sometimes, missing data is at the end of the row. In this case, pad the
            // array with nulls
            if (rowData.length < numberOfDataPoints) {
                fillArray(null, rowData, numberOfDataPoints);
            }
            geneData[geneName] = rowData;
        }
    });
    geneNames = geneNames.slice(1);
    expressionData["data"] = geneData;
    // May need to be updated...b/c we still want to populate the warnings/errors lists
    // if the 'id' cell is mislabeled.
    if (expressionData["data"]["id"]) {
        // Throw warning in case of extraneous data
        // Need to add a case where it checks the depth of the columns, as well.
        var rowLength = expressionData["data"]["id"].length;
        Object.values(expressionData["data"]).forEach(function(row) {
            if (row.length !== rowLength) {
                addExpWarning(expressionData, warningsList.extraneousDataWarning());
            }

            // Throw error in case of empty row
            var nonnullCount = 0;
            for(var i = 0; i <= rowLength; i++) {
                if(i === rowLength) {
                    if (nonnullCount === 0) {
                        addExpError(expressionData, errorsList.emptyExpressionRowError());
                        break;
                    }
                } else {
                    if(row[i]) {
                        nonnullCount++;
                    }
                }
            }
        });

        // Throw error in case of missing column header
        var nonemptyValues = 0;
        expressionData["data"]["id"].forEach(function(){
            nonemptyValues++;
        })
        if(rowLength !== nonemptyValues) {
            addExpError(expressionData, errorsList.missingColumnHeaderError());
        }

    }

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