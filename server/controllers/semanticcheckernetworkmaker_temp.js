var network = parseSheet(sheet)

var parseSheet = function(sheet) {
  var currentSheet,
      network = {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: "unweighted",
      },
      currentLink,
      currentGene,
      sourceGene,
      targetGene,
      sourceGeneNumber,
      targetGeneNumber,
      genesList = [], // This will contain all of the genes in upper case for use in error checking
      sourceGenes = [],
      targetGenes = [];

};
