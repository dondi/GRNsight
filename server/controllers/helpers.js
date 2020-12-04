var constants = require(__dirname + "/constants");

var createEmptyworkbook = function () {
    return {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: "",
        meta: {},
        expression:{}
    };
};

// Outside of module.exports because needs too access createEmptyworkbook
var initworkbook = function (net) {
    const workbook = createEmptyworkbook();
    Object.assign(workbook, net);    // copies fields without overriding empty ones :)
    return workbook;
};

module.exports = {

    attachCorsHeader: function (res, app) {
        res.header("Access-Control-Allow-Origin", app.get("corsOrigin"));
    },

    attachFileHeaders: function (res, path) {
        res.header("Access-Control-Allow-Methods", "POST, GET");
        res.header("Access-Control-Expose-Headers", constants.GRNSIGHT_FILENAME_HEADER);
        res.header(constants.GRNSIGHT_FILENAME_HEADER, path.split("/").pop());
    },

    createEmptyworkbook: createEmptyworkbook,
    initworkbook: initworkbook

};
