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

const buildNetworkSourceQuery = function() {
    return `SELECT * FROM spring2022_network.source ORDER BY time_stamp`
}

let listExpressionGeneData = function (gene, totalOutput) {
    let listOfData = [];
    totalOutput.forEach(function (x) {
        if (x.display_gene_id === gene) {
            listOfData.push(Number(x.expression));
        }
    });
    return listOfData;
};

let convertExpressionToJSON = function (totalOutput, dataset, timePoints, allGenes) {
    let JSONOutput = {
        timePoints,
        data: {
            id: timePoints
        }
    };
    allGenes.forEach(x => JSONOutput.data[x.toString()] = listExpressionGeneData(x, totalOutput));
    return JSONOutput;
};

let convertResponseToJSON = function (queryType, totalOutput) {
    switch(queryType) {
        case "NetworkSource":
            let JSONOutput = {}
            return totalOutput
        case "":
          // code block
          break;
      }
}

module.exports = {
    buildNetworkSourceQuery: buildNetworkSourceQuery,
    queryNetworkDatabase: function (req, res) {
        return sequelize.query(req.query.query, { type: sequelize.QueryTypes.SELECT })
            .then(function (stdname) {
                let response = convertResponseToJSON(req.query.type, stdname);
                return res.send(response);
            });
    }
};