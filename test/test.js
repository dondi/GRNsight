var assert = require('chai').assert;
var parseSheet = require('./server/controller/spreadsheet-controller.js')

describe('Gene Name Modifications', function(){
  describe('duplicate-gene-top-output', function(){
    it('should return 1 duplicate gene error', function(){
      assert.equal("There exist a duplicate for source gene ACE2.", "TBD");
    })
  })
})