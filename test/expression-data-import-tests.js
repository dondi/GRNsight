// Rough draft of tests for expression data sheet errors and warnings.
// Will return to this next semester.


/* eslint-disable max-len */
// var assert = require("chai").assert;
// var xlsx = require("node-xlsx");
var test = require("./test");
// var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();

describe("expression-data-import-tests", function () {

    describe("missing-expression-data-sheet", function () {
        it("_log2_expression or _log2_optimized_expression worksheet was not detected. The network graph will display without node coloring.", function () {
            test.missingExpressionWarning("test-files/expression-data-test-sheets/expression_sheet_not_existing.xlsx", 1);
        });
    });

    describe("misnamed-id-label", function () {
        it("Top left cell must contain /'id/'.", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_wrong_id_label.xlsx", 1);
        });
    });

    describe("wrong_order_gene_names", function () {
        it("Gene names in column A do not match the order of those in network sheet.", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_wrong_order_gene_names.xlsx", 1);
        });
    });

    describe("wrong_case_gene_names", function () {
        it("Gene names in column A do not match the case of those in network sheet.", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_mismatched_case_gene_names.xlsx", 1);
        });
    });

    describe("missing_a_gene_name", function () {
        it("Gene names in column A are missing a gene name listed in the network sheet.", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_missing_gene_name.xlsx", 1);
        });
    });

    describe("extra_gene_name", function () {
        it("Gene names in column A have an extra gene name than those listed in the network sheet.", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_extra_gene_name.xlsx", 1);
        });
    });

    describe("missing_column_header", function () {
        it("Expression sheet is missing a column header.", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_missing_column_header.xlsx", 1);
        });
    });

    describe("empty_column", function () {
        it("Column in expression sheet contains no data.", function () {
            test.emptyExpressionColumnError("test-files/expression-data-test-sheets/expression_sheet_empty_column.xlsx", 1);
        });
    });

    describe("empty_row", function () {
        it("Row in expression sheet contains no data.", function () {
            test.emptyExpressionRowError("test-files/expression-data-test-sheets/expression_sheet_empty_row.xlsx", 1);
        });
    });

    describe("extraneous-data", function () {
        it("There is erroneous data in the expression sheet.", function () {
            test.extraneousDataWarning("test-files/expression-data-test-sheets/expression_sheet_erroneous_data.xlsx", 1);
        });
    });

    describe("wrong-exp-sheet-name-due-to-convention", function () {
        it("Incorrect expression sheet naming convention", function () {
            test.incorrectlyNamedSheetWarning("test-files/expression-data-test-sheets/expression_sheet_wrong_sheet_name_convention.xlsx", 1);
        });
    });

    describe("resolvable-missing-data", function () {
        it("should return no error", function () {
            test.noErrors("test-files/expression-data-test-sheets/expression_sheet_missing_data_ok.xlsx", 1);
        });
    });

    describe("different-number-of-columns", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/expression-data-test-sheets/expression_sheet_different_number_of_columns.xlsx", 1);
        });
    });

});
