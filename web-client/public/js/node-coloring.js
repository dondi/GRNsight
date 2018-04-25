var MINIMUM_MAX_LOG_FOLD_CHANGE = -100;
var MAXIMUM_MAX_LOG_FOLD_CHANGE = 100;
var DEFAULT_MAX_LOG_FOLD_CHANGE = 3;
var MAX_NUM_CHARACTERS_DROPDOWN = 24;

var NODE_COLORING_MENU = ".node-coloring";

var BOTTOM_DATASET_SELECTION_SIDEBAR = "#dataset-bottom";
var TOP_DATASET_SELECTION_SIDEBAR = "#dataset-top";
var NODE_COLORING_TOGGLE_SIDEBAR = "#nodeColoringToggle";
var AVG_REPLICATE_VALS_BOTTOM_SIDEBAR = "#averageDataBottom";
var AVG_REPLICATE_VALS_TOP_SIDEBAR = "#averageDataTop";

var AVG_REPLICATE_VALS_TOP_MENU = "#averageDataTopMenu";
var AVG_REPLICATE_VALS_BOTTOM_MENU = "#averageDataBottomMenu";
var NODE_COLORING_TOGGLE_MENU = "#node-coloring-toggle-menu";
var TOP_DATASET_SELECTION_MENU = "#topDatasetDropdownMenu";
var BOTTOM_DATASET_SELECTION_MENU = "#bottomDatasetDropdownMenu";

var NODE_COLORING_TOGGLE_CLASS = ".nodeColoringToggle";
var LOG_FOLD_CHANGE_MAX_VALUE_CLASS = ".logFoldChangeMaxValue";


var endsInExpressionRegExp = /expression$/;

var shortenExpressionSheetName = function (name) {
    return (name.length > MAX_NUM_CHARACTERS_DROPDOWN) ?
      (name.slice(0, MAX_NUM_CHARACTERS_DROPDOWN) + "...") : name;
};

export var hasExpressionData = function (sheets) {
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
        this.avgTopDataset = averageTopDataset;
        this.renderNodeColoring();
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
        this.avgBottomDataset = averageBottomDataset;
        this.renderNodeColoring();
    },

    disableNodeColoring: function () {
        $(NODE_COLORING_TOGGLE_MENU + " span").addClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).val("Enable Node Coloring");
        this.nodeColoringEnabled = false;
        this.removeNodeColoring();
    },

    enableNodeColoring: function () {
        $(NODE_COLORING_TOGGLE_MENU + " span").removeClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).val("Disable Node Coloring");
        this.nodeColoringEnabled = true;
        this.renderNodeColoring();
    },

    updateLogFoldChangeMaxValue: function (value) {
        $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).val(value);
        this.logFoldChangeMaxValue = value;
        this.renderNodeColoring();
    },

    updateTopDataset: function (selection) {
        $(TOP_DATASET_SELECTION_SIDEBAR).val(selection);
        this.removeAllChecksFromMenuDatasetOptions(TOP_DATASET_SELECTION_MENU);
        $(`${TOP_DATASET_SELECTION_MENU} li[value='${selection}'] a span`).addClass("glyphicon-ok");

        this.topDataset = selection;
        if (this.bottomDataSameAsTop) {
            this.bottomDataset = selection;
        }
        this.renderNodeColoring();
    },

    updateBottomDataset: function (selection) {
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).val(selection);
        this.removeAllChecksFromMenuDatasetOptions(BOTTOM_DATASET_SELECTION_MENU);
        $(`${BOTTOM_DATASET_SELECTION_MENU} li[value='${selection}'] a span`).addClass("glyphicon-ok");

        if (selection === "Same as Top Dataset") {
            this.bottomDataset = this.topDataset;
            this.bottomDataSameAsTop = true;
        } else {
            this.bottomDataSameAsTop = false;
            this.bottomDataset = selection;
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
        if (value === "") {
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

        this.logFoldChangeMaxValue = DEFAULT_MAX_LOG_FOLD_CHANGE;
        this.nodeColoringEnabled = true;
        this.avgTopDataset = true;
        this.avgBottomDataset = true;
        this.topDataset = undefined;
        this.bottomDataset = undefined;
        this.lastDataset = null;
        this.bottomDataSameAsTop = true;
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
            if (property.match(endsInExpressionRegExp)) {
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

        // Mark first option as selected
        // $("#TOP_DATASET_SELECTION_SIDEBAR option[selected='selected']").each(
        //     function () {
        //         $(this).removeAttr("selected");
        //     }
        // );
        // $("#TOP_DATASET_SELECTION_SIDEBAR option:first").attr("selected", "selected");
    },

    isNewWorkbook: function (name) {
        return this.lastDataset === null || this.lastDataset !== name;
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
                this.lastDataset = name;
                this.resetDatasetDropdownMenus(network);
            }
            this.topDataset = $(TOP_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
            if ($(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value") === "Same as Top Dataset") {
                this.bottomDataset = this.topDataset;
                this.bottomDataSameAsTop = true;
            } else {
                this.bottomDataset = $(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
                this.bottomDataSameAsTop = false;
            }
        } else {
            this.disableNodeColoringMenus();
        }
    },
};
