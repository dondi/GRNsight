import { drawGraph } from "./graph";
import { uploadState } from "./upload";
import { displayWarnings } from "./warnings";
import { max } from "d3-array";

import {
  GREY_EDGES_DASHED_MENU,
  GREY_EDGES_DASHED_SIDEBAR,
  MIN_EDGE_WEIGHT_NORMALIZATION,
  MAX_EDGE_WEIGHT_NORMALIZATION
} from "./constants";

// In this transitory state, updateApp might get called before things are completely set up, so for now
// we define this wrapper function that guards against uninitialized values.
const refreshApp = () => {
    if (uploadState && uploadState.currentNetwork && uploadState.sliders && uploadState.nodeColoring) {
        drawGraph(uploadState.currentNetwork, uploadState.sliders, uploadState.nodeColoring);
    }
};

const displayNetwork = (network, name) => {
    uploadState.nodeColoring.reload(network, name);
    if (document.getElementById("zoomSlider").disabled) {
        document.getElementById("zoomSlider").disabled = false;
    }

    uploadState.currentNetwork = network;
    console.log("Network: ", network); // Display the network in the console
    $("#graph-metadata").html(network.genes.length + " nodes<br>" + network.links.length + " edges");

    if (network.warnings.length > 0) {
        displayWarnings(network.warnings);
    }

    $("#fileName").text(name); // Set the name of the file to display in the top bar
    $("input[type='range']").off("input"); // I have no idea why I do this. Investigate later.

    // If more things need to be turned off, we'll add them to this array
    [ "#resetSliders", "#resetSlidersMenu", "#undoReset", "#undoResetMenu" ].forEach(
        selector => $(selector).off("click")
    );
};

const valueValidator = (min, max, value) => {
    return Math.min(max, Math.max(min, value));
};

const edgeWeightNormalizationInputValidation = (value) => {
    return value ===
    "" ? "" : valueValidator(MIN_EDGE_WEIGHT_NORMALIZATION, MAX_EDGE_WEIGHT_NORMALIZATION, value);
};

const synchronizeNormalizationValues = (value) => {
    var validated = edgeWeightNormalizationInputValidation(value);
    $("#normalization-max").val(validated);
    $("#edge-weight-normalization-factor-menu").val(validated);
};

export const updateApp = grnState => {

    if (grnState.newNetwork) {
        grnState.normalizationMax = max(grnState.network.positiveWeights.concat(grnState.network.negativeWeights));
        displayNetwork(grnState.network, grnState.name);
        refreshApp();

        // Rare exception to the MVC cycle: right now we have no way of knowing whether the network has changed
        // (which is what necessitates displayNetwork), so we mark the model here.
        grnState.newNetwork = false;
    }

    synchronizeNormalizationValues(grnState.normalizationMax);

// Dashed Line Synchronization
    if (grnState.dashedLine) {
        $(GREY_EDGES_DASHED_MENU + " span").addClass("glyphicon-ok");
        $(GREY_EDGES_DASHED_MENU).prop("checked", "checked");
        $(GREY_EDGES_DASHED_SIDEBAR).prop("checked", "checked");
        refreshApp();
    } else if (!grnState.dashedLine) {
        $(GREY_EDGES_DASHED_MENU + " span").removeClass("glyphicon-ok");
        $(GREY_EDGES_DASHED_MENU).removeProp("checked");
        $(GREY_EDGES_DASHED_SIDEBAR).removeProp("checked");
        refreshApp();
    }

    refreshApp();
};
