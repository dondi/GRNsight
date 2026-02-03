// Parses "optimization_paramters" and 2-column sheets
// from GRNmap input or output workbook

var constants = require(__dirname + "/workbook-constants");

const getSheetHeader = (sheetName, column, row) => {
    if (row === 0) {
        if (sheetName === "production_rates" || sheetName === "optimized_production_rates") {
            return "production_rate";
        } else if (sheetName === "degradation_rates") {
            return "degradation_rate";
        } else if (sheetName === "threshold_b" || sheetName === "optimized_threshold_b") {
            return "threshold_b";
        } else if (sheetName === "optimization_parameters") {
            return column === 0 ? "optimization_parameter" : "value";
        } else if (sheetName === "optimization_diagnostics") {
            return column === 0 ? "Parameter" : "Value";
        }
    }
};

const optimizationParametersTypeKey = {
    alpha: "number",
    kk_max: "number",
    MaxIter: "number",
    TolFun: "number",
    MaxFunEval: "number",
    TolX: "number",
    production_function: "string",
    L_curve: "number",
    estimate_params: "number",
    make_graphs: "number",
    fix_P: "number",
    fix_b: "number",
    expression_timepoints: "object",
    Strain: "object",
    species: "string",
    taxon_id: "number",
    workbookType: "string",
    simulation_timepoints: "object",
    b_or_tau: "number",
};

const optimizationDiagnosticsParameters = ["LSE", "Penalty", "min LSE", "iteration count"];

const optimizationParametersObectKey = {
    expression_timepoints: "number",
    Strain: "string",
    simulation_timepoints: "number",
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
        workbook.errors.push(constants.errors.warningsCountError);
        return false;
    }
};

const addError = (output, message) => {
    const errorsCount = output.errors.length;
    const MAX_ERRORS = 20;
    if (errorsCount < MAX_ERRORS) {
        output.errors.push(message);
    } else {
        output.errors.push(constants.errors.errorsCountError);
        return false;
    }
};

const TWO_COL_SHEET_NAMES = [
    "production_rates",
    "degradation_rates",
    "threshold_b",
    "optimized_production_rates",
    "optimized_threshold_b",
];

const validGeneName = (output, sheetName, gene, row) => {
    var maxGeneLength = 12;
    var regex = /[^a-z0-9\_\-]/gi;
    if (typeof gene !== "string") {
        addError(output, constants.errors.invalidGeneTypeError(sheetName, gene, row));
        return false;
    } else if (gene.length > maxGeneLength) {
        addError(output, constants.errors.invalidGeneLengthError(sheetName, gene, row));
        return false;
    } else if (gene.match(regex) !== null) {
        addError(output, constants.errors.specialCharacterError(sheetName, gene, row));
        return false;
    }
    return true;
};
// Optimization Parameters Parser
const parseMetaDataSheet = sheet => {
    let meta = {
        data: {},
        errors: [],
        warnings: [],
    };
    let paramType;
    if (sheet.data[0][0] === undefined) {
        addError(
            meta,
            constants.errors.missingColumnHeaderError(
                sheet.name,
                constants.numbersToLetters[0],
                getSheetHeader(sheet.name, 0, 0)
            )
        );
    } else if (sheet.data[0][0] !== getSheetHeader(sheet.name, 0, 0)) {
        addError(
            meta,
            constants.errors.incorrectColumnHeaderError(
                sheet.name,
                constants.numbersToLetters[0],
                getSheetHeader(sheet.name, 0, 0)
            )
        );
    }
    if (sheet.data[0][1] === undefined) {
        addError(
            meta,
            constants.errors.missingColumnHeaderError(
                sheet.name,
                constants.numbersToLetters[1],
                getSheetHeader(sheet.name, 1, 0)
            )
        );
    } else if (sheet.data[0][1] !== getSheetHeader(sheet.name, 1, 0)) {
        addError(
            meta,
            constants.errors.incorrectColumnHeaderError(
                sheet.name,
                constants.numbersToLetters[1],
                getSheetHeader(sheet.name, 1, 0)
            )
        );
    }

    sheet.data.forEach(function (element, index) {
        if (index !== 0) {
            const value = element.slice(1);
            // Extract element from array if array contains only 1 value
            meta.data[element[0]] = value.length > 1 ? value : value[0];
        }
    });
    for (let key in meta.data) {
        paramType = optimizationParametersTypeKey[key];
        if (paramType === "object") {
            paramType = `list of ${optimizationParametersObectKey[key]}s`;
        }
        if (meta.data[key] === undefined) {
            addWarning(meta, constants.warnings.unknownOptimizationParameter(sheet.name, key));
        } else if (typeof meta.data[key] !== optimizationParametersTypeKey[key]) {
            if (
                optimizationParametersTypeKey[key] !== "object" ||
                typeof meta.data[key] !== optimizationParametersObectKey[key]
            ) {
                addWarning(
                    meta,
                    constants.warnings.invalidOptimizationParameter(sheet.name, key, paramType)
                );
            }
        } else if (optimizationParametersTypeKey[key] === "object") {
            for (let val of meta.data[key]) {
                if (typeof val !== optimizationParametersObectKey[key]) {
                    // throw error once per object. Makes sure that errors list is not flooded
                    addWarning(
                        meta,
                        constants.warnings.invalidOptimizationParameter(sheet.name, key, paramType)
                    );
                    break;
                }
            }
        }
    }
    return meta;
};

const parseOptimizationDiagnosticsSheet = sheet => {
    let output = {
        data: {
            Parameters: {},
            MSE: {
                "column-headers": [],
                Genes: {},
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
            addError(
                output,
                constants.errors.incorrectColumnHeaderError(
                    sheet.name,
                    constants.numbersToLetters[0],
                    getSheetHeader(sheet.name, 0, 0)
                )
            );
        }
        if (sheet.data[0][1] !== getSheetHeader(sheet.name, 1, 0)) {
            addError(
                output,
                constants.errors.incorrectColumnHeaderError(
                    sheet.name,
                    constants.numbersToLetters[1],
                    getSheetHeader(sheet.name, 1, 0)
                )
            );
        }
    } else {
        // seems a bit sus, but we'll see if this works properly during testing :\
        for (let col = 1; col >= sheet.data[0].length; col--) {
            addError(
                output,
                constants.errors.missingColumnHeaderError(
                    sheet.name,
                    constants.numbersToLetters[col],
                    getSheetHeader(sheet.name, col, 0)
                )
            );
        }
    }
    // Check Parameter Section
    let row = 1;
    // a missing row is the indicator to move onto the MSE
    while (sheet.data[row].length > 0) {
        currentParameter = sheet.data[row][0];
        currentValue = sheet.data[row][1];
        if (currentParameter === undefined || currentParameter.replace(/\s+/g, "") === "") {
            if (currentValue === undefined || currentValue.replace(/\s+/g, "") === "") {
                // if there is no parameter or value assume that its time to move on
                row++;
                break;
            }
        }
        if (sheet.data[row].length > 2) {
            addWarning(output, constants.warnings.extraneousDataWarning(sheet.name, row + 1));
        }
        if (!optimizationDiagnosticsParameters.includes(currentParameter)) {
            if (currentParameter === "Gene") {
                row--;
                break;
            }
            addWarning(
                output,
                constants.warnings.unknownOptimizationDiagnosticsParameter(
                    sheet.name,
                    currentParameter
                )
            );
        } else if (typeof currentValue !== "number") {
            addWarning(
                output,
                constants.warnings.invalidOptimizationDiagnosticsValue(sheet.name, currentParameter)
            );
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
            addWarning(
                output,
                constants.warnings.incorrectMSEGeneHeaderWarning(sheet.name, row + 1)
            );
        }
        for (let col = 1; col < sheet.data[row].length; col++) {
            if (!sheet.data[row][col].includes("MSE")) {
                addWarning(
                    output,
                    constants.warnings.incorrectMSEHeaderWarning(
                        sheet.name,
                        sheet.data[row][col],
                        row + 1,
                        constants.numbersToLetters[col]
                    )
                );
            }
            // we still push the header (even tho it's sus) because the gene MSE's are
            // dependent on the order of the column headers
            output.data.MSE["column-headers"].push(sheet.data[row][col]);
        }
        row++;
        // on to the actual genes
        while (row < sheet.data.length) {
            if (sheet.data[row].length > output.data.MSE["column-headers"].length + 1) {
                addWarning(output, constants.warnings.extraneousDataWarning(sheet.name, row + 1));
            }
            currentGene = sheet.data[row][0];
            // if it's a valid gene set the key = MSE value
            if (validGeneName(output, sheet.name, currentGene, row)) {
                for (let col = 1; col <= output.data.MSE["column-headers"].length; col++) {
                    if (typeof sheet.data[row][col] === "number") {
                        currentMSE.push(sheet.data[row][col]);
                    } else if (sheet.data[row][col] === undefined) {
                        addWarning(
                            output,
                            constants.warnings.missingMSEDataWarning(
                                sheet.name,
                                row + 1,
                                constants.numbersToLetters[col]
                            )
                        );
                    } else {
                        addWarning(
                            output,
                            constants.warnings.invalidMSEDataWarning(
                                sheet.name,
                                row + 1,
                                constants.numbersToLetters[col]
                            )
                        );
                    }
                }
                output.data.MSE.Genes[currentGene] = currentMSE;
                currentMSE = [];
            }
            row++;
        }
    }
    return output;
};

const parseTwoColumnSheet = (sheet, genesInNetwork) => {
    let output = {
        data: {},
        errors: [],
        warnings: [],
    };

    let currentGene;
    let currentValue;

    const genesInSheet = [];

    // check to see if the genes are strings and the values are numbers

    for (let row = 0; row < sheet.data.length; row++) {
        if (sheet.data[row].length > 2) {
            addWarning(output, constants.warnings.extraneousDataWarning(sheet.name, row + 1));
        }
        if (row === 0) {
            if (sheet.data[row].length > 0) {
                if (sheet.data[row][0] !== "id") {
                    addError(output, constants.errors.idLabelError(sheet.name));
                }
            }
            if (sheet.data[row].length > 1) {
                if (sheet.data[row][1] !== getSheetHeader(sheet.name, 1, row)) {
                    addError(
                        output,
                        constants.errors.incorrectColumnHeaderError(
                            sheet.name,
                            constants.numbersToLetters[1],
                            getSheetHeader(sheet.name, 1, row)
                        )
                    );
                }
            } else {
                addError(
                    output,
                    constants.errors.missingColumnHeaderError(
                        sheet.name,
                        constants.numbersToLetters[1],
                        getSheetHeader(sheet.name, 1, row)
                    )
                );
            }
        } else {
            currentGene = sheet.data[row][0];
            currentValue = sheet.data[row][1];

            if (validGeneName(output, sheet.name, currentGene, row + 1)) {
                if (typeof currentValue === "number") {
                    output.data[currentGene] = currentValue;
                    genesInSheet.push(currentGene);
                } else {
                    addError(
                        output,
                        constants.errors.invalidValueError(
                            sheet.name,
                            currentValue,
                            row + 1,
                            getSheetHeader(sheet.name, 1, row)
                        )
                    );
                }
            }
        }
    }

    // Check for missing genes in sheet
    if (genesInNetwork) {
        const missingGenes = genesInNetwork.filter(g => !genesInSheet.includes(g));
        if (missingGenes.length > 0) {
            addWarning(
                output,
                constants.warnings.missingGenesInTwoColumnSheetWarningWhenImporting(
                    sheet.name,
                    missingGenes.join(", ")
                )
            );
        }
    }

    return output;
};

module.exports = function (workbookFile, genesInNetwork) {
    let output = {
        meta: {
            data: {},
            errors: [],
            warnings: [],
        }, // optimization_parameters only
        twoColumnSheets: {}, // 2-column data
        meta2: {}, // optimation_diagnostics only //temporary until where it goes is decided
    };
    workbookFile.forEach(function (sheet) {
        if (sheet.name === "optimization_parameters") {
            output.meta = parseMetaDataSheet(sheet);
            // above line creates an object from the optimization paramerters sheet
            // these are part of the "meta" property
        } else if (TWO_COL_SHEET_NAMES.includes(sheet.name)) {
            output.twoColumnSheets[sheet.name] = parseTwoColumnSheet(sheet, genesInNetwork);
        } else if (sheet.name === "optimization_diagnostics") {
            output.meta2 = parseOptimizationDiagnosticsSheet(sheet);
        } else if (
            sheet.name !== "network" &&
            sheet.name !== "network_optimized_weights" &&
            sheet.name !== "network_weights" &&
            !sheet.name.toLowerCase().includes("expression")
        ) {
            addWarning(output, constants.warnings.unrecognizedSheetWarning(sheet.name));
        }
    });
    return output;
};
