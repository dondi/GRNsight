var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util');
    
module.exports = function (app) {

  app.get('/upload', function (req, res) {
    //Probably a better way to do this.
    res.redirect('http://localhost:3001/graph');
  });
  //parse the incoming form data, then parse the spreadsheet. Finally, send back json.
  app.post('/upload', function (req, res) {
    //TODO: Add file validation
    var form = new multiparty.Form(),
        currentSheet,
        network = {genes: [],
                   links: []};
    form.parse(req, function (err, fields, files) {
      if (err) return res.json(400, err);
      var sheet = xlsx.parse(files.upload[0].path);
      //For the time being, send the result in a form readable by people
      //TODO: Optimize the result for D3
      res.header('Access-Control-Allow-Origin', '*');
      for (var i = 0; i < sheet.worksheets.length; i++) {
        currentSheet = sheet.worksheets[i];
        if (currentSheet.name == "network") {
          for (var j = 1; j < currentSheet.data.length; j++) {
            try {
              network.genes.push(currentSheet.data[0][j].value);
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      req.session.data = network;
      res.redirect('http://localhost:3001/graph');
    });
  });
}