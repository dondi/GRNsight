var helpers = require(__dirname + "/helpers");


var processCustomWorkbook = function (path, res, app, workbook) {
    helpers.attachCorsHeader(res, app);
    helpers.attachFileHeaders(res, path);
    return workbook.errors.length === 0
        ? // If all looks well, return the workbook with an all clear
        res.json(workbook)
        : // If all does not look well, return the workbook with an error 400
        res.status(400).json(workbook);
};

const createCustomWorkbook = (genesString, linksString) => {
    let genes = genesString.split(",").map(gene => { return {name: gene};})
    let links = linksString.split(",").map( l => {
        l = l.split('->');
        return {
          source: l[0],
          target: l[1],
          value:1,
          type:"arrowhead",
          stroke: "black"
        };
    });
    let positiveWeights = Array(links.length).fill(1);
    workbook =   {
        genes,
        links,
        errors: [],
        warnings: [],
        positiveWeights,
        negativeWeights: [],
        sheetType: "unweighted",
        network: {
            genes,
            links,
            errors: [],
            warnings: [],
            positiveWeights,
        },
        meta: {
            data: {
                species: "Saccharomyces cerevisiae",
                taxon_id: 559292
            }
        },
        test: {
        },
        expression: {
        }
    };
}

module.exports = function (app) {
    if (app) {

        // Load Custom Workbook
        app.get("/upload-custom-workbook", function (req, res) {
            let workbook = createCustomWorkbook(req.query.genes, req.query.link)
            return processCustomWorkbook(req.query.name, res, app, workbook)
        });
    }
};
