import { max } from "d3-array";
import {
  SHOW_WEIGHTS_MOUSEOVER,
  LINK_DIST_SLIDER_SIDEBAR,
  LINK_DIST_VALUE,
  LINK_DIST_DEFAULT_VALUE,
  CHARGE_SLIDER_SIDEBAR,
  CHARGE_VALUE,
  CHARGE_DEFAULT_VALUE,
  DEFAULT_MAX_LOG_FOLD_CHANGE,
  DEFAULT_ZOOM_VALUE,
  FORCE_GRAPH
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

//function which takes the given input, and returns the correct data
//from the nameToTaxon table, which will let us query the APIs properly
// const identifySpecies = (data) => {
//     if(grnState.genePageData.identified === true){
//         return grnState.genePageData
//     }
//     for(const name in nameToTaxon){
//         if(nameToTaxon[name].values().includes(data)){
//             grnState.genePageData.identified = true;
//             return (name, nameToTaxon[name]);
//         }
//     }
// };

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

// Zoom Parameter
    zoomValue: DEFAULT_ZOOM_VALUE,

// Node Coloring
    nodeColoring: {
        showMenu: false,
        nodeColoringEnabled: true,
        logFoldChangeMaxValue: DEFAULT_MAX_LOG_FOLD_CHANGE,
        logFoldChangeUpdateTriggered: false,
        averageTopDataset: true,
        averageBottomDataset: true,
        topDataset: undefined,
        bottomDataset: undefined,
        lastDataset: null,
        bottomDataSameAsTop: true,
        nodeColoringOptions: [],
    },


// Gene Page data
// left defaulting to yeast for tests, until a better solution is found
    genePageData: {
        common_name: undefined,
        species: undefined,
        taxon_jaspar: undefined,
        taxon_uniprot: undefined,
        identified: false,
    },

    nameToTaxon: {
        //Treating like a dictionary with keys being the english name
        //and values being a tuple of (latin name, Uniprot, Jaspar)
        //some taxon ids are different between the two
        human: { spec: "homo_sapiens", jaspar: "9606", uniprot: "9606" },
        yeast: { spec: "Saccharomyces_cerevisiae", jaspar: "559292", uniprot: "4932" },
        fruit_fly: { spec: "drosophila_melanogaster", jaspar: "7227", uniprot: "7227" },
        nematode_worm: { spec: "caenorhabditis_elegans", jaspar: "6293", uniprot: "6293" },
        house_mouse: { spec: "mus_musculus", jaspar: "10090", uniprot: "10090" },
        thale_cress: { spec: "arabidopsis_thaliana", jaspar: "3702", uniprot: "3702" }
    },

// Slider Parameters
    slidersLocked: false,
    showUndoReset: false,
    linkDistanceSlider: {
        sliderId: LINK_DIST_SLIDER_SIDEBAR,
        valueId: LINK_DIST_VALUE,
        defaultVal: LINK_DIST_DEFAULT_VALUE,
        currentVal: LINK_DIST_DEFAULT_VALUE,
        backup: LINK_DIST_DEFAULT_VALUE,
        needsAppendedZeros: false,
        forceChanged: false,
    },
    chargeSlider: {
        sliderId: CHARGE_SLIDER_SIDEBAR,
        valueId: CHARGE_VALUE,
        defaultVal: CHARGE_DEFAULT_VALUE,
        currentVal: CHARGE_DEFAULT_VALUE,
        backup: CHARGE_DEFAULT_VALUE,
        needsAppendedZeros: false,
        forceChanged: false,
    },

// Graph Layout Parameter
    graphLayout: FORCE_GRAPH
};
