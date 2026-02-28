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
    FORCE_GRAPH,
    VIEWPORT_INIT,
    NETWORK_GRN_MODE,
} from "./constants";
let currentWorkbook = null;

const annotateLinks = workbook => {
    // TODO This duplicates logic that is done on the server side for an .xlsx spreadsheet.
    //      Think of a way to consolidate it. Having discovered this, it seems like this should
    //      be done on the client side because it rearranges data redundantly, for ease of display.
    workbook.positiveWeights = [];
    workbook.negativeWeights = [];

    workbook.links.forEach(link => {
        if (workbook.sheetType === "unweighted" && !link.value) {
            link.value = 1;
        }

        if (link.value > 0) {
            link.type = "arrowhead";
            // link.stroke = "MediumVioletRed";   // GRNsight v1 magenta edge color
            link.stroke = "rgb(195, 61, 61)"; // Node coloring-consistent red edge color
            workbook.positiveWeights.push(link.value);
        } else {
            link.type = "repressor";
            // link.stroke = "DarkTurquoise";     // GRNsight v1 cyan edge color
            link.stroke = "rgb(51, 124, 183)"; // Node coloring-consistent blue edge color
            workbook.negativeWeights.push(link.value);
        }
    });
};

export const grnState = {
    mode: NETWORK_GRN_MODE, // GRNsight will display GRN view unless specified
    name: null,
    simulation: undefined,
    newWorkbook: false,
    workbookType: null,

    get workbook() {
        return currentWorkbook;
    },

    set workbook(workbook) {
        // console.dir(workbook);
        currentWorkbook = workbook;
        // TODO: add colorOptimal so that the rest of the normalization code can get added
        this.resetNormalizationMax = max(workbook.positiveWeights.concat(workbook.negativeWeights));
        this.newWorkbook = true;

        // Resetting nodeColoring values leftover from when you display a GRN
        this.nodeColoring.showMenu = false;
        this.nodeColoring.nodeColoringEnabled = undefined;
        this.nodeColoring.topDataset = "";
        this.nodeColoring.bottomDataset = "";
        this.nodeColoring.lastDataset = "";
        this.nodeColoring.nodeColoringOptions.workbookExpressions = [];
        this.nodeColoring.nodeColoringOptions.databaseExpressions = [];
    },

    // Edge Display Parameters
    normalizationMax: null,
    resetNormalizationMax: null,
    edgeWeightDisplayOption: SHOW_WEIGHTS_MOUSEOVER,
    colorOptimal: true,
    grayEdgeThreshold: 5,
    dashedLine: false,

    annotateLinks: () => annotateLinks(currentWorkbook),

    // Zoom Parameter
    zoomValue: DEFAULT_ZOOM_VALUE,

    // Node Coloring
    nodeColoring: {
        showMenu: false,
        nodeColoringEnabled: undefined,
        logFoldChangeMaxValue: DEFAULT_MAX_LOG_FOLD_CHANGE,
        logFoldChangeUpdateTriggered: false,
        averageTopDataset: true,
        averageBottomDataset: true,
        topDataset: undefined,
        bottomDataset: undefined,
        lastDataset: null,
        bottomDataSameAsTop: true,
        nodeColoringOptions: {
            workbookExpressions: [],
            databaseExpressions: [],
        },
        ppiNodeColorWarningDisplayed: false,
    },

    // Gene Page data
    // left defaulting to yeast for tests, until a better solution is found
    // Setting base case to yeast
    genePageData: {
        commonName: "Yeast",
        species: "Saccharomyces_cerevisiae",
        taxonUniprot: "559292",
        taxonJaspar: "4932",
        identified: false,
        ensembl: "reg",
        mine: "yeast",
    },

    nameToTaxon: {
        // Treating like a dictionary with keys being the english name
        // and values being a dictionary of (latin name, Uniprot, Jaspar)
        // some taxon ids are different between the two
        // changed spec names for common english and will have them formatted before calling an api
        "Arabidopsis thaliana": {
            spec: "Arabidopsis_thaliana",
            jaspar: 3702,
            uniprot: 3702,
            ensembl: "plant",
            mine: "thale",
        },
        "Caenorhabditis elegans": {
            spec: "Caenorhabditis_elegans",
            jaspar: 6293,
            uniprot: 6293,
            ensembl: "reg",
            mine: "worm",
        },
        "Drosophila melanogaster": {
            spec: "Drosophila_melanogaster",
            jaspar: 7227,
            uniprot: 7227,
            ensembl: "reg",
            mine: "fly",
        },
        "Homo sapiens": {
            spec: "Homo_sapiens",
            jaspar: 9606,
            uniprot: 9606,
            ensembl: "reg",
            mine: "fly",
        },
        "Mus musculus": {
            spec: "Mus_musculus",
            jaspar: 10090,
            uniprot: 10090,
            ensembl: "reg",
            mine: "mouse",
        },
        "Saccharomyces cerevisiae": {
            spec: "Saccharomyces_cerevisiae",
            jaspar: 4932,
            uniprot: 559292,
            ensembl: "reg",
            mine: "yeast",
        },
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
    graphLayout: FORCE_GRAPH,

    // Viewport Size Parameter
    viewportSize: VIEWPORT_INIT,

    // Demo Dropdown Selection
    demoDropdownValue: null,
};
