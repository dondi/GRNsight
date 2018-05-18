/* eslint no-unused-vars: [2, {"varsIgnorePattern": "updateGreyEdgesAsDashedOptions|getMappedValue|manualZoom"}] */
const upload = require("./upload").upload;

export var updateApp = function (grnState) {

    var GREY_EDGES_DASHED_MENU = "#grey-edges-dashed-menu";
    var GREY_EDGES_DASHED_SIDEBAR = "#dashedGrayLineButton";

    var updateGreyEdgesAsDashedOptions = function (showAsDashed) {
        if (showAsDashed) {
            $(GREY_EDGES_DASHED_MENU + " span").addClass("glyphicon-ok");
            $(GREY_EDGES_DASHED_MENU).prop("checked", "checked");
            $(GREY_EDGES_DASHED_SIDEBAR).prop("checked", "checked");
        } else {
            $(GREY_EDGES_DASHED_MENU + " span").removeClass("glyphicon-ok");
            $(GREY_EDGES_DASHED_MENU).removeProp("checked");
            $(GREY_EDGES_DASHED_SIDEBAR).removeProp("checked");
        }
        upload.drawGraph(currentNetwork, sliders, nodeColoring);
    };

};
