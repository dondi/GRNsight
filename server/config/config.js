var path = require("path");
var rootPath = path.normalize(__dirname + "/..");

module.exports = {
    development: {
        host: "localhost",
        port: 5000,
        url: "https://" + this.host + "/" + this.port,
        corsOrigin: "https://localhost:5001",
        root: rootPath,
        app: {
            name: "GRNsight"
        }
    },

    production: {
        host: "grnsight.cs.lmu.edu",
        port: 3000,
        url: "https://" + this.host + "/server",
        corsOrigin: "https://grnsight.cs.lmu.edu",
        root: rootPath,
        app: {
            name: "GRNsight"
        }
    },

    beta: {
        host: "grnsight.cs.lmu.edu",
        port: 4000,
        url: "https://" + this.host + "/beta/server/",
        corsOrigin: "https://grnsight.cs.lmu.edu",
        root: rootPath,
        app: {
            name: "GRNsight"
        }
    }
};
