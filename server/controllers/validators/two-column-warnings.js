var constants = require("../workbook-constants");

const addWarnings = (workbook, warningsToAdd) => {
    let warningsCount;
    if (!Object.keys(workbook).includes("warnings")) {
        warningsCount = 0;
        workbook.warnings = [];
    } else {
        warningsCount = workbook.warnings.length;
    }

    const expectedWarningsCount = warningsToAdd.length + warningsCount;
    if (warningsCount < constants.MAX_WARNINGS && expectedWarningsCount <= constants.MAX_WARNINGS) {
        workbook.warnings.push(...warningsToAdd);
    } else {
        workbook.errors.push(constants.errors.warningsCountError);
    }
};

export const addWarning = (workbook, warning) => {
    const warningToAdd = [warning];
    addWarnings(workbook, warningToAdd);
};

export const addError = (output, message) => {
    const errorsCount = output.errors.length;
    const MAX_ERRORS = 20;
    if (errorsCount < constants.MAX_ERRORS) {
        output.errors.push(message);
    } else {
        output.errors.push(constants.errors.errorsCountError);
        return false;
    }
};

const getSheetHeader = sheetName => {
    const productionSheets = ["production_rates", "optimized_production_rates"];
    const thresholdSheets = ["threshold_b", "optimized_threshold_b"];

    if (productionSheets.includes(sheetName)) return ["id", "production_rate"];
    if (sheetName === "degradation_rates") return ["id", "degradation_rate"];
    if (thresholdSheets.includes(sheetName)) return ["id", "threshold_b"];
    if (sheetName === "optimization_parameters") return ["optimization_parameter", "value"];
    if (sheetName === "optimization_diagnostics") return ["Parameter", "Value"];
    return ["id", "value"]; // Default
};

export const isValidGeneName = (geneName, sheetName, rowNum) => {
    const maxGeneNameLength = 12;
    const geneNameRegex = /[^a-z0-9\_\-]/gi;

    // If type of gene is not string, then return a type error, or if string
    if (
        geneName === undefined ||
        geneName === null ||
        (typeof geneName === "string" && geneName.trim() === "")
    ) {
        return { isValid: false };
    }

    if (typeof geneName !== "string") {
        return {
            isValid: false,
            error: constants.errors.invalidGeneTypeError(geneName, sheetName, rowNum + 1),
        };
    } else if (geneName.length > maxGeneNameLength) {
        return {
            isValid: false,
            error: constants.errors.invalidGeneLengthError(geneName, sheetName, rowNum + 1),
        };
    } else if (geneNameRegex.test(geneName)) {
        return {
            isValid: false,
            error: constants.errors.specialCharacterError(geneName, sheetName, rowNum + 1),
        };
    } else {
        return { isValid: true };
    }
};

export const isValidHeader = (header, sheetName) => {
    const expectedHeader = getSheetHeader(sheetName);
    const expectedA1 = expectedHeader[0];
    const expectedB1 = expectedHeader[1];

    const cellA1 = header && header[0];
    const cellB1 = header && header[1];
    const isMissing =
        cellA1 === null ||
        cellA1 === undefined ||
        cellB1 === null ||
        cellB1 === undefined ||
        String(cellA1).trim() === "" ||
        String(cellB1).trim() === "" ||
        (typeof cellA1 === "string" && typeof cellB1 === "number");

    if (isMissing) {
        return {
            isValid: false,
            isMissing: true,
            warning: constants.warnings.additionalSheetMissingColumnHeaderWarning(
                sheetName,
                expectedA1,
                expectedB1
            ),
        };
    }

    if (String(cellA1).trim() !== expectedA1 || String(cellB1).trim() !== expectedB1) {
        return {
            isValid: false,
            isMissing: false,
            warning: constants.warnings.additionalSheetIncorrectColumnHeaderWarning(
                sheetName,
                expectedA1,
                expectedB1
            ),
        };
    }

    return { isValid: true };
};

export const validateRowEntry = (sheetName, geneName, geneValue, rowNum) => {
    const isValueEmpty =
        geneValue === null || geneValue === undefined || String(geneValue).trim() === "";

    const validGeneNameResult = isValidGeneName(geneName, sheetName, rowNum);
    if (!validGeneNameResult.isValid) {
        return {
            isValid: false,
            missingValue: isValueEmpty,
            error: validGeneNameResult.error,
            geneValue,
        };
    }

    if (isValueEmpty) {
        return {
            isValid: true,
            missingValue: true,
            geneName,
        };
    }

    if (typeof geneValue !== "number") {
        return {
            isValid: false,
            missingValue: false,
            error: constants.errors.invalidValueError(
                sheetName,
                geneValue,
                rowNum + 1,
                getSheetHeader(sheetName)[1]
            ),
        };
    }

    return { isValid: true, missingValue: false, geneName, geneValue };
};

const checkOrderOfGenes = (genesInNetwork, genesInSheet, sheetName) => {
    const commonGenes = genesInNetwork.filter(gene => genesInSheet.includes(gene));
    const actualOrderInSheet = genesInSheet.filter(gene => genesInNetwork.includes(gene));

    const isWrongGeneOrder =
        commonGenes.length !== actualOrderInSheet.length ||
        !commonGenes.every((gene, index) => gene === actualOrderInSheet[index]);

    if (isWrongGeneOrder) {
        return {
            isValid: false,
            warning: constants.warnings.wrongGeneOrder(sheetName),
        };
    }
    return { isValid: true };
};

const areExtraGenesInTwoColumnSheet = (genesInNetwork, genesInSheet, sheetName) => {
    const extraGenes = genesInSheet.filter(g => !genesInNetwork.includes(g));

    if (extraGenes.length > 0) {
        return {
            isValid: false,
            warning: constants.warnings.extraGenesWarning(sheetName, extraGenes.join(", ")),
        };
    }
    return { isValid: true };
};

export const applyTwoColumnSheetWarnings = (
    workbook,
    sheetName,
    genesInNetwork,
    valuesMissingGene,
    genesMissingValue
) => {
    const warningsToAdd = [];

    // Check for values that are missing gene IDs
    if (valuesMissingGene.length > 0) {
        warningsToAdd.push(
            constants.warnings.missingGeneIdsWithValues(sheetName, valuesMissingGene.join(", "))
        );
    }

    if (!genesInNetwork || genesInNetwork.length === 0) {
        addWarnings(workbook, warningsToAdd);
        return;
    }

    const genesInSheet = Object.keys(workbook.data);
    const missingGenes = genesInNetwork.filter(g => !genesInSheet.includes(g));

    // Check missing genes
    if (missingGenes.length === genesInNetwork.length) {
        warningsToAdd.push(
            constants.warnings.missingAllGenesAndValues(sheetName, /*isAllGenesMissing=*/ true)
        );
    } else if (missingGenes.length > 0) {
        warningsToAdd.push(
            constants.warnings.missingGenesAndValuesWarningWhenImporting(
                sheetName,
                missingGenes.join(", ")
            )
        );
    }

    // Check missing values
    if (genesInSheet.length > 0 && genesMissingValue.length === genesInSheet.length) {
        warningsToAdd.push(
            constants.warnings.missingAllGenesAndValues(sheetName, /*isAllGenesMissing=*/ false)
        );
    }

    // Check extra genes
    const extraGenesCheckResult = areExtraGenesInTwoColumnSheet(
        genesInNetwork,
        genesInSheet,
        sheetName
    );
    if (!extraGenesCheckResult.isValid) {
        warningsToAdd.push(extraGenesCheckResult.warning);
    }

    // Check order
    const orderCheckResult = checkOrderOfGenes(genesInNetwork, genesInSheet, sheetName);
    if (!orderCheckResult.isValid) {
        warningsToAdd.push(orderCheckResult.warning);
        genesInSheet.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    }

    addWarnings(workbook, warningsToAdd);
};
