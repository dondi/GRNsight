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

describe('graph-library-tests', function() {
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
            assert.equal(cytoscapeElements.length, 13);

            assert.equal(cytoscapeElements[0].data.id  , "a");
            assert.equal(cytoscapeElements[1].data.id  , "b");
            assert.equal(cytoscapeElements[2].data.id  , "c");
            assert.equal(cytoscapeElements[3].data.id  , "d");
            assert.equal(cytoscapeElements[4].data.id  , "e");
            assert.equal(cytoscapeElements[5].data.id  , "f");

            assert.equal(cytoscapeElements[6].data.id  , "aa");
            assert.equal(cytoscapeElements[7].data.id  , "ba");
            assert.equal(cytoscapeElements[8].data.id  , "cb");
            assert.equal(cytoscapeElements[9].data.id  , "db");
            assert.equal(cytoscapeElements[10].data.id  , "ec");
            assert.equal(cytoscapeElements[11].data.id  , "fd");
            assert.equal(cytoscapeElements[12].data.id  , "de");

        })
    })

    describe('shortest path', function() {
        it('returns the undirected shortest path from f to b', function() {
            test.shortestPath('test-files/graph-statistics-tests/graph-stats-demo.xlsx', false, "f", "b", 2);
        })

        it('returns the directed shortest path from f to b', function() {
            test.shortestPath('test-files/graph-statistics-tests/graph-stats-demo.xlsx', true, "f", "b", 2);
        })

        it('returns the undirected shortest path from b to f', function() {
            test.shortestPath('test-files/graph-statistics-tests/graph-stats-demo.xlsx', false, "b", "f", 2);
        })

        it('returns the directed shortest path from b to f', function() {
            test.shortestPath('test-files/graph-statistics-tests/graph-stats-demo.xlsx', true, "b", "f", Infinity);
        })
    })

    describe('betweenness centrality', function() {
        it('returns the undirected betweenness centrality of a', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', false, "a", 0);
        })

        it('returns the directed betweenness centrality of a', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', true, "a", 0);
        })

        it('returns the undirected betweenness centrality of b', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', false, "b", 11);
        })

        it('returns the directed betweenness centrality of b', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', true, "b", 11);
        })

        it('returns the undirected betweenness centrality of c', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', false, "c", 2);
        })

        it('returns the directed betweenness centrality of c', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', true, "c", 2);
        })

        it('returns the undirected betweenness centrality of d', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', false, "d", 11);
        })

        it('returns the directed betweenness centrality of d', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', true, "d", 11);
        })

        it('returns the undirected betweenness centrality of e', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', false, "e", 2);
        })

        it('returns the directed betweenness centrality of e', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', true, "e", 2);
        })

        it('returns the undirected betweenness centrality of f', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', false, "f", 0);
        })

        it('returns the directed betweenness centrality of f', function() {
            test.betweennessCentrality('test-files/graph-statistics-tests/graph-stats-demo.xlsx', true, "f", 0);
        })
    })
});
