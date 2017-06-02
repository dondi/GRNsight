var expect = require("chai").expect;
var extend = require("jquery-extend");
// var fs = require("fs");
// var UTF8 = { encoding: "utf-8" };

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

// Unweighted SIF

var unweightedTestSif = [
    "A",
    [ "B", "pd", "A", "C" ].join("\t"),
    [ "C", "pd", "B" ].join("\t"),
    "D"
].join("\r\n"); // Mix up linebreak types to test normalization.

var unweightedTestSifWithCycle = [
    [ "A", "pd", "A" ].join("\t"),
    [ "B", "pd", "A", "C" ].join("\t"),
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "pd", "D" ].join("\t"),
    "E"
].join("\r\n");

var unweightedTestSifCommaSeparated = [
    "A",
    [ "B", "pd", "A", "C" ].join(","),
    [ "C", "pd", "B" ].join(","),
    "D"
].join("\r\n");

var unweightedTestSifMissingSource = [
    [ "pd", "A" ].join("\t"), // Missing source
    [ "B", "pd", "A" ].join("\t"),
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "pd", "D" ].join("\t"),
    "E"
].join("\r\n");

var unweightedTestSifMissingRelationship = [
    [ "A", "pd", "A" ].join("\t"),
    [ "B", "A"].join("\t"), // Missing relationship
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "pd", "D" ].join("\t"),
    "E"
].join("\r\n");

var unweightedTestSifMissingTarget = [
    [ "A", "pd", "A" ].join("\t"),
    [ "B", "pd", "A" ].join("\t"),
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "pd", ].join("\t"), // Missing target
    "E"
].join("\r\n");

var unweightedTestSifMissingSourceMultiColumn = [
    [ "pd", "A", "B", "C", "E" ].join("\t"), // Missing source
    [ "B", "pd", "A" ].join("\t"),
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "pd", "E"].join("\t"),
    "E"
].join("\r\n");

var unweightedTestSifMissingRelationshipMultiColumn = [
    [ "A", "B", "C", "E" ].join("\t"),
    [ "B", "A"].join("\t"), // Missing relationship
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "pd", "D" ].join("\t"),
    "E"
].join("\r\n");

var unweightedTestSifWithIncorrectRelationshipType = [
    [ "A", "pd", "A" ].join("\t"),
    [ "B", "pd", "A", "C" ].join("\t"),
    [ "C", "interacts with", "B" ].join("\t"),  // Incorrect relationship
    [ "D", "pd", "D" ].join("\t"),
    "E"
].join("\r\n");

var unweightedTestSifWithUntargeted = [
    [ "A", "pd", "A" ].join("\t"),
    [ "B", "pd", "A", "C" ].join("\t"),
    [ "D", "pd", "E" ].join("\t"),
].join("\r\n");

var unweightedTestSifWithStrayData = [
    [ "A", "pd", "A" ].join("\t"),
    [ "B", "pd", "A", "C", "", "straydata" ].join("\t"),
    [ "D", "pd", "E" ].join("\t"),
].join("\r\n");

var unweightedTestSifWithStrayDataAtBottom = [
    [ "A", "pd", "A" ].join("\t"),
    [ "B", "pd", "A", "C" ].join("\t"),
    [ "D", "pd", "E" ].join("\t"),
    [""],
    [""],
    [ "straydata"]
].join("\r\n");

// Weighted SIF

var weightedTestSif = [
    [ "A"].join("\t"),
    [ "B", "-0.75", "A" ].join("\t"),
    [ "B", "0.25", "C" ].join("\t"),
    [ "C", "0.5", "B" ].join("\t"),
    "D"
].join("\n");

var inconsistentlyWeightedTestSif = [
    "A",
    [ "B", "-0.75", "A" ].join("\t"),
    [ "B", "pd", "C" ].join("\t"),
    [ "C", "0.5", "B" ].join("\t"),
    [ "D"].join("\t")
].join("\r\n");


var weightedTestSifWithCycle = [
    [ "A", "0.875", "A" ].join("\t"),
    [ "B", "-0.75", "A" ].join("\t"),
    [ "B", "0.25", "C" ].join("\t"),
    [ "C", "0.5", "B" ].join("\t"),
    [ "D", "-0.375", "D" ].join("\t"),
    "E"
].join("\r");

var inconsistentlyWeightedTestSifWithCycle = [
    [ "A", "0.875", "A" ].join("\t"),
    [ "B", "-0.75", "A" ].join("\t"),
    [ "B", "0.25", "C" ].join("\t"),
    [ "C", "0.5", "B" ].join("\t"),
    [ "D", "pd", "D" ].join("\t"),
    "E"
].join("\n");

var strayDataIn3ColumnFormat = [
    [ "A", "0.25", "C" ].join("\t"),
    [ "B", "-0.75", "A", "", "", "straydata" ].join("\t"),
    [ "B", "0.25", "C" ].join("\t"),
    [ "C", "0.5", "B" ].join("\t"),
    "D"
].join("\n");

var strayDataInMultiColumnFormat = [
    [ "A", "pd", "A", "B", "C", "E"].join("\t"),
    [ "B", "pd", "A", "", "", "straydata"].join("\t"), // Stray data here
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "pd", "E"].join("\t"),
    "E"
].join("\r\n");

var triviallyTabbedUnweightedNetwork = [
    "A",
    [ "B", "pd", "A", "C" ].join("\t"),
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "", "", "", ""].join("\t")    // extra tabs before the newline
].join("\r\n");

var emptyFile = "";


// Special Cases
var sifWithOneNode = "A";

var sifWithSemanticAndSyntacticErrors = [
    [ "@%^&", "A" ].join("\t"), // Missing relationship data and source gene contains special characters
    [ "B", "pd", "A", "C" ].join("\t"),
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "pd", "D" ].join("\t"),
    "E"
].join("\r\n");

var sifWithSemanticErrorOnly = [
    [ "@%^&", "pd", "A" ].join("\t"), // Source gene contains special characters
    [ "B", "pd", "A", "C" ].join("\t"),
    [ "C", "pd", "B" ].join("\t"),
    [ "D", "pd", "D" ].join("\t"),
    "E"
].join("\r\n");

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
        ).to.deep.equal(extend(true, {}, expectedUnweightedNetwork, {
            warnings: [
                constants.warnings.EDGES_WITHOUT_WEIGHTS
            ]
        }));
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
        ).to.deep.equal(extend(true, {}, expectedUnweightedNetworkWithCycle, {
            warnings: [
                constants.warnings.EDGES_WITHOUT_WEIGHTS
            ]
        }));
    });

    it("should import nodes mentioned only in edges (i.e., targeted but targetless)", function () {
        expect(
            importController.sifToGrnsight(unweightedTestSifWithUntargeted)
        ).to.deep.equal({
            genes: [
                { name: "A" },
                { name: "B" },
                { name: "D" },
                { name: "C" },
                { name: "E" }
            ],

            links: [
                { source: 0, target: 0 },
                { source: 1, target: 0 },
                { source: 1, target: 3 },
                { source: 2, target: 4 }
            ],

            errors: [],
            warnings: [],
            positiveWeights: [],
            negativeWeights: [],
            sheetType: "unweighted"
        });
    });

    it("should import a network with a single node correctly", function () {
        expect(
            importController.sifToGrnsight(sifWithOneNode)
        ).to.deep.equal({
            genes: [
                { name: "A" }
            ],
            links: [],
            errors: [],
            warnings: [],
            positiveWeights: [],
            negativeWeights: [],
            sheetType: "weighted"
        });
    });

});

describe("Import from SIF semantic checker", function () {
    it("should be disabled when syntactic errors are detected", function () {
        expect(
            importController.sifToGrnsight(sifWithSemanticAndSyntacticErrors).errors.length
        ).to.equal(1);
    });

    it("should be enabled when there are no syntactic errors", function () {
        expect(
            importController.sifToGrnsight(sifWithSemanticErrorOnly).errors[0].errorCode
        ).to.equal("INVALID_CHARACTER");
    });

    it("should throw an error for SIF files with no data", function () {
        expect(
            importController.sifToGrnsight(emptyFile).errors[0].errorCode
        ).to.equal("EMPTY_NETWORK_ERROR");
    });

});

describe("Import from SIF syntactic checker", function () {

    it("should produce no warnings or errors for correct data", function () {
        expect(
            importController.sifToGrnsight(unweightedTestSif).errors.length
        ).to.equal(0);
    });

    it("should throw an error for unweighted graphs with relationship types other than 'pd'", function () {
        expect(
            importController.sifToGrnsight(unweightedTestSifWithIncorrectRelationshipType).errors.length
        ).to.equal(1);

        expect(
            importController.sifToGrnsight(unweightedTestSifWithIncorrectRelationshipType).errors[0].errorCode
        ).to.equal("SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERROR");
    });

    it("should generate a warning if the data is comma separated", function () {
        expect(
            importController.sifToGrnsight(unweightedTestSifCommaSeparated).errors[0].warningCode
        ).to.equal("SIF_FORMAT_WARNING");
    });

    it("should throw an error if there is missing data in the 3 column format", function () {
        expect(
            importController.sifToGrnsight(unweightedTestSifMissingTarget).errors[0].errorCode
        ).to.equal("SIF_MISSING_DATA_ERROR");

        expect(
            importController.sifToGrnsight(unweightedTestSifMissingSource).errors[0].errorCode
        ).to.equal("SIF_MISSING_DATA_ERROR");

        expect(
            importController.sifToGrnsight(unweightedTestSifMissingRelationship).errors[0].errorCode
        ).to.equal("SIF_MISSING_DATA_ERROR");
    });

    it("should throw an error if there is missing data in the multi-column format", function () {
        expect(
            importController.sifToGrnsight(unweightedTestSifMissingSourceMultiColumn).errors[0].errorCode
        ).to.equal("SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERROR");

        expect(
            importController.sifToGrnsight(unweightedTestSifMissingRelationshipMultiColumn).errors[0].errorCode
        ).to.equal("SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERROR");
    });

    it("should throw an error if there is stray data in the 3-column format", function () {
        expect(
            importController.sifToGrnsight(strayDataIn3ColumnFormat).errors[0].errorCode
        ).to.equal("SIF_STRAY_DATA_ERROR");
    });

    it("should throw an error if there is stray data in the multi-column format", function () {
        expect(
            importController.sifToGrnsight(strayDataInMultiColumnFormat).errors[0].errorCode
        ).to.equal("SIF_STRAY_DATA_ERROR");
    });

    it("should throw an error if there is stray data for unweighted networks", function () {
        expect(
            importController.sifToGrnsight(unweightedTestSifWithStrayData).errors[0].errorCode
        ).to.equal("SIF_STRAY_DATA_ERROR");
    });

    it("should throw an error if there is stray data at the bottom of an unweighted network", function () {
        expect(
            importController.sifToGrnsight(unweightedTestSifWithStrayDataAtBottom).errors[0].errorCode
        ).to.equal("SIF_STRAY_DATA_ERROR");
    });

    it("should accept trivially tabbed networks", function () {
        expect(
            importController.sifToGrnsight(triviallyTabbedUnweightedNetwork)
        ).to.deep.equal(expectedUnweightedNetwork);
    });

});
