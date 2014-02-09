var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    host: 'localhost',
    port: 3000,
    url: 'http://' + this.host + '/' + this.port,
    root: rootPath,
    app: {
      name: 'GRNsight'
    }    
  }
}