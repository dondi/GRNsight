var assert = require('chai').assert,
    xlsx = require('node-xlsx');

var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

describe('gene-name-modifications', function () {

  function noErrors(input) {
    var sheet = xlsx.parse(input),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(0, network.errors.length);
  }

  function duplicateGene1(input) {  
        var sheet = xlsx.parse(input),
            network = spreadsheetController.parseSheet(sheet);

        assert.equal(1, network.errors.length);
        assert.equal(
          "DUPLICATE_GENE",
          network.errors[0].errorCode
        );
  }

  function duplicateGene2(input) {  
        var sheet = xlsx.parse(input),
            network = spreadsheetController.parseSheet(sheet);

        assert.equal(2, network.errors.length);
        assert.equal(
          "DUPLICATE_GENE",
          network.errors[0].errorCode
        );
        assert.equal(
          "DUPLICATE_GENE",
          network.errors[1].errorCode
        );
  }

  function invalidGeneLength1(input){
    var sheet = xlsx.parse(input),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "INVALID_GENE_LENGTH",
        network.errors[0].errorCode
      );
  }
  
  function invalidGeneLength2(input){
    var sheet = xlsx.parse(input),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(2, network.errors.length);
      assert.equal(
        "INVALID_GENE_LENGTH",
        network.errors[0].errorCode
      );
      assert.equal(
        "INVALID_GENE_LENGTH",
        network.errors[1].errorCode
      );
  }

  function corruptGene(input) {
    var sheet = xlsx.parse(input),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "CORRUPT_GENE",
        network.errors[0].errorCode
      );
  }

  describe('duplicate-gene-side-and-top', function () {
      it('should return 2 duplicate gene errors', function () {
        duplicateGene2('test-files/gene-name-modifications/duplicate-gene-side-and-top-input.xlsx');
        duplicateGene2('test-files/gene-name-modifications/duplicate-gene-side-and-top-output.xlsx');

      })
    })

  describe('duplicate-gene-side', function () {
    it('should return 1 duplicate gene error', function () {
      duplicateGene1('test-files/gene-name-modifications/duplicate-gene-side-input.xlsx');
      duplicateGene1('test-files/gene-name-modifications/duplicate-gene-side-output.xlsx');

    })
  })

describe('duplicate-gene-top', function () {
    it('should return 1 duplicate gene error', function () {
      duplicateGene1('test-files/gene-name-modifications/duplicate-gene-top-input.xlsx');
      duplicateGene1('test-files/gene-name-modifications/duplicate-gene-top-output.xlsx');
    })
  })

  describe('long-gene-name-related', function () {
    it('should return 1 long gene name error', function () {
      invalidGeneLength1('test-files/gene-name-modifications/long-gene-name-related-input.xlsx');
      invalidGeneLength1('test-files/gene-name-modifications/long-gene-name-related-output.xlsx');
    })
  })

  describe('long-gene-name-unrelated', function () {
    it('should return 2 long gene name error', function () {
      invalidGeneLength1('test-files/gene-name-modifications/long-gene-name-unrelated-input.xlsx');
      invalidGeneLength2('test-files/gene-name-modifications/long-gene-name-unrelated-output.xlsx');
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
      corruptGene('test-files/gene-name-modifications/missing-gene-name-side-input.xlsx');
      corruptGene('test-files/gene-name-modifications/missing-gene-name-side-output.xlsx');
    })
  })

  describe('missing-gene-name-top-and-side', function () {
    it('should return 1 missing gene error', function () {
      corruptGene('test-files/gene-name-modifications/missing-gene-name-top-and-side-input.xlsx');
      corruptGene('test-files/gene-name-modifications/missing-gene-name-top-and-side-output.xlsx');
    })
  })

  describe('missing-gene-name-top', function () {
    it('should return 1 missing gene error', function () {
      corruptGene('test-files/gene-name-modifications/missing-gene-name-top-input.xlsx');
      corruptGene('test-files/gene-name-modifications/missing-gene-name-top-output.xlsx');
    })
  })
})
