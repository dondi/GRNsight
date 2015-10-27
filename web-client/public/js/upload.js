$(function () {

  var NUMBER_OF_SLIDERS           = 4,
      LINK_DIST_SLIDER_ID         = "#linkDistInput",
      LINK_DIST_VALUE             = "#linkDistVal",
      LINK_DIST_DEFAULT           = 500,
      CHARGE_SLIDER_ID            = "#chargeInput",
      CHARGE_VALUE                = "#chargeVal",
      CHARGE_DEFAULT              = -1000,
      CHARGE_DIST_SLIDER_ID       = "#chargeDistInput",
      CHARGE_DIST_VALUE           = "#chargeDistVal",
      CHARGE_DIST_DEFAULT         = 1000,
      GRAVITY_SLIDER_ID           = "#gravityInput",      
      GRAVITY_VALUE               = "#gravityVal",      
      GRAVITY_DEFAULT             = 0.1,
      GRAVITY_LENGTH_WITHOUT_ZERO = 3,
      LOCK_SLIDERS_CLASS          = ".lockSliders",
      LOCK_SLIDERS_BUTTON         = "#lockSlidersButton",
      LOCK_SLIDERS_MENU_OPTION    = "#lockSlidersMenu",
      RESET_SLIDERS_CLASS         = ".resetSliders",
      UNDO_SLIDER_RESET_CLASS     = ".undoSliderReset",
      UNDO_SLIDER_RESET_MENU      = "#undoResetMenu",
      UNDO_SLIDER_RESET_BUTTON    = "#undoResetButton",
      TOOLTIP_SHOW_DELAY          = 700,
      TOOLTIP_HIDE_DELAY          = 100;


  styleLabelTooltips();
  var sliders = new sliderGroup();
  sliders.setHandlers();
  sliders.updateValues();
  var sliderOptions = new sliderControl(sliders);
  sliderOptions.configureHandlers();

  /*
  * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
  * for helping to resolve this.
  */
  var loadGrn = function (url, name, formData) {
    // The presence of formData is taken to indicate a POST.
    var fullUrl = $("#service-root").val() + url;
    (formData ?
      $.ajax({
        url: fullUrl,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        crossDomain: true
      }) :
      $.getJSON(fullUrl)
    ).done(function (network) {
      console.log(network); // Display the network in the console
      $("#graph-metadata").html(network.genes.length + " nodes<br>" + network.links.length + " edges");

      if(network.warnings.length > 0) {
        displayWarnings(network.warnings);
      }
      $("#fileName").text(name); // Set the name of the file to display in the top bar
      $("input[type='range']").off("input"); // I have no idea why I do this. Investigate later.
      // If more things need to be turned off, we'll add them to this array
      var disable = [ "#resetSliders", "#resetSlidersMenu", "#undoReset", "#undoResetMenu" ]
      for(var i = 0; i < disable.length; i++) {
        $(disable[i]).off("click");
      }
      previousFile = [url, name, formData]; // Store info about the previous file for use in reload
      drawGraph(network.genes, network.links, network.positiveWeights, network.negativeWeights, {
        linkSlider: "#linkDistInput",
        chargeSlider: "#chargeInput",
        chargeDistSlider: "#chargeDistInput",
        gravitySlider: "#gravityInput",
        resetSliderButton: "#resetSliders",
        resetSliderMenu: "#resetSlidersMenu",
        undoResetButton: "#undoReset",
        undoResetMenu: "#undoResetMenu"
      }, network.sheetType, network.warnings);
    }).error(function (xhr, status, error) {
      var err = JSON.parse(xhr.responseText), 
          errorString = "Your graph failed to load.<br><br>";
      $("#upload").val(""); // De-select the bad file.
      if (err.errors == undefined) { // will be undefined if an error was thrown before the network was generated 
        errorString += err;
      } else {
        var errorArray = err.errors;
        for(var i = 0; i < errorArray.length; i++) {
          errorString += errorArray[i].possibleCause + " " + errorArray[i].suggestedFix + "<br><br>";
        }
      }
      $("#error").html(errorString);
      $("#errorModal").modal("show");
    });
  };

  $("#upload").on("change", function (event) {
    // In google chrome, the value returned from the file input will be C:\fakepath\filename. This while loop
    // will remove the C:\fakepath\ so that it only displays the file name in the navigation bar.
    var $upload = $(this),
        fullFilePath = $upload.val(),
        fakePathCheck = fullFilePath.search("\\\\") + 1; // 4 \"s enables it to search for a slash character without error

    // fakePathCheck will return -1 when the character is not found, so will only be -1 when all slashes are gone
    while (fakePathCheck != 0) { 
      fullFilePath = fullFilePath.substring(fakePathCheck);
      fakePathCheck = fullFilePath.search("\\\\") + 1;
    }
    reload = ["", ""];

    var formData = new FormData();
    formData.append("file", $upload[0].files[0]);
    loadGrn("/upload", fullFilePath, formData);

    if (window.ga) {
        window.ga("send", "pageview", {
            page: "/GRNsight/upload",
            sessionControl: "start"
        });
    }

    event.preventDefault();
  });

  var displayWarnings = function (warnings) {
    $("#warningIntro").html("There were " + warnings.length + " warning(s) detected in this file. " + 
      "It is possible that these warnings are the result of extraneous data outside of the matrix, but " + 
      "we recommend you review your file and ensure that it is formatted correctly. The graph will be loaded, " +
      "but may not be displayed accurately. To view the details " + 
      "of the warning(s), please click on the \"Warnings List\" below.");

    var warningsString = "";
    for(var i = 0; i < warnings.length; i++) {
      warningsString += warnings[i].errorDescription + " <br><br>";
    }
    $("#warningsList").html(warningsString);

    var screenHeight = $(window).height();
    var MIN_SCREEN_HEIGHT = 600;
    var BORDER = 425;
    var setPanel = screenHeight-BORDER+"px";
    var minPanel = MIN_SCREEN_HEIGHT-BORDER+"px";
    if (screenHeight > MIN_SCREEN_HEIGHT) {
      $("#list-frame").css({height: setPanel});
    } else {
      $("#list-frame").css({height: minPanel});
    }


    $("#warningsModal").modal("show");
  }

  $("#warningsModal").on("hidden.bs.modal", function() {
    if( $("#warningsInfo").hasClass("in") ) {
      $("#warningsInfo").removeClass("in");
    }
  });

  var previousFile = ["/upload", "", undefined];
  $("#reload").click(function (event) {
    if(!$(".startDisabled").hasClass("disabled")) { 
      if(reload[0] === "") {
        loadGrn(previousFile[0], previousFile[1], previousFile[2]);
      } else {
        loadGrn(reload[0], reload[1]);
      }
    }
  });

  function demoFiles (arrayOfDemos) {
    this.demos = arrayOfDemos;

    //this.setHandlers()
  }

  var reload = ["", ""];
  $("#unweighted").click(function (event) {
    loadDemo("/demo/unweighted", "Demo #1: Unweighted GRN (21 genes, 50 edges)");
  });

  $("#weighted").click(function (event) {
    loadDemo("/demo/weighted", "Demo #2: Weighted GRN (21 genes, 50 edges, Dahlquist Lab unpublished data)");
  });

  $("#schadeInput").click(function (event) {
    loadDemo("/demo/schadeInput", "Demo #3: Unweighted GRN (21 genes, 31 edges)");
  });

  $("#schadeOutput").click(function (event) {
    loadDemo("/demo/schadeOutput", "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)");
  });

  var loadDemo = function(url, name) {
    loadGrn(url, name);
    reload = [url, name];
    $("#upload").val("");
  };

  $(".deselectedColoring").click(function (event) {
    colorPreferences(event);
  });

  var colorPreferences = function(event) {
    var deselectedID = "#" + $(".deselectedColoring").attr("id");
    var selectedID = "#" + $(".selectedColoring").attr("id");
    $(deselectedID + ">span").attr("class", "glyphicon glyphicon-ok");
    $(selectedID + ">span").attr("class", "glyphicon invisible");
    // Allows the click handler to swap between the two different options
    $(deselectedID).attr("class", "selectedColoring")
                   .off("click");
    $(selectedID).attr("class", "deselectedColoring")
                 .on("click", colorPreferences);
  };
  
  $("#printGraph").click(function (event) {
    if(!$(".startDisabled").hasClass("disabled")) {
      window.print();
    }
  });

  function styleLabelTooltips () {
    $(".info").tooltip({
      placement: "top",
      delay: { show: TOOLTIP_SHOW_DELAY, hide: TOOLTIP_HIDE_DELAY }
    });
  }

  function sliderObject (sliderId, valueId, defaultVal) {
    this.sliderId = sliderId;
    this.valueId = valueId;
    this.defaultVal = defaultVal;
    this.currentVal = defaultVal;
    this.backup = defaultVal;

    this.activate = function () {
      $(this.sliderId).on("input", {slider: this}, function (event) {
        var needsAppendedZeros = (sliderId === GRAVITY_SLIDER_ID && $(this).val().length === GRAVITY_LENGTH_WITHOUT_ZERO);
        $(event.data.slider.valueId).html($(this).val() + (needsAppendedZeros ? "0" : ""));
        event.data.slider.currentVal = $(this).val();
      });
    };
  }

  function sliderGroup () {
    this.linkDistance = new sliderObject(LINK_DIST_SLIDER_ID, LINK_DIST_VALUE, LINK_DIST_DEFAULT);
    this.charge = new sliderObject(CHARGE_SLIDER_ID, CHARGE_VALUE, CHARGE_DEFAULT);
    this.chargeDistance = new sliderObject(CHARGE_DIST_SLIDER_ID, CHARGE_DIST_VALUE, CHARGE_DIST_DEFAULT);
    this.gravity = new sliderObject(GRAVITY_SLIDER_ID, GRAVITY_VALUE, GRAVITY_DEFAULT);

    this.sliders = [this.linkDistance, this.charge, this.chargeDistance, this.gravity];

    this.backupValues = function () {
      for (var i = 0; i < NUMBER_OF_SLIDERS; i++) {
        this.sliders[i].backup = this.sliders[i].currentVal;
      };
    };

    this.resetValues = function () {
      this.backupValues();
      for (var i = 0; i < NUMBER_OF_SLIDERS; i++) {
        this.sliders[i].currentVal = this.sliders[i].defaultVal;
      };
      this.updateValues();
    };

    this.undoReset = function () {
      for(var i = 0; i < NUMBER_OF_SLIDERS; i++) {
        this.sliders[i].currentVal = this.sliders[i].backup;
      }
      this.updateValues();
    }

    this.updateValues = function () {
      for (var i = 0; i < NUMBER_OF_SLIDERS; i++) {
        var needsAppendedZeros = (this.sliders[i].sliderId === GRAVITY_SLIDER_ID && this.sliders[i].currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO);
        $(this.sliders[i].sliderId).val(this.sliders[i].currentVal);
        $(this.sliders[i].valueId).html(this.sliders[i].currentVal + (needsAppendedZeros ? "0" : ""));
      };
    };

    this.setHandlers = function () {
      for(var i = 0; i < NUMBER_OF_SLIDERS; i++) {
        this.sliders[i].activate();
      }
    }

  }

  function sliderControl (sliderGroup) {
    this.slidersToEdit = sliderGroup;
    this.locked = false;

    this.configureHandlers = function () {
      $(LOCK_SLIDERS_CLASS).on("click", {handler: this}, function (event) {
        event.data.handler.toggle();
      });
      $(RESET_SLIDERS_CLASS).on("click", {handler: this}, function (event) {
        event.data.handler.slidersToEdit.resetValues();
        $(UNDO_SLIDER_RESET_CLASS).prop("disabled", false);
      });
      $(UNDO_SLIDER_RESET_CLASS).on("click", {handler: this}, function (event) {
        event.data.handler.slidersToEdit.undoReset();
        $(UNDO_SLIDER_RESET_CLASS).prop("disabled", true);
      })
    }

    this.toggle = function () {
      this.locked = !this.locked;
      console.log(this.locked);
      $(LOCK_SLIDERS_MENU_OPTION + " span").toggleClass("glyphicon-ok invisible");
      $(LOCK_SLIDERS_BUTTON).prop("checked", (this.locked) ? true : false);
      $.each(this.slidersToEdit.sliders, function (key, value) {
        $(value.sliderId).prop("disabled", !$(value.sliderId).prop("disabled"));
      })
    }
  }

});
