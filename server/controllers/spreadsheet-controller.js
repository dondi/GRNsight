var multiparty = require('multiparty');

module.exports = function (app) {
  
  //Send the upload file form to the web client
  app.get('/', function (req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
      '<input type="file" name="upload"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    );
  }); 
  
  //parse the incoming form data, then parse the spreadsheet. Finally, send back json.
  app.post('/upload', function (req, res) {
  
  });
}