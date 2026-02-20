module.exports = {
    warnings: {
        // ADDITIONAL SHEET WARNINGS
        MISSING_DEGRADATION_RATES: (missingGenes = "") => ({
            warningCode: "MISSING_DEGRADATION_RATES_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that there are missing degradation rates in the exported" +
                " workbook's 'degradation_rates' sheet. These degradation rates are missing in our database." +
                " A degradation rate will need to be supplied to use this workbook as an input file for GRNmap." +
                " The missing values are for the genes: " +
                missingGenes,
        }),

        MISSING_PRODUCTION_RATES: (missingGenes = "") => ({
            warningCode: "MISSING_PRODUCTION_RATES_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that there are missing production rates in the exported" +
                " workbook's 'production_rates' sheet. These production rates are missing in our database." +
                " A production rate will need to be supplied to use this workbook as an input file for GRNmap." +
                " The missing values are for the genes: " +
                missingGenes,
        }),

        MISSING_OR_EMPTY_DEGRADATION_RATES_SHEET: isMissing => ({
            warningCode: "MISSING_OR_EMPTY_DEGRADATION_RATES_SHEET",
            errorDescription:
                (isMissing
                    ? 'There was no "degradation_rates" sheet in the imported workbook.'
                    : 'The "degradation_rates" sheet was empty in the imported workbook.') +
                " GRNsight has supplied degradation rates from the backend database from Neymotin et al. (2014).",
        }),

        MISSING_OR_EMPTY_PRODUCTION_RATES_SHEET: isMissing => ({
            warningCode: "MISSING_OR_EMPTY_PRODUCTION_RATES_SHEET",
            errorDescription:
                (isMissing
                    ? 'There was no "production_rates" sheet in the imported workbook.'
                    : 'The "production_rates" sheet was empty in the imported workbook.') +
                " GRNsight has supplied production rates from the backend database which are 2X the degradation rates reported in Neymotin et al. (2014).",
        }),

        MISSING_OR_EMPTY_THRESHOLD_B_SHEET: isMissing => ({
            warningCode: "MISSING_OR_EMPTY_THRESHOLD_B_SHEET",
            errorDescription:
                (isMissing
                    ? 'There was no "threshold_b" sheet in the imported workbook.'
                    : 'The "threshold_b" sheet was empty in the imported workbook.') +
                " GRNsight has supplied the default value of 0 for each gene.",
        }),
    },
};
