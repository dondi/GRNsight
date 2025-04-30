var grnsettingDal = require(__dirname + "/../dals/grnsetting-dal");

module.exports = function (app) {
    app.get("/grnsettingsdb", function (req, res) {
        try {
            return grnsettingDal.queryDefaultDataset(req, res);
        } catch (e) {
            res.json({ error: e.stack });
            res.json({ error: e.name });
            res.json({ error: e.message });
        }
    });
};
