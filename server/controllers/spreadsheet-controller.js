var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util');
    
module.exports = function (app) {
  
  //parse the incoming form data, then parse the spreadsheet. Finally, send back json.
  app.post('/upload', function (req, res) {
    //TODO: Add file validation
    var form = new multiparty.Form(),
        currentSheet;
    form.parse(req, function (err, fields, files) {
      if (err) return res.json(400, err);
      var sheet = xlsx.parse(files.upload[0].path);
      //For the time being, send the result in a form readable by people
      //TODO: Optimize the result for D3
      res.header('Access-Control-Allow-Origin', '*');
      res.writeHead(200, {'content-type': 'text/plain'});
      for (var i = 0; i < sheet.worksheets.length; i++) {
        currentSheet = sheet.worksheets[i];
        res.write(currentSheet.name + '\n\n');
        for (var j = 0; j < currentSheet.data.length; j++) {
          try {
            for(var k = 0; k < currentSheet.data[j].length; k++) {
              try {
              res.write(currentSheet.data[j][k].value + ' ');
              } catch (err) {
                console.log(err);
              }
            }
          } catch (err) {
            console.log(err);
          }
          res.write('\n');
        }
        res.write('\n');
      }
      res.end();
    });
  });
}