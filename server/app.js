//Based on the server app for github.com/rtoal/chuzr

var express = require('express'),
    http = require('http'),
    cors = require('cors');
    
console.log('Configuring GRNsight server');

var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    app = express();

app.set('port', process.env.PORT || config.port || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cors());
//app.use(express.cookieSession());

app.set('corsOrigin', config.corsOrigin);
console.log('CORS host: ' + app.get('corsOrigin'));

// Load controllers
require(__dirname + '/controllers' + '/spreadsheet-controller')(app);

//Dont start the server if this app is run as a child process.
if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function () {
    console.log('GRNsight server running on port %s, environment=%s', app.get('port'), env);
  });
} else {
  module.exports = app;
}

