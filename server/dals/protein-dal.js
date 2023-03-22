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

const buildNetworkFromGeneProteinQuery = function (gene_protein) {
    return `SELECT DISTINCT gene_id, display_gene_id, standard_name, length, molecular_weight, PI FROM
 protein_protein_interactions.gene, protein_protein_interactions.protein WHERE
 (gene.gene_id ='${gene_protein}' OR gene.display_gene_id ='${gene_protein}' OR protein.standard_name ='${query}') AND
 gene.gene_id = protein.gene_systematic_name;`;
};

const buildNetworkProteinsQuery = function (proteinString) {
    let proteins = "(";
    let proteinList = proteinString.split(",");
    proteinList.forEach(x => proteins += ( `(physical_interactions.protein1 =\'${x}\') OR `));
    proteins = `${genes.substring(0, proteins.length - 4)}) AND (`;
    proteinList.forEach(x => proteins += ( `(physical_interactions.protein2 =\'${x}\') OR `));
    return `${proteins.substring(0, proteins.length - 4)})`;

};

const buildGenerateProteinNetworkQuery = function (proteins) {
    return `SELECT DISTINCT protein1, protein2, interaction_detection_methods_identifier, experiment_name FROM
 protein_protein_interactions.physical_interactions WHERE
 ${buildNetworkProteinsQuery(proteins)} ORDER BY protein1 DESC;`;
};

const buildQueryByType = function (query) {
    const networkQueries = {
        "NetworkFromGeneProtein": () => buildNetworkFromGeneProteinQuery(query.gene_protein),
        "GenerateProteinNetwork": () => buildGenerateProteinNetworkQuery(query.proteins)
    };
    if (Object.keys(networkQueries).includes(query.type)) {
        return networkQueries[query.type]();
    }
};

const convertResponseToJSON = function (queryType, totalOutput) {
    let JSONOutput = {};
    switch (queryType) {
    case "NetworkFromGeneProtein":
        if (totalOutput.length > 0) {
            JSONOutput.standard_name = totalOutput[0].standard_name;
            JSONOutput.displayGeneId = totalOutput[0].display_gene_id;
            JSONOutput.geneId = totalOutput[0].gene_id;
            JSONOutput.length = totalOutput[0].length;
            JSONOutput.molecular_weight = totalOutput[0].molecular_weight;
            JSONOutput.PI = totalOutput[0].PI;
        }
        JSONOutput.completed = true;
        return JSONOutput;
    case "GenerateProteinNetwork":
        for (let connection of totalOutput) {
            JSONOutput[(connection.protein1, connection.protein2)] = {
                idmi: connection.interaction_detection_methods_identidier,
                experiment: connection.experiment_name
            };
        }

        JSONOutput.completed = true;
        return JSONOutput;
    default:
        return JSONOutput;
    }

};

module.exports = {
    queryProteinDatabase: function (req, res) {
        sequelize.query(buildQueryByType(req.query.type, req.query), { type: sequelize.QueryTypes.SELECT })
            .then(function (stdname) {
                const response = convertResponseToJSON(req.query.type, stdname);
                return res.send(response);
            });
    }
};