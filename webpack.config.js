var path = require("path");
module.exports = {
    entry: "./web-client/public/js/grnsight.js",
    output: {
        path: `${__dirname}/web-client/public/js`,
        filename: "grnsight.min.js"
    },
    module: {
        rules: [
            { test: path.join(__dirname, "es6"),
                loader: "babel-loader" }
        ]
    },
    resolve: {
        modules: ["js", "node_modules"],
    }
};
