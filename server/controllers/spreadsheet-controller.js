var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util'),
    path = require('path');

var processGRNmap = function (path, res, app) {
  var sheet,
      network;
  try {
    sheet = xlsx.parse(path);
  } catch (err) {
    return res.json(400, "Unable to read input. The file may be corrupt.");
  }

  // For the time being, send the result in a form readable by people
  //TODO: Optimize the result for D3
  res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));

  network = parseSheet(sheet);

  if(network.errors.length == 0) {
    // If all looks well, return the network with an all clear
    return res.json(network);
  } else {
    // If all does not look well, return the network with an error 400
    return res.json(400, network);
  }

};

var parseSheet = function(sheet) {
  var currentSheet,
      network = {
        genes: [],
        links: [],
        errors: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: "unweighted",
      },
      currentLink, 
      currentGene,
      sourceGene,
      targetGene,
      sourceGeneNumber,
      targetGeneNumber,
      genesList = [], // This will contain all of the genes in upper case for use in error checking
      sourceGenes = [],
      targetGenes = [];
  
  //Look for the worksheet containing the network data
  for (var i = 0; i < sheet.worksheets.length; i++) {
    if (sheet.worksheets[i].name == "network") {
      //Here we have found a sheet containing simple data. We keep looking
      //in case there is also a sheet with optimized weights
      currentSheet = sheet.worksheets[i];
    } else if (sheet.worksheets[i].name == "network_optimized_weights") {
      //We found a sheet with optimized weights, which is the ideal data source.
      //So we stop looking.
      currentSheet = sheet.worksheets[i];
      network.sheetType = "weighted";
      break;
    }
  }

  // If it didn't find a network/network_optimized_weights sheet
  if (currentSheet === undefined) { 
    network.errors.push(errorList.missingNetworkError)
    return network;
  }

  for (var row = 0, column = 1; row < currentSheet.data.length; row++) {
    // Genes found when row = 0 are targets. Genes found when column = 0 are source genes.
    // At some point, we'll want to look through all 256 rows for random data.
    // We set column = 1 in the for loop so it skips the first line on the first row, since that contains no matrix data.
    try { // This prevents the server from crashing if something goes wrong anywhere in here
      while(column < currentSheet.data[row].length) { // While we haven't gone through all of the columns in this row...
        if (row === 0) { // If we are at the top of a new column...
          // These genes are the source genes
          try {
            currentGene = {name: currentSheet.data[0][column].value}; 
            // Set genes to upper case so case doesn't matter in error checking; ie: Cin5 is the same as cin5
            sourceGenes.push(String(currentGene.name.toUpperCase())); 
            genesList.push(String(currentGene.name.toUpperCase())); 
            network.genes.push(currentGene);
          } catch (err) {
            network.errors.push(errorList.corruptGeneError(row, column));
            return network;
          } 
        } else if (column === 0) { // If we are at the far left of a new row...
          // These genes are the target genes
          try {
            currentGene = {name: currentSheet.data[row][0].value}; 
            targetGenes.push(String(currentGene.name.toUpperCase())); 
            // Here we check to see if we've already seen the gene name that we're about to store
            // Genes may or may not be present due to asymmetry or unorderedness
            // If it's in the genesList, it will return a number > 0, so we won't store it
            // If it's not there, it will return -1, so we add it. 
            if(genesList.indexOf(String(currentGene.name.toUpperCase())) === -1) {
              genesList.push(String(currentGene.name.toUpperCase()));
              network.genes.push(currentGene);
            }
          } catch (err) {
            network.errors.push(errorList.corruptGeneError(row, column));
            return network;
          };
        } else { // If we're within the matrix and lookin' at the data...
          try {
            if (currentSheet.data[row][column].value != 0) { // We only care about non-zero values
              // Grab the source gene's name and number
              sourceGene = currentSheet.data[0][column].value.toUpperCase(); 
              sourceGeneNumber = genesList.indexOf(sourceGene);
              // Grab the target gene's name and number
              targetGene = currentSheet.data[row][0].value.toUpperCase();
              targetGeneNumber = genesList.indexOf(targetGene);
              currentLink = {source: sourceGeneNumber, target: targetGeneNumber, value: currentSheet.data[row][column].value};
              // Here we set the properties of the current link before we push them to the network
              if (currentLink.value > 0) { // If it's a positive number, mark it as an activator
                currentLink.type = "arrowhead";
                currentLink.stroke = "MediumVioletRed";
                network.positiveWeights.push(currentLink.value);
              } else { // if it's a negative number, mark it as a repressor
                currentLink.type = "repressor";
                currentLink.stroke = "DarkTurquoise";
                network.negativeWeights.push(currentLink.value);
              }
              network.links.push(currentLink);
            };
          } catch (err) {
            // TO DO: Customize this error message to the specific issue that occurred.
            network.errors.push(errorList.missingValueError(row, column));
            return network;
          };
        };
        column++; // Let's move on to the next column!
      }; // Once we finish with the current row...
      column = 0; // let's go back to column 0 on the next row!
    } catch (err) {
      // We only get here if something goes drastically wrong. We don't want to get here.
      network.errors.push(errorList.unknownError);
      return network;
    }
  };


  // We sort them here because gene order is not relevant before this point
  // Sorting them now means duplicates will be right next to each other
  sourceGenes.sort();
  targetGenes.sort();

  // Final error checks!
  checkDuplicates(network.errors, sourceGenes, targetGenes);
  checkGeneLength(network.errors, genesList);

  // We're done. Return the network.
  return network;
};


var checkDuplicates = function(errorArray, sourceGenes, targetGenes) {
  // Run through the source genes and check if the gene in slot i is the same as the one next to it
  for(var i = 0; i < sourceGenes.length - 1; i++) {
    if(sourceGenes[i] === sourceGenes[i + 1]) {
      errorArray.push(errorList.duplicateGeneError("source", sourceGenes[i]));
    }
  }
  // Run through the target genes and check if the gene in slot i is the same as the one next to it
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
    if(genesList[i].length > maxGeneLength) {
      errorArray.push(errorList.geneLengthError(genesList[i]));
    }
  }
}

// This is the massive list of errors. Yay!
var errorList = {
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
  
  unknownError: {
    errorCode: "UNKNOWN_ERROR", 
    possibleCause: "An unexpected error occurred.", 
    suggestedFix: ""
  }
}

module.exports = function (app) {
  if (app) {

    //parse the incoming form data, then parse the spreadsheet. Finally, send back json.
    app.post('/upload', function (req, res) {
      //TODO: Add file validation
      (new multiparty.Form()).parse(req, function (err, fields, files) {
        if (err) {
          return res.json(400, "There was a problem uploading your file. Please try again.");
        }

        try {
          var input = files.file[0].path;
        } catch (err) {
          return res.json(400, "No upload file selected.");
        }

        if (path.extname(input) !== ".xlsx") {
          return res.json(400, "This file cannot be loaded because:<br><br> The file is not in a format GRnsight can read." +
            "<br>Please select an Excel Workbook (.xlsx) file. Note that Excel 97-2003 Workbook (.xls) files are not " +
            " able to be read by GRNsight.");
        }

        return processGRNmap(input, res, app);
      });
    });

    // Load the demos
    app.get('/demo/unweighted', function (req, res) {
      return processGRNmap("../test-files/demo-files/21-genes_50-edges_Dahlquist-data_input.xlsx", res, app);
    });

    app.get('/demo/weighted', function (req, res) {
      return processGRNmap("../test-files/demo-files/21-genes_50-edges_Dahlquist-data_estimation_output.xlsx", res, app);x
    });

    app.get('/demo/schadeInput', function (req, res) {
      return processGRNmap("../test-files/demo-files/21-genes_31-edges_Schade-data_input.xlsx", res, app);
    });

    app.get('/demo/schadeOutput', function (req, res) {
      return processGRNmap("../test-files/demo-files/21-genes_31-edges_Schade-data_estimation_output.xlsx", res, app);
    });
  }

  //exporting parseSheet for use in testing. Do not remove!
  return { 
    parseSheet: parseSheet
  };
}
