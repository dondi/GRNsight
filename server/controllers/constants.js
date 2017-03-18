module.exports = {
  VERSION: "1.18",

  NOT_FOUND: -1,
  WEIGHTED: "weighted",
  UNWEIGHTED: "unweighted",

  GRNSIGHT_FILENAME_HEADER: "X-GRNsight-Filename",

  warnings: {
    EDGES_WITHOUT_WEIGHTS: {
      warningCode: "EDGES_WITHOUT_WEIGHTS",
      errorDescription: "GRNsight has detected that one or more edges in your network are missing numerical weight values. Because the algorithm GRNsight uses for determining the arrowhead type and the color and thickness of the edges requires numerical weight values, your graph will display as an unweighted graph with black edges and pointed arrowheads. If you want to display the network as a weighted graph, please modify your input file to include weight values for all edges."
    },

    EDGE_DEFAULT_NOT_DIRECTED: {
      warningCode: "EDGE_DEFAULT_NOT_DIRECTED",
      errorDescription: "GRNsight interprets the graph as directed unconditionally."
    }
  },

  errors: {
    SIF_FORMAT_ERRROR: {
      possibleCause: "No tabs are detected in the SIF input file",
      suggestedFix: "SIF files accepted by GRNsight must delimit data using tabs. Please review the SIF input standards" +
      "that are outlined in the documentation."
    },

    SIF_MISSING_DATA_ERROR: {
      possibleCause: "The SIF file contains a row in which a relationship or a target gene is missing",
      suggestedFix: "A row in the SIF file may not have two columns. Please review the data."
  }
}
};
