var assert = require('chai').assert,
    xlsx = require('node-xlsx'),
    cytoscape = require('cytoscape');

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
exports.emptyRowError = emptyRowError;
exports.errorsCountError = errorsCountError;

exports.checkForGene = checkForGene;
exports.noWarnings = noWarnings;
exports.missingSourceWarning = missingSourceWarning;
exports.missingTargetWarning = missingTargetWarning;
exports.randomDataWarning = randomDataWarning;
exports.emptyRowWarning = emptyRowWarning;
exports.invalidNetworkSizeWarning = invalidNetworkSizeWarning;
exports.extraneousDataWarning = extraneousDataWarning;
exports.invalidMatrixDataWarning = invalidMatrixDataWarning;

exports.shortestPath = shortestPath;
exports.betweennessCentrality = betweennessCentrality;

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

function warningsCountError(input, frequency) {
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet),
      warningsCountErrorArray = network.errors.filter(function(x){return x.errorCode == "WARNINGS_OVERLOAD"});

  assert.equal(frequency, warningsCountErrorArray.length);
}

function errorsCountError(input, frequency) {
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet),
      errorsCountErrorArray = network.errors.filter(function(x){return x.errorCode == "ERRORS_OVERLOAD"});

  assert.equal(frequency, errorsCountErrorArray.length);
}

function emptyRowError(input, frequency) {
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.errors.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "EMPTY_ROW",
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

function invalidMatrixDataWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);
  var invalidDataCount = network.warnings.filter(function(x){return x.warningCode=="INVALID_DATA"});

  assert.equal(frequency, invalidDataCount.length);
}

function missingTargetWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);
  var missingTargetCount = network.warnings.filter(function(x){return x.warningCode=="MISSING_TARGET"});

  assert.equal(frequency, missingTargetCount.length);
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

function extraneousDataWarning(input, frequency) {
  var sheet = xlsx.parse(input),
    network = spreadsheetController.parseSheet(sheet);
  var extraneousDataWarning = network.warnings.filter(function(x){return x.warningCode=="EXTRANEOUS_DATA"});

  assert.equal(frequency, extraneousDataWarning.length);
}

//GRAPH STATISTICS

function shortestPath(input, directed, source, target, length) {
  var sheet = xlsx.parse(input);
  var network = spreadsheetController.parseSheet(sheet);
  var cytoscapeElements = spreadsheetController.grnSightToCytoscape(network);

  var cy = cytoscape({
    headless: true,
    elements: cytoscapeElements
  })

  var dijkstra = cy.elements().dijkstra("#" + source, null, directed);
  assert.equal(dijkstra.distanceTo("#" + target), length);
}

function betweennessCentrality(input, directed, node, centrality) {
  var sheet = xlsx.parse(input);
  var network = spreadsheetController.parseSheet(sheet);
  var cytoscapeElements = spreadsheetController.grnSightToCytoscape(network);

  var cy = cytoscape({
    headless: true,
    elements: cytoscapeElements
  })

  var bc = cy.$().bc();
  assert.equal(bc.betweenness('#' + node, null, directed), centrality);
}







