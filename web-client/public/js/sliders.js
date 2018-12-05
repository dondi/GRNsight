/* We can't use `exported` here because the eslint environment includes node and eslint-env does not work as an inlined
   setting; this is the next closest thing. */

/* eslint no-unused-vars: [2, {"varsIgnorePattern": "graySlider|outputUpdate|sliderGroupController|sliderObject"}] */
import { updateSliderDisplayedValue } from "./update-app";

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
};
