var assert = require('chai').assert;
var exportController = require(__dirname + '/../server/controllers' + '/export-controller')();

var unweightedTestNetwork = {
  "genes": [
    { "name": "A" },
    { "name": "B" },
    { "name": "C" },
    { "name": "D" }
  ],
  "links": [
    {
      "source": 2,
      "target": 1
    },
    {
      "source": 1,
      "target": 0
    },
    {
      "source": 1,
      "target": 2
    }
  ],
  "errors": [],
  "warnings": [],
  "sheetType": "unweighted"
};

// TODO weightedTestNetwork
// TODO unweightedTestNetworkWithCycle
// TODO weightedTestNetworkWithCycle

describe('Export to SIF', function () {
  it('should export unweighted networks to SIF correctly', function () {
    var sif = exportController.grnsightToSif(unweightedTestNetwork);
    assert.isNotNull(sif.match(/^A\n/));
    assert.isNotNull(sif.match(/\nB\tpd\tA\tC\n/));
    assert.isNotNull(sif.match(/\nC\tpd\tB\n/));
    assert.isNotNull(sif.match(/\nD\n$/));
  });
});
