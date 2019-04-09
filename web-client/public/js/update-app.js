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
  RESET_SLIDERS_ID,
  RESET_SLIDERS_BUTTON,
  RESET_SLIDERS_MENU_OPTION,
  UNDO_SLIDERS_RESET_ID,
  UNDO_SLIDERS_RESET_BUTTON,
  UNDO_SLIDERS_RESET_MENU,
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
  NODE_COLORING_MENU,
  NODE_COLORING_TOGGLE_MENU,
  NODE_COLORING_TOGGLE_SIDEBAR,
  AVG_REPLICATE_VALS_TOP_MENU,
  AVG_REPLICATE_VALS_TOP_SIDEBAR,
  AVG_REPLICATE_VALS_BOTTOM_MENU,
  AVG_REPLICATE_VALS_BOTTOM_SIDEBAR,
  LOG_FOLD_CHANGE_MAX_VALUE_MENU,
  LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT,
  MINIMUM_MAX_LOG_FOLD_CHANGE,
  MAXIMUM_MAX_LOG_FOLD_CHANGE,
  DEFAULT_MAX_LOG_FOLD_CHANGE,
  TOP_DATASET_SELECTION_SIDEBAR,
  TOP_DATASET_SELECTION_MENU,
  BOTTOM_DATASET_SELECTION_SIDEBAR,
  BOTTOM_DATASET_SELECTION_MENU,
  LOG_FOLD_CHANGE_MAX_VALUE_CLASS,
} from "./constants";

// In this transitory state, updateApp might get called before things are completely set up, so for now
// we define this wrapper function that guards against uninitialized values.
const refreshApp = () => {
    if (uploadState && uploadState.currentNetwork) {
        drawGraph(uploadState.currentNetwork);
    }
};

const displayNetwork = (network, name) => {
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
    [ RESET_SLIDERS_ID, RESET_SLIDERS_MENU_OPTION, UNDO_SLIDERS_RESET_ID, UNDO_SLIDERS_RESET_MENU ].forEach(
        selector => $(selector).off("click")
    );
};

// Value Validators
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

const logFoldChangeMaxValueInputValidation = value => {
    if (value === "" || value === "0") {
        return DEFAULT_MAX_LOG_FOLD_CHANGE;
    } else if (value < MINIMUM_MAX_LOG_FOLD_CHANGE) {
        return MINIMUM_MAX_LOG_FOLD_CHANGE;
    } else if (value > MAXIMUM_MAX_LOG_FOLD_CHANGE) {
        return MAXIMUM_MAX_LOG_FOLD_CHANGE;
    } else {
        return value;
    }
};

//
const synchronizeGrayEdgeValues = value => {
    var validatedInput = grayEdgeInputValidator(value);
    $(GREY_EDGE_THRESHOLD_TEXT_SIDEBAR).text(validatedInput + "%");
    $(GREY_EDGE_THRESHOLD_MENU).val(validatedInput);
    $(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).val(validatedInput / 100);
};

// Weight Visualization Functions
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

// Toggle Weighted Functions
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

// Sliders Functions
export const modifyChargeParameter = (value) => {
    grnState.simulation.force("charge").strength(value);
    grnState.simulation.alpha(1);
};

export const modifyLinkDistanceParameter = (value) => {
    grnState.simulation.force("link").distance(value);
    grnState.simulation.alpha(1);
};

const lockForce = (disable) => {
    $(LINK_DIST_SLIDER_ID).prop("disabled", disable);
    $(CHARGE_SLIDER_ID).prop("disabled", disable);
    $(RESET_SLIDERS_BUTTON).prop("disabled", disable);
    $(LOCK_SLIDERS_BUTTON).prop("checked", disable);
};

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

// Grid Layout Functions
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

// Node Coloring Functions
const updateLogFoldChangeMaxValue = () => {
    var value = logFoldChangeMaxValueInputValidation(grnState.nodeColoring.logFoldChangeMaxValue);
    $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT).val(value);
    $(LOG_FOLD_CHANGE_MAX_VALUE_MENU).val(value);
    updaters.renderNodeColoring();
};

const removeAllChecksFromMenuDatasetOptions = (id) => {
    $(`${id} li a span`).each(
        function () {
            $(this).removeClass("glyphicon-ok");
        }
    );
};

const updateTopDataset = () => {
    $(TOP_DATASET_SELECTION_SIDEBAR).val(grnState.nodeColoring.topDataset);
    removeAllChecksFromMenuDatasetOptions(TOP_DATASET_SELECTION_MENU);
    $(`${TOP_DATASET_SELECTION_MENU} li[value='${grnState.nodeColoring.topDataset}'] a span`).addClass("glyphicon-ok");
    updaters.renderNodeColoring();
    // TO DO: If bottomDataSameAsTop make bottom selction "Same As Top"
};

const updateBottomDataset = () => {
    $(BOTTOM_DATASET_SELECTION_SIDEBAR).val(grnState.nodeColoring.bottomDataset);
    removeAllChecksFromMenuDatasetOptions(BOTTOM_DATASET_SELECTION_MENU);
    /* eslint-disable max-len */
    $(`${BOTTOM_DATASET_SELECTION_MENU} li[value='${grnState.nodeColoring.bottomDataset}'] a span`).addClass("glyphicon-ok");
    /* eslint-enable max-len */
    updaters.renderNodeColoring();
};

const showNodeColoringMenus = () => {
    if ($(NODE_COLORING_MENU).hasClass("hidden")) {
        $(NODE_COLORING_MENU).removeClass("hidden");
    }
    if ($(".node-coloring-menu").hasClass("disabled")) {
        $(".node-coloring-menu").removeClass("disabled");
    }
};

const disableNodeColoringMenus = () => {
    if ($(NODE_COLORING_MENU).hasClass("hidden")) {
        $(NODE_COLORING_MENU).addClass("hidden");
    }
    if ($(".node-coloring-menu").hasClass("disabled")) {
        $(".node-coloring-menu").addClass("disabled");
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
    if (grnState.slidersLocked === true) {
        $(LOCK_SLIDERS_MENU_OPTION + " span").removeClass("invisible");
        $(LOCK_SLIDERS_MENU_OPTION + " span").addClass("glyphicon-ok");
        $(RESET_SLIDERS_MENU_OPTION).parent().addClass("disabled");
        $(LINK_DIST_CLASS).parent().addClass("disabled");
        $(CHARGE_CLASS).parent().addClass("disabled");
        lockForce(grnState.slidersLocked);
    } else {
        $(LOCK_SLIDERS_MENU_OPTION + " span").removeClass("glyphicon-ok");
        $(LOCK_SLIDERS_MENU_OPTION + " span").addClass("invisible");
        $(RESET_SLIDERS_MENU_OPTION).parent().removeClass("disabled");
        $(LINK_DIST_CLASS).parent().removeClass("disabled");
        $(CHARGE_CLASS).parent().removeClass("disabled");
        lockForce(grnState.slidersLocked);
    }

    if (grnState.resetTriggered === false) {
        resetValues();
        resetForce();
        $(UNDO_SLIDERS_RESET_BUTTON).prop("disabled", false);
        $(UNDO_SLIDERS_RESET_MENU).parent().removeClass("disabled");
        updateChargeSliderValues();
        updateLinkDistanceSliderValues();
    }

    if (!grnState.undoResetTriggered && grnState.simulation !== undefined) {
        undoReset();
        undoResetForce();
        $(UNDO_SLIDERS_RESET_BUTTON).prop("disabled", true);
        $(UNDO_SLIDERS_RESET_MENU).parent().addClass("disabled");
        updateChargeSliderValues();
        updateLinkDistanceSliderValues();
    }

// Graph Layout
    if (grnState.graphLayout === "FORCE_GRAPH") {
        updatetoForceGraph();
    } else if (grnState.graphLayout === "GRID_LAYOUT") {
        updatetoGridLayout();
    }

// Node Colorin

// Initialize Menu Bar

    if (grnState.nodeColoring.nodeColoringEnabled) {
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).prop("checked", true);
        $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).prop("checked", true);
        $(NODE_COLORING_TOGGLE_MENU + " span").removeClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).val("Disable Node Coloring");
        $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).val(DEFAULT_MAX_LOG_FOLD_CHANGE);
        updaters.renderNodeColoring();
    } else {
        $(NODE_COLORING_TOGGLE_MENU + " span").addClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).val("Enable Node Coloring");
        updaters.removeNodeColoring();
    }

    if (grnState.nodeColoring.averageTopDataset) {
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

    if (grnState.nodeColoring.averageBottomDataset) {
        $(AVG_REPLICATE_VALS_BOTTOM_MENU + " span").addClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_BOTTOM_MENU).prop("checked", "checked");
        $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).prop("checked", "checked");
        updaters.renderNodeColoring();
    } else {
        $(AVG_REPLICATE_VALS_BOTTOM_MENU + " span").removeClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_BOTTOM_MENU).removeProp("checked");
        $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).removeProp("checked");
        updaters.renderNodeColoring();
    }

    if (grnState.nodeColoring.showMenu) {
        showNodeColoringMenus();
    } else {
        disableNodeColoringMenus();
    }

    updateLogFoldChangeMaxValue();

    updateTopDataset();
    updateBottomDataset();

    console.log(grnState);
    refreshApp();

};
