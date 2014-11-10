var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util'),
    path = require('path');

    processGRNmap = function (path, res, app) {
      var sheet,
          currentSheet,
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
          test,
          genesList = [],
          errorArray = [];

      try {
        sheet = xlsx.parse(path);
      } catch (err) {
        return res.json(400, "Unable to read input. The file may be corrupt.");
      }

        // For the time being, send the result in a form readable by people
        //TODO: Optimize the result for D3
        res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));
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
        // because no possible errors (currently) can occur before this, we'll just return the fatal error.
        // TO DO: Fix this.  
        return res.json(400, "This file does not have a 'network' sheet or a 'network_optimized_weights' sheet. Please select another" + 
          " file, or rename the sheet containing the adjacency matrix accordingly. Please refer to the " + 
          "<a href='http://dondi.github.io/GRNsight/documentation.html#section1' target='_blank'>Documentation page</a> for more information.");
      }

      for (var row = 0, column = 1, geneNumber = 0; row < currentSheet.data.length; row++) {
        // Genes found when row = 0 are targets. Genes found when column = 0 are source genes.
        // At some point, we'll want to look through all 256 rows for random data.
        // column = 1 so it skips the first line on the first row.
        try {
          while(column < currentSheet.data[row].length) {
            if (row === 0) {
              // These genes are source genes
              currentGene = {name: currentSheet.data[row][column].value.toUpperCase(), number: geneNumber};
              genesList.push(String(currentGene.name));
              network.genes.push(currentGene);
              //console.log("I AM SOURCE GENE " + geneNumber + "! I am " + currentGene.name + " from row " + row + " and column " + column + ".");
              geneNumber++;
            } else if (column === 0) { 
              // These genes are target genes
              currentGene = {name: currentSheet.data[row][column].value.toUpperCase(), number: geneNumber};
              if(genesList.indexOf(String(currentGene.name)) === -1) {
                genesList.push(String(currentGene.name));
                network.genes.push(currentGene);
                //console.log("I AM TARGET GENE " + geneNumber + "! I am " + currentGene.name + " from row " + row + " and column " + column + ".");
                geneNumber++;
              }
            } else {
              if (currentSheet.data[row][column].value != 0) {
                sourceGene = currentSheet.data[0][column].value.toUpperCase();
                sourceGeneNumber = genesList.indexOf(sourceGene);
                targetGene = currentSheet.data[row][0].value.toUpperCase();
                targetGeneNumber = genesList.indexOf(targetGene);
                currentLink = {source: column - 1, target: row - 1, value: currentSheet.data[row][column].value};
                console.log("Value: " + currentLink.value + ". My source is " + sourceGene + "(" + sourceGeneNumber + ") and my target is " + targetGene + "(" + targetGeneNumber + "). My source number is " + currentLink.source + " and my target number is " + currentLink.target + ".");
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
                //console.log("I AM A LINK! I am " + JSON.stringify(currentLink) + " from row " + i + " and column " + j + ".");
              } else {
                //console.log("I have no value. From row " + i + " and column " + j + ", I am " + currentSheet.data[i][j].value);
              };
            };
            column++;
          };
          column = 0;
        } catch (err) {
          res.json(400, "An error occurred. I'll get back to you on what the specific error was.");
        }
      };

      res.json(network);
    };

    newError = function(possibleCause, suggestedFix) {
      this.possibleCause = possibleCause;
      this.suggestedFix = suggestedFix;
    }

    checkDuplicates = function(errorArray, genesArray, genePairsArray) {
      for(var i = 0; i < genesArray.length - 1; i++) {
        if(genesArray[i] === genesArray[i+1]) {
          errorArray.push(new newError("There exists a duplicate for gene " + genesArray[i] + " along the top. Please note this may cause many genes to be shown as not matching. ", "Please remove the duplicate gene and submit again. "))
        }
        if(genePairsArray[i] === genePairsArray[i+1]) {
          errorArray.push(new newError("There exists a duplicate for gene " + genePairsArray[i] + " along the side. Please note this may cause many genes to be shown as not matching. ", "Please remove the duplicate gene and submit again. "))
        }
      }
    }

    checkGeneLength = function(errorArray, genesArray, genePairsArray) {
      for(var i = 0; i < genesArray.length; i++) {
        if(genesArray[i].length > 12) {
          errorArray.push(new newError("Gene " + genesArray[i] + " is more than 12 characters in length. ", "Genes may only be between 1 and 12 characters in length. Please shorten the name and submit again. "));
        }
        if(genePairsArray[i].length > 12) {
          errorArray.push(new newError("Gene " + genePairsArray[i] + " is more than 12 characters in length. ", "Genes may only be between 1 and 12 characters in length. Please shorten the name and submit again. "));
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
        return res.json(400, "Invalid input file. Please select an Excel Workbook (*.xlsx) file." +
          "<br><br>Note that Excel 97-2003 Workbook (*.xls) files are not able to be read by GRNsight.");
      }

      return processGRNmap(input, res, app);
    });
  });

  app.get('/demo/unweighted', function (req, res) {
    return processGRNmap("../test-files/Demo\ Files/21-genes_50-edges_Dahlquist-data_input.xlsx", res, app);
  });

  app.get('/demo/weighted', function (req, res) {
    return processGRNmap("../test-files/Demo\ Files/21-genes_50-edges_Dahlquist-data_estimation_output.xlsx", res, app);x
  });

  app.get('/demo/schadeInput', function (req, res) {
    return processGRNmap("../test-files/Demo\ Files/21-genes_31-edges_Schade-data_input.xlsx", res, app);
  });

  app.get('/demo/schadeOutput', function (req, res) {
    return processGRNmap("../test-files/Demo\ Files/21-genes_31-edges_Schade-data_estimation_output.xlsx", res, app);
  });
}