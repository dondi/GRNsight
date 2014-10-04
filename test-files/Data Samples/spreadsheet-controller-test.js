//Some basic unit tests for accepting and parsing excel spreadsheets

var should = require('should'),
    request = require('supertest'),
    url = require('../config/config').development.url,
    xlsx = require('node-xlsx');
    
var sheet = xlsx.parse(__dirname + '/dahlquist_wt-data_21-gene-_sample-output_20140122_est_out_1.xlsx');
var path = __dirname + '/dahlquist_wt-data_21-gene-_sample-output_20140122_est_out_1.xlsx';
    
var expectedSheet = {
  worksheets: 
    [{name: 'Sheet1',
      data: [
        [45, 88],
        [32, 'er'],
        ['hello', 4]
      ]},
      {name: 'Sheet2',
       data: [
         ['rdsdfgrs', 'gsdfgdsfg'],
         ['sdfgdsf']
       ]}
    ]
};

var worksheets = [];

describe('Spreadsheet Controller', function () {
    describe('#parse', function () {
     it('should properly POST the parsed spreadsheet', function (done) {
       //The parsing is done as part of a post
       request(url).post('/upload').send(path).end(function (err, res) {
         should.not.exist(err);
         res.should.have.status(201);
         res.should.be.json;
         res.body[0].should.equal(sheet);
         done();
       });
     });
     it('should parse the spreadsheet properly', function (done) {
       var testParse = xlsx.parse(__dirname + '/test1.xlsx');
       testParse.worksheets.length.should.equal(2);
       testParse.worksheets[0].name.should.equal('Sheet1');
       testParse.worksheets[1].name.should.equal('Sheet2');
       for(var i = 0; i < testParse.worksheets.length; i++) {
         for(var j = 0; j < testParse.worksheets[i].data.length; j++) {
           for(var k = 0; k < testParse.worksheets[i].data[j].length; k++) {
             testParse.worksheets[i].data[j][k].value.should.equal(expectedSheet.worksheets[i].data[j][k]);
           };
         };
       };
       done();
     });
   });
});

