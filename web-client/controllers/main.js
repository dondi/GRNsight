module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('upload', {title: 'Upload'});
  });
  
  app.get('/graph', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.render('graph', {title: 'Graph'});
  });
}