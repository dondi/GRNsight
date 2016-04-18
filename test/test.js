var assert = require('chai').assert,
    xlsx = require('node-xlsx');
var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

exports.noErrors = noErrors;
exports.duplicateGeneError = duplicateGeneError;
exports.invalidGeneLengthError = invalidGeneLengthError;
exports.corruptGeneError = corruptGeneError;
exports.unknownError = unknownError;
exports.missingValueError = missingValueError;
exports.missingNetworkError = missingNetworkError;
exports.networkSizeError = networkSizeError;
exports.warningsCountError = warningsCountError;
exports.invalidDataTypeError = invalidDataTypeError;

exports.networkSizeWarning = networkSizeWarning;
exports.checkForGene = checkForGene;
exports.noWarnings = noWarnings;
exports.missingSourceWarning = missingSourceWarning;
exports.missingTargetWarning = missingTargetWarning;
exports.invalidDataWarning = invalidDataWarning;
exports.randomDataWarning = randomDataWarning;
exports.emptyRowWarning = emptyRowWarning;
exports.invalidNetworkSizeWarning = invalidNetworkSizeWarning;

//ERROR TEST FUNCTIONS:

function noErrors(input) {
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

    assert.equal(0, network.errors.length);
  }

function duplicateGeneError(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "DUPLICATE_GENE",
      network.errors[i].errorCode
    );
  }

  /* TO DO:
  
  network.errors.forEach(function (error) {
    assert.equal("DUPLICATE_GENE", error.errorCode); 
  });
  
  */
}

function invalidGeneLengthError(input, frequency){
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);
      
  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "INVALID_GENE_LENGTH",
      network.errors[i].errorCode
    );
  }
}
  

function corruptGeneError(input, frequency) {
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);
      
  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "CORRUPT_GENE",
      network.errors[i].errorCode
    );
  }
}

function unknownError(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "UNKNOWN_ERROR",
      network.errors[i].errorCode
    );
  }      
}

function missingValueError(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "MISSING_VALUE",
      network.errors[i].errorCode
    );
  }     
}

function missingNetworkError(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "MISSING_NETWORK",
      network.errors[i].errorCode
    );
  }      
}

function invalidDataTypeError(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "INVALID_CELL_DATA_TYPE",
      network.errors[i].errorCode
    );
  } 
}

function networkSizeError(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "INVALID_NETWORK_SIZE",
      network.errors[i].errorCode
    );
  }      
}


function checkForGene(test, frequency, input) {
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.genes.filter(function (gene) {
    return gene.name === test; 
  }).length);
}

function warningsCountError(test, frequency, input) {
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "WARNINGS_OVERLOAD",
      network.errors[i].errorCode
    );
  } 
}



//WARNING TEST FUNCTIONS:

function noWarnings(input) {
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(0, network.warnings.length);
}

function missingSourceWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);
  var missingSourceCount = network.warnings.filter(function(x){return x.warningCode=="MISSING_SOURCE"});

  assert.equal(frequency, missingSourceCount.length);
}

function missingTargetWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);
  var missingTargetCount = network.warnings.filter(function(x){return x.warningCode=="MISSING_TARGET"});

  assert.equal(frequency, missingTargetCount.length);
}

function invalidDataWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);
  var invalidDataCount = network.warnings.filter(function(x){return x.warningCode=="INVALID_DATA"});

  assert.equal(frequency, invalidDataCount.length);
}

function randomDataWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);
  var randomDataCount = network.warnings.filter(function(x){return x.warningCode=="RANDOM_DATA"});

  assert.equal(frequency, randomDataCount.length);
}

function emptyRowWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);
  var emptyRowCount = network.warnings.filter(function(x){return x.warningCode=="EMPTY_ROW"});

  assert.equal(frequency, emptyRowCount.length);
}

function invalidNetworkSizeWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);
  var invalidNetworkSizeCount = network.warnings.filter(function(x){return x.warningCode=="INVALID_NETWORK_SIZE"});

  assert.equal(frequency, invalidNetworkSizeCount.length);
}

function networkSizeWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.warnings.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "INVALID_NETWORK_SIZE",
      network.warnings[i].warningCode
    );
  }      
}

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

//Graph Statistics

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

function shortestPath(input, directed, source, target, length) {
  var sheet = xlsx.parse(input);
  var network = spreadsheetController.parseSheet(sheet);
  var cytoscapeElements = grnSightToCytoscape(network);

  var cy = cytoscape({
    headless: true,
    elements: cytoscapeElements
  })

  var dijkstra = cy.elements().dijkstra("#" + source, null, directed);
  assert.equal(dijkstra.distanceTo("#" + target), length);
}







