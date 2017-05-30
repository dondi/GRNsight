// var multiparty = require("multiparty");
// var xlsx = require("node-xlsx");
// var util = require("util");
// var path = require("path");
// var cytoscape = require("cytoscape");
//
// var helpers = require(__dirname + "/helpers");

var numbersToLetters = {
    0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H", 8: "I", 9:"J", 10:"K", 11:"L", 12:"M", 13:"N",
    14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T", 20:"U", 21:"V", 22:"W", 23:"X", 24:"Y", 25:"Z", 26:"AA",
    27:"AB", 28:"AC", 29:"AD", 30:"AE", 31:"AF", 32:"AG", 33:"AH", 34:"AI", 35:"AJ", 36:"AK", 37:"AL", 38:"AM",
    39:"AN", 40:"AO", 41:"AP", 42:"AQ", 43:"AR", 44:"AS", 45:"AT", 46:"AU", 47:"AV", 48:"AW", 49:"AX", 50:"AY",
    51:"AZ", 52:"BA", 53:"BB", 54:"BC", 55:"BD", 56:"BE", 57:"BF", 58:"BG", 59:"BH", 60:"BI", 61:"BJ", 62:"BK",
    63:"BL", 64:"BM", 65:"BN", 66:"BO", 67:"BP", 68:"BQ", 69:"BR", 70:"BS", 71:"BT", 72:"BU", 73:"BV", 74:"BW",
    75:"BX", 76:"BY"
};

var warningsList = {
    missingSourceGeneWarning: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            warningCode: "MISSING_SOURCE",
            errorDescription: "A source gene name is missing in cell " + colLetter + rowNum + "."
        };
    },

    missingTargetGeneWarning: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            warningCode: "MISSING_TARGET",
            errorDescription: "A target gene name is missing in cell " + colLetter + rowNum + "."
        };
    },

    invalidMatrixDataWarning: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            warningCode: "INVALID_DATA",
            errorDescription: "The value in cell " + colLetter + rowNum + ", is undefined."
        };
    },

    randomDataWarning: function (type, row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            warningCode: "RANDOM_DATA",
            errorDescription: "The value in cell " + colLetter + rowNum + ", has a corresponding source" +
            " and/or target gene that is detected as " + type + "."
        };
    },

    emptyRowWarning: function (row) {
        var rowNum = row + 1;
        return {
            warningCode: "EMPTY_ROW",
            errorDescription: "Row " + rowNum + " was found to contain no data."
        };
    },

    networkSizeWarning: function (genesLength, edgesLength) {
        return {
            warningCode: "INVALID_NETWORK_SIZE",
            errorDescription: "Your network has " + genesLength + " genes, and " + edgesLength +
            " edges. Please note that networks are recommended to have less than 50 genes and 100 edges."
        };
    },
};

var errorList = {

    emptyNetworkError: function () {
        return {
            errorCode: "EMPTY_NETWORK_ERROR",
            possibleCause: "GRNsight detects that the file you uploaded is empty and does not contain any network information.",
            suggestedFix: "Please review the file and ensure that it specifies a network."
        }
    },

    semanticDuplicateGeneError: function(geneName) {
        return {
            errorCode: "SEMANTIC_DUPLICATE_GENE",
            possibleCause: "There exists a duplicate for " + geneName + ".",
            suggestedFix: "Please remove the duplicate gene and submit again."
        };
    },

    geneLengthError: function (geneName) {
        return {
            errorCode: "INVALID_GENE_LENGTH",
            possibleCause: "Gene " + geneName + " is more than 12 characters in length.",
            suggestedFix: "Genes may only be between 1 and 12 characters in length. Please" +
                " shorten the name and submit again."
        };
    },

    networkSizeError: function (genesLength, edgesLength) {
        return {
            errorCode: "INVALID_NETWORK_SIZE",
            possibleCause: "This network has " + genesLength + " genes, and " + edgesLength + " edges.",
            suggestedFix: "Networks may not have more than 75 genes or 150 edges. Please reduce the size" +
            " of your network and try again."
        };
    },

    specialCharacterError: function (geneName) {
        return {
            errorCode: "INVALID_CHARACTER",
            possibleCause: "The value under gene name " + geneName + " contains invalid character.",
            suggestedFix: "Please ensure all values in the data does not contain special characters" +
            " except for '-' and '_'."
        };
    },

    errorsCountError: {
        errorCode: "ERRORS_OVERLOAD",
        possibleCause: "This network has over 20 errors.",
        suggestedFix: "Please check the format of your spreadsheet with the guidlines outlined on the" +
        "Documentation page and try again. If you fix these errors and try to upload again, there may be " +
        "further errors detected. As a general approach for fixing the errors, consider copying and " +
        "pasting just your adjacency matrix into a fresh Excel Workbook and saving it."
    },

    warningsCountError: {
        errorCode: "WARNINGS_OVERLOAD",
        possibleCause: "This network has over 75 warnings.",
        suggestedFix: "Please check the format of your spreadsheet with the guidlines outlined on the" +
        "Documentation page and try again. If you fix these errors and try to upload again, there may be " +
        "further errors detected. As a general approach for fixing the errors, consider copying and " +
        "pasting just your adjacency matrix into a fresh Excel Workbook and saving it."
    },

    unknownError: {
        errorCode: "UNKNOWN_ERROR",
        possibleCause: "An unexpected error occurred.",
        suggestedFix: "Please contact the GRNsight team at kdahlquist@lmu.edu, and attach the spreadsheet you" +
        " attempted to upload."
    }

};

/*
var addMessageToArray = function (messageArray, message) {
    messageArray.push(message);
};
var addError = function (network, message) {
    var errorsCount = network.errors.length;
    var MAX_ERRORS = 20;
    if (errorsCount < MAX_ERRORS) {
        addMessageToArray(network.errors, message);
    } else {
        addMessageToArray(network.errors, errorList.errorsCountError);
        return false;
    }
};
var addWarning = function (network, message) {
    var warningsCount = network.warnings.length;
    var MAX_WARNINGS = 75;
    if (warningsCount < MAX_WARNINGS) {
        addMessageToArray(network.warnings, message);
    } else {
        addMessageToArray(network.errors, errorList.warningsCountError);
        return false;
    }
};
*/

var checkNetworkSize = function(errorArray, warningArray, genesList, positiveWeights, negativeWeights) {
    var genesLength = genesList.length;
    var edgesLength = positiveWeights.length + negativeWeights.length;
    var GENE_MAX_WARNING = 50;
    var EDGE_MAX_WARNING = 100;
    var GENE_MAX_ERROR = 75;
    var EDGE_MAX_ERROR = 150;

    if ((genesLength >= GENE_MAX_WARNING && genesLength < GENE_MAX_ERROR) ||
      (edgesLength >= EDGE_MAX_WARNING && edgesLength < EDGE_MAX_ERROR)) {
        warningArray.push(warningsList.networkSizeWarning(genesLength, edgesLength));
    } else if (genesLength >= GENE_MAX_ERROR || edgesLength >= EDGE_MAX_ERROR) {
        errorArray.push(errorList.networkSizeError(genesLength, edgesLength));
    }
};

var checkDuplicateErrors = function (errorArray) {
    for (var i = 0; i < errorArray.length; i++) {
        if (errorArray[i].errorCode === "DUPLICATE_GENE") {
            return true;
        }
    }
};

var checkDuplicates = function(errorArray, genesList) {
    if (!checkDuplicateErrors(errorArray)) {
        var genesName = [];
        for (var i = 0; i < genesList.length; i++) {
            genesName.push(genesList[i].name);
        }

        genesName.sort();
        for (var j = 0; j < genesName.length - 1; j++) {
            if (genesName[j] === genesName[j + 1]) {
                errorArray.push(errorList.semanticDuplicateGeneError(genesName[j]));
            }
        }
    }
};

var checkGeneLength = function(errorArray, genesList) {
    // Check if any genes are over the gene length (currently 12)
    var maxGeneLength = 12;
    for (var i = 0; i < genesList.length; i++) {
        if (genesList[i].name.length > maxGeneLength) {
            errorArray.push(errorList.geneLengthError(genesList[i].name));
        }
    }
};

var checkSpecialCharacter = function (errorArray, genesList) {
    var regex = /[^a-z0-9\_\-]/gi;
    for (var i = 0; i < genesList.length; i++) {
        if (genesList[i].name.match(regex) !== null) {
            errorArray.push(errorList.specialCharacterError(genesList[i].name));
        }
    }
};

var checkIfEmptyNetwork = function (errorArray, genesList) {
    if (genesList.length === 0) {
        errorArray.push(errorList.emptyNetworkError());
    }
}

// TODO Entry-point semantic checker function goes here.
module.exports = function (network) {
    checkSpecialCharacter(network.errors, network.genes);
    checkDuplicates(network.errors, network.genes);
    checkGeneLength(network.errors, network.genes);
    checkNetworkSize(network.errors, network.warnings, network.genes, network.positiveWeights, network.negativeWeights);
    checkIfEmptyNetwork(network.errors, network.genes);
    // We're done. Return the network.
    return network;
};
