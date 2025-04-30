var proteinDal = require(__dirname + "/../dals/protein-dal");

module.exports = function (app) {
    app.get("/proteindb", function (req, res) {
        try {
            return proteinDal.queryProteinDatabase(req, res);
        } catch (e) {
            res.json({ error: e.stack });
            res.json({ error: e.name });
            res.json({ error: e.message });
        }
    });
};
