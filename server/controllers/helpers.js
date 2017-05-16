var constants = require(__dirname + "/constants");

module.exports = {

    attachCorsHeader: function (res, app) {
        res.header("Access-Control-Allow-Origin", app.get("corsOrigin"));
    },

    attachFileHeaders: function (res, path) {
        res.header("Access-Control-Allow-Methods", "POST, GET");
        res.header("Access-Control-Expose-Headers", constants.GRNSIGHT_FILENAME_HEADER);
        res.header(constants.GRNSIGHT_FILENAME_HEADER, path.split("/").pop());
    }

};
