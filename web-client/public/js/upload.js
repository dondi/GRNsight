// TODO Likely a temporary location, while things are being moved to their "true" homes.
//      But placed here for now so that the true MVC cycle of grnState, updateApp, and the
//      controller code installed by setupHandlers can access them.

import { grnState } from "./grnstate";

export const uploadState = {
    currentNetwork: null,
    sliders: null,
    nodeColoring: null
};

export const upload = function (sliderGroupController, drawGraph, nodeColoringController) {

  // Values
    var TOOLTIP_SHOW_DELAY    = 700;
    var TOOLTIP_HIDE_DELAY    = 100;

  // Settings Stuff
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

    var sliders = new sliderGroupController([grnState.chargeSlider, grnState.linkDistanceSlider]);
    uploadState.sliders = sliders;
    sliders.updateValues();
    sliders.configureSliderControllers();

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

    $("#warningsModal").on("hidden.bs.modal", function () {
        if ($("#warningsInfo").hasClass("in")) {
            $("#warningsInfo").removeClass("in");
        }
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
