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
    },
    serviceRoot: 'http://localhost:3000'
  },

  production: {
    host: 'grnsight.cs.lmu.edu',
    port: 3001,
    url: 'http://' + this.host + '/' + this.port,
    root: rootPath,
    app: {
      name: 'GRNsight'
    },
    serviceRoot: 'http://grnsight.cs.lmu.edu:3000'
  }
}
