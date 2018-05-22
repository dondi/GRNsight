import { drawGraph } from "./graph";
import { uploadState } from "./upload";

import {
  GREY_EDGES_DASHED_MENU,
  GREY_EDGES_DASHED_SIDEBAR,
  MIN_EDGE_WEIGHT_NORMALIZATION,
  MAX_EDGE_WEIGHT_NORMALIZATION
} from "./constants";

// In this transitory state, updateApp might get called before things are completely set up, so for now
// we define this wrapper function that guards against uninitialized values.
const refreshApp = () => {
    if (uploadState && uploadState.currentNetwork && uploadState.sliders && uploadState.nodeColoring) {
        drawGraph(uploadState.currentNetwork, uploadState.sliders, uploadState.nodeColoring);
    }
};

export const updateApp = grnState => {
// Edge Weight Normalization
    let valueValidator = (min, max, value) => {
        return Math.min(max, Math.max(min, value));
    };

    let edgeWeightNormalizationInputValidation = (value) => {
        return value === "" ? "" : valueValidator(MIN_EDGE_WEIGHT_NORMALIZATION, MAX_EDGE_WEIGHT_NORMALIZATION, value);
    };

    var validated = edgeWeightNormalizationInputValidation(value);

    if ($("#normalization-max").val(validated)) {
        refreshApp();
    }
    if ($("#edge-weight-normalization-factor-menu").val(validated)) {
        refreshApp();
    }


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
};
