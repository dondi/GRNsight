/* eslint no-unused-vars: [2, {"varsIgnorePattern": "updateGreyEdgesAsDashedOptions|getMappedValue|manualZoom"}] */
var grnstate = require("./grnstate");
export var updateApp = function (grnState) {
    var GREY_EDGES_DASHED_MENU = "#grey-edges-dashed-menu";
    var GREY_EDGES_DASHED_SIDEBAR = "#dashedGrayLineButton";

    if (grnState.dashedLine) {
        $(GREY_EDGES_DASHED_MENU + " span").addClass("glyphicon-ok");
        $(GREY_EDGES_DASHED_MENU).prop("checked", "checked");
        $(GREY_EDGES_DASHED_SIDEBAR).prop("checked", "checked");
    } else if (!grnState.dashedLine) {
        $(GREY_EDGES_DASHED_MENU + " span").removeClass("glyphicon-ok");
        $(GREY_EDGES_DASHED_MENU).removeProp("checked");
        $(GREY_EDGES_DASHED_SIDEBAR).removeProp("checked");
    }
};
