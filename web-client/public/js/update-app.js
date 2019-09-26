import { drawGraph, updaters } from "./graph";
import { uploadState } from "./upload";
import { displayWarnings } from "./warnings";
import { max } from "d3-array";
import { grnState } from "./grnstate";

import {
  FORCE_GRAPH,
  GRID_LAYOUT,
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
  LOCK_SLIDERS_MENU,
  LOCK_SLIDERS_BUTTON,
  RESET_SLIDERS_SIDEBAR,
  RESET_SLIDERS_MENU,
  UNDO_SLIDERS_RESET_SIDEBAR,
  UNDO_SLIDERS_RESET_MENU,
  LINK_DIST_CLASS,
  LINK_DIST_SLIDER_SIDEBAR,
  LINK_DIST_MENU,
  LINK_DIST_VALUE,
  CHARGE_CLASS,
  CHARGE_SLIDER_SIDEBAR,
  CHARGE_MENU,
  CHARGE_VALUE,
  GRID_LAYOUT_CLASS,
  FORCE_GRAPH_CLASS,
  NODE_COLORING_MENU,
  NODE_COLORING_TOGGLE_MENU,
  NODE_COLORING_MENU_CLASS,
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
  MAX_NUM_CHARACTERS_DROPDOWN,
  ENDS_IN_EXPRESSION_REGEXP,
  ZOOM_CONTROL
} from "./constants";

// In this transitory state, updateApp might get called before things are completely set up, so for now
// we define this wrapper function that guards against uninitialized values.
const refreshApp = () => {
    if (uploadState && uploadState.currentNetwork) {
        drawGraph(uploadState.currentNetwork);
    }
};

const displayNetwork = (network, name) => {
    $(ZOOM_CONTROL).prop({ disabled: false });

    uploadState.currentNetwork = network;
    console.log("Network: ", network); // Display the network in the console
    $("#graph-metadata").html(network.genes.length + " nodes<br>" + network.links.length + " edges");

    if (network.warnings.length > 0) {
        displayWarnings(network.warnings);
    }

    $("#fileName").text(name); // Set the name of the file to display in the top bar
    $("input[type='range']").off("input"); // I have no idea why I do this. Investigate later.
};

// Value Validators
export const valueValidator = (min, max, value) => {
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
    $(BLACK_EDGES + ">span").removeClass("glyphicon-ok");
    $(COLOR_EDGES).addClass(ACTIVE_COLOR_OPTION);
    $(COLOR_EDGES + ">span").addClass("glyphicon-ok");
};

const disableColorOptimal = () => {
    $(COLOR_EDGES).removeClass(ACTIVE_COLOR_OPTION);
    $(COLOR_EDGES + ">span").removeClass("glyphicon-ok");
    $(BLACK_EDGES).addClass(ACTIVE_COLOR_OPTION);
    $(BLACK_EDGES + ">span").addClass("glyphicon-ok");
};

// Sliders Functions
const updateSliderState = slidersLocked => {
    const forceGraphDisabled = grnState.graphLayout === GRID_LAYOUT || slidersLocked;
    if (forceGraphDisabled) {
        $(`${LOCK_SLIDERS_MENU} span`).removeClass("invisible").addClass("glyphicon-ok");
        $(RESET_SLIDERS_MENU).parent().addClass("disabled");
        $(UNDO_SLIDERS_RESET_MENU).parent().addClass("disabled");
        $(LINK_DIST_CLASS).parent().addClass("disabled");
        $(CHARGE_CLASS).parent().addClass("disabled");
    } else {
        $(`${LOCK_SLIDERS_MENU} span`).removeClass("glyphicon-ok").addClass("invisible");
        $(RESET_SLIDERS_MENU).parent().removeClass("disabled");
        $(UNDO_SLIDERS_RESET_MENU).parent().removeClass("disabled");
        $(LINK_DIST_CLASS).parent().removeClass("disabled");
        $(CHARGE_CLASS).parent().removeClass("disabled");
    }

    $(LINK_DIST_SLIDER_SIDEBAR).prop("disabled", forceGraphDisabled);
    $(CHARGE_SLIDER_SIDEBAR).prop("disabled", forceGraphDisabled);
    $(RESET_SLIDERS_SIDEBAR).prop("disabled", forceGraphDisabled);
    $(LOCK_SLIDERS_BUTTON).prop("checked", slidersLocked);

    if (!grnState.showUndoReset) {
        $(UNDO_SLIDERS_RESET_SIDEBAR).prop("disabled", true);
    }
};

export const modifyChargeParameter = (value) => {
    grnState.simulation.force("charge").strength(value);
    grnState.simulation.alpha(1);
};

export const modifyLinkDistanceParameter = (value) => {
    grnState.simulation.force("link").distance(value);
    grnState.simulation.alpha(1);
};

const updateChargeSliderValues = () => {
    if (grnState.network !== null) {
        modifyChargeParameter(grnState.chargeSlider.currentVal);
    }
    $(CHARGE_VALUE).text(grnState.chargeSlider.currentVal);
    $(CHARGE_MENU).val(grnState.chargeSlider.currentVal);
    $(CHARGE_SLIDER_SIDEBAR).val(grnState.chargeSlider.currentVal);
    $(CHARGE_SLIDER_SIDEBAR).html(grnState.chargeSlider.currentVal +
        ((grnState.chargeSlider.needsAppendedZeros &&
            grnState.chargeSlider.currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO) ? "0" : ""));
};

const updateLinkDistanceSliderValues = () => {
    if (grnState.network !== null) {
        modifyLinkDistanceParameter(grnState.linkDistanceSlider.currentVal);
    }
    $(LINK_DIST_VALUE).text(grnState.linkDistanceSlider.currentVal);
    $(LINK_DIST_MENU).val(grnState.linkDistanceSlider.currentVal);
    $(LINK_DIST_SLIDER_SIDEBAR).val(grnState.linkDistanceSlider.currentVal);
    $(LINK_DIST_SLIDER_SIDEBAR).html(grnState.linkDistanceSlider.currentVal +
        ((grnState.linkDistanceSlider.needsAppendedZeros &&
            grnState.linkDistanceSlider.currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO) ? "0" : ""));
};

// Grid Layout Functions
const toggleLayout = (on, off) => {
    if (!$(on).prop("checked")) {
        $(on).prop("checked", true);
        $(off).prop("checked", false);
        $(`${off} span`).removeClass("glyphicon-ok");
        $(`${on} span`).addClass("glyphicon-ok");
    }
};

const updatetoForceGraph = () => {
    $(LOCK_SLIDERS_BUTTON).removeAttr("disabled");
    toggleLayout(FORCE_GRAPH_CLASS, GRID_LAYOUT_CLASS);
};

const updatetoGridLayout = () => {
    $(LOCK_SLIDERS_BUTTON).attr("disabled", true);
    toggleLayout(GRID_LAYOUT_CLASS, FORCE_GRAPH_CLASS);
};

// Node Coloring Functions
const showNodeColoringMenus = () => {
    if ($(NODE_COLORING_MENU).hasClass("hidden")) {
        $(NODE_COLORING_MENU).removeClass("hidden");
    }
    if ($(NODE_COLORING_MENU_CLASS).hasClass("disabled")) {
        $(NODE_COLORING_MENU_CLASS).removeClass("disabled");
    }
};

const disableNodeColoringMenus = () => {
    $(NODE_COLORING_MENU).addClass("hidden");
    $(NODE_COLORING_MENU_CLASS).addClass("disabled");
};

const isNewWorkbook = (name) => {
    return grnState.nodeColoring.lastDataset === null || grnState.nodeColoring.lastDataset !== name;
};

const shortenExpressionSheetName = (name) => {
    return (name.length > MAX_NUM_CHARACTERS_DROPDOWN) ?
      (name.slice(0, MAX_NUM_CHARACTERS_DROPDOWN) + "...") : name;
};

const hasExpressionData = (sheets) => {
    for (var property in sheets) {
        if (property.match(ENDS_IN_EXPRESSION_REGEXP)) {
            grnState.nodeColoring.showMenu = true;
            return true;
        }
    }
    grnState.nodeColoring.showMenu = false;
    return false;
};

    // renderNodeColoring: function () { }, // defined in graph.js

const clearDropdownMenus = () => {
    $(TOP_DATASET_SELECTION_SIDEBAR).html("");
    $(BOTTOM_DATASET_SELECTION_SIDEBAR).html("");
};

const resetDatasetDropdownMenus = (network) => {
    clearDropdownMenus();
    $(".dataset-option").remove(); // clear all menu dataset options

    var createHTMLforDataset = function (name) {
        return `
            <li class=\"dataset-option node-coloring-menu\" value=\"${name}\">
              <a>
                <span class=\"glyphicon\"></span>
                &nbsp;${name}
              </a>
            </li>`;
    };

    grnState.nodeColoring.nodeColoringOptions = [];
    for (var property in network.expression) {
        if (property.match(ENDS_IN_EXPRESSION_REGEXP)) {
            grnState.nodeColoring.nodeColoringOptions.push({value: property});
        }
    }

    $(BOTTOM_DATASET_SELECTION_SIDEBAR).append($("<option>")
            .attr("value", "Same as Top Dataset").text("Same as Top Dataset"));

    $(BOTTOM_DATASET_SELECTION_MENU).append(createHTMLforDataset("Same as Top Dataset"));

    grnState.nodeColoring.nodeColoringOptions.forEach(function (option) {
        var shortenedSheetName = shortenExpressionSheetName(option.value);
        $(TOP_DATASET_SELECTION_SIDEBAR).append($("<option>")
              .addClass("dataset-option")
              .attr("value", option.value).text(shortenedSheetName));
        $(TOP_DATASET_SELECTION_MENU)
              .append(createHTMLforDataset(option.value));
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).append($("<option>")
              .addClass("dataset-option")
              .attr("value", option.value).text(shortenedSheetName));
        $(BOTTOM_DATASET_SELECTION_MENU)
              .append(createHTMLforDataset(option.value));
    });

    $("#topDatasetDropdownMenu li a span").first().addClass("glyphicon-ok");
    $("#bottomDatasetDropdownMenu li a span").first().addClass("glyphicon-ok");
};

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
    if (grnState.nodeColoring.bottomDataSameAsTop) {
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).val("Same as Top Dataset");
        removeAllChecksFromMenuDatasetOptions(BOTTOM_DATASET_SELECTION_MENU);
        $(`${BOTTOM_DATASET_SELECTION_MENU} li[value='${"Same as Top Dataset"}'] a span`).addClass("glyphicon-ok");
    } else {
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).val(grnState.nodeColoring.bottomDataset);
        removeAllChecksFromMenuDatasetOptions(BOTTOM_DATASET_SELECTION_MENU);
        /* eslint-disable max-len */
        $(`${BOTTOM_DATASET_SELECTION_MENU} li[value='${grnState.nodeColoring.bottomDataset}'] a span`)
            .addClass("glyphicon-ok");
        /* eslint-enable max-len */
    }
    updaters.renderNodeColoring();
};

export const updateApp = grnState => {

    if (grnState.newNetwork) {
        grnState.normalizationMax = max(grnState.network.positiveWeights.concat(grnState.network.negativeWeights));
        displayNetwork(grnState.network, grnState.name);
        clearDropdownMenus();
        if (hasExpressionData(grnState.network.expression)) {
            resetDatasetDropdownMenus(grnState.network);
            grnState.nodeColoring.nodeColoringEnabled = true;
            if (isNewWorkbook(name)) {
                grnState.nodeColoring.showMenu = true;
                grnState.nodeColoring.lastDataset = name;
                showNodeColoringMenus();
            }
            grnState.nodeColoring.topDataset = $(TOP_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
            if ($(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value") === "Same as Top Dataset") {
                grnState.nodeColoring.bottomDataset = grnState.nodeColoring.topDataset;
                grnState.nodeColoring.bottomDataSameAsTop = true;
            } else {
                grnState.nodeColoring.bottomDataset =
                  $(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
                grnState.nodeColoring.bottomDataSameAsTop = false;
            }
        } else {
            grnState.nodeColoringEnabled = false;
        }
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
    } else {
        $(GREY_EDGES_DASHED_MENU + " span").removeClass("glyphicon-ok");
        $(GREY_EDGES_DASHED_MENU).removeProp("checked");
        $(GREY_EDGES_DASHED_SIDEBAR).removeProp("checked");
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

// Graph Layout
    if (grnState.graphLayout === FORCE_GRAPH) {
        updatetoForceGraph();
    } else if (grnState.graphLayout === GRID_LAYOUT) {
        updatetoGridLayout();
    }

// Node Coloring
    if (grnState.network !== null && grnState.nodeColoring.nodeColoringEnabled
      && hasExpressionData(grnState.network.expression)) {
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
    updateSliderState(grnState.slidersLocked);

    if (grnState.showUndoReset) {
        $(UNDO_SLIDERS_RESET_SIDEBAR).prop("disabled", false);
        $(UNDO_SLIDERS_RESET_MENU).parent().removeClass("disabled");
    } else {
        $(UNDO_SLIDERS_RESET_SIDEBAR).prop("disabled", true);
        $(UNDO_SLIDERS_RESET_MENU).parent().addClass("disabled");
    }

    updateChargeSliderValues();
    updateLinkDistanceSliderValues();

// Refresh graph
    refreshApp();
};
