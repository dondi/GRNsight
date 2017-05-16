/* eslint-disable max-len */
// var assert = require("chai").assert;
// var xlsx = require("node-xlsx");
var test = require("./test");
// var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();


describe("warnings-gene-name-modifications", function () {
    describe("mismatched-case-related", function () {
        it("should not return any warnings", function () {
            test.noWarnings("test-files/gene-name-modifications/mismatched-case-related-input.xlsx");
            test.noWarnings("test-files/gene-name-modifications/mismatched-case-related-output.xlsx");
        });
    });

    describe("mismatched-case-unrelated", function () {
        it("should not return any warnings", function () {
            test.noWarnings("test-files/gene-name-modifications/mismatched-case-unrelated-input.xlsx");
            test.noWarnings("test-files/gene-name-modifications/mismatched-case-unrelated-output.xlsx");
        });
    });

    describe("missing-gene-name-side", function () {
        it("return 1 target and 1 randon data warnings per file", function () {
            test.missingTargetWarning("test-files/gene-name-modifications/missing-gene-name-side-input.xlsx", 1);
            test.randomDataWarning("test-files/gene-name-modifications/missing-gene-name-side-input.xlsx", 1);
            test.missingTargetWarning("test-files/gene-name-modifications/missing-gene-name-side-output.xlsx", 1);
            test.randomDataWarning("test-files/gene-name-modifications/missing-gene-name-side-output.xlsx", 1);
        });
    });

    describe("missing-gene-name-top-and-side", function () {
        it("return 1 target 1 source and 5 randon data warnings per file", function () {
            test.missingTargetWarning("test-files/gene-name-modifications/missing-gene-name-top-and-side-input.xlsx", 1);
            test.missingSourceWarning("test-files/gene-name-modifications/missing-gene-name-top-and-side-input.xlsx", 1);
            test.randomDataWarning("test-files/gene-name-modifications/missing-gene-name-top-and-side-input.xlsx", 2);
            test.missingTargetWarning("test-files/gene-name-modifications/missing-gene-name-top-and-side-output.xlsx", 1);
            test.missingSourceWarning("test-files/gene-name-modifications/missing-gene-name-top-and-side-output.xlsx", 1);
            test.randomDataWarning("test-files/gene-name-modifications/missing-gene-name-top-and-side-output.xlsx", 2);
        });
    });

    describe("missing-gene-name-top", function () {
        it("return 1 source and 1 randon data warnings per file", function () {
            test.missingSourceWarning("test-files/gene-name-modifications/missing-gene-name-top-input.xlsx", 1);
            test.randomDataWarning("test-files/gene-name-modifications/missing-gene-name-top-input.xlsx", 1);
            test.missingSourceWarning("test-files/gene-name-modifications/missing-gene-name-top-output.xlsx", 1);
            test.randomDataWarning("test-files/gene-name-modifications/missing-gene-name-top-output.xlsx", 1);
        });
    });

    describe("NaN-as-gene-name", function () {
        it("should not return any warnings", function () {
            test.noWarnings("test-files/gene-name-modifications/NaN-as-gene-name-input.xlsx");
            test.noWarnings("test-files/gene-name-modifications/NaN-as-gene-name-output.xlsx");
        });
    });
});
