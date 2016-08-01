var xmlbuilder = require("xmlbuilder");

var EDGE_VALUE_ID = "edge-value-id";

var grnsightToGraphMlJson = function (network) {
  var convertedNetwork = {
    graphml: {
      "@xmlns": "http://graphml.graphdrawing.org/xmlns",
      "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@xsi:schemaLocation": "http://graphml.graphdrawing.org/xmlns " +
        "http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd"
    }
  };

  if (network.sheetType === "weighted") {
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

      if (network.sheetType === "weighted") {
        edge.data = {
          "@key": EDGE_VALUE_ID,
          "#text": link.value
        };
      }

      return edge;
    })
  };

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
