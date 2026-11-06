module.exports = function (app) {
    const request = require("request");

    const UNIPROT_HOST = "https://rest.uniprot.org";
    const JASPAR_HOST = "http://jaspar.genereg.net";
    const YEASTMINE_HOST = "https://www.yeastgenome.org";
    const NCBI_HOST = "https://eutils.ncbi.nlm.nih.gov";
    const ENSEMBL_HOST = "http://rest.ensembl.org";

    const { Readable } = require("stream");
    const qs = require("qs"); // already installed as a dependency of express/body-parser

    // Headers that must not be copied verbatim to the upstream request
    const SKIP_REQUEST_HEADERS = new Set([
        "host",              // must be the target host, not localhost:5000
        "content-length",    // must match the bytes actually sent
        "connection",
        "keep-alive",
        "transfer-encoding",
        "upgrade",
        "te",
        "trailer",
        "proxy-authorization",
    ]);

    // Headers fetch has already handled (it decompresses the body)
    const SKIP_RESPONSE_HEADERS = new Set([
        "content-encoding",
        "content-length",
        "transfer-encoding",
        "connection",
        "keep-alive",
    ]);

    const relay = async (req, res, host) => {
        // req.url keeps the path and query string after the mount path is stripped
        const url = host + req.url;

        // Preserve all original headers except the ones that have to change
        const headers = {};
        for (const [name, value] of Object.entries(req.headers)) {
            if (!SKIP_REQUEST_HEADERS.has(name.toLowerCase())) {
                headers[name] = value;
            }
        }

        // Preserve the body
        let body;
        let duplex;
        if (!["GET", "HEAD"].includes(req.method)) {
            if (req._body) {
                // A body parser already consumed the stream, so rebuild from req.body
                const type = req.headers["content-type"] || "";
                if (type.includes("application/json")) {
                    body = JSON.stringify(req.body);
                } else if (type.includes("application/x-www-form-urlencoded")) {
                    body = qs.stringify(req.body);
                }
            } else {
                // No parser touched it (e.g. multipart), so stream the original bytes
                body = req;
                duplex = "half"; // required by Node's fetch for stream bodies
            }
        }

        try {
            const upstream = await fetch(url, {
                method: req.method,
                headers,
                body,
                duplex,
                // redirect: "manual", // pass redirects to the browser unchanged
            });

            res.status(upstream.status);
            upstream.headers.forEach((value, name) => {
                if (!SKIP_RESPONSE_HEADERS.has(name.toLowerCase())) {
                    res.setHeader(name, value);
                }
            });

            // Same CORS headers as your original function
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );

            if (upstream.body) {
                Readable.fromWeb(upstream.body).pipe(res);
            } else {
                res.end();
            }
        } catch (err) {
            console.error("Relay error for", url, err);
            if (!res.headersSent) {
                res.status(502).send("Bad gateway: " + err.message);
            }
        }
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
