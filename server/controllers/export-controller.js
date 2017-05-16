var helpers = require(__dirname + "/helpers");

var grnsightToSif = require(__dirname + "/exporters/sif");
var grnsightToGraphMl = require(__dirname + "/exporters/graphml");

var convertResponse = function (app, req, res, converter) {
    helpers.attachCorsHeader(res, app);
    return res.status(200).send(converter(req.body));
};

var exportResponse = function (app, req, res, converter) {
    helpers.attachCorsHeader(res, app);
    res.header("Content-Disposition", "attachment;filename=\"" + req.body.filename + "\"");
    return res.status(200).send(converter(JSON.parse(req.body.network)));
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
                res.header("Content-Type", "text/plain");
                return convertResponse(app, req, res, grnsightToSif);
            } catch (error) {
                return generalExportError(res, error);
            }
        });

        app.post("/export-to-sif", function (req, res) {
            try {
                res.header("Content-Type", "text/plain");
                return exportResponse(app, req, res, grnsightToSif);
            } catch (error) {
                return generalExportError(res, error);
            }
        });

        app.post("/convert-to-graphml", function (req, res) {
            try {
                res.header("Content-Type", "text/xml");
                return convertResponse(app, req, res, grnsightToGraphMl);
            } catch (error) {
                return generalExportError(res, error);
            }
        });

        app.post("/export-to-graphml", function (req, res) {
            try {
                res.header("Content-Type", "text/xml");
                return exportResponse(app, req, res, grnsightToGraphMl);
            } catch (error) {
                return generalExportError(res, error);
            }
        });
    }

    return {
        grnsightToSif: grnsightToSif,
        grnsightToGraphMl: grnsightToGraphMl
    };
};
