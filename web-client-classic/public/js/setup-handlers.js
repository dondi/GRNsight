import { updaters } from "./graph";
import { updateApp, identifySpeciesMenu } from "./update-app";
import { saveSvgAsPng } from "save-svg-as-png";
import * as jsPDF from "jspdf";
import canvg from "canvg";

import {
    HOST_SITE,
    FORCE_GRAPH,
    GRID_LAYOUT,
    SET_NORMALIZATION_SIDEBAR,
    SET_NORMALIZATION_SIDEBAR_VALUE,
    SET_NORMALIZATION_MENU,
    RESET_NORMALIZATION_SIDEBAR,
    RESET_NORMALIZATION_MENU,
    GREY_EDGES_DASHED_MENU,
    GREY_EDGES_DASHED_SIDEBAR,
    GREY_EDGE_THRESHOLD_MENU,
    GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR,
    WEIGHTS_SHOW_MOUSE_OVER_CLASS,
    WEIGHTS_SHOW_ALWAYS_CLASS,
    WEIGHTS_HIDE_CLASS,
    SHOW_WEIGHTS_MOUSEOVER,
    SHOW_ALL_WEIGHTS,
    HIDE_ALL_WEIGHTS,
    COLOR_EDGES,
    LINK_DIST_SLIDER_SIDEBAR,
    LINK_DIST_MENU,
    CHARGE_SLIDER_SIDEBAR,
    CHARGE_MENU,
    CHARGE_DEFAULT_VALUE,
    LINK_DIST_DEFAULT_VALUE,
    LOCK_SLIDERS_CLASS,
    RESET_SLIDERS_CLASS,
    UNDO_SLIDERS_RESET_CLASS,
    FORCE_GRAPH_BUTTON,
    FORCE_GRAPH_MENU,
    GRID_LAYOUT_BUTTON,
    GRID_LAYOUT_MENU,
    NODE_COLORING_TOGGLE_CLASS,
    AVG_REPLICATE_VALS_TOP_MENU,
    AVG_REPLICATE_VALS_TOP_SIDEBAR,
    AVG_REPLICATE_VALS_BOTTOM_MENU,
    AVG_REPLICATE_VALS_BOTTOM_SIDEBAR,
    LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON,
    LOG_FOLD_CHANGE_MAX_VALUE_MENU,
    LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT,
    TOP_DATASET_SELECTION_SIDEBAR,
    BOTTOM_DATASET_SELECTION_SIDEBAR,
    TOP_DATASET_SELECTION_MENU,
    BOTTOM_DATASET_SELECTION_MENU,
    ZOOM_DISPLAY_MAXIMUM_SELECTOR,
    ZOOM_DISPLAY_MAXIMUM_VALUE,
    ZOOM_DISPLAY_MINIMUM_SELECTOR,
    ZOOM_DISPLAY_MINIMUM_VALUE,
    EXPORT_TO_PNG,
    EXPORT_TO_SVG,
    EXPORT_TO_PDF,
    SPECIES_DISPLAY,
    SPECIES_BUTTON_CRESS,
    SPECIES_BUTTON_FLY,
    SPECIES_BUTTON_HUMAN,
    SPECIES_BUTTON_MOUSE,
    SPECIES_BUTTON_NEMATODE,
    SPECIES_BUTTON_YEAST,
    VIEWPORT_FIT,
    VIEWPORT_INIT,
    VIEWPORT_OPTION_CLASS,
    VIEWPORT_OPTION_CLASS_SIDEBAR,
} from "./constants";

import { setupLoadAndImportHandlers } from "./setup-load-and-import-handlers";

export const setupHandlers = grnState => {
    setupLoadAndImportHandlers(grnState);

    var valueValidator = (min, max, value) => {
        return Math.min(max, Math.max(min, value));
    };

    const determineFileType = filename => {
        if (filename.includes(".xlsx")) {
            return ".xlsx";
        } else if (filename.includes(".sif")) {
            return ".sif";
        } else if (filename.includes(".graphml")) {
            return ".graphml";
        }
    };

    // thank you for the help https://github.com/nytimes/svg-crowbar/blob/gh-pages/svg-crowbar-2.js
    const setInlineStyles = svg => {
        var emptySvg = window.document.createElementNS("http://www.w3.org/2000/svg", "svg");
        window.document.body.appendChild(emptySvg);
        var emptySvgDeclarationComputed = getComputedStyle(emptySvg);

        const traverse = node => {
            const tree = [];
            const visit = currentNode => {
                if (currentNode && currentNode.hasChildNodes()) {
                    let child = currentNode.firstChild;
                    while (child) {
                        if (child.nodeType === 1 && child.nodeName !== "SCRIPT") {
                            tree.push(child);
                            visit(child);
                        }
                        child = child.nextSibling;
                    }
                }
            };
            visit(node);
            return tree;
        };

        const explicitlySetStyle = element => {
            const cssStyleDeclarationComputed = window.getComputedStyle(element);
            const computedStyleObj = {};

            for (let i = 0; i < cssStyleDeclarationComputed.length; i++) {
                const key = cssStyleDeclarationComputed[i];
                const value = cssStyleDeclarationComputed.getPropertyValue(key);
                if (value !== emptySvgDeclarationComputed.getPropertyValue(key)) {
                    // Don't set computed style of width and height. Makes SVG elmements disappear.
                    if (key !== "height" && key !== "width") {
                        computedStyleObj[key] = value;
                    }
                }
            }

            if (element.classList.contains("weight")) {
                computedStyleObj["visibility"] = "hidden";
            }

            if (computedStyleObj) {
                Object.assign(element.style, computedStyleObj);
            }
        };

        // hardcode computed css styles inside svg
        var allElements = traverse(svg);
        allElements.forEach(explicitlySetStyle);
    };

    const sourceAttributeSetter = svg => {
        svg.setAttribute("version", "1.1");

        svg.removeAttribute("xmlns");
        svg.removeAttribute("xlink");

        if (!svg.hasAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns")) {
            svg.setAttributeNS(
                "http://www.w3.org/2000/xmlns/",
                "xmlns",
                "http://www.w3.org/2000/svg"
            );
        }

        if (!svg.hasAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink")) {
            svg.setAttributeNS(
                "http://www.w3.org/2000/xmlns/",
                "xmlns:xlink",
                "http://www.w3.org/1999/xlink"
            );
        }
    };

    const exportSVG = (svgElement, name) => {
        let source = svgElement.cloneNode(true);

        sourceAttributeSetter(source);
        setInlineStyles(source);

        var doctype =
            '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
        var sourceString = new XMLSerializer().serializeToString(source);
        const finalSvgString = [doctype + sourceString];

        var svgUrl = window.URL.createObjectURL(
            new Blob(finalSvgString, { type: "image\/svg+xml" })
        );

        $("#exportAsSvg").attr("href", svgUrl);
        $("#exportAsSvg").attr("download", name);
    };

    const exportPDF = (svgElement, name) => {
        if (svgElement) {
            svgElement = svgElement.replace(/\r?\n|\r/g, "").trim();
        }

        let canvas = document.createElement("canvas");
        canvg(canvas, svgElement);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("l", "mm", "letter");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const svgWidth = canvas.width;
        const svgHeight = canvas.height;

        const aspectRatio = svgWidth / svgHeight;
        let scaledWidth = pdfWidth;
        // ratio = width/height --> height = width/ratio
        let scaledHeight = scaledWidth / aspectRatio;

        if (scaledHeight > pdfHeight) {
            scaledHeight = pdfHeight;
            scaledWidth = pdfHeight * aspectRatio;
        }

        pdf.addImage(
            imgData,
            "PNG",
            (pdfWidth - scaledWidth) / 2,
            (pdfHeight - scaledHeight) / 2,
            scaledWidth,
            scaledHeight
        );
        pdf.save(name);
    };

    // Grid and Force Graph Layout
    $(`${FORCE_GRAPH_MENU}, ${FORCE_GRAPH_BUTTON}`).click(() => {
        updaters.setNodesToForceGraph();
        grnState.graphLayout = FORCE_GRAPH;
        updateApp(grnState);
    });

    $(`${GRID_LAYOUT_MENU}, ${GRID_LAYOUT_BUTTON}`).click(() => {
        updaters.setNodesToGrid();
        grnState.graphLayout = GRID_LAYOUT;
        updateApp(grnState);
    });

    // Image Export
    $(EXPORT_TO_PNG).click(() => {
        var svgContainer = document.getElementById("exportContainer");
        var editedName = grnState.name.replace(determineFileType(grnState.name), "") + ".png";
        saveSvgAsPng(svgContainer, editedName, { backgroundColor: "white" });
    });

    $(EXPORT_TO_SVG).click(() => {
        var svgContainer = document.getElementById("exportContainer");
        var editedName = grnState.name.replace(determineFileType(grnState.name), "") + ".svg";
        exportSVG(svgContainer, editedName);
    });

    $(EXPORT_TO_PDF).click(() => {
        var svgContainer = document.getElementById("exportContainer").innerHTML;
        var editedName = grnState.name.replace(determineFileType(grnState.name), "") + ".pdf";
        exportPDF(svgContainer, editedName);
    });

    // Node Coloring
    const updateTopDatasetSelection = selection => {
        grnState.nodeColoring.topDataset = selection;
        if (grnState.nodeColoring.bottomDataSameAsTop) {
            grnState.nodeColoring.bottomDataset = selection;
        }
        updateApp(grnState);
    };

    const updateBottomDatasetSelection = selection => {
        grnState.nodeColoring.bottomDataset = selection;
        if (selection === "Same as Top Dataset") {
            grnState.nodeColoring.bottomDataset = grnState.nodeColoring.topDataset;
            grnState.nodeColoring.bottomDataSameAsTop = true;
        } else {
            grnState.nodeColoring.bottomDataSameAsTop = false;
            grnState.nodeColoring.bottomDataset = selection;
        }
        updateApp(grnState);
    };

    $(NODE_COLORING_TOGGLE_CLASS).click(() => {
        grnState.nodeColoring.nodeColoringEnabled = !grnState.nodeColoring.nodeColoringEnabled;
        updateApp(grnState);
    });

    $(TOP_DATASET_SELECTION_SIDEBAR).change(() => {
        const selection = $(TOP_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
        updateTopDatasetSelection(selection);
    });

    $(TOP_DATASET_SELECTION_MENU).click(event => {
        const selection = event.target.dataset.expression;
        updateTopDatasetSelection(selection);
    });
    $(AVG_REPLICATE_VALS_TOP_SIDEBAR).change(() => {
        grnState.nodeColoring.averageTopDataset = !grnState.nodeColoring.averageTopDataset;
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_TOP_MENU).click(() => {
        grnState.nodeColoring.averageTopDataset = !grnState.nodeColoring.averageTopDataset;
        updateApp(grnState);
    });

    $(BOTTOM_DATASET_SELECTION_SIDEBAR).change(() => {
        const selection = $(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
        updateBottomDatasetSelection(selection);
    });

    $(BOTTOM_DATASET_SELECTION_MENU).click(event => {
        const selection = event.target.dataset.expression;
        updateBottomDatasetSelection(selection);
    });

    $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).change(() => {
        grnState.nodeColoring.averageBottomDataset = !grnState.nodeColoring.averageBottomDataset;
        updateApp(grnState);
    });

    $(AVG_REPLICATE_VALS_BOTTOM_MENU).click(() => {
        grnState.nodeColoring.averageBottomDataset = !grnState.nodeColoring.averageBottomDataset;
        updateApp(grnState);
    });

    var logFoldChangeMaxValueValidator = value => {
        return valueValidator(0.01, 100, value);
    };

    $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON).click(() => {
        var value = logFoldChangeMaxValueValidator(
            $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT).val()
        );
        grnState.nodeColoring.logFoldChangeMaxValue = value;
        updateApp(grnState);
    });

    $(LOG_FOLD_CHANGE_MAX_VALUE_MENU).change(() => {
        var value = logFoldChangeMaxValueValidator($(LOG_FOLD_CHANGE_MAX_VALUE_MENU).val());
        grnState.nodeColoring.logFoldChangeMaxValue = value;
        updateApp(grnState);
    });

    // Sliders Code
    var linkDistValidator = value => {
        return valueValidator(1, 1000, value);
    };

    var chargeValidator = value => {
        return valueValidator(-2000, 0, value);
    };

    $(LINK_DIST_SLIDER_SIDEBAR).change(() => {
        var value = linkDistValidator($(LINK_DIST_SLIDER_SIDEBAR).val());
        grnState.linkDistanceSlider.currentVal = value;
        updateApp(grnState);
    });

    $(LINK_DIST_MENU).change(() => {
        var value = linkDistValidator($(LINK_DIST_MENU).val());
        grnState.linkDistanceSlider.currentVal = value;
        updateApp(grnState);
    });

    $(CHARGE_SLIDER_SIDEBAR).change(() => {
        var value = chargeValidator($(CHARGE_SLIDER_SIDEBAR).val());
        grnState.chargeSlider.currentVal = value;
        updateApp(grnState);
    });

    $(CHARGE_MENU).change(() => {
        var value = chargeValidator($(CHARGE_MENU).val());
        grnState.chargeSlider.currentVal = value;
        updateApp(grnState);
    });

    $(LOCK_SLIDERS_CLASS).click(() => {
        grnState.slidersLocked = !grnState.slidersLocked;
        if (grnState.slidersLocked) {
            grnState.showUndoReset = false;
        }
        updateApp(grnState);
    });

    $(VIEWPORT_OPTION_CLASS_SIDEBAR).click(function () {
        grnState.viewportSize = $(this).val();
        updateApp(grnState);
    });

    $(VIEWPORT_OPTION_CLASS).click(function () {
        grnState.viewportSize = $(this).attr("value");
        updateApp(grnState);
    });

    $(RESET_SLIDERS_CLASS).click(() => {
        grnState.chargeSlider.backup = grnState.chargeSlider.currentVal;
        grnState.linkDistanceSlider.backup = grnState.linkDistanceSlider.currentVal;
        grnState.chargeSlider.currentVal = CHARGE_DEFAULT_VALUE;
        grnState.linkDistanceSlider.currentVal = LINK_DIST_DEFAULT_VALUE;
        grnState.showUndoReset = true;
        updateApp(grnState);
    });

    $(UNDO_SLIDERS_RESET_CLASS).click(() => {
        grnState.chargeSlider.currentVal = grnState.chargeSlider.backup;
        grnState.linkDistanceSlider.currentVal = grnState.linkDistanceSlider.backup;
        grnState.showUndoReset = false;
        updateApp(grnState);
    });

    // Weights Visualization
    $(WEIGHTS_SHOW_ALWAYS_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = SHOW_ALL_WEIGHTS;
        updateApp(grnState);
    });

    $(WEIGHTS_HIDE_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = HIDE_ALL_WEIGHTS;
        updateApp(grnState);
    });

    // Normalization Options
    $(SET_NORMALIZATION_SIDEBAR).click(() => {
        grnState.normalizationMax = $(SET_NORMALIZATION_SIDEBAR_VALUE).val();
        updateApp(grnState);
    });

    $(SET_NORMALIZATION_MENU).change(() => {
        grnState.normalizationMax = $(SET_NORMALIZATION_MENU).val();
        updateApp(grnState);
    });

    $(RESET_NORMALIZATION_SIDEBAR).click(() => {
        grnState.normalizationMax = grnState.resetNormalizationMax;
        updateApp(grnState);
    });

    $(RESET_NORMALIZATION_MENU).click(() => {
        grnState.normalizationMax = grnState.resetNormalizationMax;
        updateApp(grnState);
    });

    // Grey Edges
    $(GREY_EDGES_DASHED_SIDEBAR).change(() => {
        grnState.dashedLine = $(GREY_EDGES_DASHED_SIDEBAR).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGES_DASHED_MENU).click(() => {
        grnState.dashedLine = !$(GREY_EDGES_DASHED_MENU).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGE_THRESHOLD_MENU).change(() => {
        grnState.grayEdgeThreshold = Math.round($(GREY_EDGE_THRESHOLD_MENU).val());
        updateApp(grnState);
    });

    $(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).change(() => {
        grnState.grayEdgeThreshold = Math.round($(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).val() * 100);
        updateApp(grnState);
    });

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).click(() => {
        grnState.edgeWeightDisplayOption = SHOW_WEIGHTS_MOUSEOVER;
        updateApp(grnState);
    });

    $(COLOR_EDGES).click(() => {
        grnState.colorOptimal = !grnState.colorOptimal;
        updateApp(grnState);
    });

    // Species Selection
    $(SPECIES_DISPLAY).change(() => {
        var selection = $(SPECIES_DISPLAY).find(":selected").attr("value");
        grnState.genePageData.identified = false;
        identifySpeciesMenu(selection);
        updateApp(grnState);
    });

    $(SPECIES_BUTTON_YEAST).click(function () {
        var selection = $(SPECIES_BUTTON_YEAST).attr("id");
        grnState.genePageData.identified = false;
        identifySpeciesMenu(selection);
        updateApp(grnState);
    });

    $(SPECIES_BUTTON_MOUSE).click(function () {
        var selection = $(SPECIES_BUTTON_MOUSE).attr("id");
        grnState.genePageData.identified = false;
        identifySpeciesMenu(selection);
        updateApp(grnState);
    });

    $(SPECIES_BUTTON_HUMAN).click(function () {
        var selection = $(SPECIES_BUTTON_HUMAN).attr("id");
        grnState.genePageData.identified = false;
        identifySpeciesMenu(selection);
        updateApp(grnState);
    });

    $(SPECIES_BUTTON_NEMATODE).click(function () {
        var selection = $(SPECIES_BUTTON_NEMATODE).attr("id");
        grnState.genePageData.identified = false;
        identifySpeciesMenu(selection);
        updateApp(grnState);
    });

    $(SPECIES_BUTTON_CRESS).click(function () {
        var selection = $(SPECIES_BUTTON_CRESS).attr("id");
        grnState.genePageData.identified = false;
        identifySpeciesMenu(selection);
        updateApp(grnState);
    });

    $(SPECIES_BUTTON_FLY).click(function () {
        var selection = $(SPECIES_BUTTON_FLY).attr("id");
        grnState.genePageData.identified = false;
        identifySpeciesMenu(selection);
        updateApp(grnState);
    });

    // Allow text-selection for input elements embedded within menu items.
    //
    // Partial thank you:
    //   https://stackoverflow.com/questions/6848140/how-do-i-prevent-drag-on-a-child-but-allow-drag-on-the-parent
    //
    // We use function syntax so that internal `this` can be used.
    $(".dropdown input.keepopen").parent().attr({
        draggable: false,
    });

    // Prevent Bootstrap dropdown from closing on clicks in menu input boxes
    // https://stackoverflow.com/a/27759926
    $(".dropdown").on({
        click: function (event) {
            if ($(event.target).hasClass("keepopen")) {
                $(this).data("closable", $(event.target).closest(".dropdown-toggle").length !== 0);
            }
        },

        mouseup: function (event) {
            if ($(event.target).find(".keepopen").length > 0) {
                $(this).data("closable", $(event.target).closest(".dropdown-toggle").length !== 0);
            }
        },

        "hide.bs.dropdown": function () {
            var hide = $(this).data("closable");
            $(this).data("closable", true);
            return hide;
        },
    });

    $(ZOOM_DISPLAY_MAXIMUM_SELECTOR).text(ZOOM_DISPLAY_MAXIMUM_VALUE);
    $(ZOOM_DISPLAY_MINIMUM_SELECTOR).text(ZOOM_DISPLAY_MINIMUM_VALUE);

    // Viewport handling.
    const setupContainer = function () {
        const MEDIUM_PAGE_WIDTH = 1500;
        const LARGE_PAGE_WIDTH = 2200;

        const initializeViewportSize = width => {
            if (width < MEDIUM_PAGE_WIDTH) {
                grnState.viewportSize = "containerS";
            } else if (width > MEDIUM_PAGE_WIDTH && width < LARGE_PAGE_WIDTH) {
                grnState.viewportSize = "containerM";
            } else {
                grnState.viewportSize = "containerL";
            }
        };

        // For viewport-fit, we create a transient `dimensions` property in `grnState`
        // which `updateApp` will use to determine the latest size.
        //
        // For any other size, we blank out the transient `dimensions`.
        if (window === window.top) {
            initializeViewportSize($(window).width());
            $(window).on("resize", () => {
                if (grnState.viewportSize === VIEWPORT_FIT) {
                    grnState.dimensions = {
                        width: $(window).width(),
                        height: $(window).height(),
                        top: 0,
                    };

                    updateApp(grnState);
                } else {
                    delete grnState.dimensions;
                }
            });
        } else {
            window.addEventListener("message", event => {
                if (event.origin !== HOST_SITE) {
                    return;
                }

                // Also filter out all but dimensions messages.
                const { data } = event;
                if (
                    typeof data !== "object" ||
                    data.width === undefined ||
                    data.height === undefined ||
                    data.top === undefined
                ) {
                    return;
                }

                // Live changes only matter if we are doing Fit to Window or initializing.
                if ([VIEWPORT_FIT, VIEWPORT_INIT].includes(grnState.viewportSize)) {
                    if (grnState.viewportSize === VIEWPORT_INIT) {
                        initializeViewportSize(data.width);
                    }

                    if (grnState.viewportSize === VIEWPORT_FIT) {
                        grnState.dimensions = data;
                    }

                    updateApp(grnState);
                } else {
                    delete grnState.dimensions;
                }
            });
        }

        $("#restrict-graph-to-viewport").on("click", function () {
            if ($(".viewport").prop("checked")) {
                $("#restrict-graph-to-viewport span").removeClass("glyphicon-ok");
                $(".viewport").prop("checked", false);
                $(".viewport").trigger("change");
            } else {
                $("#restrict-graph-to-viewport span").addClass("glyphicon-ok");
                $(".viewport").prop("checked", true).trigger("change");
            }
        });

        $("#expressionDB").on("click", function () {
            if (!$("#expressionDB span").hasClass("glyphicon-ok")) {
                $("#expressionDB span").addClass("glyphicon-ok");
                $("#expressionDB").trigger("change");
            } else {
                $("#expressionDB span").removeClass("glyphicon-ok");
                $("#expressionDB").trigger("change");
            }
        });
    };

    setupContainer();
};
