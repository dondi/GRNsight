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
    },
};
