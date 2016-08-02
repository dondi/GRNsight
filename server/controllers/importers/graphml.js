var constants = require(__dirname + "/../constants");
var parseString = require("xml2js").parseString;

module.exports = function (graphml) {
  var graph, key;

  // Note this relies on sync execution being the default, *not* async.
  //
  // Limitation is due to the way the import function is expected to return its result.
  // To address this later on, import functions should accept a callback instead.
  parseString(graphml, function (err, result) {
    key = result.graphml && result.graphml.key;
    graph = result.graphml && result.graphml.graph && result.graphml.graph[0];
  });

  var network = {
    genes: [],
    links: [],
    errors: [],
    warnings: [],
    sheetType: constants.UNWEIGHTED
  };

  // We will only consider GraphML data to be weighted if:
  // (a) A key for the weight attribute is present, AND
  // (b) Every edge in the file has a data element with that key
  var weightId = key && key.reduce(function (weightId, keyElement) {
    return weightId || (keyElement.$['attr.name'] === "weight" && keyElement.$.for === "edge" ?
      keyElement.$.id : null);
  }, "");

  if (weightId && graph.edge && graph.edge.every(function (edge) {
      return edge.data && edge.data.some(function (data) {
        return data.$.key === weightId && !isNaN(+data._);
      });
    })) {
    network.sheetType = constants.WEIGHTED;
  } else if (weightId) {
    network.warnings.push({
      warningCode: "EDGES_WITHOUT_WEIGHTS",
      errorDescription: "GRNsight attempted to import the graph as weighted, but some edges did not have a weight."
    });
  }

  if (!graph.$ || graph.$.edgedefault !== "directed") {
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
      var link = {
        source: geneNames.indexOf(edge.$.source),
        target: geneNames.indexOf(edge.$.target)
      };

      if (network.sheetType === constants.WEIGHTED) {
        link.value = +edge.data.filter(function (data) {
          return data.$.key === weightId;
        })[0]._;
      }

      return link;
    });
  }

  return network;
};
