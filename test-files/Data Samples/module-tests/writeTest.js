var xlsx = require('node-xlsx');
var fs = require('fs');

var buffer = xlsx.build( {worksheets: [
  {"name": "writeTest1", "data": [
    ["A1", "B1"],
    ["hello", "good"]
  ]},
  {"name": "writeTest2", "data": [
    ["seems", "to", "work"]
  ]}
]});

fs.writeFile("writeTest.xlsx", buffer, function (err) {
  if (err) throw err;
});
