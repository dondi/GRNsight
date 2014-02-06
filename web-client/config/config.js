var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    host: 'localhost',
    port: 3001,
    url: 'http://' + this.host + '/' + this.port,
    root: rootPath,
    app: {
      name: 'GRNsight'
    }    
  }
}