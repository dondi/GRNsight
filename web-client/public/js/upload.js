export const upload = function (sliderObject, sliderGroupController, drawGraph, nodeColoringController) {
  // Slider Values
    var LINK_DIST_SLIDER_ID   = "#linkDistInput";
    var LINK_DIST_VALUE       = "#linkDistVal";
    var LINK_DIST_DEFAULT     = 500;
    var CHARGE_SLIDER_ID      = "#chargeInput";
    var CHARGE_VALUE          = "#chargeVal";
    var CHARGE_DEFAULT        = -50;
    var TOOLTIP_SHOW_DELAY    = 700;
    var TOOLTIP_HIDE_DELAY    = 100;

  // Demo Stuff
    var UNWEIGHTED_DEMO_ID   = "#unweighted";
    var UNWEIGHTED_DEMO_PATH = "demo/unweighted";
    var UNWEIGHTED_DEMO_NAME = "Demo #1: Unweighted GRN (21 genes, 50 edges)";
    var WEIGHTED_DEMO_ID     = "#weighted";
    var WEIGHTED_DEMO_PATH   = "demo/weighted";
    var WEIGHTED_DEMO_NAME   = "Demo #2: Weighted GRN (21 genes, 50 edges, Dahlquist Lab unpublished data)";
    var SCHADE_INPUT_ID      = "#schadeInput";
    var SCHADE_INPUT_PATH    = "demo/schadeInput";
    var SCHADE_INPUT_NAME    = "Demo #3: Unweighted GRN (21 genes, 31 edges)";
    var SCHADE_OUTPUT_ID     = "#schadeOutput";
    var SCHADE_OUTPUT_PATH   = "demo/schadeOutput";
    var SCHADE_OUTPUT_NAME   = "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)";

  // Settings Stuff
    var COLOR_PREFERENCES_CLASS = ".colorPreferences";
    var ACTIVE_COLOR_OPTION     = "active";

  // Weights Stuff
    var WEIGHTS_SHOW_MOUSE_OVER_MENU  = "#weightsMouseOverMenu";
    var WEIGHTS_SHOW_ALWAYS_MENU      = "#weightsAlwaysMenu";
    var WEIGHTS_HIDE_MENU             = "#weightsNeverMenu";
    var WEIGHTS_SHOW_MOUSE_OVER_SIDE  = "#weightsMouseOverSide";
    var WEIGHTS_SHOW_ALWAYS_SIDE      = "#weightsAlwaysSide";
    var WEIGHTS_HIDE_SIDE             = "#weightsNeverSide";
    var WEIGHTS_SHOW_MOUSE_OVER_CLASS = ".weightsMouseOver";
    var WEIGHTS_SHOW_ALWAYS_CLASS     = ".weightsAlways";
    var WEIGHTS_HIDE_CLASS            = ".weightsNever";

    var styleLabelTooltips = function () {
        $(".info").tooltip({
            placement: "top",
            delay: { show: TOOLTIP_SHOW_DELAY, hide: TOOLTIP_HIDE_DELAY }
        });
    };

    styleLabelTooltips();

    var nodeColoring = nodeColoringController;
    nodeColoring.configureNodeColoringHandlers();
    nodeColoring.initialize();

    var linkDistanceSlider = new sliderObject(LINK_DIST_SLIDER_ID, LINK_DIST_VALUE, LINK_DIST_DEFAULT, false);
    var chargeSlider = new sliderObject(CHARGE_SLIDER_ID, CHARGE_VALUE, CHARGE_DEFAULT, false);
    var sliders = new sliderGroupController([chargeSlider, linkDistanceSlider]);
    sliders.setSliderHandlers();
    sliders.updateValues();
    sliders.configureSliderControllers();

    var currentNetwork = null;

    var displayWarnings = function (warnings) {
        $("#warningIntro").html("There were " + warnings.length + " warning(s) detected in this file. " +
      "The graph will be loaded, but may not be displayed accurately. " +
      "We recommend you review your file and ensure that it is formatted correctly. " +
      "To view the details of the warning(s), please click on the \"Warnings List\" below.");

        var warningsString = "";
    // printed = [MISSING_SOURCE,MISSING_TARGET,INVALID_DATA,RANDOM_DATA,
    // EMPTY_ROW,INVALID_NETWORK_SIZE,INVALID_CELL_DATA_TYPE]

        var NUM_POSSIBLE_WARNINGS = 11;

    // Fill printed with 0s programatically
        var printed = [];
        for (var i = 0; i < NUM_POSSIBLE_WARNINGS; i++) {
            printed.push(0);
        }

        var missingSourceCount = warnings.filter(function (x) {
            return x.warningCode === "MISSING_SOURCE";
        });
        var missingTargetCount = warnings.filter(function (x) {
            return x.warningCode === "MISSING_TARGET";
        });
        var invalidDataCount = warnings.filter(function (x) {
            return x.warningCode === "INVALID_DATA";
        });
        var randomDataCount = warnings.filter(function (x) {
            return x.warningCode === "RANDOM_DATA";
        });
        var emptyRowCount = warnings.filter(function (x) {
            return x.warningCode === "EMPTY_ROW";
        });
        var invalidNetworkSizeCount = warnings.filter(function (x) {
            return x.warningCode === "INVALID_NETWORK_SIZE";
        });
        var extraneousDataCount = warnings.filter(function (x) {
            return x.warningCode === "EXTRANEOUS_DATA";
        });
        var edgesWithoutWeightsCount = warnings.filter(function (x) {
            return x.warningCode === "EDGES_WITHOUT_WEIGHTS";
        });
        var edgeDefaultNotDirectedCount = warnings.filter(function (x) {
            return x.warningCode === "EDGE_DEFAULT_NOT_DIRECTED";
        });
        var sifFormatWarningCount = warnings.filter(function (x) {
            return x.warningCode === "SIF_FORMAT_WARNING";
        });
        var incorrectlyNamedSheetWarningCount = warnings.filter(function (x) {
            return x.warningCode === "INCORRECTLY_NAMED_SHEET";
        });

        var appendWarning = function (warning) {
            warningsString += warning.errorDescription + "<br><br>";
        };

        var createWarningsString = function (warningCount, index) {
            for (var i = 0; i < warningCount.length; i++) {
                if (warningCount.length <= 3) {
                    appendWarning(warningCount[i]);
                } else if (printed[index] < 3) {
                    appendWarning(warningCount[i]);
                    printed[index]++;
                } else {
                    warningsString += "<i> " + (+warningCount.length - 3) +
                    " more warning(s) like this exist. </i> <br><br>";
                    break;
                }
            }
        };

        createWarningsString(missingSourceCount, 0);
        createWarningsString(missingTargetCount, 1);
        createWarningsString(invalidDataCount, 2);
        createWarningsString(randomDataCount, 3);
        createWarningsString(emptyRowCount, 4);
        createWarningsString(invalidNetworkSizeCount, 5);
        createWarningsString(extraneousDataCount, 6);
        createWarningsString(edgesWithoutWeightsCount, 7);
        createWarningsString(edgeDefaultNotDirectedCount, 8);
        createWarningsString(sifFormatWarningCount, 9);
        createWarningsString(incorrectlyNamedSheetWarningCount, 10);

        $("#warningsList").html(warningsString);

        var screenHeight = $(window).height();
        var MIN_SCREEN_HEIGHT = 600;
        var BORDER = 425;
        var setPanel = (screenHeight - BORDER) + "px";
        var minPanel = (MIN_SCREEN_HEIGHT - BORDER) + "px";
        if (screenHeight > MIN_SCREEN_HEIGHT) {
            $("#list-frame").css({height: setPanel});
        } else {
            $("#list-frame").css({height: minPanel});
        }

        $("#warningsModal").modal("show");
    };

    var displayNetwork = function (network, name) {
        nodeColoring.reload(network, name);
        if (document.getElementById("zoomSlider").disabled) {
            document.getElementById("zoomSlider").disabled = false;
        }

        currentNetwork = network;
        console.log("Network: ", network); // Display the network in the console
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
        drawGraph(network, sliders, nodeColoring);
    };

    var networkErrorDisplayer = function (xhr) {
        // Deleted status, error for argument because it was never used
        var err = JSON.parse(xhr.responseText);
        var errorString = "Your graph failed to load.<br><br>";

        if (!err.errors) { // will be falsy if an error was thrown before the network was generated
            errorString += err;
        } else {
            console.log(err.errors);
            errorString = err.errors.reduce(function (currentErrorString, currentError) {
                return currentErrorString + currentError.possibleCause + " " + currentError.suggestedFix + "<br><br>";
            }, errorString);
        }

        $("#error").html(errorString);
        $("#errorModal").modal("show");
    };

    var reloader = function () { };

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
        displayNetwork(network, name || jqXhr.getResponseHeader("X-GRNsight-Filename"));
        reloader = function () {
            loadGrn(url, name, formData);
        };
      // displayStatistics(network);
    }).error(networkErrorDisplayer);
    };

    var loadDemo = function (url) {
        loadGrn(url);
        reloader = function () {
            loadGrn(url);
        };

        $("a.upload > input[type=file]").val("");
    };

    var initializeDemoFile = function (demoId, demoPath, demoName) {
        $(demoId).on("click", function () {
            // Deleted parameter event
            loadDemo(demoPath, demoName);
        });
    };

    var demoInformation = [ [ WEIGHTED_DEMO_ID,   WEIGHTED_DEMO_PATH,   WEIGHTED_DEMO_NAME   ],
                          [ UNWEIGHTED_DEMO_ID, UNWEIGHTED_DEMO_PATH, UNWEIGHTED_DEMO_NAME ],
                          [ SCHADE_INPUT_ID,    SCHADE_INPUT_PATH,    SCHADE_INPUT_NAME    ],
                          [ SCHADE_OUTPUT_ID,   SCHADE_OUTPUT_PATH,   SCHADE_OUTPUT_NAME   ] ];
    demoInformation.forEach(function (demoInfo) {
        initializeDemoFile.apply(null, demoInfo);
    });

    var settingsController = function () {
        this.color = true;

        this.setupSettingsHandlers = function () {
            $(COLOR_PREFERENCES_CLASS).on("click", function () {
                $(COLOR_PREFERENCES_CLASS).toggleClass(ACTIVE_COLOR_OPTION);
                $(COLOR_PREFERENCES_CLASS + ">span").toggleClass("glyphicon-ok invisible");
            });
        };
    };

    var settings = new settingsController();
    settings.setupSettingsHandlers();

    var lockForce = function (disable) {
        $("#linkDistInput").prop("disabled", disable);
        $("#chargeInput").prop("disabled", disable);
        $("#resetSlidersButton").prop("disabled", disable);
        $("#lockSlidersButton").prop("checked", disable);
    };

    var toggleLayout = function (on, off) {
        if (!$(on).prop("checked")) {
            $(on).prop("checked", true);
            $(off).prop("checked", false);
            $(off + " span").removeClass("glyphicon-ok");
            $(on + " span").addClass("glyphicon-ok");
            if (on === "#gridLayout") {
                lockForce(true);
                $("#lockSlidersMenu").parent().addClass("disabled");
                $("#resetSlidersMenu").parent().addClass("disabled");
                $("#link-distance").parent().addClass("disabled");
                $("#charge").parent().addClass("disabled");
            } else {
                lockForce(false);
                $("#lockSlidersMenu").parent().removeClass("disabled");
                $("#resetSlidersMenu").parent().removeClass("disabled");
                $("#link-distance").parent().removeClass("disabled");
                $("#charge").parent().removeClass("disabled");
            }
            if (!$(on).hasClass("called")) {
                $("#gridLayoutButton").trigger("click");
            }
        }
    };

    $("#gridLayout").on("click", function () {
        toggleLayout("#gridLayout", "#forceGraph");
    });

    $("#forceGraph").on("click", function () {
        toggleLayout("#forceGraph", "#gridLayout");
    });

  // TODO: Make this less bad
    $("#upload-sif").on("click", function () {
        // deleted event parameter
        $("#launchFileOpen").off("click").on("click", function () {
            $("#upload-sif").click();
        });
    });
    $("#upload-graphml").on("click", function () {
        // deleted event parameter
        $("#launchFileOpen").off("click").on("click", function () {
            $("#upload-graphml").click();
        });
    });
    $("#upload").on("click", function () {
        // deleted event parameter
        $("#launchFileOpen").off("click").on("click", function () {
            $("#upload").click();
        });
    });

    $("#printGraph").on("click", function () {
        if (!$(".startDisabled").hasClass("disabled")) {
            window.print();
        }
    });

  // Style of the tooltips when the user mouses over the label names
    $(".info").tooltip({
        placement: "top",
        delay: { show: 700, hide: 100 }
    });

    // Normalization Controller
    var MIN_EDGE_WEIGHT_NORMALIZATION = 0.0001;
    var MAX_EDGE_WEIGHT_NORMALIZATION = 1000;

    var valueValidator = function (min, max, value) {
        return Math.min(max, Math.max(min, value));
    };

    var edgeWeightNormalizationInputValidation = function (value) {
        return value === "" ? "" : valueValidator(MIN_EDGE_WEIGHT_NORMALIZATION, MAX_EDGE_WEIGHT_NORMALIZATION, value);
    };

    var synchronizeNormalizationValues = function (value) {
        var validated = edgeWeightNormalizationInputValidation(value);
        $("#normalization-max").val(validated);
        $("#edge-weight-normalization-factor-menu").val(validated);
        drawGraph(currentNetwork, sliders, nodeColoring);
    };

    $("#normalization-button").click(function () {
        synchronizeNormalizationValues($("#normalization-max").val());
    });

    $("#reset-normalization-factor-menu, #resetNormalizationButton").click(function () {
        synchronizeNormalizationValues("");
    });

    $("#edge-weight-normalization-factor-menu").on("change", function () {
        synchronizeNormalizationValues($("#edge-weight-normalization-factor-menu").val());
    });

    var GREY_EDGE_THRESHOLD_MENU = "#gray-edge-threshold-menu";
    var GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR = "#grayThresholdInput";
    var GREY_EDGE_THRESHOLD_TEXT_SIDEBAR = "#grayThresholdValue";

    // Gray Edge Controller

    var grayEdgeInputValidator = function (value) {
        return valueValidator(0, 100, value);
    };

    var updateGrayEdgeValues = function (value) {
        var validatedInput = grayEdgeInputValidator(value);
        $(GREY_EDGE_THRESHOLD_TEXT_SIDEBAR).text(validatedInput + "%");
        $(GREY_EDGE_THRESHOLD_MENU).val(validatedInput);
        $(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).val(validatedInput / 100);
        drawGraph(currentNetwork, sliders, nodeColoring);
    };

    $(GREY_EDGE_THRESHOLD_MENU).on("change", function () {
        var value = Math.round(($(GREY_EDGE_THRESHOLD_MENU).val()));
        updateGrayEdgeValues(value);
    });

    $(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).on("change", function () {
        var value = Math.round(($(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).val() * 100));
        updateGrayEdgeValues(value);
    });

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
                // link.stroke = "MediumVioletRed";   // GRNsight v1 magenta edge color
                link.stroke = "rgb(195, 61, 61)";     // Node coloring-consistent red edge color
                network.positiveWeights.push(link.value);
            } else {
                link.type = "repressor";
                // link.stroke = "DarkTurquoise";     // GRNsight v1 cyan edge color
                link.stroke = "rgb(51, 124, 183)";    // Node coloring-consistent blue edge color
                network.negativeWeights.push(link.value);
            }
        });
    };

  /*
   * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
   * for helping to resolve this.
   */

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
        }).error(networkErrorDisplayer);
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

    $("#warningsModal").on("hidden.bs.modal", function () {
        if ($("#warningsInfo").hasClass("in")) {
            $("#warningsInfo").removeClass("in");
        }
    });

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).click(function () {
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

    $(WEIGHTS_SHOW_ALWAYS_CLASS).click(function () {
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

    $(WEIGHTS_HIDE_CLASS).click(function () {
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

    $("#printGraph").click(function () {
        // Deleted event parameter
        if (!$(this).parent().hasClass("disabled")) {
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
        return function () {
            // Deleted event parameter
            if (!$(this).parent().hasClass("disabled")) {
                var networkToExport = flattenNetwork(currentNetwork, sheetType);
                var networkFilename = filenameWithExtension(sheetType !== currentNetwork.sheetType ?
                    sheetType : "", extension);
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

    $("#reload").click(function () {
        // Deleted event parameter
        if (!$(this).parent().hasClass("disabled")) {
            if ($.isFunction(reloader)) {
                reloader();
            }
        }
    });

    // Prevent Bootstrap dropdown from closing on clicks in menu input boxes
    // https://stackoverflow.com/a/27759926
    $(".dropdown").on({
        "click": function (event) {
            if ($(event.target).hasClass("keepopen")) {
                $(this).data("closable", $(event.target).closest(".dropdown-toggle").length !== 0);
            }
        },
        "hide.bs.dropdown": function () {
            var hide = $(this).data("closable");
            $(this).data("closable", true);
            return hide;
        }
    });

};
