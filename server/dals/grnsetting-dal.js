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
            idle: 10000,
        },
    }
);

const buildGetDefaultDataset = function () {
    return `
    SELECT grnsettings.expression_dataset FROM settings.grnsettings;`;
};

const DefaultDatasetToJSON = totalOutput => {
    const JSONOutput = {
        defaultDataset: [],
    };
    for (let dataset of totalOutput) {
        JSONOutput.defaultDataset.push(dataset.expression_dataset);
    }
    return JSONOutput;
};

module.exports = {
    queryDefaultDataset: function (req, res) {
        return sequelize
            .query(buildGetDefaultDataset(), { type: sequelize.QueryTypes.SELECT })
            .then(function (stdname) {
                const convertToJSON = {
                    DefaultDataset: () => DefaultDatasetToJSON(stdname),
                };
                const type = req.query.type;
                return Object.keys(convertToJSON).includes(type)
                    ? res.send(convertToJSON[type]())
                    : res.status(500).send({ errors: "Something went wrong." });
            });
    },
};
