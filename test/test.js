var assert = require("chai").assert;
var xlsx = require("node-xlsx");
// var cytoscape = require("cytoscape");
var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();

var parseworkbookSheet = require(__dirname + "/../server/controllers" + "/workbook-sheet-parser");

var parseExpressionSheet = require(__dirname + "/../server/controllers" + "/expression-sheet-parser");

// ERROR TEST FUNCTIONS:

var noErrors = function (input) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    assert.equal(0, workbook.errors.length);
};

var duplicateGeneError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "DUPLICATE_GENE",
            workbook.errors[i].errorCode
        );
    }

  /* TO DO:
  workbook.errors.forEach(function (error) {
    assert.equal("DUPLICATE_GENE", error.errorCode);
  });
  */
};

var invalidGeneLengthError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "INVALID_GENE_LENGTH",
            workbook.errors[i].errorCode
        );
    }
};

var corruptGeneError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "CORRUPT_GENE",
            workbook.errors[i].errorCode
        );
    }
};

var unknownError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "UNKNOWN_ERROR",
            workbook.errors[i].errorCode
        );
    }
};

var missingValueError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "MISSING_VALUE",
            workbook.errors[i].errorCode
        );
    }
};

var missingworkbookError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "MISSING_workbook",
            workbook.errors[i].errorCode
        );
    }
};

var specialCharacterError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "INVALID_CHARACTER",
            workbook.errors[i].errorCode
        );
    }
};

var invalidDataTypeError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "INVALID_CELL_DATA_TYPE",
            workbook.errors[i].errorCode
        );
    }
};

var workbookSizeError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "INVALID_workbook_SIZE",
            workbook.errors[i].errorCode
        );
    }
};

var checkForGene = function (test, frequency, input) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.genes.filter(function (gene) {
        return gene.name === test;
    }).length);
};

var warningsCountError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var warningsCountErrorArray = workbook.errors.filter(function (x) {
        return x.errorCode === "WARNINGS_OVERLOAD";
    });

    assert.equal(frequency, warningsCountErrorArray.length);
};

var errorsCountError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var errorsCountErrorArray = workbook.errors.filter(function (x) {
        return x.errorCode === "ERRORS_OVERLOAD";
    });

    assert.equal(frequency, errorsCountErrorArray.length);
};

var emptyRowError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "EMPTY_ROW",
            workbook.errors[i].errorCode
        );
    }
};

var geneMismatchError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = spreadsheetController.crossSheetInteractions(sheet);
    var geneMismatchCount = workbook.errors.filter(function (x) {
        return x.errorCode === "GENE_MISMATCH";
    });

    assert.equal(frequency, geneMismatchCount.length);
};

var idLabelError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseExpressionSheet(sheet);
    assert.equal(frequency, workbook.expression.wt_log2_expression.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "MISLABELED_ID_CELL",
            workbook.expression.wt_log2_expression.errors[i].errorCode
        );
    }
};

var missingColumnHeaderError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var exp = parseExpressionSheet(sheet);
    assert.equal(frequency, exp["expression"]["wt_log2_expression"]["errors"].length);
    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "MISSING_COLUMN_HEADER",
            exp["expression"]["wt_log2_expression"]["errors"][i].errorCode
        );
    }
};

var emptyExpressionColumnError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var exp = parseExpressionSheet(sheet);
    assert.equal(frequency, exp["expression"]["wt_log2_expression"]["errors"].length);
    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "EMPTY_COLUMN",
            exp["expression"]["wt_log2_expression"]["errors"][i].errorCode
        );
    }
};

var emptyExpressionRowError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var exp = parseExpressionSheet(sheet);
    assert.equal(frequency, exp["expression"]["wt_log2_expression"]["errors"].length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "EMPTY_ROW",
            exp["expression"]["wt_log2_expression"]["errors"][i].errorCode
        );
    }
};

// should extra_gene_name and missing_gene_name be split into two different functions?
var labelError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var exp = parseExpressionSheet(sheet);
    assert.equal(frequency, exp["expression"]["wt_log2_expression"]["errors"].length);
    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "extra_gene_name" || "missing_a_gene_name",
            exp["expression"]["wt_log2_expression"]["errors"][i].errorCode
        );
    }
};

var missingGeneNameError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = spreadsheetController.crossSheetInteractions(sheet);
    var missingGeneCount = workbook.errors.filter(function (x) {
        return x.errorCode === "MISSING_GENE_NAME";
    });

    assert.equal(frequency, missingGeneCount.length);
};

var extraGeneNameError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = spreadsheetController.crossSheetInteractions(sheet);
    var extraGeneCount = workbook.errors.filter(function (x) {
        return x.errorCode === "EXTRA_GENE_NAME";
    });

    assert.equal(frequency, extraGeneCount.length);
};

var negativeTimePointError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var exp = parseExpressionSheet(sheet);
    assert.equal(frequency, exp["expression"]["wt_log2_expression"]["errors"].length);
    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "NEGATIVE_TIME_POINT",
            exp["expression"]["wt_log2_expression"]["errors"][i].errorCode
        );
    }
};

var nonMonotonicTimePointsError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var exp = parseExpressionSheet(sheet);
    assert.equal(frequency, exp["expression"]["wt_log2_expression"]["errors"].length);
    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "NON_MONOTONIC_TIME_POINTS",
            exp["expression"]["wt_log2_expression"]["errors"][i].errorCode
        );
    }
};

var nonNumericalTimePointError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var exp = parseExpressionSheet(sheet);
    assert.equal(frequency, exp["expression"]["wt_log2_expression"]["errors"].length);
    for (var i = 0; i < frequency; i++) {
        assert.equal(
            "NON_NUMERICAL_TIME_POINT",
            exp["expression"]["wt_log2_expression"]["errors"][i].errorCode
        );
    }
};

var emptyRowDataError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var emptyRowDataCount = workbook.errors.filter(function (x) {
        return x.errorCode === "EMPTY_ROW_DATA";
    });

    assert.equal(frequency, emptyRowDataCount.length);
};

var emptyMatrixDataError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var emptyMatrixDataCount = workbook.errors.filter(function (x) {
        return x.errorCode === "EMPTY_MATRIX_DATA";
    });

    assert.equal(frequency, emptyMatrixDataCount.length);
};

var emptyColumnDataError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var emptyRowDataCount = workbook.errors.filter(function (x) {
        return x.errorCode === "EMPTY_COLUMN_DATA";
    });

    assert.equal(frequency, emptyRowDataCount.length);
};

var emptyColumnError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var emptyRowDataCount = workbook.errors.filter(function (x) {
        return x.errorCode === "EMPTY_COLUMN";
    });

    assert.equal(frequency, emptyRowDataCount.length);
};



// WARNING TEST FUNCTIONS:

var noWarnings = function (input) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);

    assert.equal(0, workbook.warnings.length);
};

var missingSourceWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var missingSourceCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "MISSING_SOURCE";
    });

    assert.equal(frequency, missingSourceCount.length);
};

var invalidMatrixDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var invalidDataCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "INVALID_DATA";
    });

    assert.equal(frequency, invalidDataCount.length);
};

var missingTargetWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var missingTargetCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "MISSING_TARGET";
    });

    assert.equal(frequency, missingTargetCount.length);
};

var randomDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var randomDataCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "RANDOM_DATA";
    });

    assert.equal(frequency, randomDataCount.length);
};

var emptyRowWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var emptyRowCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "EMPTY_ROW";
    });

    assert.equal(frequency, emptyRowCount.length);
};

var invalidworkbookSizeWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var invalidworkbookSizeCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "INVALID_workbook_SIZE";
    });

    assert.equal(frequency, invalidworkbookSizeCount.length);
};

var extraneousDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var exp = parseExpressionSheet(sheet);
    var extraneousDataCount = exp["expression"]["wt_log2_expression"]["warnings"].filter(function (x) {
        return x.warningCode === "EXTRANEOUS_DATA";
    });

    assert.equal(frequency, extraneousDataCount.length);
};


var missingExpressionWarning = function (input, frequency)  {
    var sheet = xlsx.parse(input);
    var workbook = spreadsheetController.crossSheetInteractions(sheet);
    var missingExpressionCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "MISSING_EXPRESSION_SHEET";
    });

    assert.equal(frequency, missingExpressionCount.length);
};

var incorrectlyNamedExpressionSheetWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseExpressionSheet(sheet);
    var incorrectlyNamedSheetCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "INCORRECTLY_NAMED_EXPRESSION_SHEET";
    });

    assert.equal(frequency, incorrectlyNamedSheetCount.length);
};

var incorrectlyNamedSheetWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var incorrectlyNamedSheetCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "INCORRECTLY_NAMED_SHEET";
    });

    assert.equal(frequency, incorrectlyNamedSheetCount.length);
};

// GRAPH STATISTICS
/*
var shortestPath = function (input, directed, source, target, length) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var cytoscapeElements = spreadsheetController.grnSightToCytoscape(workbook);

    var cy = cytoscape({
        headless: true,
        elements: cytoscapeElements
    });

    var dijkstra = cy.elements().dijkstra("#" + source, null, directed);
    assert.equal(dijkstra.distanceTo("#" + target), length);
};

var betweennessCentrality = function (input, directed, node, centrality) {
    var sheet = xlsx.parse(input);
    var workbook = parseworkbookSheet(sheet);
    var cytoscapeElements = spreadsheetController.grnSightToCytoscape(workbook);

    var cy = cytoscape({
        headless: true,
        elements: cytoscapeElements
    });

    var bc = cy.$().bc();
    assert.equal(bc.betweenness("#" + node, null, directed), centrality);
};
*/

exports.noErrors = noErrors;
exports.duplicateGeneError = duplicateGeneError;
exports.invalidGeneLengthError = invalidGeneLengthError;
exports.corruptGeneError = corruptGeneError;
exports.unknownError = unknownError;
exports.missingValueError = missingValueError;
exports.missingworkbookError = missingworkbookError;
exports.workbookSizeError = workbookSizeError;
exports.warningsCountError = warningsCountError;
exports.invalidDataTypeError = invalidDataTypeError;
exports.emptyRowError = emptyRowError;
exports.idLabelError = idLabelError;
exports.errorsCountError = errorsCountError;
exports.specialCharacterError = specialCharacterError;
exports.emptyExpressionColumnError = emptyExpressionColumnError;
exports.emptyExpressionRowError = emptyExpressionRowError;
exports.missingColumnHeaderError = missingColumnHeaderError;
exports.geneMismatchError = geneMismatchError;
exports.labelError = labelError;
exports.missingGeneNameError = missingGeneNameError;
exports.extraGeneNameError = extraGeneNameError;
exports.negativeTimePointError = negativeTimePointError;
exports.nonMonotonicTimePointsError = nonMonotonicTimePointsError;
exports.nonNumericalTimePointError = nonNumericalTimePointError;
exports.emptyRowDataError = emptyRowDataError;
exports.emptyMatrixDataError = emptyMatrixDataError;
exports.emptyColumnDataError = emptyColumnDataError;
exports.emptyColumnError = emptyColumnError;

exports.checkForGene = checkForGene;
exports.noWarnings = noWarnings;
exports.missingSourceWarning = missingSourceWarning;
exports.missingTargetWarning = missingTargetWarning;
exports.randomDataWarning = randomDataWarning;
exports.emptyRowWarning = emptyRowWarning;
exports.invalidworkbookSizeWarning = invalidworkbookSizeWarning;
exports.extraneousDataWarning = extraneousDataWarning;
exports.invalidMatrixDataWarning = invalidMatrixDataWarning;
exports.incorrectlyNamedExpressionSheetWarning = incorrectlyNamedExpressionSheetWarning;
exports.missingExpressionWarning = missingExpressionWarning;
exports.incorrectlyNamedSheetWarning = incorrectlyNamedSheetWarning;
