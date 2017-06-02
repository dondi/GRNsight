var GRAVITY_LENGTH_WITHOUT_ZERO = 3,
    LOCK_SLIDERS_CLASS          = ".lockSliders",
    LOCK_SLIDERS_BUTTON         = "#lockSlidersButton",
    LOCK_SLIDERS_MENU_OPTION    = "#lockSlidersMenu",
    RESET_SLIDERS_CLASS         = ".resetSliders",
    RESET_SLIDERS_BUTTON        = "#resetSlidersButton",
    RESET_SLIDERS_MENU_OPTION   = "#resetSlidersMenu",
    UNDO_SLIDER_RESET_CLASS     = ".undoSliderReset",
    UNDO_SLIDER_RESET_MENU      = "#undoResetMenu",
    UNDO_SLIDER_RESET_BUTTON    = "#undoResetButton";

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

var updateSliderDisplayedValue = function (slider, element) {
  var value = $("#" + $(element).attr("id")).val();
  $(slider.valueId).html(value + ((slider.needsAppendedZeros && (value.length === GRAVITY_LENGTH_WITHOUT_ZERO)) ? "0" : ""));
  slider.setCurrentVal(value);
};


var sliderGroupController = function (sliderArray) {
  this.sliders = sliderArray;
  this.numberOfSliders = sliderArray.length;
  this.locked = false;

  this.force = undefined;
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
    for(var i = 0; i < this.numberOfSliders; i++) {
      this.sliders[i].currentVal = this.sliders[i].backup;
    }
    this.updateValues();
  };

  this.updateValues = function () {
    for (var i = 0; i < this.numberOfSliders; i++) {
      $(this.sliders[i].sliderId).val(this.sliders[i].currentVal);
      $(this.sliders[i].valueId).html(this.sliders[i].currentVal + ((this.sliders[i].needsAppendedZeros && this.sliders[i].currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO) ? "0" : ""));
    }
  };

  this.setSliderHandlers = function () {
    for(var i = 0; i < this.numberOfSliders; i++) {
      this.sliders[i].activate();
    }
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

  this.addForce = function (force) { // make forceParameters into an inputted array
    this.force = force;
    this.forceParameters = [force.linkDistance, force.charge, force.chargeDistance, force.gravity];
  };

  this.configureForceHandlers = function () {
    for (var i = 0; i < this.numberOfSliders; i++) {
      $(this.sliders[i].sliderId).on("input", {handler: this, slider: this.sliders[i], force: this.forceParameters[i]}, function (event) {
        event.data.force($(this).val());
        event.data.handler.restartForce(event.data.slider.needsAppendedZeros);
        updateSliderDisplayedValue(event.data.slider, this);
      });
    };

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

  this.restartForce = function (needsRestart) {
    if (needsRestart) {
      this.force.stop();
    }
    this.force.start();
  };

  this.resetForce = function () {
    for(var i = 0; i < this.numberOfSliders; i++) {
      this.forceParameters[i](this.sliders[i].defaultVal);
      this.restartForce(this.sliders[i].needsAppendedZeros);
    }
  };
  // condense this ^ v

  this.undoForceReset = function () {
    for (var i = 0; i < this.numberOfSliders; i++) {
      this.forceParameters[i](this.sliders[i].backup);
      this.restartForce(this.sliders[i].needsAppendedZeros);
    }
  };
};

//Gray Threshold Slider Settings
var graySlider = document.getElementById('grayThresholdInput')

function outputUpdate(val) {
  //val = Math.round(val * 100) + '%';
	document.querySelector('#grayThresholdValue').value = val;
} 
