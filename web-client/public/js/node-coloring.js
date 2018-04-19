var DEFAULT_MAX_LOG_FOLD_CHANGE = 3;
var MAX_NUM_CHARACTERS_DROPDOWN = 24;

var NODE_COLORING_MENU = ".node-coloring";

var BOTTOM_DATASET_SELECTION = "#dataset-bottom";
var TOP_DATASET_SELECTION = "#dataset-top";
var NODE_COLORING_TOGGLE = "#nodeColoringToggle";
var AVG_REPLICATE_VALS_BOTTOM = "#averageDataBottom";
var AVG_REPLICATE_VALS_TOP = "#averageDataTop";
var LOG_FOLD_CHANGE_MAX_VALUE = "#log-fold-change-max-value";

var shortenExpressionSheetName = function (name) {
    return (name.length > MAX_NUM_CHARACTERS_DROPDOWN) ?
      (name.slice(0, MAX_NUM_CHARACTERS_DROPDOWN) + "...") : name;
};

var hasExpressionData = function (sheets) {
    var endsInExpressionRegExp = /expression$/;
    for (var property in sheets) {
        if (property.match(endsInExpressionRegExp)) {
            return true;
        }
    }
    return false;
};

export var nodeColoringController = {

    // renderNodeColoring: function () { }, // defined in graph.js
    // removeNodeColoring: function () { }, // defined in graph.js

    configureNodeColoringHandlers: function () {
        $(AVG_REPLICATE_VALS_TOP).on("change", {handler: this}, function (event) {
            var selection = $(this).prop("checked");
            event.data.handler.avgTopDataset = selection;
            event.data.handler.renderNodeColoring();
        });

        $(AVG_REPLICATE_VALS_BOTTOM).on("change", {handler: this}, function (event) {
            var selection = $(this).prop("checked");
            event.data.handler.avgBottomDataset = selection;
            event.data.handler.renderNodeColoring();
        });

        $(NODE_COLORING_TOGGLE).on("click", {handler: this}, function (event) {
            if (event.data.handler.nodeColoringEnabled) {
                event.data.handler.nodeColoringEnabled = false;
                event.data.handler.removeNodeColoring();
                $(NODE_COLORING_TOGGLE).val("Enable Node Coloring");
            } else {
                event.data.handler.nodeColoringEnabled = true;
                event.data.handler.renderNodeColoring();
                $(NODE_COLORING_TOGGLE).val("Disable Node Coloring");
            }
        });

        $(LOG_FOLD_CHANGE_MAX_VALUE).on("change", {handler: this}, function (event) {
            event.data.handler.logFoldChangeMaxValue = $(LOG_FOLD_CHANGE_MAX_VALUE).val();
            event.data.handler.renderNodeColoring();
        });

        $(TOP_DATASET_SELECTION).on("change", {handler: this}, function (event) {
            var selection = $(TOP_DATASET_SELECTION).find(":selected").attr("value");
            event.data.handler.topDataset = selection;
            if (event.data.handler.bottomDataSameAsTop) {
                event.data.handler.bottomDataset = selection;
            }
            event.data.handler.renderNodeColoring();
        });

        $(BOTTOM_DATASET_SELECTION).on("change", {handler: this}, function (event) {
            var selection = $(BOTTOM_DATASET_SELECTION).find(":selected").attr("value");
            if (selection === "sameAsTop") {
                event.data.handler.bottomDataset = event.data.handler.topDataset;
                event.data.handler.bottomDataSameAsTop = true;
            } else {
                event.data.handler.bottomDataSameAsTop = false;
                event.data.handler.bottomDataset = selection;
            }
            event.data.handler.renderNodeColoring();
        });
    },

    initialize: function () {
        $(LOG_FOLD_CHANGE_MAX_VALUE).val(DEFAULT_MAX_LOG_FOLD_CHANGE);
        $(NODE_COLORING_TOGGLE).val("Enable Node Coloring");
        $(AVG_REPLICATE_VALS_TOP).prop("checked", true);
        $(AVG_REPLICATE_VALS_BOTTOM).prop("checked", true);

        this.logFoldChangeMaxValue = DEFAULT_MAX_LOG_FOLD_CHANGE;
        this.nodeColoringEnabled = true;
        this.avgTopDataset = true;
        this.avgBottomDataset = true;
        this.topDataset = undefined;
        this.bottomDataset = undefined;
        this.lastDataset = null;
        this.bottomDataSameAsTop = true;
    },

    reload: function (network, name) {
        if (hasExpressionData(network.expression)) {
            if ($(NODE_COLORING_MENU).hasClass("hidden")) {
                $(NODE_COLORING_MENU).removeClass("hidden");
            }
            if (this.lastDataset === null || this.lastDataset !== name) {
                this.initialize();
                this.lastDataset = name;
                var nodeColoringOptions = [];
                var endsInExpressionRegExp = /expression$/;
                for (var property in network.expression) {
                    if (property.match(endsInExpressionRegExp)) {
                        nodeColoringOptions.push({value: property});
                    }
                }
                $(BOTTOM_DATASET_SELECTION).append($("<option>")
                    .attr("value", "sameAsTop").text("Same as Top Dataset"));
                $(nodeColoringOptions).each(function () {
                    $(TOP_DATASET_SELECTION).append($("<option>")
                      .attr("value", this.value).text(shortenExpressionSheetName(this.value)));
                    $(BOTTOM_DATASET_SELECTION).append($("<option>")
                      .attr("value", this.value).text(shortenExpressionSheetName(this.value)));
                });
                // Mark first option as selected
                $("#TOP_DATASET_SELECTION option[selected='selected']").each(
                    function () {
                        $(this).removeAttr("selected");
                    }
                );
                $("#TOP_DATASET_SELECTION option:first").attr("selected", "selected");
            }
            this.topDataset = $(TOP_DATASET_SELECTION).find(":selected").attr("value");
            if ($(BOTTOM_DATASET_SELECTION).find(":selected").attr("value") === "sameAsTop") {
                this.bottomDataset = this.topDataset;
                this.bottomDataSameAsTop = true;
            } else {
                this.bottomDataset = $(BOTTOM_DATASET_SELECTION).find(":selected").attr("value");
                this.bottomDataSameAsTop = false;
            }
        } else {
            if (!$(NODE_COLORING_MENU).hasClass("hidden")) {
                $(NODE_COLORING_MENU).addClass("hidden");
            }
        }
    },
};
