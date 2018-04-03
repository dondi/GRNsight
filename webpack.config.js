var path = require("path");
module.exports = {
    entry: "./web-client/public/js/grnsight.js",
    output: {
        path: `${__dirname}/web-client/public/js`,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: path.join(__dirname, "es6"),
                loader: "babel-loader" }
        ]
    }
};
