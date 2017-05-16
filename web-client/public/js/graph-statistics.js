var displayStatistics = function (network) { // eslint-disable-line no-unused-vars
    var $container = $(".graph-statistics-container").removeClass("hidden");
    var $thead = $container.find("thead");
    var $tbody = $container.find("tbody").empty();

    // TODO Still quick-and-dirty, needs robustness and optimization.
    var betweennessCentralityFor = function (geneName) {
        return network.graphStatisticsReport.betweennessCentrality.filter(function (bcItem) {
            return bcItem.gene.name === geneName;
        })[0].betweennessCentrality;
    };

    var shortestPath = function (sourceName, targetName) {
        var rawResult = network.graphStatisticsReport.shortestPath.filter(function (spItem) {
            return spItem.source === sourceName && spItem.pathData.target === targetName;
        })[0].pathData.shortestPath;

        return rawResult === null ? "" : rawResult;
    };

    var populateHead = function () {
        $thead.find(".shortest-path-column-headers").empty().append(
            network.genes.map(function (gene) {
                return $("<th></th>").text(gene.name);
            })
        );

        $thead.find(".shortest-path-header").attr({ colspan: network.genes.length });
    };

    var populateBody = function () {
        $tbody.append(network.genes.map(function (gene) {
            return $("<tr></tr>")
                .append($("<th></th>").text(gene.name))
                .append($("<td></td>").text(betweennessCentralityFor(gene.name)))
                .append(network.genes.map(function (targetGene) {
                    return $("<td></td>").text(shortestPath(gene.name, targetGene.name));
                }));
        }));
    };

    populateHead();
    populateBody();
};
