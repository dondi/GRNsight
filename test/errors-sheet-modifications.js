/* eslint-disable max-len */
// var assert = require("chai").assert;
// var xlsx = require("node-xlsx");
var test = require("./test");
// var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();


describe("errors-sheet-modifications", function () {
    describe("extra-sheet", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/extra-sheet-input.xlsx");
            test.noErrors("test-files/sheet-modifications/extra-sheet-output.xlsx");
        });
    });

    describe("missing-sheet", function () {
        it("should return missing network error code on input sheet", function () {
            test.missingNetworkError("test-files/sheet-modifications/missing-sheet-input.xlsx", 1);
            test.noErrors("test-files/sheet-modifications/missing-sheet-output.xlsx");
        });
    });

    describe("sheet-names-switched", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/sheet-names-switched-input.xlsx");
            test.noErrors("test-files/sheet-modifications/sheet-names-switched-output.xlsx");
        });
    });

    describe("wrong-sheet-name", function () {
        it("should return missing network error code on output sheet", function () {
            test.noErrors("test-files/sheet-modifications/wrong-sheet-name-input.xlsx");
            test.missingNetworkError("test-files/sheet-modifications/wrong-sheet-name-output.xlsx", 1);
        });
    });

    // Sheet Modifications - Cell A1 Modifications

    describe("and-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/and-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/and-a1-output.xlsx");
        });
    });

    describe("apostrophe-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/apostrophe-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/apostrophe-a1-output.xlsx");
        });
    });

    describe("asterisk-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/asterisk-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/asterisk-a1-output.xlsx");
        });
    });

    describe("at-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/at-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/at-a1-output.xlsx");
        });
    });

    describe("backslash-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/backslash-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/backslash-a1-output.xlsx");
        });
    });

    describe("bar-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/bar-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/bar-a1-output.xlsx");
        });
    });

    describe("caret-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/caret-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/caret-a1-output.xlsx");
        });
    });

    describe("close-curly-bracket-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/close-curly-bracket-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/close-curly-bracket-a1-output.xlsx");
        });
    });

    describe("close-parantheses-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/close-parantheses-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/close-parantheses-a1-output.xlsx");
        });
    });

    describe("close-square-bracket-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/close-square-bracket-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/close-square-bracket-a1-output.xlsx");
        });
    });

    describe("colon-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/colon-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/colon-a1-output.xlsx");
        });
    });

    describe("comma-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/comma-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/comma-a1-output.xlsx");
        });
    });

    describe("dash-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/dash-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/dash-a1-output.xlsx");
        });
    });

    describe("dollar-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/dollar-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/dollar-a1-output.xlsx");
        });
    });

    describe("duplicate-gene", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/duplicate-gene-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/duplicate-gene-a1-output.xlsx");
        });
    });

    describe("equals-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/equals-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/equals-a1-output.xlsx");
        });
    });

    describe("exclamation-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/exclamation-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/exclamation-a1-output.xlsx");
        });
    });

    describe("forward-slash-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/forward-slash-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/forward-slash-a1-output.xlsx");
        });
    });

    describe("grave-accent-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/grave-accent-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/grave-accent-a1-output.xlsx");
        });
    });

    describe("greater-than-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/greater-than-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/greater-than-a1-output.xlsx");
        });
    });

    describe("less-than-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/less-than-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/less-than-a1-output.xlsx");
        });
    });

    describe("null", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/null-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/null-a1-output.xlsx");
        });
    });

    describe("open-curly-bracket-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/open-curly-bracket-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/open-curly-bracket-a1-output.xlsx");
        });
    });

    describe("open-parantheses-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/open-parantheses-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/open-parantheses-a1-output.xlsx");
        });
    });

    describe("open-square-bracket-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/open-square-bracket-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/open-square-bracket-a1-output.xlsx");
        });
    });

    describe("percent-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/percent-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/percent-a1-output.xlsx");
        });
    });

    describe("period-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/period-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/period-a1-output.xlsx");
        });
    });

    describe("plus-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/plus-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/plus-a1-output.xlsx");
        });
    });

    describe("pound-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/pound-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/pound-a1-output.xlsx");
        });
    });

    describe("question-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/question-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/question-a1-output.xlsx");
        });
    });

    describe("quotation-mark-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/quotation-mark-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/quotation-mark-a1-output.xlsx");
        });
    });

    describe("semicolon-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/semicolon-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/semicolon-a1-output.xlsx");
        });
    });

    describe("tilde-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/tilde-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/tilde-a1-output.xlsx");
        });
    });

    describe("underscore-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/underscore-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/underscore-a1-output.xlsx");
        });
    });

    describe("unique-gene-symbol", function () {
        it("should not return any errors", function () {
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/unique-gene-a1-input.xlsx");
            test.noErrors("test-files/sheet-modifications/cell-A1-modifications/unique-gene-a1-output.xlsx");
        });
    });
});
