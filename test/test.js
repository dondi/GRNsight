var assert = require('chai').assert,
    xlsx = require('node-xlsx');

var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

describe('gene-name-modifications', function () {
  
  describe('duplicate-gene-side-and-top-input', function () {
      it('should return 2 duplicate gene errors', function () {
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
      it('should return 2 duplicate gene errors', function () {
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

  describe('long-gene-name-related-input', function () {
    it('should return 1 long gene name error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/long-gene-name-related-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "INVALID_GENE_LENGTH",
        network.errors[0].errorCode
      );
    })
  })

  describe('long-gene-name-related-output', function () {
    it('should return 1 long gene name error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/long-gene-name-related-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "INVALID_GENE_LENGTH",
        network.errors[0].errorCode
      );
    })
  })

  describe('long-gene-name-unrelated-input', function () {
    it('should return 1 long gene name error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/long-gene-name-unrelated-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "INVALID_GENE_LENGTH",
        network.errors[0].errorCode
      );
    })
  })

  describe('long-gene-name-unrelated-output', function () {
    it('should return 2 long gene name errors', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/long-gene-name-unrelated-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(2, network.errors.length);
      assert.equal(
        "INVALID_GENE_LENGTH",
        network.errors[0].errorCode
      );
    })
  })

  describe('mismatched-case-related-input', function () {
    it('should not return any errors', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/mismatched-case-related-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(0, network.errors.length);
    })
  })

  describe('mismatched-case-related-output', function () {
    it('should not return any errors', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/mismatched-case-related-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(0, network.errors.length);
    })
  })

  describe('mismatched-case-unrelated-input', function () {
    it('should not return any errors', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/mismatched-case-unrelated-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(0, network.errors.length);
    })
  })

  describe('mismatched-case-unrelated-output', function () {
    it('should not return any errors', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/mismatched-case-unrelated-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(0, network.errors.length);
    })
  })

  describe('missing-gene-name-side-input', function () {
    it('should return 1 missing gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/missing-gene-name-side-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "CORRUPT_GENE",
        network.errors[0].errorCode
      );
    })
  })

  describe('missing-gene-name-side-output', function () {
    it('should return 1 missing gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/missing-gene-name-side-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "CORRUPT_GENE",
        network.errors[0].errorCode
      );
    })
  })

  describe('missing-gene-name-top-and-side-input', function () {
    it('should return 1 missing gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/missing-gene-name-top-and-side-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "CORRUPT_GENE",
        network.errors[0].errorCode
      );
    })
  })

  describe('missing-gene-name-top-and-side-output', function () {
    it('should return 1 missing gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/missing-gene-name-top-and-side-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "CORRUPT_GENE",
        network.errors[0].errorCode
      );
    })
  })

  describe('missing-gene-name-top-input', function () {
    it('should return 1 missing gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/missing-gene-name-top-input.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "CORRUPT_GENE",
        network.errors[0].errorCode
      );
    })
  })

  describe('missing-gene-name-top-output', function () {
    it('should return 1 missing gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/missing-gene-name-top-output.xlsx'),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "CORRUPT_GENE",
        network.errors[0].errorCode
      );
    })
  })

})
