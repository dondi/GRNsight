var graphmlWarnings = {
    EDGES_WITHOUT_WEIGHTS: {
        warningCode: "EDGES_WITHOUT_WEIGHTS",
        errorDescription: "GRNsight has detected that one or more edges in your network are missing numerical" +
        " weight values. Because the algorithm GRNsight uses for determining the arrowhead type and the" +
        " color and thickness of the edges requires numerical weight values, your graph will" +
        " display as an unweighted graph with black edges and pointed arrowheads. If you want to" +
        " display the network as a weighted graph, please modify your input file to include weight" +
        " values for all edges."
    },
    EDGE_DEFAULT_NOT_DIRECTED: {
        warningCode: "EDGE_DEFAULT_NOT_DIRECTED",
        errorDescription: "GRNsight interprets the graph as directed unconditionally."
    },
};

var graphmlErrors = {
    GRAPHML_GENERAL_SYNTAX_ERROR: function (error) {
        return {
            errorCode: "GRAPHML_GENERAL_SYNTAX_ERROR",
            possibleCause: "There are a number of things that could've triggered this error, but the general gist" +
            " is that there is something syntactically wrong with your file. The parcer we are using" +
            " has associated your syntax error with this message: <b>\"" + error.error + "\"</b>.<br><br>",
            suggestedFix:  "Please check the format of your file and make sure that it is in line with our" +
            " Documentation page. Some common errors to check for are <em>missing start/end tags, missing" +
            " quotation marks, and proper spelling of all attribute names</em>."
        };
    },
    GRAPHML_INVALID_ATTRIBUTE_NAME: function (error) {
        return {
            errorCode: "GRAPHML_INVALID_ATTRIBUTE_NAME",
            possibleCause: error.error,
            suggestedFix: "",
        };
    },
    GRAPHML_UNMATCHED_CLOSE_TAG: function (error) {
        return {
            errorCode: "GRAPHML_UNMATCHED_CLOSE_TAG",
            possibleCause: error.error,
            suggestedFix: "",
        };
    },
    GRAPHML_MISSING_CLOSE_TAG_AFTER_FORWARD_SLASH: function (error) {
        return {
            errorCode: "GRAPHML_MISSING_CLOSE_TAG_AFTER_FORWARD_SLASH",
            possibleCause: error.error,
            suggestedFix: "",
        };
    },
    GRAPHML_UNFINISHED_CLOSING_TAG: function (error) {
        return {
            errorCode: "GRAPHML_MISSING_CLOSE_TAG_AFTER_FORWARD_SLASH",
            possibleCause: error.error,
            suggestedFix: "",
        };
    },
    GRAPHML_MISSING_GRAPHML_CLOSE_TAG: function (error) {
        return {
            errorCode: "GRAPHML_MISSING_GRAPHML_CLOSE_TAG",
            possibleCause: error.error,
            suggestedFix: "",
        };
    },
    GRAPHML_UNPAIRED_QUOTE: function (error) {
        return {
            errorCode: "GRAPHML_UNPAIRED_QUOTE",
            possibleCause: error.error,
            suggestedFix: "",
        };
    },
    GRAPHML_INVALID_CHARACTER_IN_NAME: function (error) {
        return {
            errorCode: "GRAPHML_INVALID_CHARACTER_IN_NAME",
            possibleCause: error.error,
            suggestedFix: "",
        };
    },
    GRAPHML_UNENCODED_TAG: function (error) {
        return {
            errorCode: "GRAPHML_UNENCODED_TAG",
            possibleCause: error.error,
            suggestedFix: "",
        };
    },
};

var errorMessageToGraphmlError = {
    "Invalid attribute name": graphmlErrors.GRAPHML_INVALID_ATTRIBUTE_NAME,
    // This error message is also associated with a missing close tag
    "Unexpected close tag": graphmlErrors.GRAPHML_UNMATCHED_CLOSE_TAG,
    "Forward-slash in opening tag not followed by >": graphmlErrors.GRAPHML_MISSING_CLOSE_TAG_AFTER_FORWARD_SLASH,
    "Invalid tagname in closing tag.": graphmlErrors.GRAPHML_UNFINISHED_CLOSING_TAG,
    "Unclosed root tag": graphmlErrors.GRAPHML_MISSING_GRAPHML_CLOSE_TAG,
    "No whitespace between attributes": graphmlErrors.GRAPHML_UNPAIRED_QUOTE,
    "Invalid character in entity name": graphmlErrors.GRAPHML_INVALID_CHARACTER_IN_NAME,
    "Unencoded <": graphmlErrors.GRAPHML_UNENCODED_TAG,
};

var pairError = function (error) {
    if (!errorMessageToGraphmlError.hasOwnProperty(error.error)) {
        return graphmlErrors.GRAPHML_GENERAL_SYNTAX_ERROR(error);
    }
    return errorMessageToGraphmlError[error.error](error);
};

module.exports = {
    graphmlErrors: graphmlErrors,
    graphmlWarnings: graphmlWarnings,
    errorMessageToGraphmlError: errorMessageToGraphmlError,
    pairError: pairError,
};
