var google = require('googleapis'),
    ga = google.analytics('v3')

var moment = require('moment')

module.exports = function (app) {
  app.get('/ga', function (req, res) {
    var jwt = new google.auth.JWT(
      process.env.SERVICE_EMAIL,
      'grnsight.pem',
      null,
      ['https://www.googleapis.com/auth/analytics.readonly'],
      null)

    if (app.get('env') !== 'development') {
      res.header('Access-Control-Allow-Origin', 'http://dondi.github.io')
    }

    jwt.authorize(function (err, tokens) {
      if (err) {
        console.log('jwt error', err)
        return
      }

      ga.data.ga.get({
        auth: jwt,
        ids: 'ga:91279024',
        'start-date': '2014-01-01',
        'end-date': moment().format('YYYY-MM-DD'),
        'metrics': 'ga:pageviews',
        'filters': 'ga:pagePath==/GRNsight/' + (req.query.path || '')
      }, function (err, result) {
        if (err) {
          console.log('api error', err, result)
        }

        res.send(result && result.rows && result.rows[0] ? result.rows[0][0] : '(unknown)')
      })
    })
  })

  app.get('/grnmap', function (req, res) {
    var jwt = new google.auth.JWT(
      process.env.GRNMAP_SERVICE_EMAIL,
      'grnmap.pem',
      null,
      ['https://www.googleapis.com/auth/analytics.readonly'],
      null)

    if (app.get('env') !== 'development') {
      res.header('Access-Control-Allow-Origin', 'http://kdahlquist.github.io')
    }

    jwt.authorize(function (err, tokens) {
      if (err) {
        console.log('jwt error', err)
        return
      }

      ga.data.ga.get({
        auth: jwt,
        ids: 'ga:97014398',
        'start-date': '2014-01-01',
        'end-date': moment().format('YYYY-MM-DD'),
        'metrics': 'ga:pageviews',
        'filters': 'ga:pagePath==/GRNmap/' + (req.query.path || '')
      }, function (err, result) {
        if (err) {
          console.log('api error', err, result)
        }

        res.send(result && result.rows && result.rows[0] ? result.rows[0][0] : '(unknown)')
      })
    })
  })
}
