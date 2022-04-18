const { JSONB } = require("sequelize");
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
 (gene.gene_id = network.regulator_gene_id OR gene.gene_id = network.target_gene_id);`
};

let buildNetworkGenesQuery = function (geneString) {
    let genes = "(";
    let geneList = geneString.split(",");
    geneList.forEach(x => genes += ( `(network.regulator_gene_id =\'${x}\') OR `));
    genes = `${genes.substring(0, genes.length - 4)}) AND (`;
    geneList.forEach(x => genes += ( `(network.target_gene_id =\'${x}\') OR `));
    return `${genes.substring(0, genes.length - 4)})`;

};

const buildCreateNetworkQuery = function(genes, source, timestamp) {
    return `SELECT DISTINCT regulator_gene_id, target_gene_id FROM
 spring2022_network.network WHERE
 time_stamp='${timestamp}' AND source='${source}' AND
 ${buildNetworkGenesQuery(genes)} ORDER BY regulator_gene_id DESC;`
}
const buildQueryByType = function (queryType, query) {
    switch (queryType) {
    case "NetworkSource":
        return buildNetworkSourceQuery();
    case "NetworkGeneFromSource":
        return buildNetworkGeneFromSourceQuery(query.gene, query.source, query.timestamp);
    case "CreateNetwork":
        return buildCreateNetworkQuery(query.genes, query.source, query.timestamp)
    }
};

const convertResponseToJSON = function (queryType, query, totalOutput) {
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
        JSONOutput.displayGeneId = totalOutput.length > 0 ? totalOutput[0].display_gene_id: null;
        JSONOutput.geneId = totalOutput.length > 0 ? totalOutput[0].gene_id: null;
        return JSONOutput;
    case "CreateNetwork":
        JSONOutput.query = query;
        JSONOutput.totalOutput = totalOutput;
        return JSONOutput;
    }
};

module.exports = {
    buildNetworkSourceQuery: buildNetworkSourceQuery,
    queryNetworkDatabase: function (req, res) {
        sequelize.query(buildQueryByType(req.query.type, req.query), { type: sequelize.QueryTypes.SELECT })
            .then(function (stdname) {
                let response = convertResponseToJSON(req.query.type, req.query, stdname);
                return res.send(response);
            });
    }
};