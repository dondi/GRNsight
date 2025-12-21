var constants = require(__dirname + "/constants");

var createEmptyWorkbook = function () {
    return {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: "",
        meta: {},
        expression: {},
    };
};

// Outside of module.exports because needs too access createEmptyWorkbook
var initWorkbook = function (net) {
    const workbook = createEmptyWorkbook();
    Object.assign(workbook, net); // copies fields without overriding empty ones :)
    return workbook;
};

module.exports = {
    // Allow more than 1 CORS origin so can serve web-client and web-client-classic
    attachCorsHeader: function (res, app) {
        const allowedOrigins = Array.isArray(app.get("corsOrigin"))
            ? app.get("corsOrigin")
            : [app.get("corsOrigin")];

        const origin = app.get("corsOrigin");
        if (origin && allowedOrigins.includes(origin)) {
            res.header("Access-Control-Allow-Origin", origin);
        }
    },

    attachFileHeaders: function (res, path) {
        res.header("Access-Control-Allow-Methods", "POST, GET");
        res.header("Access-Control-Expose-Headers", constants.GRNSIGHT_FILENAME_HEADER);
        res.header(constants.GRNSIGHT_FILENAME_HEADER, path.split("/").pop());
    },

    createEmptyWorkbook: createEmptyWorkbook,
    initWorkbook: initWorkbook,
};
