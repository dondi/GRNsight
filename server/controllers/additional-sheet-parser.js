// Parses "optimization_paramters" and 2-column sheets
// from GRNmap input or output workbook

const numbersToLetters = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H", 8: "I", 9:"J", 10:"K", 11:"L",
    12:"M", 13:"N", 14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T", 20:"U", 21:"V", 22:"W", 23:"X", 24:"Y",
    25:"Z", 26:"AA", 27:"AB", 28:"AC", 29:"AD", 30:"AE", 31:"AF", 32:"AG", 33:"AH", 34:"AI", 35:"AJ", 36:"AK",
    37:"AL", 38:"AM", 39:"AN", 40:"AO", 41:"AP", 42:"AQ", 43:"AR", 44:"AS", 45:"AT", 46:"AU", 47:"AV", 48:"AW",
    49:"AX", 51:"AY", 52:"AZ", 53:"BA", 54:"BB", 55:"BC", 56:"BD", 57:"BE", 58:"BF", 59:"BG", 60:"BH", 61:"BI",
    62:"BJ", 63:"BK", 64:"BL", 65:"BM", 66:"BN", 67:"BO", 68:"BP", 69:"BQ", 70:"BR", 71:"BS", 72:"BT", 73:"BU",
    74:"BV", 75:"BW", 76:"BX"};

const getSheetHeader = (sheetName, column) => {
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
};

const optimizationParametersTypeKey = {
    alpha: "number", "kk_max": "number", MaxIter: "number", TolFun: "number", MaxFunEval: "number",
    TolX: "number", "production_function": "string", "L_curve": "number", "estimate_params": "number",
    "make_graphs": "number", "fix_P": "number", "fix_b": "number", "expression_timepoints": "object",
    Strain: "object", species: "string", "taxon_id": "number",
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

    incorrectColumnHeaderError: function (sheetName, column) {
        let header = getSheetHeader(sheetName, column);
        let col = numbersToLetters[column];
        return {
            errorCode: "INCORRECT_COLUMN_HEADER",
            possibleCause: `Column ${col} in the ${sheetName} sheet has an incorrect header.`,
            suggestedFix: `Replace the incorrect label with '${header}' exactly.`
        };
    },

    missingColumnHeaderError: function (sheetName, column) {
        let header = getSheetHeader(sheetName, column);
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

    invalidValueError: function (sheetName, value, row, column) {
        let valueType = getSheetHeader(sheetName, column);
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

const parseMetaDataSheet = (sheet) => {
    let meta = {
        data: {},
        errors: [],
        warnings: []
    };
    if (sheet.data[0].length > 1) {
        if (sheet.data[0][0] !== getSheetHeader(sheet.name, 0)) {
            addError(meta, errorsList.incorrectColumnHeaderError(sheet.name, 0));
        }
        if (sheet.data[0][1] !== getSheetHeader(sheet.name, 1)) {
            addError(meta, errorsList.incorrectColumnHeaderError(sheet.name, 1));
        }
    } else {
        // seems a bit sus, but we'll see if this works properly during testing :\
        for (let col = 1; col >= sheet.data[0].length; col--) {
            addError(meta, errorsList.missingColumnHeaderError(sheet.name, col));
        }
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
            // throw an unknown optimization parameter warning/error
        } else if (typeof meta.data[key] !== optimizationParametersTypeKey[key]) {
            if (optimizationParametersTypeKey[key] !== "object" ||
                typeof meta.data[key] !== optimizationParametersObectKey[key]) {
                // throw an error
            }
        } else if (optimizationParametersTypeKey[key] === "object") {
            for (let val of meta.data[key]) {
                if (typeof val !== optimizationParametersObectKey[key]) {
                    // throw an error/warning
                }
            }
        }
    }
    // right now returning meta.data in order to not break code
    return meta.data;
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
        if (sheet.data[0][0] !== getSheetHeader(sheet.name, 0)) {
            addError(output, errorsList.incorrectColumnHeaderError(sheet.name, 0));
        }
        if (sheet.data[0][1] !== getSheetHeader(sheet.name, 1)) {
            addError(output, errorsList.incorrectColumnHeaderError(sheet.name, 1));
        }
    } else {
        // seems a bit sus, but we'll see if this works properly during testing :\
        for (let col = 1; col >= sheet.data[0].length; col--) {
            addError(output, errorsList.missingColumnHeaderError(sheet.name, col));
        }
    }
    // Check Parameter Section
    let row = 1;
    // a missing row is the indicator to move onto the MSE
    while (sheet.data[row].length > 0) {
        if (sheet.data[row].length > 2) {
            // add extraneous data warning
        }
        currentParameter = sheet.data[row][0];
        currentValue = sheet.data[row][1];
        if (optimizationDiagnosticsParameters[currentParameter] === undefined) {
            if (currentParameter === "Gene") {
                row--;
                break;
            }
            // throw an unknown parameter error
        } else if (typeof currentValue !== "number") {
            // throw a value type error
        } else {
            output.data.Parameters[currentParameter] = currentValue;
        }
        row++;
    }
    row++;
    // Check Gene section MSE's
    if (sheet.data[row][0] !== "Gene") {
        // throw MSE gene header error
    }
    for (let col = 1; col < sheet.data[row].length; col++) {
        if (!sheet.data[row][col].includes("MSE")) {
            // throw MSE header warning
        }
        // we still push the header (even tho it's sus) because the gene MSE's are
        // dependent on the order of the column headers
        output.data.MSE["column-headers"].push(sheet.data[row][col]);
    }
    while (row < sheet.data.length) {
        if (sheet.data[row].length > output.data.MSE["column-headers"].length + 1) {
            // throw extraneous data warning
        } else if (sheet.data[row].length <= output.data.MSE["column-headers"].length) {
            for (let i = sheet.data[row].length - 1; i <= output.data.MSE["column-headers"].length; i++) {
                // add missing MSE data warning
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
                if (sheet.data[row][1] !== getSheetHeader(sheet.name, 1)) {
                    addError(output, errorsList.incorrectColumnHeaderError(sheet.name));
                }
            } else {
                addError(output, errorsList.missingColumnHeaderError(sheet.name, 1));
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

module.exports = function (workbook) {
    let output = {
        meta: {}, // optimization_parameters only
        test: {}, // 2-column data
        meta2: {} // optimation_diagnostics only //temporary until where it goes is decided
    };
    workbook.forEach(function (sheet) {
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
};
