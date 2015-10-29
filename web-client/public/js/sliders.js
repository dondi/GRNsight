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
      $(event.data.slider.valueId).html($(this).val() + ((event.data.slider.needsAppendedZeros && ($(this).val().length === GRAVITY_LENGTH_WITHOUT_ZERO)) ? "0" : ""));
      event.data.slider.currentVal = $(this).val();
    });
  };
};

var sliderGroupController = function (sliderArray) {
  this.sliders = sliderArray;
  this.numberOfSliders = sliderArray.length;
  this.locked = false;

  this.backupValues = function () {
    for (var i = 0; i < this.numberOfSliders; i++) {
      this.sliders[i].backup = this.sliders[i].currentVal;
    };
  };

  this.resetValues = function () {
    this.backupValues();
    for (var i = 0; i < this.numberOfSliders; i++) {
      this.sliders[i].currentVal = this.sliders[i].defaultVal;
    };
    this.updateValues();
  };

  this.undoReset = function () {
    for(var i = 0; i < this.numberOfSliders; i++) {
      this.sliders[i].currentVal = this.sliders[i].backup;
    }
    this.updateValues();
  }

  this.updateValues = function () {
    for (var i = 0; i < this.numberOfSliders; i++) {
      $(this.sliders[i].sliderId).val(this.sliders[i].currentVal);
      $(this.sliders[i].valueId).html(this.sliders[i].currentVal + ((this.sliders[i].needsAppendedZeros && this.sliders[i].currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO) ? "0" : ""));
    };
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
    })
  };

  this.toggle = function () {
    this.locked = !this.locked;
    $(LOCK_SLIDERS_MENU_OPTION + " span").toggleClass("glyphicon-ok invisible");
    $(LOCK_SLIDERS_BUTTON).prop("checked", (this.locked) ? true : false);
    $(RESET_SLIDERS_BUTTON).prop("disabled", !$(RESET_SLIDERS_BUTTON).prop("disabled"));
    $(RESET_SLIDERS_MENU_OPTION).parent().toggleClass("disabled");
    
    $.each(this.sliders, function (key, value) {
      $(value.sliderId).prop("disabled", !$(value.sliderId).prop("disabled"));
    })
  }   
};

var sliderForceController = function (sliderGroupController, force) {
  this.force = force;
  this.sliderGroup = sliderGroupController;

  this.configureForceHandler = function () {
    for (var i = 0; i < this.sliderGroup.numberOfSliders; i++) {
      //
    }
  }

  this.defaultForce = function () {
    //for (var i = 0; i  this.sliderGroup.numberOfSliders; i++) {
      this.sliderGroup.resetValues();
    //}
  }

  this.resetForce = function (needStop) {
    if (needStop) {
      this.force.stop();
    }
    this.force.start();
  }
}