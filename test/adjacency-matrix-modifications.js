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

  describe('adjacency-matrix-modifications', function () {
  describe('asymmetrical-graphs', function () {
    it('should not return any errors', function () {
      noErrors('test-files/adjacency-matrix-modifications/asymmetric-gene-order-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/asymmetric-gene-order-output.xlsx');
    })
  })

  describe('extra-data', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/extra-data-random-cell-both-output.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-output.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/extra-data-random-cell-network-optimized-only-output.xlsx');
    })
  })

  describe('extra-column-adjacent', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/extra-column-adjacent-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/extra-column-adjacent-output.xlsx');
    })
  })

  describe('extra-column-end-of-sheet', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/extra-column-end-of-sheet-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/extra-column-end-of-sheet-output.xlsx');
    })
  })

  describe('extra-column-one-column-skipped', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-output.xlsx');
    })
  })

  describe('extra-row-adjacent', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/extra-row-adjacent-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/extra-row-adjacent-output.xlsx');
    })
  })

  describe('extra-row-end-of-sheet', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/extra-row-end-of-sheet-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/extra-row-end-of-sheet-output.xlsx');
    })
  })

  describe('extra-row-one-row-skipped', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/extra-row-one-row-skipped-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/extra-row-one-row-skipped-output.xlsx');
    })
  })

  describe('missing-value-top-corner', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-value-top-corner-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-value-top-corner-output.xlsx');
    })
  })

  describe('missing-value-middle', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-value-middle-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-value-middle-output.xlsx');
    })
  })

  describe('missing-value-bottom-corner', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-value-bottom-corner-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-value-bottom-corner-output.xlsx');
    })
  })

  describe('missing-row-top', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-row-top-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-row-top-output.xlsx');
    })
  })

  describe('missing-row-middle', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-row-middle-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-row-middle-output.xlsx');
    })
  })

  describe('missing-row-end', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-row-end-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-row-end-output.xlsx');
    })
  })

  describe('missing-column-top', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-column-top-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-column-top-output.xlsx');
    })
  })

  describe('missing-column-middle', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-column-middle-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-column-middle-output.xlsx');
    })
  })

  describe('missing-column-end', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-column-end-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-column-end-output.xlsx');
    })
  })

  describe('missing-data', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/missing-data-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/missing-data-output.xlsx');
    })
  })
  
  describe('value-replaced-with-spaces', function () {
    it('should not return any errors', function () {
      noErrors('test-files/adjacency-matrix-modifications/value-replaced-w-spaces-both-output.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/value-replaced-w-spaces-net-op-only-output.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/value-replaced–w-spaces-net-only-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/value-replaced–w-spaces-net-only-output.xlsx');
    })
  })

  describe('empty-row-or-column', function () {
    it('should not return any errors', function () {
      noErrors('test-files/adjacency-matrix-modifications/empty-column-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/empty-column-output.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/empty-row-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/empty-row-output.xlsx');
    })
  })

  // Adjacency Matrix Modifications - Data Types

  describe('accounting-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-accounting-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-accounting-input.xlsx');
    })
  })

  describe('currency-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-currency-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-currency-input.xlsx');
    })
  })

  describe('date-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-date-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-date-input.xlsx');
    })
  })

  describe('fraction-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-fraction-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-fraction-input.xlsx');
    })
  })

  describe('number-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-number-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-number-input.xlsx');
    })
  })

  describe('percentage-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-percentage-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-percentage-input.xlsx');
    })
  })

  describe('scientific-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-scientific-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-scientific-input.xlsx');
    })
  })

  describe('special-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-special-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-special-input.xlsx');
    })
  })

  describe('text-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-text-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-text-input.xlsx');
    })
  })

  describe('time-data-type-header', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-time-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-header-time-input.xlsx');
    })
  })

  describe('accounting-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-accounting-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-accounting-input.xlsx');
    })
  })

  describe('currency-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-currency-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-currency-input.xlsx');
    })
  })

  describe('date-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-date-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-date-input.xlsx');
    })
  })

  describe('fraction-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-fraction-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-fraction-input.xlsx');
    })
  })

  describe('number-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-number-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-number-input.xlsx');
    })
  })

  describe('percentage-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-percentage-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-percentage-input.xlsx');
    })
  })

  describe('scientific-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-scientific-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-scientific-input.xlsx');
    })
  })

  describe('special-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-special-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-special-input.xlsx');
    })
  })

  describe('text-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-text-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-text-input.xlsx');
    })
  })

  describe('time-data-type-matrix', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-time-input.xlsx');
      noErrors('test-files/adjacency-matrix-modifications/data-types/data-type-matrix-time-input.xlsx');
    })
  })
})
