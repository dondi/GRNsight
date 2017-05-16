var google = require("googleapis");
var ga = google.analytics("v3");

var moment = require("moment");

module.exports = function (app) {
    var gaQuery = function (req, res, options) {
        var jwt = new google.auth.JWT(
          options.serviceEmail,
          options.pemFilename,
          null,
          ["https://www.googleapis.com/auth/analytics.readonly"],
          null);

        if (app.get("env") !== "development") {
            res.header("Access-Control-Allow-Origin", options.origin);
        }

        jwt.authorize(function (err, tokens) { // eslint-disable-line no-unused-vars
            if (err) {
                console.log("jwt error", err);
                return;
            }

            ga.data.ga.get({
                auth: jwt,
                ids: options.accountId,
                "start-date": "2014-01-01",
                "end-date": moment().format("YYYY-MM-DD"),
                "metrics": "ga:pageviews",
                "filters": "ga:pagePath==/" + options.pathRoot + "/" + (req.query.path || "")
            }, function (err, result) {
                if (err) {
                    console.log("api error", err, result);
                }

                res.send(result && result.rows && result.rows[0] ? result.rows[0][0] : "(unknown)");
            });
        });
    };

    app.get("/ga", function (req, res) {
        gaQuery(req, res, {
            serviceEmail: process.env.SERVICE_EMAIL,
            pemFilename: "grnsight.pem",
            origin: "http://dondi.github.io",
            accountId: "ga:91279024",
            pathRoot: "GRNsight"
        });
    });

    app.get("/grnmap", function (req, res) {
        gaQuery(req, res, {
            serviceEmail: process.env.GRNMAP_SERVICE_EMAIL,
            pemFilename: "grnmap.pem",
            origin: "http://kdahlquist.github.io",
            accountId: "ga:97014398",
            pathRoot: "GRNmap"
        });
    });
};
