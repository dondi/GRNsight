module.exports = {
  VERSION: "1.18",

  NOT_FOUND: -1,
  WEIGHTED: "weighted",
  UNWEIGHTED: "unweighted",

  GRNSIGHT_FILENAME_HEADER: "X-GRNsight-Filename",

  warnings: {
    EDGES_WITHOUT_WEIGHTS: {
      warningCode: "EDGES_WITHOUT_WEIGHTS",
      errorDescription: "GRNsight has detected that one or more edges in your network are missing numerical weight" +
      " values. Because the algorithm GRNsight uses for determining the arrowhead type and the color and thickness of" +
      " the edges requires numerical weight values, your graph will display as an unweighted graph with black edges" +
      "and pointed arrowheads. If you want to display the network as a weighted graph, please modify your input file" +
      "to include weight values for all edges."
    },

    EDGE_DEFAULT_NOT_DIRECTED: {
      warningCode: "EDGE_DEFAULT_NOT_DIRECTED",
      errorDescription: "GRNsight interprets the graph as directed unconditionally."
    }
  },

  errors: {
    SIF_FORMAT_ERRROR: {
      errorCode: "SIF_FORMAT_ERRROR",
      possibleCause: "No tabs are detected in the SIF input file",
      suggestedFix: "SIF files accepted by GRNsight must delimit data using tabs. Please review the SIF input standards" +
      "that are outlined in the documentation."
    },

    SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERRROR: {
      errorCode: "SIF_UNWEIGHTED_RELATIONSHIP_TYPE_ERRROR",
      possibleCause: "The SIF importer detects an unweighted network with an unsupported relationship type.",
      suggestedFix: "SIF files accepted by GRNsight must use 'pd' as the text string for the relationship type in unweighted networks." +
      " Please review the SIF input documentation."
    },

    SIF_MISSING_DATA_ERROR: {
      errorCode: "SIF_MISSING_DATA_ERROR",
      possibleCause: "GRNsight has detected that your SIF file contains missing data. ",
      suggestedFix: "Please review the data. Each row must have a source, relationship, and at least one target, " +
      "separated by tabs. Self referential loops are allowed, and are represented by a row with a single gene."
    },

    SIF_STRAY_DATA_ERROR: {
      errorCode: "SIF_STRAY_DATA_ERROR",
      possibleCause: "GRNsight has detected stray data in your SIF file. ",
      suggestedFix: "Please review the data and delete extraneous data from the file."
    }
  }
};
