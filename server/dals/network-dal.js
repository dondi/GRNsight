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

const buildNetworkSourceQuery = function () {
    return "SELECT * FROM spring2022_network.source ORDER BY time_stamp;";
};
const buildQueryByType = function (queryType) {
    switch (queryType) {
    case "NetworkSource":
        return buildNetworkSourceQuery();
    case "":
        // code block
        break;
    }
};

const convertResponseToJSON = function (queryType, totalOutput) {
    let JSONOutput = {};
    switch (queryType) {
    case "NetworkSource":
        JSONOutput.sources = [];
        totalOutput.forEach(function (x) {
            let timestamp = x.time_stamp;
            let source = x.source;
            JSONOutput.sources.push(`${timestamp.slice(0, 10)} : ${source}`);
        });
        return JSONOutput;
    case "":
        // code block
        break;
    }
};

module.exports = {
    buildNetworkSourceQuery: buildNetworkSourceQuery,
    queryNetworkDatabase: function (req, res) {
        return sequelize.query(buildQueryByType(req.query.type), { type: sequelize.QueryTypes.SELECT })
            .then(function (stdname) {
                let response = convertResponseToJSON(req.query.type, stdname);
                return res.send(response);
            });
    }
};