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

const buildNetworkGeneFromSourceQuery = function(gene, source, timestamp) {
    return `SELECT DISTINCT gene_id, display_gene_id FROM spring2022_network.network, spring2022_network.gene WHERE
 network.time_stamp='${timestamp}' AND network.source='${source}' AND
 (gene.gene_id ='${gene}' OR gene.display_gene_id ='${gene}') AND
 (gene.gene_id = network.regulator_gene_id OR gene.gene_id = network.target_gene_id)`
};
const buildQueryByType = function (queryType, queryInfo) {
    switch (queryType) {
    case "NetworkSource":
        return buildNetworkSourceQuery();
    case "NetworkGeneFromSource":
        console.log("Query Info:")
        console.log(queryInfo)
        return buildNetworkGeneFromSourceQuery(queryInfo.gene, queryInfo.source, queryInfo.timestamp);
    }
};

const convertResponseToJSON = function (queryType, queryInfo, totalOutput) {
    let JSONOutput = {};
    switch (queryType) {
    case "NetworkSource":
        JSONOutput.sources = {};
        totalOutput.forEach(function (x) {
            let timestamp = x.time_stamp;
            let source = x.source;
            JSONOutput.sources[`${source} : ${timestamp}`] = {timestamp, source};
        });
        return JSONOutput;
    case "NetworkGeneFromSource":
        // let sourceKey = `${queryInfo.source} : ${queryInfo.timestamp}`
        // JSONOutput[sourceKey] = {
        //     source: queryInfo.source,
        //     timestamp: queryInfo.timestamp,
        //     genes: []
        // }
        // JSONOutput[sourceKey].genes[queryInfo.gene] = {
        //     displayGeneId: totalOutput
        // }
        JSONOutput.queryInfo = queryInfo
        JSONOutput.totalOutput = totalOutput
        return JSONOutput;
    }
};

module.exports = {
    buildNetworkSourceQuery: buildNetworkSourceQuery,
    queryNetworkDatabase: function (req, res) {
        return sequelize.query(buildQueryByType(req.query.type, req.query.info), { type: sequelize.QueryTypes.SELECT })
            .then(function (stdname) {
                let response = convertResponseToJSON(req.query.type, req.query.info, stdname);
                return res.send(response);
            });
    }
};