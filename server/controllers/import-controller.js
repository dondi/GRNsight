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
    sheetType: sheetType
  };
};

module.exports = function (app) {
  if (app) {
    // TODO Implement import routes (pattern after spreadsheet upload)
  }

  return {
    sifToGrnsight: sifToGrnsight
  };
}
