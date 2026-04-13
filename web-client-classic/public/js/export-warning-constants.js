const dataSourceForTwoColumnSheet = {
    degradation_rates: "degradation rates from the backend database from Neymotin et al. (2014)",
    production_rates:
        "production rates from the backend database which are 2X the degradation rates reported in Neymotin et al. (2014)",
    threshold_b: "the default value of 0 for each gene",
};

module.exports = {
    warnings: {
        // ADDITIONAL SHEET WARNINGS
        MISSING_DATABASE_RATES_FOR_TWO_COLUMN_SHEET: function (sheetName, missingGenes = "") {
            const displayName = sheetName.replace(/_/g, " ");
            const singularName = displayName.replace(/s$/, "");

            return {
                warningCode: `MISSING_DATABASE_${sheetName.toUpperCase()}_EXPORT_WARNING`,
                errorDescription: [
                    `GRNsight has detected that there are missing ${displayName} in the exported workbook's '${sheetName}' sheet.`,
                    `These ${displayName} are missing in our database.`,
                    `A ${singularName} will need to be supplied to use this workbook as an input file for GRNmap.`,
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
                        : `The "${sheetName}" sheet was empty in the imported workbook.`,
                    `GRNsight has supplied ${dataSourceForTwoColumnSheet[sheetName]}.`,
                ].join(" "),
            };
        },

        MISSING_ALL_GENES_AND_VALUES: function (sheetName, isAllGenesMissing) {
            const missingType = isAllGenesMissing ? "genes and values" : "values";
            return {
                warningCode: `MISSING_ALL_${missingType.toUpperCase()}_${sheetName.toUpperCase()}`,
                errorDescription: [
                    `There were no ${missingType} supplied`,
                    `in the ${sheetName} sheet in the imported workbook`,
                    `GRNsight has supplied ${dataSourceForTwoColumnSheet[sheetName]}.`,
                ].join(" "),
            };
        },

        WRONG_GENE_ORDER_WHEN_EXPORTING: function (sheetName) {
            return {
                warningCode: `WRONG_GENE_ORDER_${sheetName.toUpperCase()}`,
                errorDescription: [
                    `GRNsight has detected that the genes in the imported workbook's '${sheetName}' sheet`,
                    `were not in the same order as the genes in the 'network' sheet.`,
                    `GRNsight has automatically reordered them to match.`,
                ].join(" "),
            };
        },
    },
};
