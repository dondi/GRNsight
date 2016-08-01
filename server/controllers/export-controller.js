var grnsightToSif = require(__dirname + "/exporters/sif");
var grnsightToGraphMl = require(__dirname + "/exporters/graphml");

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
    grnsightToSif: grnsightToSif,
    grnsightToGraphMl: grnsightToGraphMl
  };
}
