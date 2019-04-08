import { max } from "d3-array";
import {
  SHOW_WEIGHTS_MOUSEOVER,
  LINK_DIST_SLIDER_ID,
  LINK_DIST_VALUE,
  LINK_DIST_DEFAULT_VALUE,
  CHARGE_SLIDER_ID,
  CHARGE_VALUE,
  CHARGE_DEFAULT_VALUE,
  DEFAULT_MAX_LOG_FOLD_CHANGE,
} from "./constants";
let currentNetwork = null;

const annotateLinks = network => {
    // TODO This duplicates logic that is done on the server side for an .xlsx spreadsheet.
    //      Think of a way to consolidate it. Having discovered this, it seems like this should
    //      be done on the client side because it rearranges data redundantly, for ease of display.
    network.positiveWeights = [];
    network.negativeWeights = [];

    network.links.forEach(link => {
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

const genePageData = () => {

    // set to be a function for when data is read from .xml
    return {
        species: "Saccharomyces_cerevisiae",
        taxon: "559292"
    };
};

export const grnState = {
    name: null,
    simulation: undefined,
    newNetwork: false,

    get network () {
        return currentNetwork;
    },

    set network (network) {
        currentNetwork = network;
        // TODO: add colorOptimal so that the rest of the normalization code can get added
        this.resetNormalizationMax = max(network.positiveWeights.concat(network.negativeWeights));
        this.newNetwork = true;
    },

// Edge Display Parameters
    normalizationMax: null,
    resetNormalizationMax: null,
    edgeWeightDisplayOption: SHOW_WEIGHTS_MOUSEOVER,
    colorOptimal: true,
    grayEdgeThreshold: 5,
    dashedLine: false,

    annotateLinks: () => annotateLinks(currentNetwork),


// Gene Page data
    species: genePageData().species,
    taxon: genePageData().taxon,

// Node Coloring

    nodeColoring: {
        logFoldChangeMaxValue: DEFAULT_MAX_LOG_FOLD_CHANGE,
        nodeColoringEnabled: true,
        avgTopDataset: true,
        avgBottomDataset: true,
        topDataset: undefined,
        bottomDataset: undefined,
        lastDataset: null,
        bottomDataSameAsTop: true,
    },

// Slider Parameters
    slidersLocked: false,
    resetTrigger: false,
    undoResetTriggered: false,
    linkDistanceSlider: {
        sliderId: LINK_DIST_SLIDER_ID,
        valueId: LINK_DIST_VALUE,
        defaultVal: LINK_DIST_DEFAULT_VALUE,
        currentVal: LINK_DIST_DEFAULT_VALUE,
        backup: LINK_DIST_DEFAULT_VALUE,
        needsAppendedZeros: false,
        forceChanged: false,
    },
    chargeSlider: {
        sliderId: CHARGE_SLIDER_ID,
        valueId: CHARGE_VALUE,
        defaultVal: CHARGE_DEFAULT_VALUE,
        currentVal: CHARGE_DEFAULT_VALUE,
        backup: CHARGE_DEFAULT_VALUE,
        needsAppendedZeros: false,
        forceChanged: false,
    },

// Graph Layout Parameter
    graphLayout: "FORCE_GRAPH",
};