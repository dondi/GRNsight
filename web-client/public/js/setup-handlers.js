import { updateApp } from "./update-app";

import {
    GREY_EDGES_DASHED_MENU,
    GREY_EDGES_DASHED_SIDEBAR
} from "./constants";

export const setupHandlers = grnState => {
    $(GREY_EDGES_DASHED_SIDEBAR).change(() => {
        grnState.dashedLine = $(GREY_EDGES_DASHED_SIDEBAR).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGES_DASHED_MENU).click(() => {
        grnState.dashedLine = !$(GREY_EDGES_DASHED_MENU).prop("checked");
        updateApp(grnState);
    });

    $("#normalization-button").click(function () {
        grnState.normalizationMax = $("#normalization-max").val();
        updateApp(grnState);
    });

    $("#reset-normalization-factor-menu, #resetNormalizationButton").click(function () {
        grnState.normalizationMax = grnState.resetNormalizationMax;
        updateApp(grnState);
    });

    $("#edge-weight-normalization-factor-menu").on("change", function () {
        grnState.normalizationMax = $("#edge-weight-normalization-factor-menu").val();
        updateApp(grnState);
    });
};
