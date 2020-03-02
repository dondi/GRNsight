export var displayWarnings = function (warnings) {
    $("#warningIntro").html("There were " + warnings.length + " warning(s) detected in this file. " +
      "The graph will be loaded, but may not be displayed accurately. " +
      "We recommend you review your file and ensure that it is formatted correctly. " +
      "To view the details of the warning(s), please click on the \"Warnings List\" below.");
    var warningsString = "";
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
    var missingExpressionSheetWarningCount = warnings.filter(function (x) {
        return x.warningCode === "MISSING_EXPRESSION_SHEET";
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
    createWarningsString(missingExpressionSheetWarningCount, 11);

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
