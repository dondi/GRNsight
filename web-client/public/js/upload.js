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
      UNWEIGHTED_DEMO_PATH = "demo/unweighted",
      UNWEIGHTED_DEMO_NAME = "Demo #1: Unweighted GRN (21 genes, 50 edges)",
      WEIGHTED_DEMO_ID     = "#weighted",
      WEIGHTED_DEMO_PATH   = "demo/weighted",
      WEIGHTED_DEMO_NAME   = "Demo #2: Weighted GRN (21 genes, 50 edges, Dahlquist Lab unpublished data)",
      SCHADE_INPUT_ID      = "#schadeInput",
      SCHADE_INPUT_PATH    = "demo/schadeInput",
      SCHADE_INPUT_NAME    = "Demo #3: Unweighted GRN (21 genes, 31 edges)",
      SCHADE_OUTPUT_ID     = "#schadeOutput",
      SCHADE_OUTPUT_PATH   = "demo/schadeOutput",
      SCHADE_OUTPUT_NAME   = "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)";

  // Settings Stuff
  var COLOR_PREFERENCES_CLASS = ".colorPreferences",
      ACTIVE_COLOR_OPTION     = "active";

  //Weights Stuff
    var WEIGHTS_SHOW_MOUSE_OVER_MENU  = "#weightsMouseOverMenu",
        WEIGHTS_SHOW_ALWAYS_MENU      = "#weightsAlwaysMenu",
        WEIGHTS_HIDE_MENU             = "#weightsNeverMenu",
        WEIGHTS_SHOW_MOUSE_OVER_SIDE  = "#weightsMouseOverSide",
        WEIGHTS_SHOW_ALWAYS_SIDE      = "#weightsAlwaysSide",
        WEIGHTS_HIDE_SIDE             = "#weightsNeverSide",
        WEIGHTS_SHOW_MOUSE_OVER_CLASS = ".weightsMouseOver",
        WEIGHTS_SHOW_ALWAYS_CLASS     = ".weightsAlways",
        WEIGHTS_HIDE_CLASS            = ".weightsNever";

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

  var currentNetwork = null;
  var reloader = function () { };

  // Style of the tooltips when the user mouses over the label names
  $(".info").tooltip({
    placement: "top",
    delay: { show: 700, hide: 100 }
  });

  var displayNetwork = function (network, name) {
    currentNetwork = network;
    console.log(network); // Display the network in the console
    $("#graph-metadata").html(network.genes.length + " nodes<br>" + network.links.length + " edges");

    if (network.warnings.length > 0) {
      displayWarnings(network.warnings);
    }

    $("#fileName").text(name); // Set the name of the file to display in the top bar
    $("input[type='range']").off("input"); // I have no idea why I do this. Investigate later.

    // If more things need to be turned off, we'll add them to this array
    [ "#resetSliders", "#resetSlidersMenu", "#undoReset", "#undoResetMenu" ].forEach(function (selector) {
      $(selector).off("click");
    });

    drawGraph(network.genes, network.links, network.positiveWeights, network.negativeWeights, network.sheetType, network.warnings, sliders);
  };

  var annotateLinks = function (network) {
    // TODO This duplicates logic that is done on the server side for an .xlsx spreadsheet.
    //      Think of a way to consolidate it. Having discovered this, it seems like this should
    //      be done on the client side because it rearranges data redundantly, for ease of display.
    network.positiveWeights = [];
    network.negativeWeights = [];

    network.links.forEach(function (link) {
      if (network.sheetType === "unweighted" && !link.value) {
        link.value = 1;
      }

      if (link.value > 0) {
        link.type = "arrowhead";
        link.stroke = "MediumVioletRed";
        network.positiveWeights.push(link.value);
      } else {
        link.type = "repressor";
        link.stroke = "DarkTurquoise";
        network.negativeWeights.push(link.value);
      }
    });
  };

  /*
   * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
   * for helping to resolve this.
   */
  var loadGrn = function (url, name, formData) {
    // The presence of formData is taken to indicate a POST.
    var fullUrl = [ $("#service-root").val(), url ].join("/");
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
    ).done(function (network, textStatus, jqXhr) {
      console.log(network); // Display the network in the console
      displayNetwork(network, name || jqXhr.getResponseHeader('X-GRNsight-Filename'));
      reloader = function () {
        loadGrn(url, name, formData);
      };
      //displayStatistics(network);
    }).error(function (xhr, status, error) {
      var err = JSON.parse(xhr.responseText);
      var errorString = "Your graph failed to load.<br><br>";

      if (!err.errors) { // will be falsy if an error was thrown before the network was generated
        errorString += err;
      } else {
        errorString = err.errors.reduce(function (currentErrorString, currentError) {
          return currentErrorString + currentError.possibleCause + " " + currentError.suggestedFix + "<br><br>";
        }, errorString);
      }

      $("#error").html(errorString);
      $("#errorModal").modal("show");
    });
  };

  // TODO Some opportunity for unification with loadGrn?
  var importGrn = function (uploadRoute, filename, formData) {
    var fullUrl = [ $("#service-root").val(), uploadRoute ].join("/");
    $.ajax({
      url: fullUrl,
      data: formData,
      processData: false,
      contentType: false,
      type: "POST",
      crossDomain: true
    }).done(function (network) {
      annotateLinks(network);
      displayNetwork(network, filename);
      reloader = function () {
        importGrn(uploadRoute, filename, formData);
      };
    }).error(function (xhr, status, error) {
      $("#importErrorMessage").text(xhr.responseText);
      $("#importErrorModal").modal("show");
    });
  };

  var submittedFilename = function ($upload) {
    var path = $upload.val();
    var fakePathCheck = path.search("\\\\") + 1;

    while (fakePathCheck) {
      path = path.substring(fakePathCheck);
      fakePathCheck = path.search("\\\\") + 1;
    }

    return path;
  };

  var createFileForm = function ($upload) {
    var formData = new FormData();
    formData.append("file", $upload[0].files[0]);
    return formData;
  };

  var uploadEpilogue = function (event) {
    if (window.ga) {
      window.ga("send", "pageview", {
        page: "/GRNsight/upload",
        sessionControl: "start"
      });
    }

    $("a.upload > input[type=file]").val("");
    event.preventDefault();
  };

  var uploadHandler = function (uploadRoute, uploader) {
    return function (event) {
      var $upload = $(this);
      var filename = submittedFilename($upload);
      var formData = createFileForm($upload);
      uploader(uploadRoute, filename, formData);
      uploadEpilogue(event);
    };
  };

  $("#upload").on("change", uploadHandler("upload", loadGrn));
  $("#upload-sif").on("change", uploadHandler("upload-sif", importGrn));
  $("#upload-graphml").on("change", uploadHandler("upload-graphml", importGrn));

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
    var extraneousDataCount = warnings.filter(function(x){return x.warningCode=="EXTRANEOUS_DATA"});

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
    createWarningsString(extraneousDataCount,6);

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

  $("#warningsModal").on("hidden.bs.modal", function () {
    if ($("#warningsInfo").hasClass("in")) {
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

  var loadDemo = function(url) {
    loadGrn(url);
    reloader = function () {
      loadGrn(url);
    };

    $("a.upload > input[type=file]").val("");
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

  $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).click(function() {
    $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").addClass("glyphicon-ok");
    $(WEIGHTS_SHOW_ALWAYS_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_HIDE_MENU + " span").removeClass("glyphicon-ok");

    $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).prop("checked", "checked");
    $(WEIGHTS_SHOW_ALWAYS_SIDE).removeProp("checked");
    $(WEIGHTS_HIDE_SIDE).removeProp("checked");

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).addClass("selected");
    $(WEIGHTS_SHOW_ALWAYS_CLASS).removeClass("selected");
    $(WEIGHTS_HIDE_CLASS).removeClass("selected");
  });

  $(WEIGHTS_SHOW_ALWAYS_CLASS).click(function() {
    $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_SHOW_ALWAYS_MENU + " span").addClass("glyphicon-ok");
    $(WEIGHTS_HIDE_MENU + " span").removeClass("glyphicon-ok");

    $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).removeProp("checked");
    $(WEIGHTS_SHOW_ALWAYS_SIDE).prop("checked", "checked");
    $(WEIGHTS_HIDE_SIDE).removeProp("checked");

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).removeClass("selected");
    $(WEIGHTS_SHOW_ALWAYS_CLASS).addClass("selected");
    $(WEIGHTS_HIDE_CLASS).removeClass("selected");
  });

  $(WEIGHTS_HIDE_CLASS).click(function() {
    $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_SHOW_ALWAYS_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_HIDE_MENU + " span").addClass("glyphicon-ok");

    $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).removeProp("checked");
    $(WEIGHTS_SHOW_ALWAYS_SIDE).removeProp("checked");
    $(WEIGHTS_HIDE_SIDE).prop("checked", "checked");

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).removeClass("selected");
    $(WEIGHTS_SHOW_ALWAYS_CLASS).removeClass("selected");
    $(WEIGHTS_HIDE_CLASS).addClass("selected");
  });
  
  $("#printGraph").click(function (event) {
    if(!$(this).parent().hasClass("disabled")) {
      window.print();
    }
  });

  var flattenNetwork = function (network, sheetType) {
    var result = $.extend(true, { }, network, { sheetType: sheetType });
    result.links.forEach(function (link) {
      link.source = link.source.index;
      link.target = link.target.index;
      delete link.weightElement;
    });
    return result;
  };

  var filenameWithExtension = function (suffix, extension) {
    var filename = $("#fileName").text();
    var currentExtension = filename.match(/\.[^\.]+$/);
    if (currentExtension && currentExtension.length) {
      filename = filename.substr(0, filename.length - currentExtension[0].length);
    }

    if (suffix) {
      filename = filename + "_" + suffix;
    }

    return filename + "." + extension;
  };

  var performExport = function (route, extension, sheetType) {
    return function (event) {
      if (!$(this).parent().hasClass("disabled")) {
        var networkToExport = flattenNetwork(currentNetwork, sheetType);
        var networkFilename = filenameWithExtension(sheetType !== currentNetwork.sheetType ? sheetType : "", extension);
        networkToExport.filename = networkFilename;

        var exportForm = $("<form></form>").attr({
          method: "POST",
          action: $("#service-root").val() + "/" + route
        }).append($("<input></input>").attr({
          type: "hidden",
          name: "filename",
          value: networkFilename
        })).append($("<input></input>").attr({
          type: "hidden",
          name: "network",
          value: JSON.stringify(networkToExport)
        }));
        $("body").append(exportForm);
        exportForm.submit();
        exportForm.remove();
      }
    };
  };

  $("#exportAsUnweightedSif").click(performExport("export-to-sif", "sif", "unweighted"));
  $("#exportAsWeightedSif").click(performExport("export-to-sif", "sif", "weighted"));
  $("#exportAsUnweightedGraphMl").click(performExport("export-to-graphml", "graphml", "unweighted"));
  $("#exportAsWeightedGraphMl").click(performExport("export-to-graphml", "graphml", "weighted"));

  $("#reload").click(function (event) {
    if (!$(this).parent().hasClass("disabled")) {
      if ($.isFunction(reloader)) {
        reloader();
      }
    }
  });
});
