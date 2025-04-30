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

const createCustomWorkbook = (genesString, linksString, networkType) => {
    const g = genesString.split(",");
    let genes = g.map(gene => {
        return { name: gene };
    });
    let links =
        linksString === ""
            ? []
            : linksString.split(",").map(link => {
                  link = link.split("->");
                  return {
                      source: g.indexOf(link[0]),
                      target: g.indexOf(link[1]),
                      value: 1,
                      type: "arrowhead",
                      stroke: "black",
                  };
              });
    let positiveWeights = Array(links.length).fill(1);
    return {
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
                taxon_id: 559292,
                workbookType: networkType,
            },
        },
        meta2: {},
        twoColumnSheets: {},
        expression: {},
    };
};

module.exports = function (app) {
    if (app) {
        // Load Custom Workbook
        app.get("/upload-custom-workbook", function (req, res) {
            let workbook = createCustomWorkbook(
                req.query.genes,
                req.query.links,
                req.query.networkType
            );
            return processCustomWorkbook(req.query.name, res, app, workbook);
        });
    }
};
