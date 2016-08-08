var xmlbuilder = require("xmlbuilder");
var constants = require(__dirname + "/../constants");

var EDGE_VALUE_ID = "weight";

var grnsightToGraphMlJson = function (network) {
  var convertedNetwork = {
    graphml: {
      "@xmlns": "http://graphml.graphdrawing.org/xmlns",
      "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@xsi:schemaLocation": "http://graphml.graphdrawing.org/xmlns " +
        "http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd"
    }
  };

  if (network.sheetType === constants.WEIGHTED) {
    convertedNetwork.graphml.key = {
      "@id": EDGE_VALUE_ID,
      "@for": "edge",
      "@attr.name": "weight",
      "@attr.type": "double"
    };
  }

  convertedNetwork.graphml.graph = {
    "@edgedefault": "directed",

    node: network.genes.map(function (gene) {
      return { "@id": gene.name };
    }),

    edge: network.links.map(function (link) {
      var edge = {
        "@source": network.genes[link.source].name,
        "@target": network.genes[link.target].name
      };

      if (network.sheetType === constants.WEIGHTED) {
        edge.data = {
          "@key": EDGE_VALUE_ID,
          "#text": link.value
        };
      }

      return edge;
    })
  };

  if (network.filename) {
    convertedNetwork.graphml.graph["@id"] = network.filename;
  }

  return convertedNetwork;
};

module.exports = function (network) {
  return xmlbuilder.create(grnsightToGraphMlJson(network), {
    version: "1.0",
    encoding: "UTF-8"
  }).end({
    pretty: true
  });
};
