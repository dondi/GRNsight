var constants = require(__dirname + "/../constants");

var exportEdges = function (network, gene, geneIndex) {
    var result = "";

    network.links.forEach(function (link) {
        if (link.source === geneIndex) {
            result += [
                gene.name,
                network.sheetType === constants.UNWEIGHTED ? "pd" : link.value,
                network.genes[link.target].name
            ].join("\t") + "\n";
        }
    });

    return result || (gene.name + "\t\t\n");
};

module.exports = function (network) {
    var result = "";

    network.genes.forEach(function (gene, geneIndex) {
        result += exportEdges(network, gene, geneIndex);
    });

    return result;
};
