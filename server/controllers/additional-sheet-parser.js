// Parses "optimization_parameters" and 2-column sheets
// from GRNmap input or output workbook
const {
    applyTwoColumnSheetWarnings,
    isValidHeader,
    isValidGeneName,
    validateRowEntry,
    addWarning,
    addError,
} = require("./validators/two-column-warnings");

var constants = require(__dirname + "/workbook-constants");

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

const optimizationParametersObjectKey = {
    expression_timepoints: "number",
    Strain: "string",
    simulation_timepoints: "number",
};

// Optimization Parameters Parser
const parseMetaDataSheet = sheet => {
    let meta = {
        data: {},
        errors: [],
        warnings: [],
    };
    let paramType;
    const isValidHeaderResult = isValidHeader(sheet.data[0], sheet.name);
    if (!isValidHeaderResult.isValid) {
        addWarning(meta, isValidHeaderResult.warning);
    }

    const isHeaderMissing = isValidHeaderResult.isMissing;
    sheet.data.forEach(function (element, index) {
        if (!isHeaderMissing && index === 0) {
            return;
        }
        const value = element.slice(1);
        // Extract element from array if array contains only 1 value
        meta.data[element[0]] = value.length > 1 ? value : value[0];
    });
    for (let key in meta.data) {
        paramType = optimizationParametersTypeKey[key];
        if (paramType === "object") {
            paramType = `list of ${optimizationParametersObjectKey[key]}s`;
        }
        if (meta.data[key] === undefined) {
            addWarning(meta, constants.warnings.unknownOptimizationParameter(sheet.name, key));
        } else if (typeof meta.data[key] !== optimizationParametersTypeKey[key]) {
            if (
                optimizationParametersTypeKey[key] !== "object" ||
                typeof meta.data[key] !== optimizationParametersObjectKey[key]
            ) {
                addWarning(
                    meta,
                    constants.warnings.invalidOptimizationParameter(sheet.name, key, paramType)
                );
            }
        } else if (optimizationParametersTypeKey[key] === "object") {
            for (let val of meta.data[key]) {
                if (typeof val !== optimizationParametersObjectKey[key]) {
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
    const isValidHeaderResult = isValidHeader(sheet.data[0], sheet.name);
    if (!isValidHeaderResult.isValid) {
        addWarning(output, isValidHeaderResult.warning);
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
            const isValidGeneNameResult = isValidGeneName(currentGene, sheet.name, row);
            if (isValidGeneNameResult.isValid) {
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

const validData = data => {
    return data !== undefined && data !== null && !(typeof data === "string" && data.trim() === "");
};

const parseTwoColumnSheet = (sheet, genesInNetwork) => {
    let output = {
        data: {},
        errors: [],
        warnings: [],
    };

    if (!sheet.data || sheet.data.length === 0) {
        addWarning(
            output,
            constants.warnings.missingAllGenesAndValues({
                sheetName: sheet.name,
                allGenesMissing: true,
                missingGenes: "",
            })
        );
        return output;
    }

    const genesMissingValue = [];
    const valuesMissingGene = [];

    for (let row = 0; row < sheet.data.length; row++) {
        const rowData = sheet.data[row];
        const rowNum = row + 1;

        // Extraneous Data Check
        if (rowData.length > 2) {
            addWarning(output, constants.warnings.extraneousDataWarning(sheet.name, rowNum));
        }

        // Header Validation (Row 0)
        if (row === 0) {
            const headerValidation = isValidHeader(rowData, sheet.name);
            if (!headerValidation.isValid) {
                addWarning(output, headerValidation.warning);

                if (!headerValidation.isMissing) {
                    continue;
                }
            } else {
                continue;
            }
        }

        const geneName = rowData[0];
        const geneValue = rowData[1];

        // Row Data Validation
        const result = validateRowEntry(sheet.name, geneName, geneValue, rowNum);

        if (result.isValid) {
            output.data[result.geneName] = result.missingValue ? undefined : result.geneValue;
            if (result.missingValue) {
                if (validData(result.geneName)) {
                    genesMissingValue.push(result.geneName);
                }
            }
        } else {
            if (result.error) {
                addError(output, result.error);
            }
            if (!result.missingValue && validData(result.geneValue)) {
                valuesMissingGene.push(result.geneValue);
            }
        }
    }

    applyTwoColumnSheetWarnings(
        output,
        sheet.name,
        genesInNetwork,
        valuesMissingGene,
        genesMissingValue
    );

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
            // above line creates an object from the optimization parameters sheet
            // these are part of the "meta" property
        } else if (constants.TWO_COL_SHEET_NAMES.includes(sheet.name)) {
            output.twoColumnSheets[sheet.name] = parseTwoColumnSheet(sheet, genesInNetwork);
        } else if (sheet.name === "optimization_diagnostics") {
            output.meta2 = parseOptimizationDiagnosticsSheet(sheet);
        }
    });
    return output;
};
