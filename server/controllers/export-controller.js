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

var grnsightToSif = function (network) {
  var result = "";

  network.genes.forEach(function (gene, geneIndex) {
    result += network.sheetType === "unweighted" ?
      exportUnweightedEdges(network, gene, geneIndex) :
      exportWeightedEdges(network, gene, geneIndex);
  });

  return result;
};

var generalExportError = function (res, error) {
  return res.json(400, {
    message: "Invalid GRNsight format.",
    details: {
      name: error.name,
      message: error.message
    }
  });
};

module.exports = function (app) {
  if (app) {
    // The /convert-* routes represent pure data exchange;
    // the /export-* ones wrap this around a file download.
    app.post("/convert-to-sif", function (req, res) {
      try {
        res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));
        return res.status(200).send(grnsightToSif(req.body));
      } catch (error) {
        return generalExportError(res, error);
      }
    });

    app.post("/export-to-sif", function (req, res) {
      try {
        res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));
        res.header('Content-Disposition', 'attachment;filename="' + req.body.filename + '"');
        return res.status(200).send(grnsightToSif(JSON.parse(req.body.network)));
      } catch (error) {
        return generalExportError(res, error);
      }
    });
  }

  return {
    grnsightToSif: grnsightToSif
  };
}
