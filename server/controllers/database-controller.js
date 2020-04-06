var Sequelize = require("sequelize");

var sequelize = new Sequelize('grnsight_database', 'grnsight', "PASSWORD", {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
  });

module.exports = function(app) {
// respond with "hello world" when a GET request is made to the homepage
    app.get('/hello-world', function (req, res) {
        try {
           return res.send('hello world')
        } catch (e) {
            res.json({error: e.message});
        }


    })

    app.get('/first-query', function (req, res) {
        try {
            return sequelize.query("SELECT standard_name FROM degradationrates", { type: sequelize.QueryTypes.SELECT }).then(function(stdname) {
                return res.send(stdname);
            });
        } catch (e) {
            res.json({error: e.message});
        }
    })

}
