var assert = require('chai').assert,
    xlsx = require('node-xlsx'),
    test = require('./test');
var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();


describe('warnings-gene-name-modifications', function () {
	describe('NaN-as-gene-name', function () {
    it('should not return any warnings', function () {
      test.noWarnings('test-files/gene-name-modifications/NaN-as-gene-name-input.xlsx');
      test.noWarnings('test-files/gene-name-modifications/NaN-as-gene-name-output.xlsx');
    })
  })
})
