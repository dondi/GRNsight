var NOT_FOUND = -1;
var GENE_NAME = 0;
var RELATIONSHIP = 1;
var TARGET = 2;

var WEIGHTED = "weighted";
var UNWEIGHTED = "unweighted";

var isNumber = function (relationship) {
  return !isNaN(+relationship);
};

var sifNetworkType = function (sifEntries) {
  var relationships = [];
  sifEntries.forEach(function (entry) {
    if (entry.length > TARGET) {
      relationships.push(entry[RELATIONSHIP]);
    }
  });

  return relationships.every(isNumber) ? WEIGHTED : UNWEIGHTED;
};

var sifToGrnsight = function (sif) {
  var entries = sif.split("\n").map(function (line) {
    return line.split("\t");
  });

  var genes = [];
  entries.forEach(function (entry) {
    if (entry.length && entry[GENE_NAME] && genes.indexOf(entry[GENE_NAME]) == NOT_FOUND) {
      genes.push(entry[GENE_NAME]);
    }
  });

  var sheetType = sifNetworkType(entries);

  var links = [];
  entries.forEach(function (entry) {
    if (entry.length > TARGET) {
      var sourceIndex = genes.indexOf(entry[GENE_NAME]);
      var targets = entry.slice(TARGET);
      targets.forEach(function (target) {
        var targetIndex = genes.indexOf(target);
        if (targetIndex !== NOT_FOUND) {
          var link = {
            source: sourceIndex,
            target: targetIndex
          };

          if (sheetType === WEIGHTED) {
            link.value = +entry[RELATIONSHIP];
          }

          links.push(link);
        }
      });
    }
  });

  return {
    genes: genes.map(function (geneName) {
      return { name: geneName };
    }),
    links: links,
    errors: [],
    warnings: [],
    sheetType: sheetType
  };
};

module.exports = function (app) {
  if (app) {
    var multiparty = require("multiparty");
    var path = require("path");
    var fs = require("fs");

    app.post("/upload-sif", function (req, res) {
      res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));

      (new multiparty.Form()).parse(req, function (error, fields, files) {
        if (error) {
          return res.json(400, "There was a problem uploading your file. Please try again.");
        }

        try {
          var input = files.file[0].path;
        } catch (error) {
          return res.json(400, "No import file selected.");
        }

        if (path.extname(input) !== ".sif") {
          return res.json(400, "The filename does not end in .sif.");
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
    sifToGrnsight: sifToGrnsight
  };
}
