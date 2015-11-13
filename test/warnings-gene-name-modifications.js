var assert = require('chai').assert,
    xlsx = require('node-xlsx'),
    test = require('./test');
var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();


describe('warnings-gene-name-modifications', function () {
	describe('NaN-as-gene-name', function () {
    it('should not return any warnings', function () {
      var sheet = xlsx.parse('NaN-as-gene-name-input.xlsx'),
      network = spreadsheetController.parseSheet(sheet);

  		assert.equal(0, network.warnings.length);
      //test.duplicateGeneError('test-files/gene-name-modifications/NaN-as-gene-name-input.xlsx');
      //test.duplicateGeneError('test-files/gene-name-modifications/NaN-as-gene-name-output.xlsx');
    })
  })
})
