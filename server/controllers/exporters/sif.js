var exportUnweightedEdges = function (network, gene, geneIndex) {
  var result = gene.name;

  var linkAdded = false;
  network.links.forEach(function (link) {
    if (link.source === geneIndex) {
      if (!linkAdded) {
        result += "\tpd";
        linkAdded = true;
      }

      result += "\t" + network.genes[link.target].name;
    }
  });

  result += "\n";
  return result;
};

var exportWeightedEdges = function (network, gene, geneIndex) {
  var result = "";

  network.links.forEach(function (link) {
    if (link.source === geneIndex) {
      result += [gene.name, link.value, network.genes[link.target].name].join("\t") + "\n";
    }
  });

  return result || (gene.name + "\n");
};

module.exports = function (network) {
  var result = "";

  network.genes.forEach(function (gene, geneIndex) {
    result += network.sheetType === "unweighted" ?
      exportUnweightedEdges(network, gene, geneIndex) :
      exportWeightedEdges(network, gene, geneIndex);
  });

  return result;
};
