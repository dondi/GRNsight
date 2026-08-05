const { CELL_A1_GRN, CELL_A1_PPI } = require("./constants");
// Currently only going to number 76 because currently the workbook errors out at 75+ genes.
var numbersToLetters = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J",
    10: "K",
    11: "L",
    12: "M",
    13: "N",
    14: "O",
    15: "P",
    16: "Q",
    17: "R",
    18: "S",
    19: "T",
    20: "U",
    21: "V",
    22: "W",
    23: "X",
    24: "Y",
    25: "Z",
    26: "AA",
    27: "AB",
    28: "AC",
    29: "AD",
    30: "AE",
    31: "AF",
    32: "AG",
    33: "AH",
    34: "AI",
    35: "AJ",
    36: "AK",
    37: "AL",
    38: "AM",
    39: "AN",
    40: "AO",
    41: "AP",
    42: "AQ",
    43: "AR",
    44: "AS",
    45: "AT",
    46: "AU",
    47: "AV",
    48: "AW",
    49: "AX",
    50: "AY",
    51: "AZ",
    52: "BA",
    53: "BB",
    54: "BC",
    55: "BD",
    56: "BE",
    57: "BF",
    58: "BG",
    59: "BH",
    60: "BI",
    61: "BJ",
    62: "BK",
    63: "BL",
    64: "BM",
    65: "BN",
    66: "BO",
    67: "BP",
    68: "BQ",
    69: "BR",
    70: "BS",
    71: "BT",
    72: "BU",
    73: "BV",
    74: "BW",
    75: "BX",
    76: "BY",
};

const TWO_COL_SHEET_NAMES = [
    "production_rates",
    "degradation_rates",
    "threshold_b",
    "optimized_production_rates",
    "optimized_threshold_b",
];

const MAX_WARNINGS = 75;
const MAX_ERRORS = 20;
const OPTIONAL_TWO_COL_SHEET_NAMES = ["optimization_parameters", "optimization_diagnostics"];

const NETWORK_SHEET_NAMES = ["network", "network_optimized_weights", "network_weights"];

const valuesForEachTwoColSheet = {
    production_rates: "production rates",
    optimized_production_rates: "production rates",
    degradation_rates: "degradation rates",
    threshold_b: "threshold b values",
    optimized_threshold_b: "threshold b values",
};

const grnMapInputSuppliedWarningMessage = (sheetName, value) => {
    const stringValue = String(value);

    const prefix = sheetName.includes("optimized")
        ? `GRNsight is checking because ${stringValue} should have been provided as GRNmap output,`
        : [
              stringValue.charAt(0).toUpperCase() + stringValue.slice(1),
              " will need to be supplied to use this workbook as an input file for GRNmap,",
          ].join("");

    return [prefix, "but will not affect the display of the graph in GRNsight."].join(" ");
};

module.exports = {
    numbersToLetters,
    TWO_COL_SHEET_NAMES,
    OPTIONAL_TWO_COL_SHEET_NAMES,
    NETWORK_SHEET_NAMES,
    MAX_WARNINGS,
    MAX_ERRORS,
    warnings: {
        extraneousDataWarning: function (sheetName, row) {
            return {
                warningCode: "EXTRANEOUS_DATA",
                errorDescription: [
                    `There is extraneous data outside of the set rows and columns`,
                    `of the ${sheetName} sheet in row ${row}.`,
                    `GRNsight does not store the extraneous data,`,
                    `and the graph display will not be affected.`,
                ].join(" "),
            };
        },

        invalidOptimizationParameter: function (sheetName, param, paramType) {
            return {
                warningCode: "INVALID_OPTIMIZATION_PARAMETER",
                errorDescription:
                    `The optimization parameter '${param}' in the ${sheetName} sheet, is invalid. ` +
                    `Please ensure that the optimization parameter's value is a ${paramType}.`,
            };
        },

        unknownOptimizationParameter: function (sheetName, param) {
            return {
                warningCode: "UNKNOWN_OPTIMIZATION_PARAMETER",
                errorDescription:
                    `The optimization parameter '${param}' in the ${sheetName} sheet, is unknown. ` +
                    "Please ensure that the spelling of all optimization_parameters is correct, and " +
                    "make sure that you are using only supported optimization parameters.",
            };
        },

        unknownOptimizationDiagnosticsParameter: function (sheetName, param) {
            return {
                warningCode: "UNKNOWN_OPTIMIZATION_DIAGNOSTICS_PARAMETER",
                errorDescription:
                    `The optimization parameter '${param}' in the ${sheetName} sheet, is unknown. ` +
                    "Please ensure that the spelling of all optimization_parameters is correct, and " +
                    "make sure that you are using only supported optimization parameters.",
            };
        },

        invalidOptimizationDiagnosticsValue: function (sheetName, param) {
            return {
                warningCode: "INVALID_OPTIMIZATION_DIAGNOSTICS_VALUE",
                errorDescription:
                    `The optimization parameter '${param}' in the ${sheetName} sheet, is invalid. ` +
                    "Please ensure that the optimization parameter's value is a number.",
            };
        },

        incorrectMSEGeneHeaderWarning: function (sheetName, row) {
            return {
                warningCode: "INCORRECT_MSE_GENE_HEADER",
                errorDescription:
                    `The Gene Header in row ${row} of the ${sheetName} sheet, is incorrect. ` +
                    `Please ensure that you have an empty row only before Row ${row}, ` +
                    `and that Row ${row} Column A is spelled 'Gene' exactly.`,
            };
        },

        incorrectMSEHeaderWarning: function (sheetName, header, row, columnLetter) {
            return {
                warningCode: "INCORRECT_MSE_HEADER",
                errorDescription:
                    `The header ${header} in row ${row} column ${columnLetter} of the ` +
                    `${sheetName} sheet, does not contain 'MSE' Please ensure that you have the correct column header.`,
            };
        },

        missingMSEDataWarning: function (sheetName, row, columnLetter) {
            return {
                warningCode: "MISSING_MSE_DATA",
                errorDescription:
                    `The MSE data in row ${row} column ${columnLetter} of the ${sheetName} sheet, ` +
                    "is missing. Please ensure that your data is correct and complete.",
            };
        },

        invalidMSEDataWarning: function (sheetName, row, columnLetter) {
            return {
                warningCode: "INVALID_MSE_DATA",
                errorDescription:
                    `The data in row ${row} column ${columnLetter} of the ${sheetName} sheet, ` +
                    "is not a number. Please ensure that your MSE data is correct and only contains numbers.",
            };
        },

        missingSourceGeneWarning: function (row, column) {
            var colLetter = numbersToLetters[column];
            var rowNum = row + 1;
            return {
                warningCode: "MISSING_SOURCE",
                errorDescription:
                    "A source gene name is missing in cell " + colLetter + rowNum + ".",
            };
        },

        missingTargetGeneWarning: function (row, column) {
            var colLetter = numbersToLetters[column];
            var rowNum = row + 1;
            return {
                warningCode: "MISSING_TARGET",
                errorDescription:
                    "A target gene name is missing in cell " + colLetter + rowNum + ".",
            };
        },

        invalidMatrixDataWarning: function (row, column) {
            var colLetter = numbersToLetters[column];
            var rowNum = row + 1;
            return {
                warningCode: "INVALID_DATA",
                errorDescription: "The value in cell " + colLetter + rowNum + ", is undefined.",
            };
        },

        randomDataWarning: function (type, row, column) {
            var colLetter = numbersToLetters[column];
            var rowNum = row + 1;
            return {
                warningCode: "RANDOM_DATA",
                errorDescription:
                    "The value in cell " +
                    colLetter +
                    rowNum +
                    ", has a corresponding source" +
                    " and/or target gene that is detected as " +
                    type +
                    ".",
            };
        },

        emptyRowWarning: function (row) {
            var rowNum = row + 1;
            return {
                warningCode: "EMPTY_ROW",
                errorDescription: "Row " + rowNum + " was found to contain no data.",
            };
        },

        workbookSizeWarning: function (genesLength, edgesLength) {
            return {
                warningCode: "INVALID_NETWORK_SIZE",
                errorDescription:
                    "Your workbook has " +
                    genesLength +
                    " genes, and " +
                    edgesLength +
                    " edges. Please note that workbooks are recommended to have less than 50 genes and 100 edges.",
            };
        },

        networkSizeWarning: function (genesLength, edgesLength) {
            return {
                warningCode: "INVALID_NETWORK_SIZE",
                errorDescription: `Your network has ${genesLength} genes, and ${edgesLength} 
                    edges. Please note that networks are recommended to have less than 50 genes and 100 edges.`,
            };
        },

        incorrectlyNamedSheetWarning: {
            warningCode: "INCORRECTLY_NAMED_SHEET",
            errorDescription:
                "The uploaded file appears to contain a weighted network, but contains no \
                 'network_optimized_weights' sheet. A weighted network must be contained in a sheet called \
                 'network_optimized_weights' in order to be drawn as a weighted graph. \
                 Please check if the sheet(s) in the uploaded spreadsheet have been named properly.",
        },

        missingExpressionSheetWarning: {
            warningCode: "MISSING_EXPRESSION_SHEET",
            errorDescription:
                "_log2_expression or _log2_optimized_expression worksheet was \
            not detected. The network graph will display without node coloring. If you want \
            the nodes to be colored with expression data, you can upload your own expression \
            data by adding one or more of those worksheets to your Excel workbook or select \
            from data in GRNsight's Expression Database, found in the Node menu or panel.",
        },

        noSpeciesInformationDetected: {
            warningCode: "MISSING_SPECIES_INFORMATION",
            errorDescription:
                "No species information was detected in your input file." +
                " GRNsight defaults to Saccharomyces cerevisiae.",
        },

        additionalSheetIncorrectColumnHeaderWarning: function (sheetName, expectedA1, expectedB1) {
            return this.additionSheetMissingOrIncorrectColumnHeaderWarning(
                sheetName,
                expectedA1,
                expectedB1,
                /*isMissing*/ false
            );
        },

        additionalSheetMissingColumnHeaderWarning: function (sheetName, expectedA1, expectedB1) {
            return this.additionSheetMissingOrIncorrectColumnHeaderWarning(
                sheetName,
                expectedA1,
                expectedB1,
                /*isMissing*/ true
            );
        },

        additionSheetMissingOrIncorrectColumnHeaderWarning: function (
            sheetName,
            expectedA1,
            expectedB1,
            isMissing
        ) {
            const headerStatus = isMissing ? "missing" : "incorrect";
            const prefix = sheetName.includes("optimized");
            return {
                warningCode: `${headerStatus.toUpperCase()}_COLUMN_HEADER_${sheetName.toUpperCase()}`,
                errorDescription: prefix
                    ? [
                          `GRNsight has detected that the headers are ${headerStatus} in the workbook's <b>${sheetName}</b> sheet.`,
                          `Cell A1 should contain the text <b>${expectedA1}</b>, and cell B1 should contain the text <b>${expectedB1}</b>, exactly.`,
                          `GRNsight is checking because these headers should have been provided by the GRNmap output, but they will not affect the display of the graph in GRNsight.`,
                      ].join(" ")
                    : [
                          `GRNsight has detected that the headers are ${headerStatus} in the workbook's <b>${sheetName}</b> sheet.`,
                          "The headers will need to be corrected to use this workbook as an input file for GRNmap,",
                          "but will not affect the display of the graph in GRNsight.",
                          `Cell A1 should contain the text <b>${expectedA1}</b>,`,
                          `and cell B1 should contain the text <b>${expectedB1}</b>, exactly.`,
                      ].join(" "),
            };
        },

        unknownSpeciesDetected: function (workbookSpecies, workbookTaxon) {
            return {
                warningCode: "UNKNOWN_SPECIES_DETECTED",
                errorDescription:
                    "GRNsight detected the species " +
                    workbookSpecies +
                    " and the taxon " +
                    workbookTaxon +
                    " in your input file." +
                    " This is not one of the supported species, or was formatted incorrectly" +
                    " GRNsight defaults to Saccharomyces cerevisiae.",
            };
        },

        noWorkbookTypeDetected: {
            warningCode: "MISSING_WORKBOOK_TYPE_INFORMATION",
            errorDescription:
                "No workbook type was detected in your input file." +
                " GRNsight defaults to a gene regulatory network. You can change the workbook type" +
                " selection in the Network menu or panel.",
        },

        unsupportedWorkbookTypeDetected: function (workbookType) {
            return {
                warningCode: "UNKNOWN_WORKBOOK_TYPE_DETECTED",
                errorDescription:
                    "GRNsight detected the workbook type " +
                    workbookType +
                    " in your input file. This is not one of the supported workbook types, or was formatted" +
                    " incorrectly. GRNsight defaults to a gene regulatory network. You can change the workbook type" +
                    " selection in the Network menu or panel.",
            };
        },

        missingExpressionWarning: function () {
            return {
                warningCode: "MISSING_EXPRESSION_SHEET",
                errorDescription:
                    "_log2_expression or _log2_optimized_expression worksheet was \
                not detected. The network graph will display without node coloring. If you want \
                the nodes to be colored with expression data, you can upload your own expression \
                data by adding one or more of those worksheets to your Excel network or select \
                from data in GRNsight's Expression Database, found in the Node menu or panel.",
            };
        },

        emptyExpressionWorkbookWarning: function (sheetName) {
            const expressionWorkbook = sheetName.includes("expression");
            return {
                warningCode: "BLANK_EXPRESSION_SHEET",
                errorDescription: expressionWorkbook
                    ? [
                          `The imported ${sheetName} sheet is blank,`,
                          `so the nodes will not display expression data from that sheet.`,
                      ].join(" ")
                    : [
                          `The imported ${sheetName} sheet is blank`,
                          `This will not affect the display of the graph.`,
                      ].join(" "),
            };
        },

        unrecognizedSheetWarning: function (sheetName) {
            return {
                warningCode: "UNRECOGNIZED_SHEET",
                errorDescription: [
                    `The sheet named '${sheetName}' is unrecognized by GRNsight.`,
                    "Please ensure that all sheets in the workbook are named correctly.",
                    'See the <a href="https://dondi.github.io/GRNsight/documentation.html">GRNsight Documentation page</a> for allowable sheet names.',
                ].join(" "),
            };
        },

        missingGenesAndValuesWarningWhenImporting: function (sheetName, missingGenes) {
            const value = `a ${valuesForEachTwoColSheet[sheetName].replace(/s$/, "")}`;

            const prefix = sheetName.includes("optimized");
            return {
                warningCode: `MISSING_GENES_AND_VALUES_${sheetName.toUpperCase()}`,
                errorDescription: prefix
                    ? [
                          `There were no genes and values supplied in the ${sheetName} sheet in the imported workbook`,
                          grnMapInputSuppliedWarningMessage(sheetName, value),
                      ].join(" ")
                    : [
                          `GRNsight has detected that there are missing genes and ${valuesForEachTwoColSheet[sheetName]}`,
                          `in the imported workbook's ${sheetName} sheet.`,
                          grnMapInputSuppliedWarningMessage(sheetName, value),
                          `The missing genes and values are: ${missingGenes}.`,
                      ].join(" "),
            };
        },

        missingAllGenesAndValues: function (sheetName, isAllGenesMissing) {
            const missingType = isAllGenesMissing ? "genes and values" : "values";
            const value = `a ${valuesForEachTwoColSheet[sheetName].replace(/s$/, "")}`;

            return {
                warningCode: `MISSING_ALL_${missingType.replace(/ /g, "_").toUpperCase()}_${sheetName.toUpperCase()}`,
                errorDescription: [
                    `There were no ${missingType} supplied in the "${sheetName}" sheet in the imported workbook.`,
                    grnMapInputSuppliedWarningMessage(sheetName, value),
                ].join(" "),
            };
        },

        someGenesMissingValuesWarning: function (sheetName, genes) {
            const value = `a ${valuesForEachTwoColSheet[sheetName].replace(/s$/, "")}`;

            return {
                warningCode: `MISSING_VALUES_${sheetName.toUpperCase()}`,
                errorDescription: [
                    `GRNsight has detected that there are missing values for ${value} in the imported workbook's "${sheetName}" sheet.`,
                    grnMapInputSuppliedWarningMessage(sheetName, value),
                    `The genes with missing values are: ${genes}.`,
                ].join(" "),
            };
        },

        extraGenesWarning: function (sheetName, extraGenes) {
            const prefix = sheetName.includes("optimized");

            return {
                warningCode: `EXTRA_GENES_${sheetName.toUpperCase()}`,
                errorDescription: prefix
                    ? [
                          `GRNsight has detected that there are extra genes in the imported workbook's '${sheetName}' sheet.`,
                          `GRNsight is checking because the genes in the '${sheetName}' sheet should have matched the genes `,
                          "in the 'network' sheet from the GRNmap output,",
                          "but this will not affect the display of the graph in GRNsight.",
                          `The extra genes are: ${extraGenes}.`,
                      ].join(" ")
                    : [
                          `GRNsight has detected that there are extra genes in the imported workbook's '${sheetName}' sheet.`,
                          `The genes in the '${sheetName}' sheet need to match the genes in the 'network' sheet to use this workbook`,
                          "as an input file for GRNmap, but will not affect the display of the graph in GRNsight.",
                          `The extra genes are: ${extraGenes}.`,
                      ].join(" "),
            };
        },

        geneMismatchWarning: function (sheetName) {
            return {
                warningCode: "GENE_MISMATCH",
                errorDescription: `Gene names in column A of the "${sheetName}" sheet do not 
                match the order of those in the network sheet. This will not affect the functionality of the graph in GRNsight.`,
            };
        },

        extraGeneNamesWarning: function (sheetName) {
            return {
                warningCode: "EXTRA_GENE_NAME",
                errorDescription: `Gene names in column A of the "${sheetName}" sheet have 
                one or more extra genes than those listed in the network sheet. This will not affect the functionality of the graph in GRNsight.`,
            };
        },

        missingGeneNamesWarning: function (sheetName) {
            return {
                warningCode: "MISSING_GENE_NAME",
                errorDescription: `Gene names in column A of the "${sheetName}"
                    sheet are missing one or more genes from the network sheet. This will not affect the functionality of the graph in GRNsight.`,
            };
        },

        missingGeneIdsWithValues: function (sheetName, valuesMissingGenes) {
            const value = "the missing gene IDs";
            return {
                warningCode: `MISSING_GENE_IDS_WITH_VALUES_${sheetName.toUpperCase()}`,
                errorDescription: [
                    "GRNsight has detected that there are missing gene IDs",
                    `in the imported workbook's ${sheetName} sheet.`,
                    grnMapInputSuppliedWarningMessage(sheetName, value),
                    `The values with missing gene IDs are ${valuesMissingGenes}.`,
                ].join(" "),
            };
        },

        wrongGeneOrder: function (sheetName) {
            const prefix = sheetName.includes("optimized");

            return {
                warningCode: `WRONG_GENE_ORDER_${sheetName.toUpperCase()}`,
                errorDescription: prefix
                    ? [
                          `GRNsight has detected that the genes in the imported workbook's '${sheetName}' sheet`,
                          `were not in the same order as the genes in the 'network' sheet.`,
                          "GRNsight is checking because they should have been in the same order ",
                          "in the GRNmap output, but will not affect the display of the graph in GRNsight.",
                      ].join(" ")
                    : [
                          `GRNsight has detected that the genes in the imported workbook's '${sheetName}' sheet`,
                          `were not in the same order as the genes in the 'network' sheet.`,
                          `The order of the genes in the '${sheetName}' sheet needs to match the gene order in the 'network' sheet`,
                          `to use this workbook as an input file for GRNmap,`,
                          `but will not affect the display of the graph in GRNsight.`,
                      ].join(" "),
            };
        },
    },

    errors: {
        errorsCountError: {
            errorCode: "ERRORS_OVERLOAD",
            possibleCause: "This workbook has over 20 errors.",
            suggestedFix:
                "Please check the format of your spreadsheet with the guidelines outlined on the" +
                "Documentation page and try again. If you fix these errors and try to upload again, there may be " +
                "further errors detected. As a general approach for fixing the errors, consider copying and " +
                "pasting just your adjacency matrix into a fresh Excel Workbook and saving it.",
        },

        warningsCountError: {
            errorCode: "WARNINGS_OVERLOAD",
            possibleCause: "This workbook has over 75 warnings.",
            suggestedFix:
                "Please check the format of your spreadsheet with the guidelines outlined on the" +
                "Documentation page and try again. If you fix these errors and try to upload again, there may be " +
                "further errors detected. As a general approach for fixing the errors, consider copying and " +
                "pasting just your adjacency matrix into a fresh Excel Workbook and saving it.",
        },

        unknownError: {
            errorCode: "UNKNOWN_ERROR",
            possibleCause: "An unexpected error occurred.",
            suggestedFix:
                "Please contact the GRNsight team at kdahlquist@lmu.edu, and attach the spreadsheet you" +
                " attempted to upload.",
        },

        idLabelError: function (sheetName) {
            return {
                errorCode: "MISLABELED_ID_CELL",
                possibleCause: `The top left cell of the ${sheetName} sheet is mislabeled.`,
                suggestedFix: "Replace the incorrect label with \'id\' exactly.",
            };
        },

        invalidGeneLengthError: function (sheetName, gene, row) {
            return {
                errorCode: "INVALID_GENE_LENGTH",
                possibleCause: `Gene '${gene}' in row ${row}, column A in the ${sheetName} sheet is too long.`,
                suggestedFix: "Please make your gene names be less than 13 characters.",
            };
        },

        specialCharacterError: function (sheetName, gene, row) {
            return {
                errorCode: "INVALID_CHARACTER",
                possibleCause: `The value under gene name ${gene} at row ${row} in the ${sheetName} sheet, 
                contains an invalid character.`,
                suggestedFix:
                    "Please ensure all genes in the data are formatted properly with no" +
                    " special characters except for '-' and '_'.",
            };
        },
        missingColumnHeaderError: function (sheetName, columnLetter, header) {
            if (sheetName && columnLetter && header) {
                return {
                    errorCode: "MISSING_COLUMN_HEADER",
                    possibleCause:
                        `Column ${columnLetter} in the ${sheetName}` +
                        ` sheet is missing the header '${header}'.`,
                    suggestedFix: `Set the missing label to '${header}' exactly.`,
                };
            } else {
                return {
                    errorCode: "MISSING_COLUMN_HEADER",
                    possibleCause: `A column in the ${sheetName} sheet is missing a header.`,
                    suggestedFix: "Add headers to all columns.",
                };
            }
        },

        invalidGeneTypeError: function (sheetName, gene, row) {
            return {
                errorCode: "INVALID_GENE_TYPE",
                possibleCause: `Gene '${gene}' in row ${row}, column A in the ${sheetName} sheet is not a string.`,
                suggestedFix: "Please make your gene name a string starting with a letter.",
            };
        },

        invalidValueError: function (sheetName, value, row, valueType) {
            return {
                errorCode: "INVALID_VALUE",
                possibleCause:
                    `${valueType} '${value}' in row ${row},` +
                    ` column B in the ${sheetName} sheet is not a number.`,
                suggestedFix: `Please ensure that all ${valueType} values are numbers.`,
            };
        },

        emptyWorkbookError: function () {
            return {
                errorCode: "EMPTY_NETWORK_ERROR",
                possibleCause:
                    "GRNsight detects that the file you uploaded is empty and \
                does not contain any network information.",
                suggestedFix: "Please review the file and ensure that it specifies a workbook.",
            };
        },

        semanticDuplicateGeneError: function (geneName) {
            return {
                errorCode: "SEMANTIC_DUPLICATE_GENE",
                possibleCause: "There exists a duplicate for " + geneName + ".",
                suggestedFix: "Please remove the duplicate gene and submit again.",
            };
        },

        geneLengthError: function (geneName) {
            return {
                errorCode: "INVALID_GENE_LENGTH",
                possibleCause: "Gene " + geneName + " is more than 12 characters in length.",
                suggestedFix:
                    "Genes may only be between 1 and 12 characters in length. Please" +
                    " shorten the name and submit again.",
            };
        },

        workbookSizeError: function (genesLength, edgesLength) {
            return {
                errorCode: "INVALID_NETWORK_SIZE",
                possibleCause:
                    "This network has " + genesLength + " genes, and " + edgesLength + " edges.",
                suggestedFix:
                    "networks may not have more than 75 genes or 150 edges. Please reduce the size" +
                    " of your network and try again.",
            };
        },

        missingNetworkError: {
            errorCode: "MISSING_NETWORK",
            possibleCause:
                "This file does not have a 'network' sheet or a 'network_optimized_weights' sheet.",
            suggestedFix:
                "Please select another file, or rename the sheet containing the adjacency matrix \
            accordingly. Please refer to the " +
                "<a href='http://dondi.github.io/GRNsight/documentation.html#section1' \
            target='_blank'>Documentation page</a> for more information.",
        },

        corruptGeneError: function (row, column) {
            var colLetter = numbersToLetters[column];
            var rowNum = row + 1;
            return {
                errorCode: "CORRUPT_GENE",
                possibleCause: `The gene name in cell ${colLetter} ${rowNum} appears to be invalid.`,
                suggestedFix: "Please fix the error and try uploading again.",
            };
        },

        missingValueError: function (row, column) {
            var colLetter = numbersToLetters[column];
            var rowNum = row + 1;
            return {
                errorCode: "MISSING_VALUE",
                possibleCause: `The value in the cell ${colLetter} ${rowNum} 
                in the adjacency matrix appears to have a missing value.`,
                suggestedFix:
                    "Please ensure that all cells have a value, then upload the file again.",
            };
        },

        duplicateGeneError: function (geneType, geneName) {
            return {
                errorCode: "DUPLICATE_GENE",
                possibleCause: `There exists a duplicate for ${geneType} gene ${geneName}.`,
                suggestedFix: "Please remove the duplicate gene and submit again.",
            };
        },

        dataTypeError: function (row, column) {
            var colLetter = numbersToLetters[column];
            var rowNum = row + 1;
            return {
                errorCode: "INVALID_CELL_DATA_TYPE",
                possibleCause: `The value in cell ${colLetter} ${rowNum} is not a number.`,
                suggestedFix:
                    "Please ensure all values in the data matrix are numbers and try again.",
            };
        },

        emptyRowError: function (row) {
            var rowNum = row + 1;
            return {
                errorCode: "EMPTY_ROW",
                possibleCause: `Row ${rowNum} does not contain any data.`,
                suggestedFix: `Please ensure all rows contain data and all empty rows are removed. 
                Also, please ensure that no extraneous data is outside of the matrix, 
                as this may cause this error.`,
            };
        },

        emptyRowDataError: function (row, sheetName) {
            var rowNum = row + 1;
            return {
                errorCode: "EMPTY_ROW_DATA",
                possibleCause: `Row ${rowNum}, in the ${sheetName} sheet, was found to contain no data.`,
                suggestedFix: "Populate empty row with data.",
            };
        },

        emptyMatrixDataError: function (sheetName) {
            return {
                errorCode: "EMPTY_MATRIX_DATA",
                possibleCause: `The ${sheetName} sheet was found to contain no data in the adjacency matrix.`,
                suggestedFix: "Populate empty matrix with data.",
            };
        },

        emptyColumnError: function (column, sheetName) {
            var columnLetter = numbersToLetters[column];
            return {
                errorCode: "EMPTY_COLUMN",
                possibleCause: `Column ${columnLetter}, in the ${sheetName} sheet, is empty.`,
                suggestedFix: "Delete empty column, or populate with data.",
            };
        },
        emptyColumnDataError: function (column, sheetName) {
            var columnLetter = numbersToLetters[column];
            return {
                errorCode: "EMPTY_COLUMN_DATA",
                possibleCause: `Column ${columnLetter}, in the ${sheetName} sheet, was found to contain no data.`,
                suggestedFix: "Populate empty column with data.",
            };
        },

        outsideCellError: function (row, column) {
            var colLetter = numbersToLetters[column];
            var rowNum = row + 1;
            return {
                errorCode: "EMPTY_CELL",
                possibleCause: `The cell at ${colLetter} ${rowNum} contains data that is outside the matrix.`,
                suggestedFix:
                    "Please remove all extraneous data from outside the matrix and ensure matrix is correct",
            };
        },

        emptyExpressionRowError: function (row, sheetName) {
            return {
                errorCode: "EMPTY_ROW",
                possibleCause: `There is an empty row in the ${sheetName} sheet. It is located at row ${row}.`,
                suggestedFix: "Delete empty row, or populate with data.",
            };
        },

        emptyExpressionColumnError: function (column, sheetName) {
            var columnLetter = numbersToLetters[column];
            return {
                errorCode: "EMPTY_COLUMN",
                possibleCause: `There is an empty column in the ${sheetName} sheet. It is located at column
                ${columnLetter}.`,
                suggestedFix: "Delete empty column, or populate with data.",
            };
        },

        negativeTimePointError: function (column, sheetName) {
            var columnLetter = numbersToLetters[column];
            return {
                errorCode: "NEGATIVE_TIME_POINT",
                possibleCause: `There is a negative time point in the ${sheetName} sheet. It is located at
                column ${columnLetter}.`,
                suggestedFix:
                    "Change the negative time point to a positive and ensure expression data is correct.",
            };
        },

        nonMonotonicTimePointsError: function (column, sheetName) {
            var columnLetter = numbersToLetters[column];
            return {
                errorCode: "NON_MONOTONIC_TIME_POINTS",
                possibleCause: `The time points located in the ${sheetName} sheet are not sequenced in an increasing 
                fashion. The first instance of this is at column ${columnLetter}.`,
                suggestedFix: `Please ensure that the time points are ordered in an increasing fashion, and ensure 
                expression data is correct.`,
            };
        },

        nonNumericalTimePointsError: function (column, sheetName) {
            var columnLetter = numbersToLetters[column];
            return {
                errorCode: "NON_NUMERICAL_TIME_POINT",
                possibleCause: `There is a non-numerical time point in the ${sheetName} sheet. It is located at
                column ${columnLetter}.`,
                suggestedFix:
                    "Change the non-numerical time point to a positive number and ensure expression data \
                is correct.",
            };
        },

        incorrectCellA1WorkbookError: function (sheetName) {
            return {
                errorCode: "MISLABELED_NETWORK_CELL_A1",
                possibleCause: `The top left cell of the ${sheetName} sheet is mislabeled.`,
                suggestedFix: [
                    `Replace the incorrect label with '${CELL_A1_GRN}' for a gene regulatory network (GRN)`,
                    `or '${CELL_A1_PPI}' for a protein-protein interaction network (PPI) exactly.`,
                ].join(" "),
            };
        },
    },
};
