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
    LOCK_SLIDERS_CLASS,
    UNDO_SLIDER_RESET_CLASS,
    RESET_SLIDERS_CLASS,
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
    $(LOCK_SLIDERS_CLASS).click(() => {
        grnState.slidersLocked = !grnState.slidersLocked;
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
};
