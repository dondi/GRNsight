var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util'),
    path = require('path'),
    cytoscape = require('cytoscape');

var helpers = require(__dirname + "/helpers");

var addMessageToArray = function (messageArray, message) {
    messageArray.push(message);
}

var addError = function (network, message) {
    var errorsCount = network.errors.length;
    var MAX_ERRORS = 20;
    if (errorsCount < MAX_ERRORS) {
      addMessageToArray(network.errors, message);
    } else {
      addMessageToArray(network.errors, errorList.errorsCountError);
      return false;
    }
}

var addWarning = function (network, message) {
    var warningsCount = network.warnings.length;
    var MAX_WARNINGS = 75;
    if (warningsCount < MAX_WARNINGS) {
      addMessageToArray(network.warnings, message);
    } else {
      addMessageToArray(network.errors, errorsList.warningsCountError);
      return false;
    }
}

var checkNetworkSize = function(errorArray, warningArray, genesList, positiveWeights, negativeWeights) {
  var genesLength = genesList.length,
      edgesLength = positiveWeights.length + negativeWeights.length,
      GENE_MAX_WARNING = 50,
      EDGE_MAX_WARNING = 100,
      GENE_MAX_ERROR = 75,
      EDGE_MAX_ERROR = 150;

  if ((genesLength >= GENE_MAX_WARNING && genesLength < GENE_MAX_ERROR)|| (edgesLength >= EDGE_MAX_WARNING && edgesLength < EDGE_MAX_ERROR)) {
    warningArray.push(warningsList.networkSizeWarning(genesLength, edgesLength));
  } else if (genesLength >= GENE_MAX_ERROR || edgesLength >= EDGE_MAX_ERROR) {
    errorArray.push(errorList.networkSizeError(genesLength, edgesLength));
  }
}

var checkDuplicates = function(errorArray, linksList) {
  var targetGenes = [];
  var sourceGenes = [];

  for(var i = 0; i < linksList.length; i++){
    //sourceGenes.push(linksList[i].source.name.toUpperCase());
    //targetGenes.push(linksList[i].target.name.toUpperCase());
  }

  sourceGenes.sort();
  targetGenes.sort();

  // Run through the source genes and check if the gene in slot i is the same as the one next to it
  for(var i = 0; i < sourceGenes.length - 1; i++) {
      if(sourceGenes[i] === sourceGenes[i + 1]) {
        errorArray.push(errorList.duplicateGeneError("source", sourceGenes[i]));
      }
    }
    // Run through the target genes and check if the gene in slot j is the same as the one next to it
    for(var j = 0; j < targetGenes.length - 1; j++) {
      if(targetGenes[j] === targetGenes[j + 1]) {
        errorArray.push(errorList.duplicateGeneError("target", targetGenes[j]));
      }
    }
}

var checkGeneLength = function(errorArray, genesList) {
  // Check if any genes are over the gene length (currently 12)
  var maxGeneLength = 12
  for(var i = 0; i < genesList.length; i++) {
    if(genesList[i].name.length > maxGeneLength) {
      errorArray.push(errorList.geneLengthError(genesList[i].name));
    }
  }
}

var checkSpecialCharacter = function (errorArray, genesList){
  var regex = /[^a-z0-9\_\-]/gi;
  for(var i = 0; i < genesList.length; i++){
    if(genesList[i].name.match(regex)!=null){
      errorArray.push(errorList.specialCharacterError(genesList[i].name));
    }
  }
}


var warningsList = {
  missingSourceGeneWarning: function (row, column) {
    var colLetter = numbersToLetters[column];
    var rowNum = row + 1;
    return {
      warningCode: "MISSING_SOURCE",
      errorDescription: "A source gene name is missing in cell " + colLetter+rowNum + "."
    }
  },

  missingTargetGeneWarning: function (row, column) {
    var colLetter = numbersToLetters[column];
    var rowNum = row + 1;
    return {
      warningCode: "MISSING_TARGET",
      errorDescription: "A target gene name is missing in cell " + colLetter+rowNum + "."
    }
  },

  invalidMatrixDataWarning: function (row, column) {
    var colLetter = numbersToLetters[column];
    var rowNum = row + 1;
    return {
      warningCode: "INVALID_DATA",
      errorDescription: "The value in cell " + colLetter+rowNum + ", is undefined."
    }
  },

  randomDataWarning: function (type, row, column) {
    var colLetter = numbersToLetters[column];
    var rowNum = row + 1;
    return {
      warningCode: "RANDOM_DATA",
      errorDescription: "The value in cell " + colLetter+rowNum + ", has a corresponding source and/or target gene that is detected as " + type + "."
    }
  },

  emptyRowWarning: function (row) {
    var rowNum = row + 1;
    return {
      warningCode: "EMPTY_ROW",
      errorDescription: "Row " + rowNum + " was found to contain no data."
    }
  },

  networkSizeWarning: function (genesLength, edgesLength) {
    return {
      warningCode: "INVALID_NETWORK_SIZE",
      errorDescription: "Your network has " + genesLength + " genes, and " + edgesLength + " edges. Please note that networks are recommended to have less than 50 genes and 100 edges."
    }
  }
}


var errorList = {

  duplicateGeneError: function(geneType, geneName) {
    return {
      errorCode: "DUPLICATE_GENE",
      possibleCause: "There exists a duplicate for " + geneType + " gene " + geneName + ".",
      suggestedFix: "Please remove the duplicate gene and submit again."
    };
  },

  geneLengthError: function (geneName) {
    return {
      errorCode: "INVALID_GENE_LENGTH",
      possibleCause: "Gene " + geneName + " is more than 12 characters in length.",
      suggestedFix: "Genes may only be between 1 and 12 characters in length. Please shorten the name and submit again."
    };
  },

  networkSizeError: function (genesLength, edgesLength) {
    return {
      errorCode: "INVALID_NETWORK_SIZE",
      possibleCause: "This network has " + genesLength + " genes, and " + edgesLength + " edges.",
      suggestedFix: "Networks may not have more than 75 genes or 150 edges. Please reduce the size of your network and try again."
    };
  },

  specialCharacterError: function(geneName){
    return {
      errorCode: "INVALID_CHARACTER",
      possibleCause: "The value under gene name " + geneName + " contains invalid character.",
      suggestedFix: "Please ensure all values in the data does not contain special characters except for '-' and '_'."
    }
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
    suggestedFix: "Please contact the GRNsight team at kdahlquist@lmu.edu, and attach the spreadsheet you attempted to upload."
  }

}

// TODO Entry-point semantic checker function goes here.
module.exports = function (network) {

    // // We sort them here because gene order is not relevant before this point
    // // Sorting them now means duplicates will be right next to each other
    // sourceGenes.sort();
    // targetGenes.sort();

    // Final error checks!
    checkSpecialCharacter(network.errors, network.genes);
    checkDuplicates(network.errors, network.links);
    checkGeneLength(network.errors, network.genes);
    checkNetworkSize(network.errors, network.warnings, network.genes, network.positiveWeights, network.negativeWeights);

    // We're done. Return the network.
    return network;
};
