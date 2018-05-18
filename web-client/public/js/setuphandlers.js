/* eslint no-unused-vars: [2, {"varsIgnorePattern": "updateApp|grnState"}] */
var updateApp = require("./updateapp");
export var setupHandlers = function (grnState) {

    var GREY_EDGES_DASHED_MENU = "#grey-edges-dashed-menu";
    var GREY_EDGES_DASHED_SIDEBAR = "#dashedGrayLineButton";

    $(GREY_EDGES_DASHED_MENU).click(function () {
        updateApp.updateGreyEdgesAsDashedOptions(!$(GREY_EDGES_DASHED_MENU).prop("checked"));
    });

    $(GREY_EDGES_DASHED_SIDEBAR).on("change", function () {
        updateApp.updateGreyEdgesAsDashedOptions($(GREY_EDGES_DASHED_SIDEBAR).prop("checked"));
    });

};
