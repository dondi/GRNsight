// Parses "optimization_paramters" and 2-column sheets
// from GRNmap input or output workbook

var numbersToLetters = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H", 8: "I", 9:"J", 10:"K", 11:"L",
    12:"M", 13:"N", 14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T", 20:"U", 21:"V", 22:"W", 23:"X", 24:"Y",
    25:"Z", 26:"AA", 27:"AB", 28:"AC", 29:"AD", 30:"AE", 31:"AF", 32:"AG", 33:"AH", 34:"AI", 35:"AJ", 36:"AK",
    37:"AL", 38:"AM", 39:"AN", 40:"AO", 41:"AP", 42:"AQ", 43:"AR", 44:"AS", 45:"AT", 46:"AU", 47:"AV", 48:"AW",
    49:"AX", 51:"AY", 52:"AZ", 53:"BA", 54:"BB", 55:"BC", 56:"BD", 57:"BE", 58:"BF", 59:"BG", 60:"BH", 61:"BI",
    62:"BJ", 63:"BK", 64:"BL", 65:"BM", 66:"BN", 67:"BO", 68:"BP", 69:"BQ", 70:"BR", 71:"BS", 72:"BT", 73:"BU",
    74:"BV", 75:"BW", 76:"BX"};

const getTwoColSheetHeader = (sheetName) => {
    if (sheetName === "production_rates" || sheetName === "optimized_production_rates") {
        return "production_rate";
    } else if (sheetName === "degradation_rates") {
        return "degradation_rate";
    } else if (sheetName === "threshold_b" || sheetName === "optimized_threshold_b") {
        return "threshold_b";
    }
};

const errorsList = {
    idLabelError: function (sheetName) {
        return {
            errorCode: "MISLABELED_ID_CELL",
            possibleCause: `The top left cell of the ${sheetName} sheet is mislabeled.`,
            suggestedFix: "Replace the incorrect label with \'id\' exactly."
        };
    },

    incorrectColumnHeaderError: function (sheetName) {
        let header = getTwoColSheetHeader(sheetName);
        return {
            errorCode: "INCORRECT_COLUMN_HEADER",
            possibleCause: `Column B in the ${sheetName} sheet has an incorrect header.`,
            suggestedFix: `Replace the incorrect label with '${header}' exactly.`
        };
    },

    missingColumnHeaderError: function (sheetName, column) {
        let header = getTwoColSheetHeader(sheetName);
        let col = numbersToLetters[column];
        return {
            errorCode: "MISSING_COLUMN_HEADER",
            possibleCause: `Column ${col} in the ${sheetName} sheet is missing the header '${header}'.`,
            suggestedFix: `Set the missing label to '${header}' exactly.`
        };
    },

    errorsCountError: {
        errorCode: "ERRORS_OVERLOAD",
        possibleCause: "This network has over 20 errors.",
        suggestedFix: "Please check the format of your spreadsheet with the guidelines outlined on the" +
            "Documentation page and try again. If you fix these errors and try to upload again, there may be " +
            "further errors detected. As a general approach for fixing the errors, consider copying and " +
            "pasting just your adjacency matrix into a fresh Excel Workbook and saving it."
    },

    invalidGeneTypeError: function (sheetName, gene, row) {
        return {
            errorCode: "INVALID_GENE_TYPE",
            possibleCause: `Gene '${gene}' in row ${row}, column A in the ${sheetName} sheet is not a string.`,
            suggestedFix: "Please make your gene name a string starting with a letter."
        };
    },

    invalidValueError: function (sheetName, value, row) {
        let valueType = getTwoColSheetHeader(sheetName);
        return {
            errorCode: "INVALID_VALUE",
            possibleCause: `${valueType} '${value}' in row ${row}, column B in the ${sheetName} sheet is not a number.`,
            suggestedFix: `Please ensure that all ${valueType} values are numbers.`
        };
    },

    invalidGeneLengthError: function (sheetName, gene, row) {
        return {
            errorCode: "INVALID_GENE_LENGTH",
            possibleCause: `Gene '${gene}' in row ${row}, column A in the ${sheetName} sheet is too long.`,
            suggestedFix: "Please make your gene names be less than 13 characters"
        };
    },

    specialCharacterError: function (sheetName, gene, row) {
        return {
            errorCode: "INVALID_CHARACTER",
            possibleCause: `The value under gene name ${gene} at row ${row} in the ${sheetName} sheet, 
            contains an invalid character.`,
            suggestedFix: "Please ensure all values in the data does not contain special characters" +
            " except for '-' and '_'."
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
    extraneousDataWarning: function (sheetName, row) {
        return {
            warningCode: "EXTRANEOUS_DATA",
            errorDescription: `There is extraneous data outside of the set rows and columns of the 
            ${sheetName} sheet in row ${row}.`
        };
    }
};


const addWarning = (network, message) => {
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

const addError = (output, message) => {
    const errorsCount = output.errors.length;
    const MAX_ERRORS = 20;
    if (errorsCount < MAX_ERRORS) {
        output.errors.push(message);
    } else {
        output.errors.push(errorsList.errorsCountError);
        return false;
    }
}


const TWO_COL_SHEET_NAMES = [
    "production_rates",
    "degradation_rates",
    "threshold_b",
    "optimized_production_rates",
    "optimized_threshold_b"
];

const parseMetaDataSheet = (sheet) => {
    let meta = {};
    sheet.data.forEach(function (element, index) {
        if (index !== 0) {
            const value = element.slice(1);
            // Extract element from array if array contains only 1 value
            meta[element[0]] = value.length > 1 ? value : value[0];
        }
    });
    return meta;
};

const validGeneName = (output, sheetName, gene, row) => {
    var maxGeneLength = 12;
    var regex = /[^a-z0-9\_\-]/gi;
    if (typeof gene !== String) {
        addError(output, errorsList.invalidGeneTypeError(sheetName, gene, row));
        return false;
    } else if (gene.length > maxGeneLength) {
        addError(output, errorsList.invalidGeneLength(sheetName, gene, row));
        return false;
    } else if (gene.match(regex) === null) {
        addError(output, errorsList.specialCharacterError(sheetName, gene, row));
        return false;
    }
    return true;
};

const parseTwoColumnSheet = (sheet) => {
    let output = {
        data : {},
        errors: [],
        warnings: [],
    };

    let currentGene;
    let currentValue;

    // check to see if the genes are strings and the values are numbers

    for (let row = 0; row < sheet.data.length; row++) {
        if (sheet.data[row].length > 2) {
            addWarning(output, warningsList.extraneousDataWarning(sheet.name, row + 1));
        }
        if (row === 0) {
            if (sheet.data[row].length > 0) {
                if (sheet.data[row][0] !== "id") {
                    addError(output, errorsList.idLabelError(sheet.name));
                }
            }
            if (sheet.data[row].length > 1) {
                if (sheet.data[row][1] !== getTwoColSheetHeader(sheet.name)) {
                    addError(output, errorsList.incorrectColumnHeaderError(sheet.name));
                }
            }
        } else {
            currentGene = sheet.data[row][0];
            currentValue = sheet.data[row][1];

            if (validGeneName(output, sheet.name, currentGene, row + 1)) {
                if (typeof currentValue === Number) {
                    output.data[currentGene] = currentValue;
                } else {
                    addError(output, errorsList.invalidValueError(sheet.name, currentValue, row + 1))
                }
            }
        }
    }

    /**
     * Original Function
     */

    // sheet.data.forEach(function (element, index) {

    //     if (index !== 0) {
    //         if (validGeneName(element[0], index)) {
    //             if (typeof element[1] === Number) {
    //                 output.data[element[0]] = element[1];
    //             }
    //         }
    //     }
    // });


    // change to return output once we figure out where to place the error messages
    return output.data;
};

module.exports = function (workbook) {
    let output = {
        meta: {},
        test: {} // 2-column data
    };
    workbook.forEach(function (sheet) {
        if (sheet.name === "optimization_parameters") {
            output.meta = parseMetaDataSheet(sheet);
            // above line creates an object from the optimization paramerters sheet
            // these are part of the "meta" property
        // Parse 2-column sheets
        } else if (TWO_COL_SHEET_NAMES.includes(sheet.name)) {
            output["test"][sheet.name] = parseTwoColumnSheet(sheet);
        }

        // check all 2 column sheets to see if they have the same genes
    });
    return output;
};
