import { updateApp } from "./update-app";

import {
    GREY_EDGES_DASHED_MENU,
    GREY_EDGES_DASHED_SIDEBAR
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

export const setupHandlers = grnState => {
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
        // Display the network in the console
        console.log(network);
        grnState.name = name || jqXhr.getResponseHeader("X-GRNsight-Filename");
        grnState.network = network;
        displayNetwork(grnState.network, grnState.name);
        reloader = function () {
            loadGrn(url, name, formData);
        };
      // displayStatistics(network);
    }).error(networkErrorDisplayer);
    };

    $("#upload").on("click", function () {
        // deleted event parameter
        $("#launchFileOpen").off("click").on("click", function () {
            $("#upload").click();
        });
    });

    $("#upload").on("change", uploadHandler("upload", loadGrn));

    $(GREY_EDGES_DASHED_SIDEBAR).change(() => {
        grnState.dashedLine = $(GREY_EDGES_DASHED_SIDEBAR).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGES_DASHED_MENU).click(() => {
        grnState.dashedLine = !$(GREY_EDGES_DASHED_MENU).prop("checked");
        updateApp(grnState);
    });
};
