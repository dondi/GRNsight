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

const timepointsByDataset = {
    Barreto_2018_wt: [10, 10, 20, 20, 20, 20, 40, 40, 40, 40, 60, 60, 60, 60, 120, 120, 120, 120],
    Dahlquist_2018_dcin5: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 90, 120, 120, 120, 120],
    Dahlquist_2018_dgln3: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 90, 120, 120, 120, 120],
    Dahlquist_2018_dhap4: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 120, 120, 120],
    Dahlquist_2018_dzap1: [15, 15, 15, 15, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 90, 120, 120, 120, 120],
    Dahlquist_2018_wt: [15, 15, 15, 15, 30, 30, 30, 30, 30, 60, 60, 60, 60, 90, 90, 90, 90, 90, 120, 120, 120,
        120, 120],
    Kitagawa_2002_wt: [15, 15, 15, 30, 30, 30, 120, 120, 120],
    Thorsen_2007_wt: [15, 15, 15, 30, 30, 30, 60, 60, 60, 60, 60, 60, 1080, 1080, 1080]
};

let buildTimepointsQuery = function (selection) {
    let timepoints = "";
    selection.forEach(x => timepoints += ("timepoints=\'" + x + "\' OR "));
    return timepoints.substring(0, timepoints.length - 4);
};

let buildQuery = function (dataset, timepoints) {
    return timepoints ?
    `SELECT * FROM expressiondata WHERE dataset='${dataset}'
    AND (${buildTimepointsQuery(timepoints)}) ORDER BY sortindex;` :
    `SELECT * FROM expressiondata WHERE dataset='${dataset}' ORDER BY sortindex;`;
};

let listUniqueGenes = function (arrayOfObjects) {
    let uniqueGenes = [];
    arrayOfObjects.forEach(function (x) {
        if (!uniqueGenes.includes(x.standardname)) {
            uniqueGenes.push(x.standardname);
        }
    });
    return uniqueGenes;
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
        [dataset]: {
            timePoints,
            data: {
                id: timePoints
            }
        }
    };
    allGenes.forEach(x => JSONOutput[dataset].data[x.toString()] = listGeneData(x, totalOutput));
    return JSONOutput;
};

module.exports = function (app) {

    app.get("/expressiondb", function (req, res) {
        try {
            return sequelize.query(buildQuery(req.query.dataset, req.query.timepoints),
            { type: sequelize.QueryTypes.SELECT })
                .then(function (stdname) {
                    let dataset = req.query.dataset;
                    let genes = listUniqueGenes(stdname);
                    let response = convertToJSON(stdname, dataset, timepointsByDataset[dataset], genes);
                    return res.send(response);
                });
        } catch (e) {
            res.json({error: e.stack});
            res.json({error: e.name});
            res.json({error: e.message});

        }
    });

};
