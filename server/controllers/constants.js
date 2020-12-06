module.exports = {
    VERSION: "2.10",

    NOT_FOUND: -1,
    WEIGHTED: "weighted",
    UNWEIGHTED: "unweighted",

    GRNSIGHT_FILENAME_HEADER: "X-GRNsight-Filename",

    warnings: {
        EDGES_WITHOUT_WEIGHTS: {
            warningCode: "EDGES_WITHOUT_WEIGHTS",
            errorDescription: "GRNsight has detected that one or more edges in your network are missing numerical" +
            " weight values. Because the algorithm GRNsight uses for determining the arrowhead type and the color and" +
            " thickness of the edges requires numerical weight values, your graph will display as an unweighted graph" +
            " with black edges and pointed arrowheads. If you want to display the network as a weighted graph, please" +
            " modify your input file to include weight values for all edges."
        },

        EDGE_DEFAULT_NOT_DIRECTED: {
            warningCode: "EDGE_DEFAULT_NOT_DIRECTED",
            errorDescription: "GRNsight interprets the graph as directed unconditionally."
        },

        SIF_FORMAT_WARNING: {
            warningCode: "SIF_FORMAT_WARNING",
            errorDescription: " GRNsight has detected that there are no tabs in your file. The GRNsight specification" +
            " for SIF files states that data must be delimited by tabs. Please review your data. This warning may" +
            " suggest that your SIF file has comma separated data or contains no data at all. Additionally, valid" +
            " networks which consist of single source nodes may also trigger this warning."
        }
    },

    errors: {
        SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERROR: {
            errorCode: "SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERROR",
            possibleCause: "The SIF importer detects an unweighted network with an unsupported relationship type.",
            suggestedFix: "SIF files accepted by GRNsight must use 'pd' as the text string for the relationship type" +
            " in unweighted networks. Please review the SIF input documentation. Additionally, this error may be have" +
            " been caused by missing data in your file, which caused the importer to incorrectly interpret a source" +
            " or target as the relationship."
        },

        SIF_MISSING_DATA_ERROR: {
            errorCode: "SIF_MISSING_DATA_ERROR",
            possibleCause: "GRNsight has detected that your SIF file contains missing data. ",
            suggestedFix: "Please review the data. In a SIF file, each entry must have a source node, relationship" +
            " type, and at least one target node, separated by tabs. An entry with a single source node is also" +
            " allowed."
        },

        SIF_STRAY_DATA_ERROR: {
            errorCode: "SIF_STRAY_DATA_ERROR",
            possibleCause: "GRNsight has detected stray data and/or extraneous blank rows in your SIF file. ",
            suggestedFix: "Please review the data and delete extraneous data from the file."
        }
    }
};
