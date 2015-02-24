var assert = require('chai').assert;
var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

describe('Gene Name Modifications', function(){
  describe('duplicate-gene-top-output', function(){
    it('should return 1 duplicate gene error', function(){
      var sheet = {genes: [21], errors: [1]},
        possibleCause;
      sheet.errors[0].possibleCause("There exists a duplicate for source gene ACE2.")
      assert.equal("There exists a duplicate for source gene ACE2.", spreadsheetController.parseSheet(sheet).possibleCause);
    })
  })
})
