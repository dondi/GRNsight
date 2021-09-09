var constants = require(__dirname + "/../constants");

var exportEdges = function (workbook, gene, geneIndex) {
    var result = "";

    workbook.links.forEach(function (link) {
        if (link.source === geneIndex) {
            result += [
                gene.name,
                workbook.sheetType === constants.UNWEIGHTED ? "pd" : link.value,
                workbook.genes[link.target].name
            ].join("\t") + "\n";
        }
    });

    return result || (gene.name + "\t\t\n");
};

module.exports = function (workbook) {
    var result = "";

    workbook.genes.forEach(function (gene, geneIndex) {
        result += exportEdges(workbook, gene, geneIndex);
    });

    return result;
};
