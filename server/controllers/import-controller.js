var NOT_FOUND = -1;

var sifToGrnsight = function (sif) {
  var entries = sif.split("\n").map(function (line) {
    return line.split("\t");
  });

  var genes = [];
  entries.forEach(function (entry) {
    if (entry.length && entry[0]) {
      genes.push(entry[0]);
    }
  });

  var links = [];
  entries.forEach(function (entry) {
    if (entry.length > 2) {
      var sourceIndex = genes.indexOf(entry[0]);
      var targets = entry.slice(2);
      targets.forEach(function (target) {
        var targetIndex = genes.indexOf(target);
        if (targetIndex !== NOT_FOUND) {
          links.push({
            source: sourceIndex,
            target: targetIndex
          });
        }
      });
    }
  });

  return {
    genes: genes.map(function (geneName) {
      return { name: geneName };
    }),
    links: links,
    sheetType: "unweighted"
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
