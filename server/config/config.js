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
        }
    },

    production: {
        host: "grnsight.cs.lmu.edu",
        port: 3000,
        url: "http://" + this.host + "/server",
        corsOrigin: "http://grnsight.cs.lmu.edu",
        root: rootPath,
        app: {
            name: "GRNsight"
        }
    },

    beta: {
        host: "grnsight.cs.lmu.edu",
        port: 4000,
        url: "http://" + this.host + "/beta/server/",
        corsOrigin: "http://grnsight.cs.lmu.edu",
        root: rootPath,
        app: {
            name: "GRNsight"
        }
    }
};
