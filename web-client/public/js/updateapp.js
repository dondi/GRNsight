/* eslint no-unused-vars: [2, {"varsIgnorePattern": "setupHandlers|grnState"}] */
var setupHandlers = require("./setupHandlers");
export var dashedLineState = function (grnState) {
    if ($("#dashedGrayLineButton").prop("checked")) {
        return grnState.dashedLine = true;
    }
};
