var constants = require(__dirname + "/../constants");
var semanticChecker = require(__dirname + "/../semantic-checker");

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

  var hasNumbers = relationships.some(isNumber);
  var allNumbers = relationships.every(isNumber);
  return {
    sheetType: allNumbers ? constants.WEIGHTED : constants.UNWEIGHTED,
    warnings: hasNumbers && !allNumbers ? constants.warnings.EDGES_WITHOUT_WEIGHTS : null
  };
};

module.exports = function (sif) {

  var warnings = [];
  var errors = [];

  var errorList = {
    sifFormatError: {
      errorCode: "SIF_FORMAT_ERRROR",
      possibleCause: "No tabs are detected in the SIF input file",
      suggestedFix: "SIF files accepted by GRNsight must delimit data using tabs. Please review the SIF input standards" +
      "that are outlined in the documentation."
    }
  };

  if (!sif.match(/[\t]+/g)) {
    errors.push(errorList.sifFormatError);
  }

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

  console.log(warnings);
  console.log(errors);

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
