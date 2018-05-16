import grnState from "grnstate";
import updateApp from "updateapp";
export var setupHandlers = function (grnState) {
    var updateSliderDisplayedValue = function (slider, element) {
        var value = $("#" + $(element).attr("id")).val();
        $(slider.valueId).html(value + ((slider.needsAppendedZeros &&
          (value.length === grnState.GRAVITY_LENGTH_WITHOUT_ZERO)) ? "0" : ""));
        slider.setCurrentVal(value);
    };

}
