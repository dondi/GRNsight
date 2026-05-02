const PROD_RATE_MSG =
    "production rates from the backend database which are 2X the degradation rates reported in Neymotin et al. (2014)";
const THRESHOLD_MSG = "the default value of 0 for each gene";

const dataSourceForTwoColumnSheet = {
    degradation_rates: "degradation rates from the backend database from Neymotin et al. (2014)",
    production_rates: PROD_RATE_MSG,
    optimized_production_rates: PROD_RATE_MSG,
    threshold_b: THRESHOLD_MSG,
    optimized_threshold_b: THRESHOLD_MSG,
};

const valuesForEachTwoColSheet = {
    production_rates: "production rates",
    optimized_production_rates: "production rates",
    degradation_rates: "degradation rates",
    threshold_b: "threshold b values",
    optimized_threshold_b: "threshold b values",
};

const grnMapInputSuppliedWarningMessage = (sheetName, value) => {
    const stringValue = String(value);

    const msg = sheetName.includes("optimized")
        ? `GRNsight is checking because ${stringValue} should have been provided as GRNmap output.`
        : [
              stringValue.charAt(0).toUpperCase() + stringValue.slice(1),
              " will need to be supplied to use this workbook as an input file for GRNmap.",
          ].join("");

    return msg;
};

module.exports = {
    warnings: {
        // ADDITIONAL SHEET WARNINGS
        MISSING_DATABASE_RATES: function (sheetName, missingGenes = "") {
            const value = valuesForEachTwoColSheet[sheetName] || "values";

            return {
                warningCode: `MISSING_DATABASE_${sheetName.toUpperCase()}_EXPORT_WARNING`,
                errorDescription: [
                    `GRNsight has detected that there are missing ${value} in the exported workbook's "${sheetName}" sheet.`,
                    `These ${value} are missing in our database.`,
                    `${grnMapInputSuppliedWarningMessage(sheetName, value)}`,
                    `The missing values are for the genes: ${missingGenes}.`,
                ].join(" "),
            };
        },

        MISSING_OR_EMPTY_TWO_COLUMN_SHEET: function (sheetName, isMissing) {
            return {
                warningCode: `MISSING_OR_EMPTY_${sheetName.toUpperCase()}_SHEET`,
                errorDescription: [
                    isMissing
                        ? `There was no "${sheetName}" sheet in the imported workbook.`
                        : `The "${sheetName}" sheet was empty in the exported workbook.`,
                    `GRNsight is checking because a ${sheetName.split("_")[1] + " " + sheetName.split("_")[2]}`,
                    `value should have been provided as GRNmap output, but will not `,
                    `affect the display of the graph in GRNsight.`,
                ].join(" "),
            };
        },

        MISSING_ALL_GENES_AND_VALUES: function (sheetName, isAllGenesMissing) {
            const missingType = isAllGenesMissing ? "genes and values" : "values";
            return {
                warningCode: `MISSING_ALL_${missingType.toUpperCase()}_${sheetName.toUpperCase()}`,
                errorDescription: [
                    `There were no ${missingType} supplied`,
                    `in the "${sheetName}" sheet in the exported workbook.`,
                    `GRNsight has supplied ${dataSourceForTwoColumnSheet[sheetName]}.`,
                ].join(" "),
            };
        },

        WRONG_GENE_ORDER: function (sheetName) {
            return {
                warningCode: `WRONG_GENE_ORDER_${sheetName.toUpperCase()}`,
                errorDescription: [
                    `GRNsight has detected that the genes in the imported workbook's "${sheetName}" sheet`,
                    `were not in the same order as the genes in the 'network' sheet.`,
                    `GRNsight has automatically reordered them to match.`,
                ].join(" "),
            };
        },
    },
};
