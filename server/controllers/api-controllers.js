module.exports = function (app) {
    const request = require("request");

    const UNIPROT_HOST = " http://www.uniprot.org";
    const JASPAR_HOST = "http://jaspar.genereg.net";

    const relay = (req, res, host) => {
        const url = host + req.url;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        req.pipe(request(url)).pipe(res);
    };

    app.use("/uniprot/", (req, res) => {
        relay(req, res, UNIPROT_HOST);
    });

    app.use("/uniprot/", (req, res) => {
        relay(req, res, UNIPROT_HOST);
    });
};
