import { drawGraph, updaters } from "./graph";
import { uploadState } from "./upload";
import { displayWarnings } from "./warnings";
import { max } from "d3-array";
import { grnState } from "./grnstate";

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
  UNDO_SLIDER_RESET_BUTTON,
  UNDO_SLIDER_RESET_MENU,
  LINK_DIST_CLASS,
  LINK_DIST_SLIDER_ID,
  LINK_DIST_MENU,
  LINK_DIST_VALUE,
  LINK_DIST_DEFAULT_VALUE,
  CHARGE_CLASS,
  CHARGE_SLIDER_ID,
  CHARGE_MENU,
  CHARGE_VALUE,
  CHARGE_DEFAULT_VALUE,
  GRID_LAYOUT_BUTTON,
  GRID_LAYOUT_CLASS,
  FORCE_GRAPH_CLASS,
  AVG_REPLICATE_VALS_TOP_MENU,
  AVG_REPLICATE_VALS_TOP_SIDEBAR,
} from "./constants";

// In this transitory state, updateApp might get called before things are completely set up, so for now
// we define this wrapper function that guards against uninitialized values.
const refreshApp = () => {
    if (uploadState && uploadState.currentNetwork && uploadState.nodeColoring) {
        drawGraph(uploadState.currentNetwork, uploadState.nodeColoring);
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
    [ "#resetSliders", RESET_SLIDERS_MENU_OPTION, "#undoReset", UNDO_SLIDER_RESET_MENU ].forEach(
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

const enableColorOptimal = () => {
    $(BLACK_EDGES).removeClass(ACTIVE_COLOR_OPTION);
    $(BLACK_EDGES + ">span").removeClass("glyphicon-ok invisible");
    $(COLOR_EDGES).addClass(ACTIVE_COLOR_OPTION);
    $(COLOR_EDGES + ">span").addClass("glyphicon-ok");
};

const disableColorOptimal = () => {
    $(COLOR_EDGES).removeClass(ACTIVE_COLOR_OPTION);
    $(COLOR_EDGES + ">span").removeClass("glyphicon-ok invisible");
    $(BLACK_EDGES).addClass(ACTIVE_COLOR_OPTION);
    $(BLACK_EDGES + ">span").addClass("glyphicon-ok");
};

export const modifyChargeParameter = (value) => {
    grnState.simulation.force("charge").strength(value);
    grnState.simulation.alpha(1);
};

export const modifyLinkDistanceParameter = (value) => {
    grnState.simulation.force("link").distance(value);
    grnState.simulation.alpha(1);
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
    const lockForce = (disable) => {
        console.log(disable);
        $(LINK_DIST_SLIDER_ID).prop("disabled", disable);
        $(CHARGE_SLIDER_ID).prop("disabled", disable);
        $(RESET_SLIDERS_BUTTON).prop("disabled", disable);
        $(LOCK_SLIDERS_BUTTON).prop("checked", disable);
    };

    if (grnState.slidersLocked === true) {
        $(LOCK_SLIDERS_MENU_OPTION + " span").removeClass("invisible");
        $(LOCK_SLIDERS_MENU_OPTION + " span").addClass("glyphicon-ok");
        $(RESET_SLIDERS_MENU_OPTION).parent().addClass("disabled");
        $(LINK_DIST_CLASS).parent().addClass("disabled");
        $(CHARGE_CLASS).parent().addClass("disabled");
        lockForce(grnState.slidersLocked);
        console.log("Sliders should now be locked");
    } else {
        $(LOCK_SLIDERS_MENU_OPTION + " span").removeClass("glyphicon-ok");
        $(LOCK_SLIDERS_MENU_OPTION + " span").addClass("invisible");
        $(RESET_SLIDERS_MENU_OPTION).parent().removeClass("disabled");
        $(LINK_DIST_CLASS).parent().removeClass("disabled");
        $(CHARGE_CLASS).parent().removeClass("disabled");
        lockForce(grnState.slidersLocked);
        console.log("Sliders should now be unlocked");
    }

    const resetValues = () => {
        grnState.chargeSlider.backup = grnState.chargeSlider.currentVal;
        grnState.linkDistanceSlider.backup = grnState.linkDistanceSlider.currentVal;
        grnState.chargeSlider.currentVal = CHARGE_DEFAULT_VALUE;
        grnState.linkDistanceSlider.currentVal = LINK_DIST_DEFAULT_VALUE;
        $(CHARGE_MENU).val(CHARGE_DEFAULT_VALUE);
        $(LINK_DIST_MENU).val(LINK_DIST_DEFAULT_VALUE);
    };

    const undoReset = () => {
        grnState.chargeSlider.currentVal = grnState.chargeSlider.backup;
        grnState.linkDistanceSlider.currentVal = grnState.linkDistanceSlider.backup ;
        $(CHARGE_MENU).val(grnState.chargeSlider.backup);
        $(LINK_DIST_MENU).val(grnState.linkDistanceSlider.backup );
    };

    const resetForce = () => {
        modifyChargeParameter(CHARGE_DEFAULT_VALUE);
        modifyLinkDistanceParameter(LINK_DIST_DEFAULT_VALUE);
    };

    const undoResetForce = () => {
        modifyChargeParameter(grnState.chargeSlider.backup);
        modifyLinkDistanceParameter(grnState.linkDistanceSlider.backup);
    };

    const updateChargeSliderValues = () => {
        modifyChargeParameter(grnState.chargeSlider.currentVal);
        $(CHARGE_VALUE).text(grnState.chargeSlider.currentVal);
        $(CHARGE_MENU).val(grnState.chargeSlider.currentVal);
        $(CHARGE_SLIDER_ID).val(grnState.chargeSlider.currentVal);
        $(CHARGE_SLIDER_ID).html(grnState.chargeSlider.currentVal +
          ((grnState.chargeSlider.needsAppendedZeros
              && grnState.chargeSlider.currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO) ? "0" : ""));
    };

    const updateLinkDistanceSliderValues = () => {
        modifyLinkDistanceParameter(grnState.linkDistanceSlider.currentVal);
        $(LINK_DIST_VALUE).text(grnState.linkDistanceSlider.currentVal);
        $(LINK_DIST_MENU).val(grnState.linkDistanceSlider.currentVal);
        $(LINK_DIST_SLIDER_ID).val(grnState.linkDistanceSlider.currentVal);
        $(LINK_DIST_SLIDER_ID).html(grnState.linkDistanceSlider.currentVal +
          ((grnState.linkDistanceSlider.needsAppendedZeros
            && grnState.linkDistanceSlider.currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO) ? "0" : ""));
    };

    if (grnState.resetTriggered === false) {
        resetValues();
        resetForce();
        $(UNDO_SLIDER_RESET_BUTTON).prop("disabled", false);
        $(UNDO_SLIDER_RESET_MENU).parent().removeClass("disabled");
        updateChargeSliderValues();
        updateLinkDistanceSliderValues();
    }

    if (!grnState.undoResetTriggered && grnState.simulation !== undefined) {
        undoReset();
        undoResetForce();
        $(UNDO_SLIDER_RESET_BUTTON).prop("disabled", true);
        $(UNDO_SLIDER_RESET_MENU).parent().addClass("disabled");
        updateChargeSliderValues();
        updateLinkDistanceSliderValues();
    }

// Graph Layout

    const toggleLayout = (on, off) => {
        if (!$(on).prop("checked")) {
            $(on).prop("checked", true);
            $(off).prop("checked", false);
            $(off + " span").removeClass("glyphicon-ok");
            $(on + " span").addClass("glyphicon-ok");
        }
    };

    const updatetoForceGraph = () => {
        $(GRID_LAYOUT_BUTTON)[0].value = "Grid Layout";
        toggleLayout(FORCE_GRAPH_CLASS, GRID_LAYOUT_CLASS);
        lockForce(grnState.slidersLocked);
        $(LOCK_SLIDERS_MENU_OPTION).parent().removeClass("disabled");
        $(RESET_SLIDERS_MENU_OPTION).parent().removeClass("disabled");
        $(LINK_DIST_CLASS).parent().removeClass("disabled");
        $(CHARGE_CLASS).parent().removeClass("disabled");
        updaters.setNodesToForceGraph();
    };

    const updatetoGridLayout = () => {
        $(GRID_LAYOUT_BUTTON)[0].value = "Force Graph";
        toggleLayout(GRID_LAYOUT_CLASS, FORCE_GRAPH_CLASS);
        lockForce(grnState.slidersLocked);
        $(LOCK_SLIDERS_MENU_OPTION).parent().addClass("disabled");
        $(RESET_SLIDERS_MENU_OPTION).parent().addClass("disabled");
        $(LINK_DIST_CLASS).parent().addClass("disabled");
        $(CHARGE_CLASS).parent().addClass("disabled");
        updaters.setNodesToGrid();
    };

    if (grnState.graphLayout === "FORCE_GRAPH") {
        updatetoForceGraph();
    } else if (grnState.graphLayout === "GRID_LAYOUT") {
        updatetoGridLayout();
    }

// Node Coloring

    if (grnState.nodeColoring.avgTopDataset) {
        $(AVG_REPLICATE_VALS_TOP_MENU + " span").addClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_TOP_MENU).prop("checked", "checked");
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).prop("checked", "checked");
        updaters.renderNodeColoring();
    } else {
        $(AVG_REPLICATE_VALS_TOP_MENU + " span").removeClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_TOP_MENU).removeProp("checked");
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).removeProp("checked");
        updaters.renderNodeColoring();
    }

    refreshApp();

};
