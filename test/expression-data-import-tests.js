var test = require("./test");

describe("expression-data-import-tests", function () {
    describe("MISSING_EXPRESSION_SHEET", function () {
        it.skip(
            "_log2_expression or _log2_optimized_expression worksheet was not detected.",
            "The network graph will display without node coloring. If you wish for the workbook to be colored",
            "you can upload your own expression data by adding one or more of those worksheets to your Excel",
            "workbook or select, or select from data in GRNsight's Expression Database, found in the Node menu or panel.",
            function () {
                test.missingExpressionWarning(
                    "test-files/expression-data-test-sheets/expression_sheet_not_existing.xlsx",
                    1
                );
            }
        );
    });

    describe("MISLABELED_ID_CELL", function () {
        it("Top left cell must contain \'id\' exactly.", function () {
            test.idLabelError(
                "test-files/expression-data-test-sheets/expression_sheet_wrong_id_label.xlsx",
                1
            );
        });
    });

    describe("GENE_MISMATCH", function () {
        it("Gene names in column A do not match the order of those in network sheet.", function () {
            test.geneMismatchError(
                "test-files/expression-data-test-sheets/expression_sheet_wrong_order_gene_names.xlsx",
                1
            );
        });
    });

    describe("wrong_case_gene_names", function () {
        it.skip("Gene names in column A do not match the case of those in network sheet.", function () {
            test.labelError(
                "test-files/expression-data-test-sheets/expression_sheet_mismatched_case_gene_names.xlsx",
                1
            );
        });
    });

    describe("MISSING_GENE_NAME", function () {
        it("Gene names in column A are missing a gene name listed in the network sheet.", function () {
            test.missingGeneNameError(
                "test-files/expression-data-test-sheets/expression_sheet_missing_gene_name.xlsx",
                1
            );
        });
    });

    describe("EXTRA_GENE_NAME", function () {
        it("Gene names in column A have an extra gene name than those listed in the network sheet.", function () {
            test.extraGeneNameError(
                "test-files/expression-data-test-sheets/expression_sheet_extra_gene_name.xlsx",
                1
            );
        });
    });

    describe("MISSING_COLUMN_HEADER", function () {
        it("All columns in expression sheet must have a header or label.", function () {
            test.missingColumnHeaderError(
                "test-files/expression-data-test-sheets/expression_sheet_missing_column_header.xlsx",
                1
            );
        });
    });

    describe("empty_column", function () {
        it("Column in expression sheet contains no data.", function () {
            test.emptyExpressionColumnError(
                "test-files/expression-data-test-sheets/expression_sheet_empty_column.xlsx",
                1
            );
        });
    });

    describe("EMPTY_ROW", function () {
        it("Row in expression sheet contains no data.", function () {
            test.emptyExpressionRowError(
                "test-files/expression-data-test-sheets/expression_sheet_empty_row.xlsx",
                1
            );
        });
    });

    describe("EXTRANEOUS_DATA", function () {
        it("There is erroneous data in the expression sheet.", function () {
            test.extraneousDataWarning(
                "test-files/expression-data-test-sheets/expression_sheet_erroneous_data.xlsx",
                1
            );
        });
    });

    describe("NEGATIVE_TIME_POINT", function () {
        it("There are one or more negative time points in the expression sheet.", function () {
            test.negativeTimePointError(
                "test-files/expression-data-test-sheets/expression_sheet_negative_time_points.xlsx",
                2
            );
        });
    });

    describe("NON_MONOTONIC_TIME_POINTS", function () {
        it("There are duplicate time points in the expression sheet.", function () {
            test.nonMonotonicTimePointsError(
                "test-files/expression-data-test-sheets/expression_sheet_incorrectly_ordered_time_points.xlsx",
                1
            );
        });
    });
    describe("NON_NUMERICAL_TIME_POINT", function () {
        it("There are non-numerical time points in the expression sheet.", function () {
            test.nonNumericalTimePointError(
                "test-files/expression-data-test-sheets/expression_sheet_non_numerical_time_points.xlsx",
                1
            );
        });
    });

    describe("DUPLICATE_TIME_POINTS", function () {
        it("should return no error", function () {
            test.noErrors(
                "test-files/expression-data-test-sheets/expression_sheet_correct_numbering.xlsx",
                1
            );
        });
    });

    describe("wrong-exp-sheet-name-due-to-convention", function () {
        it.skip("Incorrect expression sheet naming convention", function () {
            test.incorrectlyNamedExpressionSheetWarning(
                "test-files/expression-data-test-sheets/expression_sheet_wrong_sheet_name_convention.xlsx",
                1
            );
        });
    });

    describe("resolvable-missing-data", function () {
        it.skip("should return no error", function () {
            test.noErrors(
                "test-files/expression-data-test-sheets/expression_sheet_missing_data_ok.xlsx",
                1
            );
        });
    });

    describe("different-number-of-columns", function () {
        it.skip("should not return any errors", function () {
            test.noErrors(
                "test-files/expression-data-test-sheets/expression_sheet_different_number_of_columns.xlsx",
                0
            );
        });
    });
});
