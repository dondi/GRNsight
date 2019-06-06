import { updateApp } from "./update-app";

import {
    DEMO_INFORMATION
} from "./constants";

const submittedFilename = $upload => {
    let path = $upload.val();
    let fakePathCheck = path.search("\\\\") + 1;

    while (fakePathCheck) {
        path = path.substring(fakePathCheck);
        fakePathCheck = path.search("\\\\") + 1;
    }

    return path;
};

const createFileForm = $upload => {
    const formData = new FormData();
    formData.append("file", $upload[0].files[0]);
    return formData;
};

const uploadEpilogue = event => {
    if (window.ga) {
        window.ga("send", "pageview", {
            page: "/GRNsight/upload",
            sessionControl: "start"
        });
    }

    $("a.upload > input[type=file]").val("");
    event.preventDefault();
};

const uploadHandler = (uploadRoute, uploader) => {
    return function (event) { // Must be `function` due to use of `this`.
        const $upload = $(this);
        const filename = submittedFilename($upload);
        if ($upload[0].files[0].size < 1000000) {
            const formData = createFileForm($upload);
            uploader(uploadRoute, filename, formData);
            uploadEpilogue(event);
        } else {
            let errorString = "The file uploaded is too large. Please try again with a file smaller than 1 MB.";
            $("#error").html(errorString);
            $("#errorModal").modal("show");
        }
    };
};

const networkErrorDisplayer = xhr => {
    // Deleted status, error for argument because it was never used
    const err = JSON.parse(xhr.responseText);
    let errorString = "Your graph failed to load.<br><br>";

    if (!err.errors) { // will be falsy if an error was thrown before the network was generated
        errorString += err;
    } else {
        console.log(err.errors);
        errorString = err.errors.reduce(
            (currentErrorString, currentError) =>
                `${currentErrorString}${currentError.possibleCause} ${currentError.suggestedFix}<br><br>`,

            errorString
        );
    }

    $("#error").html(errorString);
    $("#errorModal").modal("show");
};

let reloader = () => { };

export const setupLoadAndImportHandlers = grnState => {
    const loadGrn = (url, name, formData) => {
        // The presence of formData is taken to indicate a POST.
        const fullUrl = [ $("#service-root").val(), url ].join("/");
        (formData ? $.ajax({
            url: fullUrl,
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            crossDomain: true
        }) : $.getJSON(fullUrl)).done((network, textStatus, jqXhr) => {
            // Display the network in the console
            console.log(network);
            grnState.name = name || jqXhr.getResponseHeader("X-GRNsight-Filename");
            grnState.network = network;

            reloader = () => loadGrn(url, name, formData);

            updateApp(grnState);
            // displayStatistics(network);
        }).error(networkErrorDisplayer);
    };

    /*
     * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
     * for helping to resolve this.
     */

    // TODO Some opportunity for unification with loadGrn?
    const importGrn = (uploadRoute, filename, formData) => {
        const fullUrl = [ $("#service-root").val(), uploadRoute ].join("/");
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

            reloader = () => importGrn(uploadRoute, filename, formData);

            updateApp(grnState);
        }).error(networkErrorDisplayer);
    };

    $("#upload").click(() =>
        $("#launchFileOpen").off("click").on("click", () => $("#upload").click())
    );
    $("#upload-sif").click(() =>
        $("#launchFileOpen").off("click").on("click", () => $("#upload-sif").click())
    );
    $("#upload-graphml").click(() =>
        $("#launchFileOpen").off("click").on("click", () => $("#upload-graphml").click())
    );

    $("#upload").on("change", uploadHandler("upload", loadGrn));
    $("#upload-sif").on("change", uploadHandler("upload-sif", importGrn));
    $("#upload-graphml").on("change", uploadHandler("upload-graphml", importGrn));

    const loadDemo = url => {
        loadGrn(url);
        reloader = () => loadGrn(url);

        $("a.upload > input[type=file]").val("");
    };

    const initializeDemoFile = (demoId, demoPath, demoName) => {
        // Deleted parameter `event`
        $(demoId).on("click", () => loadDemo(demoPath, demoName));
    };

    DEMO_INFORMATION.forEach(demoInfo => initializeDemoFile.apply(null, demoInfo));

    $("#reload").click(function () {
        // Deleted `event` parameter but need `function` because of `this`.
        if (!$(this).parent().hasClass("disabled")) {
            if ($.isFunction(reloader)) {
                reloader();
            }
        }
    });
};
