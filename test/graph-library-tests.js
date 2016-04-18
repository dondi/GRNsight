var assert = require('chai').assert,
    xlsx = require('node-xlsx'),
    cytoscape = require('cytoscape'),
    test = require('./test');
var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

//converts GRNSight object to an array accepted by Cytoscape

var grnSightToCytoscape = function (network) {
  var result = [];
  network.genes.forEach(function (gene) {
    result.push({
      data: {
        id: gene.name
      }
    })
  });

  network.links.forEach(function (link) {
    var sourceGene = network.genes[link.source];
    var targetGene = network.genes[link.target];
    result.push({
      data: {
        id: sourceGene.name + targetGene.name,
        source: sourceGene.name,
        target: targetGene.name
      }
    })
  });

  return result;
};

describe.only('graph-library-tests', function() {
    describe('basic-cytoscape-conversion', function() {
        it('convert to cytoscape correctly', function() {
            var input = 'test-files/graph-statistics-tests/graph-stats-demo.xlsx';
            var sheet = xlsx.parse(input);
            var network = spreadsheetController.parseSheet(sheet);
            var cytoscapeElements = grnSightToCytoscape(network);
//require calls cytoscape as a function so the below code is needed to call cytoscape
            var cy = cytoscape({
              headless: true,
              elements: cytoscapeElements
            })

            console.log(cytoscapeElements);
        })
    })

    describe('shortest path', function() {
        it('returns the undirected shortest path', function() {
            var input = 'test-files/graph-statistics-tests/graph-stats-demo.xlsx';
            var sheet = xlsx.parse(input);
            var network = spreadsheetController.parseSheet(sheet);
            var cytoscapeElements = grnSightToCytoscape(network);
//require calls cytoscape as a function so the below code is needed to call cytoscape
            var cy = cytoscape({
              headless: true,
              elements: cytoscapeElements
            })

            var dijkstra = cy.elements().dijkstra("#b", null, false);
            assert.equal(dijkstra.distanceTo("#f"), 2);
        })
    })

    describe('shortest path', function() {
        it('returns the directed shortest path', function() {
            var input = 'test-files/graph-statistics-tests/graph-stats-demo.xlsx';
            var sheet = xlsx.parse(input);
            var network = spreadsheetController.parseSheet(sheet);
            var cytoscapeElements = grnSightToCytoscape(network);
//require calls cytoscape as a function so the below code is needed to call cytoscape
            var cy = cytoscape({
              headless: true,
              elements: cytoscapeElements
            })

            var dijkstra = cy.elements().dijkstra("#b", null, true);
            assert.equal(dijkstra.distanceTo("#f"), Infinity);
        })
    })

    describe('shortest path', function() {
        it('returns the directed shortest path', function() {
            var input = 'test-files/graph-statistics-tests/graph-stats-demo.xlsx';
            var sheet = xlsx.parse(input);
            var network = spreadsheetController.parseSheet(sheet);
            var cytoscapeElements = grnSightToCytoscape(network);
//require calls cytoscape as a function so the below code is needed to call cytoscape
            var cy = cytoscape({
              headless: true,
              elements: cytoscapeElements
            })

            var dijkstra = cy.elements().dijkstra("#f", null, true);
            assert.equal(dijkstra.distanceTo("#b"), 2);
        })
    })

    describe('betweenness centrality', function() {
        it('returns the undirected betweenness centrality of b', function() {
            var input = 'test-files/graph-statistics-tests/graph-stats-demo.xlsx';
            var sheet = xlsx.parse(input);
            var network = spreadsheetController.parseSheet(sheet);
            var cytoscapeElements = grnSightToCytoscape(network);
//require calls cytoscape as a function so the below code is needed to call cytoscape
            var cy = cytoscape({
              headless: true,
              elements: cytoscapeElements
            })

            var bc = cy.$().bc();
            assert.equal(bc.betweenness('#b', null, false), 11);
        })
    })

    describe('betweenness centrality', function() {
        it('returns the directed betweenness centrality of b', function() {
            var input = 'test-files/graph-statistics-tests/graph-stats-demo.xlsx';
            var sheet = xlsx.parse(input);
            var network = spreadsheetController.parseSheet(sheet);
            var cytoscapeElements = grnSightToCytoscape(network);
//require calls cytoscape as a function so the below code is needed to call cytoscape
            var cy = cytoscape({
              headless: true,
              elements: cytoscapeElements
            })

            var bc = cy.$().bc();
            assert.equal(bc.betweenness('#b', null, true), 11);
        })
    })
});
