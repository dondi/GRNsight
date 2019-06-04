var path = require("path");
var rootPath = path.normalize(__dirname + "/..");

module.exports = {
    development: {
        host: "localhost",
        port: 5001,
        url: "http://" + this.host + "/" + this.port,
        root: rootPath,
        app: {
            name: "GRNsight"
        },
        serviceRoot: "http://localhost:5000"
    },

    production: {
        host: "grnsight.cs.lmu.edu",
        port: 3001,
        url: "http://" + this.host + "/client",
        root: rootPath,
        app: {
            name: "GRNsight"
        },
        serviceRoot: "http://grnsight.cs.lmu.edu/server"
    },

    beta: {
        host: "grnsight.cs.lmu.edu",
        port: 4001,
        url: "http://" + this.host + "/beta/client",
        root: rootPath,
        app: {
            name: "GRNsight"
        },
        serviceRoot: "http://grnsight.cs.lmu.edu/beta/server"
    }
};
