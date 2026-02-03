var assert = require("chai").assert;
var xlsx = require("node-xlsx");
// var cytoscape = require("cytoscape");
var spreadsheetController = require(
    __dirname + "/../server/controllers" + "/spreadsheet-controller"
)();

var parseAllNetworkSheet = require(__dirname + "/../server/controllers" + "/network-sheet-parser");

var parseExpressionSheet = require(
    __dirname + "/../server/controllers" + "/expression-sheet-parser"
);

var parseAdditionalSheet = require(
    __dirname + "/../server/controllers" + "/additional-sheet-parser"
);

var exportController = require(__dirname + "/../server/controllers/export-controller")();

// changed network parser to preserve all network sheets instead of choosing the best and throwing awway rhe rest
// this helper method chooses the best network sheet, so prior implemented test behaviour doesn't crash
var parseNetworkSheet = sheet => {
    var allNetworks = parseAllNetworkSheet.networks(sheet);
    if (
        typeof allNetworks.networkOptimizedWeights === "object" &&
        Object.keys(allNetworks.networkOptimizedWeights).length !== 0
    ) {
        return allNetworks.networkOptimizedWeights;
    } else {
        // Network is the default network. If network_optimized_weights does not exist, then we will want to return the
        // network sheet. If both network_optimized_weights and network do not exist, it returns an empty initalized
        // network object with an error saying no network sheet detected.
        return allNetworks.network;
    }
};

// ERROR TEST FUNCTIONS:

var noErrors = function (input) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    assert.equal(0, workbook.errors.length);
};

var duplicateGeneError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("DUPLICATE_GENE", workbook.errors[i].errorCode);
    }

    /* TO DO:
  workbook.errors.forEach(function (error) {
    assert.equal("DUPLICATE_GENE", error.errorCode);
  });
  */
};

var invalidGeneLengthError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("INVALID_GENE_LENGTH", workbook.errors[i].errorCode);
    }
};

var corruptGeneError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("CORRUPT_GENE", workbook.errors[i].errorCode);
    }
};

var unknownError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("UNKNOWN_ERROR", workbook.errors[i].errorCode);
    }
};

var missingValueError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("MISSING_VALUE", workbook.errors[i].errorCode);
    }
};

var missingNetworkError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("MISSING_NETWORK", workbook.errors[i].errorCode);
    }
};

var specialCharacterError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("INVALID_CHARACTER", workbook.errors[i].errorCode);
    }
};

var invalidDataTypeError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("INVALID_CELL_DATA_TYPE", workbook.errors[i].errorCode);
    }
};

var workbookSizeError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("INVALID_NETWORK_SIZE", workbook.errors[i].errorCode);
    }
};

var checkForGene = function (test, frequency, input) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(
        frequency,
        workbook.genes.filter(function (gene) {
            return gene.name === test;
        }).length
    );
};

var warningsCountError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var warningsCountErrorArray = workbook.errors.filter(function (x) {
        return x.errorCode === "WARNINGS_OVERLOAD";
    });

    assert.equal(frequency, warningsCountErrorArray.length);
};

var errorsCountError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var errorsCountErrorArray = workbook.errors.filter(function (x) {
        return x.errorCode === "ERRORS_OVERLOAD";
    });

    assert.equal(frequency, errorsCountErrorArray.length);
};

var emptyRowError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(frequency, workbook.errors.length);

    for (var i = 0; i < frequency; i++) {
        assert.equal("EMPTY_ROW", workbook.errors[i].errorCode);
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
        assert.equal("EMPTY_ROW", exp["expression"]["wt_log2_expression"]["errors"][i].errorCode);
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
    var workbook = parseNetworkSheet(sheet);
    var emptyRowDataCount = workbook.errors.filter(function (x) {
        return x.errorCode === "EMPTY_ROW_DATA";
    });

    assert.equal(frequency, emptyRowDataCount.length);
};

var emptyMatrixDataError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var emptyMatrixDataCount = workbook.errors.filter(function (x) {
        return x.errorCode === "EMPTY_MATRIX_DATA";
    });

    assert.equal(frequency, emptyMatrixDataCount.length);
};

var emptyColumnDataError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var emptyRowDataCount = workbook.errors.filter(function (x) {
        return x.errorCode === "EMPTY_COLUMN_DATA";
    });

    assert.equal(frequency, emptyRowDataCount.length);
};

var emptyColumnError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var emptyRowDataCount = workbook.errors.filter(function (x) {
        return x.errorCode === "EMPTY_COLUMN";
    });

    assert.equal(frequency, emptyRowDataCount.length);
};

// WARNING TEST FUNCTIONS:

var noWarnings = function (input) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);

    assert.equal(0, workbook.warnings.length);
};

var missingSourceWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var missingSourceCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "MISSING_SOURCE";
    });

    assert.equal(frequency, missingSourceCount.length);
};

var invalidMatrixDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var invalidDataCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "INVALID_DATA";
    });

    assert.equal(frequency, invalidDataCount.length);
};

var missingTargetWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var missingTargetCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "MISSING_TARGET";
    });

    assert.equal(frequency, missingTargetCount.length);
};

var randomDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var randomDataCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "RANDOM_DATA";
    });

    assert.equal(frequency, randomDataCount.length);
};

var emptyRowWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var emptyRowCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "EMPTY_ROW";
    });

    assert.equal(frequency, emptyRowCount.length);
};

var invalidNetworkSizeWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
    var invalidworkbookSizeCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "INVALID_NETWORK_SIZE";
    });

    assert.equal(frequency, invalidworkbookSizeCount.length);
};

var extraneousDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var exp = parseExpressionSheet(sheet);
    var extraneousDataCount = exp["expression"]["wt_log2_expression"]["warnings"].filter(
        function (x) {
            return x.warningCode === "EXTRANEOUS_DATA";
        }
    );

    assert.equal(frequency, extraneousDataCount.length);
};

var missingExpressionWarning = function (input, frequency) {
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
    var workbook = parseNetworkSheet(sheet);
    var incorrectlyNamedSheetCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "INCORRECTLY_NAMED_SHEET";
    });

    assert.equal(frequency, incorrectlyNamedSheetCount.length);
};

var unrecognizedSheetWarning = function (input, frequency) {
    const sheet = xlsx.parse(input);
    const workbook = parseAdditionalSheet(sheet);
    const unrecognizedSheetWarningCount = workbook.warnings.filter(function (x) {
        return x.warningCode === "UNRECOGNIZED_SHEET";
    });

    assert.equal(frequency, unrecognizedSheetWarningCount.length);
};

var missingGenesInTwoColumnSheetsWarning = function (input, frequency, sheetName) {
    const sheet = xlsx.parse(input);
    const networks = parseNetworkSheet(sheet);
    const genes = networks.genes.map(gene => gene.name);
    const workbook = parseAdditionalSheet(sheet, genes);
    const warnings = workbook.twoColumnSheets[sheetName].warnings || [];
    const missingGenesInTwoColumnSheetsWarningCount = warnings.filter(function (x) {
        return x.warningCode === `MISSING_GENES_IN_TWO_COLUMN_SHEET_${sheetName.toUpperCase()}`;
    });

    assert.equal(frequency, missingGenesInTwoColumnSheetsWarningCount.length);
};

// GRAPH STATISTICS
/*
var shortestPath = function (input, directed, source, target, length) {
    var sheet = xlsx.parse(input);
    var workbook = parseNetworkSheet(sheet);
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
    var workbook = parseNetworkSheet(sheet);
    var cytoscapeElements = spreadsheetController.grnSightToCytoscape(workbook);

    var cy = cytoscape({
        headless: true,
        elements: cytoscapeElements
    });

    var bc = cy.$().bc();
    assert.equal(bc.betweenness("#" + node, null, directed), centrality);
};
*/

// Additional Sheets Error Tests
var twoColumnIdError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var twoColumnIdErrorCount = 0;
    for (let page in workbook.twoColumnSheets) {
        twoColumnIdErrorCount += workbook.twoColumnSheets[page].errors.filter(function (x) {
            return x.errorCode === "MISLABELED_ID_CELL";
        }).length;
    }
    assert.equal(frequency, twoColumnIdErrorCount);
};

var additionalSheetIncorrectColumnHeaderError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var additionalSheetIncorrectColumnHeaderErrorCount = 0;
    for (let page in workbook.twoColumnSheets) {
        additionalSheetIncorrectColumnHeaderErrorCount += workbook.twoColumnSheets[
            page
        ].errors.filter(x => x.errorCode === "INCORRECT_COLUMN_HEADER").length;
    }
    additionalSheetIncorrectColumnHeaderErrorCount += workbook.meta.errors.filter(
        x => x.errorCode === "INCORRECT_COLUMN_HEADER"
    ).length;
    if (workbook.meta2.errors !== undefined) {
        additionalSheetIncorrectColumnHeaderErrorCount += workbook.meta2.errors.filter(
            x => x.errorCode === "INCORRECT_COLUMN_HEADER"
        ).length;
    }
    assert.equal(frequency, additionalSheetIncorrectColumnHeaderErrorCount);
};

var additionalSheetMissingColumnHeaderError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var additionalSheetMissingColumnHeaderErrorCount = 0;
    for (let page in workbook.twoColumnSheets) {
        additionalSheetMissingColumnHeaderErrorCount += workbook.twoColumnSheets[
            page
        ].errors.filter(x => x.errorCode === "MISSING_COLUMN_HEADER").length;
    }
    additionalSheetMissingColumnHeaderErrorCount += workbook.meta.errors.filter(
        x => x.errorCode === "MISSING_COLUMN_HEADER"
    ).length;
    if (workbook.meta2.warnings !== undefined) {
        additionalSheetMissingColumnHeaderErrorCount += workbook.meta2.errors.filter(
            x => x.errorCode === "MISSING_COLUMN_HEADER"
        ).length;
    }
    assert.equal(frequency, additionalSheetMissingColumnHeaderErrorCount);
};

var twoColumnInvalidGeneTypeError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var twoColumnInvalidGeneTypeErrorCount = 0;
    for (let page in workbook.twoColumnSheets) {
        twoColumnInvalidGeneTypeErrorCount += workbook.twoColumnSheets[page].errors.filter(
            function (x) {
                return x.errorCode === "INVALID_GENE_TYPE";
            }
        ).length;
    }
    assert.equal(frequency, twoColumnInvalidGeneTypeErrorCount);
};

var twoColumnInvalidValueError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var twoColumnInvalidValueErrorCount = 0;
    for (let page in workbook.twoColumnSheets) {
        twoColumnInvalidValueErrorCount += workbook.twoColumnSheets[page].errors.filter(
            function (x) {
                return x.errorCode === "INVALID_VALUE";
            }
        ).length;
    }
    assert.equal(frequency, twoColumnInvalidValueErrorCount);
};

var twoColumnInvalidGeneLengthError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var twoColumnInvalidGeneLengthErrorCount = 0;
    for (let page in workbook.twoColumnSheets) {
        twoColumnInvalidGeneLengthErrorCount += workbook.twoColumnSheets[page].errors.filter(
            function (x) {
                return x.errorCode === "INVALID_GENE_LENGTH";
            }
        ).length;
    }
    assert.equal(frequency, twoColumnInvalidGeneLengthErrorCount);
};

var twoColumnSpecialCharacterError = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var twoColumnSpecialCharacterErrorCount = 0;
    for (let page in workbook.twoColumnSheets) {
        twoColumnSpecialCharacterErrorCount += workbook.twoColumnSheets[page].errors.filter(
            function (x) {
                return x.errorCode === "INVALID_CHARACTER";
            }
        ).length;
    }
    assert.equal(frequency, twoColumnSpecialCharacterErrorCount);
};

// Additional Sheets Warning Tests

var additionalSheetExtraneousDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var additionalSheetExtraneousDataWarningCount = 0;
    for (let page in workbook.twoColumnSheets) {
        additionalSheetExtraneousDataWarningCount += workbook.twoColumnSheets[page].warnings.filter(
            function (x) {
                return x.warningCode === "EXTRANEOUS_DATA";
            }
        ).length;
    }
    assert.equal(frequency, additionalSheetExtraneousDataWarningCount);
};

var unknownOptimizationParameterWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var unknownOptimizationParameterWarningCount = 0;
    unknownOptimizationParameterWarningCount += workbook.meta.warnings.filter(
        x => x.warningCode === "UNKNOWN_OPTIMIZATION_PARAMETER"
    ).length;
    assert.equal(frequency, unknownOptimizationParameterWarningCount);
};

var invalidOptimizationParameterWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var invalidOptimizationParameterWarningCount = 0;
    invalidOptimizationParameterWarningCount += workbook.meta.warnings.filter(
        x => x.warningCode === "INVALID_OPTIMIZATION_PARAMETER"
    ).length;
    assert.equal(frequency, invalidOptimizationParameterWarningCount);
};

var unknownOptimizationDiagnosticsParameterWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var unknownOptimizationDiagnosticsParameterWarningCount = 0;
    unknownOptimizationDiagnosticsParameterWarningCount += workbook.meta2.warnings.filter(
        x => x.warningCode === "UNKNOWN_OPTIMIZATION_DIAGNOSTICS_PARAMETER"
    ).length;
    assert.equal(frequency, unknownOptimizationDiagnosticsParameterWarningCount);
};

var invalidOptimizationDiagnosticsValueWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var invalidOptimizationDiagnosticsValueWarningCount = 0;
    invalidOptimizationDiagnosticsValueWarningCount += workbook.meta2.warnings.filter(
        x => x.warningCode === "INVALID_OPTIMIZATION_DIAGNOSTICS_VALUE"
    ).length;
    assert.equal(frequency, invalidOptimizationDiagnosticsValueWarningCount);
};

var optimizationDiagnosticsExtraneousDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var optimizationDiagnosticsExtraneousDataWarningCount = 0;
    optimizationDiagnosticsExtraneousDataWarningCount += workbook.meta2.warnings.filter(
        x => x.warningCode === "EXTRANEOUS_DATA"
    ).length;
    assert.equal(frequency, optimizationDiagnosticsExtraneousDataWarningCount);
};

var incorrectMSEGeneHeaderWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var incorrectMSEGeneHeaderWarningCount = 0;
    incorrectMSEGeneHeaderWarningCount += workbook.meta2.warnings.filter(
        x => x.warningCode === "INCORRECT_MSE_GENE_HEADER"
    ).length;
    assert.equal(frequency, incorrectMSEGeneHeaderWarningCount);
};

var incorrectMSEHeaderWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var incorrectMSEHeaderWarningCount = 0;
    incorrectMSEHeaderWarningCount += workbook.meta2.warnings.filter(
        x => x.warningCode === "INCORRECT_MSE_HEADER"
    ).length;
    assert.equal(frequency, incorrectMSEHeaderWarningCount);
};

var missingMSEDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var missingMSEDataWarningCount = 0;
    missingMSEDataWarningCount += workbook.meta2.warnings.filter(
        x => x.warningCode === "MISSING_MSE_DATA"
    ).length;
    assert.equal(frequency, missingMSEDataWarningCount);
};

var invalidMSEDataWarning = function (input, frequency) {
    var sheet = xlsx.parse(input);
    var workbook = parseAdditionalSheet(sheet);
    var invalidMSEDataWarningCount = 0;
    invalidMSEDataWarningCount += workbook.meta2.warnings.filter(
        x => x.warningCode === "INVALID_MSE_DATA"
    ).length;
    assert.equal(frequency, invalidMSEDataWarningCount);
};

// Export Tests

var importExportReImportNoErrorsOrWarnings = function (input) {
    var sheet = xlsx.parse(input);
    var inputWorkbook = spreadsheetController.crossSheetInteractions(sheet);
    inputWorkbook.exportSheets = {
        optimization_parameters: inputWorkbook.meta,
        expression: inputWorkbook.expression,
        networks: {},
    };
    if (inputWorkbook.network) {
        inputWorkbook.exportSheets.networks["network"] = inputWorkbook.network;
    }
    if (inputWorkbook.networkOptimizedWeights) {
        inputWorkbook.exportSheets.networks["network_optimized_weights"] =
            inputWorkbook.networkOptimizedWeights;
    }
    if (inputWorkbook.networkWeights) {
        inputWorkbook.exportSheets.networks["network_weights"] = inputWorkbook.networkWeights;
    }
    if (inputWorkbook.twoColumnSheets) {
        inputWorkbook.exportSheets["two_column_sheets"] = inputWorkbook.twoColumnSheets;
    }
    if (inputWorkbook.meta2) {
        inputWorkbook.exportSheets["optimization_diagnostics"] = inputWorkbook.meta2;
    }
    var exportedWorkbook = exportController.grnsightToXlsx(inputWorkbook);
    var sheet2 = xlsx.parse(exportedWorkbook);
    var reImportedWorkbook = spreadsheetController.crossSheetInteractions(sheet2);
    assert.equal(0, reImportedWorkbook.errors.length + reImportedWorkbook.warnings.length);
};

var importFileSameAsExportFile = function (input) {
    var sheet = xlsx.parse(input);
    var inputWorkbook = spreadsheetController.crossSheetInteractions(sheet);
    inputWorkbook.exportSheets = {
        optimization_parameters: inputWorkbook.meta,
        expression: inputWorkbook.expression,
        networks: {},
    };
    if (inputWorkbook.network) {
        inputWorkbook.exportSheets.networks["network"] = inputWorkbook.network;
    }
    if (inputWorkbook.networkOptimizedWeights) {
        inputWorkbook.exportSheets.networks["network_optimized_weights"] =
            inputWorkbook.networkOptimizedWeights;
    }
    if (inputWorkbook.networkWeights) {
        inputWorkbook.exportSheets.networks["network_weights"] = inputWorkbook.networkWeights;
    }
    if (inputWorkbook.twoColumnSheets) {
        inputWorkbook.exportSheets["two_column_sheets"] = inputWorkbook.twoColumnSheets;
    }
    if (inputWorkbook.meta2) {
        inputWorkbook.exportSheets["optimization_diagnostics"] = inputWorkbook.meta2;
    }
    var exportedWorkbook = exportController.grnsightToXlsx(inputWorkbook);
    var sheet2 = xlsx.parse(exportedWorkbook);
    sheet.sort((a, b) => (a.name > b.name ? 1 : -1));
    sheet2.sort((a, b) => (a.name > b.name ? 1 : -1));
    assert.deepEqual(sheet, sheet2);
};

exports.noErrors = noErrors;
exports.duplicateGeneError = duplicateGeneError;
exports.invalidGeneLengthError = invalidGeneLengthError;
exports.corruptGeneError = corruptGeneError;
exports.unknownError = unknownError;
exports.missingValueError = missingValueError;
exports.missingNetworkError = missingNetworkError;
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
exports.twoColumnIdError = twoColumnIdError;
exports.additionalSheetIncorrectColumnHeaderError = additionalSheetIncorrectColumnHeaderError;
exports.additionalSheetMissingColumnHeaderError = additionalSheetMissingColumnHeaderError;
exports.twoColumnInvalidGeneTypeError = twoColumnInvalidGeneTypeError;
exports.twoColumnInvalidValueError = twoColumnInvalidValueError;
exports.twoColumnInvalidGeneLengthError = twoColumnInvalidGeneLengthError;
exports.twoColumnSpecialCharacterError = twoColumnSpecialCharacterError;

exports.checkForGene = checkForGene;
exports.noWarnings = noWarnings;
exports.missingSourceWarning = missingSourceWarning;
exports.missingTargetWarning = missingTargetWarning;
exports.randomDataWarning = randomDataWarning;
exports.emptyRowWarning = emptyRowWarning;
exports.invalidNetworkSizeWarning = invalidNetworkSizeWarning;
exports.extraneousDataWarning = extraneousDataWarning;
exports.invalidMatrixDataWarning = invalidMatrixDataWarning;
exports.incorrectlyNamedExpressionSheetWarning = incorrectlyNamedExpressionSheetWarning;
exports.missingExpressionWarning = missingExpressionWarning;
exports.incorrectlyNamedSheetWarning = incorrectlyNamedSheetWarning;
exports.additionalSheetExtraneousDataWarning = additionalSheetExtraneousDataWarning;
exports.unknownOptimizationParameterWarning = unknownOptimizationParameterWarning;
exports.invalidOptimizationParameterWarning = invalidOptimizationParameterWarning;
exports.unknownOptimizationDiagnosticsParameterWarning =
    unknownOptimizationDiagnosticsParameterWarning;
exports.invalidOptimizationDiagnosticsValueWarning = invalidOptimizationDiagnosticsValueWarning;
exports.optimizationDiagnosticsExtraneousDataWarning = optimizationDiagnosticsExtraneousDataWarning;
exports.incorrectMSEGeneHeaderWarning = incorrectMSEGeneHeaderWarning;
exports.incorrectMSEHeaderWarning = incorrectMSEHeaderWarning;
exports.missingMSEDataWarning = missingMSEDataWarning;
exports.invalidMSEDataWarning = invalidMSEDataWarning;
exports.unrecognizedSheetWarning = unrecognizedSheetWarning;
exports.missingGenesInTwoColumnSheetsWarning = missingGenesInTwoColumnSheetsWarning;

exports.importExportReImportNoErrorsOrWarnings = importExportReImportNoErrorsOrWarnings;
exports.importFileSameAsExportFile = importFileSameAsExportFile;
