// var multiparty = require("multiparty");
// var xlsx = require("node-xlsx");
// var util = require("util");
// var path = require("path");
// var cytoscape = require("cytoscape");
//
// var helpers = require(__dirname + "/helpers");

var constants = require(__dirname + "/workbook-constants");

/*
var addMessageToArray = function (messageArray, message) {
    messageArray.push(message);
};
var addError = function (workbook, message) {
    var errorsCount = workbook.errors.length;
    var MAX_ERRORS = 20;
    if (errorsCount < MAX_ERRORS) {
        addMessageToArray(workbook.errors, message);
    } else {
        addMessageToArray(workbook.errors, constants.errors.errorsCountError);
        return false;
    }
};
var addWarning = function (workbook, message) {
    var warningsCount = workbook.warnings.length;
    var MAX_WARNINGS = 75;
    if (warningsCount < MAX_WARNINGS) {
        addMessageToArray(workbook.warnings, message);
    } else {
        addMessageToArray(workbook.errors, constants.errors.warningsCountError);
        return false;
    }
};
*/

var checkWorkbookSize = function (
    errorArray,
    warningArray,
    genesList,
    positiveWeights,
    negativeWeights
) {
    var genesLength = genesList.length;
    var edgesLength = positiveWeights.length + negativeWeights.length;
    var GENE_MAX_WARNING = 50;
    var EDGE_MAX_WARNING = 100;
    var GENE_MAX_ERROR = 75;
    var EDGE_MAX_ERROR = 150;

    if (
        (genesLength >= GENE_MAX_WARNING && genesLength < GENE_MAX_ERROR) ||
        (edgesLength >= EDGE_MAX_WARNING && edgesLength < EDGE_MAX_ERROR)
    ) {
        warningArray.push(constants.warnings.workbookSizeWarning(genesLength, edgesLength));
    } else if (genesLength >= GENE_MAX_ERROR || edgesLength >= EDGE_MAX_ERROR) {
        errorArray.push(constants.errors.workbookSizeError(genesLength, edgesLength));
    }
};

var checkDuplicateErrors = function (errorArray) {
    for (var i = 0; i < errorArray.length; i++) {
        if (errorArray[i].errorCode === "DUPLICATE_GENE") {
            return true;
        }
    }
};

var checkDuplicates = function (errorArray, genesList) {
    if (!checkDuplicateErrors(errorArray)) {
        var genesName = [];
        for (var i = 0; i < genesList.length; i++) {
            genesName.push(genesList[i].name);
        }

        genesName.sort();
        for (var j = 0; j < genesName.length - 1; j++) {
            if (genesName[j] === genesName[j + 1]) {
                errorArray.push(constants.errors.semanticDuplicateGeneError(genesName[j]));
            }
        }
    }
};

var checkGeneLength = function (errorArray, genesList) {
    // Check if any genes are over the gene length (currently 12)
    var maxGeneLength = 12;
    for (var i = 0; i < genesList.length; i++) {
        if (genesList[i].name.length > maxGeneLength) {
            errorArray.push(constants.errors.geneLengthError(genesList[i].name));
        }
    }
};

var checkSpecialCharacter = function (errorArray, genesList, sheetName, row) {
    var regex = /[^a-z0-9\_\-]/gi;
    for (var i = 0; i < genesList.length; i++) {
        if (genesList[i].name.match(regex) !== null) {
            errorArray.push(
                constants.errors.specialCharacterError(sheetName, genesList[i].name, row)
            );
        }
    }
};

var checkIfEmptyWorkbook = function (errorArray, genesList) {
    if (genesList.length === 0) {
        errorArray.push(constants.errors.emptyWorkbookError());
    }
};

// TODO Entry-point semantic checker function goes here.
module.exports = function (workbook) {
    // Note: checkSpecialCharacter is unused, however it does not contain all of the parameters needed to
    //       call the specialCharacterError in rorkbook-constants.js. As it has no real impact to the current codebase,
    //       this is being mentioned because when this is implemented, it is a good thing to be aware of.
    checkSpecialCharacter(workbook.errors, workbook.genes);
    checkDuplicates(workbook.errors, workbook.genes);
    checkGeneLength(workbook.errors, workbook.genes);
    checkWorkbookSize(
        workbook.errors,
        workbook.warnings,
        workbook.genes,
        workbook.positiveWeights,
        workbook.negativeWeights
    );
    checkIfEmptyWorkbook(workbook.errors, workbook.genes);
    // We're done. Return the workbook.
    return workbook;
};
