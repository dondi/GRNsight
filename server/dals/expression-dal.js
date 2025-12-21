const Sequelize = require("sequelize");
require("dotenv").config();
var env = process.env.NODE_ENV || "development";
var config = require("../config/config")[env];
var sequelize = new Sequelize(
    config.databaseName,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: config.databaseHost,
        dialect: config.databaseDialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
    }
);

const buildExpressionGenesQuery = function (geneString) {
    let genes = "";
    let geneList = geneString.split(",");
    geneList.forEach(
        x => (genes += `(LOWER(gene_expression.gene.display_gene_id) = LOWER(\'${x}\')) OR `)
    );
    return genes.substring(0, genes.length - 4);
};

const buildExpressionProductionDegradationRatesQuery = function (rateType, genes) {
    return `
    SELECT gene.display_gene_id, ${rateType}  FROM gene_expression.${rateType}, gene_expression.gene WHERE
    ((${buildExpressionGenesQuery(genes)}) 
    AND gene_expression.gene.gene_id = gene_expression.${rateType}.gene_id) ORDER BY display_gene_id;`;
};

const buildExpressionTimepointsFromDatasetQuery = function (dataset) {
    return `
    SELECT DISTINCT time_point, sample_id FROM gene_expression.expression WHERE
    dataset = '${dataset}' ORDER BY time_point ASC;`;
};

const buildExpressionDataQuery = function (dataset, genes) {
    return `SELECT * FROM gene_expression.expression, gene_expression.gene 
    WHERE gene_expression.expression.dataset='${dataset}'
    AND ((${buildExpressionGenesQuery(genes)}) 
    AND gene_expression.gene.gene_id = gene_expression.expression.gene_id) ORDER BY sort_index;`;
};

const buildExpressionQuery = function (query) {
    const expressionQueries = {
        DegradationRates: () =>
            buildExpressionProductionDegradationRatesQuery("degradation_rate", query.genes),
        ProductionRates: () =>
            buildExpressionProductionDegradationRatesQuery("production_rate", query.genes),
        ExpressionData: () => buildExpressionDataQuery(query.dataset, query.genes),
        ExpressionDatasets: () =>
            "SELECT DISTINCT dataset FROM gene_expression.expression ORDER BY dataset ASC;",
        ExpressionTimePoints: () => buildExpressionTimepointsFromDatasetQuery(query.dataset),
    };
    if (Object.keys(expressionQueries).includes(query.type)) {
        return expressionQueries[query.type]();
    }
};

const listExpressionGeneData = function (gene, totalOutput) {
    let listOfData = [];
    totalOutput.forEach(function (x) {
        if (x.display_gene_id.toLowerCase() === gene.toLowerCase()) {
            listOfData.push(Number(x.expression));
        }
    });
    return listOfData;
};

const convertExpressionToJSON = function (totalOutput, dataset, timePoints, allGenes) {
    let JSONOutput = {
        timePoints,
        data: {
            id: timePoints,
        },
    };
    allGenes.forEach(x => (JSONOutput.data[x.toString()] = listExpressionGeneData(x, totalOutput)));
    return JSONOutput;
};

const ProductionDegradationRateToJSON = (totalOutput, rateType) => {
    const JSONOutput = {};
    for (let gene of totalOutput) {
        JSONOutput[gene.display_gene_id] = gene[rateType];
    }
    return JSONOutput;
};

const DatasetToJSON = totalOutput => {
    const JSONOutput = {
        expressionDatasets: [],
    };
    for (let dataset of totalOutput) {
        JSONOutput.expressionDatasets.push(dataset.dataset);
    }
    return JSONOutput;
};

const TimePointsToJSON = (totalOutput, dataset) => {
    const JSONOutput = {};
    JSONOutput[dataset] = [];
    for (let timePoint of totalOutput) {
        JSONOutput[dataset].push(timePoint.time_point);
    }
    return JSONOutput;
};

module.exports = {
    queryExpressionDatabase: function (req, res) {
        return sequelize
            .query(buildExpressionQuery(req.query), {
                type: sequelize.QueryTypes.SELECT,
            })
            .then(function (stdname) {
                const convertToJSON = {
                    DegradationRates: () =>
                        ProductionDegradationRateToJSON(stdname, "degradation_rate"),
                    ProductionRates: () =>
                        ProductionDegradationRateToJSON(stdname, "production_rate"),
                    ExpressionData: () =>
                        convertExpressionToJSON(
                            stdname,
                            req.query.dataset,
                            req.query.timepoints.split(",").map(x => Number(x)),
                            req.query.genes.split(",")
                        ),
                    ExpressionDatasets: () => DatasetToJSON(stdname),
                    ExpressionTimePoints: () => TimePointsToJSON(stdname, req.query.dataset),
                };
                const type = req.query.type;
                return Object.keys(convertToJSON).includes(type)
                    ? res.send(convertToJSON[type]())
                    : res.send(500, { errors: "Something went wrong." });
            });
    },
};
