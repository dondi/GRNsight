module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('upload', {title: 'Upload'});
  });
  
  app.get('/graph', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.render('graph', {title: 'Graph'});
  });
}