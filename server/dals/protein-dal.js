const Sequelize = require("sequelize");
var constants = require(__dirname + "/dbConstants");
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

const buildNetworkSourceQuery = function () {
    return `SELECT * FROM ${constants.PPI_DATABASE_NAMESPACE}.source
            UNION ALL
            SELECT * FROM ${constants.PPI_DATABASE_NAMESPACE_WITH_TIMESTAMP}.source
            ORDER BY time_stamp DESC;`;
};

const buildNetworkFromGeneProteinQuery = function (geneProtein, source, timestamp) {
    const namespace = constants.timestampNamespace(timestamp, false);
    const timestampQuery = constants.isTimestampOld(timestamp)
        ? ""
        : `AND gene.time_stamp='${timestamp}' AND gene.source='${source}'`;
    return `SELECT DISTINCT gene_id, display_gene_id, standard_name, length, molecular_weight, PI FROM
    ${namespace}.gene, ${namespace}.protein WHERE
    (LOWER(gene.gene_id)=LOWER('${geneProtein}') OR LOWER(gene.display_gene_id)=LOWER('${geneProtein}')
    OR LOWER(protein.standard_name) =LOWER('${geneProtein}')) AND
    LOWER(gene.gene_id) = LOWER(protein.gene_systematic_name)${timestampQuery};`;

    // do I need to check for source each time I check for timestamp?
};

const buildNetworkProteinsQuery = function (proteinString) {
    let proteins = "(";
    let proteinList = proteinString.split(",");
    proteinList.forEach(x => (proteins += `(physical_interactions.protein1 =\'${x}\') OR `));
    proteins = `${proteins.substring(0, proteins.length - 4)}) AND (`;
    proteinList.forEach(x => (proteins += `(physical_interactions.protein2 =\'${x}\') OR `));
    return `${proteins.substring(0, proteins.length - 4)})`;
};

const buildGenerateProteinNetworkQuery = function (proteins, source, timestamp) {
    const namespace = constants.timestampNamespace(timestamp, false);
    const annotation = constants.isTimestampOld(timestamp) ? "" : ", annotation_type";
    return `SELECT DISTINCT protein1, protein2${annotation} FROM
        ${namespace}.physical_interactions WHERE
        physical_interactions.time_stamp='${timestamp}' AND physical_interactions.source='${source}' AND
        ${buildNetworkProteinsQuery(proteins)} ORDER BY protein1 DESC;`;
};

const buildQueryByType = function (query) {
    const networkQueries = {
        NetworkSource: () => buildNetworkSourceQuery(),
        NetworkFromGeneProtein: () =>
            buildNetworkFromGeneProteinQuery(query.geneProtein, query.source, query.timestamp),
        GenerateProteinNetwork: () =>
            buildGenerateProteinNetworkQuery(query.proteins, query.source, query.timestamp),
    };
    if (Object.keys(networkQueries).includes(query.type)) {
        return networkQueries[query.type]();
    }
};

const convertResponseToJSON = function (queryType, totalOutput) {
    let JSONOutput = {};
    switch (queryType) {
        case "NetworkSource":
            JSONOutput.sources = {};
            totalOutput.forEach(function (x) {
                const timestamp = x.time_stamp;
                const source = x.source;
                const displayName = x.display_name;
                JSONOutput.sources[`${displayName}: ${timestamp.toISOString().split("T")[0]}`] = {
                    timestamp,
                    source,
                };
            });
            return JSONOutput;
        case "NetworkFromGeneProtein":
            if (totalOutput.length > 0) {
                JSONOutput.standardName = totalOutput[0].standard_name;
                JSONOutput.displayGeneId = totalOutput[0].display_gene_id;
                JSONOutput.geneId = totalOutput[0].gene_id;
                JSONOutput.length = totalOutput[0].length;
                JSONOutput.molecularWeight = totalOutput[0].molecular_weight;
                JSONOutput.PI = totalOutput[0].PI;
            }
            return JSONOutput;
        case "GenerateProteinNetwork":
            JSONOutput.links = {};
            for (let connection of totalOutput) {
                if (JSONOutput.links[connection.protein1] === undefined) {
                    JSONOutput.links[connection.protein1] = [connection.protein2];
                } else {
                    JSONOutput.links[connection.protein1].push(connection.protein2);
                }
            }
            return JSONOutput;
        default:
            return JSONOutput;
    }
};

module.exports = {
    queryProteinDatabase: function (req, res) {
        sequelize
            .query(buildQueryByType(req.query), { type: sequelize.QueryTypes.SELECT })
            .then(function (stdname) {
                const response = convertResponseToJSON(req.query.type, stdname);
                return res.send(response);
            });
    },
};
