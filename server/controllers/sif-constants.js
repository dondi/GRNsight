module.exports = {
    warnings: {
        SIF_FORMAT_WARNING: {
            warningCode: "SIF_FORMAT_WARNING",
            errorDescription:
                " GRNsight has detected that there are no tabs in your file. The GRNsight specification" +
                " for SIF files states that data must be delimited by tabs. Please review your data. This warning may" +
                " suggest that your SIF file has comma separated data or contains no data at all. Additionally, valid" +
                " networks which consist of single source nodes may also trigger this warning.",
        },
    },

    errors: {
        SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERROR: {
            errorCode: "SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERROR",
            possibleCause:
                "The SIF importer detects an unweighted network with an unsupported relationship type.",
            suggestedFix:
                "SIF files accepted by GRNsight must use 'pd' or 'pp' as the text string for the" +
                " relationship type in unweighted networks. Please review the SIF input documentation." +
                " Additionally, this error may be have been caused by missing data in your file, which caused " +
                "the importer to incorrectly interpret a source or target as the relationship.",
        },

        SIF_MISSING_DATA_ERROR: {
            errorCode: "SIF_MISSING_DATA_ERROR",
            possibleCause: "GRNsight has detected that your SIF file contains missing data. ",
            suggestedFix:
                "Please review the data. In a SIF file, each entry must have a source node, relationship" +
                " type, and at least one target node, separated by tabs. An entry with a single source node is also" +
                " allowed.",
        },

        SIF_STRAY_DATA_ERROR: {
            errorCode: "SIF_STRAY_DATA_ERROR",
            possibleCause:
                "GRNsight has detected stray data and/or extraneous blank rows in your SIF file. ",
            suggestedFix: "Please review the data and delete extraneous data from the file.",
        },

        SIF_MIXED_RELATIONSHIP_TYPE_ERROR: {
            errorCode: "SIF_MIXED_RELATIONSHIP_TYPE_ERROR",
            possibleCause: "The SIF importer detects a SIF file with mixed relationship types.",
            suggestedFix: [
                "GRNsight only supports networks with a single relationship type.",
                "Please review the relationships for consistency.",
            ].join(" "),
        },
    },
};
