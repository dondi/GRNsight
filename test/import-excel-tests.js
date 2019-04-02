// Want to use these kinds of import tests for network and network weights sheets
// bc they're consistent.
// But there are a few differences between how the tests will work for GraphML and Excel.
// I have a few questions about those differences.
/* eslint-disable max-len */
var expect = require("chai").expect;
var fs = require("fs");
var UTF8 = { encoding: "utf-8" };

// Is importController necessary for excel imports?
var importController = require(__dirname + "/../server/controllers" + "/import-controller")();
var constants = require(__dirname + "/../server/controllers" + "/constants");

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

    errors: [],
    warnings: [],
    positiveWeights: [],
    negativeWeights: [],
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

    errors: [],
    warnings: [],
    positiveWeights: [],
    negativeWeights: [],
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

    errors: [],
    warnings: [],
    positiveWeights: [],
    negativeWeights: [],
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

    errors: [],
    warnings: [],
    positiveWeights: [],
    negativeWeights: [],
    sheetType: "weighted"
};

// Just import example file maybe?
var unweightedTestExcel = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
      'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <graph edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="B" target="A"/>',
    '    <edge source="B" target="C"/>',
    '    <edge source="C" target="B"/>',
    '  </graph>',
    '</graphml>'
].join("\n");

var weightedTestExcel = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
      'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="edge-value-id" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="B" target="A">',
    '      <data key="edge-value-id">-0.75</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="edge-value-id">0.25</data>',
    '    </edge>',
    '    <edge source="C" target="B">',
    '      <data key="edge-value-id">0.5</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

var unweightedTestExcelWithCycle = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
      'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <graph edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <node id="E"/>',
    '    <edge source="A" target="A"/>',
    '    <edge source="B" target="A"/>',
    '    <edge source="B" target="C"/>',
    '    <edge source="C" target="B"/>',
    '    <edge source="D" target="D"/>',
    '  </graph>',
    '</graphml>'
].join("\n");

var weightedTestExcelWithCycle = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
      'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="edge-value-id" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <node id="E"/>',
    '    <edge source="A" target="A">',
    '      <data key="edge-value-id">0.875</data>',
    '    </edge>',
    '    <edge source="B" target="A">',
    '      <data key="edge-value-id">-0.75</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="edge-value-id">0.25</data>',
    '    </edge>',
    '    <edge source="C" target="B">',
    '      <data key="edge-value-id">0.5</data>',
    '    </edge>',
    '    <edge source="D" target="D">',
    '      <data key="edge-value-id">-0.375</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

var missingEndTagTestExcel = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
      'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="edge-value-id" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph edgedefault="directed"',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="B" target="A">',
    '      <data key="edge-value-id">-0.75</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="edge-value-id">0.25</data>',
    '    </edge>',
    '    <edge source="C" target="B">',
    '      <data key="edge-value-id">0.5</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

var missingExcelEndTagTestExcel = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
      'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <graph edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="B" target="A">',
    '      <data key="edge-value-id"></data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="edge-value-id"></data>',
    '    </edge>',
    '    <edge source="C" target="B">',
    '      <data key="edge-value-id"></data>',
    '    </edge>',
    '  </graph>'
].join("\n");

var misspelledGraphTagTestExcel = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
      'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="edge-value-id" for="edge" attr.name="weight" attr.type="double"/>',
    '  <grah edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="B" target="A">',
    '      <data key="edge-value-id">-0.75</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="edge-value-id">0.25</data>',
    '    </edge>',
    '    <edge source="C" target="B">',
    '      <data key="edge-value-id">0.5</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");


// Added networks and GraphML documents
var newExpectedWeightedNetwork = {
    genes: [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "D" }
    ],

    links: [
        { source: 0, target: 1, value: 1 },
        { source: 1, target: 2, value: -2 },
        { source: 2, target: 0, value: 3 },
        { source: 2, target: 2, value: 0.5 }
    ],

    errors: [],
    warnings: [],
    positiveWeights: [],
    negativeWeights: [],
    sheetType: "weighted"
};

var templateExcelFileForNewTests = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A" target="B">',
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data>',
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">0.5</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

var missingEdgeSourceAttributeName = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge ="A" target="B">',     // Source Mssing
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data>',
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

var missingCloseTagAfterForwardSlash = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/',                   // Missing Closing Tag
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A" target="B">',
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data>',
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

// Necessary?
var missingGraphOpenTag = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  graph id="G" edgedefault="directed">',       // Missing <graph> opening tag
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A" target="B">',
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data>',
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

// Necessary?
var incompleteClosingTag = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A" target="B">',
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data>',
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </',                                // There is a </ instead of </graph> closing tag
    '</graphml>'
].join("\n");

var unclosedRootTag = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A" target="B">',
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data>',
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </graph>',                         // Missing </graphml> closing tag
].join("\n");

// Necessary?
var unpairedQuote = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A target="B">',                  // missing close quote
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data>',
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

// Necessary?
var invalidCharacterInName = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A" target="B">',
    '      <data key="weight">&</data>',              // invalid character in name value for edge data
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data>',
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

// Necessary?
var unencodedTag = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A" target="B">',
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data><><>',               // extra empty tags at the end of the line
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

var incompleteClosingTagSecondCase = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A" target="B">',
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source="B" target="C">',
    '      <data key="weight">-2</data>',
    '    </ed',                                                   // incomplete closing tag here
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

// Necessary?
var missingOpeningQuote = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
    '  <key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
    '  <graph id="G" edgedefault="directed">',
    '    <node id="A"/>',
    '    <node id="B"/>',
    '    <node id="C"/>',
    '    <node id="D"/>',
    '    <edge source="A" target="B">',
    '      <data key="weight">1</data>',
    '    </edge>',
    '    <edge source=B" target="C">',                     // missing opening quote here
    '      <data key="weight">-2</data>',
    '    </edge>',
    '    <edge source="C" target="A">',
    '      <data key="weight">3</data>',
    '    </edge>',
    '    <edge source="C" target="C">',
    '      <data key="weight">-4</data>',
    '    </edge>',
    '  </graph>',
    '</graphml>'
].join("\n");

describe("Import from Excel", function () {
    it("should import unweighted networks from Excel correctly", function () {
        expect(
          importController.graphMlToGrnsight(unweightedTestExcel)
        ).to.deep.equal(expectedUnweightedNetwork);
    });

    it("should import weighted networks from Excel correctly", function () {
        expect(
          importController.graphMlToGrnsight(weightedTestGraphMl)
        ).to.deep.equal(expectedWeightedNetwork);
    });

    it("should import unweighted networks with cycles from Excel correctly", function () {
        expect(
          importController.graphMlToGrnsight(unweightedTestGraphMlWithCycle)
        ).to.deep.equal(expectedUnweightedNetworkWithCycle);
    });

    it("should import weighted networks with cycles from Excel correctly", function () {
        expect(
          importController.graphMlToGrnsight(weightedTestGraphMlWithCycle)
        ).to.deep.equal(expectedWeightedNetworkWithCycle);
    });

// Necessary?
    it("should issue an general Excel syntax error because there is a missing end tag", function () {
        expect(
            importController.graphMlToGrnsight(missingEndTagTestGraphMl).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(missingEndTagTestGraphMl).errors[0].errorCode
        ).to.equal("GRAPHML_INVALID_ATTRIBUTE_NAME");
    });

    // Necessary?
    it("should issue an general graphML syntax error because </graphml> is missing", function () {
        expect(
            importController.graphMlToGrnsight(missingGraphMlEndTagTestGraphMl).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(missingGraphMlEndTagTestGraphMl).errors[0].errorCode
        ).to.equal("GRAPHML_MISSING_GRAPHML_CLOSE_TAG");
    });

    // Necessary?
    it("should issue an general graphML syntax error because the graph tag is misspelled", function () {
        expect(
            importController.graphMlToGrnsight(misspelledGraphTagTestGraphMl).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(misspelledGraphTagTestGraphMl).errors[0].errorCode
        ).to.equal("GRAPHML_UNMATCHED_CLOSE_TAG");
    });

    // Necessary?
    it("should issue a warning if edgedefault is not set to 'directed'", function () {
        var undirected = unweightedTestGraphMl.replace('edgedefault="directed"', 'edgedefault="undirected"');
        expect(
            importController.graphMlToGrnsight(undirected).warnings
        ).to.deep.equal([ constants.warnings.EDGE_DEFAULT_NOT_DIRECTED ]);

        var noEdgedefault = unweightedTestGraphMl.replace('edgedefault="directed"', "");
        expect(
            importController.graphMlToGrnsight(noEdgedefault).warnings
        ).to.deep.equal([ constants.warnings.EDGE_DEFAULT_NOT_DIRECTED ]);
    });

    it("should issue a warning if a weighted graph has edges without weights", function () {
        var missingWeight = weightedTestGraphMl.replace('<data key="edge-value-id">0.5</data>', "");
        expect(
            importController.graphMlToGrnsight(missingWeight).warnings
        ).to.deep.equal([ constants.warnings.EDGES_WITHOUT_WEIGHTS ]);

        var nanWeight = weightedTestGraphMl.replace('<data key="edge-value-id">0.5</data>',
            '<data key="edge-value-id">pizza pizza</data>');
        expect(
            importController.graphMlToGrnsight(nanWeight).warnings
        ).to.deep.equal([ constants.warnings.EDGES_WITHOUT_WEIGHTS ]);
    });

    // Necessary?
    it("should ignore unsupported GraphML features", function () {
        fs.readFile(__dirname + "/../test-files/import-samples/hyper.graphml", UTF8, function (error, data) {
            expect(
                importController.graphMlToGrnsight(data)
            ).to.deep.equal({
                genes: [
                    { name: "n0" },
                    { name: "n1" },
                    { name: "n2" },
                    { name: "n3" },
                    { name: "n4" },
                    { name: "n5" },
                    { name: "n6" }
                ],

                links: [
                    { source: 0, target: 4 }
                ],

                errors: [],
                warnings: [],
                positiveWeights: [],
                negativeWeights: [],
                sheetType: "unweighted"
            }); // Look ma, no hyperedges.
        });

        fs.readFile(__dirname + "/../test-files/import-samples/nested.graphml", UTF8, function (error, data) {
            expect(
                importController.graphMlToGrnsight(data)
            ).to.deep.equal({
                genes: [
                    { name: "n0" },
                    { name: "n1" },
                    { name: "n2" },
                    { name: "n3" },
                    { name: "n4" },
                    { name: "n5" },
                    { name: "n6" }
                ],

                links: [
                    { source: 0, target: 2 },
                    { source: 0, target: 1 },
                    { source: 1, target: 3 },
                    { source: 3, target: 2 },
                    { source: 2, target: 4 }
                ],

                errors: [],
                warnings: [],
                positiveWeights: [],
                negativeWeights: [],
                sheetType: "unweighted"
            }); // Look ma, no nested graphs (nor edges that refer to them).
        });
    });

    it("should read labels from keys if available", function () {
        fs.readFile(__dirname + "/../test-files/import-samples/4-gene_4-edge_Manual-Cytoscape_test-naming.graphml", UTF8, function (error, data) {
            expect(
                importController.graphMlToGrnsight(data)
            ).to.deep.equal({
                genes: [
                    { name: "Gene4_name" },
                    { name: "Gene3_name" },
                    { name: "Gene2_name" },
                    { name: "Gene1_name" }
                ],

                links: [
                    { source: 0, target: 0 },
                    { source: 1, target: 0 },
                    { source: 2, target: 1 },
                    { source: 3, target: 2 }
                ],

                errors: [],
                warnings: [],
                positiveWeights: [],
                negativeWeights: [],
                sheetType: "unweighted"
            });
        });
    });

    // Necessary?
    it("should read text labels from yED keys if available", function () {
        fs.readFile(__dirname + "/../test-files/import-samples/graph-with-yed-tags.graphml", UTF8, function (error, data) {
            expect(
                importController.graphMlToGrnsight(data)
            ).to.deep.equal({
                genes: [
                    { name: "January" },
                    { name: "n1" }
                ],

                links: [
                    { source: 1, target: 0 }
                ],

                errors: [],
                warnings: [],
                positiveWeights: [],
                negativeWeights: [],
                sheetType: "unweighted"
            });
        });
    });

    // Necessary?
    it("should read node label objects from yED keys if available", function () {
        fs.readFile(__dirname + "/../test-files/import-samples/4-node_4-edge_manual-yED.graphml", UTF8, function (error, data) {
            expect(
                importController.graphMlToGrnsight(data)
            ).to.deep.equal({
                genes: [
                    { name: "A" },
                    { name: "B" },
                    { name: "C" },
                    { name: "D" }
                ],

                links: [
                    { source: 0, target: 1 },
                    { source: 1, target: 2 },
                    { source: 2, target: 3 },
                    { source: 3, target: 3 }
                ],

                errors: [],
                warnings: [],
                sheetType: "unweighted"
            });
        });
    });

    // Added Tests
    it("should import this weighted network from GraphML correctly", function () {
        expect(
            importController.graphMlToGrnsight(templateGraphmlFileForNewTests)
        ).to.deep.equal(newExpectedWeightedNetwork);
    });

    it("should issue an invalid attribute name graphML syntax error because there is a missing source tag name", function () {
        expect(
            importController.graphMlToGrnsight(missingEdgeSourceAttributeName).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(missingEdgeSourceAttributeName).errors[0].errorCode
        ).to.equal("GRAPHML_INVALID_ATTRIBUTE_NAME");
    });

    it("should issue a missing end tag because there there is a missing graph open tag", function () {
        expect(
            importController.graphMlToGrnsight(missingGraphOpenTag).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(missingGraphOpenTag).errors[0].errorCode
        ).to.equal("GRAPHML_UNMATCHED_CLOSE_TAG");
    });

    it("should issue a missing tag after forward slash error because there is a missing end tag after the backslash", function () {
        expect(
            importController.graphMlToGrnsight(missingCloseTagAfterForwardSlash).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(missingCloseTagAfterForwardSlash).errors[0].errorCode
        ).to.equal("GRAPHML_MISSING_CLOSE_TAG_AFTER_FORWARD_SLASH");
    });

    it("should issue an incorrect closing tag error because there is a '</' instead of '</graph>'", function () {
        expect(
            importController.graphMlToGrnsight(incompleteClosingTag).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(incompleteClosingTag).errors[0].errorCode
        ).to.equal("GRAPHML_UNFINISHED_CLOSING_TAG");
    });

    it("should issue an unclosed root tag when the </graphml> closing tag is missing", function () {
        expect(
            importController.graphMlToGrnsight(unclosedRootTag).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(unclosedRootTag).errors[0].errorCode
        ).to.equal("GRAPHML_MISSING_GRAPHML_CLOSE_TAG");
    });

    it("should issue unpaired quotation mark error because there is a missing end quote", function () {
        expect(
            importController.graphMlToGrnsight(unpairedQuote).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(unpairedQuote).errors[0].errorCode
        ).to.equal("GRAPHML_UNPAIRED_QUOTE");
    });

    it("should issue an invalid character error because there is an invalid character somewhere", function () {
        expect(
            importController.graphMlToGrnsight(invalidCharacterInName).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(invalidCharacterInName).errors[0].errorCode
        ).to.equal("GRAPHML_INVALID_CHARACTER_IN_NAME");
    });

    it("should issue an unencoded tag error because there are extra tags at the end of a line", function () {
        expect(
            importController.graphMlToGrnsight(unencodedTag).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(unencodedTag).errors[0].errorCode
        ).to.equal("GRAPHML_UNENCODED_TAG");
    });

    it("should issue an incomplete closing tag error because one of the closing tags is incomplete", function () {
        expect(
            importController.graphMlToGrnsight(incompleteClosingTagSecondCase).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(incompleteClosingTagSecondCase).errors[0].errorCode
        ).to.equal("GRAPHML_INCOMPLETE_CLOSING_TAG");
    });

    it("should issue missing opening quote error because there is a missing opening quote", function () {
        expect(
            importController.graphMlToGrnsight(missingOpeningQuote).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(missingOpeningQuote).errors[0].errorCode
        ).to.equal("GRAPHML_MISSING_OPEN_QUOTE");
    });
});
