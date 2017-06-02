var constants = require(__dirname + "/../constants");
var parseString = require("xml2js").parseString;
var semanticChecker = require(__dirname + "/../semantic-checker");

/*
var graphmlWarnings = {
    EDGES_WITHOUT_WEIGHTS: {
        warningCode: "EDGES_WITHOUT_WEIGHTS",
        errorDescription: "GRNsight has detected that one or more edges in your network are missing numerical weight" +
                          " values. Because the algorithm GRNsight uses for determining the arrowhead type and the" +
                          " color and thickness of the edges requires numerical weight values, your graph will" +
                          " display as an unweighted graph with black edges and pointed arrowheads. If you want to" +
                          " display the network as a weighted graph, please modify your input file to include weight" +
                          " values for all edges."
    },

    EDGE_DEFAULT_NOT_DIRECTED: {
        warningCode: "EDGE_DEFAULT_NOT_DIRECTED",
        errorDescription: "GRNsight interprets the graph as directed unconditionally."
    }
};

*/

var graphmlErrors = {
    GRAPHML_GENERAL_SYNTAX_ERROR: function (error) {
        return {
            errorCode: "GRAPHML_GENERAL_SYNTAX_ERROR",
            possibleCause: "There are a number of things that could've triggered this error, but the general gist" +
                           " is that there is something syntactically wrong with your file. The parcer we are using" +
                           " has associated your syntax error with this message: " + error + ".",
            suggestedFix:  "Please check the format of your file and make sure that it is in line with our" +
                           " Documentation page. Some common errors to check for are missing start/end tags, missing" +
                           " quotation marks, and proper spelling of all attribute names."
        };
    }
};

module.exports = function (graphml) {
    var graph;
    var key;

    var network = {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: constants.UNWEIGHTED
    };

    var readErrorFromErr = function (err) {
        var isolatedError = (err + "").split(": ")[1];
        isolatedError = isolatedError.substring(0, isolatedError.length - 5);
        return isolatedError;
    };

    var pushRelevantError = function (err) {
        var parseError = readErrorFromErr(err);
        network.errors.push(graphmlErrors.GRAPHML_GENERAL_SYNTAX_ERROR(parseError));

        // TODO Ask Dondi about how to do this in a more data-driven manner.

        // switch(parseError) {
        //   case "Invalid attribute name":
        //     network.errors.push(graphmlErrors.UNKNOWN_ERROR);
        //     break;
        //   default:
        //     network.errors.push(graphmlErrors.GRAPHML_GENERAL_SYNTAX_ERROR);
        // }
    };

    // Note this relies on sync execution being the default, *not* async.
    //
    // Limitation is due to the way the import function is expected to return its result.
    // To address this later on, import functions should accept a callback instead.
    parseString(graphml, function (err, result) {
        if (err) {
            pushRelevantError(err);
        } else {
            // Quick fix to handle completely empty GraphML file. #428
            if (!result) {
                return semanticChecker(network);
            }
            key = result.graphml && result.graphml.key;
            graph = result.graphml && result.graphml.graph && result.graphml.graph[0];
        }
    });

    if (network.errors.length > 0) {
        return network;
    }

    var findKeyId = function (attrName, attrFor) {
        return key && key.reduce(function (keyId, keyElement) {
            return keyId || (keyElement.$["attr.name"] === attrName &&
              (attrFor ? keyElement.$.for === attrFor : true) ? keyElement.$.id : null);
        }, "");
    };

    var findYFilesKeyId = function (yFilesType, attrFor) {
        return key && key.reduce(function (keyId, keyElement) {
            return keyId || (keyElement.$["yfiles.type"] === yFilesType &&
              (attrFor ? keyElement.$.for === attrFor : true) ? keyElement.$.id : null);
        }, "");
    };

    var findKey = function (element, keyId) {
        if (!element.data) {
            return null;
        }

        var keyMatch = element.data.filter(function (data) {
            return data.$.key === keyId;
        });

        return keyMatch.length ? keyMatch[0]._ : null;
    };

    var findYFilesKey = function (element, keyId) {
        if (!element.data) {
            return null;
        }

        var keyMatch = element.data.filter(function (data) {
            return data.$.key === keyId;
        });

        return keyMatch.length ? keyMatch[0] : null;
    };


    // We will only consider GraphML data to be weighted if:
    // (a) A key for the weight attribute is present, AND
    // (b) Every edge in the file has a data element with that key
    var weightId = findKeyId("weight"/*, "edge"*/);
    // Edge condition temporarily commented out pending Cytoscape GraphML export bug fix.

    if (weightId && graph.edge && graph.edge.every(function (edge) { // What
        return edge.data && edge.data.some(function (data) {
            return data.$.key === weightId && !isNaN(+data._);
        });
    })) {
        network.sheetType = constants.WEIGHTED;
    } else if (weightId) {
        network.warnings.push(constants.warnings.EDGES_WITHOUT_WEIGHTS);
    }

    if (!graph.$ || graph.$.edgedefault !== "directed") {
        network.warnings.push(constants.warnings.EDGE_DEFAULT_NOT_DIRECTED);
    }

    var nameId = findKeyId("name", "node");
    var sharedNameId = findKeyId("shared name", "node");
    var yFilesNodeId = findYFilesKeyId("nodegraphics", "node");

    var geneIds = [];
    if (graph.node) {
        network.genes = graph.node.map(function (node) {
            var nodeName = node.$.id;

            if (yFilesNodeId) {
                var yNodeGraphics = findYFilesKey(node, yFilesNodeId);
                if (yNodeGraphics) {
                    var yShapeNode = yNodeGraphics["y:ShapeNode"];
                    var yNodeLabel = yShapeNode && yShapeNode[0]["y:NodeLabel"];
                    if (yNodeLabel) {
                        // The yNodeLabel may either be plain text or have subelements, so...
                        nodeName = (yNodeLabel[0]._ || yNodeLabel[0]).trim();
                    }
                }
            }

            if (sharedNameId) {
                var sharedName = findKey(node, sharedNameId);
                if (sharedName) {
                    nodeName = sharedName;
                }
            }

            if (nameId) {
                var name = findKey(node, nameId);
                if (name) {
                    nodeName = name;
                }
            }

            geneIds.push(node.$.id);
            return { name: nodeName };
        });
    }

    if (graph.edge) {
        graph.edge.forEach(function (edge) {
            var link = {
                source: geneIds.indexOf(edge.$.source),
                target: geneIds.indexOf(edge.$.target)
            };

            if (link.source === constants.NOT_FOUND || link.target === constants.NOT_FOUND) {
                return;
            }

            if (network.sheetType === constants.WEIGHTED) {
                link.value = +edge.data.filter(function (data) {
                    return data.$.key === weightId;
                })[0]._;
            }

            network.links.push(link);
        });
    }

  return (network.errors.length === 0) ? semanticChecker(network) : network;

};
