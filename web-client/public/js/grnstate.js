import { max } from "d3-array";
import {
  SHOW_WEIGHTS_MOUSEOVER,
} from "./constants";
import { updateSliderDisplayedValue } from "./update-app";
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

export const sliderObject = function (sliderId, valueId, defaultVal, needsAppendedZeros) {
    this.sliderId = sliderId;
    this.valueId = valueId;
    this.defaultVal = defaultVal;
    this.currentVal = defaultVal;
    this.backup = defaultVal;
    this.needsAppendedZeros = needsAppendedZeros;

    this.activate = function () {
        $(this.sliderId).on("input", {slider: this}, function (event) {
            updateSliderDisplayedValue(event.data.slider, this);
        });
    };

    this.setCurrentVal = function (newVal) {
        this.currentVal = newVal;
    };
};

export const grnState = {
    name: null,

    newNetwork: false,

    normalizationMax: null,
    resetNormalizationMax: null,

    get network () {
        return currentNetwork;
    },

    set network (network) {
        currentNetwork = network;
        // TODO: add colorOptimal so that the rest of the normalization code can get added
        this.resetNormalizationMax = max(network.positiveWeights.concat(network.negativeWeights));
        this.newNetwork = true;
    },

    edgeWeightDisplayOption: SHOW_WEIGHTS_MOUSEOVER,
    colorOptimal: true,
    grayEdgeThreshold: 5,
    dashedLine: false,

    annotateLinks: () => annotateLinks(currentNetwork),
    slidersLocked: false,
/*
    linkDistanceSlider: {
        sliderId: LINK_DIST_SLIDER_ID,
        valueId: LINK_DIST_VALUE,
        defaultVal: LINK_DIST_DEFAULT
        currentVal: LINK_DIST_DEFAULT;
        backup: LINK_DIST_DEFAULT;
        needsAppendedZeros: false;
    },
    chargeSlider: {
        sliderId: CHARGE_SLIDER_ID,
        valueId: CHARGE_VALUE,
        defaultVal: CHARGE_DEFAULT
        currentVal: CHARGE_DEFAULT;
        backup: CHARGE_DEFAULT;
        needsAppendedZeros: false;
    },
*/
};
