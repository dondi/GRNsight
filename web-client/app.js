// GRNsight web client

var express = require('express'),
    http = require('http'),
    path = require('path'),
    stylus = require('stylus');
    
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    app = express();
    
app.set('port', process.env.PORT || config.port || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(express.cookieSession());
app.use(app.router);
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

app.set('serviceRoot', config.serviceRoot);
console.log('Web service root: ' + app.get('serviceRoot'));

require('./controllers/main')(app);

//Dont start the server if this app is run as a child process.
if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function () {
    console.log('GRNsight web client running on port %s, environment=%s', app.get('port'), env);
  });
} else {
  module.exports = app;
}
