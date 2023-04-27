/* eslint-disable max-len */
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
    return "SELECT * FROM gene_regulatory_network.source ORDER BY time_stamp DESC;";
};

const buildNetworkGeneFromSourceQuery = function (gene, source, timestamp) {
    return `SELECT DISTINCT gene_id, display_gene_id FROM gene_regulatory_network.network, gene_regulatory_network.gene WHERE
 network.time_stamp='${timestamp}' AND network.source='${source}' AND
 (gene.gene_id ='${gene}' OR gene.display_gene_id ='${gene}') AND
 (gene.gene_id = network.regulator_gene_id OR gene.gene_id = network.target_gene_id);`;
};

const buildNetworkGenesQuery = function (geneString) {
    let genes = "(";
    let geneList = geneString.split(",");
    geneList.forEach(x => genes += ( `(network.regulator_gene_id =\'${x}\') OR `));
    genes = `${genes.substring(0, genes.length - 4)}) AND (`;
    geneList.forEach(x => genes += ( `(network.target_gene_id =\'${x}\') OR `));
    return `${genes.substring(0, genes.length - 4)})`;

};

const buildGenerateNetworkQuery = function (genes, source, timestamp) {
    return `SELECT DISTINCT regulator_gene_id, target_gene_id FROM
 gene_regulatory_network.network WHERE
 time_stamp='${timestamp}' AND source='${source}' AND
 ${buildNetworkGenesQuery(genes)} ORDER BY regulator_gene_id DESC;`;
};

const buildQueryByType = function (queryType, query) {
    const networkQueries = {
        "NetworkSource": () => buildNetworkSourceQuery(),
        "NetworkGeneFromSource": () => buildNetworkGeneFromSourceQuery(query.gene, query.source, query.timestamp),
        "GenerateNetwork": () => buildGenerateNetworkQuery(query.genes, query.source, query.timestamp)
    };
    if (Object.keys(networkQueries).includes(query.type)) {
        return networkQueries[query.type]();
    }
};

const convertResponseToJSON = function (queryType, query, totalOutput) {
    let JSONOutput = {};
    switch (queryType) {
    case "NetworkSource":
        JSONOutput.sources = {};
        totalOutput.forEach(function (x) {
            const timestamp = x.time_stamp;
            const source = x.source;
            const displayName = x.display_name;
            JSONOutput.sources[`${displayName}: ${timestamp.toISOString().split("T")[0]}`] = {timestamp, source};
        });
        return JSONOutput;
    case "NetworkGeneFromSource":
        JSONOutput.displayGeneId = totalOutput.length > 0 ? totalOutput[0].display_gene_id : null;
        JSONOutput.geneId = totalOutput.length > 0 ? totalOutput[0].gene_id : null;
        return JSONOutput;
    case "GenerateNetwork":
        JSONOutput.links = {};
        for (let connection of totalOutput) {
            if (JSONOutput.links[connection.regulator_gene_id] === undefined) {
                JSONOutput.links[connection.regulator_gene_id] = [connection.target_gene_id];
            } else {
                JSONOutput.links[connection.regulator_gene_id].push(connection.target_gene_id);
            }
        }
        return JSONOutput;
    default:
        return JSONOutput;
    }

};

module.exports = {
    buildNetworkSourceQuery: buildNetworkSourceQuery,
    queryNetworkDatabase: function (req, res) {
        sequelize.query(buildQueryByType(req.query.type, req.query), { type: sequelize.QueryTypes.SELECT })
            .then(function (stdname) {
                const response = convertResponseToJSON(req.query.type, req.query, stdname);
                return res.send(response);
            });
    }
};