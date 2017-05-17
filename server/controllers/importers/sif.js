var constants = require(__dirname + "/../constants");
var semanticChecker = require(__dirname + "/../semantic-checker");

var GENE_NAME = 0;
var RELATIONSHIP = 1;
var TARGET = 2;


module.exports = function (sif) {

  var warnings = [];
  var errors = [];

  // Empty SIF files must return a network, thus must contain some data.
  if (!sif) {
    sif = " ";
  }

  // Replace any carriage return characters with new lines.
  sif = sif.replace(/\r\n/g, "\n");

  // Stray data detected when there are 2 or more consecutive tabs NOT followed by a newline in the SIF file.
  if (sif.match(/(?=.*[\t]{2,}?[^\n\t]).*/g)) {
      errors.push(constants.errors.SIF_STRAY_DATA_ERROR);
  }

  // Stray data detected when there are 2 or more consecutive new lines
  if (sif.match(/[\n]{2,}/g)) {
      errors.push(constants.errors.SIF_STRAY_DATA_ERROR);
  }

  // Detects SIF file containing no tabs. Warning triggered advising users of possible consequences.
  if (!sif.match(/[\t]+/g)) {
    errors.push(constants.warnings.SIF_FORMAT_WARNING);
  }

  var isNumber = function (relationship) {
    return !isNaN(+relationship);
  };

  var sifNetworkType = function (sifEntries) {
    var errors = [];
    var relationships = [];
    var rowNum = 0;
    var numRowsWithTwoColumns = 0;
    sifEntries.forEach(function (entry) {
      if (entry.length > TARGET) {
        if (!isNumber(entry[RELATIONSHIP])) {
          if (entry[RELATIONSHIP] !== "pd") {
            errors.push(constants.errors.SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERROR);
          }
        }
        relationships.push(entry[RELATIONSHIP]);
      } else if (entry.length == 2) {
        numRowsWithTwoColumns++;
      }
    });

    if (numRowsWithTwoColumns > 0) {
      errors.push(constants.errors.SIF_MISSING_DATA_ERROR);
    }

    var hasNumbers = relationships.some(isNumber);
    var allNumbers = relationships.every(isNumber);
    return {
      sheetType: allNumbers ? constants.WEIGHTED : constants.UNWEIGHTED,
      warnings: hasNumbers && !allNumbers ? constants.warnings.EDGES_WITHOUT_WEIGHTS : null,
      errors: errors
    };
  };

  var entries = sif.match(/[^\r\n]+/g).map(function (line) {
    return line.match(/[^\t]+/g);
  });

  var genes = [];
  var links = [];
  var networkType = "unweighted";

  var nullEntries = entries.filter(function (entry) { return entry === null; });

  if (nullEntries.length > 0) {
    errors.push(constants.errors.SIF_STRAY_DATA_ERROR);
  } else {
    entries.forEach(function (entry) {
      if (entry.length && entry[GENE_NAME] && genes.indexOf(entry[GENE_NAME]) == constants.NOT_FOUND) {
        genes.push(entry[GENE_NAME]);
      }
    });

    networkType = sifNetworkType(entries);
    if (networkType.warnings) {
      warnings.push(networkType.warnings);
    }

    if (networkType.errors) {
      networkType.errors.forEach(function (error) {
        errors.push(error);
      });
    }

    entries.forEach(function (entry) {
      if (entry.length > TARGET) {
        var sourceIndex = genes.indexOf(entry[GENE_NAME]);
        var targets = entry.slice(TARGET);
        targets.forEach(function (target) {
          var targetIndex = genes.indexOf(target);
          if (targetIndex === constants.NOT_FOUND) {
            genes.push(target);
            targetIndex = genes.indexOf(target);
          }
          var link = {
            source: sourceIndex,
            target: targetIndex
          };
          if (networkType.sheetType === constants.WEIGHTED) {
            link.value = +entry[RELATIONSHIP];
          }
          links.push(link);
        });
      }
    });

  }

  var network = {
    genes: genes.map(function (geneName) {
      return { name: geneName };
    }),
    links: links,
    errors: errors,
    warnings: warnings,
    sheetType: networkType.sheetType,
    positiveWeights: [],
    negativeWeights: []
  };

  return semanticChecker(network);
};
