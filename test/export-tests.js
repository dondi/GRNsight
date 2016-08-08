var expect = require("chai").expect;
var extend = require("jquery-extend");

var exportController = require(__dirname + "/../server/controllers" + "/export-controller")();

var unweightedTestNetwork = {
  genes: [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" }
  ],
  links: [
    { source: 2, target: 1 },
    { source: 1, target: 0 },
    { source: 1, target: 2 }
  ],
  errors: [],
  warnings: [],
  sheetType: "unweighted"
};

var weightedTestNetwork = {
  genes: [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" }
  ],
  links: [
    { source: 2, target: 1, value: 0.5 },
    { source: 1, target: 0, value: -0.75 },
    { source: 1, target: 2, value: 0.25 }
  ],
  errors: [],
  warnings: [],
  sheetType: "weighted"
};

var unweightedTestNetworkWithCycle = {
  genes: [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "E" }
  ],
  links: [
    { source: 2, target: 1 },
    { source: 1, target: 0 },
    { source: 1, target: 2 },
    { source: 3, target: 3 },
    { source: 0, target: 0 }
  ],
  errors: [],
  warnings: [],
  sheetType: "unweighted"
};

var weightedTestNetworkWithCycle = {
  genes: [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "E" }
  ],
  links: [
    { source: 2, target: 1, value: 0.5 },
    { source: 1, target: 0, value: -0.75 },
    { source: 1, target: 2, value: 0.25 },
    { source: 3, target: 3, value: -0.375 },
    { source: 0, target: 0, value: 0.875 }
  ],
  errors: [],
  warnings: [],
  sheetType: "weighted"
};

describe("Export to SIF", function () {
  it("should export unweighted networks to SIF correctly", function () {
    var lines = exportController.grnsightToSif(unweightedTestNetwork).split("\n");
    expect(lines[0].split("\t")).to.deep.equal([ "A", "", "" ]);
    expect(lines[1].split("\t")).to.deep.equal([ "B", "pd", "A" ]);
    expect(lines[2].split("\t")).to.deep.equal([ "B", "pd", "C" ]);
    expect(lines[3].split("\t")).to.deep.equal([ "C", "pd", "B" ]);
    expect(lines[4].split("\t")).to.deep.equal([ "D", "", "" ]);
  });

  it("should export weighted networks to SIF correctly", function () {
    var lines = exportController.grnsightToSif(weightedTestNetwork).split("\n");
    expect(lines[0].split("\t")).to.deep.equal([ "A", "", "" ]);
    expect(lines[1].split("\t")).to.deep.equal([ "B", "-0.75", "A" ]);
    expect(lines[2].split("\t")).to.deep.equal([ "B", "0.25", "C" ]);
    expect(lines[3].split("\t")).to.deep.equal([ "C", "0.5", "B" ]);
    expect(lines[4].split("\t")).to.deep.equal([ "D", "", "" ]);
  });

  it("should export unweighted networks with cycles to SIF correctly", function () {
    var lines = exportController.grnsightToSif(unweightedTestNetworkWithCycle).split("\n");
    expect(lines[0].split("\t")).to.deep.equal([ "A", "pd", "A" ]);
    expect(lines[1].split("\t")).to.deep.equal([ "B", "pd", "A" ]);
    expect(lines[2].split("\t")).to.deep.equal([ "B", "pd", "C" ]);
    expect(lines[3].split("\t")).to.deep.equal([ "C", "pd", "B" ]);
    expect(lines[4].split("\t")).to.deep.equal([ "D", "pd", "D" ]);
    expect(lines[5].split("\t")).to.deep.equal([ "E", "", "" ]);
  });

  it("should export weighted networks with cycles to SIF correctly", function () {
    var lines = exportController.grnsightToSif(weightedTestNetworkWithCycle).split("\n");
    expect(lines[0].split("\t")).to.deep.equal([ "A", "0.875", "A" ]);
    expect(lines[1].split("\t")).to.deep.equal([ "B", "-0.75", "A" ]);
    expect(lines[2].split("\t")).to.deep.equal([ "B", "0.25", "C" ]);
    expect(lines[3].split("\t")).to.deep.equal([ "C", "0.5", "B" ]);
    expect(lines[4].split("\t")).to.deep.equal([ "D", "-0.375", "D" ]);
    expect(lines[5].split("\t")).to.deep.equal([ "E", "", "" ]);
  });
});

describe("Export to GraphML", function () {
  it("should export unweighted networks to GraphML correctly", function () {
    var lines = exportController.grnsightToGraphMl(unweightedTestNetwork).split("\n").map(function (line) {
      return line.trim();
    });

    var expectedGraphMlLines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
        'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
      '<graph edgedefault="directed">',
      '<node id="A"/>',
      '<node id="B"/>',
      '<node id="C"/>',
      '<node id="D"/>',
      '<edge source="C" target="B"/>',
      '<edge source="B" target="A"/>',
      '<edge source="B" target="C"/>',
      '</graph>',
      '</graphml>'
    ];

    lines.forEach(function (line, index) {
      expect(line).to.equal(expectedGraphMlLines[index]);
    });
  });

  it("should export weighted networks to GraphML correctly", function () {
    var lines = exportController.grnsightToGraphMl(weightedTestNetwork).split("\n").map(function (line) {
      return line.trim();
    });

    var expectedGraphMlLines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
        'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
      '<key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
      '<graph edgedefault="directed">',
      '<node id="A"/>',
      '<node id="B"/>',
      '<node id="C"/>',
      '<node id="D"/>',
      '<edge source="C" target="B">',
      '<data key="weight">0.5</data>',
      '</edge>',
      '<edge source="B" target="A">',
      '<data key="weight">-0.75</data>',
      '</edge>',
      '<edge source="B" target="C">',
      '<data key="weight">0.25</data>',
      '</edge>',
      '</graph>',
      '</graphml>'
    ];

    lines.forEach(function (line, index) {
      expect(line).to.equal(expectedGraphMlLines[index]);
    });
  });

  it("should export unweighted networks with cycles to GraphML correctly", function () {
    var lines = exportController.grnsightToGraphMl(unweightedTestNetworkWithCycle).split("\n").map(function (line) {
      return line.trim();
    });

    var expectedGraphMlLines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
        'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
      '<graph edgedefault="directed">',
      '<node id="A"/>',
      '<node id="B"/>',
      '<node id="C"/>',
      '<node id="D"/>',
      '<node id="E"/>',
      '<edge source="C" target="B"/>',
      '<edge source="B" target="A"/>',
      '<edge source="B" target="C"/>',
      '<edge source="D" target="D"/>',
      '<edge source="A" target="A"/>',
      '</graph>',
      '</graphml>'
    ];

    lines.forEach(function (line, index) {
      expect(line).to.equal(expectedGraphMlLines[index]);
    });
  });

  it("should export weighted networks with cycles to GraphML correctly", function () {
    var lines = exportController.grnsightToGraphMl(weightedTestNetworkWithCycle).split("\n").map(function (line) {
      return line.trim();
    });

    var expectedGraphMlLines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
        'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
      '<key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
      '<graph edgedefault="directed">',
      '<node id="A"/>',
      '<node id="B"/>',
      '<node id="C"/>',
      '<node id="D"/>',
      '<node id="E"/>',
      '<edge source="C" target="B">',
      '<data key="weight">0.5</data>',
      '</edge>',
      '<edge source="B" target="A">',
      '<data key="weight">-0.75</data>',
      '</edge>',
      '<edge source="B" target="C">',
      '<data key="weight">0.25</data>',
      '</edge>',
      '<edge source="D" target="D">',
      '<data key="weight">-0.375</data>',
      '</edge>',
      '<edge source="A" target="A">',
      '<data key="weight">0.875</data>',
      '</edge>',
      '</graph>',
      '</graphml>'
    ];

    lines.forEach(function (line, index) {
      expect(line).to.equal(expectedGraphMlLines[index]);
    });
  });

  if("should export networks with a filename as the graph element id", function () {
    var networkWithFilename = extend(true, unweightedTestNetwork, { filename: "hello.graphml" });
    var lines = exportController.grnsightToGraphMl(networkWithFilename).split("\n").map(function (line) {
      return line.trim();
    });

    var expectedGraphMlLines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
        'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
      '<graph edgedefault="directed" id="hello.graphml">',
      '<node id="A"/>',
      '<node id="B"/>',
      '<node id="C"/>',
      '<node id="D"/>',
      '<edge source="C" target="B"/>',
      '<edge source="B" target="A"/>',
      '<edge source="B" target="C"/>',
      '</graph>',
      '</graphml>'
    ];

    lines.forEach(function (line, index) {
      expect(line).to.equal(expectedGraphMlLines[index]);
    });
  });
});
