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
            idle: 10000
        }
    }
);

//import { PPI_DATABASE_NAMESPACE, PPI_DATABASE_NAMESPACE_OLD, timestampNamespace, timestampOld } from "./constants";
const PPI_DATABASE_NAMESPACE = "protein_protein_interactions_new";
const PPI_DATABASE_NAMESPACE_OLD = "protein_protein_interactions";
const DATABASE_TIMESTAMP_CUTOFF = new Date("2025-01-01");

const timestampNamespace = function(timestamp, namespace, oldNamespace) {
    return timestamp < new Date("2025-01-01") ? namespace : oldNamespace;
};

const timestampOld = function(timestamp) {
    return timestamp < DATABASE_TIMESTAMP_CUTOFF;
};

const buildNetworkSourceQuery = function () {
    return `SELECT * FROM ${PPI_DATABASE_NAMESPACE_OLD}.source
            UNION ALL
            SELECT * FROM ${PPI_DATABASE_NAMESPACE}.source
            ORDER BY time_stamp DESC;`;
};

const buildNetworkFromGeneProteinQuery = function (geneProtein, timestamp) {
    const namespace = `${timestampNamespace(timestamp, PPI_DATABASE_NAMESPACE, PPI_DATABASE_NAMESPACE_OLD)}`;
    const timestamp_query = timestampOld(timestamp) ? "": `AND gene.time_stamp ='${timestamp}`;
    return `SELECT DISTINCT gene_id, display_gene_id, standard_name, length, molecular_weight, PI FROM
    ${namespace}.gene, ${namespace}.protein WHERE
    (LOWER(gene.gene_id)=LOWER('${geneProtein}') OR LOWER(gene.display_gene_id)=LOWER('${geneProtein}')
    OR LOWER(protein.standard_name) =LOWER('${geneProtein}')) AND
    LOWER(gene.gene_id) = LOWER(protein.gene_systematic_name) ${timestamp_query};`;
};

const buildNetworkProteinsQuery = function (proteinString) {
    let proteins = "(";
    let proteinList = proteinString.split(",");
    proteinList.forEach(x => proteins += ( `(physical_interactions.protein1 =\'${x}\') OR `));
    proteins = `${proteins.substring(0, proteins.length - 4)}) AND (`;
    proteinList.forEach(x => proteins += ( `(physical_interactions.protein2 =\'${x}\') OR `));
    return `${proteins.substring(0, proteins.length - 4)})`;
};

const buildGenerateProteinNetworkQuery = function (proteins, timestamp, source) {
    const namespace = `${timestampNamespace(timestamp, PPI_DATABASE_NAMESPACE, PPI_DATABASE_NAMESPACE_OLD)}`;
    const annotation = timestampOld(timestamp) ? "" : ", annotation_type";
    return `SELECT DISTINCT protein1, protein2${annotation} FROM ${namespace}.physical_interactions
            ${namespace}.time_stamp='${timestamp}' AND ${namespace}.source='${source}' AND
            ${buildNetworkProteinsQuery(proteins)} ORDER BY protein1 DESC;`;
};

const buildQueryByType = function (query) {
    const networkQueries = {
        "NetworkSource": () => buildNetworkSourceQuery(),
        "NetworkFromGeneProtein": () => buildNetworkFromGeneProteinQuery(query.geneProtein),
        "GenerateProteinNetwork": () => buildGenerateProteinNetworkQuery(query.proteins, query.timestamp, query.source)
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
            JSONOutput.sources[`${displayName}: ${timestamp.toISOString().split("T")[0]}`] = {timestamp, source};
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
        sequelize.query(buildQueryByType(req.query), { type: sequelize.QueryTypes.SELECT })
            .then(function (stdname) {
                const response = convertResponseToJSON(req.query.type, stdname);
                return res.send(response);
            });
    }
};