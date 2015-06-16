var assert = require('chai').assert,
    xlsx = require('node-xlsx');
var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();



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

  function checkForGene(test, frequency, input) {
    var sheet = xlsx.parse(input),
        network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.genes.filter(function (gene) {
      return gene.name === test; 
    }).length);
  }


describe('graph-tests', function () {
  describe('asymmetrical-graphs', function () {
    it('should not return any errors', function () {
      noErrors('test-files/graph-tests/asymmetrical-disordered-input.xlsx');
      noErrors('test-files/graph-tests/asymmetrical-more-source-genes.xlsx');
      noErrors('test-files/graph-tests/asymmetrical-more-target-genes.xlsx');
    })
  })

  describe('incorrect-corrupt-gene-error-dCIN5', function () {
    it('should not return any errors', function () {
      noErrors('test-files/graph-tests/dCIN5GendronModel1.xlsx');
    })
  })

  describe('incorrect-missing-data-error-10-genes-0-edges', function () {
    it('should not return any errors', function () {
      noErrors('test-files/graph-tests/different-sized-networks/10-genes-0-edges.xlsx');
    })
  })

  describe('over-75-genes-or-150-nodes', function () {
    it('should return invalid network size error', function () {
      networkSizeError('test-files/graph-tests/different-sized-networks/80-genes-0-edges.xlsx', 1);
      networkSizeError('test-files/graph-tests/different-sized-networks/45-genes-max-edges.xlsx', 1);
    })
  })

  describe('over-50-genes-or-100-nodes', function () {
    it('should return invalid network size warning', function () {
      networkSizeWarning('test-files/graph-tests/different-sized-networks/52-genes-0-edges.xlsx', 1);
      networkSizeWarning('test-files/graph-tests/different-sized-networks/34-genes-111-edges.xlsx', 1);
    })
  })

  describe('only-self-referential-data', function () {
    it('should not return any errors', function () {
      noErrors('test-files/graph-tests/only-self-referential-edges-input.xlsx');
      noErrors('test-files/graph-tests/only-self-referential-edges-output.xlsx');
    })
  })
})