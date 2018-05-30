import { drawGraph } from "./graph";
import { uploadState } from "./upload";
import { displayWarnings } from "./warnings";
import { max } from "d3-array";

import {
  GREY_EDGES_DASHED_MENU,
  GREY_EDGES_DASHED_SIDEBAR,
  MIN_EDGE_WEIGHT_NORMALIZATION,
  MAX_EDGE_WEIGHT_NORMALIZATION,
  GREY_EDGE_THRESHOLD_MENU,
  GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR,
  GREY_EDGE_THRESHOLD_TEXT_SIDEBAR,
  WEIGHTS_SHOW_MOUSE_OVER_MENU,
  WEIGHTS_SHOW_ALWAYS_MENU,
  WEIGHTS_HIDE_MENU,
  WEIGHTS_SHOW_MOUSE_OVER_SIDE,
  WEIGHTS_SHOW_ALWAYS_SIDE,
  WEIGHTS_HIDE_SIDE,
  WEIGHTS_SHOW_MOUSE_OVER_CLASS,
  WEIGHTS_SHOW_ALWAYS_CLASS,
  WEIGHTS_HIDE_CLASS,
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

const edgeWeightNormalizationInputValidation = value => {
    return value ===
    "" ? "" : valueValidator(MIN_EDGE_WEIGHT_NORMALIZATION, MAX_EDGE_WEIGHT_NORMALIZATION, value);
};

const synchronizeNormalizationValues = value => {
    var validated = edgeWeightNormalizationInputValidation(value);
    $("#normalization-max").val(validated);
    $("#edge-weight-normalization-factor-menu").val(validated);
};

const grayEdgeInputValidator = value => {
    return valueValidator(0, 100, value);
};

const synchronizeGrayEdgeValues = value => {
    var validatedInput = grayEdgeInputValidator(value);
    $(GREY_EDGE_THRESHOLD_TEXT_SIDEBAR).text(validatedInput + "%");
    $(GREY_EDGE_THRESHOLD_MENU).val(validatedInput);
    $(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).val(validatedInput / 100);
};

const synchronizeShowWeightsMouseover = () => {
    $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").addClass("glyphicon-ok");
    $(WEIGHTS_SHOW_ALWAYS_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_HIDE_MENU + " span").removeClass("glyphicon-ok");

    $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).prop("checked", "checked");
    $(WEIGHTS_SHOW_ALWAYS_SIDE).removeProp("checked");
    $(WEIGHTS_HIDE_SIDE).removeProp("checked");

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).addClass("selected");
    $(WEIGHTS_SHOW_ALWAYS_CLASS).removeClass("selected");
    $(WEIGHTS_HIDE_CLASS).removeClass("selected");
};

const synchronizeShowAllWeights = () => {
    $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_SHOW_ALWAYS_MENU + " span").addClass("glyphicon-ok");
    $(WEIGHTS_HIDE_MENU + " span").removeClass("glyphicon-ok");

    $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).removeProp("checked");
    $(WEIGHTS_SHOW_ALWAYS_SIDE).prop("checked", "checked");
    $(WEIGHTS_HIDE_SIDE).removeProp("checked");

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).removeClass("selected");
    $(WEIGHTS_SHOW_ALWAYS_CLASS).addClass("selected");
    $(WEIGHTS_HIDE_CLASS).removeClass("selected");
};

const synchronizeHideAllWeights = () => {
    $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_SHOW_ALWAYS_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_HIDE_MENU + " span").addClass("glyphicon-ok");

    $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).removeProp("checked");
    $(WEIGHTS_SHOW_ALWAYS_SIDE).removeProp("checked");
    $(WEIGHTS_HIDE_SIDE).prop("checked", "checked");

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).removeClass("selected");
    $(WEIGHTS_SHOW_ALWAYS_CLASS).removeClass("selected");
    $(WEIGHTS_HIDE_CLASS).addClass("selected");
};

const lockForce = function (disable) {
    $("#linkDistInput").prop("disabled", disable);
    $("#chargeInput").prop("disabled", disable);
    $("#resetSlidersButton").prop("disabled", disable);
    $("#lockSlidersButton").prop("checked", disable);
};

const toggleToForceGraphLayout = () => {
        $("#forceGraph").prop("checked", true);
        $("#gridLayout").prop("checked", false);
        $("#gridLayout" + " span").removeClass("glyphicon-ok");
        $("#forceGraph" + " span").addClass("glyphicon-ok");
        lockForce(false);
        $("#lockSlidersMenu").parent().removeClass("disabled");
        $("#resetSlidersMenu").parent().removeClass("disabled");
        $("#link-distance").parent().removeClass("disabled");
        $("#charge").parent().removeClass("disabled");
        if (!$(on).hasClass("called")) {
            $("#gridLayoutButton").trigger("click");
        }
    }
};

const toggleToGridLayout = () => {
        $("#gridLayout").prop("checked", true);
        $("#forceGraph").prop("checked", false);
        $("#forceGraph" + " span").removeClass("glyphicon-ok");
        $("#gridLayout" + " span").addClass("glyphicon-ok");
        lockForce(true);
        $("#lockSlidersMenu").parent().addClass("disabled");
        $("#resetSlidersMenu").parent().addClass("disabled");
        $("#link-distance").parent().addClass("disabled");
        $("#charge").parent().addClass("disabled");
        if (!$(on).hasClass("called")) {
            $("#gridLayoutButton").trigger("click");
        }
    }
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
    synchronizeGrayEdgeValues(grnState.grayEdgeThreshold);

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

// Weights functions
    if (grnState.edgeWeightDisplayOption === "showWeightsMouseover") {
        synchronizeShowWeightsMouseover();
    } else if (grnState.edgeWeightDisplayOption === "showAllWeights") {
        synchronizeShowAllWeights();
    } else if (grnState.edgeWeightDisplayOption === "hideAllWeights") {
        synchronizeHideAllWeights();
    }

    if (grnState.layout === "forceGraph") {
        toggleToForceGraphLayout();
    } else if (grnState.layout === "gridLayout") {
        toggleToGridLayout();
    }

    refreshApp();
};
