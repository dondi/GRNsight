import { updateApp } from "./update-app";

import {
    FORCE_GRAPH,
    GRID_LAYOUT,
    SET_NORMALIZATION_SIDEBAR,
    SET_NORMALIZATION_SIDEBAR_VALUE,
    SET_NORMALIZATION_MENU,
    RESET_NORMALIZATION_SIDEBAR,
    RESET_NORMALIZATION_MENU,
    GREY_EDGES_DASHED_MENU,
    GREY_EDGES_DASHED_SIDEBAR,
    GREY_EDGE_THRESHOLD_MENU,
    GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR,
    WEIGHTS_SHOW_MOUSE_OVER_CLASS,
    WEIGHTS_SHOW_ALWAYS_CLASS,
    WEIGHTS_HIDE_CLASS,
    SHOW_WEIGHTS_MOUSEOVER,
    SHOW_ALL_WEIGHTS,
    HIDE_ALL_WEIGHTS,
    COLOR_EDGES,
    BLACK_EDGES,
    LINK_DIST_SLIDER_SIDEBAR,
    LINK_DIST_MENU,
    CHARGE_SLIDER_SIDEBAR,
    CHARGE_MENU,
    CHARGE_DEFAULT_VALUE,
    LINK_DIST_DEFAULT_VALUE,
    LOCK_SLIDERS_CLASS,
    RESET_SLIDERS_CLASS,
    UNDO_SLIDERS_RESET_CLASS,
    GRID_LAYOUT_BUTTON,
    GRID_LAYOUT_CLASS,
    FORCE_GRAPH_CLASS,
    NODE_COLORING_TOGGLE_CLASS,
    AVG_REPLICATE_VALS_TOP_MENU,
    AVG_REPLICATE_VALS_TOP_SIDEBAR,
    AVG_REPLICATE_VALS_BOTTOM_MENU,
    AVG_REPLICATE_VALS_BOTTOM_SIDEBAR,
    LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON,
    LOG_FOLD_CHANGE_MAX_VALUE_MENU,
    LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT,
    TOP_DATASET_SELECTION_SIDEBAR,
    BOTTOM_DATASET_SELECTION_SIDEBAR,
    TOP_DATASET_SELECTION_MENU,
    BOTTOM_DATASET_SELECTION_MENU,
} from "./constants";

import { setupLoadAndImportHandlers } from "./setup-load-and-import-handlers";

export const setupHandlers = grnState => {
    setupLoadAndImportHandlers(grnState);

    var valueValidator = (min, max, value) => {
        return Math.min(max, Math.max(min, value));
    };

    // Grid buttons
    const setGraphLayout = layout => {
        grnState.graphLayout = layout;
        updateApp(grnState);
    };

    $(GRID_LAYOUT_BUTTON).click(() => setGraphLayout(grnState.graphLayout === FORCE_GRAPH ? GRID_LAYOUT : FORCE_GRAPH));
    $(FORCE_GRAPH_CLASS).click(() => setGraphLayout(FORCE_GRAPH));
    $(GRID_LAYOUT_CLASS).click(() => setGraphLayout(GRID_LAYOUT));

// Node Coloring
    $(NODE_COLORING_TOGGLE_CLASS).click(() => {
        grnState.nodeColoring.nodeColoringEnabled = !grnState.nodeColoring.nodeColoringEnabled;
        updateApp(grnState);
    });

    $(TOP_DATASET_SELECTION_SIDEBAR).change(() => {
        var selection = $(TOP_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
        grnState.nodeColoring.topDataset = selection;
        if (grnState.nodeColoring.bottomDataSameAsTop) {
            grnState.nodeColoring.bottomDataset = selection;
        }
        updateApp(grnState);
    });

    $(TOP_DATASET_SELECTION_MENU).click(() => {
        var selection = $(this).attr("value");
        grnState.nodeColoring.topDataset = selection;
        if (grnState.nodeColoring.bottomDataSameAsTop) {
            grnState.nodeColoring.bottomDataset = selection;
        }
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_TOP_SIDEBAR).change(() => {
        grnState.nodeColoring.averageTopDataset = !grnState.nodeColoring.averageTopDataset;
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_TOP_MENU).click(() => {
        grnState.nodeColoring.averageTopDataset = !grnState.nodeColoring.averageTopDataset;
        updateApp(grnState);
    });

    $(BOTTOM_DATASET_SELECTION_SIDEBAR).change(() => {
        var selection = $(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
        grnState.nodeColoring.bottomDataset = selection;
        if (grnState.nodeColoring.bottomDataset === "Same as Top Dataset") {
            grnState.nodeColoring.bottomDataset = grnState.nodeColoring.topDataset;
            grnState.nodeColoring.bottomDataSameAsTop = true;
        } else {
            grnState.nodeColoring.bottomDataSameAsTop = false;
        }
        updateApp(grnState);
    });

    $(BOTTOM_DATASET_SELECTION_MENU).click(() => {
        var selection = $(this).attr("value");
        grnState.nodeColoring.bottomDataset = selection;
        if (selection === "Same as Top Dataset") {
            grnState.nodeColoring.bottomDataset = grnState.nodeColoring.topDataset;
            grnState.nodeColoring.bottomDataSameAsTop = true;
        } else {
            grnState.nodeColoring.bottomDataSameAsTop = false;
            grnState.nodeColoring.bottomDataset = selection;
        }
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).change(() => {
        grnState.nodeColoring.averageBottomDataset = !grnState.nodeColoring.averageBottomDataset;
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_BOTTOM_MENU).click(() => {
        grnState.nodeColoring.averageBottomDataset = !grnState.nodeColoring.averageBottomDataset;
        updateApp(grnState);
    });

    var logFoldChangeMaxValueValidator = value => {
        return valueValidator(0.01, 100, value);
    };

    $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON).click(() => {
        var value = logFoldChangeMaxValueValidator($(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT).val());
        grnState.nodeColoring.logFoldChangeMaxValue = value;
        updateApp(grnState);
    });

    $(LOG_FOLD_CHANGE_MAX_VALUE_MENU).change(() => {
        var value = logFoldChangeMaxValueValidator($(LOG_FOLD_CHANGE_MAX_VALUE_MENU).val());
        grnState.nodeColoring.logFoldChangeMaxValue = value;
        updateApp(grnState);
    });

// Sliders Code

    var linkDistValidator = value => {
        return valueValidator(1, 1000, value);
    };

    var chargeValidator = value => {
        return valueValidator(-2000, 0, value);
    };

    $(LINK_DIST_SLIDER_SIDEBAR).change(() => {
        var value = linkDistValidator($(LINK_DIST_SLIDER_SIDEBAR).val());
        grnState.linkDistanceSlider.currentVal = value;
        updateApp(grnState);
    });

    $(LINK_DIST_MENU).change(() => {
        var value = linkDistValidator($(LINK_DIST_MENU).val());
        grnState.linkDistanceSlider.currentVal = value;
        updateApp(grnState);
    });

    $(CHARGE_SLIDER_SIDEBAR).change(() => {
        var value = chargeValidator($(CHARGE_SLIDER_SIDEBAR).val());
        grnState.chargeSlider.currentVal = value;
        updateApp(grnState);
    });

    $(CHARGE_MENU).change(() => {
        var value = chargeValidator($(CHARGE_MENU).val());
        grnState.chargeSlider.currentVal = value;
        updateApp(grnState);
    });

    // Sliders code
    $(LOCK_SLIDERS_CLASS).click(() => {
        grnState.slidersLocked = !grnState.slidersLocked;
        updateApp(grnState);
    });

    $(RESET_SLIDERS_CLASS).click(() => {
        grnState.chargeSlider.backup = grnState.chargeSlider.currentVal;
        grnState.linkDistanceSlider.backup = grnState.linkDistanceSlider.currentVal;
        grnState.chargeSlider.currentVal = CHARGE_DEFAULT_VALUE;
        grnState.linkDistanceSlider.currentVal = LINK_DIST_DEFAULT_VALUE;
        grnState.showUndoReset = true;
        updateApp(grnState);
    });

    $(UNDO_SLIDERS_RESET_CLASS).click(() => {
        grnState.chargeSlider.currentVal = grnState.chargeSlider.backup;
        grnState.linkDistanceSlider.currentVal = grnState.linkDistanceSlider.backup;
        grnState.showUndoReset = false;
        updateApp(grnState);
    });

// Weights Visualization Handlers
    $(WEIGHTS_SHOW_ALWAYS_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = SHOW_ALL_WEIGHTS;
        updateApp(grnState);
    });

    $(WEIGHTS_HIDE_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = HIDE_ALL_WEIGHTS;
        updateApp(grnState);
    });

    // Normalization Options
    $(SET_NORMALIZATION_SIDEBAR).click(() => {
        grnState.normalizationMax = $(SET_NORMALIZATION_SIDEBAR_VALUE).val();
        updateApp(grnState);
    });

    $(SET_NORMALIZATION_MENU).change(() => {
        grnState.normalizationMax = $(SET_NORMALIZATION_MENU).val();
        updateApp(grnState);
    });

    $(RESET_NORMALIZATION_SIDEBAR).click(() => {
        grnState.normalizationMax = grnState.resetNormalizationMax;
        updateApp(grnState);
    });

    $(RESET_NORMALIZATION_MENU).click(() => {
        grnState.normalizationMax = grnState.resetNormalizationMax;
        updateApp(grnState);
    });

// Grey Edges Handlers
    $(GREY_EDGES_DASHED_SIDEBAR).change(() => {
        grnState.dashedLine = $(GREY_EDGES_DASHED_SIDEBAR).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGES_DASHED_MENU).click(() => {
        grnState.dashedLine = !$(GREY_EDGES_DASHED_MENU).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGE_THRESHOLD_MENU).change(() => {
        grnState.grayEdgeThreshold = Math.round($(GREY_EDGE_THRESHOLD_MENU).val());
        updateApp(grnState);
    });

    $(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).change(() => {
        grnState.grayEdgeThreshold = Math.round($(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).val() * 100);
        updateApp(grnState);
    });

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = SHOW_WEIGHTS_MOUSEOVER;
        updateApp(grnState);
    });

    $(COLOR_EDGES).click(() => {
        grnState.colorOptimal = true;
        updateApp(grnState);
    });

    $(BLACK_EDGES).click(() => {
        grnState.colorOptimal = false;
        updateApp(grnState);
    });

    // Allow text-selection for input elements embedded within menu items.
    //
    // Partial thank you:
    //   https://stackoverflow.com/questions/6848140/how-do-i-prevent-drag-on-a-child-but-allow-drag-on-the-parent
    //
    // We use function syntax so that internal `this` can be used.
    $(".dropdown input.keepopen").parent().css({
        // Because this rule affects _parents_, it can’t be applied via static CSS.
        userSelect: "none"
    }).attr({
        draggable: false
    });

    // Prevent Bootstrap dropdown from closing on clicks in menu input boxes
    // https://stackoverflow.com/a/27759926
    $(".dropdown").on({
        "click": function (event) {
            if ($(event.target).hasClass("keepopen")) {
                $(this).data("closable", $(event.target).closest(".dropdown-toggle").length !== 0);
            }
        },

        "mouseup": function (event) {
            if ($(event.target).find(".keepopen").length > 0) {
                $(this).data("closable", $(event.target).closest(".dropdown-toggle").length !== 0);
            }
        },

        "hide.bs.dropdown": function () {
            var hide = $(this).data("closable");
            $(this).data("closable", true);
            return hide;
        }
    });
};
