const Sequelize = require("sequelize");
require("dotenv").config();
var env = process.env.NODE_ENV || "development";
var config = require("../config/config")[env];
var sequelize = new Sequelize(
    config.databaseName,
    process.env.EXPRESSION_DB_USERNAME,
    process.env.EXPRESSION_DB_PASSWORD,
    {
        host: config.databaseHost,
        dialect: config.databaseDialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

const expressionTimepointsSources = [
    {
        key: "Barreto_2012_wt",
        value: [10, 10, 20, 20, 20, 20, 40, 40, 40, 40, 60, 60, 60, 60, 120, 120, 120, 120]
    },

    {
        key: "Dahlquist_2018_dcin5",
        value: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 90, 120, 120, 120, 120]
    },

    {
        key: "Dahlquist_2018_dgln3",
        value: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 90, 120, 120, 120, 120]
    },

    {
        key: "Dahlquist_2018_dhap4",
        value: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 120, 120, 120]
    },

    {
        key: "Dahlquist_2018_dzap1",
        value: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 90, 120, 120, 120, 120]
    },

    {
        key: "Dahlquist_2018_wt",
        value: [15, 15, 15, 15, 30, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 90, 90, 120, 120, 120, 120, 120]
    },

    {
        key: "Kitagawa_2002_wt",
        value: [15, 15, 15, 30, 30, 30, 120, 120, 120]
    },

    {
        key: "Thorsen_2007_wt",
        value: [15, 15, 15, 30, 30, 30, 60, 60, 60, 60, 60, 60, 1080, 1080, 1080]
    }
];

const expressionTimepointsByDataset = {};
expressionTimepointsSources.forEach(source => expressionTimepointsByDataset[source.key] = source.value);

const buildExpressionTimepointsQuery = function (selection) {
    let timepoints = "";
    selection.forEach(x => timepoints += ("fall2021.expression.time_point=" + x + " OR "));
    return timepoints.substring(0, timepoints.length - 4);
};

const buildExpressionGenesQuery = function (geneString) {
    let genes = "";
    let geneList = geneString.split(",");
    geneList.forEach(x => genes += ( `(fall2021.gene.display_gene_id =\'${x}\') OR `));
    return genes.substring(0, genes.length - 4);
};

const buildExpressionProductionDegradationRatesQuery = function (rateType, genes) {
    return `
    SELECT gene.display_gene_id, ${rateType}  FROM fall2021.${rateType}, fall2021.gene WHERE
    ((${buildExpressionGenesQuery(genes)}) 
    AND fall2021.gene.gene_id = fall2021.${rateType}.gene_id) ORDER BY display_gene_id;`;
};

const buildExpressionDataQuery = function (dataset, timepoints, genes) {
    return timepoints ?
    `SELECT *  FROM fall2021.expression, fall2021.gene WHERE fall2021.expression.dataset='${dataset}' AND
    (${buildExpressionTimepointsQuery(timepoints)}) AND
    ((${buildExpressionGenesQuery(genes)}) 
    AND fall2021.gene.gene_id = fall2021.expression.gene_id) ORDER BY sort_index;`
    : `SELECT * FROM fall2021.expression, fall2021.gene WHERE fall2021.expression.dataset='${dataset}'
    AND ((${buildExpressionGenesQuery(genes)}) 
    AND fall2021.gene.gene_id = fall2021.expression.gene_id) ORDER BY sort_index;`;
};



const buildExpressionQuery = function (query) {
    switch (query.type) {
    case "DegradationRates":
        return buildExpressionProductionDegradationRatesQuery("degradation_rate", query.genes);
    case "ProductionRates":
        return buildExpressionProductionDegradationRatesQuery("production_rate", query.genes);
    case undefined:
        // This is the original expression database call.
        // Will restructure code so that it follows the standardized query type, query data structure that all
        // other queries use
        return buildExpressionDataQuery(query.dataset, query.timepoints, query.genes);
    }
};

const listExpressionGeneData = function (gene, totalOutput) {
    let listOfData = [];
    totalOutput.forEach(function (x) {
        if (x.display_gene_id === gene) {
            listOfData.push(Number(x.expression));
        }
    });
    return listOfData;
};

const convertExpressionToJSON = function (totalOutput, dataset, timePoints, allGenes) {
    let JSONOutput = {
        timePoints,
        data: {
            id: timePoints
        }
    };
    allGenes.forEach(x => JSONOutput.data[x.toString()] = listExpressionGeneData(x, totalOutput));
    return JSONOutput;
};

const convertProductionDegradationRateToJSON = (totalOutput, rateType) => {
    const JSONOutput = {
    };
    for (let gene of totalOutput) {
        JSONOutput[gene.display_gene_id] = gene[rateType];
    }
    return JSONOutput;
};

module.exports = {
    queryExpressionDatabase: function (req, res) {
        return sequelize.query(buildExpressionQuery(req.query),
                { type: sequelize.QueryTypes.SELECT })
                    .then(function (stdname) {
                        const type = req.query.type;
                        if (type === "DegradationRates") {
                            return res.send(convertProductionDegradationRateToJSON(stdname, "degradation_rate"));

                        } else if (type === "ProductionRates") {
                            return res.send(convertProductionDegradationRateToJSON(stdname, "production_rate"));

                        } else if (type === undefined) {
                            let dataset = req.query.dataset;
                            let geneList = req.query.genes.split(",");
                            let response = convertExpressionToJSON(
                                stdname, dataset, expressionTimepointsByDataset[dataset], geneList);
                            return res.send(response);
                        }
                    });
    }
};