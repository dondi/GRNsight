var assert = require('chai').assert,
    xlsx = require('node-xlsx'),
    test = require('./test');
var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

describe('warnings-adjacency-matrix-modifications', function () {
	describe('asymmetric-gene-order', function () {
    	it('should not return any warnings', function () {
      		test.noWarnings('test-files/adjacency-matrix-modifications/asymmetric-gene-order-input.xlsx');
      		test.noWarnings('test-files/adjacency-matrix-modifications/asymmetric-gene-order-output.xlsx');
    	})
  	})

  	describe('empty-column', function () {
    	it('1 source gene warning, 3 invalid data warnings', function () {
      		test.missingSourceWarning('test-files/adjacency-matrix-modifications/empty-column-input.xlsx', 1);
      		test.invalidDataWarning('test-files/adjacency-matrix-modifications/empty-column-input.xlsx', 3);
      		test.missingSourceWarning('test-files/adjacency-matrix-modifications/empty-column-output.xlsx', 1);
      		test.invalidDataWarning('test-files/adjacency-matrix-modifications/empty-column-output.xlsx', 3);
    	})
  	})

  	describe('empty-row', function () {
    	it('1 target gene warning', function () {
      		test.missingTargetWarning('test-files/adjacency-matrix-modifications/empty-row-input.xlsx', 1);
      		test.missingTargetWarning('test-files/adjacency-matrix-modifications/empty-row-output.xlsx', 1);
    	})
  	})

  	describe('extra-column-adjacent', function () {
    	it('should not return any warnings', function () {
      		test.noWarnings('test-files/adjacency-matrix-modifications/extra-column-adjacent-input.xlsx');
      		test.randomDataWarning('test-files/adjacency-matrix-modifications/extra-column-adjacent-output.xlsx', 1);
    	})
  	})

  	describe('extra-column-end-of-sheet', function () {
    	it('should not return any warnings', function () {
      		test.noWarnings('test-files/adjacency-matrix-modifications/extra-column-end-of-sheet-input.xlsx');
      		test.noWarnings('test-files/adjacency-matrix-modifications/extra-column-end-of-sheet-output.xlsx');
    	})
  	})

  	describe('extra-column-one-column-skipped', function () {
    	it('2 random data and 3 invalid data warnings', function () {
      		test.randomDataWarning('test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-input.xlsx', 2);
      		test.invalidDataWarning('test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-input.xlsx', 3);
      		test.randomDataWarning('test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-output.xlsx', 1);
      		test.invalidDataWarning('test-files/adjacency-matrix-modifications/extra-column-one-column-skipped-output.xlsx', 3);

    	})
  	})

  	describe('extra-data-random-cell-both', function () {
    	it('6 empty row, 1 target gene, and 3 invalid data warnings', function () {
      		test.emptyRowWarning('test-files/adjacency-matrix-modifications/extra-data-random-cell-both-output.xlsx', 6);
      		test.missingTargetWarning('test-files/adjacency-matrix-modifications/extra-data-random-cell-both-output.xlsx', 1);
      		test.invalidDataWarning('test-files/adjacency-matrix-modifications/extra-data-random-cell-both-output.xlsx', 3);
    	})
  	})

  	describe('extra-data-random-cell-other', function () {
    	it('15 empty row, 5 invalid data', function () {
      		test.emptyRowWarning('test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-input.xlsx', 14);
      		test.invalidDataWarning('test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-input.xlsx', 5);
      		test.noWarnings('test-files/adjacency-matrix-modifications/extra-data-random-cell-network-only-output.xlsx');
      		test.emptyRowWarning('test-files/adjacency-matrix-modifications/extra-data-random-cell-network-optimized-only-output.xlsx', 14);
      		test.missingTargetWarning('test-files/adjacency-matrix-modifications/extra-data-random-cell-network-optimized-only-output.xlsx', 1);
    	})
  	})

  	describe('extra-row-adjacent', function () {
    	it('1 target gene warning', function () {
      		test.missingTargetWarning('test-files/adjacency-matrix-modifications/extra-row-adjacent-input.xlsx', 1);
      		test.missingTargetWarning('test-files/adjacency-matrix-modifications/extra-row-adjacent-output.xlsx', 1);
    	})
  	})
})









