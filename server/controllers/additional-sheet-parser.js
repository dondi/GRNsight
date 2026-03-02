// Parses "optimization_parameters" and 2-column sheets
// from GRNmap input or output workbook

var constants = require(__dirname + "/workbook-constants");

const getSheetHeader = (sheetName, column, row) => {
    if (row === 0) {
        if (sheetName === "production_rates" || sheetName === "optimized_production_rates") {
            return column === 0 ? "id" : "production_rate";
        } else if (sheetName === "degradation_rates") {
            return column === 0 ? "id" : "degradation_rate";
        } else if (sheetName === "threshold_b" || sheetName === "optimized_threshold_b") {
            return column === 0 ? "id" : "threshold_b";
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

const optimizationParametersObjectKey = {
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
        const exists = workbook.warnings.some(w => w.errorDescription === message.errorDescription);
        if (exists) {
            return false;
        }
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
    checkValidHeaderAndAddWarnings(meta, sheet);

    const isHeaderMissing = meta.warnings.some(
        w => w.warningCode === `MISSING_COLUMN_HEADER_${sheet.name.toUpperCase()}`
    );
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

// check header method
const checkValidHeaderAndAddWarnings = (output, sheet) => {
    const sheetName = sheet.name;
    const expectedCellA1 = getSheetHeader(sheetName, 0, 0);
    const expectedCellB1 = getSheetHeader(sheetName, 1, 0);

    const hasData = sheet.data && sheet.data[0];
    const cellA1 = hasData ? sheet.data[0][0] : undefined;
    const cellB1 = hasData && sheet.data[0].length > 1 ? sheet.data[0][1] : undefined;

    const isMissing =
        cellA1 === null ||
        cellA1 === undefined ||
        cellB1 === null ||
        cellB1 === undefined ||
        String(cellA1).trim() === "" ||
        String(cellB1).trim() === "" ||
        (typeof cellA1 === "string" && typeof cellB1 === "number");

    if (isMissing) {
        addWarning(
            output,
            constants.warnings.additionalSheetMissingColumnHeaderWarning(
                sheetName,
                expectedCellA1,
                expectedCellB1
            )
        );
        return;
    }

    if (cellA1 !== expectedCellA1 || cellB1 !== expectedCellB1) {
        addWarning(
            output,
            constants.warnings.additionalSheetIncorrectColumnHeaderWarning(
                sheetName,
                expectedCellA1,
                expectedCellB1
            )
        );
    }
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
    checkValidHeaderAndAddWarnings(output, sheet);
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

const checkValidGenesAndValuesInTwoColumnSheet = (output, sheet, row, genesMissingValue) => {
    if (!sheet.data[row]) return;

    const currentGene = sheet.data[row][0];
    const currentValue = sheet.data[row][1];

    if (validGeneName(output, sheet.name, currentGene, row + 1)) {
        const isEmpty =
            currentValue === null ||
            currentValue === undefined ||
            (typeof currentValue === "string" && currentValue.trim() === "");
        if (isEmpty) {
            genesMissingValue.push(currentGene);
            output.data[currentGene] = undefined;
        } else {
            if (typeof currentValue === "number") {
                output.data[currentGene] = currentValue;
            } else {
                addError(
                    output,
                    constants.errors.invalidValueError(
                        sheet.name,
                        currentValue,
                        row + 1,
                        getSheetHeader(sheet.name, 1, 0)
                    )
                );
            }
        }
    }
};

const parseTwoColumnSheet = (sheet, genesInNetwork) => {
    let output = {
        data: {},
        errors: [],
        warnings: [],
    };

    if (sheet.data.length === 0) {
        return output;
    }

    const genesMissingValue = [];

    // check to see if the genes are strings and the values are numbers

    for (let row = 0; row < sheet.data.length; row++) {
        if (sheet.data[row].length > 2) {
            addWarning(output, constants.warnings.extraneousDataWarning(sheet.name, row + 1));
        }
        if (row === 0) {
            checkValidHeaderAndAddWarnings(output, sheet);

            const isHeaderMissing = output.warnings.some(
                w => w.warningCode === `MISSING_COLUMN_HEADER_${sheet.name.toUpperCase()}`
            );

            if (!isHeaderMissing) {
                continue;
            }
        }

        checkValidGenesAndValuesInTwoColumnSheet(output, sheet, row, genesMissingValue);
    }

    // Check whether all genes are missing values
    const isAllGenesMissingValues =
        genesInNetwork && genesInNetwork.every(gene => genesMissingValue.includes(gene));
    if (isAllGenesMissingValues) {
        addWarning(
            output,
            constants.warnings.missingAllGenesAndValuesInTwoColumnSheet(
                sheet.name,
                /*isAllGenesMissing=*/ false
            )
        );
    }

    // Check for missing genes in sheet
    if (genesInNetwork) {
        //  Check if the output data keys (genes in sheet) include all genes in the network
        const missingGenes = genesInNetwork.filter(g => !Object.keys(output.data).includes(g));
        if (missingGenes.length > 0) {
            if (missingGenes.length === genesInNetwork.length) {
                addWarning(
                    output,
                    constants.warnings.missingAllGenesAndValuesInTwoColumnSheet(
                        sheet.name,
                        /*isAllGenesMissing=*/ true
                    )
                );
            } else {
                addWarning(
                    output,
                    constants.warnings.missingGenesAndValuesInTwoColumnSheetWarningWhenImporting(
                        sheet.name,
                        missingGenes.join(", ")
                    )
                );
            }
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
