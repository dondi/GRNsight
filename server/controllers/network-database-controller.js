
var expressionDal = require(__dirname + "/../dals/network-dal");


module.exports = function (app) {

    app.get("/networkdb", function (req, res) {
        try {
            return expressionDal.queryNetworkDatabase(req, res);
        } catch (e) {
            res.json({error: e.stack});
            res.json({error: e.name});
            res.json({error: e.message});

        }
    });

};
