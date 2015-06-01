var assert = require('chai').assert,
    xlsx = require('node-xlsx');

var spreadsheetController = require(__dirname + '/../server/controllers' + '/spreadsheet-controller')();

  function noErrors(input) {
    var sheet = xlsx.parse(input),
          network = spreadsheetController.parseSheet(sheet);

      assert.equal(0, network.errors.length);
  }

  function duplicateGeneError(input, frequency) {  
    var sheet = xlsx.parse(input),
        network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for(var i = 0; i < frequency; i++) {
      assert.equal(
        "DUPLICATE_GENE",
        network.errors[i].errorCode
      );
    }      
  }

  function invalidGeneLengthError(input, frequency){
    var sheet = xlsx.parse(input),
        network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);
      
    for(var i = 0; i < frequency; i++) {
      assert.equal(
        "INVALID_GENE_LENGTH",
        network.errors[0].errorCode
      );
    }
  }
  

  function corruptGeneError(input, frequency) {
    var sheet = xlsx.parse(input),
        network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);
      
    for(var i = 0; i < frequency; i++) {
      assert.equal(
        "CORRUPT_GENE",
        network.errors[0].errorCode
      );
    }
  }

  function unknownError(input, frequency) {  
    var sheet = xlsx.parse(input),
        network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for(var i = 0; i < frequency; i++) {
      assert.equal(
        "UNKNOWN_ERROR",
        network.errors[i].errorCode
      );
    }      
  }

  function missingValueError(input, frequency) {  
    var sheet = xlsx.parse(input),
        network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for(var i = 0; i < frequency; i++) {
      assert.equal(
        "MISSING_VALUE",
        network.errors[i].errorCode
      );
    }      
  }

  function missingNetworkError(input, frequency) {  
    var sheet = xlsx.parse(input),
        network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for(var i = 0; i < frequency; i++) {
      assert.equal(
        "MISSING_NETWORK",
        network.errors[i].errorCode
      );
    }      
  }


  // Gene Name Modifications
describe('gene-name-modifications', function () {
  describe('duplicate-gene-side-and-top', function () {
      it('should return 2 duplicate gene errors', function () {
        duplicateGeneError('test-files/gene-name-modifications/duplicate-gene-side-and-top-input.xlsx', 2);
        duplicateGeneError('test-files/gene-name-modifications/duplicate-gene-side-and-top-output.xlsx', 2);

      })
    })

  describe('duplicate-gene-side', function () {
    it('should return 1 duplicate gene error', function () {
      duplicateGeneError('test-files/gene-name-modifications/duplicate-gene-side-input.xlsx', 1);
      duplicateGeneError('test-files/gene-name-modifications/duplicate-gene-side-output.xlsx', 1);

    })
  })

describe('duplicate-gene-top', function () {
    it('should return 1 duplicate gene error', function () {
      duplicateGeneError('test-files/gene-name-modifications/duplicate-gene-top-input.xlsx', 1);
      duplicateGeneError('test-files/gene-name-modifications/duplicate-gene-top-output.xlsx', 1);
    })
  })

  describe('long-gene-name-related', function () {
    it('should return 1 long gene name error', function () {
      invalidGeneLengthError('test-files/gene-name-modifications/long-gene-name-related-input.xlsx', 1);
      invalidGeneLengthError('test-files/gene-name-modifications/long-gene-name-related-output.xlsx', 1);
    })
  })

  describe('long-gene-name-unrelated', function () {
    it('should return 1 or 2 long gene name error', function () {
      invalidGeneLengthError('test-files/gene-name-modifications/long-gene-name-unrelated-input.xlsx', 1);
      invalidGeneLengthError('test-files/gene-name-modifications/long-gene-name-unrelated-output.xlsx', 2);
    })
  })

  describe('mismatched-case-related', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/mismatched-case-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/mismatched-case-related-output.xlsx');
    })
  })

  describe('mismatched-case-unrelated', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/mismatched-case-unrelated-input.xlsx');
      noErrors('test-files/gene-name-modifications/mismatched-case-unrelated-output.xlsx')

    })
  })

  describe('missing-gene-name-side', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/gene-name-modifications/missing-gene-name-side-input.xlsx');
      noErrors('test-files/gene-name-modifications/missing-gene-name-side-output.xlsx');
    })
  })

  describe('missing-gene-name-top-and-side', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/gene-name-modifications/missing-gene-name-top-and-side-input.xlsx');
      noErrors('test-files/gene-name-modifications/missing-gene-name-top-and-side-output.xlsx');
    })
  })

  describe('missing-gene-name-top', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/gene-name-modifications/missing-gene-name-top-input.xlsx');
      noErrors('test-files/gene-name-modifications/missing-gene-name-top-output.xlsx');
    })
  })

  // Gene Name Modifications - Special Characters

  describe('ampersand', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/ampersand-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/ampersand-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/ampersand-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/ampersand-unrelated-output.xlsx')
    })
  })

  describe('asterisk', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/asterisk-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/asterisk-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/asterisk-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/asterisk-unrelated-output.xlsx')
    })
  })

  describe('at', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/at-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/at-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/at-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/at-unrelated-output.xlsx')
    })
  })

  describe('backwards-slash', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/backwards-slash-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/backwards-slash-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/backwards-slash-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/backwards-slash-unrelated-output.xlsx')
    })
  })

  describe('caret', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/caret-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/caret-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/caret-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/caret-unrelated-output.xlsx')
    })
  })

  describe('close-parentheses', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-parentheses-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-parentheses-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-parentheses-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-parentheses-unrelated-output.xlsx')
    })
  })

  describe('close-square-bracket', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-square-bracket-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-square-bracket-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-square-bracket-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-square-bracket-unrelated-output.xlsx')
    })
  })

  describe('close-twirly-bracket', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-twirly-bracket-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-twirly-bracket-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-twirly-bracket-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/close-twirly-bracket-unrelated-output.xlsx')
    })
  })

  describe('colon', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/colon-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/colon-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/colon-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/colon-unrelated-output.xlsx')
    })
  })

  describe('comma', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/comma-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/comma-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/comma-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/comma-unrelated-output.xlsx')
    })
  })

  describe('dash', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/dash-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/dash-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/dash-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/dash-unrelated-output.xlsx')
    })
  })

  describe('dollar', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/dollar-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/dollar-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/dollar-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/dollar-unrelated-output.xlsx')
    })
  })

  describe('double-quotes', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/double-quotes-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/double-quotes-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/double-quotes-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/double-quotes-unrelated-output.xlsx')
    })
  })

  describe('equals', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/equals-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/equals-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/equals-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/equals-unrelated-output.xlsx')
    })
  })

  describe('exclamation-point', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/exclamation-point-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/exclamation-point-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/exclamation-point-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/exclamation-point-unrelated-output.xlsx')
    })
  })

  describe('forward-slash', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/forward-slash-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/forward-slash-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/forward-slash-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/forward-slash-unrelated-output.xlsx')
    })
  })

  describe('greater-than', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/greater-than-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/greater-than-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/greater-than-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/greater-than-unrelated-output.xlsx')
    })
  })

  describe('less-than', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/less-than-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/less-than-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/less-than-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/less-than-unrelated-output.xlsx')
    })
  })

  describe('modulo', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/modulo-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/modulo-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/modulo-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/modulo-unrelated-output.xlsx')
    })
  })

  describe('open-parentheses', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-parentheses-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-parentheses-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-parentheses-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-parentheses-unrelated-output.xlsx')
    })
  })

  describe('open-square-bracket', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-square-bracket-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-square-bracket-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-square-bracket-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-square-bracket-unrelated-output.xlsx')
    })
  })

  describe('open-twirly-bracket', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-twirly-bracket-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-twirly-bracket-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-twirly-bracket-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/open-twirly-bracket-unrelated-output.xlsx')
    })
  })

  describe('period', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/period-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/period-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/period-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/period-unrelated-output.xlsx')
    })
  })

  describe('plus-sign', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/plus-sign-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/plus-sign-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/plus-sign-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/plus-sign-unrelated-output.xlsx')
    })
  })

  describe('pound-symbol', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/pound-symbol-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/pound-symbol-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/pound-symbol-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/pound-symbol-unrelated-output.xlsx')
    })
  })

  describe('question-mark', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/question-mark-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/question-mark-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/question-mark-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/question-mark-unrelated-output.xlsx')
    })
  })

  describe('semicolon', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/semicolon-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/semicolon-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/semicolon-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/semicolon-unrelated-output.xlsx')
    })
  })

  describe('single-apostrophe', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-apostrophe-open-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-apostrophe-open-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-apostrophe-open-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-apostrophe-open-unrelated-output.xlsx')
    })
  })

  describe('single-line', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-line-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-line-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-line-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-line-unrelated-output.xlsx')
    })
  })

  describe('single-quote', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-quote-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-quote-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-quote-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/single-quote-unrelated-output.xlsx')
    })
  })

  describe('space', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/space-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/space-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/space-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/space-unrelated-output.xlsx')
    })
  })

  describe('tilde', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/tilde-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/tilde-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/tilde-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/tilde-unrelated-output.xlsx')
    })
  })

  describe('underscore', function () {
    it('should not return any errors', function () {
      noErrors('test-files/gene-name-modifications/special-characters-tests/underscore-related-input.xlsx');
      noErrors('test-files/gene-name-modifications/special-characters-tests/underscore-related-output.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/underscore-unrelated-input.xlsx')
      noErrors('test-files/gene-name-modifications/special-characters-tests/underscore-unrelated-output.xlsx')
    })
  })
})

  // Graph Tests

describe('graph-tests', function () {
  describe('asymmetrical-graphs', function () {
    it('should not return any errors', function () {
      noErrors('test-files/graph-tests/asymmetrical-disordered-input.xlsx');
      noErrors('test-files/graph-tests/asymmetrical-more-source-genes.xlsx');
      noErrors('test-files/graph-tests/asymmetrical-more-target-genes.xlsx');
    })
  })

  describe('incorrect-corrupt-gene-error-dCIN5', function () {
    it('should not return any errors', function () {
      noErrors('test-files/graph-tests/dCIN5GendronModel1.xlsx');
    })
  })

  describe('incorrect-missing-data-error-10-genes-0-edges', function () {
    it('should not return any errors', function () {
      noErrors('test-files/graph-tests/different-sized-networks/10-genes-0-edges.xlsx');
    })
  })
})

  // Matrix Modifications

describe('matrix-modifications', function () {
  describe('asymmetrical-graphs', function () {
    it('should not return any errors', function () {
      noErrors('test-files/matrix-modifications/asymmetric-gene-order-input.xlsx');
      noErrors('test-files/matrix-modifications/asymmetric-gene-order-output.xlsx');
    })
  })

  describe('extra-data', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/matrix-modifications/extra-data-random-cell-both-output.xlsx');
      noErrors('test-files/matrix-modifications/extra-data-random-cell-network-only-input.xlsx');
      noErrors('test-files/matrix-modifications/extra-data-random-cell-network-only-output.xlsx');
      noErrors('test-files/matrix-modifications/extra-data-random-cell-network-optimized-only-output.xlsx');
    })
  })

  describe('missing-value', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/matrix-modifications/missing-value-both-sheets-output.xlsx');
      noErrors('test-files/matrix-modifications/missing-value-network-only-input.xlsx');
      noErrors('test-files/matrix-modifications/missing-value-network-only-output.xlsx');
      noErrors('test-files/matrix-modifications/missing-value-network-optimized-only-output.xlsx');
    })
  })

  describe('text-data-type-inside-related', function () {
    it('should return no errors', function () {
      noErrors('test-files/matrix-modifications/text-data-type-inside_related-both-output.xlsx');
      noErrors('test-files/matrix-modifications/text-data-type-inside_related-net-only-input.xlsx');
      noErrors('test-files/matrix-modifications/text-data-type-inside_related-net-only-output.xlsx');
      noErrors('test-files/matrix-modifications/text-data-type-inside-related-net-op-only-output.xlsx');
    })
  })

  describe('text-data-type-inside-unrelated', function () {
    it('should return no errors', function () {
      noErrors('test-files/matrix-modifications/text-data-type-inside-unrelated-both-output.xlsx');
      noErrors('test-files/matrix-modifications/text-data-type-inside-unrelated-net-only-input.xlsx');
      noErrors('test-files/matrix-modifications/text-data-type-inside-unrelated-net-only-output.xlsx');
      noErrors('test-files/matrix-modifications/text-data-type-inside-unrelated-net-op-only-output.xlsx');
    })
  })

  describe('text-data-type-outside', function () {
    it('should not return any errors, but should return warnings', function () {
      noErrors('test-files/matrix-modifications/text-data-type-outside-both-output.xlsx');
      noErrors('test-files/matrix-modifications/text-data-type-outside-net-only-input.xlsx');
      noErrors('test-files/matrix-modifications/text-data-type-outside-net-only-output.xlsx');
      noErrors('test-files/matrix-modifications/text-data-type-outside-net-op-only-output.xlsx');
    })
  })
  
  describe('value-replaced-with-spaces', function () {
    it('should not return any errors', function () {
      noErrors('test-files/matrix-modifications/value-replaced-w-spaces-both-output.xlsx');
      noErrors('test-files/matrix-modifications/value-replaced-w-spaces-net-op-only-output.xlsx');
      noErrors('test-files/matrix-modifications/value-replaced–w-spaces-net-only-input.xlsx');
      noErrors('test-files/matrix-modifications/value-replaced–w-spaces-net-only-output.xlsx');
    })
  })

  describe('empty-row-or-column', function () {
    it('should not return any errors', function () {
      noErrors('test-files/matrix-modifications/empty-column-input.xlsx');
      noErrors('test-files/matrix-modifications/empty-column-output.xlsx');
      noErrors('test-files/matrix-modifications/empty-row-input.xlsx');
      noErrors('test-files/matrix-modifications/empty-row-output.xlsx');
    })
  })

})

// Sheet Modificatios

describe('sheet-modifications', function () {
  describe('extra-sheet', function () {
    it('should not return any errors', function () {
      noErrors('test-files/sheet-modifications/extra-sheet-input.xlsx');
      noErrors('test-files/sheet-modifications/extra-sheet-output.xlsx');
    })
  })

  describe('missing-sheet', function () {
    it('should return missing network error code on input sheet', function () {
      missingNetworkError('test-files/sheet-modifications/missing-sheet-input.xlsx', 1);
      noErrors('test-files/sheet-modifications/missing-sheet-output.xlsx');
    })
  })

  describe('sheet-names-switched', function () {
    it('should not return any errors', function () {
      noErrors('test-files/sheet-modifications/sheet-names-switched-output.xlsx');
    })
  })

  describe('wrong-sheet-name', function () {
    it('should return missing network error code on output sheet', function () {
      noErrors('test-files/sheet-modifications/wrong-sheet-name-input.xlsx');
      missingNetworkError('test-files/sheet-modifications/wrong-sheet-name-output.xlsx', 1);
    })
  })
})

