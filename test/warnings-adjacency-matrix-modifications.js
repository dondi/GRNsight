/* eslint-disable max-len */
// var assert = require("chai").assert;
// var xlsx = require("node-xlsx");
var test = require("./test");
// var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();

describe("warnings-adjacency-matrix-modifications", function () {
    describe("asymmetric-gene-order", function () {
        it("should not return any warnings", function () {
            test.noWarnings("test-files/adjacency-matrix-modifications/asymmetric-gene-order-input.xlsx");
            test.noWarnings("test-files/adjacency-matrix-modifications/asymmetric-gene-order-output.xlsx");
        });
    });

    describe("empty-column", function () {
        it("1 source gene warning, 3 invalid data warnings", function () {
            test.missingSourceWarning("test-files/adjacency-matrix-modifications/empty-column-input.xlsx", 1);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/empty-column-input.xlsx", 3);
            test.missingSourceWarning("test-files/adjacency-matrix-modifications/empty-column-output.xlsx", 1);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/empty-column-output.xlsx", 3);
        });
    });

    describe("extra-column-adjacent", function () {
        it("should not return any warnings", function () {
            test.noWarnings("test-files/adjacency-matrix-modifications/extra-column-adjacent-input.xlsx");
            test.randomDataWarning("test-files/adjacency-matrix-modifications/extra-column-adjacent-output.xlsx", 1);
        });
    });

    describe("extra-column-one-column-skipped", function () {
        it("2 random data and 3 invalid data warnings", function () {
            test.randomDataWarning("test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-input.xlsx", 2);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-input.xlsx", 3);
            test.randomDataWarning("test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-output.xlsx", 1);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-output.xlsx", 3);
        });
    });

    describe("extra-data-random-cell-both", function () {
        it("1 target gene, and 3 invalid data warnings", function () {
            test.missingTargetWarning("test-files/adjacency-matrix-modifications/extra-data-random-cell-both-output.xlsx", 1);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/extra-data-random-cell-both-output.xlsx", 3);
        });
    });

    describe("extra-data-random-cell-other", function () {
        it("5 invalid data", function () {
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-input.xlsx", 5);
            test.noWarnings("test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-output.xlsx");
            test.missingTargetWarning("test-files/adjacency-matrix-modifications/extra-data-random-cell-network-optimized-only-output.xlsx", 1);
        });
    });

    describe("extra-row-adjacent", function () {
        it("1 target gene warning", function () {
            test.missingTargetWarning("test-files/adjacency-matrix-modifications/extra-row-adjacent-input.xlsx", 1);
            test.missingTargetWarning("test-files/adjacency-matrix-modifications/extra-row-adjacent-output.xlsx", 1);
        });
    });

    describe("extra-row-end-of-sheet", function () {
        it("no warnings", function () {
            this.timeout(10000);
            test.noWarnings("test-files/adjacency-matrix-modifications/extra-row-end-of-sheet-input.xlsx");
            test.noWarnings("test-files/adjacency-matrix-modifications/extra-row-end-of-sheet-output.xlsx");
        });
    });

    // here...
    describe("missing-column-end", function () {
        it("no warnings", function () {
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-column-end-input.xlsx");
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-column-end-output.xlsx");
        });
    });

    describe("missing-column-middle", function () {
        it("5 invalid data warnings", function () {
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/missing-column-middle-input.xlsx", 5);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/missing-column-middle-output.xlsx", 5);
        });
    });

    describe("missing-column-top", function () {
        it("5 invalid data warnings", function () {
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/missing-column-top-input.xlsx", 5);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/missing-column-top-output.xlsx", 5);
        });
    });

    describe("missing-data", function () {
        it("no warnings", function () {
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-data-input.xlsx");
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-data-output.xlsx");
        });
    });

    describe("missing-row-end", function () {
        it("no warnings", function () {
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-row-end-input.xlsx");
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-row-end-output.xlsx");
        });
    });

    describe("missing-row-middle", function () {
        it("noWarnings", function () {
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-row-middle-input.xlsx");
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-row-middle-output.xlsx");
        });
    });

    describe("missing-value-bottom-corner", function () {
        it("no warnings", function () {
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-value-bottom-corner-input.xlsx");
            test.noWarnings("test-files/adjacency-matrix-modifications/missing-value-bottom-corner-output.xlsx");
        });
    });

    describe("missing-value-middle", function () {
        it("1 invalid data warning", function () {
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/missing-value-middle-input.xlsx", 1);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/missing-value-middle-output.xlsx", 2);
        });
    });

    describe("missing-value-top-corner", function () {
        it("1 invalid data warning", function () {
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/missing-value-top-corner-input.xlsx", 1);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/missing-value-top-corner-output.xlsx", 1);
        });
    });

    describe("value-replaced-w-spaces", function () {
        it("1 invalid data warning for the top two", function () {
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/value-replaced-w-spaces-both-output.xlsx", 1);
            test.invalidMatrixDataWarning("test-files/adjacency-matrix-modifications/value-replaced-w-spaces-net-op-only-output.xlsx", 1);
            test.noWarnings("test-files/adjacency-matrix-modifications/value-replaced-w-spaces-net-only-input.xlsx");
            test.noWarnings("test-files/adjacency-matrix-modifications/value-replaced–w-spaces-net-only-output.xlsx");
        });
    });

    describe("sheet-named-incorrectly", function () {
        it("should return a wrong name warning", function () {
            test.incorrectlyNamedSheetWarning("test-files/sheet-tests/incorrecly-named-sheet-network.xlsx", 25);
        });
    });

});
