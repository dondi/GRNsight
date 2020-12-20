// Parses "optimization_paramters" and 2-column sheets
// from GRNmap input or output workbook

const numbersToLetters = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H", 8: "I", 9:"J", 10:"K", 11:"L",
    12:"M", 13:"N", 14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T", 20:"U", 21:"V", 22:"W", 23:"X", 24:"Y",
    25:"Z", 26:"AA", 27:"AB", 28:"AC", 29:"AD", 30:"AE", 31:"AF", 32:"AG", 33:"AH", 34:"AI", 35:"AJ", 36:"AK",
    37:"AL", 38:"AM", 39:"AN", 40:"AO", 41:"AP", 42:"AQ", 43:"AR", 44:"AS", 45:"AT", 46:"AU", 47:"AV", 48:"AW",
    49:"AX", 51:"AY", 52:"AZ", 53:"BA", 54:"BB", 55:"BC", 56:"BD", 57:"BE", 58:"BF", 59:"BG", 60:"BH", 61:"BI",
    62:"BJ", 63:"BK", 64:"BL", 65:"BM", 66:"BN", 67:"BO", 68:"BP", 69:"BQ", 70:"BR", 71:"BS", 72:"BT", 73:"BU",
    74:"BV", 75:"BW", 76:"BX"};

const getSheetHeader = (sheetName, column, row) => {
    if (row === 0) {
        if (sheetName === "production_rates" || sheetName === "optimized_production_rates") {
            return "production_rate";
        } else if (sheetName === "degradation_rates") {
            return "degradation_rate";
        } else if (sheetName === "threshold_b" || sheetName === "optimized_threshold_b") {
            return "threshold_b";
        } else if (sheetName === "optimization_parameters") {
            return (column === 0) ? "optimization_parameter" : "value";
        } else if (sheetName === "optimization_diagnostics") {
            return (column === 0) ? "Parameter" : "Value";
        }
    } else {
        // if (sh)
    }
};

const optimizationParametersTypeKey = {
    alpha: "number", "kk_max": "number", MaxIter: "number", TolFun: "number", MaxFunEval: "number",
    TolX: "number", "production_function": "string", "L_curve": "number", "estimate_params": "number",
    "make_graphs": "number", "fix_P": "number", "fix_b": "number", "expression_timepoints": "object",
    Strain: "object", species: "string", "taxon_id": "number", "simulation_timepoints": "object",
};

const optimizationDiagnosticsParameters = ["LSE", "Penalty", "min LSE", "iteration count"];

const optimizationParametersObectKey = {
    "expression_timepoints": "number", Strain: "string", "simulation_timepoints": "number"
};

const errorsList = {
    idLabelError: function (sheetName) {
        return {
            errorCode: "MISLABELED_ID_CELL",
            possibleCause: `The top left cell of the ${sheetName} sheet is mislabeled.`,
            suggestedFix: "Replace the incorrect label with \'id\' exactly."
        };
    },

    incorrectColumnHeaderError: function (sheetName, column, row) {
        let header = getSheetHeader(sheetName, column, row);
        let col = numbersToLetters[column];
        return {
            errorCode: "INCORRECT_COLUMN_HEADER",
            possibleCause: `Column ${col} in the ${sheetName} sheet has an incorrect header.`,
            suggestedFix: `Replace the incorrect label with '${header}' exactly.`
        };
    },

    missingColumnHeaderError: function (sheetName, column, row) {
        let header = getSheetHeader(sheetName, column, row);
        let col = numbersToLetters[column];
        return {
            errorCode: "MISSING_COLUMN_HEADER",
            possibleCause: `Column ${col} in the ${sheetName} sheet is missing the header '${header}'.`,
            suggestedFix: `Set the missing label to '${header}' exactly.`
        };
    },

    errorsCountError: {
        errorCode: "ERRORS_OVERLOAD",
        possibleCause: "This workbook has over 20 errors.",
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

    invalidValueError: function (sheetName, value, row, column) {
        let valueType = getSheetHeader(sheetName, column, row);
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
            suggestedFix: "Please ensure all genes in the data are formatted properly with no" +
                " special characters except for '-' and '_'"
        };
    },
};

const warningsList = {
    extraneousDataWarning: function (sheetName, row) {
        return {
            warningCode: "EXTRANEOUS_DATA",
            errorDescription: `There is extraneous data outside of the set rows and columns of the 
            ${sheetName} sheet in row ${row}.`
        };
    },
    unknownOptimizationParameter: function (sheetName, param) {
        return {
            warningCode: "UNKNOWN_OPTIMIZATION_PARAMETER",
            errorDescription: `The optimization parameter '${param}' in the ${sheetName} sheet, is unknown. ` +
                "Please ensure that the spelling of all optimization_parameters is correct, and " +
                "make sure that you are using only supported optimization parameters"
        };
    },
    invalidOptimizationParameter: function (sheetName, param) {
        let paramType = optimizationParametersTypeKey[param];
        if (paramType === "object") {
            paramType = `list of ${optimizationParametersObectKey[param]}s`;
        }
        return {
            warningCode: "INVALID_OPTIMIZATION_PARAMETER",
            errorDescription: `The optimization parameter '${param}' in the ${sheetName} sheet, is invalid. ` +
                `Please ensure that the optimization parameter's value is a ${paramType}`
        };
    },

    unknownOptimizationDiagnosticsParameter: function (sheetName, param) {
        return {
            warningCode: "UNKNOWN_OPTIMIZATION_PARAMETER",
            errorDescription: `The optimization parameter '${param}' in the ${sheetName} sheet, is unknown. ` +
                "Please ensure that the spelling of all optimization_parameters is correct, and " +
                "make sure that you are using only supported optimization parameters"
        };
    },
    invalidOptimizationDiagnosticsParameter: function (sheetName, param) {
        return {
            warningCode: "INVALID_OPTIMIZATION_DIAGNOSTICS_PARAMETER",
            errorDescription: `The optimization parameter '${param}' in the ${sheetName} sheet, is invalid. ` +
                "Please ensure that the optimization parameter's value is a number"
        };
    },
    incorrectMSEGeneHeaderWarning: function (sheetName, row) {
        return {
            warningCode: "INCORRECT_MSE_GENE_HEADER",
            errorDescription: `The Gene Header in row ${row} of the ${sheetName} sheet, is incorrect. ` +
                `Please ensure that you have an empty row only before Row ${row}, ` +
                `and that Row ${row} Column A is spelled 'Gene' exactly.`
        };
    },
    incorrectMSEHeaderWarning: function (sheetName, header, row, column) {
        let colLetter = numbersToLetters[column];
        return {
            warningCode: "INCORRECT_MSE_HEADER",
            errorDescription: `The header ${header} in row ${row} column ${colLetter} of the ${sheetName} sheet, ` +
                "does not contain 'MSE' Please ensure that you have the correct column header"
        };
    }
};


const addWarning = (workbook, message) => {
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
        workbook.errors.push(errorsList.warningsCountError);
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
};

const TWO_COL_SHEET_NAMES = [
    "production_rates",
    "degradation_rates",
    "threshold_b",
    "optimized_production_rates",
    "optimized_threshold_b"
];

const validGeneName = (output, sheetName, gene, row) => {
    var maxGeneLength = 12;
    var regex = /[^a-z0-9\_\-]/gi;
    if (typeof gene !== "string") {
        addError(output, errorsList.invalidGeneTypeError(sheetName, gene, row));
        return false;
    } else if (gene.length > maxGeneLength) {
        addError(output, errorsList.invalidGeneLengthError(sheetName, gene, row));
        return false;
    } else if (gene.match(regex) !== null) {
        addError(output, errorsList.specialCharacterError(sheetName, gene, row));
        return false;
    }
    return true;
};
// Optimization Parameters Parser
const parseMetaDataSheet = (sheet) => {
    let meta = {
        data: {},
        errors: [],
        warnings: []
    };
    if (sheet.data[0][0] === undefined) {
        addError(meta, errorsList.missingColumnHeaderError(sheet.name, 0, 0));
    } else if (sheet.data[0][0] !== getSheetHeader(sheet.name, 0, 0)) {
        addError(meta, errorsList.incorrectColumnHeaderError(sheet.name, 0, 0));
    }
    if (sheet.data[0][1] === undefined) {
        addError(meta, errorsList.missingColumnHeaderError(sheet.name, 1, 0));
    } else if (sheet.data[0][1] !== getSheetHeader(sheet.name, 1, 0)) {
        addError(meta, errorsList.incorrectColumnHeaderError(sheet.name, 1, 0));
    }

    sheet.data.forEach(function (element, index) {
        if (index !== 0) {
            const value = element.slice(1);
            // Extract element from array if array contains only 1 value
            meta.data[element[0]] = value.length > 1 ? value : value[0];
        }
    });
    for (let key in meta.data) {
        if (meta.data[key] === undefined) {
            addWarning(meta, warningsList.unknownOptimizationParameter(sheet.name, key));
        } else if (typeof meta.data[key] !== optimizationParametersTypeKey[key]) {
            if (optimizationParametersTypeKey[key] !== "object" ||
                typeof meta.data[key] !== optimizationParametersObectKey[key]) {
                addWarning(meta, warningsList.invalidOptimizationParameter(sheet.name, key));
            }
        } else if (optimizationParametersTypeKey[key] === "object") {
            for (let val of meta.data[key]) {
                if (typeof val !== optimizationParametersObectKey[key]) {
                    // throw error once per object. Makes sure that errors list is not flooded
                    addWarning(meta, warningsList.invalidOptimizationParameter(sheet.name, key));
                    break;
                }
            }
        }
    }
    return meta;
};

const parseOptimizationDiagnosticsSheet = (sheet) => {
    let output = {
        data: {
            Parameters: {},
            MSE: {
                "column-headers": [],
                Genes: {}
            },
        },
        errors: [],
        warnings: [],
    };
    let currentParameter;
    let currentValue;
    let currentGene;
    let currentMSE = [];
    // Check Headers
    if (sheet.data[0].length > 1) {
        if (sheet.data[0][0] !== getSheetHeader(sheet.name, 0, 0)) {
            addError(output, errorsList.incorrectColumnHeaderError(sheet.name, 0, 0));
        }
        if (sheet.data[0][1] !== getSheetHeader(sheet.name, 1, 0)) {
            addError(output, errorsList.incorrectColumnHeaderError(sheet.name, 1, 0));
        }
    } else {
        // seems a bit sus, but we'll see if this works properly during testing :\
        for (let col = 1; col >= sheet.data[0].length; col--) {
            addError(output, errorsList.missingColumnHeaderError(sheet.name, col, 0));
        }
    }
    // Check Parameter Section
    let row = 1;
    // a missing row is the indicator to move onto the MSE
    while (sheet.data[row].length > 0) {
        if (sheet.data[row].length > 2) {
            addWarning(output, warningsList.extraneousDataWarning(sheet.name, row));
        }
        currentParameter = sheet.data[row][0];
        currentValue = sheet.data[row][1];
        if (currentParameter === undefined && currentValue === undefined) {
            // if there is no parameter or value assume that its time to move on
            row++;
            break;
        }
        if (! optimizationDiagnosticsParameters.includes(currentParameter)) {
            if (currentParameter === "Gene") {
                row--;
                break;
            }
            addWarning(output, warningsList.unknownOptimizationDiagnosticsParameter(sheet.name, currentParameter));
        } else if (typeof currentValue !== "number") {
            addWarning(output, warningsList.invalidOptimizationDiagnosticsParameter(sheet.name, currentParameter));
        } else {
            output.data.Parameters[currentParameter] = currentValue;
        }
        row++;
    }
    // Skip until Gene section
    while (sheet.data[row] !== undefined && sheet.data[row].length < 1) {
        row++;
    }
    // Check Gene section MSE's
    if (sheet.data[row].length > 1) {
        if (sheet.data[row][0] !== "Gene") {
            addWarning(output, warningsList.incorrectMSEGeneHeaderWarning(sheet.name, row));
        }
        for (let col = 1; col < sheet.data[row].length; col++) {
            if (!sheet.data[row][col].includes("MSE")) {
                addWarning(output, warningsList.incorrectMSEHeaderWarning(sheet.name, sheet.data[row][col], row, col));
            }
            // we still push the header (even tho it's sus) because the gene MSE's are
            // dependent on the order of the column headers
            output.data.MSE["column-headers"].push(sheet.data[row][col]);
        }
        row++;
        // on to the actual genes
        while (row < sheet.data.length) {
            if (sheet.data[row].length > output.data.MSE["column-headers"].length + 1) {
                addWarning(output, warningsList.extraneousDataWarning(sheet.name, row));
            } else if (sheet.data[row].length <= output.data.MSE["column-headers"].length) {
                for (let i = sheet.data[row].length - 1; i <= output.data.MSE["column-headers"].length; i++) {
                    // add missing MSE data warning in loop
                }
            }
            currentGene = sheet.data[row][0];
            // if it's a valid gene set the key = MSE value
            if (validGeneName(output, sheet.name, currentGene, row)) {
                for (let col = 1; col < sheet.data[row].length; col++) {
                    if (typeof sheet.data[row][col] === "number") {
                        currentMSE.push(sheet.data[row][col]);
                    } else if (sheet.data[row][col] === undefined) {
                        // add missing MSE data warning
                    } else {
                        // add invalid MSE data type warning
                    }
                }
                output.data.MSE.Genes[currentGene] = currentMSE;
                currentMSE = [];
            }
            row++;
        }
    }
    // For Testing Purposes:
    // console.log("Diagnostics Warnings: ", output.warnings);
    // console.log("Diagnostics Errors: ", output.errors);
    return output;
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
                if (sheet.data[row][1] !== getSheetHeader(sheet.name, 1, row)) {
                    addError(output, errorsList.incorrectColumnHeaderError(sheet.name));
                }
            } else {
                addError(output, errorsList.missingColumnHeaderError(sheet.name, 1, row));
            }
        } else {
            currentGene = sheet.data[row][0];
            currentValue = sheet.data[row][1];

            if (validGeneName(output, sheet.name, currentGene, row + 1)) {
                if (typeof currentValue === "number") {
                    output.data[currentGene] = currentValue;
                } else {
                    addError(output, errorsList.invalidValueError(sheet.name, currentValue, row + 1, 1));
                }
            }
        }
    }

    return output;
};

module.exports = function (workbookFile) {
    let output = {
        meta: {
            data: {},
            errors: [],
            warnings: []
        }, // optimization_parameters only
        test: {}, // 2-column data
        meta2: {} // optimation_diagnostics only //temporary until where it goes is decided
    };
    workbookFile.forEach(function (sheet) {
        if (sheet.name === "optimization_parameters") {
            output.meta = parseMetaDataSheet(sheet);
            // above line creates an object from the optimization paramerters sheet
            // these are part of the "meta" property
        } else if (TWO_COL_SHEET_NAMES.includes(sheet.name)) {
            output["test"][sheet.name] = parseTwoColumnSheet(sheet);
        } else if (sheet.name === "optimization_diagnostics") {
            output.meta2 = parseOptimizationDiagnosticsSheet(sheet);
        }
    });
    return output;
}