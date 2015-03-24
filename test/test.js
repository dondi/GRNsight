var assert = require('chai').assert,
    xlsx = require('node-xlsx');

var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

describe('gene-name-modifications', function () {

  function noErrors(input) {
    var sheet = xlsx.parse(input),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(0, network.errors.length);
  }

  function duplicateGene(input, frequency) {  
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

  function invalidGeneLength(input, frequency){
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
  

  function corruptGene(input, frequency) {
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

  describe('duplicate-gene-side-and-top', function () {
      it('should return 2 duplicate gene errors', function () {
        duplicateGene('test-files/gene-name-modifications/duplicate-gene-side-and-top-input.xlsx', 2);
        duplicateGene('test-files/gene-name-modifications/duplicate-gene-side-and-top-output.xlsx', 2);

      })
    })

  describe('duplicate-gene-side', function () {
    it('should return 1 duplicate gene error', function () {
      duplicateGene('test-files/gene-name-modifications/duplicate-gene-side-input.xlsx', 1);
      duplicateGene('test-files/gene-name-modifications/duplicate-gene-side-output.xlsx', 1);

    })
  })

describe('duplicate-gene-top', function () {
    it('should return 1 duplicate gene error', function () {
      duplicateGene('test-files/gene-name-modifications/duplicate-gene-top-input.xlsx', 1);
      duplicateGene('test-files/gene-name-modifications/duplicate-gene-top-output.xlsx', 1);
    })
  })

  describe('long-gene-name-related', function () {
    it('should return 1 long gene name error', function () {
      invalidGeneLength('test-files/gene-name-modifications/long-gene-name-related-input.xlsx', 1);
      invalidGeneLength('test-files/gene-name-modifications/long-gene-name-related-output.xlsx', 1);
    })
  })

  describe('long-gene-name-unrelated', function () {
    it('should return 1 or 2 long gene name error', function () {
      invalidGeneLength('test-files/gene-name-modifications/long-gene-name-unrelated-input.xlsx', 1);
      invalidGeneLength('test-files/gene-name-modifications/long-gene-name-unrelated-output.xlsx', 2);
    })
  })

  describe('mismatched-case-related', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/mismatched-case-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/mismatched-case-related-output.xlsx');
    })
  })

  describe('mismatched-case-unrelated', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/mismatched-case-unrelated-input.xlsx');
      noErrors('test-files/gene-name-modifications/mismatched-case-unrelated-output.xlsx')

    })
  })

  describe('missing-gene-name-side', function () {
    it('should return 1 missing gene error', function () {
      corruptGene('test-files/gene-name-modifications/missing-gene-name-side-input.xlsx', 1);
      corruptGene('test-files/gene-name-modifications/missing-gene-name-side-output.xlsx', 1);
    })
  })

  describe('missing-gene-name-top-and-side', function () {
    it('should return 1 missing gene error', function () {
      corruptGene('test-files/gene-name-modifications/missing-gene-name-top-and-side-input.xlsx', 1);
      corruptGene('test-files/gene-name-modifications/missing-gene-name-top-and-side-output.xlsx', 1);
    })
  })

  describe('missing-gene-name-top', function () {
    it('should return 1 missing gene error', function () {
      corruptGene('test-files/gene-name-modifications/missing-gene-name-top-input.xlsx', 1);
      corruptGene('test-files/gene-name-modifications/missing-gene-name-top-output.xlsx', 1);
    })
  })
})
