var constants = require(__dirname + "/../constants");
var semanticChecker = require(__dirname + "/../semantic-checker");

var GENE_NAME = 0;
var RELATIONSHIP = 1;
var TARGET = 2;


module.exports = function (sif) {

  var warnings = [];
  var errors = [];

  // sif files must contain tabs
  if (!sif.match(/[\t]+/g)) {
    errors.push(constants.errors.SIF_FORMAT_ERRROR);
  }

  // sif files must not contain two or more consecutive tabs in a row not followed by a newline, this is how we are checking for stray data
  if (sif.match(/(?=.*[\t]{2,}[^\n\t]).*/g)) {
      errors.push(constants.errors.SIF_STRAY_DATA_ERROR);
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
            errors.push(constants.errors.SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERRROR);
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
  entries.forEach(function (entry) {
    if (entry.length && entry[GENE_NAME] && genes.indexOf(entry[GENE_NAME]) == constants.NOT_FOUND) {
      genes.push(entry[GENE_NAME]);
    }
  });

  var networkType = sifNetworkType(entries);
  if (networkType.warnings !== null) {
    warnings.push(networkType.warnings);
  }

  if (networkType.errors != null) {
    for (i = 0; i < networkType.errors.length; i++) {
      errors.push(networkType.errors[i]);
    }
  }

  var links = [];
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
