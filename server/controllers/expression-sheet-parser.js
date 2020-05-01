// Parses "optimization_paramters," expression data sheets, and 2-column sheets
// from GRNmap input or output workbook

const EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

var numbersToLetters = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H", 8: "I", 9:"J", 10:"K", 11:"L",
    12:"M", 13:"N", 14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T", 20:"U", 21:"V", 22:"W", 23:"X", 24:"Y",
    25:"Z", 26:"AA", 27:"AB", 28:"AC", 29:"AD", 30:"AE", 31:"AF", 32:"AG", 33:"AH", 34:"AI", 35:"AJ", 36:"AK",
    37:"AL", 38:"AM", 39:"AN", 40:"AO", 41:"AP", 42:"AQ", 43:"AR", 44:"AS", 45:"AT", 46:"AU", 47:"AV", 48:"AW",
    49:"AX", 51:"AY", 52:"AZ", 53:"BA", 54:"BB", 55:"BC", 56:"BD", 57:"BE", 58:"BF", 59:"BG", 60:"BH", 61:"BI",
    62:"BJ", 63:"BK", 64:"BL", 65:"BM", 66:"BN", 67:"BO", 68:"BP", 69:"BQ", 70:"BR", 71:"BS", 72:"BT", 73:"BU",
    74:"BV", 75:"BW", 76:"BX"};


const errorsList = {
    idLabelError: function (sheetName) {
        return {
            errorCode: "MISLABELED_ID_CELL",
            possibleCause: "The top left cell of the " + sheetName + " sheet is mislabeled.",
            suggestedFix: "Replace the incorrect label with \'id\' exactly."
        };
    },
    missingColumnHeaderError: function (sheetName) {
        return {
            errorCode: "MISSING_COLUMN_HEADER",
            possibleCause: "A column in the " + sheetName + " sheet is missing a header.",
            suggestedFix: "Add headers to all columns."
        };
    },
    emptyExpressionRowError: function (row, sheetName) {
        return {
            errorCode: "EMPTY_ROW",
            possibleCause: "There is an empty row in the " + sheetName + " sheet. It is located at row " + row + ".",
            suggestedFix: "Delete empty row, or populate with data."
        };
    },
    emptyExpressionColumnError: function (column, sheetName ) {
        var columnLetter = numbersToLetters[column];
        return {
            errorCode: "EMPTY_COLUMN",
            possibleCause: "There is an empty column in the " + sheetName + " sheet. It is located at column " +
            columnLetter + ".",
            suggestedFix: "Delete empty column, or populate with data."
        };
    },
};

const warningsList = {
    missingExpressionWarning: function () {
        return {
            warningCode: "MISSING_EXPRESSION_SHEET",
            errorDescription: "_log2_expression or _log2_optimized_expression worksheet was \
            not detected. The network graph will display without node coloring. If you want \
            the nodes to be colored with expression data, you can upload your own expression \
            data by adding one or more of those worksheets to your Excel workbook or select \
            from data in GRNsight's Expression Database, found in the Node menu or panel."
        };
    },
    extraneousDataWarning: function (sheetName) {
        return {
            warningCode: "EXTRANEOUS_DATA",
            errorDescription: "There is extraneous data outside of the set rows and columns of the " +
            sheetName + " sheet."
        };
    }
};

const addExpWarning = (network, message) => {
    let warningsCount;
    if (!Object.keys(network).includes("warnings")) {
        warningsCount = 0;
        network.warnings = [];
    } else {
        warningsCount = network.warnings.length;
    }
    const MAX_WARNINGS = 75;
    if (warningsCount < MAX_WARNINGS) {
        network.warnings.push(message);
    } else {
        network.errors.push(errorsList.warningsCountError);
        return false;
    }
};

const addExpError = (network, message) => {
    const errorsCount = network.errors.length;
    const MAX_ERRORS = 20;
    if (errorsCount < MAX_ERRORS) {
        network.errors.push(message);
    } else {
        network.errors.push(errorsList.errorsCountError);
        return false;
    }
};

const fillArray = (value, array, length) => { // mutator
    while (array.length < length) {
        array.push(value);
    }
    return array;
};

const isExpressionSheet = (sheetName) => {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.includes(suffix);
    });
};

// Going to continue basing this section off of the parseNetworkSheet function in spreadsheet-controller.js
var parseExpressionSheet = function (sheet) {

    var geneData = {};
    var expressionData = {
        errors: [],
        warnings: [],
        timePoints: [],
        columnGeneNames: []
    };

    // Check that id label is correct. Throw error if not.
    const idLabel = sheet.data[0][0];
    if (idLabel !== "id") {
        addExpError(expressionData, errorsList.idLabelError(sheet.name));
    }

    expressionData.timePoints = sheet.data[0].slice(1);
    const numberOfDataPoints = expressionData.timePoints.length;
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
                addExpWarning(expressionData, warningsList.extraneousDataWarning(sheet.name));
            }
            // Check for missing Column Headers
            if (rowCounter === 0) {
                for (let i = 0; i < rowLength; i++) {
                    if (sheet.data[0][i] === undefined) {
                        addExpError(expressionData, errorsList.missingColumnHeaderError(sheet.name));
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
                        addExpError(expressionData, errorsList.emptyExpressionRowError(i, sheet.name));
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
                addExpError(expressionData, errorsList.emptyExpressionColumnError(i, sheet.name));
            }
        }
    }

    return expressionData;
};

module.exports = function (workbook) {
    const output = {
        expression: {},
        warnings: [],
        errors: []
    };
    var expCount = 0;

    workbook.forEach(function (sheet) {
        if (isExpressionSheet(sheet.name)) {
            output["expression"][sheet.name] = parseExpressionSheet(sheet);
            expCount++;
        }
    });

    if (expCount <= 0) {
        addExpWarning(output, warningsList.missingExpressionWarning());
    }
    return output;
};

