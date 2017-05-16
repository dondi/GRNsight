/* eslint-disable max-len */
// var assert = require("chai").assert;
// var xlsx = require("node-xlsx");
var test = require("./test");
// var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();


describe("errors-graph-tests", function () {
    describe("asymmetrical-graphs", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/graph-tests/asymmetrical-disordered-input.xlsx");
            test.noErrors("test-files/graph-tests/asymmetrical-more-source-genes.xlsx");
            test.noErrors("test-files/graph-tests/asymmetrical-more-target-genes.xlsx");
        });
    });

    describe("incorrect-corrupt-gene-error-dCIN5", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/graph-tests/dCIN5GendronModel1.xlsx");
        });
    });

    describe("incorrect-missing-data-error-10-genes-0-edges", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/graph-tests/different-sized-networks/10-genes-0-edges.xlsx");
        });
    });

    describe("over-75-genes-or-150-nodes", function () {
        it("should return invalid network size error", function () {
            this.timeout(10000);
            test.networkSizeError("test-files/graph-tests/different-sized-networks/80-genes-0-edges.xlsx", 1);
            test.networkSizeError("test-files/graph-tests/different-sized-networks/45-genes-max-edges.xlsx", 1);
        });
    });

    describe("over-50-genes-or-100-nodes", function () {
        it("should return invalid network size warning", function () {
            test.invalidNetworkSizeWarning("test-files/graph-tests/different-sized-networks/52-genes-0-edges.xlsx", 1);
            test.invalidNetworkSizeWarning("test-files/graph-tests/different-sized-networks/34-genes-111-edges.xlsx", 1);
        });
    });

    describe("only-self-referential-data", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/graph-tests/only-self-referential-edges-input.xlsx");
            test.noErrors("test-files/graph-tests/only-self-referential-edges-output.xlsx");
        });
    });
});
