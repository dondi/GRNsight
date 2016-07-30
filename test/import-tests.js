var expect = require("chai").expect;
var importController = require(__dirname + "/../server/controllers" + "/import-controller")();

var unweightedTestSif = [
  "A",
  [ "B", "pd", "A", "C" ].join("\t"),
  [ "C", "pd", "B" ].join("\t"),
  "D"
].join("\n") + "\n";

var weightedTestSif = [
  "A",
  [ "B", "-0.75", "A" ].join("\t"),
  [ "B", "0.25", "C" ].join("\t"),
  [ "C", "0.5", "B" ].join("\t"),
  "D"
].join("\n") + "\n";

var inconsistentlyWeightedTestSif = [
  "A",
  [ "B", "-0.75", "A" ].join("\t"),
  [ "B", "pd", "C" ].join("\t"),
  [ "C", "0.5", "B" ].join("\t"),
  "D"
].join("\n") + "\n";

var unweightedTestSifWithCycle = [
  [ "A", "pd", "A" ].join("\t"),
  [ "B", "pd", "A", "C" ].join("\t"),
  [ "C", "pd", "B" ].join("\t"),
  [ "D", "pd", "D" ].join("\t"),
  "E"
].join("\n") + "\n";

var weightedTestSifWithCycle = [
  [ "A", "0.875", "A" ].join("\t"),
  [ "B", "-0.75", "A" ].join("\t"),
  [ "B", "0.25", "C" ].join("\t"),
  [ "C", "0.5", "B" ].join("\t"),
  [ "D", "-0.375", "D" ].join("\t"),
  "E"
].join("\n") + "\n";

var inconsistentlyWeightedTestSifWithCycle = [
  [ "A", "0.875", "A" ].join("\t"),
  [ "B", "-0.75", "A" ].join("\t"),
  [ "B", "0.25", "C" ].join("\t"),
  [ "C", "0.5", "B" ].join("\t"),
  [ "D", "pd", "D" ].join("\t"),
  "E"
].join("\n") + "\n";

var expectedUnweightedNetwork = {
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
};

var expectedWeightedNetwork = {
  genes: [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" }
  ],

  links: [
    { source: 1, target: 0, value: -0.75 },
    { source: 1, target: 2, value: 0.25 },
    { source: 2, target: 1, value: 0.5 }
  ],

  sheetType: "weighted"
};

var expectedUnweightedNetworkWithCycle = {
  genes: [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "E" }
  ],
  links: [
    { source: 0, target: 0 },
    { source: 1, target: 0 },
    { source: 1, target: 2 },
    { source: 2, target: 1 },
    { source: 3, target: 3 }
  ],
  sheetType: "unweighted"
};

var expectedWeightedNetworkWithCycle = {
  genes: [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "E" }
  ],
  links: [
    { source: 0, target: 0, value: 0.875 },
    { source: 1, target: 0, value: -0.75 },
    { source: 1, target: 2, value: 0.25 },
    { source: 2, target: 1, value: 0.5 },
    { source: 3, target: 3, value: -0.375 }
  ],
  sheetType: "weighted"
};

describe("Import from SIF", function () {
  it("should import unweighted networks from SIF correctly", function () {
    expect(
      importController.sifToGrnsight(unweightedTestSif)
    ).to.deep.equal(expectedUnweightedNetwork);
  });

  it("should import weighted networks from SIF correctly", function () {
    expect(
      importController.sifToGrnsight(weightedTestSif)
    ).to.deep.equal(expectedWeightedNetwork);
  });

  it("should import inconsistently weighted networks from SIF as unweighted", function () {
    expect(
      importController.sifToGrnsight(inconsistentlyWeightedTestSif)
    ).to.deep.equal(expectedUnweightedNetwork);
  });

  it("should import unweighted networks with cycles from SIF correctly", function () {
    expect(
      importController.sifToGrnsight(unweightedTestSifWithCycle)
    ).to.deep.equal(expectedUnweightedNetworkWithCycle);
  });

  it("should import weighted networks with cycles from SIF correctly", function () {
    expect(
      importController.sifToGrnsight(weightedTestSifWithCycle)
    ).to.deep.equal(expectedWeightedNetworkWithCycle);
  });

  it("should import inconsistently weighted networks with cycles from SIF as unweighted", function () {
    expect(
      importController.sifToGrnsight(inconsistentlyWeightedTestSifWithCycle)
    ).to.deep.equal(expectedUnweightedNetworkWithCycle);
  });
});
