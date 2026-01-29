module.exports = {
    warnings: {
        // ADDITIONAL SHEET WARNINGS
        MISSING_DEGRADATION_RATES: (missingGenes = "") => ({
            warningCode: "MISSING_DEGRADATION_RATES_IMPORT_WARNING",
            errorDescription:
                "GRNsight has detected that the imported workbook does not have a degradation rate in the degradation_rates sheet. " +
                "A degradation rate will need to be supplied to run this workbook in GRNmap, but will not affect the display of the graph in GRNsight. " +
                "The missing values are for the genes: " +
                missingGenes,
        }),

        MISSING_PRODUCTION_RATES: (missingGenes = "") => ({
            warningCode: "MISSING_PRODUCTION_RATES_IMPORT_WARNING",
            errorDescription:
                "GRNsight has detected that the imported workbook does not have a production rate in the production_rates sheet. " +
                "A production rate will need to be supplied to run this workbook in GRNmap, but will not affect the display of the graph in GRNsight. " +
                "The missing values are for the genes: " +
                missingGenes,
        }),
    },
};
