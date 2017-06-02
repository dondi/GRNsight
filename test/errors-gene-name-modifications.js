/* eslint-disable max-len */
// var assert = require("chai").assert;
// var xlsx = require("node-xlsx");
var test = require("./test");
// var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();

describe("errors-gene-name-modifications", function () {
    describe("duplicate-gene-side-and-top", function () {
        it("should return 2 duplicate gene errors", function () {
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-side-and-top-input.xlsx", 2);
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-side-and-top-output.xlsx", 2);
        });
    });

    describe("duplicate-gene-side-and-top-nonadjacent", function () {
        it("should return 2 duplicate gene errors", function () {
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-side-and-top-nonadjacent-input.xlsx", 2);
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-side-and-top-nonadjacent-output.xlsx", 2);
        });
    });

    describe("duplicate-gene-side", function () {
        it("should return 1 duplicate gene error", function () {
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-side-input.xlsx", 1);
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-side-output.xlsx", 1);
        });
    });

    describe("duplicate-gene-side-nonadjacent", function () {
        it("should return 1 duplicate gene error", function () {
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-side-nonadjacent-input.xlsx", 1);
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-side-nonadjacent-output.xlsx", 1);
        });
    });

    describe("duplicate-gene-top", function () {
        it("should return 1 duplicate gene error", function () {
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-top-input.xlsx", 1);
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-top-output.xlsx", 1);
        });
    });

    describe("duplicate-gene-top-nonadjacent", function () {
        it("should return 1 duplicate gene error", function () {
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-top-nonadjacent-input.xlsx", 1);
            test.duplicateGeneError("test-files/gene-name-modifications/duplicate-gene-top-nonadjacent-output.xlsx", 1);
        });
    });

    describe("long-gene-name", function () {
        it("should return 1 long gene name error", function () {
            test.invalidGeneLengthError("test-files/gene-name-modifications/long-gene-name-input.xlsx", 1);
            test.invalidGeneLengthError("test-files/gene-name-modifications/long-gene-name-output.xlsx", 1);
        });
    });

    describe("mismatched-case-related", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/gene-name-modifications/mismatched-case-related-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/mismatched-case-related-output.xlsx");
        });
    });

    describe("mismatched-case-related-input", function () {
        it("should return source gene capitalization", function () {
            test.checkForGene("ace2", 1, "test-files/gene-name-modifications/mismatched-case-related-input.xlsx");
            test.checkForGene("ACE2", 0, "test-files/gene-name-modifications/mismatched-case-related-input.xlsx");
        });
    });

    describe("mismatched-case-related-output", function () {
        it("should return source gene capitalization", function () {
            test.checkForGene("ace2", 1, "test-files/gene-name-modifications/mismatched-case-related-output.xlsx");
            test.checkForGene("ACE2", 0, "test-files/gene-name-modifications/mismatched-case-related-output.xlsx");
        });
    });

    describe("mismatched-case-unrelated", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/gene-name-modifications/mismatched-case-unrelated-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/mismatched-case-unrelated-output.xlsx");
        });
    });

    describe("mismatched-case-unrelated-input", function () {
        it("should return source gene capitalization", function () {
            test.checkForGene("abf1", 1, "test-files/gene-name-modifications/mismatched-case-unrelated-input.xlsx");
            test.checkForGene("ABF1", 0, "test-files/gene-name-modifications/mismatched-case-unrelated-input.xlsx");
        });
    });

    describe("mismatched-case-related-output", function () {
        it("should return source gene capitalization", function () {
            test.checkForGene("abf1", 1, "test-files/gene-name-modifications/mismatched-case-unrelated-output.xlsx");
            test.checkForGene("ABF1", 0, "test-files/gene-name-modifications/mismatched-case-unrelated-output.xlsx");
        });
    });

    describe("missing-gene-name-side", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/gene-name-modifications/missing-gene-name-side-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/missing-gene-name-side-output.xlsx");
        });
    });

    describe("missing-gene-name-top-and-side", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/gene-name-modifications/missing-gene-name-top-and-side-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/missing-gene-name-top-and-side-output.xlsx");
        });
    });

    describe("missing-gene-name-top", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/gene-name-modifications/missing-gene-name-top-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/missing-gene-name-top-output.xlsx");
        });
    });

    describe("NaN-as-gene-name", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/gene-name-modifications/NaN-as-gene-name-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/NaN-as-gene-name-output.xlsx");
        });
    });

    // Gene Name Modifications - Special Characters

    describe("ampersand", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/ampersand-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/ampersand-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/ampersand-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/ampersand-unrelated-output.xlsx", 1);
        });
    });

    describe("asterisk", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/asterisk-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/asterisk-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/asterisk-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/asterisk-unrelated-output.xlsx", 1);
        });
    });

    describe("at", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/at-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/at-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/at-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/at-unrelated-output.xlsx", 1);
        });
    });

    describe("backwards-slash", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/backwards-slash-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/backwards-slash-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/backwards-slash-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/backwards-slash-unrelated-output.xlsx", 1);
        });
    });

    describe("caret", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/caret-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/caret-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/caret-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/caret-unrelated-output.xlsx", 1);
        });
    });

    describe("close-parentheses", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-parentheses-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-parentheses-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-parentheses-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-parentheses-unrelated-output.xlsx", 1);
        });
    });

    describe("close-square-bracket", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-square-bracket-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-square-bracket-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-square-bracket-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-square-bracket-unrelated-output.xlsx", 1);
        });
    });

    describe("close-twirly-bracket", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-twirly-bracket-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-twirly-bracket-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-twirly-bracket-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/close-twirly-bracket-unrelated-output.xlsx", 1);
        });
    });

    describe("colon", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/colon-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/colon-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/colon-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/colon-unrelated-output.xlsx", 1);
        });
    });

    describe("comma", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/comma-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/comma-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/comma-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/comma-unrelated-output.xlsx", 1);
        });
    });

    describe("dash", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/gene-name-modifications/special-characters-tests/dash-related-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/special-characters-tests/dash-related-output.xlsx");
            test.noErrors("test-files/gene-name-modifications/special-characters-tests/dash-unrelated-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/special-characters-tests/dash-unrelated-output.xlsx");
        });
    });

    describe("dollar", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/dollar-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/dollar-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/dollar-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/dollar-unrelated-output.xlsx", 1);
        });
    });

    describe("double-quotes", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/double-quotes-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/double-quotes-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/double-quotes-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/double-quotes-unrelated-output.xlsx", 1);
        });
    });

    describe("equals", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/equals-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/equals-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/equals-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/equals-unrelated-output.xlsx", 1);
        });
    });

    describe("exclamation-point", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/exclamation-point-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/exclamation-point-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/exclamation-point-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/exclamation-point-unrelated-output.xlsx", 1);
        });
    });

    describe("forward-slash", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/forward-slash-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/forward-slash-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/forward-slash-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/forward-slash-unrelated-output.xlsx", 1);
        });
    });

    describe("greater-than", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/greater-than-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/greater-than-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/greater-than-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/greater-than-unrelated-output.xlsx", 1);
        });
    });

    describe("less-than", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/less-than-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/less-than-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/less-than-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/less-than-unrelated-output.xlsx", 1);
        });
    });

    describe("modulo", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/modulo-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/modulo-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/modulo-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/modulo-unrelated-output.xlsx", 1);
        });
    });

    describe("open-parentheses", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-parentheses-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-parentheses-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-parentheses-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-parentheses-unrelated-output.xlsx", 1);
        });
    });

    describe("open-square-bracket", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-square-bracket-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-square-bracket-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-square-bracket-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-square-bracket-unrelated-output.xlsx", 1);
        });
    });

    describe("open-twirly-bracket", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-twirly-bracket-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-twirly-bracket-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-twirly-bracket-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/open-twirly-bracket-unrelated-output.xlsx", 1);
        });
    });

    describe("period", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/period-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/period-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/period-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/period-unrelated-output.xlsx", 1);
        });
    });

    describe("plus-sign", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/plus-sign-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/plus-sign-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/plus-sign-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/plus-sign-unrelated-output.xlsx", 1);
        });
    });

    describe("pound-symbol", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/pound-symbol-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/pound-symbol-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/pound-symbol-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/pound-symbol-unrelated-output.xlsx", 1);
        });
    });

    describe("question-mark", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/question-mark-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/question-mark-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/question-mark-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/question-mark-unrelated-output.xlsx", 1);
        });
    });

    describe("semicolon", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/semicolon-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/semicolon-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/semicolon-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/semicolon-unrelated-output.xlsx", 1);
        });
    });

    describe("single-apostrophe", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-apostrophe-open-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-apostrophe-open-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-apostrophe-open-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-apostrophe-open-unrelated-output.xlsx", 1);
        });
    });

    describe("single-line", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-line-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-line-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-line-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-line-unrelated-output.xlsx", 1);
        });
    });

    describe("single-quote", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-quote-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-quote-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-quote-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/single-quote-unrelated-output.xlsx", 1);
        });
    });

    describe("space", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/space-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/space-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/space-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/space-unrelated-output.xlsx", 1);
        });
    });

    describe("tilde", function () {
        it("should return special character error", function () {
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/tilde-related-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/tilde-related-output.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/tilde-unrelated-input.xlsx", 1);
            test.specialCharacterError("test-files/gene-name-modifications/special-characters-tests/tilde-unrelated-output.xlsx", 1);
        });
    });

    describe("underscore", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/gene-name-modifications/special-characters-tests/underscore-related-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/special-characters-tests/underscore-related-output.xlsx");
            test.noErrors("test-files/gene-name-modifications/special-characters-tests/underscore-unrelated-input.xlsx");
            test.noErrors("test-files/gene-name-modifications/special-characters-tests/underscore-unrelated-output.xlsx");
        });
    });
});
