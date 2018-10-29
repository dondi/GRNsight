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
  SHOW_WEIGHTS_MOUSEOVER,
  SHOW_ALL_WEIGHTS,
  HIDE_ALL_WEIGHTS,
  COLOR_EDGES,
  BLACK_EDGES,
  ACTIVE_COLOR_OPTION,
  GRAVITY_LENGTH_WITHOUT_ZERO,
  LOCK_SLIDERS_MENU_OPTION,
  LOCK_SLIDERS_BUTTON,
  RESET_SLIDERS_BUTTON,
  RESET_SLIDERS_MENU_OPTION,
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

const enableColorOptimal = function () {
    $(BLACK_EDGES).removeClass(ACTIVE_COLOR_OPTION);
    $(BLACK_EDGES + ">span").removeClass("glyphicon-ok invisible");
    $(COLOR_EDGES).addClass(ACTIVE_COLOR_OPTION);
    $(COLOR_EDGES + ">span").addClass("glyphicon-ok");
};

const disableColorOptimal = function () {
    $(COLOR_EDGES).removeClass(ACTIVE_COLOR_OPTION);
    $(COLOR_EDGES + ">span").removeClass("glyphicon-ok invisible");
    $(BLACK_EDGES).addClass(ACTIVE_COLOR_OPTION);
    $(BLACK_EDGES + ">span").addClass("glyphicon-ok");
};

export const updateSliderDisplayedValue = function (slider, element) {
    var value = $("#" + $(element).attr("id")).val();
    $(slider.valueId).html(value + ((slider.needsAppendedZeros &&
        (value.length === GRAVITY_LENGTH_WITHOUT_ZERO)) ? "0" : ""));
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
    } else {
        $(GREY_EDGES_DASHED_MENU + " span").removeClass("glyphicon-ok");
        $(GREY_EDGES_DASHED_MENU).removeProp("checked");
        $(GREY_EDGES_DASHED_SIDEBAR).removeProp("checked");
        refreshApp();
    }

// Weights functions
    if (grnState.edgeWeightDisplayOption === SHOW_WEIGHTS_MOUSEOVER) {
        synchronizeShowWeightsMouseover();
    } else if (grnState.edgeWeightDisplayOption === SHOW_ALL_WEIGHTS) {
        synchronizeShowAllWeights();
    } else if (grnState.edgeWeightDisplayOption === HIDE_ALL_WEIGHTS) {
        synchronizeHideAllWeights();
    }

// Enable/Disable Colored edges
    if (grnState.colorOptimal) {
        enableColorOptimal();
    } else {
        disableColorOptimal();
    }

// Sliders
    if (grnState.slidersLocked) {
        $(LOCK_SLIDERS_MENU_OPTION + " span").removeClass("invisible");
        $(LOCK_SLIDERS_MENU_OPTION + " span").addClass("glyphicon-ok");
        $(LOCK_SLIDERS_BUTTON).prop("checked", true);
        $(RESET_SLIDERS_BUTTON).prop("disabled", true);
        $(RESET_SLIDERS_MENU_OPTION).parent().addClass("disabled");
        $("#link-distance").parent().addClass("disabled");
        $("#charge").parent().addClass("disabled");
    } else {
        $(LOCK_SLIDERS_MENU_OPTION + " span").removeClass("glyphicon-ok");
        $(LOCK_SLIDERS_MENU_OPTION + " span").addClass("invisible");
        $(LOCK_SLIDERS_BUTTON).prop("checked", false);
        $(RESET_SLIDERS_BUTTON).prop("disabled", false);
        $(RESET_SLIDERS_MENU_OPTION).parent().removeClass("disabled");
        $("#link-distance").parent().removeClass("disabled");
        $("#charge").parent().removeClass("disabled");
    }

    if (grnState.resetTrigger == false){
        //ADD THE resetValues() CODE TO UPDATE-APP
        this.resetValues();
        $(UNDO_SLIDER_RESET_BUTTON).prop("disabled", false);
        $(UNDO_SLIDER_RESET_MENU).parent().removeClass("disabled");
    });
    $(UNDO_SLIDER_RESET_CLASS).on("click", {handler: this}, function (event) {
        grnState.resetTrigger = true;
        grnState.undoResetTrigger = false;
        event.data.handler.undoReset();
        $(UNDO_SLIDER_RESET_BUTTON).prop("disabled", true);
        $(UNDO_SLIDER_RESET_MENU).parent().addClass("disabled");
    });

    refreshApp();
};
