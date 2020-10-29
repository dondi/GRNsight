var constants = require(__dirname + "/../constants");
var parseString = require("xml2js").parseString;
var semanticChecker = require(__dirname + "/../semantic-checker");
var graphmlConstants = require(__dirname + "/../graphml-constants");

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
        sheetType: constants.UNWEIGHTED,
        meta: [],
        expression:[]
    };

    // These warnings don't exist. They are a TODO
    // network.warnings.push(constants.warnings.noSpeciesInformationDetected);
    // network.warnings.push(constants.warnings.missingExpressionData); Doesn't exist



    var parseErr = function (err) {
        err = err.toString().split("\n").join(" ");
        var error = err.slice(err.indexOf("Error: ") + 7, err.indexOf(" Line: "));
        var line = err.slice(err.indexOf("Line: ") + 6, err.indexOf(" Column: "));
        var column = err.slice(err.indexOf("Column: ") + 8, err.indexOf(" Char: "));
        var char = err.slice(err.indexOf("Char: ") + 6, err.length);
        // There seems to be a one-off-error with the line value, so this below was a workaround
        return {error: error, line: +line + 1, column: column, char:char};
    };

    var pushRelevantError = function (err) {
        network.errors.push(graphmlConstants.pairError(parseErr(err)));
    };

    parseString(graphml, function (err, result) {
        if (err) {
            pushRelevantError(err);
        } else {
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
    var weightId = findKeyId("weight"/* , "edge"*/);
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
