var assert = require('chai').assert;
var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

describe('Gene Name Modifications', function(){
  describe('duplicate-gene-top-output', function(){
    it('should return 1 duplicate gene error', function(){
      assert.equal("There exist a duplicate for source gene ACE2.", spreadsheetController.parseSheet());
    })
  })
})
