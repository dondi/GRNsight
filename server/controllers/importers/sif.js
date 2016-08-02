var constants = require(__dirname + "/../constants");

var GENE_NAME = 0;
var RELATIONSHIP = 1;
var TARGET = 2;

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

  return relationships.every(isNumber) ? constants.WEIGHTED : constants.UNWEIGHTED;
};

module.exports = function (sif) {
  var entries = sif.match(/[^\r\n]+/g).map(function (line) {
    return line.match(/[^\t]+/g);
  });

  var genes = [];
  entries.forEach(function (entry) {
    if (entry.length && entry[GENE_NAME] && genes.indexOf(entry[GENE_NAME]) == constants.NOT_FOUND) {
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
        if (targetIndex !== constants.NOT_FOUND) {
          var link = {
            source: sourceIndex,
            target: targetIndex
          };

          if (sheetType === constants.WEIGHTED) {
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

