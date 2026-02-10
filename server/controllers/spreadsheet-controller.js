var multiparty = require("multiparty");
var xlsx = require("node-xlsx");
var path = require("path");
const { NETWORK_GRN_MODE, NETWORK_PPI_MODE } = require("./constants");
var parseAdditionalSheets = require(__dirname + "/additional-sheet-parser");
var parseExpressionSheets = require(__dirname + "/expression-sheet-parser");
var parseNetworkSheet = require(__dirname + "/network-sheet-parser");
var demoWorkbooks = require(__dirname + "/demo-workbooks");
var constants = require(__dirname + "/workbook-constants");
// var cytoscape = require("cytoscape"); //NOTE: Commented out for issue #474

var helpers = require(__dirname + "/helpers");

var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];

var SPECIES = [
    "Arabidopsis thaliana",
    "Caenorhabditis elegans",
    "Drosophila melanogaster",
    "Homo sapiens",
    "Mus musculus",
    "Saccharomyces cerevisiae",
];

const WORKBOOK_TYPES = [NETWORK_GRN_MODE, NETWORK_PPI_MODE];

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
        if (TAXON_ID[t] === speciesInfo) {
            return true;
        }
    }
    return false;
};

var supportWorkbookType = function (type) {
    for (var t in WORKBOOK_TYPES) {
        if (WORKBOOK_TYPES[t] === type) {
            return true;
        }
    }
    return false;
};

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

var difference = function (setA, setB) {
    let _difference = new Set(setA);
    for (let elemB of setB) {
        if (_difference.has(elemB)) {
            _difference.delete(elemB);
        }
    }
    return _difference;
};

var deepClone = function (object, isArray) {
    var clone = isArray ? [] : {};
    if (isArray) {
        for (let i of object) {
            if (i !== null && typeof i === "object") {
                clone.push(deepClone(i, Array.isArray(i)));
            } else {
                clone.push(i);
            }
        }
    } else {
        for (let i in object) {
            if (object[i] !== null && typeof object[i] === "object") {
                clone[i] = deepClone(object[i], Array.isArray(object[i]));
            } else {
                clone[i] = object[i];
            }
        }
    }
    return clone;
};

var crossSheetInteractions = function (workbookFile) {
    var workbook = {};

    // Refactored the parseNetworkSheet function to preserve all network type sheets including "network",
    // "network_optimized_weights",and "network_weights" restructuring workbook object as a result

    var networks = parseNetworkSheet.networks(workbookFile);
    const genes = networks.network.genes.map(gene => gene.name);

    // Parse expression and 2-column data, then add to workbook object
    // Eventually, will split this up into parsing for each type of sheet.
    const additionalData = parseAdditionalSheets(workbookFile, genes);

    var expressionData = parseExpressionSheets(workbookFile);

    if (
        networks &&
        networks.networkOptimizedWeights &&
        typeof networks.networkOptimizedWeights === "object" &&
        Object.keys(networks.networkOptimizedWeights).length > 0
    ) {
        // Base workbook is a clone of the prefered Optimized weights sheet
        workbook = deepClone(networks.networkOptimizedWeights, false);
        // Add errors from network sheet if it exists
        if (
            networks.network &&
            typeof networks.network === "object" &&
            Object.keys(networks.network).length > 0
        ) {
            if (networks.network.errors !== undefined) {
                networks.network.errors.forEach(data => workbook.errors.push(data));
            }

            if (networks.network.warnings !== undefined) {
                networks.network.warnings.forEach(data => workbook.warnings.push(data));
            }
        }
    } else {
        // Set base workbook to a deep copy of the default network if network optimized weights does not exist
        workbook = deepClone(networks.network, false);
    }
    // Add errors and warnings from network weights to preserve the sheet
    if (
        networks.networkWeights &&
        typeof networks.networkWeights === "object" &&
        Object.keys(networks.networkWeights).length > 0
    ) {
        if (networks.networkWeights.errors !== undefined) {
            networks.networkWeights.errors.forEach(data => workbook.errors.push(data));
        }

        if (networks.networkWeights.warnings !== undefined) {
            networks.networkWeights.warnings.forEach(data => workbook.warnings.push(data));
        }
    }

    // Add errors and warnings from meta sheets
    if (additionalData && additionalData.meta) {
        if (additionalData.meta.errors !== undefined) {
            additionalData.meta.errors.forEach(data => workbook.errors.push(data));
        }

        if (additionalData.meta.warnings !== undefined) {
            additionalData.meta.warnings.forEach(data => workbook.warnings.push(data));
        }
    }

    if (additionalData && additionalData.twoColumnSheets) {
        // Add errors and warnings from two column sheets
        for (let sheet in additionalData.twoColumnSheets) {
            additionalData.twoColumnSheets[sheet].errors.forEach(data =>
                workbook.errors.push(data)
            );
        }

        for (let sheet in additionalData.twoColumnSheets) {
            additionalData.twoColumnSheets[sheet].warnings.forEach(data =>
                workbook.warnings.push(data)
            );
        }
    }

    if (additionalData && additionalData.meta2) {
        // Add errors and warnings from two column sheets
        if (additionalData.meta2.errors !== undefined) {
            additionalData.meta2.errors.forEach(data => workbook.errors.push(data));
        }

        if (additionalData.meta2.warnings !== undefined) {
            additionalData.meta2.warnings.forEach(data => workbook.warnings.push(data));
        }
    }

    if (additionalData && additionalData.warnings) {
        workbook.warnings.push(...additionalData.warnings);
    }

    additionalData.meta.data.workbookType = parseNetworkSheet.workbookType(workbookFile);
    if (additionalData.meta.data.workbookType === undefined) {
        addWarning(workbook, constants.warnings.noWorkbookTypeDetected);
        additionalData.meta.data.workbookType = NETWORK_GRN_MODE;
    } else if (!supportWorkbookType(additionalData.meta.data.workbookType)) {
        addWarning(
            workbook,
            constants.warnings.unsupportedWorkbookTypeDetected(
                additionalData.meta.data.workbookType
            )
        );
        additionalData.meta.data.workbookType = NETWORK_GRN_MODE;
    }

    if (
        additionalData.meta.data.species === undefined &&
        additionalData.meta.data.taxon_id === undefined
    ) {
        addWarning(workbook, constants.warnings.noSpeciesInformationDetected);
        additionalData.meta.data.species = "Saccharomyces cerevisiae";
        additionalData.meta.data["taxon_id"] = "559292";
    } else if (
        !doesSpeciesExist(additionalData.meta.data.species) &&
        !doesSpeciesExist(additionalData.meta.data.taxon_id)
    ) {
        addWarning(
            workbook,
            constants.warnings.unknownSpeciesDetected(
                additionalData.meta.data.species,
                additionalData.meta.data.taxon_id
            )
        );
        additionalData.meta.data.species = "Saccharomyces cerevisiae";
        additionalData.meta.data["taxon_id"] = 559292;
    }

    // Add errors and warnings from expression sheets
    // FUTURE IMPROVEMENT: not all expression sheets are specifically named 'wt_log2_expression.'
    // We need to account for all the different possible expression sheet names.
    if (expressionData) {
        if (additionalData.meta.data.workbookType === constants.NETWORK_GRN_MODE) {
            if (
                expressionData["expression"] &&
                Object.keys(expressionData["expression"]).length === 0
            ) {
                addWarning(expressionData, constants.warnings.missingExpressionWarning());
            }
        }
        if (expressionData.errors !== undefined) {
            expressionData.errors.forEach(data => workbook.errors.push(data));
        }
        if (expressionData.warnings !== undefined) {
            expressionData.warnings.forEach(data => workbook.warnings.push(data));
        }
    }

    if (expressionData && expressionData.expression) {
        if (expressionData.expression.errors !== undefined) {
            expressionData.expression.errors.forEach(data => workbook.errors.push(data));
        }

        if (expressionData.expression.warnings !== undefined) {
            expressionData.expression.warnings.forEach(data => workbook.warnings.push(data));
        }
    }

    if (
        expressionData &&
        expressionData.expression &&
        expressionData.expression.wt_log2_expression
    ) {
        if (expressionData.expression.wt_log2_expression.errors !== undefined) {
            expressionData.expression.wt_log2_expression.errors.forEach(data =>
                workbook.errors.push(data)
            );
        }

        if (expressionData.expression.wt_log2_expression.warnings !== undefined) {
            expressionData.expression.wt_log2_expression.warnings.forEach(data =>
                workbook.warnings.push(data)
            );
        }
    }

    // Gene Mismatch and Label Error Tests

    workbookFile.forEach(function (sheet) {
        if (isExpressionSheet(sheet.name)) {
            var tempWorkbookGenes = new Set();
            for (let i = 0; i < workbook.genes.length; i++) {
                tempWorkbookGenes.add(workbook.genes[i].name);
            }
            var tempExpressionGenes = new Set(
                expressionData.expression[sheet.name].columnGeneNames
            );
            var extraExpressionGenes = difference(tempExpressionGenes, tempWorkbookGenes);
            var extraWorkbookGenes = difference(tempWorkbookGenes, tempExpressionGenes);

            if (extraExpressionGenes.size === 0 && extraWorkbookGenes.size === 0) {
                for (var i = 0; i < workbook.genes.length; i++) {
                    if (
                        workbook.genes[i].name !==
                        expressionData.expression[sheet.name].columnGeneNames[i]
                    ) {
                        addError(workbook, constants.errors.geneMismatchError(sheet.name));
                        break;
                    }
                }
            } else {
                if (extraWorkbookGenes.size > 0) {
                    addError(workbook, constants.errors.missingGeneNamesError(sheet.name));
                }
                if (extraExpressionGenes.size > 0) {
                    addError(workbook, constants.errors.extraGeneNamesError(sheet.name));
                }
            }
        }
    });

    const validSheetNames = [
        ...constants.TWO_COL_SHEET_NAMES,
        ...constants.NETWORK_SHEET_NAMES,
        ...constants.OPTIONAL_TWO_COL_SHEET_NAMES,
    ];

    workbookFile.forEach(function (sheet) {
        const isRecognizedSheet =
            validSheetNames.includes(sheet.name) || isExpressionSheet(sheet.name);
        if (!isRecognizedSheet) {
            addWarning(workbook, constants.warnings.unrecognizedSheetWarning(sheet.name));
        }
    });

    // Integrate the desired properties from the other objects.
    workbook.network = networks.network;
    workbook.networkOptimizedWeights = networks.networkOptimizedWeights;
    workbook.networkWeights = networks.networkWeights;
    workbook.meta = additionalData.meta;
    workbook.twoColumnSheets = additionalData.twoColumnSheets;
    workbook.meta2 = additionalData.meta2;
    workbook.expression = expressionData.expression;
    return workbook;
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

    var workbook = crossSheetInteractions(sheet);

    return workbook.errors.length === 0
        ? // If all looks well, return the workbook with an all clear
          res.json(workbook)
        : // If all does not look well, return the workbook with an error 400
          res.status(400).json(workbook);
};

var grnSightToCytoscape = function (workbook) {
    var result = [];
    workbook.genes.forEach(function (gene) {
        result.push({
            data: {
                id: gene.name,
            },
        });
    });

    workbook.links.forEach(function (link) {
        var sourceGene = workbook.genes[link.source];
        var targetGene = workbook.genes[link.target];
        result.push({
            data: {
                id: sourceGene.name + targetGene.name,
                source: sourceGene.name,
                target: targetGene.name,
            },
        });
    });

    return result;
};

/* NOTE: See above. Commented out until resolution of #474
var graphStatisticsReport = function(workbook)  {
    var betweennessCentrality = [];
    var shortestPath = [];
    var cytoscapeElements = grnSightToCytoscape(workbook);
    var cy = cytoscape({
        headless: true,
        elements: cytoscapeElements
    });
    for (var i = 0; i < workbook.genes.length; i++) {
        var bc = cy.$().bc();
        betweennessCentrality.push({
            gene: workbook.genes[i],
            betweennessCentrality: bc.betweenness("#" + workbook.genes[i].name, null, true)
        });
        var dijkstra = cy.elements().dijkstra("#" + workbook.genes[i].name, null, true);
        for (var j = 0; j < workbook.genes.length; j++) {
            shortestPath.push({
                source: workbook.genes[i].name,
                pathData: {
                    target: workbook.genes[j].name,
                    shortestPath: dijkstra.distanceTo("#" + workbook.genes[j].name, null, true)
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
            new multiparty.Form().parse(req, function (err, fields, files) {
                if (err) {
                    return res.json(
                        400,
                        "There was a problem uploading your file. Please try again."
                    );
                }
                var input;
                try {
                    input = files.file[0].path;
                } catch (err) {
                    return res.json(400, "No upload file selected.");
                }

                if (path.extname(input) !== ".xlsx") {
                    return res.json(
                        400,
                        "This file cannot be loaded because:<br><br> The file is \
                        not in a format GRNsight can read." +
                            "<br>Please select an Excel Workbook \
                        (.xlsx) file. Note that Excel 97-2003 Workbook (.xls) files are not " +
                            " able to be read by GRNsight. <br><br>SIF and GraphML files can be loaded \
                        using the importer under File > Import." +
                            " Additional information about file \
                        types that GRNsight supports is in the Documentation."
                    );
                }

                // input.meta holds the species and taxon data
                return processGRNmap(input, res, app);
            });
        });

        // Load the demos
        app.get("/demo/unweighted", function (req, res) {
            return demoWorkbooks(
                "test-files/demo-files/15-genes_28-edges_db5_Dahlquist-data_input.xlsx",
                res,
                app
            );
        });

        app.get("/demo/weighted", function (req, res) {
            return demoWorkbooks(
                "test-files/demo-files/15-genes_28-edges_db5_Dahlquist-data_estimation_output.xlsx",
                res,
                app
            );
        });

        app.get("/demo/schadeInput", function (req, res) {
            return demoWorkbooks(
                "test-files/demo-files/21-genes_31-edges_Schade-data_input.xlsx",
                res,
                app
            );
        });

        app.get("/demo/schadeOutput", function (req, res) {
            return demoWorkbooks(
                "test-files/demo-files/21-genes_31-edges_Schade-data_estimation_output.xlsx",
                res,
                app
            );
        });

        app.get("/demo/ppi", function (req, res) {
            return demoWorkbooks("test-files/demo-files/18_proteins_81_edges_PPI.xlsx", res, app);
        });
    }

    // exporting parseNetworkSheet for use in testing. Do not remove!
    return {
        grnSightToCytoscape: grnSightToCytoscape,
        processGRNmap: processGRNmap,
        crossSheetInteractions: crossSheetInteractions,
    };
};
