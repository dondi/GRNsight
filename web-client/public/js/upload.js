// TODO Likely a temporary location, while things are being moved to their "true" homes.
//      But placed here for now so that the true MVC cycle of grnState, updateApp, and the
//      controller code installed by setupHandlers can access them.

export const uploadState = {
    currentNetwork: null,
};

export const upload = function () {

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

    $("#printGraph").click( function () {
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

    $("#exportAsExcelWkbk").click(performExport("export-to-excel", "xlsx", "unweighted"));
    $("#exportAsUnweightedSif").click(performExport("export-to-sif", "sif", "unweighted"));
    $("#exportAsWeightedSif").click(performExport("export-to-sif", "sif", "weighted"));
    $("#exportAsUnweightedGraphMl").click(performExport("export-to-graphml", "graphml", "unweighted"));
    $("#exportAsWeightedGraphMl").click(performExport("export-to-graphml", "graphml", "weighted"));
};
