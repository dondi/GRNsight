import { updateApp } from "./update-app";

import {
    DEMO_INFORMATION,
    UNWEIGHTED_DEMO_PATH,
    WEIGHTED_DEMO_PATH,
    SCHADE_INPUT_PATH,
    SCHADE_OUTPUT_PATH,
    WEIGHTED_DEMO_NAME,
    UNWEIGHTED_DEMO_NAME,
    SCHADE_INPUT_NAME,
    SCHADE_OUTPUT_NAME,
    PPI_DEMO_PATH,
    PPI_DEMO_NAME,
    FORCE_GRAPH,
    NETWORK_PPI_MODE,
    NETWORK_GRN_MODE,
} from "./constants";
import { getWorkbookFromForm, getWorkbookFromUrl } from "./api/grnsight-api";

const demoFiles = [
    UNWEIGHTED_DEMO_PATH,
    WEIGHTED_DEMO_PATH,
    SCHADE_INPUT_PATH,
    SCHADE_OUTPUT_PATH,
    PPI_DEMO_PATH,
];

import { displayExportWarnings } from "./warnings.js";

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
            sessionControl: "start",
        });
    }

    $("a.upload > input[type=file]").val("");
    event.preventDefault();
};
const disableUpload = state => {
    $(".upload").attr("disabled", state);
    $(".upload-sif").attr("disabled", state);
    $(".upload-graphml").attr("disabled", state);
};

const uploadHandler = uploader => {
    return function (event) {
        // Must be `function` due to use of `this`.
        const $upload = $(this);
        const filename = submittedFilename($upload); // TODO: remove before master release (beta@4.0.6)
        if ($upload[0].files[0].size < 2000000) {
            // disable upload button to prevent multiple uploads
            disableUpload(true);
            const formData = createFileForm($upload);
            uploader(filename, formData);
            uploadEpilogue(event);
        } else {
            let errorString =
                "The file uploaded is too large. Please try again with a file smaller than 1 MB.";
            $("#error").html(errorString);
            $("#errorModal").modal("show");
        }
    };
};

const workbookErrorDisplayer = xhr => {
    // re-enable upload button
    disableUpload(false);
    // Deleted status, error for argument because it was never used
    const err = JSON.parse(xhr.responseText);
    let errorString = "Your graph failed to load.<br><br>";

    if (!err.errors) {
        // will be falsy if an error was thrown before the workbook was generated
        errorString += err;
    } else {
        errorString = err.errors.reduce(
            (currentErrorString, currentError) =>
                `${currentErrorString}${currentError.possibleCause} ${currentError.suggestedFix}<br><br>`,

            errorString
        );
    }

    $("#error").html(errorString);
    $("#errorModal").modal("show");
};

let reloader = () => {};

const returnUploadRoute = filename => {
    if (demoFiles.indexOf(filename) !== -1) {
        return filename;
    } else if (filename.includes(".xlsx")) {
        return "upload";
    } else if (filename.includes(".sif")) {
        return "upload-sif";
    } else if (filename.includes(".graphml")) {
        return "upload-graphml";
    }
};

export const setupLoadAndImportHandlers = grnState => {
    const loadGrn = (name, formData) => {
        const uploadRoute = returnUploadRoute(name);
        grnState.workbookType = uploadRoute;
        // The presence of formData is taken to indicate a POST.
        getWorkbookFromForm(formData, uploadRoute)
            .done((workbook, textStatus, jqXhr) => {
                grnState.name = name || jqXhr.getResponseHeader("X-GRNsight-Filename");
                if (demoFiles.indexOf(name) > -1) {
                    switch (name) {
                        case WEIGHTED_DEMO_PATH:
                            grnState.name = WEIGHTED_DEMO_NAME;
                            break;
                        case UNWEIGHTED_DEMO_PATH:
                            grnState.name = UNWEIGHTED_DEMO_NAME;
                            break;
                        case SCHADE_INPUT_PATH:
                            grnState.name = SCHADE_INPUT_NAME;
                            break;
                        case SCHADE_OUTPUT_PATH:
                            grnState.name = SCHADE_OUTPUT_NAME;
                            break;
                        case PPI_DEMO_PATH:
                            grnState.name = PPI_DEMO_NAME;
                            break;
                    }
                }
                grnState.workbook = workbook;
                if (grnState.name.includes(".sif")) {
                    grnState.mode = workbook.workbookType;
                } else if (grnState.name.includes(".graphml")) {
                    grnState.mode = NETWORK_GRN_MODE;
                } else {
                    grnState.mode = workbook.meta.data.workbookType;
                }
                grnState.workbook.expressionNames = Object.keys(workbook.expression);

                if (grnState.workbook.warnings && grnState.workbook.warnings.length > 0) {
                    displayExportWarnings(workbook.warnings);
                }

                if (uploadRoute !== "upload") {
                    grnState.annotateLinks();
                }
                reloader = () => loadGrn(name, formData);
                // re-enable upload button
                disableUpload(false);
                updateApp(grnState);
                // displayStatistics(workbook);
            })
            .error(workbookErrorDisplayer);
    };
    /*
     * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
     * for helping to resolve this.
     */

    $("body").on("change", ".upload", uploadHandler(loadGrn));

    const loadDemo = (url, value) => {
        $("#demoSourceDropdown option[value='" + value.substring(1) + "']").prop("selected", true);
        loadGrn(url);
        reloader = () => loadGrn(url);
        grnState.graphLayout = FORCE_GRAPH;
        $("a.upload > input[type=file]").val("");
    };

    const initializeDemoFile = (demoClass, demoPath, demoName) => {
        $(".dropdown-menu li a").on("click", event => {
            const selected = event.target.dataset.expression;
            if (`.${selected}` === demoClass) {
                loadDemo(demoPath, demoClass, demoName);
                grnState.demoDropdownValue = selected;
            }
        });
        $("#demoSourceDropdown").on("change", () => {
            const selected = `.${$("#demoSourceDropdown").val()}`;
            if (selected === demoClass) {
                loadDemo(demoPath, demoClass, demoName);
                grnState.demoDropdownValue = selected;
            }
        });
    };

    DEMO_INFORMATION.forEach(demoInfo => initializeDemoFile.apply(null, demoInfo));

    $("body").on("click", ".reload", function () {
        // Deleted `event` parameter but need `function` because of `this`.
        if (!$(this).parent().hasClass("disabled")) {
            if ($.isFunction(reloader)) {
                reloader();
            }
        }
    });
};

export const responseCustomWorkbookData = (grnState, queryURL, name) => {
    const uploadRoute = queryURL;
    getWorkbookFromUrl(uploadRoute).done(workbook => {
        if (workbook.meta.data.workbookType === NETWORK_PPI_MODE) {
            grnState.mode = workbook.meta.data.workbookType;
        } else {
            grnState.mode = NETWORK_GRN_MODE;
        }
        grnState.name = name;
        grnState.workbook = workbook;
        grnState.demoDropdownValue = null;
        // Reset the node coloring dataset selection
        grnState.nodeColoring.topDataset = grnState.defaultDataset;
        grnState.nodeColoring.bottomDataset = grnState.defaultDataset;
        grnState.annotateLinks();
        disableUpload(false);
        updateApp(grnState);
        reloader = () => responseCustomWorkbookData(grnState, queryURL, name);
    });
};
