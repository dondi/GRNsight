var multiparty = require("multiparty");
var xlsx = require("node-xlsx");
var path = require("path");
var parseAdditionalSheets = require(__dirname + "/additional-sheet-parser");
var parseExpressionSheets = require(__dirname + "/expression-sheet-parser");
var parseNetworkSheet = require(__dirname + "/network-sheet-parser");
var demoNetworks = require(__dirname + "/demo-networks");
// var cytoscape = require("cytoscape"); //NOTE: Commented out for issue #474

var helpers = require(__dirname + "/helpers");

// Currently only going to number 76 because currently the network errors out at 75+ genes.
var numbersToLetters = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H", 8: "I", 9:"J", 10:"K", 11:"L",
    12:"M", 13:"N", 14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T", 20:"U", 21:"V", 22:"W", 23:"X", 24:"Y",
    25:"Z", 26:"AA", 27:"AB", 28:"AC", 29:"AD", 30:"AE", 31:"AF", 32:"AG", 33:"AH", 34:"AI", 35:"AJ", 36:"AK",
    37:"AL", 38:"AM", 39:"AN", 40:"AO", 41:"AP", 42:"AQ", 43:"AR", 44:"AS", 45:"AT", 46:"AU", 47:"AV", 48:"AW",
    49:"AX", 51:"AY", 52:"AZ", 53:"BA", 54:"BB", 55:"BC", 56:"BD", 57:"BE", 58:"BF", 59:"BG", 60:"BH", 61:"BI",
    62:"BJ", 63:"BK", 64:"BL", 65:"BM", 66:"BN", 67:"BO", 68:"BP", 69:"BQ", 70:"BR", 71:"BS", 72:"BT", 73:"BU",
    74:"BV", 75:"BW", 76:"BX"};

var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

var SPECIES = ["Arabidopsis thaliana", "Caenorhabditis elegans", "Drosophila melanogaster",
    "Homo sapiens", "Mus musculus", "Saccharomyces cerevisiae"];

var TAXON_ID = ["3702", "6293", "7227", "9606", "10090", "4932", "559292"];

var isExpressionSheet = function (sheetName) {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.includes(suffix);
    });
};

var doesSpeciesExist = function (speciesInfo) {
    for (var s in SPECIES) {
        if (SPECIES[s] === speciesInfo) {
            return true;
        }
    }
    for (var t in TAXON_ID) {
        if ( TAXON_ID[t] === speciesInfo) {
            return true;
        }
    }
    return false;
};

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

    geneMismatchError: function (sheetName) {
        return {
            errorCode: "GENE_MISMATCH",
            possibleCause: `Gene names in column A of the "${sheetName}" sheet do not 
            match the order of those in the network sheet`,
            suggestedFix: `Please ensure that the gene names are in the same order 
            as those in both the "network" sheet and the 
            "network_optimized_weights" sheet.`
        };
    },

    extraGeneNamesError: function (sheetName) {
        return {
            errorCode: "EXTRA_GENE_NAME",
            possibleCause: `Gene names in column A of the "${sheetName}" sheet have 
            one or more extra genes than those listed in the network sheet`,
            SuggestedFix: `Please ensure that the genes in the "${sheetName}" sheet are
            the same as the genes in the "network" sheet and the "network_optimized_weights" sheet.`
        };
    },

    missingGeneNamesError: function (sheetName) {
        return {
            errorCode: "MISSING_GENE_NAME",
            possibleCause: `Gene names in column A of the "${sheetName}"
                sheet are missing one or more genes from the network sheet`,
            SuggestedFix: `Please ensure that the genes in the "${sheetName}"
                 are the same as the genes in the "network" sheet and the 
                "network_optimized_weights" sheet.`
        };
    },

};


// This is the list of warnings.
// The graph will still load if warnings are detected, but these will be reported to the user.
var warningsList = {
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

    emptyRowWarning: function (row) {
        var rowNum = row + 1;
        return {
            warningCode: "EMPTY_ROW",
            errorDescription: `Row ${rowNum} was found to contain no data.`
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

var difference = function (setA, setB) {
    let _difference = new Set(setA);
    for (let elemB of setB) {
        if (_difference.has(elemB)) {
            _difference.delete(elemB);
        }
    }
    return _difference;
};

var crossSheetInteractions = function (workbook) {
    var network = parseNetworkSheet(workbook);

    // Parse expression and 2-column data, then add to network object
    // Eventually, will split this up into parsing for each type of sheet.
    var additionalData = parseAdditionalSheets(workbook);

    var expressionData = parseExpressionSheets(workbook);

    // Add errors and warnings from meta sheets
    if (additionalData && additionalData.meta) {
        if (additionalData.meta.errors !== undefined) {
            additionalData.meta.errors.forEach(data => network.errors.push(data));
        }

        if (additionalData.meta.warnings !== undefined) {
            additionalData.meta.warnings.forEach(data => network.warnings.push(data));
        }
    }

    if (additionalData && additionalData.test) {
        // Add errors and warnings from test sheets
        if (additionalData.test.errors !== undefined) {
            additionalData.test.errors.forEach(data => network.errors.push(data));
        }

        if (additionalData.test.warnings !== undefined) {
            additionalData.test.warnings.forEach(data => network.warnings.push(data));
        }
    }

    if (additionalData.meta.species === undefined
    && additionalData.meta.taxon_id === undefined) {
        addWarning(network, warningsList.noSpeciesInformationDetected);
    } else if (!doesSpeciesExist(additionalData.meta.species) &&
    !doesSpeciesExist(additionalData.meta.taxon_id)) {
        addWarning(network, warningsList.unknownSpeciesDetected(additionalData.meta.species,
            additionalData.meta.taxon_id));
    }

    // Add errors and warnings from expression sheets
    // FUTURE IMPROVEMENT: not all expression sheets are specifically named 'wt_log2_expression.'
    // We need to account for all the different possible expression sheet names.
    if (expressionData) {
        if (expressionData.errors !== undefined) {
            expressionData.errors
                .forEach( data => network.errors.push(data));
        }
        if (expressionData.warnings !== undefined) {
            expressionData.warnings
                .forEach( data => network.warnings.push(data));
        }
    }

    if (expressionData && expressionData.expression) {
        if (expressionData.expression.errors !== undefined) {
            expressionData.expression.errors
                .forEach(data => network.errors.push(data));
        }

        if (expressionData.expression.warnings !== undefined) {
            expressionData.expression.warnings
                .forEach(data => network.warnings.push(data));
        }
    }

    if (expressionData && expressionData.expression && expressionData.expression.wt_log2_expression) {
        if (expressionData.expression.wt_log2_expression.errors !== undefined) {
            expressionData.expression.wt_log2_expression.errors
                .forEach(data => network.errors.push(data));
        }

        if (expressionData.expression.wt_log2_expression.warnings !== undefined) {
            expressionData.expression.wt_log2_expression.warnings
                .forEach(data => network.warnings.push(data));
        }
    }

    // Gene Mismatch and Label Error Tests

    workbook.forEach(function (sheet) {
        if (isExpressionSheet(sheet.name)) {
            var tempNetworkGenes = new Set();
            for (let i = 0; i < network.genes.length; i++) {
                tempNetworkGenes.add(network.genes[i].name);
            }
            var tempExpressionGenes = new Set(expressionData.expression[sheet.name].columnGeneNames);
            var extraExpressionGenes = difference(tempExpressionGenes, tempNetworkGenes);
            var extraNetworkGenes = difference(tempNetworkGenes, tempExpressionGenes);

            if (extraExpressionGenes.size === 0 && extraNetworkGenes.size === 0) {
                for (var i = 0; i < network.genes.length; i++) {
                    if (network.genes[i].name !== expressionData.expression[sheet.name].columnGeneNames[i]) {
                        addError(network, errorList.geneMismatchError(sheet.name));
                        break;
                    }
                }
            } else {
                if (extraNetworkGenes.size > 0) {
                    addError(network, errorList.missingGeneNamesError(sheet.name));
                }
                if (extraExpressionGenes.size > 0) {
                    addError(network, errorList.extraGeneNamesError(sheet.name));
                }
            }
        }
    });

    // Integrate the desired properties from the other objects.
    network.meta = additionalData.meta;
    network.test = additionalData.test;
    network.expression = expressionData.expression;
    return network;
};

var processGRNmap = function (path, res, app) {
    var sheet;

    helpers.attachCorsHeader(res, app);

    try {
        sheet = xlsx.parse(path);
    } catch (err) {
        return res.json(400, "Unable to read input. The file may be corrupt.");
    }

    helpers.attachFileHeaders(res, path);

    var network = crossSheetInteractions(sheet);

    return (network.errors.length === 0) ?
        // If all looks well, return the network with an all clear
        res.json(network) :
        // If all does not look well, return the network with an error 400
        res.status(400).json(network);
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
            // TODO: Add file validation (make sure that file is an Excel file)
            (new multiparty.Form()).parse(req, function (err, fields, files) {
                if (err) {
                    return res.json(400, "There was a problem uploading your file. Please try again.");
                }
                var input;
                try {
                    input = files.file[0].path;
                } catch (err) {
                    return res.json(400, "No upload file selected.");
                }

                if (path.extname(input) !== ".xlsx") {
                    return res.json(400, "This file cannot be loaded because:<br><br> The file is \
                        not in a format GRNsight can read." + "<br>Please select an Excel Workbook \
                        (.xlsx) file. Note that Excel 97-2003 Workbook (.xls) files are not " +
                        " able to be read by GRNsight. <br><br>SIF and GraphML files can be loaded \
                        using the importer under File > Import." + " Additional information about file \
                        types that GRNsight supports is in the Documentation.");
                }

                // input.meta holds the species and taxon data
                return processGRNmap(input, res, app);
            });
        });

        // Load the demos
        app.get("/demo/unweighted", function (req, res) {
            return demoNetworks("test-files/demo-files/15-genes_28-edges_db5_Dahlquist-data_input.xlsx", res, app);
        });

        app.get("/demo/weighted", function (req, res) {
            return demoNetworks("test-files/demo-files/15-genes_28-edges_db5_Dahlquist-data_estimation_output.xlsx",
             res, app);
        });

        app.get("/demo/schadeInput", function (req, res) {
            return demoNetworks("test-files/demo-files/21-genes_31-edges_Schade-data_input.xlsx", res, app);
        });

        app.get("/demo/schadeOutput", function (req, res) {
            return demoNetworks("test-files/demo-files/21-genes_31-edges_Schade-data_estimation_output.xlsx", res, app);
        });
    }

    // exporting parseNetworkSheet for use in testing. Do not remove!
    return {
        grnSightToCytoscape: grnSightToCytoscape,
        processGRNmap : processGRNmap,
        crossSheetInteractions: crossSheetInteractions
    };
};