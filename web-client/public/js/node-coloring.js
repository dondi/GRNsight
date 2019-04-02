import {
  MAX_NUM_CHARACTERS_DROPDOWN,
  NODE_COLORING_MENU,
  BOTTOM_DATASET_SELECTION_SIDEBAR,
  TOP_DATASET_SELECTION_SIDEBAR,
  TOP_DATASET_SELECTION_MENU,
  BOTTOM_DATASET_SELECTION_MENU,
  ENDS_IN_EXPRESSION_REGEXP,
} from "./constants";

import { grnState } from "./grnstate";
import { updateApp } from "./update-app";

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
                grnState.nodeColoring.nodeColoringEnabled = true;
                grnState.nodeColoring.lastDataset = name;
                this.resetDatasetDropdownMenus(network);
                updateApp(grnState);
            }

            grnState.nodeColoring.topDataset = $(TOP_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
            grnState.nodeColoring.bottomDataset = $(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");

            if ( grnState.nodeColoring.bottomDataset === "Same as Top Dataset") {
                grnState.nodeColoring.bottomDataset = grnState.nodeColoring.topDataset;
                grnState.nodeColoring.bottomDataSameAsTop = true;
            } else {
                grnState.nodeColoring.bottomDataset =
                        $(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
                grnState.nodeColoring.bottomDataSameAsTop = false;
            }
        } else {
            this.disableNodeColoringMenus();
            updateApp(grnState);
        }
    },
};
