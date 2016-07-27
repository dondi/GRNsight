var grnsightToSif = function (network) {
  var result = "";

  network.genes.forEach(function (gene, geneIndex) {
    result += gene.name;

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
  });

  return result;
};

module.exports = function (app) {
  if (app) {
    // TODO Define routes that invoke the various export formats.
  }

  return {
    grnsightToSif: grnsightToSif
  };
}
