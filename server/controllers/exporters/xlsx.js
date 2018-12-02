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
    for (let index in geneNameArray) {
        networkSheet[index][0] = geneNameArray[index];
    }
    geneNameArray.unshift('cols regulators/rows targets');

    for (let link of links){
        networkSheet[link.source][link.target + 1] = link.value;
    }

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
    const productionRateSheet = convertToSheet(name = 'production_rates', testSheet['production_rates']);
    const degradationRateSheet = convertToSheet(name = 'degradation_rates', testSheet['degradation_rates']);
    const thresholdBSheet = convertToSheet(name = 'threshold_b', testSheet['threshold_b']);
    return [productionRateSheet, degradationRateSheet, thresholdBSheet]
};

const parseMetaSheet = function (metaDataContainer) {
    const key = 'meta';
    const metaSheet = { name: "optimization_parameters", data: [] };
    metaSheet["data"].push(['optimization_parameter', 'value']);
    for (parameter in metaDataContainer) {
        const metaData = metaDataContainer[parameter];
        const cleanedUpData = Array.isArray(metaData) 
            ? [parameter, ...metaData] 
            : [parameter, metaData];
        metaSheet["data"].push(cleanedUpData);
    }
    return metaSheet;
};

const parseExpressionSheets = function (expressionData) {
    return [];
};

const buildXlsxSheet = function (network) {
    // const util = require('util')
    // console.log(util.inspect(myObject, { showHidden: false, depth: null }))
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

    for (let key in network) {
        switch(key) {
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
    }

    // const util = require('util')
    // console.log(util.inspect(resultSheet, { showHidden: false, depth: null }))

    return resultSheet;
};

module.exports = function (network) {
    return buildXlsxSheet(network);
};