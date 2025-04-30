// var multiparty = require("multiparty");
// var path = require("path");
// var demoWorkbooks = require(__dirname + "/demo-workbooks");

const { NETWORK_PPI_MODE, NETWORK_GRN_MODE, CELL_A1_GRN, CELL_A1_PPI } = require("./constants");
const { initWorkbook } = require("./helpers");

var semanticChecker = require(__dirname + "/semantic-checker");

var constants = require(__dirname + "/workbook-constants");

// const NETWORK_SHEET_NAMES = ["network", "network_optimized_weights"];

// const isNetworkSheet = (sheetName) => {
//     return NETWORK_SHEET_NAMES.some(function (network) {
//         return (sheetName.toLowerCase() === network);
//     });
// };
// Currently only going to number 76 because currently the network errors out at 75+ genes.

var addMessageToArray = function (messageArray, message) {
    messageArray.push(message);
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

var checkDuplicates = function (errorArray, sourceGenes, targetGenes) {
    // Run through the source genes and check if the gene in slot i is the same as the one next to it
    for (var i = 0; i < sourceGenes.length - 1; i++) {
        if (sourceGenes[i] === sourceGenes[i + 1]) {
            errorArray.push(constants.errors.duplicateGeneError("source", sourceGenes[i]));
        }
    }
    // Run through the target genes and check if the gene in slot j is the same as the one next to it
    for (var j = 0; j < targetGenes.length - 1; j++) {
        if (targetGenes[j] === targetGenes[j + 1]) {
            errorArray.push(constants.errors.duplicateGeneError("target", targetGenes[j]));
        }
    }
};

var addTargetGene = function (workbook, sheet, row, targetGenes, genesList) {
    let currentGene = { name: sheet.data[row][0] };
    if (currentGene.name === undefined) {
        addWarning(workbook, constants.warnings.missingTargetGeneWarning(row, 0));
    } else if (isNaN(currentGene.name) && typeof currentGene.name !== "string") {
        addWarning(workbook, constants.warnings.missingTargetGeneWarning(row, 0));
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
            workbook.genes.push(currentGene);
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
    var rowData = [];

    // check for “cols regulators/rows targets” in cell A1
    let cellA1 = "";
    try {
        cellA1 = sheet.data[0][0];
    } catch (err) {
        const row = 0;
        const column = 0;
        addError(network, constants.errors.missingValueError(row, column));
        return network;
    }

    // TODO There are now 2 valid values for cellA1. One indicates GRN, the other is PPI.
    // If neither, then we continue with the warning.

    // Depending on the value of cellA1, we want to make a new property `networkType` which
    // will indicate the network type. THe web app then reads this to decide what to do next.
    if (cellA1 !== CELL_A1_GRN && cellA1 !== CELL_A1_PPI) {
        addWarning(network, constants.warnings.incorrectCellA1WorkbookWarning(sheet.name));
    }

    // Get Source Genes
    for (let i = 1; i <= sheet.data[0].slice(1).length; i++) {
        currentGene = { name: sheet.data[0][i] };
        if (currentGene.name === undefined) {
            addWarning(network, constants.warnings.missingSourceGeneWarning(0, i));
        } else if (isNaN(currentGene.name) && typeof currentGene.name !== "string") {
            addWarning(network, constants.warnings.missingSourceGeneWarning(0, i));
        } else {
            // set currentGeneName to a String so toUpperCase doesn't mess up
            currentGene.name = currentGene.name.toString();
            sourceGenes.push(String(currentGene.name.toUpperCase()));
            genesList.push(String(currentGene.name.toUpperCase()));
            network.genes.push(currentGene);
        }
    }
    // Set columnCount to undefineds in each column equal to the length of the gene names
    columnChecker = new Array(sheet.data[0].length).fill(0);

    for (var row = 0, column = 1; row < sheet.data.length; row++) {
        if (sheet.data[row].length === 0) {
            // if the current row is empty
            if (addError(network, constants.errors.emptyRowError(row)) === false) {
                return network;
            }
        } else if (sheet.data[row].length === 1) {
            addTargetGene(network, sheet, row, targetGenes, genesList);
            rowData.push(row);
        } else {
            // if the row has data...
            // Genes found when row = 0 are targets. Genes found when column = 0 are source genes.
            // We set column = 1 in the for loop so it skips row 0 column 0, since that contains no matrix data.
            // Yes, the rows and columns use array numbering. That is, they start at 0, not 1.
            try {
                // This prevents the server from crashing if something goes wrong anywhere in here
                if (sheet.data[row].length < sheet.data[0].length) {
                    for (let i = sheet.data[row].length - 1; i < sheet.data[0].length - 1; i++) {
                        columnChecker[i]++;
                        addWarning(network, constants.warnings.invalidMatrixDataWarning(row, i));
                    }
                }
                while (column < sheet.data[row].length) {
                    // While we haven't gone through all of the columns in this row...
                    if (row !== 0) {
                        // skip the source genes
                        if (column === 0) {
                            // These genes are the target genes
                            try {
                                addTargetGene(network, sheet, row, targetGenes, genesList);
                            } catch (err) {
                                sourceGene = sheet.data[0][column];
                                targetGene = sheet.data[row][0];
                                addError(network, constants.errors.corruptGeneError(row, column));
                                return network;
                            }
                        } else {
                            // If we're within the matrix and lookin' at the data...
                            try {
                                if (sheet.data[row][column] === undefined) {
                                    // SHOULD BE: addError(network, constants.errors.missingValueError(row, column));
                                    columnChecker[column - 1]++;
                                    addWarning(
                                        network,
                                        constants.warnings.invalidMatrixDataWarning(row, column)
                                    );
                                } else if (
                                    isNaN(+("" + sheet.data[row][column])) ||
                                    typeof sheet.data[row][column] !== "number"
                                ) {
                                    addError(network, constants.errors.dataTypeError(row, column));
                                    return network;
                                } else {
                                    // columnChecker[column - 1] = columnChecker[column - 1]++;
                                    if (sheet.data[row][column] !== 0) {
                                        // We only care about non-zero values
                                        // Grab the source and target genes' names
                                        sourceGene = sheet.data[0][column];
                                        targetGene = sheet.data[row][0];
                                        if (sourceGene === undefined || targetGene === undefined) {
                                            addWarning(
                                                network,
                                                constants.warnings.randomDataWarning(
                                                    "undefined",
                                                    row,
                                                    column
                                                )
                                            );
                                        } else if (
                                            (isNaN(sourceGene) && typeof sourceGene !== "string") ||
                                            (isNaN(targetGene) && typeof targetGene !== "string")
                                        ) {
                                            addWarning(
                                                network,
                                                constants.warnings.randomDataWarning(
                                                    "NaN",
                                                    row,
                                                    column
                                                )
                                            );
                                        } else {
                                            // Grab the source and target genes' numbers
                                            sourceGeneNumber = genesList.indexOf(
                                                sourceGene.toString().toUpperCase()
                                            );
                                            targetGeneNumber = genesList.indexOf(
                                                targetGene.toString().toUpperCase()
                                            );
                                            currentLink = {
                                                source: sourceGeneNumber,
                                                target: targetGeneNumber,
                                                value: sheet.data[row][column],
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
                                                } else {
                                                    // if it's a negative number, mark it as a repressor
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
                                                    addWarning(
                                                        network,
                                                        constants.warnings.incorrectlyNamedSheetWarning()
                                                    );
                                                    currentLink.value = 1;
                                                }
                                                network.positiveWeights.push(currentLink.value);
                                            }
                                            network.links.push(currentLink);
                                        }
                                    }
                                }
                            } catch (err) {
                                addError(network, constants.errors.missingValueError(row, column));
                                // SHOULD BE: addError(network, constants.errors.unknownFileError);
                                return network;
                            }
                        }
                    }
                    column++; // Let's move on to the next column!
                } // Once we finish with the current row...
                if (column < sourceGenes.length) {
                    for (let x = column; x < sourceGenes.length - 1; x++) {
                        columnChecker[column] = columnChecker[column]++;
                    }
                }
                column = 0; // let's go back to column 0 on the next row!
            } catch (err) {
                // We only get here if something goes drastically wrong. We don't want to get here.
                addError(network, constants.errors.unknownError);
                return network;
            }
        }
    }

    if (rowData.length === sheet.data.length - 1) {
        addError(network, constants.errors.emptyMatrixDataError(sheet.name));
    } else {
        for (let x of rowData) {
            addError(network, constants.errors.emptyRowDataError(x, sheet.name));
        }
    }

    for (var i = 0; i < columnChecker.length; i++) {
        if (columnChecker[i] >= sheet.data.length - 1) {
            if (sheet.data[0][i + 1] === undefined) {
                addError(network, constants.errors.emptyColumnError(i + 1, sheet.name));
            } else {
                addError(network, constants.errors.emptyColumnDataError(i + 1, sheet.name));
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

/*
 * This method detect the network type of the workbook file either grn or protein-protein-physical-interactions
 * If cellA1 = "cols regulators/ row targets" -> workbookType = grn
 * If cellA1 = "cols protein1/ rows protein2" -> workbookType = "protein-protein-physical-interaction"
 * else undefined
 */

exports.workbookType = function (workbookFile) {
    let workbookType;
    for (const sheet of workbookFile) {
        if (sheet.name.toLowerCase() === "network") {
            const cellA1 = sheet.data[0][0];

            if (cellA1 === CELL_A1_GRN) {
                workbookType = NETWORK_GRN_MODE;
            } else if (cellA1 === CELL_A1_PPI) {
                workbookType = NETWORK_PPI_MODE;
            } else {
                workbookType = undefined;
            }
            break;
        }
    }
    return workbookType;
};

exports.networks = function (workbookFile) {
    const networks = {
        network: {},
        networkOptimizedWeights: {},
        networkWeights: {},
    };

    for (const element of workbookFile) {
        // === 'network' for backwards compatibility of test files
        if (element.name.toLowerCase() === "network") {
            // Here we have found a network sheet containing simple data. We keep looking
            // in case there is also a network sheet with optimized weights
            networks.network = parseNetworkSheet(
                element,
                initWorkbook({ sheetType: "unweighted" })
            );
        } else if (element.name.toLowerCase() === "network_optimized_weights") {
            // We found a network sheet with optimized weights, which is the ideal data source.
            networks.networkOptimizedWeights = parseNetworkSheet(
                element,
                initWorkbook({ sheetType: "weighted" })
            );
        } else if (element.name.toLowerCase() === "network_weights") {
            // We found a network_weights sheet to preserve existing network type sheet data
            networks.networkWeights = parseNetworkSheet(
                element,
                initWorkbook({ sheetType: "weighted" })
            );
        }
    }

    if (
        Object.keys(networks.network).length === 0 &&
        Object.keys(networks.networkOptimizedWeights).length === 0
    ) {
        networks.network = initWorkbook({ sheetType: "unweighted" });
        addError(networks.network, constants.errors.missingNetworkError);
    }
    return networks;
};
