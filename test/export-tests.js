var expect = require("chai").expect;
var exportController = require(__dirname + "/../server/controllers" + "/export-controller")();

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

var weightedTestNetwork = {
  "genes": [
    { "name": "A" },
    { "name": "B" },
    { "name": "C" },
    { "name": "D" }
  ],
  "links": [
    {
      "source": 2,
      "target": 1,
      "value": 0.5
    },
    {
      "source": 1,
      "target": 0,
      "value": -0.75
    },
    {
      "source": 1,
      "target": 2,
      "value": 0.25
    }
  ],
  "errors": [],
  "warnings": [],
  "sheetType": "weighted"
};

// TODO unweightedTestNetworkWithCycle
// TODO weightedTestNetworkWithCycle

describe("Export to SIF", function () {
  it("should export unweighted networks to SIF correctly", function () {
    var sifLines = exportController.grnsightToSif(unweightedTestNetwork).split("\n");
    expect(sifLines[0]).to.equal("A");
    expect(sifLines[1].split("\t")).to.deep.equal([ "B", "pd", "A", "C" ]);
    expect(sifLines[2].split("\t")).to.deep.equal([ "C", "pd", "B" ]);
    expect(sifLines[3]).to.equal("D");
  });

  it("should export weighted networks to SIF correctly", function () {
    var sifLines = exportController.grnsightToSif(weightedTestNetwork).split("\n");
    expect(sifLines[0]).to.equal("A");
    expect(sifLines[1].split("\t")).to.deep.equal([ "B", "-0.75", "A" ]);
    expect(sifLines[2].split("\t")).to.deep.equal([ "B", "0.25", "C" ]);
    expect(sifLines[3].split("\t")).to.deep.equal([ "C", "0.5", "B" ]);
    expect(sifLines[4]).to.equal("D");
  });
});
