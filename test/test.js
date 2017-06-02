var assert = require("chai").assert;
var xlsx = require("node-xlsx");
var cytoscape = require("cytoscape");

var spreadsheetController = require(__dirname + "/../server/controllers" + "/spreadsheet-controller")();

// ERROR TEST FUNCTIONS:

var noErrors = function (input) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(0, network.errors.length);
};

var duplicateGeneError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "DUPLICATE_GENE",
      network.errors[i].errorCode
    );
    }

  /* TO DO:
  network.errors.forEach(function (error) {
    assert.equal("DUPLICATE_GENE", error.errorCode);
  });
  */
};

var invalidGeneLengthError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "INVALID_GENE_LENGTH",
      network.errors[i].errorCode
    );
    }
};

var corruptGeneError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "CORRUPT_GENE",
      network.errors[i].errorCode
    );
    }
};

var unknownError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "UNKNOWN_ERROR",
      network.errors[i].errorCode
    );
    }
};

var missingValueError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "MISSING_VALUE",
      network.errors[i].errorCode
    );
    }
};

var missingNetworkError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "MISSING_NETWORK",
      network.errors[i].errorCode
    );
    }
};

var specialCharacterError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "INVALID_CHARACTER",
      network.errors[i].errorCode
    );
    }
};

var invalidDataTypeError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "INVALID_CELL_DATA_TYPE",
      network.errors[i].errorCode
    );
    }
};

var networkSizeError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "INVALID_NETWORK_SIZE",
      network.errors[i].errorCode
    );
    }
};

var checkForGene = function (test, frequency, input) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.genes.filter(function (gene) {
        return gene.name === test;
    }).length);
};

var warningsCountError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var warningsCountErrorArray = network.errors.filter(function (x) {
        return x.errorCode === "WARNINGS_OVERLOAD";
    });

    assert.equal(frequency, warningsCountErrorArray.length);
};

var errorsCountError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var errorsCountErrorArray = network.errors.filter(function (x) {
        return x.errorCode === "ERRORS_OVERLOAD";
    });

    assert.equal(frequency, errorsCountErrorArray.length);
};

var emptyRowError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(frequency, network.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal(
      "EMPTY_ROW",
      network.errors[i].errorCode
    );
    }
};

// WARNING TEST FUNCTIONS:

var noWarnings = function (input) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);

    assert.equal(0, network.warnings.length);
};

var missingSourceWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var missingSourceCount = network.warnings.filter(function (x) {
        return x.warningCode === "MISSING_SOURCE";
    });

    assert.equal(frequency, missingSourceCount.length);
};

var invalidMatrixDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var invalidDataCount = network.warnings.filter(function (x) {
        return x.warningCode === "INVALID_DATA";
    });

    assert.equal(frequency, invalidDataCount.length);
};

var missingTargetWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var missingTargetCount = network.warnings.filter(function (x) {
        return x.warningCode === "MISSING_TARGET";
    });

    assert.equal(frequency, missingTargetCount.length);
};

var randomDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var randomDataCount = network.warnings.filter(function (x) {
        return x.warningCode === "RANDOM_DATA";
    });

    assert.equal(frequency, randomDataCount.length);
};

var emptyRowWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var emptyRowCount = network.warnings.filter(function (x) {
        return x.warningCode === "EMPTY_ROW";
    });

    assert.equal(frequency, emptyRowCount.length);
};

var invalidNetworkSizeWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var invalidNetworkSizeCount = network.warnings.filter(function (x) {
        return x.warningCode === "INVALID_NETWORK_SIZE";
    });

    assert.equal(frequency, invalidNetworkSizeCount.length);
};

var extraneousDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var extraneousDataWarning = network.warnings.filter(function (x) {
        return x.warningCode === "EXTRANEOUS_DATA";
    });

    assert.equal(frequency, extraneousDataWarning.length);
};

var incorrectlyNamedSheetWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var incorrectlyNamedSheetWarning = network.warnings.filter(function (x) {
        return x.warningCode === "INCORRECTLY_NAMED_SHEET";
    });

    assert.equal(frequency, incorrectlyNamedSheetWarning.length);
};

// GRAPH STATISTICS

var shortestPath = function (input, directed, source, target, length) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var cytoscapeElements = spreadsheetController.grnSightToCytoscape(network);

    var cy = cytoscape({
        headless: true,
        elements: cytoscapeElements
    });

    var dijkstra = cy.elements().dijkstra("#" + source, null, directed);
    assert.equal(dijkstra.distanceTo("#" + target), length);
};

var betweennessCentrality = function (input, directed, node, centrality) {
    var sheet = xlsx.parse(input);
    var network = spreadsheetController.parseSheet(sheet);
    var cytoscapeElements = spreadsheetController.grnSightToCytoscape(network);

    var cy = cytoscape({
        headless: true,
        elements: cytoscapeElements
    });

    var bc = cy.$().bc();
    assert.equal(bc.betweenness("#" + node, null, directed), centrality);
};

exports.noErrors = noErrors;
exports.duplicateGeneError = duplicateGeneError;
exports.invalidGeneLengthError = invalidGeneLengthError;
exports.corruptGeneError = corruptGeneError;
exports.unknownError = unknownError;
exports.missingValueError = missingValueError;
exports.missingNetworkError = missingNetworkError;
exports.networkSizeError = networkSizeError;
exports.warningsCountError = warningsCountError;
exports.invalidDataTypeError = invalidDataTypeError;
exports.emptyRowError = emptyRowError;
exports.errorsCountError = errorsCountError;
exports.specialCharacterError = specialCharacterError;

exports.checkForGene = checkForGene;
exports.noWarnings = noWarnings;
exports.missingSourceWarning = missingSourceWarning;
exports.missingTargetWarning = missingTargetWarning;
exports.randomDataWarning = randomDataWarning;
exports.emptyRowWarning = emptyRowWarning;
exports.invalidNetworkSizeWarning = invalidNetworkSizeWarning;
exports.extraneousDataWarning = extraneousDataWarning;
exports.invalidMatrixDataWarning = invalidMatrixDataWarning;
exports.incorrectlyNamedSheetWarning = incorrectlyNamedSheetWarning;

exports.shortestPath = shortestPath;
exports.betweennessCentrality = betweennessCentrality;
