var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util'),
    path = require('path'),
    cytoscape = require('cytoscape');

var helpers = require(__dirname + "/helpers");


/*

var parseSheet = function(...){
  if.. else{..
    if(row===0 | column===0){
      try{
        if (!checkSpecialCharacter(currentGene.name)){
           addError(network, errorList.specialCharacterError(row, column));
           return network;
         }
       }
     }
    ...
    }
  }
  ...
  checkDuplicates(network.errors, sourceGenes, targetGenes);
  checkGeneLength(network.errors, genesList);
  checkNetworkSize(network.errors, network.warnings, genesList, network.positiveWeights, network.negativeWeights);
}

*/

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

var checkGeneLength = function(errorArray, genesList) {
  // Check if any genes are over the gene length (currently 12)
  var maxGeneLength = 12
  for(var i = 0; i < genesList.length; i++) {
    if(genesList[i].length > maxGeneLength) {
      errorArray.push(errorList.geneLengthError(genesList[i]));
    }
  }
}

var checkSpecialCharacter = function (currentGene){
  var regex = /[^a-z0-9\_\-]/gi;
  return !currentGene.match(regex);
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

  specialCharacterError: function(row, column){
    var colLetter = numbersToLetters[column];
    var rowNum = row + 1;
    return {
      errorCode: "INVALID_CHARACTER",
      possibleCause: "The value in cell " + colLetter + rowNum + " contains invalid character.",
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
  }

}
