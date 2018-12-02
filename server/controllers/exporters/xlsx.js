const parseGeneNameArray = function (genes) {
    const geneNameArray = genes.map(gene => gene.name);
    return geneNameArray;
};

const parseNetworkSheet = function (genes, links) {
    const geneNameArray = parseGeneNameArray(genes);
    // The +1 to length is because we ALSO add the gene name to each of the network sheet arrays.
    const networkSheet = genes.map(gene => createArrayWithZeroes(genes.length + 1));

    // Place the gene name in the beginning of the network sheet array.
    // EX: ['CIN5', 0, 0, 1]
    Object.keys(geneNameArray).forEach(index => networkSheet[index][0] = geneNameArray[index]); 
    geneNameArray.unshift('cols regulators/rows targets');

    links.forEach((link) => {
        networkSheet[link.source][link.target + 1] = link.value;
    });

    networkSheet.unshift(geneNameArray);
    return networkSheet;
};

const createArrayWithZeroes = function (length) {
    return Array.apply(null, Array(length)).map(() => 0);
};

const convertToSheet = function (name, testSheet) {
    const singularName = name.toLowerCase().endsWith("s") ? name.substring(0, name.length - 1) : name;
    return {
        name: name,
        data: [['id', singularName], ...Object.keys(testSheet).map(key => [key, testSheet[key]])]
    }
};

const parseTestSheets = function (testSheet) {
    const productionRateSheet = convertToSheet('production_rates', testSheet['production_rates']);
    const degradationRateSheet = convertToSheet('degradation_rates', testSheet['degradation_rates']);
    const thresholdBSheet = convertToSheet('threshold_b', testSheet['threshold_b']);
    return [productionRateSheet, degradationRateSheet, thresholdBSheet]
};

const parseMetaSheet = function (metaDataContainer) {
    const metaSheet = { name: "optimization_parameters", data: [] };
    metaSheet["data"].push(['optimization_parameter', 'value']);
    Object.keys(metaDataContainer).forEach((parameter) => {
        const metaData = metaDataContainer[parameter];
        const cleanedUpData = Array.isArray(metaData)
            ? [parameter, ...metaData]
            : [parameter, metaData];
        metaSheet["data"].push(cleanedUpData);
    });
    return metaSheet;
};

const parseExpressionSheets = function (expressions) {
    const parsedExpressionSheets = [];
    Object.keys(expressions).forEach((expression) => {
        const parsedSheet = { name: expression, data: []};
        Object.keys(expressions[expression]["data"]).forEach((key) => {
            const expressionData = expressions[expression]["data"][key];
            parsedSheet["data"].push([key, ...expressionData]);
        });
        parsedExpressionSheets.push(parsedSheet);
    });
    return parsedExpressionSheets;
};

const buildXlsxSheet = function (network) {
    const resultSheet = [];
    resultSheet.push(
        {
            "name": "network",
            "data": parseNetworkSheet(network.genes, network.links)
        },

        {
            "name": "network_weights",
            "data": parseNetworkSheet(network.genes, network.links)
        },
    );
        
    Object.keys(network).forEach((key) => {
        switch (key) {
            case "meta":
                resultSheet.push(parseMetaSheet(network[key]));
                break;
            case "test":
                resultSheet.push(...parseTestSheets(network[key]));
                break;
            case "expression":
                resultSheet.push(...parseExpressionSheets(network[key]));
                break;
            default:
                break;
        }
    });

    return resultSheet;
};

module.exports = function (network) {
    return buildXlsxSheet(network);
};