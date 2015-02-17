var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util'),
    path = require('path');

var processGRNmap = function (path, res, app) {
  var sheet;
  try {
    sheet = xlsx.parse(path);
  } catch (err) {
    return res.json(400, "Unable to read input. The file may be corrupt.");
  }

  // For the time being, send the result in a form readable by people
  //TODO: Optimize the result for D3
  res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));

  parseSheet(sheet, res);
};

var parseSheet = function(sheet, res) {
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
      genesList = [],
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

  if (currentSheet === undefined) {
    network.errors.push(new newError("This file does not have a 'network' sheet or a 'network_optimized_weights' sheet.", 
      "Please select another file, or rename the sheet containing the adjacency matrix accordingly. Please refer to the " + 
      "<a href='http://dondi.github.io/GRNsight/documentation.html#section1' target='_blank'>Documentation page</a> for more information."))
    return res.json(400, network);
  }

  for (var row = 0, column = 1; row < currentSheet.data.length; row++) {
    // Genes found when row = 0 are targets. Genes found when column = 0 are source genes.
    // At some point, we'll want to look through all 256 rows for random data.
    // column = 1 so it skips the first line on the first row.
    try {
      while(column < currentSheet.data[row].length) {
        if (row === 0) {
          // These genes are the source genes
          try {
            currentGene = {name: currentSheet.data[row][column].value};
            sourceGenes.push(String(currentGene.name.toUpperCase())); // For use in error checking later.
            genesList.push(String(currentGene.name.toUpperCase()));
            network.genes.push(currentGene);
          } catch (err) {
            network.errors.push(new newError("One of your gene names appears to be corrupt.", "Please fix the error and try uploading again."));
            return res.json(400, network);
          }
        } else if (column === 0) { 
          // These genes are the target genes
          try {
            currentGene = {name: currentSheet.data[row][column].value};
            targetGenes.push(String(currentGene.name.toUpperCase()));
            if(genesList.indexOf(String(currentGene.name.toUpperCase())) === -1) {
              genesList.push(String(currentGene.name));
              network.genes.push(currentGene);
            }
          } catch (err) {
            network.errors.push(new newError("One of your gene names appears to be corrupt.", "Please fix the error and try uploading again."));
            return res.json(400, network);
          };
        } else {
          try {
            if (currentSheet.data[row][column].value != 0) {
              sourceGene = currentSheet.data[0][column].value.toUpperCase();
              sourceGeneNumber = genesList.indexOf(sourceGene);
              targetGene = currentSheet.data[row][0].value.toUpperCase();
              targetGeneNumber = genesList.indexOf(targetGene);
              currentLink = {source: sourceGeneNumber, target: targetGeneNumber, value: currentSheet.data[row][column].value};
              if (currentLink.value > 0) {
                currentLink.type = "arrowhead";
                currentLink.stroke = "MediumVioletRed";
                network.positiveWeights.push(currentLink.value);
              } else {
                currentLink.type = "repressor";
                currentLink.stroke = "DarkTurquoise";
                network.negativeWeights.push(currentLink.value);
              }
              network.links.push(currentLink);
            };
          } catch (err) {
            // TO DO: Customize this error message to the specific issue that occurred.
            network.errors.push(new newError("One of the cells in the adjacency matrix appears to have a missing value.", 
              "Please ensure that all cells have a value, then upload the file again."));
            return res.json(400, network);
          };
        };
        column++;
      };
      column = 0;
    } catch (err) {
      network.errors.push(new newError("An unexpected error occurred.", ""));
      return res.json(400, network);
    }
  };

  sourceGenes.sort();
  targetGenes.sort();

  checkDuplicates(network.errors, sourceGenes, targetGenes);
  checkGeneLength(network.errors, genesList);

  if(network.errors.length != 0) {
    return res.json(400, network);
  } else {
    return res.json(network);
  }
};

newError = function(possibleCause, suggestedFix) {
  this.possibleCause = possibleCause;
  this.suggestedFix = suggestedFix;
}

checkDuplicates = function(errorArray, sourceGenes, targetGenes) {
  for(var i = 0; i < sourceGenes.length - 1; i++) {
    if(sourceGenes[i] === sourceGenes[i + 1]) {
      errorArray.push(new newError("There exists a duplicate for source gene " + sourceGenes[i] + ".", "Please remove the duplicate gene and submit again."));
    }
  }
  for(var j = 0; j < targetGenes.length - 1; j++) {
    if(targetGenes[j] === targetGenes[j + 1]) {
      errorArray.push(new newError("There existss a duplicate for target gene " + targetGenes[i] + ".", "Please remove the duplicate gene and submit again."));
    }
  }
}

checkGeneLength = function(errorArray, genesList) {
  for(var i = 0; i < genesList.length; i++) {
    if(genesList[i].length > 12) {
      errorArray.push(new newError("Gene " + genesList[i] + " is more than 12 characters in length. ", "Genes may only be between 1 and 12 characters in length. Please shorten the name and submit again. "));
    }
  }
}

module.exports = function (app) {
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