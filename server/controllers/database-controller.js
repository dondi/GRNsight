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

const timepointsSources = [
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

const timepointsByDataset = {};
timepointsSources.forEach(source => timepointsByDataset[source.key] = source.value);

let buildTimepointsQuery = function (selection) {
    let timepoints = "";
    selection.forEach(x => timepoints += ("timepoints=\'" + x + "\' OR "));
    return timepoints.substring(0, timepoints.length - 4);
};

let buildGenesQuery = function (geneString) {
    let genes = "";
    let geneList = geneString.split(",");
    geneList.forEach(x => genes += ("standardname=\'" + x + "\' OR "));
    return genes.substring(0, genes.length - 4);
};

let buildQuery = function (dataset, timepoints, genes) {
    return timepoints ?
    `SELECT * FROM expressiondata WHERE dataset='${dataset}' AND
    (${buildTimepointsQuery(timepoints)}) ORDER BY sortindex AND
    (${buildGenesQuery(genes)}) ORDER BY sortindex;`
    : `SELECT * FROM expressiondata WHERE dataset='${dataset}'
    AND (${buildGenesQuery(genes)}) ORDER BY sortindex;`;

};

let listGeneData = function (gene, totalOutput) {
    let listOfData = [];
    totalOutput.forEach(function (x) {
        if (x.standardname === gene) {
            listOfData.push(Number(x.expression));
        }
    });
    return listOfData;
};

let convertToJSON = function (totalOutput, dataset, timePoints, allGenes) {
    let JSONOutput = {
        timePoints,
        data: {
            id: timePoints
        }
    };
    allGenes.forEach(x => JSONOutput.data[x.toString()] = listGeneData(x, totalOutput));
    return JSONOutput;
};

module.exports = function (app) {

    app.get("/expressiondb", function (req, res) {
        try {
            return sequelize.query(buildQuery(req.query.dataset, req.query.timepoints, req.query.genes),
            { type: sequelize.QueryTypes.SELECT })
                .then(function (stdname) {
                    let dataset = req.query.dataset;
                    let geneList = req.query.genes.split(",");
                    let response = convertToJSON(stdname, dataset, timepointsByDataset[dataset], geneList);
                    return res.send(response);
                });
        } catch (e) {
            res.json({error: e.stack});
            res.json({error: e.name});
            res.json({error: e.message});

        }
    });

};
