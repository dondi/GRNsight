var sifToGrnsight = require(__dirname + "/importers/sif");
var graphMlToGrnsight = require(__dirname + "/importers/graphml");

module.exports = function (app) {
  if (app) {
    var multiparty = require("multiparty");
    var path = require("path");
    var fs = require("fs");

    var performUpload = function (req, res, extension, importer) {
      res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));

      (new multiparty.Form()).parse(req, function (error, fields, files) {
        if (error) {
          return res.send(400, "There was a problem uploading your file. Please try again.");
        }

        try {
          var input = files.file[0].path;
        } catch (error) {
          return res.send(400, "No import file selected.");
        }

        if (path.extname(input) !== "." + extension) {
          return res.send(400, "The filename does not end in ." + extension + ".");
        }

        fs.readFile(input, { encoding: "utf-8" }, function (error, data) {
          if (error) {
            throw error;
          } else {
            return res.json(200, importer(data));
          }
        });
      });
    };

    app.post("/upload-sif", function (req, res) {
      performUpload(req, res, "sif", sifToGrnsight)
    });

    app.post("/upload-graphml", function (req, res) {
      performUpload(req, res, "graphml", graphMlToGrnsight)
    });
  }

  return {
    sifToGrnsight: sifToGrnsight,
    graphMlToGrnsight: graphMlToGrnsight
  };
}
