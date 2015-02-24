var assert = require('chai').assert,
    xlsx = require('node-xlsx');

var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

describe('Gene Name Modifications', function () {
  describe('duplicate-gene-top-output', function () {
    it('should return 1 duplicate gene error', function () {
      var sheet = xlsx.parse('test-files/gene-name-modifications/duplicate-gene-top-output.xlsx');
      console.log(sheet);
      var network = spreadsheetController.parseSheet(sheet);

      assert.equal(1, network.errors.length);
      assert.equal(
        "There exists a duplicate for source gene ACE2.",
        network.errors[0].possibleCause
      );
    })
  })
})
