export var displayExportWarnings = function (warnings) {
    displayWarnings(warnings);
};

export var displayGraphWarnings = function (warnings) {
    var additionalWarningIntro =
        "The graph will be loaded, but may not be displayed accurately. Please note that this file may not export properly if this error remains in the workbook. We recommend you review your file and ensure that it is formatted correctly. ";
    displayWarnings(warnings, additionalWarningIntro);
};

export var displayWarnings = function (warnings, additionalWarningIntro = "") {
    $("#warningIntro").html(`
        There were ${warnings.length} warning(s) detected in this file. ${additionalWarningIntro}To view the details of the warning(s), please click on the "Warnings List" below.
    `);
    var warningsString = "";
    var NUM_POSSIBLE_WARNINGS = 11;
    var warningCounts = {};
    var index = 0;
    // Fill printed with 0s programatically
    var printed = [];
    for (var i = 0; i < NUM_POSSIBLE_WARNINGS; i++) {
        printed.push(0);
    }

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
                warningsString +=
                    "<i> " +
                    (+warningCount.length - 3) +
                    " more warning(s) like this exist. </i> <br><br>";
                break;
            }
        }
    };

    for (let warning of warnings) {
        warningCounts[warning.warningCode] = warningCounts[warning.warningCode]
            ? [...warningCounts[warning.warningCode], warning]
            : [warning];
    }

    for (let warning in warningCounts) {
        createWarningsString(warningCounts[warning], index);
        index++;
    }

    $("#warningsList").html(warningsString);

    showWarningsModal();
};

export var displayPPINodeColorWarning = function (warningDisplayed) {
    if (warningDisplayed) {
        return;
    }

    $("#warningIntro").html("Protein-protein interaction node coloring warning.");
    $("#warningsList").html(
        [
            "You are displaying mRNA-level expression data on a protein-protein interaction network.",
            "Please note that this may not be the most appropriate representation of the data.",
        ].join(" ")
    );

    showWarningsModal();
};

var showWarningsModal = function () {
    var screenHeight = $(window).height();
    var MIN_SCREEN_HEIGHT = 600;
    var BORDER = 425;
    var setPanel = screenHeight - BORDER + "px";
    var minPanel = MIN_SCREEN_HEIGHT - BORDER + "px";
    if (screenHeight > MIN_SCREEN_HEIGHT) {
        $("#list-frame").css({ height: setPanel, overflow: "auto" });
    } else {
        $("#list-frame").css({ height: minPanel, overflow: "auto" });
    }

    $("#warningsModal").modal("show");
};
