module.exports = function (app) {
    const request = require("request");

    const UNIPROT_HOST = " http://www.uniprot.org";
    const JASPAR_HOST = "http://jaspar.genereg.net";
    const YEASTMINE_HOST = "https://www.yeastgenome.org";
    const NCBI_HOST = "https://eutils.ncbi.nlm.nih.gov";
    const ENSEMBL_HOST = "http://rest.ensembl.org";

    const relay = (req, res, host) => {
        const url = host + req.url;
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        req.pipe(request(url)).pipe(res);
    };

    app.use("/uniprot/", (req, res) => {
        relay(req, res, UNIPROT_HOST);
    });

    app.use("/jaspar/", (req, res) => {
        relay(req, res, JASPAR_HOST);
    });

    app.use("/yeastmine/", (req, res) => {
        relay(req, res, YEASTMINE_HOST);
    });

    app.use("/ncbi/", (req, res) => {
        relay(req, res, NCBI_HOST);
    });

    app.use("/ensembl/", (req, res) => {
        relay(req, res, ENSEMBL_HOST);
    });
};
