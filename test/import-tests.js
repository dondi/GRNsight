/* eslint-disable max-len */
var expect = require("chai").expect;
// var extend = require("jquery-extend");
var fs = require("fs");
var UTF8 = { encoding: "utf-8" };

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

/* eslint-disable quotes */
// Temporarily disabling double-quote rule because graphML has a lot of double quotes.
var unweightedTestGraphMl = [
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

var weightedTestGraphMl = [
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

var unweightedTestGraphMlWithCycle = [
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

var weightedTestGraphMlWithCycle = [
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

var missingEndTagTestGraphMl = [
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

var missingGraphMlEndTagTestGraphMl = [
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

var misspelledGraphTagTestGraphMl = [
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

describe("Import from GraphML", function () {
    it("should import unweighted networks from GraphML correctly", function () {
        expect(
          importController.graphMlToGrnsight(unweightedTestGraphMl)
        ).to.deep.equal(expectedUnweightedNetwork);
    });

    it("should import weighted networks from GraphML correctly", function () {
        expect(
          importController.graphMlToGrnsight(weightedTestGraphMl)
        ).to.deep.equal(expectedWeightedNetwork);
    });

    it("should import unweighted networks with cycles from GraphML correctly", function () {
        expect(
          importController.graphMlToGrnsight(unweightedTestGraphMlWithCycle)
        ).to.deep.equal(expectedUnweightedNetworkWithCycle);
    });

    it("should import weighted networks with cycles from GraphML correctly", function () {
        expect(
          importController.graphMlToGrnsight(weightedTestGraphMlWithCycle)
        ).to.deep.equal(expectedWeightedNetworkWithCycle);
    });

    it("should issue an general graphML syntax error because there is a missing end tag", function () {
        expect(
            importController.graphMlToGrnsight(missingEndTagTestGraphMl).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(missingEndTagTestGraphMl).errors[0].errorCode
        ).to.equal("GRAPHML_GENERAL_SYNTAX_ERROR");
    });

    it("should issue an general graphML syntax error because </graphml> is missing", function () {
        expect(
            importController.graphMlToGrnsight(missingGraphMlEndTagTestGraphMl).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(missingGraphMlEndTagTestGraphMl).errors[0].errorCode
        ).to.equal("GRAPHML_GENERAL_SYNTAX_ERROR");
    });

    it("should issue an general graphML syntax error because the graph tag is misspelled", function () {
        expect(
            importController.graphMlToGrnsight(misspelledGraphTagTestGraphMl).errors.length
        ).to.equal(1);

        expect(
            importController.graphMlToGrnsight(misspelledGraphTagTestGraphMl).errors[0].errorCode
        ).to.equal("GRAPHML_GENERAL_SYNTAX_ERROR");
    });

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
});
