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
    return "SELECT * FROM expressiondata WHERE dataset=\'" + selection.dataset + "\' AND (" + buildTimepointsQuery(selection.timepoints) + ") ORDER BY sortindex;";
}

function listUniqueGenes(arrayOfObjects) {
    let uniqueGenes = [];
    arrayOfObjects.forEach(function(x) {
        if(!uniqueGenes.includes(x.standardname)) {
            uniqueGenes.push(x.standardname);
        }
    });
    return uniqueGenes;
}

function listGeneData(gene, totalOutput) {
    let listOfData = [];
    totalOutput.forEach(function(x) {
        if(x.standardname === gene) {
            listOfData.push(Number(x.expression));
        }
    });
    return listOfData;
}

function convertToJSON(totalOutput, dataset, timePoints, allGenes) {
    let JSONOutput = {};
    JSONOutput[dataset] = {};
    JSONOutput[dataset].time_points = timePoints;
    JSONOutput[dataset].data = {};
    JSONOutput[dataset].data.id = timePoints;
    allGenes.forEach(x => JSONOutput[dataset].data[x.toString()] = listGeneData(x, totalOutput));
    return JSONOutput;
}

let expressionResult = [];


module.exports = function(app) {
    app.get('/hello-world', function (req, res) {
        try {
           return res.send('hello world')
        } catch (e) {
            res.json({error: e.message});
        }


    })

    app.get('/first-query', function (req, res) {
        try {
            return sequelize.query("SELECT standardname FROM expressiondata", { type: sequelize.QueryTypes.SELECT }).then(function(stdname) {
                return res.send(stdname);
            });
        } catch (e) {
            res.json({error: e.message});
        }
    })

    //      so, like expression: {different expression sheets possible{time points[], data{id[], various genes[]}}}

    app.get('/expression', function (req, res) {
        try {
            console.log(buildQuery(userSelection));
            return sequelize.query(buildQuery(userSelection), { type: sequelize.QueryTypes.SELECT }).then(function(stdname) {
                expressionResult = stdname;
                let possibleExpressionSheet = userSelection.dataset;
                // let possibleTimePoints = [10, 10, 60, 60, 60, 60] <-- probably need to make an "if" statement based on which data set it is. Seems easier that way.
                // In this case,
                let possibleTimePoints = [10, 10, 60, 60, 60, 60];
                let genes = listUniqueGenes(stdname);
                let response = convertToJSON(stdname, possibleExpressionSheet, possibleTimePoints, genes);
                return res.send(response);
            });
        } catch (e) {
            res.json({error: e.stack});
            res.json({error: e.name});
            res.json({error: e.message});

        }
    })

    // Things I know from uploaded Network:
    //     - genes
    // What I have to give back and how:
    //     - time_points:
    //         - list of time time points   
    //     - data
    //         - id 
    //             - list of time points
    // Network:  
        // {genes: Array(15), links: Array(28), errors: Array(0), warnings: Array(0), positiveWeights: Array(28), …}
        // genes: Array(15)
            // 0:
                // name: "ACE2"
                // index: 0
                // x: 562.7069758246914
                // y: 39.92065029733126
                // vy: 0.00004817523680232281
                // vx: -0.0005783246758350776
                // textWidth: 68.5625
                // fx: null
                // fy: null
                // centerX: 599.9882258246914
                // centerY: 54.92065029733126
                // newY: 54.92065029733126
                // newX: 599.9882258246914
                // __proto__: Object
            // 1: {name: "ASH1", index: 1, x: 480.20812761009967, y: 535.8017979626575, vy: 0.00007509182641050715, …}
            // 2: {name: "CIN5", index: 2, x: 804.50211113051, y: 46.09741084523072, vy: -0.00015232705727521247, …}
            // 3: {name: "GCR2", index: 3, x: 777.7903275203106, y: 461.50714618782774, vy: -0.00024219169839839418, …}
            // 4: {name: "GLN3", index: 4, x: 557.6248129126207, y: 434.3438960190816, vy: -0.00023017555960405791, …}
            // 5: {name: "HAP4", index: 5, x: 851.5943564645112, y: 477.85675759090975, vy: -0.0000347929342864352, …}
            // 6: {name: "HMO1", index: 6, x: 381.72096495810615, y: 471.3386171793863, vy: -0.000025035659913353614, …}
            // 7: {name: "MSN2", index: 7, x: 498.2443804097911, y: 46.72633933008382, vy: 0.000049892247207021776, …}
            // 8: {name: "SFP1", index: 8, x: 746.74553772352, y: 531.0353557153859, vy: -0.00011866883756499678, …}
            // 9: {name: "STB5", index: 9, x: 361.81998769530543, y: 259.9694355154056, vy: 0.00026393028965110914, …}
            // 10: {name: "SWI4", index: 10, x: 385.7165577121314, y: 561.3365807971625, vy: -0.00008277128374604154, …}
            // 11: {name: "SWI5", index: 11, x: 633.6810414950385, y: 50.40420578738791, vy: 0.00005710451356039595, …}
            // 12: {name: "YHP1", index: 12, x: 145.50572015087874, y: 150.60204994765766, vy: -0.00016737581204118727, …}
            // 13: {name: "YOX1", index: 13, x: 868.4453771667121, y: 383.79004144939825, vy: -0.00008773531045108332, …}
            // 14: {name: "ZAP1", index: 14, x: 193.6909043531225, y: 379.26850282625537, vy: -0.0005656687979834023, …}
            // length: 15
            // __proto__: Array(0)
        // links: (28) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // errors: []
        // warnings: []
        // positiveWeights: (28) [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        // negativeWeights: []
        // sheetType: "unweighted"


        // expression:
            // wt_log2_expression:
                // time_points: Array(13)
                    // 0: 15
                    // 1: 15
                    // 2: 15
                    // 3: 15
                    // 4: 30
                    // 5: 30
                    // 6: 30
                    // 7: 30
                    // 8: 30
                    // 9: 60
                    // 10: 60
                    // 11: 60
                    // 12: 60
                    // length: 13
                    // __proto__: Array(0)
                // data:
                    // id: Array(13)
                        // 0: 15
                        // 1: 15
                        // 2: 15
                        // 3: 15
                        // 4: 30
                        // 5: 30
                        // 6: 30
                        // 7: 30
                        // 8: 30
                        // 9: 60
                        // 10: 60
                        // 11: 60
                        // 12: 60
                        // length: 13
                        // __proto__: Array(0)
                    // ACE2: Array(13)
                        // 0: 0.6139
                        // 1: -1.0689
                        // 2: 0.1906
                        // 3: -0.398
                        // 4: 0.5827
                        // 5: null
                        // 6: -0.3947
                        // 7: -0.6264
                        // 8: 0.3377
                        // 9: 0.817
                        // 10: 0.5566
                        // 11: -0.4357
                        // 12: -1.2497
                        // length: 13
                        // __proto__: Array(0)
                    // ASH1: (13) [0.97, 0.3043, -0.9904, -0.2636, -0.382, 0.4206, -0.4911, -0.1284, -0.7236, -1.3477, -1.0468, -1.0978, -0.9248]
                    // CIN5: (13) [-0.1373, -0.0997, 1.2386, 1.3909, -0.4224, 0.5461, 1.0285, 1.2338, 2.2159, 2.1796, 0.8447, 2.4687, 1.4785]
                    // GCR2: (13) [0.5064, 0.8905, -0.1242, -1.1405, 0.3837, 0.8525, 0.0988, -0.3273, -0.2982, -0.315, -0.5999, -0.9447, -0.3585]
                    // GLN3: (13) [-1.3141, 0.3939, 0.1439, -0.5133, -0.7004, -0.2467, 1.4085, 0.9733, 0.6504, 0.2025, 0.8924, 0.9007, 0.1953]
                    // HAP4: (13) [0.5138, 1.9214, -0.8859, -2.6542, 0.138, 1.5184, 0.2794, -2.5135, -1.1181, 0.2225, -1.0353, -0.2074, -1.8463]
                    // HMO1: (13) [0.3058, 0.2392, 1.8398, 1.2493, -0.9525, 1.405, 1.3109, 1.2569, 1.9007, 1.4816, 0.938, 1.8391, 2.2172]
                    // MSN2: (13) [-1.0625, 0.9246, 0.1666, -0.2696, 0.3585, 0.9514, 0.1233, 1.2802, -0.6808, 0.7634, 1.3451, 0.8355, -0.1271]
                    // SFP1: (13) [0.0307, 2.1525, 1.2789, -0.4526, 0.6917, 0.5342, 2.2598, -0.9232, 0.8293, 1.3828, 0.9004, 0.8888, -1.0367]
                    // STB5: (13) [-1.6758, -0.4986, 0.38, -0.1274, -2.5269, -1.9189, 0.5443, 0.0845, 0.0407, -1.3691, -2.6627, 0.2028, -0.2748]
                    // SWI4: (13) [-0.9286, -0.023, -0.3651, -0.3278, -0.4798, 0.2047, 0.3222, -0.2377, -0.6369, -1.4226, -0.5294, 0.2996, 0.2812]
                    // SWI5: (13) [-0.7675, -0.2033, -0.9106, -0.7234, -1.9049, 0.7854, -0.257, -0.1687, -1.0667, 0.1028, -0.0286, 0.4798, 0.097]
                    // YHP1: (13) [-1.1269, -0.21, -0.6676, -1.6964, -0.3496, 1.2371, 0.9432, -0.3621, -1.8086, 0.6617, 0.6192, 0.205, -0.725]
                    // YOX1: (13) [-0.2025, -1.0587, -0.6402, -2.2532, -0.083, -1.6117, -0.104, -0.1487, -0.9394, -0.5901, 0.1329, -0.7222, -0.5117]
                    // ZAP1: (13) [0.6594, 0.6135, 0.3238, -0.3712, 1.4712, 1.9049, 0.599, -0.2354, -0.394, 2.9606, 3.5569, 1.3863, null]
                    // __proto__: Object
                    // __proto__: Object
            // dcin5_log2_expression: {time_points: Array(12), data: {…}}
            // dgln3_log2_expression: {time_points: Array(12), data: {…}}
            // dhap4_log2_expression: {time_points: Array(12), data: {…}}
            // dhmo1_log2_expression: {time_points: Array(12), data: {…}}
            // dzap1_log2_expression: {time_points: Array(12), data: {…}}
            // __proto__: Object
        // meta: {alpha: 0.002, kk_max: 1, MaxIter: 100000000, TolFun: 0.000001, MaxFunEval: 100000000, …}
        // test: {production_rates: {…}, degradation_rates: {…}, threshold_b: {…}}
    

    app.get('/tester', (req, res) => {
        console.log(req.query)
        res.send(req.query);
    })    

}
