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
          "DUPLICATE_GENE",
          network.errors[0].errorCode
        );
        assert.equal(
          "DUPLICATE_GENE",
          network.errors[1].errorCode
        );
      })
    })

  describe('duplicate-gene-side-and-top-output', function () {
      it('should return 1 duplicate gene error', function () {
        var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-side-and-top-output.xlsx'),
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
      })
    })

  describe('duplicate-gene-side-input', function () {
    it('should return 1 duplicate gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-side-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "DUPLICATE_GENE",
        network.errors[0].errorCode
      );
    })
  })

  describe('duplicate-gene-side-output', function () {
    it('should return 1 duplicate gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-side-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "DUPLICATE_GENE",
        network.errors[0].errorCode
      );
    })
  })

describe('duplicate-gene-top-input', function () {
    it('should return 1 duplicate gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-top-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "DUPLICATE_GENE",
        network.errors[0].errorCode
      );
    })
  })

  describe('duplicate-gene-top-output', function () {
    it('should return 1 duplicate gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-top-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "DUPLICATE_GENE",
        network.errors[0].errorCode
      );
    })
  })

})
