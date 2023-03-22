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
        serviceRoot: "//localhost:5000"
    },

    production: {
        host: "grnsight.cs.lmu.edu",
        port: 3001,
        url: "https://" + this.host + "/client",
        root: rootPath,
        app: {
            name: "GRNsight"
        },
        serviceRoot: "//grnsight.cs.lmu.edu/server"
    },

    beta: {
        host: "grnsight.cs.lmu.edu",
        port: 4001,
        url: "https://" + this.host + "/beta/client",
        root: rootPath,
        app: {
            name: "GRNsight"
        },
        serviceRoot: "//grnsight.cs.lmu.edu/beta/server"
    },

    "beta-lambda": {
        host: "2dz4kdk52j37d7xhm6cwi4u4wq0ydwdv.lambda-url.us-east-1.on.aws",
        port: 4001,
        url: "https://" + this.host,
        root: rootPath,
        app: {
            name: "GRNsight"
        },
        serviceRoot:
            "//o5mku5nb65lxg6bstf6ctxwium0zcaqi.lambda-url.us-east-1.on.aws"
    }
};
