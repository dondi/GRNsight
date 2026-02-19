module.exports = {
    VERSION: "2.10",

    NOT_FOUND: -1,
    WEIGHTED: "weighted",
    UNWEIGHTED: "unweighted",
    CELL_A1_PPI: "cols protein1/rows protein2",
    CELL_A1_GRN: "cols regulators/rows targets",

    NETWORK_PPI_MODE: "protein-protein-physical-interaction",
    NETWORK_GRN_MODE: "grn",

    GRNSIGHT_FILENAME_HEADER: "X-GRNsight-Filename",

    warnings: {
        EDGES_WITHOUT_WEIGHTS: {
            warningCode: "EDGES_WITHOUT_WEIGHTS",
            errorDescription:
                "GRNsight has detected that one or more edges in your network are missing numerical" +
                " weight values. Because the algorithm GRNsight uses for determining the arrowhead type and the" +
                " color and  thickness of the edges requires numerical weight values, your graph will display as" +
                " an unweighted graph with black edges and pointed arrowheads. If you want to display the network" +
                " as a weighted graph, please modify your input file to include weight values for all edges.",
        },

        EDGE_DEFAULT_NOT_DIRECTED: {
            warningCode: "EDGE_DEFAULT_NOT_DIRECTED",
            errorDescription: "GRNsight interprets the graph as directed unconditionally.",
        },
    },
};
