var path = require("path");
var rootPath = path.normalize(__dirname + "/..");

module.exports = {
    development: {
        host: "localhost",
        port: 5001,
        url: "http://" + this.host + "/" + this.port,
        root: rootPath,
        app: {
            name: "GRNsight",
        },
        serviceRoot: "//localhost:5000",
    },

    production: {
        host: "grnsight.lmucs.org",
        port: 3001,
        url: "https://" + this.host + "/client",
        root: rootPath,
        app: {
            name: "GRNsight",
        },
        serviceRoot: "//grnsight.lmucs.org/server",
    },

    beta: {
        host: "grnsight.lmucs.org",
        port: 4001,
        url: "https://" + this.host + "/beta/client",
        root: rootPath,
        app: {
            name: "GRNsight",
        },
        serviceRoot: "//grnsight.lmucs.org/beta/server",
    },
};
