// Parses "optimization_paramters," expression data sheets, and 2-column sheets
// from GRNmap input or output workbook

var constants = require(__dirname + "/workbook-constants");

const EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

const addExpWarning = (workbook, message) => {
    let warningsCount;
    if (!Object.keys(workbook).includes("warnings")) {
        warningsCount = 0;
        workbook.warnings = [];
    } else {
        warningsCount = workbook.warnings.length;
    }
    const MAX_WARNINGS = 75;
    if (warningsCount < MAX_WARNINGS) {
        workbook.warnings.push(message);
    } else {
        workbook.errors.push(constants.errors.warningsCountError);
        return false;
    }
};

const addExpError = (workbook, message) => {
    const errorsCount = workbook.errors.length;
    const MAX_ERRORS = 20;
    if (errorsCount < MAX_ERRORS) {
        workbook.errors.push(message);
    } else {
        workbook.errors.push(constants.errors.errorsCountError);
        return false;
    }
};

const fillArray = (value, array, length) => {
    // mutator
    while (array.length < length) {
        array.push(value);
    }
    return array;
};

const isExpressionSheet = sheetName => {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.includes(suffix);
    });
};

// Going to continue basing this section off of the parseWorkbookSheet function in spreadsheet-controller.js
var parseExpressionSheet = function (sheet) {
    var geneData = {};
    var expressionData = {
        errors: [],
        warnings: [],
        timePoints: [],
        columnGeneNames: [],
    };

    // Check that id label is correct. Throw error if not.
    const idLabel = sheet.data[0][0];
    if (idLabel !== "id") {
        addExpError(expressionData, constants.errors.idLabelError(sheet.name));
    }
    expressionData.timePoints = sheet.data[0].slice(1);
    const numberOfDataPoints = expressionData.timePoints.length;
    let compareTimePoint = 0;
    for (let i = 0; i < numberOfDataPoints; i++) {
        if (isNaN(expressionData.timePoints[i]) && expressionData.timePoints[i] !== undefined) {
            addExpError(
                expressionData,
                constants.errors.nonNumericalTimePointsError(i + 1, sheet.name)
            );
        } else if (expressionData.timePoints[i] < 0) {
            addExpError(expressionData, constants.errors.negativeTimePointError(i + 1, sheet.name));
        } else if (expressionData.timePoints[i] < compareTimePoint) {
            addExpError(
                expressionData,
                constants.errors.nonMonotonicTimePointsError(i + 1, sheet.name)
            );
            break;
        } else {
            compareTimePoint = expressionData.timePoints[i];
        }
    }
    let geneNames = [];
    sheet.data.forEach(function (sheet) {
        const geneName = sheet[0];
        if (geneName) {
            geneNames.push(geneName);
            const rowData = sheet.slice(1);
            // Sometimes, missing data is at the end of the row. In this case, pad the
            // array with nulls
            if (rowData.length < numberOfDataPoints) {
                fillArray(null, rowData, numberOfDataPoints);
            }
            geneData[geneName] = rowData;
        }
    });
    geneNames = geneNames.slice(1);
    geneNames.forEach(x => expressionData.columnGeneNames.push(x));
    expressionData.data = geneData;
    if (expressionData.data.id) {
        // Throw warning in case of extraneous data
        // Need to add a case where it checks the depth of the columns, as well
        const rowLength = expressionData.data.id.length;
        let rowCounter = 0;
        let columnChecker = new Array(rowLength).fill(0);
        Object.values(expressionData.data).forEach(function (row) {
            if (row.length !== rowLength) {
                addExpWarning(
                    expressionData,
                    constants.warnings.extraneousDataWarning(sheet.name, row)
                );
            }
            // Check for missing Column Headers
            if (rowCounter === 0) {
                for (let i = 0; i < rowLength; i++) {
                    if (sheet.data[0][i] === undefined) {
                        addExpError(
                            expressionData,
                            constants.errors.missingColumnHeaderError(sheet.name)
                        );
                    }
                }
            } else {
                for (var i = 0; i < rowLength; i++) {
                    if (sheet.data[rowCounter][i] !== undefined) {
                        columnChecker[i]++;
                    }
                }
            }

            let nonnullCount = 0;
            // check for empty rows
            for (let i = 0; i <= rowLength; i++) {
                if (i === rowLength) {
                    if (nonnullCount === 0) {
                        addExpError(
                            expressionData,
                            constants.errors.emptyExpressionRowError(i, sheet.name)
                        );
                        break;
                    }
                } else {
                    if (row[i]) {
                        nonnullCount++;
                    }
                }
            }
            rowCounter++;
        });
        // check for empty columns
        for (var i = 0; i < columnChecker.length; i++) {
            if (columnChecker[i] === 0) {
                addExpError(
                    expressionData,
                    constants.errors.emptyExpressionColumnError(i, sheet.name)
                );
            }
        }
    }

    return expressionData;
};

module.exports = function (workbook) {
    const output = {
        expression: {},
        warnings: [],
        errors: [],
    };

    workbook.forEach(function (sheet) {
        if (isExpressionSheet(sheet.name)) {
            output["expression"][sheet.name] = parseExpressionSheet(sheet);
        }
    });
    return output;
};
