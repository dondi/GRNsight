var path = require("path");
module.exports = {
    entry: "./web-client-classic/public/js/grnsight.js",
    output: {
        path: `${__dirname}/web-client-classic/public/js`,
        filename: "grnsight.min.js",
    },
    module: {
        rules: [{ test: path.join(__dirname, "es6"), loader: "babel-loader" }],
    },
};
