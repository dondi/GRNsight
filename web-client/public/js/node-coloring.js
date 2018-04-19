var DEFAULT_MAX_LOG_FOLD_CHANGE = 3;
var MAX_NUM_CHARACTERS_DROPDOWN = 24;
var BOTTOM_DATASET_SELECTION = "#dataset-bottom";
var TOP_DATASET_SELECTION = "#dataset-top";
var NODE_COLORING_TOGGLE = "#nodeColoringToggle";


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
    // nodeColoring = undefined,
    // topDataset = undefined,
    // this.bottomDataset = undefined;
    // this.logFoldChangeMaxValue = undefined;
    // this.avgTopDataset = undefined;
    // this.avgBottomDataset = undefined;
    // this.nodeColoringEnabled = true;

    renderNodeColoring: function () { }, // defined in graph.js
    removeNodeColoring: function () { }, // defined in graph.js

    configureNodeColoringHandlers: function () {
        $("#averageDataTop").on("change", {handler: this}, function (event) {
            var selection = $(this).prop("checked");
            event.data.handler.avgTopDataset = selection;
            event.data.handler.renderNodeColoring();
        });

        $("#averageDataBottom").on("change", {handler: this}, function (event) {
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

        $("#log-fold-change-max-value").on("change", {handler: this}, function (event) {
            event.data.handler.logFoldChangeMaxValue = $("#log-fold-change-max-value").val();
            event.data.handler.renderNodeColoring();
        });

        $("#dataset-top").on("change", {handler: this}, function (event) {
            var selection = $("#dataset-top").find(":selected").attr("value");
            event.data.handler.topDataset = selection;
            if (event.data.handler.bottomDataSameAsTop) {
                event.data.handler.bottomDataset = selection;
            }
            event.data.handler.renderNodeColoring();
        });

        $("#dataset-bottom").on("change", {handler: this}, function (event) {
            var selection = $("#dataset-bottom").find(":selected").attr("value");
            if (selection === "sameAsTop") {
                event.data.handler.bottomDataset = event.data.handler.topDataset;
                event.data.handler.bottomDataSameAsTop = true;
            } else {
                event.data.handler.bottomDataset = selection;
            }
            event.data.handler.renderNodeColoring();
        });
    },

    reload: function (network) {
        if (hasExpressionData(network.expression)) {
            if ($(".node-coloring").hasClass("hidden")) {
                $(".node-coloring").removeClass("hidden");
            }
            this.nodeColoring = true;
            var nodeColoringOptions = [];
            var endsInExpressionRegExp = /expression$/;
            for (var property in network.expression) {
                if (property.match(endsInExpressionRegExp)) {
                    nodeColoringOptions.push({value: property});
                }
            }
            $(BOTTOM_DATASET_SELECTION).append($("<option>").attr("value", "sameAsTop").text("Same as Top Dataset"));
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
            $("#log-fold-change-max-value").val(DEFAULT_MAX_LOG_FOLD_CHANGE);
            this.nodeColoring = true;
            this.topDataset = $("#dataset-top").find(":selected").attr("value");
            if ($("#dataset-bottom").find(":selected").attr("value") === "sameAsTop") {
                this.bottomDataset = this.topDataset;
                this.bottomDataSameAsTop = true;
            } else {
                this.bottomDataset = $("#dataset-bottom").find(":selected").attr("value");
                this.bottomDataSameAsTop = false;
            }
            this.logFoldChangeMaxValue = $("#log-fold-change-max-value").val();
            this.nodeColoringEnabled = true;
            this.avgTopDataset = true;
            this.avgBottomDataset = true;
        } else {
            if (!$(".node-coloring").hasClass("hidden")) {
                $(".node-coloring").addClass("hidden");
            }
        }
    },
};
