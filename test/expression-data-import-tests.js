/* eslint-disable max-len */
// var assert = require("chai").assert;
// var xlsx = require("node-xlsx");
var test = require("./test");
// var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();


describe("expression-data-import-tests", function () {
    describe("different-number-of-columns", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/expression-data-test-sheets/expression_sheet_different_number_of_columns.xlsx");
        });
    });

    // Need to create error
    describe("empty-row", function () {
        it("should return missing data error", function () {
            test.emptyRowError("test-files/expression-data-test-sheets/expression_sheet_empty_row.xlsx", 1);
        });
    });

    // Need to create error
    describe("extraneous-data", function () {
        it("should return extraneous data error", function () {
            test.extraneousDataWarning("test-files/expression-data-test-sheets/expression_sheet_erroneous_data.xlsx", 1);
        });
    });

    // Need to create this error
    describe("incorrect-column-numbering", function () {
        it("should return incorrect labeling error", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_incorrect_numbering.xlsx", 1);
        });
    });

    // Need to create this error
    describe("mismatched-gene-names-due-to-letter-case", function () {
        it("should return incorrect labeling error", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_mismatched_case_gene_names.xlsx", 1);
        });
    });

    // Need to create this error
    describe("mismatched-gene-names", function () {
        it("should return incorrect labeling error", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_mismatched_gene_names.xlsx", 1);
        });
    });

    // Need to create this error
    describe("missing-column-header", function () {
        it("should return incorrect labeling error", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_missing_column_header.xlsx", 1);
        });
    });

    describe("unresolvable-missing-data", function () {
        it("should return missing data error", function () {
            test.missingValueError("test-files/expression-data-test-sheets/expression_sheet_missing_data_error.xlsx", 1);
        });
    });

    // Need to create this error
    describe("resolvable-missing-data", function () {
        it("should return no error", function () {
            test.noError("test-files/expression-data-test-sheets/expression_sheet_missing_data_ok.xlsx", 1);
        });
    });

    // Need to create this error
    describe("missing-gene-name", function () {
        it("should return incorrect labeling error", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_missing_gene_name.xlsx", 1);
        });
    });

    // Need to create this error
    describe("sheet-name-not-in-optimization-parameters", function () {
        it("should return optimization parameter error", function () {
            test.optParamsError("test-files/expression-data-test-sheets/expression_sheet_name_not_in_optparams.xlsx", 1);
        });
    });

    // Need to create this error
    describe("sheet-name-not-present", function () {
        it("should return optimization parameter error", function () {
            test.optParamsError("test-files/expression-data-test-sheets/expression_sheet_name_not_present.xlsx", 1);
        });
    });

    // Need to create this error
    describe("no-expression-sheet-present", function () {
        it("should return missing data error", function () {
            test.missingValueError("test-files/expression-data-test-sheets/expression_sheet_not_existing.xlsx", 1);
        });
    });

    // Need to create this error
    describe("incorrect-id-column-label", function () {
        it("should return incorrect labeling error (warning??)", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_wrong_id_label.xlsx", 1);
        });
    });

    // Need to create this error
    describe("wrong-order-of-gene-names", function () {
        it("should return incorrect labeling error", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_wrong_order_gene_names.xlsx", 1);
        });
    });

    // Need to create this error
    describe("wrong-exp-sheet-name-due-to-case", function () {
        it("should return incorrect labeling error", function () {
            test.incorrectlyNamedSheetWarning("test-files/expression-data-test-sheets/expression_sheet_wrong_sheet_name_case.xlsx", 1);
        });
    });

    // Need to create this error
    describe("wrong-exp-sheet-name-due-to-convention", function () {
        it("should return incorrect labeling error", function () {
            test.incorrectlyNamedSheetWarning("test-files/expression-data-test-sheets/expression_sheet_wrong_sheet_name_convention.xlsx", 1);
        });
    });

});
