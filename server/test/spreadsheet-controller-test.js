//Some basic unit tests for accepting and parsing excel spreadsheets

var should = require('should'),
    request = require('supertest'),
    url = require('../config/config').development.url,
    xlsx = require('node-xlsx');
    
var sheet = xlsx.parse(__dirname + '/dahlquist_wt-data_21-gene-_sample-output_20140122_est_out_1.xls');

var worksheets = [];

describe('Spreadsheet Controller', function () {
    describe('parse', function () {
     it('should properly POST the parsed spreadsheet', function (done) {
       //The parsing is done as part of a post
       request(url).post('/').send(sheet).end(function (err, res) {
         should.not.exist(err);
         res.should.have.status(201);
         res.should.be.json;
         res.body[0].should.equal(sheet);
         done();
       });
     });
   });
});

