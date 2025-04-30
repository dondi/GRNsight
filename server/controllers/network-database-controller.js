var networkDal = require(__dirname + "/../dals/network-dal");

module.exports = function (app) {
    app.get("/networkdb", function (req, res) {
        try {
            return networkDal.queryNetworkDatabase(req, res);
        } catch (e) {
            res.json({ error: e.stack });
            res.json({ error: e.name });
            res.json({ error: e.message });
        }
    });
};
