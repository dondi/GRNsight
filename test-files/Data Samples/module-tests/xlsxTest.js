var xlsx = require('node-xlsx');
var sheet = xlsx.parse(__dirname + '/dahlquist_wt-data_21-gene-sample-input_20140122.xlsx');

console.log(sheet.worksheets[0].data);
console.log(sheet.worksheets);