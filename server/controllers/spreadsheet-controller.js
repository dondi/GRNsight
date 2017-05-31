var multiparty = require("multiparty");
var xlsx = require("node-xlsx");
// var util = require("util");
var path = require("path");
// var cytoscape = require("cytoscape"); //NOTE: Commented out for issue #474

var helpers = require(__dirname + "/helpers");

var semanticChecker = require(__dirname + "/semantic-checker");

// Currently only going to number 76 because currently the network errors out at 75+ genes.
var numbersToLetters = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H", 8: "I", 9:"J", 10:"K", 11:"L",
    12:"M", 13:"N", 14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T", 20:"U", 21:"V", 22:"W", 23:"X", 24:"Y",
    25:"Z", 26:"AA", 27:"AB", 28:"AC", 29:"AD", 30:"AE", 31:"AF", 32:"AG", 33:"AH", 34:"AI", 35:"AJ", 36:"AK",
    37:"AL", 38:"AM", 39:"AN", 40:"AO", 41:"AP", 42:"AQ", 43:"AR", 44:"AS", 45:"AT", 46:"AU", 47:"AV", 48:"AW",
    49:"AX", 51:"AY", 52:"AZ", 53:"BA", 54:"BB", 55:"BC", 56:"BD", 57:"BE", 58:"BF", 59:"BG", 60:"BH", 61:"BI",
    62:"BJ", 63:"BK", 64:"BL", 65:"BM", 66:"BN", 67:"BO", 68:"BP", 69:"BQ", 70:"BR", 71:"BS", 72:"BT", 73:"BU",
    74:"BV", 75:"BW", 76:"BX"};

// TODO: Put this and the warnings list into helpers.
// This is the massive list of errors. Yay!
// The graph will not load if an error is detected.
var errorList = {
    missingNetworkError: {
        errorCode: "MISSING_NETWORK",
        possibleCause: "This file does not have a 'network' sheet or a 'network_optimized_weights' sheet.",
        suggestedFix: "Please select another file, or rename the sheet containing the adjacency matrix accordingly. Please refer to the " +
        "<a href='http://dondi.github.io/GRNsight/documentation.html#section1' target='_blank'>Documentation page</a> for more information."
    },

    corruptGeneError: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            errorCode: "CORRUPT_GENE",
            possibleCause: "The gene name in cell " + colLetter + rowNum + " appears to be invalid.",
            suggestedFix: "Please fix the error and try uploading again."
        };
    },

    missingValueError: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            errorCode: "MISSING_VALUE",
            possibleCause: "The value in the cell " + colLetter + rowNum + " in the adjacency matrix appears to have a missing value.",
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

    dataTypeError: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            errorCode: "INVALID_CELL_DATA_TYPE",
            possibleCause: "The value in cell " + colLetter + rowNum + " is not a number.",
            suggestedFix: "Please ensure all values in the data matrix are numbers and try again."
        };
    },

    emptyRowError: function (row) {
        var rowNum = row + 1;
        return {
            errorCode: "EMPTY_ROW",
            possibleCause: "Row " + rowNum + " does not contain any data.",
            suggestedFix: "Please ensure all rows contain data and all empty rows are removed. " +
                        "Also, please ensure that no extraneous data is outside of the matrix, " +
                        "as this may cause this error."
        };
    },

    outsideCellError: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            errorCode: "EMPTY_CELL",
            possibleCause: "The cell at " + colLetter + rowNum + " contains data that is outside the matrix.",
            suggestedFix: "Please remove all extraneous data from outside the matrix and ensure" +
                        " the matrix is "
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
        " Documentation page and try again. If you fix these errors and try to upload again, there may be " +
        " further errors detected. As a general approach for fixing the errors, consider copying and " +
        " pasting just your adjacency matrix into a fresh Excel Workbook and saving it."
    },

    unknownError: {
        errorCode: "UNKNOWN_ERROR",
        possibleCause: "An unexpected error occurred.",
        suggestedFix: "Please contact the GRNsight team at kdahlquist@lmu.edu, and attach the spreadsheet you attempted to upload."
    }

};


// This is the list of warnings.
// The graph will still load if warnings are detected, but these will be reported to the user.
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
            errorDescription: "The value in cell " + colLetter + rowNum + ", has a corresponding source and/or target gene that is detected as " + type + "."
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
            errorDescription: "Your network has " + genesLength + " genes, and " + edgesLength + " edges. Please note that networks are recommended to have less than 50 genes and 100 edges."
        };
    },

    incorrectlyNamedSheetWarning: function() {
        return {
            warningCode: "INCORRECTLY_NAMED_SHEET",
            errorDescription: "The uploaded file appears to contain a weighted network, but contains no 'network_optimized_weights' sheet. A weighted network must be contained in a sheet called 'network_optimized_weights' in order to be drawn as a weighted graph. Please check if the sheet(s) in the uploaded spreadsheet have been named properly."
        };
    }
};

var addMessageToArray = function (messageArray, message) {
    messageArray.push(message);
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
};

var checkDuplicates = function(errorArray, sourceGenes, targetGenes) {
  // Run through the source genes and check if the gene in slot i is the same as the one next to it
    for (var i = 0; i < sourceGenes.length - 1; i++) {
        if (sourceGenes[i] === sourceGenes[i + 1]) {
            errorArray.push(errorList.duplicateGeneError("source", sourceGenes[i]));
        }
    }
  // Run through the target genes and check if the gene in slot j is the same as the one next to it
    for (var j = 0; j < targetGenes.length - 1; j++) {
        if (targetGenes[j] === targetGenes[j + 1]) {
            errorArray.push(errorList.duplicateGeneError("target", targetGenes[j]));
        }
    }
};

var parseSheet = function(sheet) {
    var currentSheet;
    var network = {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: "unweighted",
    };
    var currentLink;
    var currentGene;
    var sourceGene;
    var targetGene;
    var sourceGeneNumber;
    var targetGeneNumber;
    var genesList = []; // This will contain all of the genes in upper case for use in error checking
    var sourceGenes = [];
    var targetGenes = [];

    // Look for the worksheet containing the network data
    for (var i = 0; i < sheet.length; i++) {
        if (sheet[i].name === "network") {
            // Here we have found a sheet containing simple data. We keep looking
            // in case there is also a sheet with optimized weights
            currentSheet = sheet[i];
        } else if (sheet[i].name === "network_optimized_weights") {
            // We found a sheet with optimized weights, which is the ideal data source.
            // So we stop looking.
            currentSheet = sheet[i];
            network.sheetType = "weighted";
            break;
        }
    }

  // If it didn't find a network/network_optimized_weights sheet
  // TODO For expediency, we are wrapping every `return network` statement in `semanticChecker`.
  //      Some refactoring may be desirable to prevent excessive repetition.
    if (currentSheet === undefined) {
        addError(network, errorList.missingNetworkError);
        return network;
    }

    for (var row = 0, column = 1; row < currentSheet.data.length; row++) {
        if (currentSheet.data[row].length === 0) { // if the current row is empty
            if (addError(network, errorList.emptyRowError(row)) === false) {
                return network;
            }
        } else { // if the row has data...
            // Genes found when row = 0 are targets. Genes found when column = 0 are source genes.
            // We set column = 1 in the for loop so it skips row 0 column 0, since that contains no matrix data.
            // Yes, the rows and columns use array numbering. That is, they start at 0, not 1.
            try { // This prevents the server from crashing if something goes wrong anywhere in here
                while (column < currentSheet.data[row].length) { // While we haven't gone through all of the columns in this row...
                    if (row === 0) { // If we are at the top of a new column...
                        // These genes are the source genes
                        try {
                            currentGene = {name: currentSheet.data[0][column]};
                            // Set genes to upper case so case doesn't matter in error checking; ie: Cin5 is the same as cin5
                            if (currentGene.name === undefined) {
                                addWarning(network, warningsList.missingSourceGeneWarning(row, column));
                            } else if (isNaN(currentGene.name) && typeof currentGene.name !== "string") {
                                addWarning(network, warningsList.missingSourceGeneWarning(row, column));
                            } else {
                                sourceGenes.push(String(currentGene.name.toUpperCase()));
                                genesList.push(String(currentGene.name.toUpperCase()));
                                currentGene.name = currentGene.name;
                                network.genes.push(currentGene);
                            }
                        } catch (err) {
                            addError(network, errorList.corruptGeneError(row, column));
                            return network;
                        }
                    } else if (column === 0) { // If we are at the far left of a new row...
                        // These genes are the target genes
                        try {
                            currentGene = {name: currentSheet.data[row][0]};
                            if (currentGene.name === undefined) {
                                addWarning(network, warningsList.missingTargetGeneWarning(row, column));
                            } else if (isNaN(currentGene.name) && typeof currentGene.name !== "string") {
                                addWarning(network, warningsList.missingTargetGeneWarning(row, column));
                            } else {
                                targetGenes.push(String(currentGene.name.toUpperCase()));
                                // Here we check to see if we've already seen the gene name that we're about to store
                                // Genes may or may not be present due to asymmetry or unorderedness
                                // If it's in the genesList, it will return a number > 0, so we won't store it
                                // If it's not there, it will return -1, so we add it.
                                if (genesList.indexOf(String(currentGene.name.toUpperCase())) === -1) {
                                    genesList.push(String(currentGene.name.toUpperCase()));
                                    currentGene.name = currentGene.name;
                                    network.genes.push(currentGene);
                                }
                            }
                        } catch (err) {
                            sourceGene = currentSheet.data[0][column];
                            targetGene = currentSheet.data[row][0];
                            addError(network, errorList.corruptGeneError(row, column));
                            return network;
                        }
                    } else { // If we're within the matrix and lookin' at the data...
                        try {
                            if (currentSheet.data[row][column] === undefined) {
                                // SHOULD BE: addError(network, errorList.missingValueError(row, column));
                                addWarning(network, warningsList.invalidMatrixDataWarning(row, column));
                            } else if (isNaN(+("" + currentSheet.data[row][column])) || typeof currentSheet.data[row][column] !== "number") {
                                addError(network, errorList.dataTypeError(row, column));
                                return network;
                            } else {
                                if (currentSheet.data[row][column] !== 0) { // We only care about non-zero values
                                    // Grab the source and target genes' names
                                    sourceGene = currentSheet.data[0][column];
                                    targetGene = currentSheet.data[row][0];
                                    if (sourceGene === undefined || targetGene === undefined) {
                                        addWarning(network, warningsList.randomDataWarning("undefined", row, column));
                                    } else if ((isNaN(sourceGene) && typeof sourceGene !== "string") || (isNaN(targetGene) && typeof targetGene !== "string")) {
                                        addWarning(network, warningsList.randomDataWarning("NaN", row, column));
                                    } else {
                                        // Grab the source and target genes' numbers
                                        sourceGeneNumber = genesList.indexOf(sourceGene.toUpperCase());
                                        targetGeneNumber = genesList.indexOf(targetGene.toUpperCase());
                                        currentLink = {source: sourceGeneNumber, target: targetGeneNumber, value: currentSheet.data[row][column]};
                                        // Here we set the properties of the current link before we push them to the network
                                        if (network.sheetType === "weighted") {
                                            if (currentLink.value > 0) { // If it's a positive number, mark it as an activator
                                                currentLink.type = "arrowhead";
                                                currentLink.stroke = "MediumVioletRed";
                                                network.positiveWeights.push(currentLink.value);
                                            } else { // if it's a negative number, mark it as a repressor
                                                currentLink.type = "repressor";
                                                currentLink.stroke = "DarkTurquoise";
                                                network.negativeWeights.push(currentLink.value);
                                            }
                                          } else if (network.sheetType === "unweighted") {
                                            currentLink.type = "arrowhead";
                                            currentLink.stroke = "black";
                                            if (currentLink.value !== 1) {
                                                addWarning(network, warningsList.incorrectlyNamedSheetWarning());
                                                currentLink.value = 1;
                                            }
                                            network.positiveWeights.push(currentLink.value);
                                        }
                                        network.links.push(currentLink);
                                    }
                                }
                            }

                        } catch (err) {
                            addError(network, errorList.missingValueError(row, column));
                            // SHOULD BE: addError(network, errorList.unknownFileError);
                            return network;
                        }
                    }
                    column++; // Let's move on to the next column!
                } // Once we finish with the current row...
                column = 0; // let's go back to column 0 on the next row!
            } catch (err) {
                // We only get here if something goes drastically wrong. We don't want to get here.
                addError(network, errorList.unknownError);
                return network;
            }
        }
    }

  // Move on to semanticChecker.


  // We sort them here because gene order is not relevant before this point
  // Sorting them now means duplicates will be right next to each other
    sourceGenes.sort();
    targetGenes.sort();

  // syntactic duplicate checker for both columns and rows
    checkDuplicates(network.errors, sourceGenes, targetGenes);

  // NOTE: Temporarily commented out pending resolution of #474, and other related issues
  // try {
  //   network.graphStatisticsReport = graphStatisticsReport(network);
  // } catch (err) {
  //   console.log ("Graph statistics report failed to be complete.");
  // }
    return semanticChecker(network);
};

var processGRNmap = function (path, res, app) {
    var sheet;
    var network;

    helpers.attachCorsHeader(res, app);

    try {
        sheet = xlsx.parse(path);
    } catch (err) {
        return res.json(400, "Unable to read input. The file may be corrupt.");
    }

    helpers.attachFileHeaders(res, path);
    network = parseSheet(sheet);

    return (network.errors.length === 0) ?
    // If all looks well, return the network with an all clear
    res.json(network) :
    // If all does not look well, return the network with an error 400
    res.json(400, network);
};

var grnSightToCytoscape = function (network) {
    var result = [];
    network.genes.forEach(function (gene) {
        result.push({
            data: {
                id: gene.name
            }
        });
    });

    network.links.forEach(function (link) {
        var sourceGene = network.genes[link.source];
        var targetGene = network.genes[link.target];
        result.push({
            data: {
                id: sourceGene.name + targetGene.name,
                source: sourceGene.name,
                target: targetGene.name
            }
        });
    });

    return result;
};

/* NOTE: See above. Commented out until resolution of #474
var graphStatisticsReport = function(network)  {
    var betweennessCentrality = [];
    var shortestPath = [];
    var cytoscapeElements = grnSightToCytoscape(network);

    var cy = cytoscape({
        headless: true,
        elements: cytoscapeElements
    });

    for (var i = 0; i < network.genes.length; i++) {
        var bc = cy.$().bc();
        betweennessCentrality.push({
            gene: network.genes[i],
            betweennessCentrality: bc.betweenness("#" + network.genes[i].name, null, true)
        });

        var dijkstra = cy.elements().dijkstra("#" + network.genes[i].name, null, true);

        for (var j = 0; j < network.genes.length; j++) {
            shortestPath.push({
                source: network.genes[i].name,
                pathData: {
                    target: network.genes[j].name,
                    shortestPath: dijkstra.distanceTo("#" + network.genes[j].name, null, true)
                }
            });
        }
    }
    return {
        betweennessCentrality: betweennessCentrality,
        shortestPath: shortestPath
    };
};
*/

module.exports = function (app) {
    if (app) {

    // parse the incoming form data, then parse the spreadsheet. Finally, send back json.
        app.post("/upload", function (req, res) {
      // TODO: Add file validation
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
                    return res.json(400, "This file cannot be loaded because:<br><br> The file is not in a format GRNsight can read." +
            "<br>Please select an Excel Workbook (.xlsx) file. Note that Excel 97-2003 Workbook (.xls) files are not " +
            " able to be read by GRNsight. <br><br>SIF and GraphML files can be loaded using the importer under File > Import." +
            " Additional information about file types that GRNsight supports is in the Documentation.");
                }

                return processGRNmap(input, res, app);
            });
        });

        // Load the demos
        app.get("/demo/unweighted", function (req, res) {
            return processGRNmap("test-files/demo-files/21-genes_50-edges_Dahlquist-data_input.xlsx", res, app);
        });

        app.get("/demo/weighted", function (req, res) {
            return processGRNmap("test-files/demo-files/21-genes_50-edges_Dahlquist-data_estimation_output.xlsx", res, app);
        });

        app.get("/demo/schadeInput", function (req, res) {
            return processGRNmap("test-files/demo-files/21-genes_31-edges_Schade-data_input.xlsx", res, app);
        });

        app.get("/demo/schadeOutput", function (req, res) {
            return processGRNmap("test-files/demo-files/21-genes_31-edges_Schade-data_estimation_output.xlsx", res, app);
        });
    }

    // exporting parseSheet for use in testing. Do not remove!
    return {
        parseSheet: parseSheet,
        grnSightToCytoscape: grnSightToCytoscape
    };
};
