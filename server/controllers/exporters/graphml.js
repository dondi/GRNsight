var xmlbuilder = require("xmlbuilder");

var grnsightToGraphMlJson = function (network) {
  return {
    graphml: {
      "@xmlns": "http://graphml.graphdrawing.org/xmlns",
      "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@xsi:schemaLocation": "http://graphml.graphdrawing.org/xmlns " +
        "http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd",
      graph: {
        "@edgedefault": "directed",

        node: network.genes.map(function (gene) {
          return { "@id": gene.name };
        }),

        edge: network.links.map(function (link) {
          return {
            "@source": network.genes[link.source].name,
            "@target": network.genes[link.target].name
          };
        })
      }
    }
  };
};

module.exports = function (network) {
  return xmlbuilder.create(grnsightToGraphMlJson(network), {
    version: "1.0",
    encoding: "UTF-8"
  }).end({
    pretty: true
  });
};
