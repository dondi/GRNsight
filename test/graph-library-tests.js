var assert = require('chai').assert,
    xlsx = require('node-xlsx'),
    cy = require('cytoscape'),
    test = require('./test');
var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();


describe('graph-library-tests', function() {
    describe('basic-cytoscape-conversion', function() {
        it('convert to cytoscape correctly', function() {
            var input = 'test-files/graph-statistics-tests/graph-stats-demo.xlsx';
            var sheet = xlsx.parse(input),
                network = spreadsheetController.parseSheet(sheet);

            console.log(cy == true);

            /*var dijkstra = cy.dijkstra(function() {});
            var distToJ = dijkstra.distanceTo(cy.network.genes[0]);
            console.log(distToJ);*/
        })
    })
});
