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
    LOCK_SLIDERS_MENU_OPTION,
    UNDO_SLIDERS_RESET_CLASS,
    RESET_SLIDERS_CLASS,
    RESET_SLIDERS_MENU_OPTION,
    UNDO_SLIDERS_RESET_MENU,
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
    ENDS_IN_EXPRESSION_REGEXP,
    MAX_NUM_CHARACTERS_DROPDOWN,
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
    $(LOCK_SLIDERS_MENU_OPTION).click(() => {
        grnState.slidersLocked = !grnState.slidersLocked;
        updateApp(grnState);
    });
    $(LOCK_SLIDERS_BUTTON).click(() => {
        grnState.slidersLocked = !grnState.slidersLocked;
        updateApp(grnState);
    });

    $(UNDO_SLIDERS_RESET_CLASS).click(() => {
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

    $(UNDO_SLIDERS_RESET_MENU).click(() => {
        grnState.resetTriggered = true;
        grnState.undoResetTriggered = false;
        updateApp(grnState);
    });

// Grid buttons
    $(GRID_LAYOUT_BUTTON).click(() => {
        if (grnState.graphLayout === "FORCE_GRAPH") {
            grnState.graphLayout = "GRID_LAYOUT";
            grnState.slidersLocked === true;
        } else if (grnState.graphLayout === "GRID_LAYOUT") {
            grnState.graphLayout = "FORCE_GRAPH";
            grnState.slidersLocked === false;
        }
        updateApp(grnState);
    });

    $(FORCE_GRAPH_CLASS).click(() => {
        grnState.graphLayout = "FORCE_GRAPH";
        updateApp(grnState);

    });

    $(GRID_LAYOUT_CLASS).click(() => {
        grnState.graphLayout = "GRID_LAYOUT";
        updateApp(grnState);
    });

// Node Coloring
    $(NODE_COLORING_TOGGLE_CLASS).click(() => {
        grnState.nodeColoring.nodeColoringEnabled = !grnState.nodeColoring.nodeColoringEnabled;
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

    $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).change(() => {
        grnState.nodeColoring.averageBottomDataset = !grnState.nodeColoring.averageBottomDataset;
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_BOTTOM_MENU).click(() => {
        grnState.nodeColoring.averageBottomDataset = !grnState.nodeColoring.averageBottomDataset;
        updateApp(grnState);
    });

    $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON).click(() => {
        var value = $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT).val();
        grnState.nodeColoring.logFoldChangeMaxValue = value;
        updateApp(grnState);
    });

    $(LOG_FOLD_CHANGE_MAX_VALUE_MENU).change(() => {
        var value = $(LOG_FOLD_CHANGE_MAX_VALUE_MENU).val();
        grnState.nodeColoring.logFoldChangeMaxValue = value;
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

    const shortenExpressionSheetName = (name) => {
        return (name.length > MAX_NUM_CHARACTERS_DROPDOWN) ?
          (name.slice(0, MAX_NUM_CHARACTERS_DROPDOWN) + "...") : name;
    };

    const hasExpressionData = (sheets) => {
        for (var property in sheets) {
            if (property.match(ENDS_IN_EXPRESSION_REGEXP)) {
                return true;
            }
        }
        return false;
    };

        // renderNodeColoring: function () { }, // defined in graph.js

    const resetDatasetDropdownMenus = (network) => {

        var createHTMLforDataset = function (name) {
            return `
                <li class=\"dataset-option node-coloring-menu\" value=\"${name}\">
                  <a>
                    <span class=\"glyphicon\"></span>
                    &nbsp;${name}
                  </a>
                </li>`;
        };

        var nodeColoringOptions = [];
        for (var property in network.expression) {
            if (property.match(ENDS_IN_EXPRESSION_REGEXP)) {
                nodeColoringOptions.push({value: property});
            }
        }

        $(BOTTOM_DATASET_SELECTION_SIDEBAR).empty();
        $(TOP_DATASET_SELECTION_SIDEBAR).empty();

        $(".dataset-option").remove(); // clear all menu dataset options

        $(BOTTOM_DATASET_SELECTION_SIDEBAR).append($("<option>")
                .attr("value", "Same as Top Dataset").text("Same as Top Dataset"));

        $(BOTTOM_DATASET_SELECTION_MENU).append(createHTMLforDataset("Same as Top Dataset"));

        nodeColoringOptions.forEach(function (option) {
            var shortenedSheetName = shortenExpressionSheetName(option.value);
            $(TOP_DATASET_SELECTION_SIDEBAR).append($("<option>")
                  .attr("value", option.value).text(shortenedSheetName));
            $(TOP_DATASET_SELECTION_MENU)
                  .append(createHTMLforDataset(option.value));
            $(BOTTOM_DATASET_SELECTION_SIDEBAR).append($("<option>")
                  .attr("value", option.value).text(shortenedSheetName));
            $(BOTTOM_DATASET_SELECTION_MENU)
                  .append(createHTMLforDataset(option.value));
        });

        $("#topDatasetDropdownMenu li a span").first().addClass("glyphicon-ok");
        $("#bottomDatasetDropdownMenu li a span").first().addClass("glyphicon-ok");
    };

    const isNewWorkbook = (name) => {
        return grnState.nodeColoring.lastDataset === null || grnState.nodeColoring.lastDataset !== name;
    };

    if (grnState.newNetwork) {
        if (hasExpressionData(grnState.network.expression)) {
            if (isNewWorkbook(name)) {
                grnState.nodeColoring.showMenu = true;
                grnState.nodeColoring.nodeColoringEnabled = true;
                grnState.nodeColoring.lastDataset = name;
                resetDatasetDropdownMenus(grnState.network);
                updateApp(grnState);
            }
        } else {
            updateApp(grnState);
        }
    }
};
