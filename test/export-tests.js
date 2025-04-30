var expect = require("chai").expect;
var extend = require("jquery-extend");
var xlsx = require("node-xlsx");
var test = require("./test");
const { CELL_A1_PPI, CELL_A1_GRN } = require("../server/controllers/constants");

var exportController = require(__dirname + "/../server/controllers/export-controller")();
var constants = require(__dirname + "/../server/controllers/constants");

var unweightedTestWorkbook = {
    genes: [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }],
    links: [
        { source: 2, target: 1 },
        { source: 1, target: 0 },
        { source: 1, target: 2 },
    ],
    errors: [],
    warnings: [],
    sheetType: "unweighted",
    workbookType: constants.NETWORK_GRN_MODE,
};

var weightedTestWorkbook = {
    genes: [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }],
    links: [
        { source: 2, target: 1, value: 0.5 },
        { source: 1, target: 0, value: -0.75 },
        { source: 1, target: 2, value: 0.25 },
    ],
    errors: [],
    warnings: [],
    sheetType: "weighted",
    workbookType: constants.NETWORK_GRN_MODE,
};

var unweightedTestWorkbookWithCycle = {
    genes: [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }, { name: "E" }],
    links: [
        { source: 2, target: 1 },
        { source: 1, target: 0 },
        { source: 1, target: 2 },
        { source: 3, target: 3 },
        { source: 0, target: 0 },
    ],
    errors: [],
    warnings: [],
    sheetType: "unweighted",
    workbookType: "constants.NETWORK_GRN_MODE",
};

var weightedTestWorkbookWithCycle = {
    genes: [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }, { name: "E" }],
    links: [
        { source: 2, target: 1, value: 0.5 },
        { source: 1, target: 0, value: -0.75 },
        { source: 1, target: 2, value: 0.25 },
        { source: 3, target: 3, value: -0.375 },
        { source: 0, target: 0, value: 0.875 },
    ],
    errors: [],
    warnings: [],
    sheetType: "weighted",
    workbookType: constants.NETWORK_GRN_MODE,
};

describe("Export to SIF", function () {
    it("should export unweighted workbooks to SIF correctly", function () {
        var lines = exportController.grnsightToSif(unweightedTestWorkbook).split("\n");
        expect(lines[0].split("\t")).to.deep.equal(["A", "", ""]);
        expect(lines[1].split("\t")).to.deep.equal(["B", "pd", "A"]);
        expect(lines[2].split("\t")).to.deep.equal(["B", "pd", "C"]);
        expect(lines[3].split("\t")).to.deep.equal(["C", "pd", "B"]);
        expect(lines[4].split("\t")).to.deep.equal(["D", "", ""]);
    });

    it("should export weighted workbooks to SIF correctly", function () {
        var lines = exportController.grnsightToSif(weightedTestWorkbook).split("\n");
        expect(lines[0].split("\t")).to.deep.equal(["A", "", ""]);
        expect(lines[1].split("\t")).to.deep.equal(["B", "-0.75", "A"]);
        expect(lines[2].split("\t")).to.deep.equal(["B", "0.25", "C"]);
        expect(lines[3].split("\t")).to.deep.equal(["C", "0.5", "B"]);
        expect(lines[4].split("\t")).to.deep.equal(["D", "", ""]);
    });

    it("should export unweighted workbooks with cycles to SIF correctly", function () {
        var lines = exportController.grnsightToSif(unweightedTestWorkbookWithCycle).split("\n");
        expect(lines[0].split("\t")).to.deep.equal(["A", "pd", "A"]);
        expect(lines[1].split("\t")).to.deep.equal(["B", "pd", "A"]);
        expect(lines[2].split("\t")).to.deep.equal(["B", "pd", "C"]);
        expect(lines[3].split("\t")).to.deep.equal(["C", "pd", "B"]);
        expect(lines[4].split("\t")).to.deep.equal(["D", "pd", "D"]);
        expect(lines[5].split("\t")).to.deep.equal(["E", "", ""]);
    });

    it("should export weighted workbooks with cycles to SIF correctly", function () {
        var lines = exportController.grnsightToSif(weightedTestWorkbookWithCycle).split("\n");
        expect(lines[0].split("\t")).to.deep.equal(["A", "0.875", "A"]);
        expect(lines[1].split("\t")).to.deep.equal(["B", "-0.75", "A"]);
        expect(lines[2].split("\t")).to.deep.equal(["B", "0.25", "C"]);
        expect(lines[3].split("\t")).to.deep.equal(["C", "0.5", "B"]);
        expect(lines[4].split("\t")).to.deep.equal(["D", "-0.375", "D"]);
        expect(lines[5].split("\t")).to.deep.equal(["E", "", ""]);
    });
});

var EXPORT_COMMENT =
    "<!-- Exported by GRNsight v" +
    constants.VERSION +
    "  " +
    "http://dondi.github.io/GRNsight/  " +
    "https://github.com/dondi/GRNsight/releases/tag/v" +
    constants.VERSION +
    " -->";

// We'll allow single quotes here because graphMl has a lot of double quotes in it
// and it's easier to not escape them all.
describe("Export to GraphML", function () {
    it("should export unweighted workbooks to GraphML correctly", function () {
        var lines = exportController
            .grnsightToGraphMl(unweightedTestWorkbook)
            .split("\n")
            .map(function (line) {
                return line.trim();
            });

        var expectedGraphMlLines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
                'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
            EXPORT_COMMENT,
            '<key id="name" for="node" attr.name="name" attr.type="string"/>',
            '<key id="interaction" for="edge" attr.name="interaction" attr.type="string"/>',
            '<key id="name" for="edge" attr.name="name" attr.type="string"/>',
            '<graph edgedefault="directed">',
            '<node id="A">',
            '<data key="name">A</data>',
            "</node>",
            '<node id="B">',
            '<data key="name">B</data>',
            "</node>",
            '<node id="C">',
            '<data key="name">C</data>',
            "</node>",
            '<node id="D">',
            '<data key="name">D</data>',
            "</node>",
            '<edge source="C" target="B">',
            '<data key="interaction">pd</data>',
            '<data key="name">C (pd) B</data>',
            "</edge>",
            '<edge source="B" target="A">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) A</data>',
            "</edge>",
            '<edge source="B" target="C">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) C</data>',
            "</edge>",
            "</graph>",
            "</graphml>",
        ];

        lines.forEach(function (line, index) {
            expect(line).to.equal(expectedGraphMlLines[index]);
        });
    });

    it("should export weighted workbooks to GraphML correctly", function () {
        var lines = exportController
            .grnsightToGraphMl(weightedTestWorkbook)
            .split("\n")
            .map(function (line) {
                return line.trim();
            });

        var expectedGraphMlLines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
                'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
            EXPORT_COMMENT,
            '<key id="name" for="node" attr.name="name" attr.type="string"/>',
            '<key id="interaction" for="edge" attr.name="interaction" attr.type="string"/>',
            '<key id="name" for="edge" attr.name="name" attr.type="string"/>',
            '<key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
            '<graph edgedefault="directed">',
            '<node id="A">',
            '<data key="name">A</data>',
            "</node>",
            '<node id="B">',
            '<data key="name">B</data>',
            "</node>",
            '<node id="C">',
            '<data key="name">C</data>',
            "</node>",
            '<node id="D">',
            '<data key="name">D</data>',
            "</node>",
            '<edge source="C" target="B">',
            '<data key="interaction">pd</data>',
            '<data key="name">C (pd) B</data>',
            '<data key="weight">0.5</data>',
            "</edge>",
            '<edge source="B" target="A">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) A</data>',
            '<data key="weight">-0.75</data>',
            "</edge>",
            '<edge source="B" target="C">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) C</data>',
            '<data key="weight">0.25</data>',
            "</edge>",
            "</graph>",
            "</graphml>",
        ];

        lines.forEach(function (line, index) {
            expect(line).to.equal(expectedGraphMlLines[index]);
        });
    });

    it("should export unweighted workbooks with cycles to GraphML correctly", function () {
        var lines = exportController
            .grnsightToGraphMl(unweightedTestWorkbookWithCycle)
            .split("\n")
            .map(function (line) {
                return line.trim();
            });

        var expectedGraphMlLines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
                'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
            EXPORT_COMMENT,
            '<key id="name" for="node" attr.name="name" attr.type="string"/>',
            '<key id="interaction" for="edge" attr.name="interaction" attr.type="string"/>',
            '<key id="name" for="edge" attr.name="name" attr.type="string"/>',
            '<graph edgedefault="directed">',
            '<node id="A">',
            '<data key="name">A</data>',
            "</node>",
            '<node id="B">',
            '<data key="name">B</data>',
            "</node>",
            '<node id="C">',
            '<data key="name">C</data>',
            "</node>",
            '<node id="D">',
            '<data key="name">D</data>',
            "</node>",
            '<node id="E">',
            '<data key="name">E</data>',
            "</node>",
            '<edge source="C" target="B">',
            '<data key="interaction">pd</data>',
            '<data key="name">C (pd) B</data>',
            "</edge>",
            '<edge source="B" target="A">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) A</data>',
            "</edge>",
            '<edge source="B" target="C">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) C</data>',
            "</edge>",
            '<edge source="D" target="D">',
            '<data key="interaction">pd</data>',
            '<data key="name">D (pd) D</data>',
            "</edge>",
            '<edge source="A" target="A">',
            '<data key="interaction">pd</data>',
            '<data key="name">A (pd) A</data>',
            "</edge>",
            "</graph>",
            "</graphml>",
        ];

        lines.forEach(function (line, index) {
            expect(line).to.equal(expectedGraphMlLines[index]);
        });
    });

    it("should export weighted workbooks with cycles to GraphML correctly", function () {
        var lines = exportController
            .grnsightToGraphMl(weightedTestWorkbookWithCycle)
            .split("\n")
            .map(function (line) {
                return line.trim();
            });

        var expectedGraphMlLines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
                'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
            EXPORT_COMMENT,
            '<key id="name" for="node" attr.name="name" attr.type="string"/>',
            '<key id="interaction" for="edge" attr.name="interaction" attr.type="string"/>',
            '<key id="name" for="edge" attr.name="name" attr.type="string"/>',
            '<key id="weight" for="edge" attr.name="weight" attr.type="double"/>',
            '<graph edgedefault="directed">',
            '<node id="A">',
            '<data key="name">A</data>',
            "</node>",
            '<node id="B">',
            '<data key="name">B</data>',
            "</node>",
            '<node id="C">',
            '<data key="name">C</data>',
            "</node>",
            '<node id="D">',
            '<data key="name">D</data>',
            "</node>",
            '<node id="E">',
            '<data key="name">E</data>',
            "</node>",
            '<edge source="C" target="B">',
            '<data key="interaction">pd</data>',
            '<data key="name">C (pd) B</data>',
            '<data key="weight">0.5</data>',
            "</edge>",
            '<edge source="B" target="A">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) A</data>',
            '<data key="weight">-0.75</data>',
            "</edge>",
            '<edge source="B" target="C">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) C</data>',
            '<data key="weight">0.25</data>',
            "</edge>",
            '<edge source="D" target="D">',
            '<data key="interaction">pd</data>',
            '<data key="name">D (pd) D</data>',
            '<data key="weight">-0.375</data>',
            "</edge>",
            '<edge source="A" target="A">',
            '<data key="interaction">pd</data>',
            '<data key="name">A (pd) A</data>',
            '<data key="weight">0.875</data>',
            "</edge>",
            "</graph>",
            "</graphml>",
        ];

        lines.forEach(function (line, index) {
            expect(line).to.equal(expectedGraphMlLines[index]);
        });
    });

    it("should export workbooks with a filename as the graph element id", function () {
        var workbookWithFilename = extend(true, unweightedTestWorkbook, {
            filename: "hello.graphml",
        });
        var lines = exportController
            .grnsightToGraphMl(workbookWithFilename)
            .split("\n")
            .map(function (line) {
                return line.trim();
            });
        var expectedGraphMlLines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<graphml xmlns="http://graphml.graphdrawing.org/xmlns" ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns ' +
                'http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">',
            EXPORT_COMMENT,
            '<key id="name" for="node" attr.name="name" attr.type="string"/>',
            '<key id="interaction" for="edge" attr.name="interaction" attr.type="string"/>',
            '<key id="name" for="edge" attr.name="name" attr.type="string"/>',
            '<graph edgedefault="directed" id="hello.graphml">',
            '<node id="A">',
            '<data key="name">A</data>',
            "</node>",
            '<node id="B">',
            '<data key="name">B</data>',
            "</node>",
            '<node id="C">',
            '<data key="name">C</data>',
            "</node>",
            '<node id="D">',
            '<data key="name">D</data>',
            "</node>",
            '<edge source="C" target="B">',
            '<data key="interaction">pd</data>',
            '<data key="name">C (pd) B</data>',
            "</edge>",
            '<edge source="B" target="A">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) A</data>',
            "</edge>",
            '<edge source="B" target="C">',
            '<data key="interaction">pd</data>',
            '<data key="name">B (pd) C</data>',
            "</edge>",
            "</graph>",
            "</graphml>",
        ];

        lines.forEach(function (line, index) {
            expect(line).to.equal(expectedGraphMlLines[index]);
        });
    });
});

const inputPPIWorkbook = {
    genes: [{ name: "Aim32p" }, { name: "Ccr4p" }, { name: "Erv1p" }],

    links: [
        {
            source: 0,
            target: 1,
            value: 1,
            type: "arrowhead",
            stroke: "black",
        },
        {
            source: 1,
            target: 1,
            value: 1,
            type: "arrowhead",
            stroke: "black",
        },
        {
            source: 0,
            target: 2,
            value: 1,
            type: "arrowhead",
            stroke: "black",
        },
        {
            source: 2,
            target: 2,
            value: 1,
            type: "arrowhead",
            stroke: "black",
        },
    ],

    network: {
        genes: [{ name: "Aim32p" }, { name: "Ccr4p" }, { name: "Erv1p" }],

        links: [
            {
                source: 0,
                target: 1,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },
            {
                source: 1,
                target: 1,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },
            {
                source: 0,
                target: 2,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },
            {
                source: 2,
                target: 2,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },
        ],
    },
    networkWeights: {},

    meta: {
        data: {
            workbookType: "protein-protein-physical-interaction",
            species: "Saccharomyces cerevisiae",
            taxon_id: "559292",
        },
    },
};

inputPPIWorkbook.exportSheets = {
    networks: {
        network: inputPPIWorkbook.network,
    },
    optimization_parameters: inputPPIWorkbook.meta,
};

const inputWorkbook = {
    genes: [{ name: "ACE2" }, { name: "AFT2" }, { name: "CIN5" }],

    links: [
        {
            source: 0,
            target: 0,
            value: 1,
            type: "arrowhead",
            stroke: "black",
        },

        {
            source: 1,
            target: 1,
            value: 1,
            type: "arrowhead",
            stroke: "black",
        },

        {
            source: 2,
            target: 1,
            value: 1,
            type: "arrowhead",
            stroke: "black",
        },

        {
            source: 2,
            target: 2,
            value: 1,
            type: "arrowhead",
            stroke: "black",
        },
    ],

    network: {
        genes: [{ name: "ACE2" }, { name: "AFT2" }, { name: "CIN5" }],

        links: [
            {
                source: 0,
                target: 0,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },

            {
                source: 1,
                target: 1,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },

            {
                source: 2,
                target: 1,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },

            {
                source: 2,
                target: 2,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },
        ],
    },

    networkWeights: {
        genes: [{ name: "ACE2" }, { name: "AFT2" }, { name: "CIN5" }],

        links: [
            {
                source: 0,
                target: 0,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },

            {
                source: 1,
                target: 1,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },

            {
                source: 2,
                target: 1,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },

            {
                source: 2,
                target: 2,
                value: 1,
                type: "arrowhead",
                stroke: "black",
            },
        ],
    },

    meta: {
        data: {
            L_curve: 0,
            MaxFunEval: 1000000,
            MaxIter: 1000000,
            Strain: ["wt", "dcin5"],
            TolFun: 0.00001,
            TolX: 0.00001,
            alpha: 0.001,
            estimate_params: 1,
            expression_timepoints: [0.4, 0.8, 1.2],
            fix_P: 1,
            fix_b: 0,
            kk_max: 1,
            make_graphs: 1,
            production_function: "testMM",
            simulation_timepoints: [0, 0.1, 0.2],
            species: "Saccharomyces cerevisiae",
            taxon_id: 559292,
            workbookType: constants.NETWORK_GRN_MODE,
        },
    },

    test: {
        production_rates: {
            data: {
                ACE2: 0.5,
                AFT2: 1,
                CIN5: 2,
            },
        },

        degradation_rates: {
            data: {
                ACE2: 1,
                AFT2: 1,
                CIN5: 1,
            },
        },

        threshold_b: {
            data: {
                ACE2: 0,
                AFT2: 0,
                CIN5: 0,
            },
        },
    },

    exportExpression: {
        wt_log2_expression: {
            timePoints: [0.4, 0.8, 1.2],
            data: {
                id: [0.4, 0.8, 1.2],
                ACE2: [1, 2, 3],

                AFT2: [4, 5, 6],

                CIN5: [7, 8, 9],
            },
        },

        dcin5_log2_expression: {
            timePoints: [0.4, 0.8, 1.2],
            data: {
                id: [0.4, 0.8, 1.2],
                ACE2: [10, 11, 12],

                AFT2: [13, 14, 15],

                CIN5: [16, 17, 18],
            },
        },
    },
};

inputWorkbook.exportSheets = {
    networks: {
        network: inputWorkbook.network,
        network_weights: inputWorkbook.networkWeights,
    },
    optimization_parameters: inputWorkbook.meta,
    two_column_sheets: inputWorkbook.test,
    expression: inputWorkbook.exportExpression,
};

describe("Export to spreadsheet", function () {
    it("should export a workbook of gene regulatory network to a spreadsheet object properly", function () {
        const expectedSheet = [
            {
                name: "network",
                data: [
                    [CELL_A1_GRN, "ACE2", "AFT2", "CIN5"],
                    ["ACE2", 1, 0, 0],
                    ["AFT2", 0, 1, 1],
                    ["CIN5", 0, 0, 1],
                ],
            },

            {
                name: "network_weights",
                data: [
                    [CELL_A1_GRN, "ACE2", "AFT2", "CIN5"],
                    ["ACE2", 1, 0, 0],
                    ["AFT2", 0, 1, 1],
                    ["CIN5", 0, 0, 1],
                ],
            },

            {
                name: "optimization_parameters",
                data: [
                    ["optimization_parameter", "value"],
                    ["L_curve", 0],
                    ["MaxFunEval", 1000000],
                    ["MaxIter", 1000000],
                    ["Strain", "wt", "dcin5"],
                    ["TolFun", 0.00001],
                    ["TolX", 0.00001],
                    ["alpha", 0.001],
                    ["estimate_params", 1],
                    ["expression_timepoints", 0.4, 0.8, 1.2],
                    ["fix_P", 1],
                    ["fix_b", 0],
                    ["kk_max", 1],
                    ["make_graphs", 1],
                    ["production_function", "testMM"],
                    ["simulation_timepoints", 0, 0.1, 0.2],
                    ["species", "Saccharomyces cerevisiae"],
                    ["taxon_id", 559292],
                    ["workbookType", constants.NETWORK_GRN_MODE],
                ],
            },

            {
                name: "production_rates",
                data: [
                    ["id", "production_rate"],
                    ["ACE2", 0.5],
                    ["AFT2", 1],
                    ["CIN5", 2],
                ],
            },

            {
                name: "degradation_rates",
                data: [
                    ["id", "degradation_rate"],
                    ["ACE2", 1],
                    ["AFT2", 1],
                    ["CIN5", 1],
                ],
            },

            {
                name: "threshold_b",
                data: [
                    ["id", "threshold_b"],
                    ["ACE2", 0],
                    ["AFT2", 0],
                    ["CIN5", 0],
                ],
            },

            {
                name: "wt_log2_expression",
                data: [
                    ["id", 0.4, 0.8, 1.2],
                    ["ACE2", 1, 2, 3],
                    ["AFT2", 4, 5, 6],
                    ["CIN5", 7, 8, 9],
                ],
            },

            {
                name: "dcin5_log2_expression",
                data: [
                    ["id", 0.4, 0.8, 1.2],
                    ["ACE2", 10, 11, 12],
                    ["AFT2", 13, 14, 15],
                    ["CIN5", 16, 17, 18],
                ],
            },
        ];

        const actualSheet = exportController.grnsightToXlsx(inputWorkbook);
        expect(actualSheet).to.deep.equal(xlsx.build(expectedSheet));
    });

    it("should export a workbook of ppi to a spreadsheet object properly", function () {
        const expectedSheet = [
            {
                name: "network",
                data: [
                    [CELL_A1_PPI, "Aim32p", "Ccr4p", "Erv1p"],
                    ["Aim32p", 0, 0, 0],
                    ["Ccr4p", 1, 1, 0],
                    ["Erv1p", 1, 0, 1],
                ],
            },

            {
                name: "optimization_parameters",
                data: [
                    ["optimization_parameter", "value"],
                    ["workbookType", constants.NETWORK_PPI_MODE],
                    ["species", "Saccharomyces cerevisiae"],
                    ["taxon_id", "559292"],
                ],
            },
        ];
        const actualSheet = exportController.grnsightToXlsx(inputPPIWorkbook);
        expect(actualSheet).to.deep.equal(xlsx.build(expectedSheet));
    });

    it("should export a workbook exactly as the import", function () {
        // Commented out temporarily while reworking the export of the optimization diagnostics sheet
        // test.importFileSameAsExportFile(
        //     "test-files/additional-sheet-test-files/optimization-diagnostics-default.xlsx");
        test.importFileSameAsExportFile(
            "test-files/expression-data-test-sheets/expression_sheet_missing_data_ok_export_exact.xlsx"
        );
        test.importFileSameAsExportFile(
            "test-files/additional-sheet-test-files/optimization-parameters-default.xlsx"
        );
    });

    it(
        "should import a workbook with minor additional sheet warnings," +
            " export the workbook, and import the exported workbook properly",
        function () {
            test.importExportReImportNoErrorsOrWarnings(
                "test-files/additional-sheet-test-files/optimization-parameters-incorrect-headers.xlsx"
            );
            test.importExportReImportNoErrorsOrWarnings(
                "test-files/additional-sheet-test-files/two-column-sheets-missing-column-header.xlsx"
            );
            test.importExportReImportNoErrorsOrWarnings(
                "test-files/additional-sheet-test-files/optimization-diagnostics-incorrect-MSE-gene-header.xlsx"
            );
        }
    );

    it("should import a workbook with no warnings, export the workbook, and import the exported workbook properly", function () {
        test.importExportReImportNoErrorsOrWarnings(
            "test-files/additional-sheet-test-files/optimization-diagnostics-default.xlsx"
        );
    });
});
