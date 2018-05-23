// TODO Likely a temporary location, while things are being moved to their "true" homes.
//      But placed here for now so that the true MVC cycle of grnState, updateApp, and the
//      controller code installed by setupHandlers can access them.
export const uploadState = {
    currentNetwork: null,
    sliders: null,
    nodeColoring: null
};

export const upload = function (sliderObject, sliderGroupController, drawGraph, nodeColoringController) {
  // Slider Values
    var LINK_DIST_SLIDER_ID   = "#linkDistInput";
    var LINK_DIST_VALUE       = "#linkDistVal";
    var LINK_DIST_DEFAULT     = 500;
    var CHARGE_SLIDER_ID      = "#chargeInput";
    var CHARGE_VALUE          = "#chargeVal";
    var CHARGE_DEFAULT        = -50;
    var TOOLTIP_SHOW_DELAY    = 700;
    var TOOLTIP_HIDE_DELAY    = 100;

  // Settings Stuff
    var COLOR_PREFERENCES_CLASS = ".colorPreferences";
    var ACTIVE_COLOR_OPTION     = "active";

  // Weights Stuff
    var WEIGHTS_SHOW_MOUSE_OVER_MENU  = "#weightsMouseOverMenu";
    var WEIGHTS_SHOW_ALWAYS_MENU      = "#weightsAlwaysMenu";
    var WEIGHTS_HIDE_MENU             = "#weightsNeverMenu";
    var WEIGHTS_SHOW_MOUSE_OVER_SIDE  = "#weightsMouseOverSide";
    var WEIGHTS_SHOW_ALWAYS_SIDE      = "#weightsAlwaysSide";
    var WEIGHTS_HIDE_SIDE             = "#weightsNeverSide";
    var WEIGHTS_SHOW_MOUSE_OVER_CLASS = ".weightsMouseOver";
    var WEIGHTS_SHOW_ALWAYS_CLASS     = ".weightsAlways";
    var WEIGHTS_HIDE_CLASS            = ".weightsNever";

    var styleLabelTooltips = function () {
        $(".info").tooltip({
            placement: "top",
            delay: { show: TOOLTIP_SHOW_DELAY, hide: TOOLTIP_HIDE_DELAY }
        });
    };

    styleLabelTooltips();

    var nodeColoring = nodeColoringController;
    uploadState.nodeColoring = nodeColoring;
    nodeColoring.configureNodeColoringHandlers();
    nodeColoring.initialize();

    var linkDistanceSlider = new sliderObject(LINK_DIST_SLIDER_ID, LINK_DIST_VALUE, LINK_DIST_DEFAULT, false);
    var chargeSlider = new sliderObject(CHARGE_SLIDER_ID, CHARGE_VALUE, CHARGE_DEFAULT, false);
    var sliders = new sliderGroupController([chargeSlider, linkDistanceSlider]);
    uploadState.sliders = sliders;
    sliders.setSliderHandlers();
    sliders.updateValues();
    sliders.configureSliderControllers();

    var settingsController = function () {
        this.color = true;

        this.setupSettingsHandlers = function () {
            $(COLOR_PREFERENCES_CLASS).on("click", function () {
                $(COLOR_PREFERENCES_CLASS).toggleClass(ACTIVE_COLOR_OPTION);
                $(COLOR_PREFERENCES_CLASS + ">span").toggleClass("glyphicon-ok invisible");
            });
        };
    };

    var settings = new settingsController();
    settings.setupSettingsHandlers();

    var lockForce = function (disable) {
        $("#linkDistInput").prop("disabled", disable);
        $("#chargeInput").prop("disabled", disable);
        $("#resetSlidersButton").prop("disabled", disable);
        $("#lockSlidersButton").prop("checked", disable);
    };

    var toggleLayout = function (on, off) {
        if (!$(on).prop("checked")) {
            $(on).prop("checked", true);
            $(off).prop("checked", false);
            $(off + " span").removeClass("glyphicon-ok");
            $(on + " span").addClass("glyphicon-ok");
            if (on === "#gridLayout") {
                lockForce(true);
                $("#lockSlidersMenu").parent().addClass("disabled");
                $("#resetSlidersMenu").parent().addClass("disabled");
                $("#link-distance").parent().addClass("disabled");
                $("#charge").parent().addClass("disabled");
            } else {
                lockForce(false);
                $("#lockSlidersMenu").parent().removeClass("disabled");
                $("#resetSlidersMenu").parent().removeClass("disabled");
                $("#link-distance").parent().removeClass("disabled");
                $("#charge").parent().removeClass("disabled");
            }
            if (!$(on).hasClass("called")) {
                $("#gridLayoutButton").trigger("click");
            }
        }
    };

    $("#gridLayout").on("click", function () {
        toggleLayout("#gridLayout", "#forceGraph");
    });

    $("#forceGraph").on("click", function () {
        toggleLayout("#forceGraph", "#gridLayout");
    });

  // TODO: Make this less bad
    $("#upload-sif").on("click", function () {
        // deleted event parameter
        $("#launchFileOpen").off("click").on("click", function () {
            $("#upload-sif").click();
        });
    });
    $("#upload-graphml").on("click", function () {
        // deleted event parameter
        $("#launchFileOpen").off("click").on("click", function () {
            $("#upload-graphml").click();
        });
    });

    $("#printGraph").on("click", function () {
        if (!$(".startDisabled").hasClass("disabled")) {
            window.print();
        }
    });

  // Style of the tooltips when the user mouses over the label names
    $(".info").tooltip({
        placement: "top",
        delay: { show: 700, hide: 100 }
    });

    // Normalization Controller
    var MIN_EDGE_WEIGHT_NORMALIZATION = 0.0001;
    var MAX_EDGE_WEIGHT_NORMALIZATION = 1000;

    let valueValidator = (min, max, value) => {
        return Math.min(max, Math.max(min, value));
    };

    var edgeWeightNormalizationInputValidation = function (value) {
        return value === "" ? "" : valueValidator(MIN_EDGE_WEIGHT_NORMALIZATION, MAX_EDGE_WEIGHT_NORMALIZATION, value);
    };

    var synchronizeNormalizationValues = function (value) {
        var validated = edgeWeightNormalizationInputValidation(value);
        $("#normalization-max").val(validated);
        $("#edge-weight-normalization-factor-menu").val(validated);
        drawGraph(uploadState.currentNetwork, sliders, nodeColoring);
    };

    $("#normalization-button").click(function () {
        synchronizeNormalizationValues($("#normalization-max").val());
    });

    $("#reset-normalization-factor-menu, #resetNormalizationButton").click(function () {
        synchronizeNormalizationValues("");
    });

    $("#edge-weight-normalization-factor-menu").on("change", function () {
        synchronizeNormalizationValues($("#edge-weight-normalization-factor-menu").val());
    });

    var GREY_EDGE_THRESHOLD_MENU = "#gray-edge-threshold-menu";
    var GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR = "#grayThresholdInput";
    var GREY_EDGE_THRESHOLD_TEXT_SIDEBAR = "#grayThresholdValue";

    // Gray Edge Controller

    var grayEdgeInputValidator = function (value) {
        return valueValidator(0, 100, value);
    };

    var updateGrayEdgeValues = function (value) {
        var validatedInput = grayEdgeInputValidator(value);
        $(GREY_EDGE_THRESHOLD_TEXT_SIDEBAR).text(validatedInput + "%");
        $(GREY_EDGE_THRESHOLD_MENU).val(validatedInput);
        $(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).val(validatedInput / 100);
        drawGraph(uploadState.currentNetwork, sliders, nodeColoring);
    };

    $(GREY_EDGE_THRESHOLD_MENU).on("change", function () {
        var value = Math.round(($(GREY_EDGE_THRESHOLD_MENU).val()));
        updateGrayEdgeValues(value);
    });

    $(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).on("change", function () {
        var value = Math.round(($(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).val() * 100));
        updateGrayEdgeValues(value);
    });

    $("#warningsModal").on("hidden.bs.modal", function () {
        if ($("#warningsInfo").hasClass("in")) {
            $("#warningsInfo").removeClass("in");
        }
    });

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).click(function () {
        $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").addClass("glyphicon-ok");
        $(WEIGHTS_SHOW_ALWAYS_MENU + " span").removeClass("glyphicon-ok");
        $(WEIGHTS_HIDE_MENU + " span").removeClass("glyphicon-ok");

        $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).prop("checked", "checked");
        $(WEIGHTS_SHOW_ALWAYS_SIDE).removeProp("checked");
        $(WEIGHTS_HIDE_SIDE).removeProp("checked");

        $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).addClass("selected");
        $(WEIGHTS_SHOW_ALWAYS_CLASS).removeClass("selected");
        $(WEIGHTS_HIDE_CLASS).removeClass("selected");
    });

    $(WEIGHTS_SHOW_ALWAYS_CLASS).click(function () {
        $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").removeClass("glyphicon-ok");
        $(WEIGHTS_SHOW_ALWAYS_MENU + " span").addClass("glyphicon-ok");
        $(WEIGHTS_HIDE_MENU + " span").removeClass("glyphicon-ok");

        $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).removeProp("checked");
        $(WEIGHTS_SHOW_ALWAYS_SIDE).prop("checked", "checked");
        $(WEIGHTS_HIDE_SIDE).removeProp("checked");

        $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).removeClass("selected");
        $(WEIGHTS_SHOW_ALWAYS_CLASS).addClass("selected");
        $(WEIGHTS_HIDE_CLASS).removeClass("selected");
    });

    $(WEIGHTS_HIDE_CLASS).click(function () {
        $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").removeClass("glyphicon-ok");
        $(WEIGHTS_SHOW_ALWAYS_MENU + " span").removeClass("glyphicon-ok");
        $(WEIGHTS_HIDE_MENU + " span").addClass("glyphicon-ok");

        $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).removeProp("checked");
        $(WEIGHTS_SHOW_ALWAYS_SIDE).removeProp("checked");
        $(WEIGHTS_HIDE_SIDE).prop("checked", "checked");

        $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).removeClass("selected");
        $(WEIGHTS_SHOW_ALWAYS_CLASS).removeClass("selected");
        $(WEIGHTS_HIDE_CLASS).addClass("selected");
    });

    var flattenNetwork = function (network, sheetType) {
        var result = $.extend(true, { }, network, { sheetType: sheetType });
        result.links.forEach(function (link) {
            link.source = link.source.index;
            link.target = link.target.index;
            delete link.weightElement;
        });
        return result;
    };

    var filenameWithExtension = function (suffix, extension) {
        var filename = $("#fileName").text();
        var currentExtension = filename.match(/\.[^\.]+$/);
        if (currentExtension && currentExtension.length) {
            filename = filename.substr(0, filename.length - currentExtension[0].length);
        }

        if (suffix) {
            filename = filename + "_" + suffix;
        }

        return filename + "." + extension;
    };

    var performExport = function (route, extension, sheetType) {
        return function () {
            // Deleted event parameter
            if (!$(this).parent().hasClass("disabled")) {
                var networkToExport = flattenNetwork(uploadState.currentNetwork, sheetType);
                var networkFilename = filenameWithExtension(sheetType !== uploadState.currentNetwork.sheetType ?
                    sheetType : "", extension);
                networkToExport.filename = networkFilename;

                var exportForm = $("<form></form>").attr({
                    method: "POST",
                    action: $("#service-root").val() + "/" + route
                }).append($("<input></input>").attr({
                    type: "hidden",
                    name: "filename",
                    value: networkFilename
                })).append($("<input></input>").attr({
                    type: "hidden",
                    name: "network",
                    value: JSON.stringify(networkToExport)
                }));
                $("body").append(exportForm);
                exportForm.submit();
                exportForm.remove();
            }
        };
    };

    $("#exportAsUnweightedSif").click(performExport("export-to-sif", "sif", "unweighted"));
    $("#exportAsWeightedSif").click(performExport("export-to-sif", "sif", "weighted"));
    $("#exportAsUnweightedGraphMl").click(performExport("export-to-graphml", "graphml", "unweighted"));
    $("#exportAsWeightedGraphMl").click(performExport("export-to-graphml", "graphml", "weighted"));

    // Prevent Bootstrap dropdown from closing on clicks in menu input boxes
    // https://stackoverflow.com/a/27759926
    $(".dropdown").on({
        "click": function (event) {
            if ($(event.target).hasClass("keepopen")) {
                $(this).data("closable", $(event.target).closest(".dropdown-toggle").length !== 0);
            }
        },
        "hide.bs.dropdown": function () {
            var hide = $(this).data("closable");
            $(this).data("closable", true);
            return hide;
        }
    });

};
