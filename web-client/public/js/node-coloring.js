import { updaters } from "./graph";

import {
  MINIMUM_MAX_LOG_FOLD_CHANGE,
  MAXIMUM_MAX_LOG_FOLD_CHANGE,
  DEFAULT_MAX_LOG_FOLD_CHANGE,
  MAX_NUM_CHARACTERS_DROPDOWN,
  NODE_COLORING_MENU,
  BOTTOM_DATASET_SELECTION_SIDEBAR,
  TOP_DATASET_SELECTION_SIDEBAR,
  NODE_COLORING_TOGGLE_SIDEBAR,
  AVG_REPLICATE_VALS_BOTTOM_SIDEBAR,
  AVG_REPLICATE_VALS_TOP_SIDEBAR,
  AVG_REPLICATE_VALS_TOP_MENU,
  AVG_REPLICATE_VALS_BOTTOM_MENU,
  NODE_COLORING_TOGGLE_MENU,
  TOP_DATASET_SELECTION_MENU,
  BOTTOM_DATASET_SELECTION_MENU,
  NODE_COLORING_TOGGLE_CLASS,
  LOG_FOLD_CHANGE_MAX_VALUE_CLASS,
  LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON,
  ENDS_IN_EXPRESSION_REGEXP,
} from "./constants";

import { grnState } from "./grnstate";

var shortenExpressionSheetName = function (name) {
    return (name.length > MAX_NUM_CHARACTERS_DROPDOWN) ?
      (name.slice(0, MAX_NUM_CHARACTERS_DROPDOWN) + "...") : name;
};

export var hasExpressionData = function (sheets) {
    for (var property in sheets) {
        if (property.match(ENDS_IN_EXPRESSION_REGEXP)) {
            return true;
        }
    }
    return false;
};

export var nodeColoringController = {

    // renderNodeColoring: function () { }, // defined in graph.js

    updateAverageReplicateValuesTopDataset: function (averageTopDataset) {
        if (averageTopDataset) {
            $(AVG_REPLICATE_VALS_TOP_MENU + " span").addClass("glyphicon-ok");
            $(AVG_REPLICATE_VALS_TOP_MENU).prop("checked", "checked");
            $(AVG_REPLICATE_VALS_TOP_SIDEBAR).prop("checked", "checked");
        } else {
            $(AVG_REPLICATE_VALS_TOP_MENU + " span").removeClass("glyphicon-ok");
            $(AVG_REPLICATE_VALS_TOP_MENU).removeProp("checked");
            $(AVG_REPLICATE_VALS_TOP_SIDEBAR).removeProp("checked");
        }
        grnState.nodeColoring.avgTopDataset = averageTopDataset;
        updaters.renderNodeColoring();
    },

    updateAverageReplicateValuesBottomDataset: function (averageBottomDataset) {
        if (averageBottomDataset) {
            $(AVG_REPLICATE_VALS_BOTTOM_MENU + " span").addClass("glyphicon-ok");
            $(AVG_REPLICATE_VALS_BOTTOM_MENU).prop("checked", "checked");
            $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).prop("checked", "checked");
        } else {
            $(AVG_REPLICATE_VALS_BOTTOM_MENU + " span").removeClass("glyphicon-ok");
            $(AVG_REPLICATE_VALS_BOTTOM_MENU).removeProp("checked");
            $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).removeProp("checked");
        }
        grnState.nodeColoring.avgBottomDataset = averageBottomDataset;
        this.renderNodeColoring();
    },

    disableNodeColoring: function () {
        $(NODE_COLORING_TOGGLE_MENU + " span").addClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).val("Enable Node Coloring");
        grnState.nodeColoring.nodeColoringEnabled = false;
        this.removeNodeColoring();
    },

    enableNodeColoring: function () {
        $(NODE_COLORING_TOGGLE_MENU + " span").removeClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).val("Disable Node Coloring");
        grnState.nodeColoring.nodeColoringEnabled = true;
        this.renderNodeColoring();
    },

    updateLogFoldChangeMaxValue: function (value) {
        $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).val(value);
        grnState.nodeColoring.logFoldChangeMaxValue = value;
        this.renderNodeColoring();
    },

    updateTopDataset: function (selection) {
        $(TOP_DATASET_SELECTION_SIDEBAR).val(selection);
        this.removeAllChecksFromMenuDatasetOptions(TOP_DATASET_SELECTION_MENU);
        $(`${TOP_DATASET_SELECTION_MENU} li[value='${selection}'] a span`).addClass("glyphicon-ok");

        grnState.nodeColoring.topDataset = selection;
        if (grnState.nodeColoring.bottomDataSameAsTop) {
            grnState.nodeColoring.bottomDataset = selection;
        }
        this.renderNodeColoring();
    },

    updateBottomDataset: function (selection) {
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).val(selection);
        this.removeAllChecksFromMenuDatasetOptions(BOTTOM_DATASET_SELECTION_MENU);
        $(`${BOTTOM_DATASET_SELECTION_MENU} li[value='${selection}'] a span`).addClass("glyphicon-ok");

        if (selection === "Same as Top Dataset") {
            grnState.nodeColoring.bottomDataset = this.topDataset;
            grnState.nodeColoring.bottomDataSameAsTop = true;
        } else {
            grnState.nodeColoring.bottomDataSameAsTop = false;
            grnState.nodeColoring.bottomDataset = selection;
        }
        this.renderNodeColoring();
    },

    removeAllChecksFromMenuDatasetOptions: function (id) {
        $(`${id} li a span`).each(
            function () {
                $(this).removeClass("glyphicon-ok");
            }
        );
    },

    logFoldChangeMaxValueInputValidation: function (value) {
        if (value === "" || value === "0") {
            return DEFAULT_MAX_LOG_FOLD_CHANGE;
        } else if (value < MINIMUM_MAX_LOG_FOLD_CHANGE) {
            return MINIMUM_MAX_LOG_FOLD_CHANGE;
        } else if (value > MAXIMUM_MAX_LOG_FOLD_CHANGE) {
            return MAXIMUM_MAX_LOG_FOLD_CHANGE;
        } else {
            return value;
        }
    },

    configureNodeColoringHandlers: function () {
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).on("change", {handler: this}, function (event) {
            event.data.handler.updateAverageReplicateValuesTopDataset($(this).prop("checked"));
        });

        $(AVG_REPLICATE_VALS_TOP_MENU).on("click", {handler: this}, function (event) {
            event.data.handler.updateAverageReplicateValuesTopDataset(!$(this).prop("checked"));
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
    },

    initialize: function () {
        $(NODE_COLORING_TOGGLE_SIDEBAR).val("Enable Node Coloring");
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).prop("checked", true);
        $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).prop("checked", true);
        $(NODE_COLORING_TOGGLE_SIDEBAR).val("Disable Node Coloring");

        // Initialize Menu Bar
        $(AVG_REPLICATE_VALS_TOP_MENU + " span").addClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_TOP_MENU).prop("checked", true);

        $(AVG_REPLICATE_VALS_BOTTOM_MENU + " span").addClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_BOTTOM_MENU).prop("checked", true);

        $(NODE_COLORING_TOGGLE_MENU + " span").removeClass("glyphicon-ok");
        $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).val(DEFAULT_MAX_LOG_FOLD_CHANGE);

        grnState.nodeColoring.logFoldChangeMaxValue = DEFAULT_MAX_LOG_FOLD_CHANGE;
        grnState.nodeColoring.nodeColoringEnabled = true;
        grnState.nodeColoring.avgTopDataset = true;
        grnState.nodeColoring.avgBottomDataset = true;
        grnState.nodeColoring.topDataset = undefined;
        grnState.nodeColoring.bottomDataset = undefined;
        grnState.nodeColoring.lastDataset = null;
        grnState.nodeColoring.bottomDataSameAsTop = true;
    },

    resetDatasetDropdownMenus: function (network) {

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
    },

    isNewWorkbook: function (name) {
        return grnState.nodeColoring.lastDataset === null || grnState.nodeColoring.lastDataset !== name;
    },

    showNodeColoringMenus: function () {
        if ($(NODE_COLORING_MENU).hasClass("hidden")) {
            $(NODE_COLORING_MENU).removeClass("hidden");
        }
        if ($(".node-coloring-menu").hasClass("disabled")) {
            $(".node-coloring-menu").removeClass("disabled");
        }
    },

    disableNodeColoringMenus: function () {
        if (!$(NODE_COLORING_MENU).hasClass("hidden")) {
            $(NODE_COLORING_MENU).addClass("hidden");
        }
        if (!$(".node-coloring-menu").hasClass("disabled")) {
            $(".node-coloring-menu").addClass("disabled");
        }
    },

    reload: function (network, name) {
        if (hasExpressionData(network.expression)) {
            this.showNodeColoringMenus();
            if (this.isNewWorkbook(name)) {
                this.initialize();
                grnState.nodeColoring.lastDataset = name;
                this.resetDatasetDropdownMenus(network);
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
            this.disableNodeColoringMenus();
        }
    },
};