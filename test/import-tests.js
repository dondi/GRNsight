var expect = require("chai").expect;
var importController = require(__dirname + "/../server/controllers" + "/import-controller")();

var unweightedTestSif = [
  "A",
  [ "B", "pd", "A", "C" ].join("\t"),
  [ "C", "pd", "B" ].join("\t"),
  "D"
].join("\n") + "\n";

describe("Import from SIF", function () {
  it("should import unweighted networks from SIF correctly", function () {
    var network = importController.sifToGrnsight(unweightedTestSif)
    expect(network).to.deep.equal({
      genes: [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "D" }
      ],

      links: [
        { source: 1, target: 0 },
        { source: 1, target: 2 },
        { source: 2, target: 1 }
      ],

      sheetType: "unweighted"
    });
  });

  it("should import weighted networks from SIF correctly", function () {
    // TODO
  });

  it("should import unweighted networks with cycles from SIF correctly", function () {
    // TODO
  });

  it("should import weighted networks with cycles from SIF correctly", function () {
    // TODO
  });
});
