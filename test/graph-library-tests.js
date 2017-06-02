/* eslint-disable max-len */
var assert = require("chai").assert;
var xlsx = require("node-xlsx");
var cytoscape = require("cytoscape");
var test = require("./test");
var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();

// NOTE: Temporarily skipped out pending resolution of #474, and other related issues
describe.skip("graph-library-tests", function () {
    describe("basic-cytoscape-conversion", function () {
        it("convert to cytoscape correctly", function () {
            var input = "test-files/graph-statistics-tests/graph-stats-demo.xlsx";
            var sheet = xlsx.parse(input);
            var network = spreadsheetController.parseSheet(sheet);
            // var cytoscapeElements = grnSightToCytoscape(network);
            var cytoscapeElements = spreadsheetController.grnSightToCytoscape(network);

            /* eslint-disable no-unused-vars */
            // require calls cytoscape as a function so the below code is needed to call cytoscape
            var cy = cytoscape({
                headless: true,
                elements: cytoscapeElements
            });
            /* eslint-enable no-unused-vars */

            assert.equal(cytoscapeElements.length, 13);

            assert.equal(cytoscapeElements[0].data.id, "a");
            assert.equal(cytoscapeElements[1].data.id, "b");
            assert.equal(cytoscapeElements[2].data.id, "c");
            assert.equal(cytoscapeElements[3].data.id, "d");
            assert.equal(cytoscapeElements[4].data.id, "e");
            assert.equal(cytoscapeElements[5].data.id, "f");

            assert.equal(cytoscapeElements[6].data.id, "aa");
            assert.equal(cytoscapeElements[7].data.id, "ba");
            assert.equal(cytoscapeElements[8].data.id, "cb");
            assert.equal(cytoscapeElements[9].data.id, "db");
            assert.equal(cytoscapeElements[10].data.id, "ec");
            assert.equal(cytoscapeElements[11].data.id, "fd");
            assert.equal(cytoscapeElements[12].data.id, "de");

        });
    });

    describe("shortest path", function () {
        it("returns the undirected shortest path from f to b in graph-stats-demo", function () {
            test.shortestPath("test-files/graph-statistics-tests/graph-stats-demo.xlsx", false, "f", "b", 2);
        });

        it("returns the directed shortest path from f to b in graph-stats-demo", function () {
            test.shortestPath("test-files/graph-statistics-tests/graph-stats-demo.xlsx", true, "f", "b", 2);
        });

        it("returns the undirected shortest path from b to f in graph-stats-demo", function () {
            test.shortestPath("test-files/graph-statistics-tests/graph-stats-demo.xlsx", false, "b", "f", 2);
        });

        it("returns the directed shortest path from b to f in graph-stats-demo", function () {
            test.shortestPath("test-files/graph-statistics-tests/graph-stats-demo.xlsx", true, "b", "f", Infinity);
        });

        it("returns the undirected shortest path from f to b in 75-genes-150-edges", function () {
            this.timeout(10000);
            test.shortestPath("test-files/graph-tests/different-sized-networks/75-genes-150-edges.xlsx", false, "CDC28", "ADA2", 3);
        });

        it("returns the directed shortest path from f to b in 75-genes-150-edges", function () {
            this.timeout(10000);
            test.shortestPath("test-files/graph-tests/different-sized-networks/75-genes-150-edges.xlsx", true, "CDC28", "ADA2", Infinity);
        });

        it("returns the undirected shortest path from f to b in 10-genes-max-edges", function () {
            test.shortestPath("test-files/graph-tests/different-sized-networks/10-genes-max-edges.xlsx", false, "DAL80", "ECM22", 1);
        });

        it("returns the directed shortest path from f to b in 10-genes-max-edges", function () {
            test.shortestPath("test-files/graph-tests/different-sized-networks/10-genes-max-edges.xlsx", true, "DAL80", "ECM22", 1);
        });

        it("returns the undirected shortest path from f to b in 12-genes-max-edges", function () {
            test.shortestPath("test-files/graph-tests/different-sized-networks/12-genes-max-edges.xlsx", false, "DAL80", "ECM22", 1);
        });

        it("returns the directed shortest path from f to b in 12-genes-max-edges", function () {
            test.shortestPath("test-files/graph-tests/different-sized-networks/12-genes-max-edges.xlsx", true, "DAL80", "ECM22", 1);
        });
    });

    describe("betweenness centrality", function () {
        it("returns the undirected betweenness centrality of a in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", false, "a", 0);
        });

        it("returns the directed betweenness centrality of a in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", true, "a", 0);
        });

        it("returns the undirected betweenness centrality of b in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", false, "b", 11);
        });

        it("returns the directed betweenness centrality of b in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", true, "b", 11);
        });

        it("returns the undirected betweenness centrality of c in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", false, "c", 2);
        });

        it("returns the directed betweenness centrality of c in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", true, "c", 2);
        });

        it("returns the undirected betweenness centrality of d in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", false, "d", 11);
        });

        it("returns the directed betweenness centrality of d in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", true, "d", 11);
        });

        it("returns the undirected betweenness centrality of e in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", false, "e", 2);
        });

        it("returns the directed betweenness centrality of e in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", true, "e", 2);
        });

        it("returns the undirected betweenness centrality of f in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", false, "f", 0);
        });

        it("returns the directed betweenness centrality of f in graph-stats-demo", function () {
            test.betweennessCentrality("test-files/graph-statistics-tests/graph-stats-demo.xlsx", true, "f", 0);
        });

        it("returns the undirected betweenness centrality of f in 75-genes-150-edges", function () {
            this.timeout(10000);
            test.betweennessCentrality("test-files/graph-tests/different-sized-networks/75-genes-150-edges.xlsx", false, "CDC28", 171.50351735503662);
        });

        it("returns the directed betweenness centrality of f in 75-genes-150-edges", function () {
            this.timeout(10000);
            test.betweennessCentrality("test-files/graph-tests/different-sized-networks/75-genes-150-edges.xlsx", true, "CDC28", 171.50351735503662);
        });

        it("returns the undirected betweenness centrality of f in 10-genes-max-edges", function () {
            test.betweennessCentrality("test-files/graph-tests/different-sized-networks/10-genes-max-edges.xlsx", false, "DAL80", 0);
        });

        it("returns the directed betweenness centrality of f in 10-genes-max-edges", function () {
            test.betweennessCentrality("test-files/graph-tests/different-sized-networks/10-genes-max-edges.xlsx", true, "DAL80", 0);
        });

        it("returns the undirected betweenness centrality of f in 12-genes-max-edges", function () {
            test.betweennessCentrality("test-files/graph-tests/different-sized-networks/12-genes-max-edges.xlsx", false, "DAL80", 0);
        });

        it("returns the directed betweenness centrality of f in 12-genes-max-edges", function () {
            test.betweennessCentrality("test-files/graph-tests/different-sized-networks/12-genes-max-edges.xlsx", true, "DAL80", 0);
        });
    });
});
