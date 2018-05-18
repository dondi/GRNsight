/* eslint no-unused-vars: [2, {"varsIgnorePattern": "updateApp|grnState"}] */
var updateApp = require("./updateapp");
export var setupHandlers = function (grnState) {

    var GREY_EDGES_DASHED_MENU = "#grey-edges-dashed-menu";
    var GREY_EDGES_DASHED_SIDEBAR = "#dashedGrayLineButton";

    if (!$(GREY_EDGES_DASHED_MENU).prop("checked")) {
        grnState.dashedLine = false;
    } else {
        grnState.dashedLine = true;
    }

    if ($(GREY_EDGES_DASHED_SIDEBAR).prop("checked")) {
        grnState.dashedLine = true;
    } else {
        grnState.dashedLine = false;
    }

    $(GREY_EDGES_DASHED_MENU).click(function () {
        updateApp.updateGreyEdgesAsDashedOptions(grnState.dashedLine);
    });

    $(GREY_EDGES_DASHED_SIDEBAR).on("change", function () {
        updateApp.updateGreyEdgesAsDashedOptions(grnState.dashedLine);
    });

};
