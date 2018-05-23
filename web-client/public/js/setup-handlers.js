import { updateApp } from "./update-app";

import {
    GREY_EDGES_DASHED_MENU,
    GREY_EDGES_DASHED_SIDEBAR,
    DEMO_INFORMATION
} from "./constants";

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

export const setupHandlers = grnState => {
    var loadGrn = function (url, name, formData) {
        // The presence of formData is taken to indicate a POST.
        var fullUrl = [ $("#service-root").val(), url ].join("/");
        (formData ? $.ajax({
            url: fullUrl,
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            crossDomain: true
        }) : $.getJSON(fullUrl)).done(function (network, textStatus, jqXhr) {
            // Display the network in the console
            console.log(network);
            grnState.name = name || jqXhr.getResponseHeader("X-GRNsight-Filename");
            grnState.network = network;
            reloader = function () {
                loadGrn(url, name, formData);
            };

            updateApp(grnState);
            // displayStatistics(network);
        }).error(networkErrorDisplayer);
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
            grnState.name = filename;
            grnState.network = network;
            grnState.annotateLinks();

            reloader = function () {
                importGrn(uploadRoute, filename, formData);
            };

            updateApp(grnState);
        }).error(networkErrorDisplayer);
    };

    $("#upload").on("click", function () {
        // deleted event parameter
        $("#launchFileOpen").off("click").on("click", function () {
            $("#upload").click();
        });
    });

    $("#upload-sif").on("change", uploadHandler("upload-sif", importGrn));
    $("#upload-graphml").on("change", uploadHandler("upload-graphml", importGrn));

    $("#upload").on("change", uploadHandler("upload", loadGrn));

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

    DEMO_INFORMATION.forEach(function (demoInfo) {
        initializeDemoFile.apply(null, demoInfo);
    });

    $("#reload").click(function () {
        // Deleted event parameter
        if (!$(this).parent().hasClass("disabled")) {
            if ($.isFunction(reloader)) {
                reloader();
            }
        }
    });

    $(GREY_EDGES_DASHED_SIDEBAR).change(() => {
        grnState.dashedLine = $(GREY_EDGES_DASHED_SIDEBAR).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGES_DASHED_MENU).click(() => {
        grnState.dashedLine = !$(GREY_EDGES_DASHED_MENU).prop("checked");
        updateApp(grnState);
    });
};
