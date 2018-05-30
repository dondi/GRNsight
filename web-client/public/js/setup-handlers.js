import { updateApp } from "./update-app";

import {
    GREY_EDGES_DASHED_MENU,
    GREY_EDGES_DASHED_SIDEBAR,
    GREY_EDGE_THRESHOLD_MENU,
    GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR,
    WEIGHTS_SHOW_MOUSE_OVER_CLASS,
    WEIGHTS_SHOW_ALWAYS_CLASS,
    WEIGHTS_HIDE_CLASS,
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
        grnState.edgeWeightDisplayOption = "showWeightsMouseover";
        updateApp(grnState);
    });


    $(WEIGHTS_SHOW_ALWAYS_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = "showAllWeights";
        updateApp(grnState);
    });

    $(WEIGHTS_HIDE_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = "hideAllWeights";
        updateApp(grnState);
    });

    $("#gridLayout").click(() => {
        grnState.layout = "gridLayout";
        updateApp(grnState);
    });

    $("#forceGraph").click(() => {
        grnState.layout = "forceGraph";
        updateApp(grnState);
    });

};
