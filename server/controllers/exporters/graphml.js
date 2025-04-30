var xmlbuilder = require("xmlbuilder");
var constants = require(__dirname + "/../constants");

var INTERACTION_ID = "interaction";
var NAME_ID = "name";
var WEIGHT_ID = "weight";

var grnsightToGraphMlJson = function (workbook) {
    var convertedWorkbook = {
        graphml: {
            "@xmlns": "http://graphml.graphdrawing.org/xmlns",
            "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "@xsi:schemaLocation":
                "http://graphml.graphdrawing.org/xmlns " +
                "http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd",

            "#comment":
                "Exported by GRNsight v" +
                constants.VERSION +
                "  " +
                "http://dondi.github.io/GRNsight/  " +
                "https://github.com/dondi/GRNsight/releases/tag/v" +
                constants.VERSION,

            key: [
                {
                    "@id": NAME_ID,
                    "@for": "node",
                    "@attr.name": "name",
                    "@attr.type": "string",
                },

                {
                    "@id": INTERACTION_ID,
                    "@for": "edge",
                    "@attr.name": "interaction",
                    "@attr.type": "string",
                },

                {
                    "@id": NAME_ID,
                    "@for": "edge",
                    "@attr.name": "name",
                    "@attr.type": "string",
                },
            ],
        },
    };

    if (workbook.sheetType === constants.WEIGHTED) {
        convertedWorkbook.graphml.key.push({
            "@id": WEIGHT_ID,
            "@for": "edge",
            "@attr.name": "weight",
            "@attr.type": "double",
        });
    }

    convertedWorkbook.graphml.graph = {
        "@edgedefault": "directed",

        node: workbook.genes.map(function (gene) {
            return {
                "@id": gene.name,
                data: {
                    "@key": NAME_ID,
                    "#text": gene.name,
                },
            };
        }),

        edge: workbook.links.map(function (link) {
            var sourceGeneId = workbook.genes[link.source].name;
            var targetGeneId = workbook.genes[link.target].name;

            var edge = {
                "@source": sourceGeneId,
                "@target": targetGeneId,
                data: [
                    {
                        "@key": INTERACTION_ID,
                        "#text": "pd",
                    },

                    {
                        "@key": NAME_ID,
                        "#text": sourceGeneId + " (pd) " + targetGeneId,
                    },
                ],
            };

            if (workbook.sheetType === constants.WEIGHTED) {
                edge.data.push({
                    "@key": WEIGHT_ID,
                    "#text": link.value,
                });
            }

            return edge;
        }),
    };

    if (workbook.filename) {
        convertedWorkbook.graphml.graph["@id"] = workbook.filename;
    }

    return convertedWorkbook;
};

module.exports = function (workbook) {
    return xmlbuilder
        .create(grnsightToGraphMlJson(workbook), {
            version: "1.0",
            encoding: "UTF-8",
        })
        .end({
            pretty: true,
        });
};
