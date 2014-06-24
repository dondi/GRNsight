var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    host: 'localhost',
    port: 3000,
    url: 'http://' + this.host + '/' + this.port,
    corsOrigin: 'http://localhost:3001',
    root: rootPath,
    app: {
      name: 'GRNsight'
    }    
  },

  production: {
    host: 'grnsight.cs.lmu.edu',
    port: 3000,
    url: 'http://' + this.host + '/' + this.port,
    corsOrigin: 'http://grnsight.cs.lmu.edu:3001',
    root: rootPath,
    app: {
      name: 'GRNsight'
    }
  },

  beta: {
    host: 'grnsight.cs.lmu.edu',
    port: 4000,
    url: 'http://' + this.host + '/' + this.port,
    corsOrigin: 'http://grnsight.cs.lmu.edu:4001'
    root: rootPath,
    app: {
      name: 'GRNsight'
    }
}
}
