var path = require('path');
module.exports = {
    entry: {
      app: ['./web-client/public/js/sliders.js',
          './web-client/public/js/container.js',
          './web-client/public/js/graph.js',
          './web-client/public/js/upload.js',
          './web-client/public/js/graph-statistics.js']
    },
    output: {
        // path: __dirname,
        path: `${__dirname}/web-client/public/js`,
        // path: '/web-client/public/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'es6'),
              loader: 'babel-loader' }
        ]
    }
};
