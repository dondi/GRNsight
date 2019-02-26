import { updateApp } from "./update-app";

import {
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
    LOCK_SLIDERS_BUTTON,
    UNDO_SLIDER_RESET_CLASS,
    RESET_SLIDERS_CLASS,
    RESET_SLIDERS_MENU_OPTION,
    UNDO_SLIDER_RESET_MENU,
    GRID_LAYOUT_BUTTON,
    AVG_REPLICATE_VALS_TOP_SIDEBAR,
    GRID_LAYOUT_CLASS,
    FORCE_GRAPH_CLASS,
    NODE_COLORING_TOGGLE_CLASS,
    AVG_REPLICATE_VALS_BOTTOM_MENU,
    AVG_REPLICATE_VALS_TOP_MENU,
    AVG_REPLICATE_VALS_BOTTOM_SIDEBAR,
    LOG_FOLD_CHANGE_MAX_VALUE_CLASS,
    LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON,
    TOP_DATASET_SELECTION_SIDEBAR,
    BOTTOM_DATASET_SELECTION_SIDEBAR,
} from "./constants";

import { setupLoadAndImportHandlers } from "./setup-load-and-import-handlers";

export const setupHandlers = grnState => {
    setupLoadAndImportHandlers(grnState);

    $(GREY_EDGES_DASHED_SIDEBAR).change(() => {
        grnState.dashedLine = $(GREY_EDGES_DASHED_SIDEBAR).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGES_DASHED_MENU).click(() => {
        grnState.dashedLine = !$(GREY_EDGES_DASHED_MENU).prop("checked");
        updateApp(grnState);
    });

    $("#normalization-button").click(() => {
        grnState.normalizationMax = $("#normalization-max").val();
        updateApp(grnState);
    });

    $("#reset-normalization-factor-menu, #resetNormalizationButton").click(() => {
        grnState.normalizationMax = grnState.resetNormalizationMax;
        updateApp(grnState);
    });

    $("#edge-weight-normalization-factor-menu").change(() => {
        grnState.normalizationMax = $("#edge-weight-normalization-factor-menu").val();
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


    $(WEIGHTS_SHOW_ALWAYS_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = SHOW_ALL_WEIGHTS;
        updateApp(grnState);
    });

    $(WEIGHTS_HIDE_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = HIDE_ALL_WEIGHTS;
        updateApp(grnState);
    });

    $("#colorEdges").click(() => {
        grnState.colorOptimal = true;
        updateApp(grnState);
    });

    $("#blackEdges").click(() => {
        grnState.colorOptimal = false;
        updateApp(grnState);
    });

// Sliders code
    $(LOCK_SLIDERS_BUTTON).click(() => {
        if (grnState.slidersLocked === true) {
            grnState.slidersLocked = false;
        } else if (grnState.slidersLocked === false) {
            grnState.slidersLocked = true;
        }
        console.log(grnState.slidersLocked);
        updateApp(grnState);
    });

    $(UNDO_SLIDER_RESET_CLASS).click(() => {
        grnState.resetTriggered = true;
        grnState.undoResetTriggered = false;
        updateApp(grnState);
    });

    $(RESET_SLIDERS_CLASS).click(() => {
        grnState.resetTriggered = false;
        grnState.undoResetTriggered = true;
        updateApp(grnState);
    });

    $(RESET_SLIDERS_MENU_OPTION).click(() => {
        grnState.resetTriggered = false;
        grnState.undoResetTriggered = true;
        updateApp(grnState);
    });

    $(UNDO_SLIDER_RESET_MENU).click(() => {
        grnState.resetTriggered = true;
        grnState.undoResetTriggered = false;
        updateApp(grnState);
    });

// Grid buttons
    $(GRID_LAYOUT_BUTTON).click(function () {
        if (grnState.graphLayout === "FORCE_GRAPH") {
            grnState.graphLayout = "GRID_LAYOUT";
        } else if (grnState.graphLayout === "GRID_LAYOUT") {
            grnState.graphLayout = "FORCE_GRAPH";
        }
        updateApp(grnState);
    });

    $(FORCE_GRAPH_CLASS).click(function () {
        grnState.graphLayout = "FORCE_GRAPH";
        updateApp(grnState);

    });

    $(GRID_LAYOUT_CLASS).click(function () {
        grnState.graphLayout = "GRID_LAYOUT";
        updateApp(grnState);
    });

// Node coloring
    $(AVG_REPLICATE_VALS_TOP_SIDEBAR).change(function () {
        grnState.nodeColoring.avgTopDataset = $(this).prop("checked");
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_TOP_SIDEBAR).change(function () {
        grnState.nodeColoring.avgTopDataset = $(this).prop("checked");
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_TOP_MENU).click(function () {
        grnState.nodeColoring.avgTopDataset = !$(this).prop("checked");
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).on("change", {handler: this}, function (event) {
        event.data.handler.updateAverageReplicateValuesBottomDataset($(this).prop("checked"));
    });

    $(AVG_REPLICATE_VALS_BOTTOM_MENU).on("click", {handler: this}, function (event) {
        event.data.handler
          .updateAverageReplicateValuesBottomDataset(!$(AVG_REPLICATE_VALS_BOTTOM_MENU).prop("checked"));
    });

    $(NODE_COLORING_TOGGLE_CLASS).on("click", {handler: this}, function (event) {
        event.data.handler.nodeColoringEnabled ?
            event.data.handler.disableNodeColoring() : event.data.handler.enableNodeColoring();
    });

    $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON).on("click", {handler: this}, function (event) {
        var validated = event.data.handler
            .logFoldChangeMaxValueInputValidation($("#log-fold-change-max-value-menu").val());
        event.data.handler.updateLogFoldChangeMaxValue(validated);
    });

    $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).on("change", {handler: this}, function (event) {
        var validated = event.data.handler.logFoldChangeMaxValueInputValidation($(this).val());
        event.data.handler.updateLogFoldChangeMaxValue(validated);
    });

    $(TOP_DATASET_SELECTION_SIDEBAR).on("change", {handler: this}, function (event) {
        var selection = $(TOP_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
        event.data.handler.updateTopDataset(selection);
    });

    $(BOTTOM_DATASET_SELECTION_SIDEBAR).on("change", {handler: this}, function (event) {
        var selection = $(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
        event.data.handler.updateBottomDataset(selection);
    });

    $("#topDatasetDropdownMenu").on("click", "li", {handler: this}, function (event) {
        event.data.handler.updateTopDataset($(this).attr("value"));
    });

    $("#bottomDatasetDropdownMenu").on("click", "li", {handler: this}, function (event) {
        event.data.handler.updateBottomDataset($(this).attr("value"));
    });
};
