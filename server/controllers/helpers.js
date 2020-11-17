var constants = require(__dirname + "/constants");

var createEmptyNetwork = function () {
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

// Outside of module.exports because needs too access createEmptyNetwork
var initNetwork = function (net) {
    const network = createEmptyNetwork();
    Object.assign(network, net);    // copies fields without overriding empty ones :)
    return network;
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

    createEmptyNetwork: createEmptyNetwork,
    initNetwork: initNetwork

};
