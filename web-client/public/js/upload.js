$(function () {

  // Slider Values
  var NUMBER_OF_SLIDERS     = 4,
      LINK_DIST_SLIDER_ID   = "#linkDistInput",
      LINK_DIST_VALUE       = "#linkDistVal",
      LINK_DIST_DEFAULT     = 500,
      CHARGE_SLIDER_ID      = "#chargeInput",
      CHARGE_VALUE          = "#chargeVal",
      CHARGE_DEFAULT        = -1000,
      CHARGE_DIST_SLIDER_ID = "#chargeDistInput",
      CHARGE_DIST_VALUE     = "#chargeDistVal",
      CHARGE_DIST_DEFAULT   = 1000,
      GRAVITY_SLIDER_ID     = "#gravityInput",      
      GRAVITY_VALUE         = "#gravityVal",      
      GRAVITY_DEFAULT       = 0.1,
      TOOLTIP_SHOW_DELAY    = 700,
      TOOLTIP_HIDE_DELAY    = 100;

  // Demo Stuff
  var UNWEIGHTED_DEMO_ID   = "#unweighted",
      UNWEIGHTED_DEMO_PATH = "/demo/unweighted",
      UNWEIGHTED_DEMO_NAME = "Demo #1: Unweighted GRN (21 genes, 50 edges)",
      WEIGHTED_DEMO_ID     = "#weighted",
      WEIGHTED_DEMO_PATH   = "/demo/weighted",
      WEIGHTED_DEMO_NAME   = "Demo #2: Weighted GRN (21 genes, 50 edges, Dahlquist Lab unpublished data)",
      SCHADE_INPUT_ID      = "#schadeInput",
      SCHADE_INPUT_PATH    = "/demo/schadeInput",
      SCHADE_INPUT_NAME    = "Demo #3: Unweighted GRN (21 genes, 31 edges)",
      SCHADE_OUTPUT_ID     = "#schadeOutput",
      SCHADE_OUTPUT_PATH   = "/demo/schadeOutput",
      SCHADE_OUTPUT_NAME   = "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)";

  // Settings Stuff
  var COLOR_PREFERENCES_CLASS = ".colorPreferences",
      ACTIVE_COLOR_OPTION     = "active";

  styleLabelTooltips();
  var linkDistanceSlider = new sliderObject(LINK_DIST_SLIDER_ID, LINK_DIST_VALUE, LINK_DIST_DEFAULT, false);
  var chargeSlider = new sliderObject(CHARGE_SLIDER_ID, CHARGE_VALUE, CHARGE_DEFAULT, false);
  var chargeDistanceSlider = new sliderObject(CHARGE_DIST_SLIDER_ID, CHARGE_DIST_VALUE, CHARGE_DIST_DEFAULT, false);
  var gravitySlider = new sliderObject(GRAVITY_SLIDER_ID, GRAVITY_VALUE, GRAVITY_DEFAULT, true);
  var sliders = new sliderGroupController([linkDistanceSlider, chargeSlider, chargeDistanceSlider, gravitySlider]);
  sliders.setSliderHandlers();
  sliders.updateValues();
  sliders.configureSliderControllers();

  var demoInformation = [ [ WEIGHTED_DEMO_ID,   WEIGHTED_DEMO_PATH,   WEIGHTED_DEMO_NAME   ],
                          [ UNWEIGHTED_DEMO_ID, UNWEIGHTED_DEMO_PATH, UNWEIGHTED_DEMO_NAME ],
                          [ SCHADE_INPUT_ID,    SCHADE_INPUT_PATH,    SCHADE_INPUT_NAME    ],
                          [ SCHADE_OUTPUT_ID,   SCHADE_OUTPUT_PATH,   SCHADE_OUTPUT_NAME   ] ];
  demoInformation.forEach(function (demoInfo) {
    initializeDemoFile.apply(null, demoInfo);
  });

  var settings = new settingsController();
  settings.setupSettingsHandlers();
  
  $("#printGraph").on("click", function () {
    if(!$(".startDisabled").hasClass("disabled")) {
      window.print();
    }
  });

  var previousFile = {
    path: "/upload",
    name: "",
    formdata: undefined
  } 

  var reload = ["", ""];

  $("#reload").on("click", function () {
    if(!$(".startDisabled").hasClass("disabled")) { 
      if(reload[0] === "") {
        loadGrn(previousFile.path, previousFile.name, previousFile.formdata);
      } else {
        loadGrn(reload[0], reload[1]);
      }
    }
  });

  $("#upload").on("change", function (event) {
    reload = ["", ""];

    var $upload = $(this),
        fileName = $upload.val().replace(/^.*\\/, ""), // Regex removes all content before the filepath in Chrome.
        formData = new FormData();

    formData.append("file", $upload[0].files[0]);
    loadGrn("/upload", fileName, formData);

    if (window.ga) {
        window.ga("send", "pageview", {
            page: "/GRNsight/upload",
            sessionControl: "start"
        });
    }

    event.preventDefault();
  });

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
      // If more things need to be turned off, we'll add them to this array
      var disable = [ "#resetSliders", "#resetSlidersMenu", "#undoReset", "#undoResetMenu" ]
      for(var i = 0; i < disable.length; i++) {
        $(disable[i]).off("click");
      }
      previousFile = {path: url, name: name, formdata: formData}; // Store info about the previous file for use in reload
      drawGraph(network.genes, network.links, network.positiveWeights, network.negativeWeights, network.sheetType, network.warnings, sliders);
      displayStatistics(network);
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

  

  var displayWarnings = function (warnings) {
    $("#warningIntro").html("There were " + warnings.length + " warning(s) detected in this file. " + 
      "It is possible that these warnings are the result of extraneous data outside of the matrix, but " + 
      "we recommend you review your file and ensure that it is formatted correctly. The graph will be loaded, " +
      "but may not be displayed accurately. To view the details " + 
      "of the warning(s), please click on the \"Warnings List\" below.");

    var MAX_DUPLICATES = 3;
    var warningsString = "";
  //printed = [MISSING_SOURCE,MISSING_TARGET,INVALID_DATA,RANDOM_DATA,EMPTY_ROW,INVALID_NETWORK_SIZE,INVALID_CELL_DATA_TYPE]
    var printed = [0,0,0,0,0,0,0];

    var missingSourceCount = warnings.filter(function(x){return x.warningCode=="MISSING_SOURCE"});
    var missingTargetCount = warnings.filter(function(x){return x.warningCode=="MISSING_TARGET"});
    var invalidDataCount = warnings.filter(function(x){return x.warningCode=="INVALID_DATA"});
    var randomDataCount = warnings.filter(function(x){return x.warningCode=="RANDOM_DATA"});
    var emptyRowCount = warnings.filter(function(x){return x.warningCode=="EMPTY_ROW"});
    var invalidNetworkSizeCount = warnings.filter(function(x){return x.warningCode=="INVALID_NETWORK_SIZE"});
    var invalidCellDataTypeCount = warnings.filter(function(x){return x.warningCode=="INVALID_CELL_DATA_TYPE"});

    function createWarningsString(warningCount, index) {
      for (var i = 0; i < warningCount.length; i++) {        
        if (warningCount.length <= 3) {
            warningsString += warningCount[i].errorDescription + "<br><br>";
        } else if (printed[index] < 3){
            warningsString += warningCount[i].errorDescription + "<br><br>";
            printed[index]++;
        } else if (printed[index] = 3) {
            warningsString += "<i> " + (+warningCount.length-3) + " more warning(s) like this exist. </i> <br><br>";
            break;
        }
      }
    }

    createWarningsString(missingSourceCount,0);
    createWarningsString(missingTargetCount,1);
    createWarningsString(invalidDataCount,2);
    createWarningsString(randomDataCount,3);
    createWarningsString(emptyRowCount,4);
    createWarningsString(invalidNetworkSizeCount,5);
    createWarningsString(invalidCellDataTypeCount,6);

    $("#warningsList").html(warningsString);

    var screenHeight = $(window).height();
    var MIN_SCREEN_HEIGHT = 600;
    var BORDER = 425;
    var setPanel = (screenHeight - BORDER) + "px";
    var minPanel = (MIN_SCREEN_HEIGHT - BORDER) +"px";
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

  function styleLabelTooltips () {
    $(".info").tooltip({
      placement: "top",
      delay: { show: TOOLTIP_SHOW_DELAY, hide: TOOLTIP_HIDE_DELAY }
    });
  };

  function initializeDemoFile (demoId, demoPath, demoName) {
    $(demoId).on("click", function (event) {
      loadDemo(demoPath, demoName);
    });
  };

  var loadDemo = function(url, name) {
    loadGrn(url, name);
    reload = [url, name];
    $("#upload").val("");
  };

  function settingsController () {
    this.color = true;

    this.setupSettingsHandlers = function () {
      $(COLOR_PREFERENCES_CLASS).on("click", function () {
        $(COLOR_PREFERENCES_CLASS).toggleClass(ACTIVE_COLOR_OPTION);
        $(COLOR_PREFERENCES_CLASS + ">span").toggleClass("glyphicon-ok invisible")
      })
    }
  }

});
