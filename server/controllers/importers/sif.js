var constants = require(__dirname + "/../constants");
var semanticChecker = require(__dirname + "/../semantic-checker");

var GENE_NAME = 0;
var RELATIONSHIP = 1;
var TARGET = 2;


module.exports = function (sif) {

    var warnings = [];
    var errors = [];

    // Workaround for empty SIF file handling
    var emptySifFile = sif === "";
    sif = sif || " ";

    // Replace any carriage return characters with new lines.
    sif = sif.replace(/\r\n/g, "\n");

    // Stray data detected when there are 2 or more consecutive tabs NOT followed by a newline in the SIF file.
    // OR Stray data detected when there are 2 or more consecutive new lines
    if (sif.match(/(?=.*[\t]{2,}?[^\n\t]).*/g) || sif.match(/[\n]{2,}/g)) {
        errors.push(constants.errors.SIF_STRAY_DATA_ERROR);
    }

    // Detects comma separated SIF files
    if (!sif.match(/[\t]+/g) && sif.match(/[,]+/g)) {
        errors.push(constants.warnings.SIF_FORMAT_WARNING);
    }

    var isNumber = function (relationship) {
        return !isNaN(+relationship);
    };

    var sifNetworkType = function (sifEntries) {
        var errors = [];
        var relationships = [];
        var numRowsWithTwoColumns = 0;
        var unweightedRelationshipTypeErrorDetected = false;

        sifEntries.forEach(function (entry) {
            if (entry.length > TARGET) {
                if (!isNumber(entry[RELATIONSHIP])) {
                    if (entry[RELATIONSHIP] !== "pd") {
                        unweightedRelationshipTypeErrorDetected = true;
                    }
                }
                relationships.push(entry[RELATIONSHIP]);
            } else if (entry.length === 2) {
                numRowsWithTwoColumns++;
            }
        });

        if (unweightedRelationshipTypeErrorDetected) {
            errors.push(constants.errors.SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERROR);
        }

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

    var nullEntries = entries.filter(function (entry) {
        return entry === null;
    });

    if (nullEntries.length > 0) {
        errors.push(constants.errors.SIF_STRAY_DATA_ERROR);
    } else {
        entries.forEach(function (entry) {
            if (entry.length && entry[GENE_NAME] && genes.indexOf(entry[GENE_NAME]) === constants.NOT_FOUND) {
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
    genes: emptySifFile ? [] : genes.map(function (geneName) {
      return { name: geneName };
    }),
    links: links,
    errors: errors,
    warnings: warnings,
    sheetType: networkType.sheetType,
    positiveWeights: [],
    negativeWeights: []
  };

  return (network.errors.length === 0) ? semanticChecker(network) : network;

};
