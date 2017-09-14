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
    GRAPHML_GENERAL_SYNTAX_ERROR: function (err) {
        return {
            errorCode: "GRAPHML_GENERAL_SYNTAX_ERROR",
            possibleCause: err.error,
            suggestedFix: "",
            // possibleCause: "There are a number of things that could've triggered this error, but the general gist" +
            // " is that there is something syntactically wrong with your file. The parcer we are using" +
            // " has associated your syntax error with this message: " + error + ".",
            // suggestedFix:  "Please check the format of your file and make sure that it is in line with our" +
            // " Documentation page. Some common errors to check for are missing start/end tags, missing" +
            // " quotation marks, and proper spelling of all attribute names."
        };
    },
};

var errRelevantMessage = {
    "test example": graphmlErrors.GRAPHML_GENERAL_SYNTAX_ERROR,
};

module.exports = {
    graphmlErrors: graphmlErrors,
    graphmlWarnings: graphmlWarnings,
    errRelevantMessage: errRelevantMessage,
};
