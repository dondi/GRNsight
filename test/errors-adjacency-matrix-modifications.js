/* eslint-disable max-len */
// var assert = require("chai").assert;
// var xlsx = require("node-xlsx");
var test = require("./test");
// var spreadsheetController = require(__dirname + "/../server/controllers/spreadsheet-controller")();

describe("errors-adjacency-matrix-modifications", function () {
    describe("asymmetrical-graphs", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/asymmetric-gene-order-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/asymmetric-gene-order-output.xlsx");
        });
    });

    describe("empty-row", function () {
        it("should return empty row error", function () {
            test.emptyRowError("test-files/adjacency-matrix-modifications/empty-row-input.xlsx", 1);
            test.emptyRowError("test-files/adjacency-matrix-modifications/empty-row-output.xlsx", 1);
        });
    });

    describe("extra-data", function () {
        it("should return empty row errors", function () {
            test.emptyRowError("test-files/adjacency-matrix-modifications/extra-data-random-cell-both-output.xlsx", 6);
            test.emptyRowError("test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-input.xlsx", 14);
            test.noErrors("test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-output.xlsx");
            test.emptyRowError("test-files/adjacency-matrix-modifications/extra-data-random-cell-network-optimized-only-output.xlsx", 9);
        });
    });

    describe("extra-column-adjacent", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/extra-column-adjacent-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/extra-column-adjacent-output.xlsx");
        });
    });

    describe("extra-column-end-of-sheet", function () {
        it("should return warnings count error", function () {
            test.warningsCountError("test-files/adjacency-matrix-modifications/extra-column-end-of-sheet-input.xlsx", 49062);
            test.warningsCountError("test-files/adjacency-matrix-modifications/extra-column-end-of-sheet-output.xlsx", 49062);
        });
    });

    describe("extra-column-one-column-skipped", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-output.xlsx");
        });
    });

    describe("extra-data-random-cell-other", function () {
        it("should return empty row error", function () {
            test.emptyRowError("test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-input.xlsx", 14);
            test.noErrors("test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-output.xlsx");
        });
    });

    describe("extra-row-adjacent", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/extra-row-adjacent-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/extra-row-adjacent-output.xlsx");
        });
    });

    describe("extra-row-end-of-sheet", function () {
        it("should return errors count error", function () {
            this.timeout(10000);
            test.errorsCountError("test-files/adjacency-matrix-modifications/extra-row-end-of-sheet-input.xlsx", 1);
        });
    });

    describe("extra-row-end-of-sheet-output", function () {
        it("should return errors count error", function () {
            this.timeout(10000);
            test.errorsCountError("test-files/adjacency-matrix-modifications/extra-row-end-of-sheet-output.xlsx", 1);
        });
    });

    describe("extra-row-one-row-skipped", function () {
        it("should return empty row error", function () {
            test.emptyRowError("test-files/adjacency-matrix-modifications/extra-row-one-row-skipped-input.xlsx", 1);
            test.emptyRowError("test-files/adjacency-matrix-modifications/extra-row-one-row-skipped-output.xlsx", 1);
        });
    });

    describe("empty-row-or-column", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/empty-column-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/empty-column-output.xlsx");
            test.emptyRowError("test-files/adjacency-matrix-modifications/empty-row-input.xlsx", 1);
            test.emptyRowError("test-files/adjacency-matrix-modifications/empty-row-output.xlsx", 1);
        });
    });

    describe("missing-value-top-corner", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-value-top-corner-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-value-top-corner-output.xlsx");
        });
    });

    describe("missing-value-middle", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-value-middle-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-value-middle-output.xlsx");
        });
    });

    describe("missing-value-bottom-corner", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-value-bottom-corner-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-value-bottom-corner-output.xlsx");
        });
    });

    describe("missing-row-top", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-row-top-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-row-top-output.xlsx");
        });
    });

    describe("missing-row-middle", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-row-middle-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-row-middle-output.xlsx");
        });
    });

    describe("missing-row-end", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-row-end-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-row-end-output.xlsx");
        });
    });

    describe("missing-column-top", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-column-top-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-column-top-output.xlsx");
        });
    });

    describe("missing-column-middle", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-column-middle-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-column-middle-output.xlsx");
        });
    });

    describe("missing-column-end", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-column-end-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-column-end-output.xlsx");
        });
    });

    describe("missing-data", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/missing-data-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/missing-data-output.xlsx");
        });
    });

    describe("value-replaced-with-spaces", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/value-replaced-w-spaces-both-output.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/value-replaced-w-spaces-net-op-only-output.xlsx");
            test.invalidDataTypeError("test-files/adjacency-matrix-modifications/value-replaced-w-spaces-net-only-input.xlsx", 1);
            test.noErrors("test-files/adjacency-matrix-modifications/value-replaced–w-spaces-net-only-output.xlsx");
        });
    });

    // Adjacency Matrix Modifications - Data Types
    describe("accounting-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-accounting-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-accounting-output.xlsx");
        });
    });

    describe("currency-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-currency-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-currency-output.xlsx");
        });
    });

    describe("date-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-date-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-date-output.xlsx");
        });
    });

    describe("fraction-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-fraction-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-fraction-output.xlsx");
        });
    });

    describe("number-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-number-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-number-output.xlsx");
        });
    });

    describe("percentage-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-percentage-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-percentage-output.xlsx");
        });
    });

    describe("scientific-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-scientific-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-scientific-output.xlsx");
        });
    });

    describe("special-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-special-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-special-output.xlsx");
        });
    });

    describe("text-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-text-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-text-output.xlsx");
        });
    });

    describe("time-data-type-header", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-time-input.xlsx", 225);
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-header-time-output.xlsx", 225);
        });
    });

    describe("accounting-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-accounting-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-accounting-output.xlsx");
        });
    });

    describe("currency-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-currency-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-currency-output.xlsx");
        });
    });

    describe("date-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-date-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-date-output.xlsx");
        });
    });

    describe("fraction-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-fraction-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-fraction-output.xlsx");
        });
    });

    describe("number-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-number-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-number-output.xlsx");
        });
    });

    describe("percentage-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-percentage-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-percentage-output.xlsx");
        });
    });

    describe("scientific-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-scientific-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-scientific-output.xlsx");
        });
    });

    describe("special-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-special-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-special-output.xlsx");
        });
    });

    describe("text-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-text-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-text-output.xlsx");
        });
    });

    describe("time-data-type-matrix", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-time-input.xlsx");
            test.noErrors("test-files/adjacency-matrix-modifications/data-types/data-type-matrix-time-output.xlsx");
        });
    });
});
