const { CELL_A1_GRN, CELL_A1_PPI } = require("./constants");
module.exports = {
    warnings: {
        // GENERAL WARNINGS
        // If there are warnings in the original graph already add this warning
        UNSAFE_EXPORT_WARNING: {
            warningCode: "UNSAFE_EXPORT_WARNING",
            errorDescription:
                " GRNsight has detected that there are warnings in the current graph. Your workbook" +
                " may be exported improperly. We suggest that you ensure that the original uploaded graph has no " +
                " warnings or errors, and fix any warnings that are displayed.",
        },
        // NETWORK OR MATRIX WARNINGS
        // Check that all sheets fit under the appropriate naming conventions
        INCORRECT_SHEET_NAME_EXPORT_WARNING: {
            warningCode: "INCORRECT_SHEET_NAME_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that there is an improperly named sheet in your exported" +
                " workbook. Please look over your exported workbook and ensure that all sheets are named using the" +
                " proper naming conventions listed at:\nhttps://dondi.github.io/GRNsight/documentation.html.",
        },
        // Check that the matrix data values are the same in the graph object and the exported matrix
        INCORRECT_MATRIX_DATA_EXPORT_WARNING: {
            warningCode: "NCORRECT_MATRIX_DATA_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that the matrix data has been exported incorrectly into your" +
                "workbook. Please look over your exported workbook and ensure that the 'network' and/or the" +
                " 'network_optimized_weights' matrix values are correct.",
        },
        // Make sure network sheets only have 0/1, make sure network optimized weights sheet has only numbers in matrix
        IMPROPERLY_FORMATTED_MATRIX_DATA_EXPORT_WARNING: {
            warningCode: "INCORRECT_MATRIX_DATA_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that the matrix data has been exported incorrectly into your" +
                " workbook. Please ensure that the 'network' sheet only contains '0' and '1' in the matrix data. " +
                " Please ensure that the 'network_optimized_weights' sheet contains a '0' if there is no regulatory" +
                " relationship, a number > 0 if there is an activation relationship, or a number < 0 if there is a" +
                " repression relationship.",
        },
        // Make sure genes are semantically fine and that cell A1 is correct
        IMPROPERLY_FORMATTED_NETWORK_SHEET_EXPORT_WARNING: {
            warningCode: "INCORRECT_NETWORK_SHEET_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that the 'network' sheet or the 'network_optimized_weights'" +
                " sheet is improperly formattedPlease look over your exported workbook and ensure that network" +
                " sheets have cell A1 as '" + CELL_A1_GRN +  "' or '" + CELL_A1_PPI + "' exactly" +
                " and all gene are using the  naming conventions listed at:" +
                " \nhttps://dondi.github.io/GRNsight/documentation.html.",
        },
        // Missing Source Genes
        MISSING_SOURCE_GENES_EXPORT_WARNING: {
            warningCode: "MISSING_SOURCE_GENES_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that there are missing source genes in the exported workbook's." +
                " 'network' or 'network_optimized_weights' sheet. Please ensure that all source genes are present in" +
                " the exported workbook.",
        },
        // Missing Target Genes
        MISSING_TARGET_GENES_EXPORT_WARNING: {
            warningCode: "MISSING_TARGET_GENES_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that there are missing target genes in the exported workbook's." +
                " 'network' or 'network_optimized_weights' sheet. Please ensure that all target genes are present in" +
                " the exported workbook.",
        },
        // Additional Source Genes
        ADDITIONAL_SOURCE_GENES_EXPORT_WARNING: {
            warningCode: "ADDITIONAL_SOURCE_GENES_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that there are additional source genes in the exported" +
                " 'network' or 'network_optimized_weights' sheet. Please remove any extra source genes present in" +
                " the exported workbook.",
        },
        // Missing Target Genes
        ADDITIONAL_TARGET_GENES_EXPORT_WARNING: {
            warningCode: "ADDITIONAL_TARGET_GENES_EXPORT_WARNING",
            errorDescription:
                "GRNsight has detected that there are additional target genes in the exported" +
                " 'network' or 'network_optimized_weights' sheet. Please remove any extra target genes present in" +
                " the exported workbook.",
        },
        // EXPRESSION SHEET WARNINGS

        // ADDITIONAL SHEET WARNINGS
    },
};
