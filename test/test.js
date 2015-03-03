var assert = require('chai').assert,
    xlsx = require('node-xlsx');

var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

describe('gene-name-modifications', function () {
  
  describe('duplicate-gene-side-and-top-input', function () {
      it('should return 1 duplicate gene error', function () {
        var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-side-and-top-input.xlsx'),
            network = spreadsheetController.parseSheet(sheet);

        assert.equal(2, network.errors.length);
        assert.equal(
          "There exists a duplicate for source gene ACE2.",
          network.errors[0].possibleCause
        );
        assert.equal(
          "There exists a duplicate for target gene YAP6.",
          network.errors[1].possibleCause
        );
      })
    })

  describe('duplicate-gene-side-and-top-output', function () {
      it('should return 1 duplicate gene error', function () {
        var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-side-and-top-output.xlsx'),
            network = spreadsheetController.parseSheet(sheet);

        assert.equal(2, network.errors.length);
        assert.equal(
          "There exists a duplicate for source gene ACE2.",
          network.errors[0].possibleCause
        );
        assert.equal(
          "There exists a duplicate for target gene YAP6.",
          network.errors[1].possibleCause
        );
      })
    })

  describe('duplicate-gene-side-input', function () {
    it('should return 1 duplicate gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-side-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "There exists a duplicate for target gene YAP1.",
        network.errors[0].possibleCause
      );
    })
  })

  describe('duplicate-gene-side-output', function () {
    it('should return 1 duplicate gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-side-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "There exists a duplicate for target gene YAP1.",
        network.errors[0].possibleCause
      );
    })
  })

describe('duplicate-gene-top-input', function () {
    it('should return 1 duplicate gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-top-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "There exists a duplicate for source gene ACE2.",
        network.errors[0].possibleCause
      );
    })
  })

  describe('duplicate-gene-top-output', function () {
    it('should return 1 duplicate gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-top-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "There exists a duplicate for source gene ACE2.",
        network.errors[0].possibleCause
      );
    })
  })

})
