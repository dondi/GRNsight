var google = require('googleapis'),
    ga = google.analytics('v3')

module.exports = function (app) {
  app.get('/ga', function (req, res) {
    var jwt = new google.auth.JWT(
      process.env.SERVICE_EMAIL,
      'grnsight.pem',
      null,
      ['https://www.googleapis.com/auth/analytics.readonly'],
      null)

    if (app.get('env') !== 'developer') {
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
        'end-date': '2015-02-09',
        'metrics': 'ga:sessions',
      }, function (err, result) {
        if (err) {
          console.log('api error', err, result)
        }
        res.send(result.rows[0][0])
      })
    })
  })
}
