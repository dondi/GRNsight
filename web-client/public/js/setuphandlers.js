/* eslint no-unused-vars: [2, {"varsIgnorePattern": "updateApp|grnState"}] */
var updateApp = require("./updateapp");
export var setupHandlers = function (grnState) {
    console.log("HELLO WORLD");

    var GREY_EDGES_DASHED_MENU = "#grey-edges-dashed-menu";
    var GREY_EDGES_DASHED_SIDEBAR = "#dashedGrayLineButton";

    $(GREY_EDGES_DASHED_SIDEBAR).on("change", function () {
        grnState.dashedLine = $(GREY_EDGES_DASHED_SIDEBAR).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGES_DASHED_MENU).click(function () {
        grnState.dashedLine = $(GREY_EDGES_DASHED_MENU).prop("checked");
        updateApp(grnState);
    });
};
