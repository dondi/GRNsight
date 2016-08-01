var sifToGrnsight = require(__dirname + "/importers/sif");
var graphMlToGrnsight = require(__dirname + "/importers/graphml");

module.exports = function (app) {
  if (app) {
    var multiparty = require("multiparty");
    var path = require("path");
    var fs = require("fs");

    app.post("/upload-sif", function (req, res) {
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

        if (path.extname(input) !== ".sif") {
          return res.send(400, "The filename does not end in .sif.");
        }

        fs.readFile(input, { encoding: "utf-8" }, function (error, data) {
          if (error) {
            throw error;
          } else {
            return res.json(200, sifToGrnsight(data));
          }
        });
      });
    });
  }

  return {
    sifToGrnsight: sifToGrnsight,
    graphMlToGrnsight: graphMlToGrnsight
  };
}
