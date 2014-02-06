var xlsx = require('node-xlsx');
var sheet = xlsx.parse(__dirname + '/test1.xlsx');

console.log(sheet.worksheets[0].data);
console.log(sheet.worksheets);