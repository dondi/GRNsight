let currentNetwork = null;

var annotateLinks = function (network) {
    // TODO This duplicates logic that is done on the server side for an .xlsx spreadsheet.
    //      Think of a way to consolidate it. Having discovered this, it seems like this should
    //      be done on the client side because it rearranges data redundantly, for ease of display.
    network.positiveWeights = [];
    network.negativeWeights = [];

    network.links.forEach(function (link) {
        if (network.sheetType === "unweighted" && !link.value) {
            link.value = 1;
        }

        if (link.value > 0) {
            link.type = "arrowhead";
            // link.stroke = "MediumVioletRed";   // GRNsight v1 magenta edge color
            link.stroke = "rgb(195, 61, 61)";     // Node coloring-consistent red edge color
            network.positiveWeights.push(link.value);
        } else {
            link.type = "repressor";
            // link.stroke = "DarkTurquoise";     // GRNsight v1 cyan edge color
            link.stroke = "rgb(51, 124, 183)";    // Node coloring-consistent blue edge color
            network.negativeWeights.push(link.value);
        }
    });
};

export const grnState = {
    name: null,

    newNetwork: false,

    get network () {
        return currentNetwork;
    },

    set network (network) {
        currentNetwork = network;
        this.newNetwork = true;
    },

    dashedLine: false,

    annotateLinks: () => annotateLinks(currentNetwork)
};
