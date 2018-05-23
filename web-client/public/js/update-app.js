import { drawGraph } from "./graph";
import { uploadState } from "./upload";
import { displayWarnings } from "./warnings";

import {
  GREY_EDGES_DASHED_MENU,
  GREY_EDGES_DASHED_SIDEBAR
} from "./constants";

// In this transitory state, updateApp might get called before things are completely set up, so for now
// we define this wrapper function that guards against uninitialized values.
const refreshApp = () => {
    if (uploadState && uploadState.currentNetwork && uploadState.sliders && uploadState.nodeColoring) {
        drawGraph(uploadState.currentNetwork, uploadState.sliders, uploadState.nodeColoring);
    }
};

var displayNetwork = function (network, name) {
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
    [ "#resetSliders", "#resetSlidersMenu", "#undoReset", "#undoResetMenu" ].forEach(function (selector) {
        $(selector).off("click");
    });
};

export const updateApp = grnState => {
    if (grnState.newNetwork) {
        displayNetwork(grnState.network, grnState.name);
        refreshApp();
    }

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
};
