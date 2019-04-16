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

    // Need to create this error
    describe("incorrect-column-numbering", function () {
        it("should return incorrect labeling error", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_incorrect_numbering.xlsx", 1);
        });
    });

    // Need to create this error
    describe("extra-expression-sheet", function () {
        it("should return optimization parameter error", function () {
            test.optParamsError("test-files/expression-data-test-sheets/expression_sheet_name_not_in_optparams.xlsx", 1);
        });
    });

    // Need to create this error
    describe("sheet-missing", function () {
        it("should return optimization parameter error", function () {
            test.optParamsError("test-files/expression-data-test-sheets/expression_sheet_name_not_present.xlsx", 1);
        });
    });

    // Need to create this error
    describe("incorrect-id-column-label", function () {
        it("should return incorrect labeling error (warning??)", function () {
            test.labelError("test-files/expression-data-test-sheets/expression_sheet_name_not_present.xlsx", 1);
        });
    });
});
