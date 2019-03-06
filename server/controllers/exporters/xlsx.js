const xlsx = require("node-xlsx");

const buildGeneNameArray = function (genes) {
    const geneNameArray = genes.map(gene => gene["name"]);
    return geneNameArray;
};

const createArrayWithZeroes = function (length) {
    return Array.apply(null, Array(length)).map(() => 0);
};

const buildNetworkSheet = function (genes, links) {
    const geneNameArray = buildGeneNameArray(genes);
    // The +1 to length is because we ALSO add the gene name to each of the network sheet arrays.
    const networkSheet = genes.map(() => createArrayWithZeroes(genes.length + 1));

    // Place the gene name in the beginning of the network sheet array.
    // EX: ["CIN5", 0, 0, 1]
    Object.keys(geneNameArray).forEach(index => networkSheet[index][0] = geneNameArray[index]);
    geneNameArray.unshift("cols regulators/rows targets");

    links.forEach((link) => {
        networkSheet[link.source][link.target + 1] = link.value;
    });

    networkSheet.unshift(geneNameArray);
    return networkSheet;
};


const convertToSheet = function (name, testSheet) {
    const singularName = name.toLowerCase().endsWith("s") ? name.substring(0, name.length - 1) : name;
    return {
        name: name,
        data: [["id", singularName], ...Object.keys(testSheet).map(key => [key, testSheet[key]])]
    };
};

const buildTestSheets = testSheet => ["production_rates", "degradation_rates", "threshold_b"]
      .filter(name => testSheet[name])
      .map(name => convertToSheet(name, testSheet[name]));

const buildMetaSheet = function (metaDataContainer) {
    const metaSheet = { name: "optimization_parameters", data: [] };
    metaSheet["data"].push(["optimization_parameter", "value"]);
    Object.keys(metaDataContainer).forEach((parameter) => {
        const metaData = metaDataContainer[parameter];
        const cleanedUpData = Array.isArray(metaData)
            ? [parameter, ...metaData]
            : [parameter, metaData];
        metaSheet["data"].push(cleanedUpData);
    });
    return metaSheet;
};

const buildExpressionSheets = function (expressions) {
    const builtExpressionSheets = [];
    Object.keys(expressions).forEach((expression) => {
        const builtSheet = { name: expression, data: []};
        Object.keys(expressions[expression]["data"]).forEach((key) => {
            const expressionData = expressions[expression]["data"][key];
            builtSheet["data"].push([key, ...expressionData]);
        });
        builtExpressionSheets.push(builtSheet);
    });
    return builtExpressionSheets;
};

const buildXlsxSheet = function (network) {
    const resultSheet = [];
    resultSheet.push(
        {
            "name": "network",
            "data": buildNetworkSheet(network.genes, network.links)
        },

        {
            "name": "network_weights",
            "data": buildNetworkSheet(network.genes, network.links)
        }
    );

// This is the code that causes crash in Excel export.
    Object.keys(network).forEach((key) => {
        switch (key) {
        case "meta":
            resultSheet.push(buildMetaSheet(network[key]));
            break;
        case "test":
            console.log("before test")
            resultSheet.push(...buildTestSheets(network[key]));
            console.log("after test")
            break;
        case "expression":
            resultSheet.push(...buildExpressionSheets(network[key]));
            break;
        default:
            break;
        }
    });

    return resultSheet;
};

module.exports = function (network) {
    return xlsx.build(buildXlsxSheet(network));
};
