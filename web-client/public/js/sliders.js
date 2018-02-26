/* We can't use `exported` here because the eslint environment includes node and eslint-env does not work as an inlined
   setting; this is the next closest thing. */

/* eslint no-unused-vars: [2, {"varsIgnorePattern": "graySlider|outputUpdate|sliderGroupController|sliderObject"}] */

var GRAVITY_LENGTH_WITHOUT_ZERO = 3;
var LOCK_SLIDERS_CLASS          = ".lockSliders";
var LOCK_SLIDERS_BUTTON         = "#lockSlidersButton";
var LOCK_SLIDERS_MENU_OPTION    = "#lockSlidersMenu";
var RESET_SLIDERS_CLASS         = ".resetSliders";
var RESET_SLIDERS_BUTTON        = "#resetSlidersButton";
var RESET_SLIDERS_MENU_OPTION   = "#resetSlidersMenu";
var UNDO_SLIDER_RESET_CLASS     = ".undoSliderReset";
var UNDO_SLIDER_RESET_MENU      = "#undoResetMenu";
var UNDO_SLIDER_RESET_BUTTON    = "#undoResetButton";

var SLIDER_ADJUSTER = {
    charge: function (sliderController, value) {
        sliderController.simulation.force("charge").strength(value);
        sliderController.simulation.alpha(1);
    },
    link: function (sliderController, value) {
        sliderController.simulation.force("link").distance(value);
        sliderController.simulation.alpha(1);
    }
};

var updateSliderDisplayedValue = function (slider, element) {
    var value = $("#" + $(element).attr("id")).val();
    $(slider.valueId).html(value + ((slider.needsAppendedZeros &&
      (value.length === GRAVITY_LENGTH_WITHOUT_ZERO)) ? "0" : ""));
    slider.setCurrentVal(value);
};

var sliderObject = function (sliderId, valueId, defaultVal, needsAppendedZeros) {
    this.sliderId = sliderId;
    this.valueId = valueId;
    this.defaultVal = defaultVal;
    this.currentVal = defaultVal;
    this.backup = defaultVal;
    this.needsAppendedZeros = needsAppendedZeros;

    this.activate = function () {
        $(this.sliderId).on("input", {slider: this}, function (event) {
            updateSliderDisplayedValue(event.data.slider, this);
        });
    };

    this.setCurrentVal = function (newVal) {
        this.currentVal = newVal;
    };

};

var sliderGroupController = function (sliderArray) {
    this.sliders = sliderArray;
    this.numberOfSliders = sliderArray.length;
    this.locked = false;

    this.simulation = undefined;
    this.forceParameters = undefined;

    this.backupValues = function () {
        for (var i = 0; i < this.numberOfSliders; i++) {
            this.sliders[i].backup = this.sliders[i].currentVal;
        }
    };

    this.resetValues = function () {
        this.backupValues();
        for (var i = 0; i < this.numberOfSliders; i++) {
            this.sliders[i].currentVal = this.sliders[i].defaultVal;
        }
        this.updateValues();
    };

    this.undoReset = function () {
        for (var i = 0; i < this.numberOfSliders; i++) {
            this.sliders[i].currentVal = this.sliders[i].backup;
        }
        this.updateValues();
    };

    this.updateValues = function () {
        for (var i = 0; i < this.numberOfSliders; i++) {
            $(this.sliders[i].sliderId).val(this.sliders[i].currentVal);
            $(this.sliders[i].valueId).html(this.sliders[i].currentVal +
              ((this.sliders[i].needsAppendedZeros && this.sliders[i].currentVal.toString().length ===
              GRAVITY_LENGTH_WITHOUT_ZERO) ? "0" : ""));
        }
    };

    this.setSliderHandlers = function () {
        for (var i = 0; i < this.numberOfSliders; i++) {
            this.sliders[i].activate();
        }
    };

    this.initializeDefaultForces = function () {
        this.modifyForceParameter("charge", -50);
        this.modifyForceParameter("link", 500);
    };

    this.configureSliderControllers = function () {
        $(LOCK_SLIDERS_CLASS).on("click", {handler: this}, function (event) {
            event.data.handler.toggle();
        });
        $(RESET_SLIDERS_CLASS).on("click", {handler: this}, function (event) {
            event.data.handler.resetValues();
            $(UNDO_SLIDER_RESET_BUTTON).prop("disabled", false);
            $(UNDO_SLIDER_RESET_MENU).parent().removeClass("disabled");
        });
        $(UNDO_SLIDER_RESET_CLASS).on("click", {handler: this}, function (event) {
            event.data.handler.undoReset();
            $(UNDO_SLIDER_RESET_BUTTON).prop("disabled", true);
            $(UNDO_SLIDER_RESET_MENU).parent().addClass("disabled");
        });
    };

    this.toggle = function () {
        this.locked = !this.locked;
        $(LOCK_SLIDERS_MENU_OPTION + " span").toggleClass("glyphicon-ok invisible");
        $(LOCK_SLIDERS_BUTTON).prop("checked", (this.locked) ? true : false);
        $(RESET_SLIDERS_BUTTON).prop("disabled", !$(RESET_SLIDERS_BUTTON).prop("disabled"));
        $(RESET_SLIDERS_MENU_OPTION).parent().toggleClass("disabled");

        $.each(this.sliders, function (key, value) {
            $(value.sliderId).prop("disabled", !$(value.sliderId).prop("disabled"));
        });
    };

    this.addForce = function (simulation) { // make forceParameters into an inputted array
        this.simulation = simulation;
        this.forceParameters = Object.keys(SLIDER_ADJUSTER);
    };

    this.configureForceHandlers = function () {
        for (var i = 0; i < this.numberOfSliders; i++) {
            $(this.sliders[i].sliderId).on("input", {handler: this, slider: this.sliders[i],
                force: this.forceParameters[i]}, function (event) {
                    event.data.handler.modifyForceParameter(event.data.force, $(this).val());
                    updateSliderDisplayedValue(event.data.slider, this);
                });
        }

        $(RESET_SLIDERS_CLASS).on("click", {handler: this}, function (event) {
            event.data.handler.resetForce();
        });
        $(RESET_SLIDERS_MENU_OPTION).on("click", {handler: this}, function (event) {
            event.data.handler.resetValues();
            $(UNDO_SLIDER_RESET_BUTTON).prop("disabled", false);
            $(UNDO_SLIDER_RESET_MENU).parent().removeClass("disabled");
        });

        $(UNDO_SLIDER_RESET_CLASS).on("click", {handler: this}, function (event) {
            event.data.handler.undoForceReset();
        });

        $(UNDO_SLIDER_RESET_MENU).on("click", {handler: this}, function (event) {
            event.data.handler.undoReset();
            $(UNDO_SLIDER_RESET_BUTTON).prop("disabled", true);
            $(UNDO_SLIDER_RESET_MENU).parent().addClass("disabled");
        });
    };

    this.resetForce = function () {
        for (var i = 0; i < this.numberOfSliders; i++) {
            this.modifyForceParameter(this.forceParameters[i], this.sliders[i].defaultVal);
        }
    };

    this.undoForceReset = function () {
        for (var i = 0; i < this.numberOfSliders; i++) {
            this.modifyForceParameter(this.forceParameters[i], this.sliders[i].backup);
        }
    };

    this.modifyForceParameter = function (parameterType, value) {
        if (SLIDER_ADJUSTER[parameterType]) {
            SLIDER_ADJUSTER[parameterType](this, value);
        }
    };
};

// Gray Threshold Slider Settings
var outputUpdate = function () {
    var value = Math.round(($("#grayThresholdInput").val() * 100));
    $("#grayThresholdValue").text(value + "%");
};
