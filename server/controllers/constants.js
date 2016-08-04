module.exports = {
  NOT_FOUND: -1,
  WEIGHTED: "weighted",
  UNWEIGHTED: "unweighted",

  GRNSIGHT_FILENAME_HEADER: "X-GRNsight-Filename",

  warnings: {
    EDGES_WITHOUT_WEIGHTS: {
      warningCode: "EDGES_WITHOUT_WEIGHTS",
      errorDescription: "GRNsight attempted to import the graph as weighted, but some edges did not have a weight."
    },

    EDGE_DEFAULT_NOT_DIRECTED: {
      warningCode: "EDGE_DEFAULT_NOT_DIRECTED",
      errorDescription: "GRNsight interprets the graph as directed unconditionally."
    }
  }
};
