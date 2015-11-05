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
exports.networkSizeWarning = networkSizeWarning;
exports.isNaNError = isNaNError;
exports.checkForGene = checkForGene;

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
      network.errors[0].errorCode
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
      network.errors[0].errorCode
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

function isNaNError(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);

  assert.equal(frequency, network.warnings.length);

  for(var i = 0; i < frequency; i++) {
    assert.equal(
      "IS_NAN",
      network.warnings[i].warningCode
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

function invaidDataWarning(input, frequency) {  
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

function invalidCellDataTypeWarning(input, frequency) {  
  var sheet = xlsx.parse(input),
      network = spreadsheetController.parseSheet(sheet);
  var invalidCellDataTypeCount = network.warnings.filter(function(x){return x.warningCode=="INVALID_CELL_DATA_TYPE"});

  assert.equal(frequency, invalidCellDataTypeCount.length);
}










