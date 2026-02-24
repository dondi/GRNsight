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

        MISSING_OR_EMPTY_DEGRADATION_RATES_SHEET: isMissing => ({
            warningCode: "MISSING_OR_EMPTY_DEGRADATION_RATES_SHEET",
            errorDescription: [
                isMissing
                    ? 'There was no "degradation_rates" sheet in the imported workbook.'
                    : 'The "degradation_rates" sheet was empty in the imported workbook.',
                " GRNsight has supplied degradation rates from the backend database from Neymotin et al. (2014).",
            ].join(" "),
        }),

        MISSING_OR_EMPTY_PRODUCTION_RATES_SHEET: isMissing => ({
            warningCode: "MISSING_OR_EMPTY_PRODUCTION_RATES_SHEET",
            errorDescription: [
                isMissing
                    ? 'There was no "production_rates" sheet in the imported workbook.'
                    : 'The "production_rates" sheet was empty in the imported workbook.',
                " GRNsight has supplied production rates from the backend database which are 2X the degradation rates reported in Neymotin et al. (2014).",
            ].join(" "),
        }),

        MISSING_OR_EMPTY_THRESHOLD_B_SHEET: isMissing => ({
            warningCode: "MISSING_OR_EMPTY_THRESHOLD_B_SHEET",
            errorDescription: [
                isMissing
                    ? 'There was no "threshold_b" sheet in the imported workbook.'
                    : 'The "threshold_b" sheet was empty in the imported workbook.',
                "GRNsight has supplied the default value of 0 for each gene.",
            ].join(" "),
        }),
    },
};
