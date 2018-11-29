/* We can't use `exported` here because the eslint environment includes node and eslint-env does not work as an inlined
   setting; this is the next closest thing. */

/* eslint no-unused-vars: [2, {"varsIgnorePattern": "graySlider|outputUpdate|sliderGroupController|sliderObject"}] */
import { grnState } from "./grnstate";
import { updateSliderDisplayedValue } from "./update-app";

// moved but need to keep for graph.js
var SLIDER_ADJUSTER = {
    charge: function (sliderController, value) {
        grnState.simulation.force("charge").strength(value);
        grnState.simulation.alpha(1);
    },
    link: function (sliderController, value) {
        grnState.simulation.force("link").distance(value);
        grnState.simulation.alpha(1);
    }
};

// moved but need to keep temp
var modifyChargeParameter = (value) => {
    grnState.simulation.force("charge").strength(value);
    grnState.simulation.alpha(1);
};

var modifyLinkDistanceParameter = (value) => {
    grnState.simulation.force("link").distance(value);
    grnState.simulation.alpha(1);
};

export var sliderGroupController = function (sliderArray) {
    this.sliders = sliderArray;
    this.numberOfSliders = sliderArray.length;

    this.setSliderHandlers = function () {
        for (var i = 0; i < this.numberOfSliders; i++) {
            $(this.sliders[i].sliderId).on("input", {slider: this}, function (event) {
                updateSliderDisplayedValue(event.data.slider, this);
            });
        }
    };

// Object error when moving it
    this.initializeDefaultForces = function () {
        modifyChargeParameter(-50);
        modifyLinkDistanceParameter(500);
    };

// needed for graph.js
    this.modifyForceParameter = function (parameterType, value) {
        if (SLIDER_ADJUSTER[parameterType]) {
            SLIDER_ADJUSTER[parameterType](this, value);
        }
    };
};
