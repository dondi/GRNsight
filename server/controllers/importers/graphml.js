var constants = require(__dirname + "/../constants");
var parseString = require("xml2js").parseString;

module.exports = function (graphml) {
  var graph;

  // Note this relies on sync execution being the default, *not* async.
  //
  // Limitation is due to the way the import function is expected to return its result.
  // To address this later on, import functions should accept a callback instead.
  parseString(graphml, function (err, result) {
    graph = result.graphml && result.graphml.graph && result.graphml.graph[0];
  });

  var network = {
    genes: [],
    links: [],
    errors: [],
    warnings: [],
    sheetType: constants.UNWEIGHTED
  };

  if (graph.$.edgedefault !== "directed") {
    network.warnings.push({
      warningCode: "EDGE_DEFAULT_NOT_DIRECTED",
      errorDescription: "GRNsight interprets the graph as directed unconditionally."
    });
  }

  var geneNames = [];
  if (graph.node) {
    network.genes = graph.node.map(function (node) {
      geneNames.push(node.$.id);
      return { name: node.$.id };
    });
  }

  if (graph.edge) {
    network.links = graph.edge.map(function (edge) {
      return {
        source: geneNames.indexOf(edge.$.source),
        target: geneNames.indexOf(edge.$.target)
      };
    });
  }

  return network;
};
