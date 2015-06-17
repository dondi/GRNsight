exports.errorList = errorList;

function errorList() = {
  return errors;
}

var errors = {
  missingNetworkError: {
    errorCode: "MISSING_NETWORK", 
    possibleCause: "This file does not have a 'network' sheet or a 'network_optimized_weights' sheet.", 
    suggestedFix: "Please select another file, or rename the sheet containing the adjacency matrix accordingly. Please refer to the " + 
    "<a href='http://dondi.github.io/GRNsight/documentation.html#section1' target='_blank'>Documentation page</a> for more information."
  },

  corruptGeneError: function (row, column) {
    return {
      errorCode: "CORRUPT_GENE", 
      possibleCause: "The gene name in row " + row + ", column " + column + " appears to be invalid.", 
      suggestedFix: "Please fix the error and try uploading again."
    };
  },

  missingValueError: function (row, column) {
    return {
      errorCode: "MISSING_VALUE", 
      possibleCause: "The cell at row " + row + ", column " + column + " in the adjacency matrix appears to have a missing value.", 
      suggestedFix: "Please ensure that all cells have a value, then upload the file again."
    };
  },

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

  unknownError: {
    errorCode: "UNKNOWN_ERROR", 
    possibleCause: "An unexpected error occurred.", 
    suggestedFix: "Please contact the GRNsight team at kdahlquist@lmu.edu, and attach the spreadsheet you attempted to upload." 
  }
}