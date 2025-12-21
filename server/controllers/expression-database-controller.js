var expressionDal = require(__dirname + "/../dals/expression-dal");

module.exports = function (app) {
    app.get("/expressiondb", function (req, res) {
        try {
            return expressionDal.queryExpressionDatabase(req, res);
        } catch (e) {
            res.json({ error: e.stack });
            res.json({ error: e.name });
            res.json({ error: e.message });
        }
    });
};
