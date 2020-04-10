var Sequelize = require("sequelize");

var sequelize = new Sequelize('grnsight_database', 'USERNAME', 'PASSWORD', {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
});

const userSelection = {dataset: 'Barreto_2018_wt', timepoints: ['10','60']};  // Example; need to connect to actual user selection
// URL should be expressiondb?dataset=Dahlquist_2018_dcin5&timepoints=15,30,60

function buildTimepointsString(selection) {
    let timepoints = '';
    selection.timepoints.forEach(x => timepoints += (x + ','));
    return timepoints.substring(0, timepoints.length - 1);
}

function buildURL(selection) {
    const timepoints = buildTimepointsString(selection);
    return '/expressiondb?dataset=' + selection.dataset + '&timepoints=' + timepoints; 
}

function buildTimepointsQuery(selection) {
    let timepoints = '';
    console.log(selection.timepoints);
    selection.forEach(x => timepoints += ('timepoints=\'' + x + '\' OR '));
    return timepoints.substring(0, timepoints.length - 4);
}

function buildQuery(selection) {
    return "SELECT * FROM expressiondata WHERE dataset=\'" + selection.dataset + "\' AND (" + buildTimepointsQuery(selection.timepoints) + ");";
}


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

    app.get('/expression1', function (req, res) {
        try {
            console.log(buildQuery(userSelection));
            return sequelize.query(buildQuery(userSelection), { type: sequelize.QueryTypes.SELECT }).then(function(stdname) {
                return res.send(stdname);
            });
        } catch (e) {
            res.json({error: e.stack});
            res.json({error: e.name});
            res.json({error: e.message});

        }
    })

    app.get('/tester', (req, res) => {
        console.log(req.query)
        res.send(req.query);
    })    

}
