var path = require("path");
var rootPath = path.normalize(__dirname + "/..");

module.exports = {
    development: {
        host: "localhost",
        port: 5000,
        url: "http://" + this.host + "/" + this.port,
        corsOrigin: "http://localhost:5001",
        root: rootPath,
        app: {
            name: "GRNsight"
        },
        databaseHost: "localhost",  // This will most likely stay as localhost due to tunneling.
        databaseName: "postgres",
        databaseDialect: "postgres"
    },

    production: {
        host: "grnsight.cs.lmu.edu",
        port: 3000,
        url: "https://" + this.host + "/server",
        corsOrigin: "//grnsight.cs.lmu.edu",
        root: rootPath,
        app: {
            name: "GRNsight"
        },
        databaseHost: "grnsight2.cfimp3lu6uob.us-west-1.rds.amazonaws.com",
        databaseName: "postgres",
        databaseDialect: "postgres"
    },

    beta: {
        host: "grnsight.cs.lmu.edu",
        port: 4000,
        url: "https://" + this.host + "/beta/server/",
        corsOrigin: "//grnsight.cs.lmu.edu",
        root: rootPath,
        app: {
            name: "GRNsight"
        },
        databaseHost: "grnsight2.cfimp3lu6uob.us-west-1.rds.amazonaws.com",
        databaseName: "postgres",
        databaseDialect: "postgres"
    }
};
