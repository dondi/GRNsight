var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util'),
    path = require('path'),
    cytoscape = require('cytoscape');

var helpers = require(__dirname + "/helpers");

var checkGeneLength = function(errorArray, genesList) {
  // Check if any genes are over the gene length (currently 12)
  var maxGeneLength = 12
  for(var i = 0; i < genesList.length; i++) {
    if(genesList[i].length > maxGeneLength) {
      errorArray.push(errorList.geneLengthError(genesList[i]));
    }
  }
}

var checkSpecialCharacter = function (currentGene){
  var regex = /[^a-z0-9\_\-]/gi;
  return currentGene.match(regex)===null;
}

  checkGeneLength(network.errors, genesList);
