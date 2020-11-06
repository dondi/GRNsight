// var multiparty = require("multiparty");
// var path = require("path");
// var demoNetworks = require(__dirname + "/demo-networks");

var semanticChecker = require(__dirname + "/semantic-checker");


// const NETWORK_SHEET_NAMES = ["network", "network_optimized_weights"];

// const isNetworkSheet = (sheetName) => {
//     return NETWORK_SHEET_NAMES.some(function (network) {
//         return (sheetName.toLowerCase() === network);
//     });
// };
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
        suggestedFix: "Please select another file, or rename the sheet containing the adjacency matrix accordingly. \
        Please refer to the " + "<a href='http://dondi.github.io/GRNsight/documentation.html#section1' \
        target='_blank'>Documentation page</a> for more information."
    },

    corruptGeneError: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            errorCode: "CORRUPT_GENE",
            possibleCause: `The gene name in cell ${colLetter} ${rowNum} appears to be invalid.`,
            suggestedFix: "Please fix the error and try uploading again."
        };
    },

    missingValueError: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            errorCode: "MISSING_VALUE",
            possibleCause: `The value in the cell ${colLetter} ${rowNum} 
            in the adjacency matrix appears to have a missing value.`,
            suggestedFix: "Please ensure that all cells have a value, then upload the file again."
        };
    },


    duplicateGeneError: function (geneType, geneName) {
        return {
            errorCode: "DUPLICATE_GENE",
            possibleCause: `There exists a duplicate for ${geneType} gene ${geneName}.`,
            suggestedFix: "Please remove the duplicate gene and submit again."
        };
    },

    dataTypeError: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            errorCode: "INVALID_CELL_DATA_TYPE",
            possibleCause: `The value in cell ${colLetter} ${rowNum} is not a number.`,
            suggestedFix: "Please ensure all values in the data matrix are numbers and try again."
        };
    },

    emptyRowError: function (row) {
        var rowNum = row + 1;
        return {
            errorCode: "EMPTY_ROW",
            possibleCause: `Row ${rowNum} does not contain any data.`,
            suggestedFix: `Please ensure all rows contain data and all empty rows are removed. 
            Also, please ensure that no extraneous data is outside of the matrix, 
            as this may cause this error.`
        };
    },

    // Start Here

    emptyColumnError: function (column, sheetName) {
        var columnLetter = numbersToLetters[column];
        return {
            errorCode: "EMPTY_COLUMN",
            possibleCause: `There is an empty column in the ${sheetName} sheet. It is located at column
            ${columnLetter}.`,
            suggestedFix: "Delete empty column, or populate with data."
        };
    },

    emptyRowDataError: function (row, sheetName) {
        var rowNum = row + 1;
        return {
            errorCode: "EMPTY_ROW_DATA",
            possibleCause: `Row ${rowNum}, in the ${sheetName} sheet, was found to contain no data.`,
            suggestedFix: "Populate empty row with data."
        };
    },
    emptyColumnDataError: function (column, sheetName) {
        var columnLetter = numbersToLetters[column];
        return {
            errorCode: "EMPTY_COLUMN_DATA",
            possibleCause: `Column ${columnLetter}, in the ${sheetName} sheet, was found to contain no data.`,
            suggestedFix: "Populate empty column with data."
        };
    },
    emptyMatrixDataError: function (sheetName) {
        return {
            errorCode: "EMPTY_MATRIX_DATA",
            possibleCause: `The ${sheetName} sheet was found to contain no data in the adjacency matrix.`,
            suggestedFix: "Populate empty matrix with data."
        };
    },

    // End Here

    outsideCellError: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            errorCode: "EMPTY_CELL",
            possibleCause: `The cell at ${colLetter} ${rowNum} contains data that is outside the matrix.`,
            suggestedFix: "Please remove all extraneous data from outside the matrix and ensure matrix is correct"
        };
    },

    errorsCountError: {
        errorCode: "ERRORS_OVERLOAD",
        possibleCause: "This network has over 20 errors.",
        suggestedFix: "Please check the format of your spreadsheet with the guidelines outlined on the" +
            "Documentation page and try again. If you fix these errors and try to upload again, there may be " +
            "further errors detected. As a general approach for fixing the errors, consider copying and " +
            "pasting just your adjacency matrix into a fresh Excel Workbook and saving it."
    },

    warningsCountError: {
        errorCode: "WARNINGS_OVERLOAD",
        possibleCause: "This network has over 75 warnings.",
        suggestedFix: "Please check the format of your spreadsheet with the guidelines outlined on the" +
            " Documentation page and try again. If you fix these errors and try to upload again, there may be " +
            " further errors detected. As a general approach for fixing the errors, consider copying and " +
            " pasting just your adjacency matrix into a fresh Excel Workbook and saving it."
    },

    unknownError: {
        errorCode: "UNKNOWN_ERROR",
        possibleCause: "An unexpected error occurred.",
        suggestedFix: "Please contact the GRNsight team at kdahlquist@lmu.edu, \
        and attach the spreadsheet you attempted to upload."
    },

};


// This is the list of warnings.
// The graph will still load if warnings are detected, but these will be reported to the user.
var warningsList = {
    incorrectCellA1NetworkWarning: function (sheetName) {
        return {
            warningCode: "MISLABELED_NETWORK_CELL_A1",
            errorDescription: `The top left cell of the ${sheetName} sheet is mislabeled.
            Replace the incorrect label with 'cols regulators/rows targets' exactly.`
        };
    },
    missingSourceGeneWarning: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            warningCode: "MISSING_SOURCE",
            errorDescription: `A source gene name is missing in cell ${colLetter}${rowNum}.`
        };
    },

    missingTargetGeneWarning: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            warningCode: "MISSING_TARGET",
            errorDescription: `A target gene name is missing in cell ${colLetter}${rowNum}.`
        };
    },

    invalidMatrixDataWarning: function (row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            warningCode: "INVALID_DATA",
            errorDescription: `The value in cell ${colLetter}${rowNum}, is undefined.`
        };
    },

    randomDataWarning: function (type, row, column) {
        var colLetter = numbersToLetters[column];
        var rowNum = row + 1;
        return {
            warningCode: "RANDOM_DATA",
            errorDescription: `The value in cell ${colLetter}${rowNum}, 
            has a corresponding source and/or target gene that is detected as ${type}.`
        };
    },

    networkSizeWarning: function (genesLength, edgesLength) {
        return {
            warningCode: "INVALID_NETWORK_SIZE",
            errorDescription: `Your network has ${genesLength} genes, and ${edgesLength} 
                edges. Please note that networks are recommended to have less than 50 genes and 100 edges.`
        };
    },

    incorrectlyNamedSheetWarning: {
        warningCode: "INCORRECTLY_NAMED_SHEET",
        errorDescription: "The uploaded file appears to contain a weighted network, but contains no \
             'network_optimized_weights' sheet. A weighted network must be contained in a sheet called \
             'network_optimized_weights' in order to be drawn as a weighted graph. \
             Please check if the sheet(s) in the uploaded spreadsheet have been named properly."
    },

    missingExpressionSheetWarning: {
        warningCode: "MISSING_EXPRESSION_SHEET",
        errorDescription: "_log2_expression or _log2_optimized_expression worksheet was \
        not detected. The network graph will display without node coloring. If you want \
        the nodes to be colored with expression data, you can upload your own expression \
        data by adding one or more of those worksheets to your Excel workbook or select \
        from data in GRNsight's Expression Database, found in the Node menu or panel."
    },

    noSpeciesInformationDetected: {
        warningCode: "MISSING_SPECIES_INFORMATION",
        errorDescription: "No species information was detected in your input file." +
            " GRNsight defaults to Saccharomyces cerevisiae. You can change the species" +
            " selection in the Species menu or panel."
    },

    unknownSpeciesDetected: function (networkSpecies, networkTaxon) {
        return {
            warningCode: "UNKNOWN_SPECIES_DETECTED",
            errorDescription: "GRNsight detected the species " + networkSpecies +
                " and the taxon " + networkTaxon + " in your input file." +
                " This is not one of the supported species, or was formatted incorrectly" +
                " You can change the species selection in the Species menu or panel."
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

var checkDuplicates = function (errorArray, sourceGenes, targetGenes) {
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

var addTargetGene = function (network, sheet, row, targetGenes, genesList) {
    let currentGene = { name: sheet.data[row][0] };
    if (currentGene.name === undefined) {
        addWarning(network, warningsList.missingTargetGeneWarning(row, 0));
    } else if (isNaN(currentGene.name) && typeof currentGene.name !== "string") {
        addWarning(network, warningsList.missingTargetGeneWarning(row, 0));
    } else {
        // set currentGeneName to a String so toUpperCase doesn't mess up
        currentGene.name = currentGene.name.toString();
        targetGenes.push(String(currentGene.name.toUpperCase()));
        // Here we check to see if we've already seen the gene name that we're about to store
        // Genes may or may not be present due to asymmetry or unorderedness
        // If it's in the genesList, it will return a number > 0, so we won't store it
        // If it's not there, it will return -1, so we add it.
        if (genesList.indexOf(String(currentGene.name.toUpperCase())) === -1) {
            genesList.push(String(currentGene.name.toUpperCase()));
            network.genes.push(currentGene);
        }
    }
};

var parseNetworkSheet = function (sheet, network) {
    var currentLink;
    var currentGene;
    var sourceGene;
    var targetGene;
    var sourceGeneNumber;
    var targetGeneNumber;
    var genesList = []; // This will contain all of the genes in upper case for use in error checking
    var sourceGenes = [];
    var targetGenes = [];
    var columnChecker = [];

    // check for “cols regulators/rows targets” in cell A1
    const cellA1 = sheet.data[0][0];
    if (cellA1 !== "cols regulators/rows targets") {
        addWarning(network, warningsList.incorrectCellA1NetworkWarning(sheet.name));
    }

    // Get Source Genes
    for (let i = 1; i <= sheet.data[0].slice(1).length; i++) {
        currentGene = { name: sheet.data[0][i] };
        if (currentGene.name === undefined) {
            addWarning(network, warningsList.missingSourceGeneWarning(0, i));
        } else if (isNaN(currentGene.name) && typeof currentGene.name !== "string") {
            addWarning(network, warningsList.missingSourceGeneWarning(0, i));
        } else {
            // set currentGeneName to a String so toUpperCase doesn't mess up
            currentGene.name = currentGene.name.toString();
            sourceGenes.push(String(currentGene.name.toUpperCase()));
            genesList.push(String(currentGene.name.toUpperCase()));
            network.genes.push(currentGene);
        }
    }
    // Set columnCount to undefineds in each column equal to the length of the gene names
    columnChecker = new Array(sourceGenes.length).fill(0);
    let rowData = [];

    for (var row = 0, column = 1; row < sheet.data.length; row++) {
        if (sheet.data[row].length === 0) { // if the current row is empty
            if (addError(network, errorList.emptyRowError(row)) === false) {
                return network;
            }
        } else if (sheet.data[row].length === 1) {
            addTargetGene(network, sheet, row, targetGenes, genesList);
            rowData.push(row);
        } else { // if the row has data...
            // Genes found when row = 0 are targets. Genes found when column = 0 are source genes.
            // We set column = 1 in the for loop so it skips row 0 column 0, since that contains no matrix data.
            // Yes, the rows and columns use array numbering. That is, they start at 0, not 1.
            try { // This prevents the server from crashing if something goes wrong anywhere in here
                while (column < sheet.data[row].length) {
                    // While we haven't gone through all of the columns in this row...
                    if (row !== 0) { // skip the source genes
                        if (column === 0) {
                            // These genes are the target genes
                            try {
                                addTargetGene(network, sheet, row, targetGenes, genesList);
                            } catch (err) {
                                sourceGene = sheet.data[0][column];
                                targetGene = sheet.data[row][0];
                                addError(network, errorList.corruptGeneError(row, column));
                                return network;
                            }
                        } else { // If we're within the matrix and lookin' at the data...
                            try {
                                if (sheet.data[row][column] === undefined) {
                                    // SHOULD BE: addError(network, errorList.missingValueError(row, column));
                                    columnChecker[column - 1] = columnChecker[column - 1]++;
                                    addWarning(network, warningsList.invalidMatrixDataWarning(row, column));
                                } else if (isNaN(+("" + sheet.data[row][column])) ||
                                    typeof sheet.data[row][column] !== "number") {
                                    addError(network, errorList.dataTypeError(row, column));
                                    return network;
                                } else {
                                    // columnChecker[column - 1] = columnChecker[column - 1]++;
                                    if (sheet.data[row][column] !== 0) { // We only care about non-zero values
                                        // Grab the source and target genes' names
                                        sourceGene = sheet.data[0][column];
                                        targetGene = sheet.data[row][0];
                                        if (sourceGene === undefined || targetGene === undefined) {
                                            addWarning(network, warningsList.randomDataWarning("undefined",
                                                row, column));
                                        } else if ((isNaN(sourceGene) && typeof sourceGene !== "string") ||
                                            (isNaN(targetGene) && typeof targetGene !== "string")) {
                                            addWarning(network, warningsList.randomDataWarning("NaN", row, column));
                                        } else {
                                            // Grab the source and target genes' numbers
                                            sourceGeneNumber = genesList.indexOf(sourceGene.toString().toUpperCase());
                                            targetGeneNumber = genesList.indexOf(targetGene.toString().toUpperCase());
                                            currentLink = {
                                                source: sourceGeneNumber, target: targetGeneNumber,
                                                value: sheet.data[row][column]
                                            };
                                            // Here we set the properties of the current link
                                            // before we push them to the network
                                            if (network.sheetType === "weighted") {
                                                if (currentLink.value > 0) {
                                                    // If it's a positive number, mark it as an activator
                                                    currentLink.type = "arrowhead";
                                                    // GRNsight v1 magenta edge color
                                                    // currentLink.stroke = "MediumVioletRed";
                                                    // Node coloring-consistent red edge color
                                                    currentLink.stroke = "rgb(195, 61, 61)";
                                                    network.positiveWeights.push(currentLink.value);
                                                } else { // if it's a negative number, mark it as a repressor
                                                    currentLink.type = "repressor";
                                                    // currentLink.stroke = "DarkTurquoise";
                                                    // GRNsight v1 cyan edge color
                                                    // Node coloring-consistent blue edge color
                                                    currentLink.stroke = "rgb(51, 124, 183)";
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

    if (rowData.length === sheet.data.length - 1) {
        addError(network, errorList.emptyMatrixDataError(sheet.name));
    } else {
        for (let x of rowData) {
            addError(network, errorList.emptyRowDataError(x, sheet.name));
        }
    }

    for (var i = 0; i < columnChecker.length; i++) {
        if (columnChecker[i] === targetGenes.length) {
            addError(network, errorList.emptyColumnError(i + 1, sheet.name));
            return network;
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


module.exports = function (workbook) {
    const network = {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: "unweighted",
    };
    var networkSheet;

    for (let i = 0; i < workbook.length; i++) {
        if (workbook[i].name.toLowerCase() === "network") {
            // Here we have found a sheet containing simple data. We keep looking
            // in case there is also a sheet with optimized weights
            networkSheet = workbook[i];
        } else if (workbook[i].name.toLowerCase() === "network_optimized_weights") {
            // We found a sheet with optimized weights, which is the ideal data source.
            // So we stop looking.
            networkSheet = workbook[i];
            network.sheetType = "weighted";
            break;
        }
    }

    if (networkSheet) {
        return parseNetworkSheet(networkSheet, network);
    } else {
        addError(network, errorList.missingNetworkError);
        return network;
    }
};