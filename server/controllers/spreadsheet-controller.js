var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util');
    
module.exports = function (app) {

  //parse the incoming form data, then parse the spreadsheet. Finally, send back json.
  app.post('/upload', function (req, res) {
    //TODO: Add file validation
    var form = new multiparty.Form(),
        currentSheet,
        network = {genes: [],
                   links: []},
        currentLink,
        currentGene;
    form.parse(req, function (err, fields, files) {
      if (err) return res.json(400, err);
      try {
        var sheet = xlsx.parse(files.file[0].path);
      } catch (err) {
        return res.json(400, err);
      }
      //For the time being, send the result in a form readable by people
      //TODO: Optimize the result for D3
      res.header('Access-Control-Allow-Origin', 'http://grnsight.cs.lmu.edu');
      for (var i = 0; i < sheet.worksheets.length; i++) {
        currentSheet = sheet.worksheets[i];
        if (currentSheet.name == "network") {
          for (var j = 1; j < currentSheet.data.length; j++) {
            try {
              currentGene = {name: currentSheet.data[0][j].value}
              network.genes.push(currentGene);
            } catch (err) {
              console.log(err);
            }
            for(var k = 1; k < currentSheet.data[j].length; k++) {
              try {
                if (currentSheet.data[j][k].value == 1) {
                  currentLink = {source: k - 1, target: j - 1};
                  network.links.push(currentLink);
                }
              } catch (err) {
                console.log(err);
              }
            }
          }
        }
      }
      res.json(network);
    });
  });
}