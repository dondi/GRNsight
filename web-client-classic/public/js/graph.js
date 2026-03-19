import Grid from "d3-v4-grid";
import { grnState } from "./grnstate";
import {
    modifyChargeParameter,
    modifyLinkDistanceParameter,
    valueValidator,
    adjustGeneNameForExpression,
    hasExpressionData,
} from "./update-app";
import {
    VIEWPORT_FIT,
    ZOOM_INPUT,
    ZOOM_PERCENT,
    ZOOM_SLIDER,
    ZOOM_DISPLAY_MINIMUM_VALUE,
    ZOOM_DISPLAY_MAXIMUM_VALUE,
    ZOOM_DISPLAY_MIDDLE,
    ZOOM_ADAPTIVE_MAX_SCALE,
    NETWORK_GRN_MODE,
    BOUNDARY_MARGIN,
    NETWORK_PPI_MODE,
} from "./constants";

/* globals d3 */

/*
  By D3's nature, it can be a bit difficult to adhere to our given guidelines..
  This file needs to be organized a bit more before it can fully adhere to
  them.
*/
/* http://bl.ocks.org/mbostock/4062045 used as reference
 * As well as http://bl.ocks.org/mbostock/3750558
 * and http://bl.ocks.org/mbostock/950642
 * and http://bl.ocks.org/mbostock/1153292
 */

/* eslint no-unused-vars: [2, {"varsIgnorePattern": "text|getMappedValue|manualZoom"}] */

/**
 * Resize detection logic: to avoid "listener leaks," this is set up a single time here, with an assignable
 * updateFunction being set when needed.
 */

let mutationCallback = null;
const resizeObserver = new MutationObserver((mutationsList, observer) => {
    if (typeof mutationCallback === "function") {
        mutationCallback(mutationsList, observer);
    }
});

export var updaters = {
    setNodesToGrid: () => {},
    setNodesToForceGraph: () => {},
    renderNodeColoring: () => {},
    removeNodeColoring: () => {},
};

export var drawGraph = function (workbook) {
    var $container = $(".grnsight-container");
    var CURSOR_CLASSES = "cursorGrab cursorGrabbing";
    d3.selectAll("svg").remove();

    $container.removeClass(CURSOR_CLASSES).addClass("cursorGrab"); // allow graph dragging right away

    var width = $container.width();
    var height = $container.height();
    var nodeHeight = 30;
    var grayThreshold = +$("#grayThresholdInput").val();

    var dashedLine = $("#dashedGrayLineButton").prop("checked");

    $("#warningMessage").html(
        workbook.warnings.length !== 0 ? "Click here in order to view warnings." : ""
    );

    var getNodeWidth = function (node) {
        return node.name.length * 12 + 5;
    };

    var adaptive = !$("input[name='viewport']").prop("checked");

    /**
     * The *_SCALE values represent the actual zoom values used to transform the graph.
     * The *_DISPLAY values represent the value that is shown in the user interface.
     *
     * Separating these values allows for flexible configuration of what the user sees vs. the actual scale factor
     * used in transformations. This "distortion" is done so that "actual size" or 100% can be shown as the midpoint
     * on the zoom slider, even if the numeric ranges to the left and right of the midpoint are asymmetric (as they
     * are here).
     */
    const createZoomScale = (domainMin, domainMax, rangeMin, rangeMax) =>
        d3.scaleLinear().domain([domainMin, domainMax]).range([rangeMin, rangeMax]).clamp(true);

    const MIN_DISPLAY = ZOOM_DISPLAY_MINIMUM_VALUE;
    const ADAPTIVE_MAX_DISPLAY = ZOOM_DISPLAY_MAXIMUM_VALUE;
    const MIN_SCALE = 0.25;
    const MIDDLE_SCALE = 1;

    const zoomScaleLeft = createZoomScale(
        MIN_DISPLAY,
        ZOOM_DISPLAY_MIDDLE,
        MIN_SCALE,
        MIDDLE_SCALE
    );
    const zoomScaleRight = createZoomScale(
        ZOOM_DISPLAY_MIDDLE,
        ADAPTIVE_MAX_DISPLAY,
        MIDDLE_SCALE,
        ZOOM_ADAPTIVE_MAX_SCALE
    );

    // Create an array of all the network weights
    var allWeights = workbook.positiveWeights.concat(workbook.negativeWeights);
    // Assign the entire array weights of 1, if color edges turned off
    if (!grnState.colorOptimal) {
        for (var i = 0; i < allWeights.length; i++) {
            if (allWeights[i] !== 0) {
                allWeights[i] = 1;
            }
        }
    } else {
        for (var j = 0; j < allWeights.length; j++) {
            allWeights[j] = Math.abs(allWeights[j].toPrecision(4));
        }
    }

    const maxWeight = Math.max(Math.abs(d3.max(allWeights)), Math.abs(d3.min(allWeights)));

    // Get the largest magnitude weight and set that as the default normalization factor
    if (grnState.newWorkbook) {
        grnState.normalizationMax = maxWeight;
        grnState.resetNormalizationMax = maxWeight;
    }

    // Normalize all weights b/w 2-14
    var normMax = +$("#normalization-max").val();
    var totalScale = d3
        .scaleLinear()
        .domain([0, normMax > 0 ? normMax : maxWeight])
        .range([2, 14])
        .clamp(true);

    var unweighted = false;

    // if unweighted, all weights are 2
    if (workbook.sheetType === "unweighted") {
        totalScale = d3
            .scaleQuantile()
            .domain([d3.extent(allWeights)])
            .range(["2"]);
        unweighted = true;
        $(".normalization-form").append("placeholder='unweighted'");
        document
            .getElementById("edge-weight-normalization-factor-menu")
            .setAttribute("placeholder", "");
    } else {
        document.getElementById("normalization-max").setAttribute("placeholder", maxWeight);
        document
            .getElementById("edge-weight-normalization-factor-menu")
            .setAttribute("placeholder", maxWeight);
    }

    var getEdgeThickness = function (edge) {
        return Math.floor(totalScale(Math.abs(edge.value)));
    };

    var simulation = d3
        .forceSimulation()
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    var drag = d3.drag().on("start", dragstart).on("drag", dragged).on("end", dragended);

    var dragended = function () {
        d3.event.stopPropagation();
    };

    var zoomDragPrevX = 0;
    var zoomDragPrevY = 0;
    let graphZoom = 0;

    var zoomDragStarted = function () {
        zoomDragPrevX = d3.event.x;
        zoomDragPrevY = d3.event.y;
        $container.removeClass(CURSOR_CLASSES).addClass("cursorGrabbing");
    };

    var zoomDragged = function () {
        var scale = 1;
        if (zoomContainer.attr("transform")) {
            var string = zoomContainer.attr("transform");
            scale = 1 / +string.match(/scale\(([^\)]+)\)/)[1];
        }

        if (
            adaptive ||
            (!adaptive &&
                flexZoomInBounds(graphZoom) &&
                viewportBoundsMoveDrag(graphZoom, d3.event.dx, d3.event.dy))
        ) {
            zoom.translateBy(
                zoomContainer,
                scale * (d3.event.x - zoomDragPrevX),
                scale * (d3.event.y - zoomDragPrevY)
            );
        }
        zoomDragPrevX = d3.event.x;
        zoomDragPrevY = d3.event.y;
    };

    var zoomDragEnded = function () {
        $container.removeClass(CURSOR_CLASSES).addClass("cursorGrab");
    };

    // zoomDrag and all functions that it calls handles cursor dragging
    var zoomDrag = d3
        .drag()
        .on("start", zoomDragStarted)
        .on("drag", zoomDragged)
        .on("end", zoomDragEnded);

    var manualZoom = false;

    var svg = d3
        .select($container[0])
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "exportContainer");

    var zoomContainer = svg
        .append("g") // required for zoom to work
        .attr("class", "boundingBox")
        .attr("width", width)
        .attr("height", height);

    var boundingBoxContainer = zoomContainer.append("g"); // appended another g here...

    // This rectangle catches all of the mousewheel and pan events, without letting
    // them bubble up to the body.
    var boundingBoxRect = boundingBoxContainer
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("stroke", "none")
        .attr("id", "boundingBoxRect");

    var flexibleContainerRect = boundingBoxContainer
        .append("rect")
        .attr("class", "boundingBox")
        .attr("fill", "none")
        .attr("id", "flexibleContainerRect");

    var zoom = d3.zoom().scaleExtent([MIN_SCALE, ZOOM_ADAPTIVE_MAX_SCALE]).on("zoom", zoomed);

    svg.style("pointer-events", "all").call(zoomDrag).style("font-family", "sans-serif");

    // this allows zoomContainer to be zoomed, dragged
    function zoomed() {
        zoomContainer.attr("transform", d3.event.transform);
    }

    d3.select("svg").on("dblclick.zoom", null); // disables double click zooming

    // this controls the D-pad
    d3.selectAll(".scrollBtn").on("click", null); // Remove event handlers, if there were any.
    var arrowMovement = ["Up", "Left", "Right", "Down"];
    arrowMovement.forEach(function (direction) {
        d3.select(".scroll" + direction).on("click", function () {
            move(direction.toLowerCase());
        });
    });
    d3.select(".center").on("click", center);

    let xTranslation = 0;
    let yTranslation = 0;

    function updateZoomContainerInfo() {
        // transform attribute of zoomContainer contains translation info about graph
        if (zoomContainer.attr("transform")) {
            xTranslation = Number(zoomContainer.attr("transform").split("(")[1].split(",")[0]);

            yTranslation = Number(
                zoomContainer.attr("transform").split("(")[1].split(",")[1].split(")")[0]
            );
        }
    }

    // controls reading movement of zoomSlider and scaling graph to that zoomScale
    const setGraphZoom = zoomScale => {
        if (zoomScale < MIDDLE_SCALE) {
            $container.removeClass(CURSOR_CLASSES).addClass("cursorGrab");
        }
        var container = zoomContainer;
        if (adaptive || (!adaptive && flexZoomInBounds(graphZoom))) {
            zoom.scaleTo(container, zoomScale);
            graphZoom = zoomScale;
        }
    };

    // See setupZoomElements below to see how these are initialized. They are declared here because
    // updateAppBasedOnZoomValue uses them (lexical positioning is chosen here for better context).
    let sliderMidpoint;
    let zoomScaleSliderLeft;
    let zoomScaleSliderRight;
    let prevGrnstateZoomVal;
    let flexibleContainer = null;

    const updateAppBasedOnZoomValue = () => {
        let zoomDisplay;

        // If the zoom value is out of bounds, reset it to the previous value.
        if (adaptive) {
            zoomDisplay = grnState.zoomValue;
        } else if (
            !adaptive &&
            flexZoomInBounds(
                (grnState.zoomValue <= ZOOM_DISPLAY_MIDDLE ? zoomScaleLeft : zoomScaleRight)(
                    grnState.zoomValue
                )
            )
        ) {
            zoomDisplay = grnState.zoomValue;
        } else {
            grnState.zoomValue = prevGrnstateZoomVal;
            zoomDisplay = grnState.zoomValue;
        }

        const calcGraphZoom = (zoomDisplay <= ZOOM_DISPLAY_MIDDLE ? zoomScaleLeft : zoomScaleRight)(
            zoomDisplay
        );

        setGraphZoom(calcGraphZoom);

        const finalDisplay = grnState.zoomValue;
        $(ZOOM_PERCENT).text(`${finalDisplay}%`);

        // Special handling for zoom input field: the user might be in the middle of typing a value that is
        // _temporarily_ out of range (e.g., "1" while typing "100") and we don’t want to overwrite that.
        // The special case can be detected if the input element currently has focus.
        if (document.activeElement !== document.querySelector(ZOOM_INPUT)) {
            $(ZOOM_INPUT).val(finalDisplay);
        }

        // This controls movement of slider and is where the zoomSlider can be restricted
        if (adaptive || (!adaptive && flexZoomInBounds(calcGraphZoom))) {
            if (!adaptive) {
                // Recenter graph when zooming to ensure that graph stays in viewport
                center();
                updateZoomContainerInfo();
            }

            $(ZOOM_SLIDER).val(
                (finalDisplay <= ZOOM_DISPLAY_MIDDLE
                    ? zoomScaleSliderLeft
                    : zoomScaleSliderRight
                ).invert(finalDisplay)
            );
        }
    };

    /**
     * To eliminate coupling between how the zoom slider element is defined in markup and how zoom values are
     * calculated and displayed, we define this function to read the zoom slider for its minimum, maximum, and
     * midpoint. The slider’s minimum will be shown as MIN_DISPLAY, the slider’s maximum will be shown as
     * ADAPTIVE_MAX_DISPLAY, and the slider’s midpoint will be shown as ZOOM_DISPLAY_MIDDLE.
     *
     * Elements showing minimum and maximum display values are also updated here so that they are consistent
     * with these constants. This way, all zoom calculations are based on these constants, and changing these
     * constants should be all that is needed to adjust displayed and actual zoom values.
     */
    var setupZoomSlider = () => {
        const sliderMin = +$(ZOOM_SLIDER).attr("min");
        const sliderMax = +$(ZOOM_SLIDER).attr("max");
        sliderMidpoint = (sliderMin + sliderMax) / 2;

        zoomScaleSliderLeft = createZoomScale(
            sliderMin,
            sliderMidpoint,
            MIN_DISPLAY,
            ZOOM_DISPLAY_MIDDLE
        );
        zoomScaleSliderRight = createZoomScale(
            sliderMidpoint,
            sliderMax,
            ZOOM_DISPLAY_MIDDLE,
            ADAPTIVE_MAX_DISPLAY
        );

        // Reset the zoom value to the midpoint whenever we load a new workbook.
        if (grnState.newWorkbook) {
            grnState.zoomValue = ZOOM_DISPLAY_MIDDLE;
        }

        updateAppBasedOnZoomValue();
    };

    setupZoomSlider();

    var zoomInputValidator = function (value) {
        return valueValidator(MIN_DISPLAY, ADAPTIVE_MAX_DISPLAY, value);
    };

    $(ZOOM_INPUT)
        .on("input", () => {
            grnState.zoomValue = zoomInputValidator(+$(ZOOM_INPUT).val());
            updateAppBasedOnZoomValue();
        })
        .blur(() => $(ZOOM_INPUT).val(grnState.zoomValue));

    d3.select(ZOOM_SLIDER)
        .on("input", function () {
            const sliderValue = $(this).val();
            prevGrnstateZoomVal = grnState.zoomValue;

            grnState.zoomValue = Math.floor(
                (sliderValue <= sliderMidpoint ? zoomScaleSliderLeft : zoomScaleSliderRight)(
                    sliderValue
                )
            );

            updateAppBasedOnZoomValue();
        })
        .on("mousedown", function () {
            manualZoom = true;
        })
        .on("mouseup", function () {
            manualZoom = false;
        });

    if (!grnState.newWorkbook) {
        updateAppBasedOnZoomValue();
    }

    const adjustGraphSize = () => {
        var newWidth = $container.width();
        var newHeight = $container.height();

        if (adaptive) {
            width = width < newWidth ? newWidth : width;
            height = height < newHeight ? newHeight : height;
        } else {
            width = newWidth;
            height = newHeight;
        }

        // Subtract 1 from SVG height if we are fitting to window so as to prevent scrollbars from showing up
        // Is inconsistent, but I'm tired of fighting with it...
        d3.select("svg")
            .attr("width", newWidth)
            .attr(
                "height",
                $(".grnsight-container").hasClass(VIEWPORT_FIT) ? newHeight : newHeight
            );
        d3.select("rect").attr("width", width).attr("height", height);
        d3.select(".boundingBox").attr("width", width).attr("height", height);
    };

    mutationCallback = adjustGraphSize;
    resizeObserver.disconnect();
    resizeObserver.observe($container.get(0), { attributes: true });

    var restrictGraphToViewport = function (fixed) {
        if (!fixed) {
            $("#restrict-graph-to-viewport span").removeClass("glyphicon-ok");
            $("input[name=viewport]").removeProp("checked");
            adaptive = true;
            flexibleContainer = null;
            center();
        } else {
            $("#restrict-graph-to-viewport span").addClass("glyphicon-ok");
            $("input[name=viewport]").prop("checked", "checked");
            adaptive = false;
            $container.removeClass(CURSOR_CLASSES);
            if (grnState.zoomValue > ZOOM_DISPLAY_MIDDLE) {
                grnState.zoomValue = ZOOM_DISPLAY_MIDDLE;
                updateAppBasedOnZoomValue();
                $container.removeClass(CURSOR_CLASSES);
            }
            width = $container.width();
            height = $container.height();
            d3.select("rect").attr("width", width).attr("height", height);
            $(".boundingBox").attr("width", width).attr("height", height);
            center();
        }
        updateAppBasedOnZoomValue(); // Update zoom value within bounds
    };

    d3.select("#restrict-graph-to-viewport").on("click", function () {
        var fixed = $("input[name=viewport]").prop("checked");
        restrictGraphToViewport(fixed);
    });

    d3.selectAll("input[name=viewport]").on("change", function () {
        var fixed = $(this).prop("checked");
        restrictGraphToViewport(fixed);
    });

    function center() {
        var viewportWidth = $container.width();
        var viewportHeight = $container.height();
        zoom.translateTo(zoomContainer, viewportWidth / 2, viewportHeight / 2);
    }

    // move: Moves graph with D-pad
    function move(direction) {
        var moveWidth = direction === "left" ? -50 : direction === "right" ? 50 : 0;
        var moveHeight = direction === "up" ? -50 : direction === "down" ? 50 : 0;
        if (adaptive) {
            zoom.translateBy(zoomContainer, moveWidth, moveHeight);
        } else if (!adaptive) {
            if (viewportBoundsMoveDrag(graphZoom, moveWidth, moveHeight)) {
                zoom.translateBy(zoomContainer, moveWidth, moveHeight);
            }
        }
    }

    var defs = boundingBoxContainer.append("defs");

    var link = boundingBoxContainer.selectAll(".links");
    var node = boundingBoxContainer.selectAll(".nodes");
    var weight = boundingBoxContainer.selectAll(".weight");

    simulation.nodes(workbook.genes).on("tick", tick);

    simulation.force("link").links(workbook.links);

    function getLinkEndpointId(endpoint) {
        if (endpoint === null) {
            return endpoint;
        }
        if (typeof endpoint === "object") {
            if ("id" in endpoint) {
                return endpoint.id;
            }
            if ("index" in endpoint) {
                return endpoint.index;
            }
        }
        return endpoint;
    }

    let uniqueLinks = [];
    if (workbook.meta.data.workbookType === NETWORK_PPI_MODE) {
        const seenLinks = {};
        workbook.links.forEach(function (link) {
            const sourceId = getLinkEndpointId(link.source);
            const targetId = getLinkEndpointId(link.target);
            const minId = sourceId <= targetId ? sourceId : targetId;
            const maxId = sourceId <= targetId ? targetId : sourceId;
            const linkKey = `${minId}-${maxId}`;

            if (!seenLinks[linkKey]) {
                uniqueLinks.push(link);
                seenLinks[linkKey] = true;
            }
        });
    } else {
        uniqueLinks = workbook.links;
    }

    link = link
        .data(uniqueLinks)
        .enter()
        .append("g")
        .attr("class", "link")
        .attr("strokeWidth", getEdgeThickness);

    node = node
        .data(workbook.genes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("id", function (d) {
            return "node" + d.index;
        })
        .attr("width", getNodeWidth)
        .attr("height", nodeHeight)
        .call(drag)
        .on("dblclick", dblclick);

    if (workbook.sheetType === "weighted") {
        link.append("path")
            .attr("class", "mousezone")
            .style("stroke-width", function (d) {
                var baseThickness = getEdgeThickness(d);
                return Math.max(baseThickness, 7);
            })
            .attr("stroke-opacity", "0");
    }

    link.append("path")
        .attr("class", "main")
        .attr("id", function (d) {
            return "path" + d.source.index + "_" + d.target.index;
        })
        .style("stroke-width", function (d) {
            d.strokeWidth = grnState.colorOptimal ? getEdgeThickness(d) : 2;
            return d.strokeWidth;
        })
        .style("stroke-dasharray", function (d) {
            if (unweighted || !grnState.colorOptimal) {
                return "0";
            } else if (normalize(d) <= grayThreshold && dashedLine === true) {
                return "6, 9";
            } else {
                return "0";
            }
        })
        .style("stroke", function (d) {
            if (unweighted || !grnState.colorOptimal) {
                return "black";
            } else if (normalize(d) <= grayThreshold) {
                return "gray";
            } else {
                return d.stroke;
            }
        })
        .attr("marker-end", function (d) {
            var x1 = d.source.x;
            var y1 = d.source.y;
            var x2 = d.target.x;
            var y2 = d.target.y;
            var minimum = "";
            var selfRef = "";
            var yOffsets;
            var xOffsets;
            var color;

            if (normalize(d) <= grayThreshold) {
                minimum = "gray";
            }
            if (x1 === x2 && y1 === y2) {
                selfRef = "_SelfReferential";
            }
            // If the same ID is created twice (usually happens in the unweighted GRNS),
            // it causes unpredictable behavior in the markers.
            // To prevent this, first we check to make sure the ID about to be created doesn't exist.
            if ($("#" + d.type + selfRef + "_StrokeWidth" + d.strokeWidth + minimum).length !== 0) {
                return "url(#" + d.type + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
            } else {
                // If negative, you need one bar for horizontal and one for vertical.
                // If the user is not coloring the weighted
                // sheets, then we make all of the markers arrowheads.
                if (d.value < 0 && grnState.colorOptimal) {
                    defs.append("marker")
                        .attr(
                            "id",
                            "repressor" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum
                        )
                        .attr("refX", function () {
                            xOffsets = {
                                2: 1,
                                3: 2,
                                4: 2,
                                5: 2,
                                6: 2.5,
                                7: 3,
                                8: 3.5,
                                9: 4,
                                10: 4.5,
                                11: 5,
                                12: 5,
                                13: 5.5,
                                14: 6,
                            };
                            return xOffsets[d.strokeWidth];
                        })
                        .attr("refY", function () {
                            yOffsets = {
                                2: 13,
                                3: 13,
                                4: 13.5,
                                5: 14,
                                6: 15.5,
                                7: 17,
                                8: 17,
                                9: 17,
                                10: 17,
                                11: 17,
                                12: 18.5,
                                13: 18,
                                14: 19.25,
                            };
                            return yOffsets[d.strokeWidth];
                        })
                        .attr("markerUnits", "userSpaceOnUse")
                        .attr("markerWidth", function () {
                            return d.strokeWidth;
                        })
                        .attr("markerHeight", function () {
                            return 25 + d.strokeWidth;
                        })
                        .attr("orient", 180)
                        .append("rect")
                        .attr("width", function () {
                            return d.strokeWidth;
                        })
                        .attr("height", function () {
                            return 25 + d.strokeWidth;
                        })
                        .attr("rx", 10)
                        .attr("ry", 10)
                        .attr("style", function () {
                            if (normalize(d) <= grayThreshold) {
                                color = "gray";
                            } else {
                                color = d.stroke;
                            }
                            return "stroke:" + color + "; fill: " + color + "; stroke-width: 0";
                        });

                    defs.append("marker")
                        .attr(
                            "id",
                            "repressorHorizontal" +
                                selfRef +
                                "_StrokeWidth" +
                                d.strokeWidth +
                                minimum
                        )
                        .attr("refX", function () {
                            if (x1 === x2 && y1 === y2) {
                                // if self referential...
                                xOffsets = {
                                    2: 14,
                                    3: 15,
                                    4: 15,
                                    5: 15,
                                    6: 16,
                                    7: 16.5,
                                    8: 16.5,
                                    9: 17,
                                    10: 17.5,
                                    11: 18,
                                    12: 19,
                                    13: 19.5,
                                    14: 20.5,
                                };
                            } else {
                                xOffsets = {
                                    2: 13,
                                    3: 13,
                                    4: 13.5,
                                    5: 14,
                                    6: 15.5,
                                    7: 16.5,
                                    8: 17,
                                    9: 16,
                                    10: 17,
                                    11: 17,
                                    12: 18,
                                    13: 18,
                                    14: 19,
                                };
                            }
                            return xOffsets[d.strokeWidth];
                        })
                        .attr("refY", function () {
                            yOffsets = {
                                2: 1,
                                3: 2,
                                4: 2,
                                5: 2,
                                6: 2.5,
                                7: 3,
                                8: 3.5,
                                9: 4,
                                10: 4.5,
                                11: 5,
                                12: 5,
                                13: 5.5,
                                14: 6,
                            };
                            return yOffsets[d.strokeWidth];
                        })
                        .attr("markerUnits", "userSpaceOnUse")
                        .attr("markerWidth", function () {
                            return 25 + d.strokeWidth;
                        })
                        .attr("markerHeight", function () {
                            return d.strokeWidth;
                        })
                        .attr("orient", 180)
                        .append("rect")
                        .attr("width", function () {
                            return 25 + d.strokeWidth;
                        })
                        .attr("height", function () {
                            return d.strokeWidth;
                        })
                        .attr("rx", 10)
                        .attr("ry", 10)
                        .attr("style", function () {
                            if (normalize(d) <= grayThreshold) {
                                color = "gray";
                            } else {
                                color = d.stroke;
                            }
                            return "stroke:" + color + "; fill: " + color + "; stroke-width: 0";
                        });
                } else {
                    // Arrowheads
                    if (grnState.mode === NETWORK_GRN_MODE) {
                        if (d.strokeWidth === 2) {
                            d.strokeWidth = 4;
                        }
                        defs.append("marker")
                            .attr(
                                "id",
                                "arrowhead" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum
                            )
                            .attr("viewBox", "0 0 15 15")
                            .attr("preserveAspectRatio", "xMinYMin meet")
                            .attr("refX", function () {
                                // Individual offsets for each possible stroke width
                                return (
                                    x1 === x2 && y1 === y2
                                        ? {
                                              2: 2,
                                              3: 10.5,
                                              4: 11,
                                              5: 9,
                                              6: 9,
                                              7: 10,
                                              8: 9.8,
                                              9: 9.1,
                                              10: 10,
                                              11: 9.5,
                                              12: 9,
                                              13: 8.3,
                                              14: 8.3,
                                          }
                                        : {
                                              2: 11.75,
                                              3: 11,
                                              4: 9.75,
                                              5: 9.25,
                                              6: 8.5,
                                              7: 10,
                                              8: 9.75,
                                              9: 9.5,
                                              10: 9,
                                              11: 9.5,
                                              12: 9.5,
                                              13: 9.25,
                                              14: 9,
                                          }
                                )[d.strokeWidth];
                            })
                            .attr("refY", function () {
                                return (
                                    x1 === x2 && y1 === y2
                                        ? {
                                              2: 6.7,
                                              3: 5.45,
                                              4: 5.3,
                                              5: 5.5,
                                              6: 5,
                                              7: 5.4,
                                              8: 5.65,
                                              9: 6,
                                              10: 5.7,
                                              11: 5.5,
                                              12: 5.9,
                                              13: 6,
                                              14: 6,
                                          }
                                        : {
                                              2: 5,
                                              3: 5,
                                              4: 4.8,
                                              5: 5,
                                              6: 5,
                                              7: 4.98,
                                              8: 4.9,
                                              9: 5.2,
                                              10: 4.85,
                                              11: 4.7,
                                              12: 5.15,
                                              13: 5,
                                              14: 5.3,
                                          }
                                )[d.strokeWidth];
                            })
                            .attr("markerUnits", "userSpaceOnUse")
                            .attr("markerWidth", function () {
                                return (
                                    12 +
                                    (d.strokeWidth < 7 ? d.strokeWidth * 2.25 : d.strokeWidth * 3)
                                );
                            })
                            .attr("markerHeight", function () {
                                return (
                                    5 +
                                    (d.strokeWidth < 7 ? d.strokeWidth * 2.25 : d.strokeWidth * 3)
                                );
                            })
                            .attr("orient", function () {
                                return x1 === x2 && y1 === y2
                                    ? {
                                          2: 270,
                                          3: 270,
                                          4: 268,
                                          5: 264,
                                          6: 268,
                                          7: 252,
                                          8: 248,
                                          9: 243,
                                          10: 240,
                                          11: 240,
                                          12: 235,
                                          13: 233,
                                          14: 232,
                                      }[d.strokeWidth]
                                    : "auto";
                            })
                            .append("path")
                            .attr("d", "M 0 0 L 14 5 L 0 10 Q 6 5 0 0")
                            .attr("style", function () {
                                if (unweighted || !grnState.colorOptimal) {
                                    color = "black";
                                } else if (normalize(d) <= grayThreshold) {
                                    color = "gray";
                                } else {
                                    color = d.stroke;
                                }
                                return "stroke: " + color + "; fill: " + color;
                            });
                    }
                }
                return "url(#" + d.type + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
            }
        });

    if (workbook.sheetType === "weighted") {
        link.append("text")
            .attr("class", "weight")
            .attr("text-anchor", "middle")
            .attr("text-anchor", "middle")
            .attr("fill", "rgb(0,0,0)")
            .style("font-family", "sans-serif")
            .text(function (d) {
                return d.value.toPrecision(4);
            });

        weight = weight
            .data(workbook.links)
            .enter()
            .append("text")
            .attr("class", "weight")
            .attr("text-anchor", "middle")
            .attr("fill", "rgb(0,0,0)")
            .style("font-family", "sans-serif")
            .text(function (d) {
                return d.value.toPrecision(4);
            })
            .each(function (d) {
                d.weightElement = d3.select(this);
            });
    }

    /* Big thanks to the following for the smart edges
   * https://github.com/cdc-leeds/PolicyCommons/blob/b0dea2a4171989123cbee377a6ae260b8612138e
   /visualize/conn-net-svg.js#L119
   */
    var moveTo = function (d) {
        var node = d3.select("#node" + d.source.index);
        var w = parseFloat(node.attr("width"));
        var h = parseFloat(node.attr("height"));

        d.source.newX = d.source.x + w / 2;
        d.source.newY = d.source.y + h / 2;

        return "M" + d.source.newX + "," + d.source.newY + " ";
    };

    var CURVE_THRESHOLD = 200;
    var EDGE_OFFSET = 20;
    var lineTo = function (d) {
        var node = d3.select("#node" + d.target.index);
        var w = +node.attr("width");
        var h = +node.attr("height");
        var x1 = d.source.x;
        var y1 = d.source.y;
        var x2 = d.target.x;
        var y2 = d.target.y;

        d.target.centerX = d.target.x + w / 2;
        d.target.centerY = d.target.y + h / 2;

        // This function calculates the newX and newY.
        smartPathEnd(d, w, h);
        x1 = d.source.newX;
        y1 = d.source.newY;
        x2 = d.target.newX;
        y2 = d.target.newY;

        // Unit vectors.
        var ux = x2 - x1;
        var uy = y2 - y1;
        var umagnitude = Math.sqrt(ux * ux + uy * uy);
        var vx = -uy; // Perpendicular vector.
        var vy = ux;
        var vmagnitude = Math.sqrt(vx * vx + vy * vy);

        ux /= umagnitude;
        uy /= umagnitude;
        vx /= vmagnitude;
        vy /= vmagnitude;

        // Check for vector direction.
        if (
            (d.target.newX > d.source.x && d.target.newY > d.source.y) ||
            (d.target.newX < d.source.x && d.target.newY < d.source.y)
        ) {
            vx = -vx;
            vy = -vy;
        }

        var curveToStraight = (umagnitude - CURVE_THRESHOLD) / 4;
        var inlineOffset = Math.max(umagnitude / 4, curveToStraight);
        var orthoOffset = Math.max(0, curveToStraight);
        var cp1x = x1 + inlineOffset * ux + vx * orthoOffset;
        var cp1y = y1 + inlineOffset * uy + vy * orthoOffset;
        var cp2x = x2 - inlineOffset * ux + vx * orthoOffset;
        var cp2y = y2 - inlineOffset * uy + vy * orthoOffset;

        cp1x = Math.min(Math.max(0, cp1x), width);
        cp1y = Math.min(Math.max(0, cp1y), height);
        cp2x = Math.min(Math.max(0, cp2x), width);
        cp2y = Math.min(Math.max(0, cp2y), height);

        d.label = {
            x: Math.min(
                Math.max((x1 + cp1x + cp2x + x2) / 4, EDGE_OFFSET),
                width - 2 * EDGE_OFFSET
            ),
            y: Math.min(Math.max((y1 + cp1y + cp2y + y2) / 4, EDGE_OFFSET), height - EDGE_OFFSET),
        };

        return "C" + cp1x + " " + cp1y + ", " + cp2x + " " + cp2y + ", " + x2 + " " + y2;
    };

    function smartPathEnd(d, w, h) {
        // For arrowheads when target node is to the left of source node
        var LEFT_ADJUSTMENT = 7;
        var MINIMUM_DISTANCE = 8;
        var NODE_HALF_HEIGHT = 30 / 2;

        var targetStartX = d.target.centerX + d.target.textWidth / 2;
        var currentPointX = (targetStartX - d.target.centerX) / (d.source.newX - d.target.centerX);
        var currentPointY = (1 - currentPointX) * d.target.centerY + currentPointX * d.source.newY;
        var upperBound = d.target.centerY + NODE_HALF_HEIGHT;
        var lowerBound = d.target.centerY - NODE_HALF_HEIGHT;
        if (currentPointX > 0 && currentPointY >= lowerBound && currentPointY <= upperBound) {
            MINIMUM_DISTANCE = d.strokeWidth > 11 ? 16.5 : 15;
        }

        // Set an offset if the edge is a repressor to make room for the flat arrowhead
        var globalOffset = parseFloat(d.strokeWidth);

        if (d.value < 0 && grnState.colorOptimal) {
            globalOffset = Math.max(globalOffset, MINIMUM_DISTANCE);
        }

        var thicknessAdjustment = globalOffset > MINIMUM_DISTANCE ? 1 : 0;

        // We need to work out the (tan of the) angle between the
        // imaginary horizontal line running through the center of the
        // target node and the imaginary line connecting the center of
        // the target node with the top-left corner of the same
        // node. Of course, this angle is fixed.
        d.tanRatioFixed = (d.target.centerY - d.target.y) / (d.target.centerX - d.target.x);

        // We also need to work out the (tan of the) angle between the
        // imaginary horizontal line running through the center of the
        // target node and the imaginary line connecting the center of
        // the target node with the center of the source node. This
        // angle changes as the nodes move around the screen.
        d.tanRatioMoveable =
            Math.abs(d.target.centerY - d.source.newY) / Math.abs(d.target.centerX - d.source.newX);
        // Note, JavaScript handles division-by-zero by returning
        // Infinity, which in this case is useful, especially
        // since it handles the subsequent Infinity arithmetic
        // correctly.

        // Now work out the intersection point
        if (d.tanRatioMoveable === d.tanRatioFixed) {
            // Then path is intersecting at corner of textbox so draw
            // path to that point

            // By default assume path intersects a left-side corner
            d.target.newX = d.target.x - globalOffset;

            // But...
            if (d.target.centerX < d.source.newX) {
                // i.e. if target node is to left of the source node
                // then path intersects a right-side corner
                d.target.newX = d.target.x + w + globalOffset;
            }

            // By default assume path intersects a top corner
            d.target.newY = d.target.y - globalOffset;

            // But...
            if (d.target.centerY < d.source.newY) {
                // i.e. if target node is above the source node
                // then path intersects a bottom corner
                d.target.newY = d.target.y + h + globalOffset;
            }
        }

        if (d.tanRatioMoveable < d.tanRatioFixed) {
            // Then path is intersecting on a vertical side of the
            // textbox, which means we know the x-coordinate of the
            // path endpoint but we need to work out the y-coordinate

            // By default assume path intersects left vertical side
            d.target.newX = d.target.x - globalOffset;

            // But...
            if (d.target.centerX < d.source.newX) {
                // i.e. if target node is to left of the source node
                // then path intersects right vertical side
                if (d.type !== "arrowhead") {
                    d.target.newX =
                        d.target.x + w + globalOffset + 0.25 * d.strokeWidth - thicknessAdjustment;
                } else {
                    d.target.newX = d.target.x + w + globalOffset + LEFT_ADJUSTMENT;
                }
            }

            // Now use a bit of trigonometry to work out the y-coord.

            // By default assume path intersects towards top of node
            d.target.newY = d.target.centerY - (d.target.centerX - d.target.x) * d.tanRatioMoveable;

            // But...
            if (d.target.centerY < d.source.newY) {
                // i.e. if target node is above the source node
                // then path intersects towards bottom of the node
                d.target.newY = 2 * d.target.y - d.target.newY + h;
            }
        }

        if (d.tanRatioMoveable > d.tanRatioFixed) {
            // Then path is intersecting on a horizontal side of the
            // textbox, which means we know the y-coordinate of the
            // path endpoint but we need to work out the x-coordinate

            // By default assume path intersects top horizontal side
            d.target.newY = d.target.y - globalOffset;

            // But...
            if (d.target.centerY < d.source.newY) {
                // i.e. if target node is above the source node
                // then path intersects bottom horizontal side
                if (d.type !== "arrowhead") {
                    d.target.newY =
                        d.target.y + h + globalOffset + 0.25 * d.strokeWidth - thicknessAdjustment;
                } else {
                    d.target.newY = d.target.y + h + globalOffset;
                }
            }

            // Now use a bit of trigonometry to work out the x-coord.

            // By default assume path intersects towards lefthand side
            d.target.newX = d.target.centerX - (d.target.centerY - d.target.y) / d.tanRatioMoveable;

            // But...
            if (d.target.centerX < d.source.newX) {
                // i.e. if target node is to left of the source node
                // then path intersects towards the righthand side
                d.target.newX = 2 * d.target.x - d.target.newX + w;
            }
        }
    }

    var dblclick = function (d) {
        d.fx = null;
        d.fy = null;
    };

    var nodeTextDblclick = function (d) {
        // Relay the double-click to our parent.
        dblclick.call(this.parentNode, d);
    };

    var rect = node
        .append("rect")
        .attr("width", function () {
            return this.parentNode.getAttribute("width");
        })
        .attr("height", function () {
            return this.parentNode.getAttribute("height");
        })
        .attr("stroke-width", "2px")
        .on("dblclick", dblclick);

    var MINIMUM_NODE_WIDTH = 68.5625;
    var NODE_MARGIN = 3;
    var NODE_HEIGHT = 22;

    var renderNodeLabels = function () {
        node.selectAll(".nodeText").remove();
        var text = node
            .append("text")
            .attr("dy", NODE_HEIGHT)
            .attr("class", "nodeText")
            .attr("fill", "rgb(0, 0, 0)")
            .style("text-anchor", "middle")
            .style("font-size", "18px")
            .style("stroke-width", "0")
            .style("font-family", "sans-serif")
            .text(function (d) {
                return d.name;
            })
            .attr("dx", function (d) {
                var textWidth = this.getBBox().width;
                d.textWidth = textWidth < MINIMUM_NODE_WIDTH ? MINIMUM_NODE_WIDTH : textWidth;
                return d.textWidth / 2 + NODE_MARGIN;
            })
            .on("dblclick", nodeTextDblclick)

            // this function triggers the gene page
            .on("contextmenu", function (gene) {
                const tempLink = $("<a></a>").attr({
                    href:
                        "info?" +
                        $.param({
                            symbol: gene.name,
                            species: grnState.genePageData.species,
                            jaspar: grnState.genePageData.taxonJaspar,
                            uniprot: grnState.genePageData.taxonUniprot,
                            ensembl: grnState.genePageData.ensembl,
                            mine: grnState.genePageData.mine,
                        }),
                    target: "_blank",
                });
                $("body").append(tempLink);
                tempLink.get(0).click();
                tempLink.remove();
                d3.event.preventDefault();
            });

        rect.attr("width", function (d) {
            return NODE_MARGIN + d.textWidth + NODE_MARGIN;
        });
        node.attr("width", function (d) {
            return NODE_MARGIN + d.textWidth + NODE_MARGIN;
        });
    };
    renderNodeLabels();

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const getExpressionData = (gene, strain, average) => {
        const strainData = grnState.workbook.expression[strain];
        if (average) {
            const uniqueTimePoints = strainData.timePoints.filter(onlyUnique);
            let avgMap = {};
            uniqueTimePoints.forEach(function (key) {
                avgMap[key] = [];
            });
            strainData.timePoints.forEach(function (time, index) {
                avgMap[time].push(strainData.data[gene][index]);
            });
            let avgs = [];
            Object.keys(avgMap).forEach(function (key) {
                const length = avgMap[key].length;
                const sum = avgMap[key].reduce(function (partialSum, currentValue) {
                    return partialSum + currentValue;
                }, 0);
                avgs.push(sum / length);
            });
            return { data: avgs, timePoints: uniqueTimePoints };
        }
        return { data: strainData.data[gene], timePoints: strainData.timePoints };
    };

    var colorNodes = function (position, dataset, average, logFoldChangeMaxValue) {
        var timePoints = [];
        node.each(function (p) {
            d3.select(this)
                .append("g")
                .selectAll(".coloring")
                .data(function () {
                    if (grnState.workbook.expression[dataset]) {
                        const geneName = adjustGeneNameForExpression(p);
                        if (grnState.workbook.expression[dataset].data[geneName]) {
                            const result = getExpressionData(geneName, dataset, average);
                            timePoints = result.timePoints;
                            return result.data || [];
                        }
                    }
                    return [];
                })
                .attr("class", "coloring")
                .enter()
                .append("rect")
                .attr("width", function () {
                    var width = (p.textWidth + 2 * NODE_MARGIN) / timePoints.length;
                    return width + "px";
                })
                .attr("class", "coloring")
                .attr("height", rect.attr("height") / 2 + "px")
                .attr("transform", function (d, i) {
                    var yOffset = position === "top" ? 0 : rect.attr("height") / 2;
                    var xOffset = i * ((p.textWidth + 2 * NODE_MARGIN) / timePoints.length);
                    return "translate(" + xOffset + "," + yOffset + ")";
                })
                .attr("stroke-width", "0px")
                .style("fill", function (d) {
                    d = d || 0; // missing values are changed to 0
                    if (d === 0) {
                        return "white";
                    }
                    var scale = d3
                        .scaleLinear()
                        .domain([-logFoldChangeMaxValue, logFoldChangeMaxValue])
                        .range([0, 1]);
                    return d3.interpolateRdBu(scale(-d));
                })
                .text(function (d) {
                    return "data " + JSON.stringify(d) + " of " + p.name;
                });
        });
    };

    var renderNodeColoringLegend = function (logFoldChangeMaxValue) {
        var $nodeColoringLegend = $(".node-coloring-legend");
        d3.select($nodeColoringLegend[0]).selectAll("svg").remove();
        var yMargin = 20;
        var width = 203;
        var height = 10;
        var textYOffset = 10;

        var svg = d3
            .select($nodeColoringLegend[0])
            .append("svg")
            .attr("width", "100%")
            .attr("height", height + yMargin)
            .append("g")
            .attr("transform", "translate(0, 5)")
            .attr("id", "nodeColoringLegendId");

        // Thank you https://www.visualcinnamon.com/2016/05/smooth-color-legend-d3-svg-gradient.html
        const linearGradientId = "node-coloring-color-scale";
        var defs = svg.append("defs");
        var linearGradient = defs
            .append("linearGradient")
            .attr("id", linearGradientId)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        const increment = Math.abs(logFoldChangeMaxValue) / 50; // Guarantee 50 steps regardless of the range.
        var gradientValues = d3.range(-logFoldChangeMaxValue, logFoldChangeMaxValue, increment);
        var scale = d3
            .scaleLinear()
            .domain([-logFoldChangeMaxValue, logFoldChangeMaxValue])
            .range([0, 1]);

        linearGradient
            .selectAll("stop")
            .data(gradientValues)
            .enter()
            .append("stop")
            .attr("offset", function (d, i) {
                return i / (gradientValues.length - 1);
            })
            .attr("stop-color", function (d) {
                return d3.interpolateRdBu(scale(-d));
            });

        svg.append("rect")
            .attr("width", `${width}px`)
            .attr("height", `${height}px`)
            .style("fill", `url(#${linearGradientId})`);

        var legendLabels = {
            left: {
                textAnchor: "start",
                textContent: (-logFoldChangeMaxValue).toFixed(2),
                x: 0,
            },
            center: {
                textAnchor: "middle",
                textContent: "0",
                x: width / 2,
            },
            right: {
                textAnchor: "end",
                textContent: logFoldChangeMaxValue.toFixed(2),
                x: width,
            },
        };

        var g = document.getElementById("nodeColoringLegendId");

        for (var key in legendLabels) {
            var label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.textContent = legendLabels[key].textContent;
            label.setAttribute("font-size", "8px");
            label.setAttribute("text-anchor", legendLabels[key].textAnchor);
            label.setAttribute("x", legendLabels[key].x);
            label.setAttribute("y", height + textYOffset + "px");
            label.setAttribute("fill", "rgb(0,0,0)");

            g.appendChild(label);
        }
    };

    updaters.removeNodeColoring = function () {
        grnState.nodeColoring.nodeColoringEnabled = false;
        node.selectAll(".coloring").remove();
    };

    updaters.renderNodeColoring = function () {
        if (grnState.nodeColoring.nodeColoringEnabled) {
            colorNodes(
                "top",
                grnState.nodeColoring.topDataset,
                grnState.nodeColoring.averageTopDataset,
                grnState.nodeColoring.logFoldChangeMaxValue
            );
            colorNodes(
                "bottom",
                grnState.nodeColoring.bottomDataset,
                grnState.nodeColoring.averageBottomDataset,
                grnState.nodeColoring.logFoldChangeMaxValue
            );
            renderNodeLabels();
            renderNodeColoringLegend(grnState.nodeColoring.logFoldChangeMaxValue);
        }
    };

    if (
        !$.isEmptyObject(workbook.expression) &&
        hasExpressionData(workbook.expression) &&
        grnState.nodeColoring.topDataset !== undefined
    ) {
        updaters.renderNodeColoring();
    }

    $(".node").css({
        cursor: "move",
        fill: "white",
        stroke: "#000",
        "stroke-width": "1.5px",
    });

    $(".link").css({
        stroke: "#000",
        fill: "none",
        "stroke-dasharray": "0",
        "stroke-width": "1.5px",
    });

    var currentWeightVisibilitySetting = null;

    if (workbook.sheetType === "weighted") {
        if ($(".weightedGraphOptions").hasClass("hidden")) {
            $(".weightedGraphOptions").removeClass("hidden");
        }
        $(".weightedGraphOptionsMenu").removeClass("disabled");
        var setWeightsVisability = function () {
            var WEIGHTS_SHOW_MOUSE_OVER_CLASS = ".weightsMouseOver";
            var WEIGHTS_HIDE_CLASS = ".weightsNever";
            var WEIGHTS_SHOW_ALWAYS_CLASS = ".weightsAlways";

            var WEIGHT_VISIBILITY_SETTINGS = [
                WEIGHTS_SHOW_MOUSE_OVER_CLASS,
                WEIGHTS_HIDE_CLASS,
                WEIGHTS_SHOW_ALWAYS_CLASS,
            ];

            var latestWeightVisibilitySetting = WEIGHT_VISIBILITY_SETTINGS.filter(
                function (setting) {
                    return $(setting).hasClass("selected");
                }
            )[0];

            if (currentWeightVisibilitySetting === latestWeightVisibilitySetting) {
                return;
            }

            currentWeightVisibilitySetting = latestWeightVisibilitySetting;
            var showWeight = function (d) {
                var mouse = d3.mouse(this);
                d.weightElement.attr("x", mouse[0]).attr("y", mouse[1]).classed("visible", true);
            };

            var hideWeight = function (d) {
                d.weightElement.attr("x", null).attr("y", null).classed("visible", false);
            };

            if (currentWeightVisibilitySetting === WEIGHTS_SHOW_MOUSE_OVER_CLASS) {
                link.selectAll(".weight").classed("visible", false);

                link.on("mouseover", showWeight).on("mouseout", hideWeight);
                weight.on("mouseover", showWeight).on("mouseout", hideWeight);
            } else if (currentWeightVisibilitySetting === WEIGHTS_HIDE_CLASS) {
                link.selectAll(".weight").classed("visible", false);

                link.on("mouseover", null).on("mouseout", null);
                weight.on("mouseover", null).on("mouseout", null);
            } else if (currentWeightVisibilitySetting === WEIGHTS_SHOW_ALWAYS_CLASS) {
                link.selectAll(".weight").classed("visible", true);

                link.on("mouseover", null).on("mouseout", null);
                weight.on("mouseover", null).on("mouseout", null);
            }
        };

        setInterval(setWeightsVisability, 100);
    } else {
        if (!$(".weightedGraphOptions").hasClass("hidden")) {
            $(".weightedGraphOptions").addClass("hidden");
        }
        $(".weightedGraphOptionsMenu").addClass("disabled");
    }

    // resets graph options so when new graph is loaded, initial layout is always force graph

    const getMarginWidth = function (gridNodes, row) {
        const containerWidth = $container.width();
        let rightNode = gridNodes[row - 1];
        let nodeWidth = rightNode.textWidth + 6;
        let rightNodeX = rightNode.x + nodeWidth;
        const margin = (containerWidth - rightNodeX) / 2;
        return margin;
    };

    const getMarginHeight = function (gridNodes) {
        const containerHeight = $container.height();
        const len = gridNodes.length;
        const bottomNodeY = gridNodes[len - 1].y + nodeHeight;
        const margin = (containerHeight - bottomNodeY) / 2;
        return margin;
    };

    const sortNode = function (n1, n2) {
        let name1 = n1.__data__.name;
        let name2 = n2.__data__.name;
        if (name1 === name2) {
            return 0;
        }
        return name1 > name2 ? 1 : -1;
    };

    let nodeGroup = node._groups[0].sort(sortNode);
    updaters.setNodesToGrid = () => {
        const margin = 10;
        const grid = Grid()
            .data(workbook.genes)
            .bands(true)
            .padding([0.2, 0])
            .size([$container.width() - margin, $container.height() - margin]); // set size of container
        grid.layout();
        let gridNodes = grid.nodes();
        let gridNumRow = grid.cols();
        let marginWidth = getMarginWidth(gridNodes, gridNumRow);
        let marginHeight = getMarginHeight(gridNodes);
        for (var i in nodeGroup) {
            nodeGroup[i].__data__.fx = marginWidth + gridNodes[i].x;
            nodeGroup[i].__data__.fy = marginHeight + gridNodes[i].y;
        }
    };

    updaters.setNodesToForceGraph = () => {
        for (var i in nodeGroup) {
            nodeGroup[i].__data__.fx = null;
            nodeGroup[i].__data__.fy = null;
        }
    };

    /**
     * Checks that drag movement keeps the graph within viewport bounds
     * @function viewportBoundsMoveDrag
     * @param {number} graphZoom - Current zoom level of the graph
     * @param {number} dx - Change in x position of the drag
     * @param {number} dy - Change in y position of the drag
     * @return {boolean} - True if the drag movement is within bounds, false otherwise
     */
    function viewportBoundsMoveDrag(graphZoom, dx, dy) {
        updateZoomContainerInfo();
        flexibleContainer = calcFlexiBox();

        if (
            flexibleContainer.x + flexibleContainer.width + dx >=
            -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 + width / graphZoom - BOUNDARY_MARGIN
        ) {
            return false;
        }

        if (flexibleContainer.x + dx <= getLeftXBoundaryMargin()) {
            return false;
        }

        if (
            flexibleContainer.y + flexibleContainer.height + dy >=
            -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 + height / graphZoom - BOUNDARY_MARGIN
        ) {
            return false;
        }

        if (flexibleContainer.y + dy <= getTopYBoundaryMargin()) {
            return false;
        }

        return true;
    }

    /**
     * Calculate a flexible bounding box around all nodes. Use the bounding box to find the most extreme
     * positions of nodes to determine whether drag movements are within bounds.
     * @function calcFlexiBox
     * @return {object} - Flexible bounding box around all nodes
     * x: leftmost x position (x-value where the box begins being drawn)
     * y: topmost y position (y-value where the box begins being drawn)
     * maxX: rightmost x position (x-value where the box ends)
     * maxY: bottommost y position (y-value where the box ends)
     * width: width of the box
     * height: height of the box
     */
    function calcFlexiBox() {
        const nodes = simulation.nodes();
        let nodeWidth = 0;
        if (nodes.length > 0) {
            nodeWidth = nodes[0].textWidth + 8;
        }

        const xValuesNodes = nodes.map(node => node.x);
        const yValuesNodes = nodes.map(node => node.y);

        let minX = Math.min(...xValuesNodes);
        let maxX = Math.max(...xValuesNodes) + nodeWidth;

        let minY = Math.min(...yValuesNodes);
        let maxY = Math.max(...yValuesNodes) + nodeHeight;

        // Handle left x and top y boundaries to not exceed graph BOUNDARY_MARGINs
        const BOUNDARY_MARGIN_X_L = getLeftXBoundaryMargin();
        const BOUNDARY_MARGIN_Y_T = getTopYBoundaryMargin();
        minX = minX < BOUNDARY_MARGIN_X_L ? BOUNDARY_MARGIN_X_L : minX;
        minY = minY < BOUNDARY_MARGIN_Y_T ? BOUNDARY_MARGIN_Y_T : minY;

        maxX =
            maxX >
            -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 + width / graphZoom - BOUNDARY_MARGIN
                ? -xTranslation / graphZoom +
                  BOUNDARY_MARGIN / 2 +
                  width / graphZoom -
                  BOUNDARY_MARGIN
                : maxX;

        maxY =
            maxY >
            -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 + height / graphZoom - BOUNDARY_MARGIN
                ? -yTranslation / graphZoom +
                  BOUNDARY_MARGIN / 2 +
                  height / graphZoom -
                  BOUNDARY_MARGIN
                : maxY;

        let flexiBoxWidth = maxX - minX;
        if (maxX < 0 && minX < 0) {
            flexiBoxWidth = Math.abs(maxX) - Math.abs(minX);
        }

        let flexiBoxHeight = maxY - minY;
        if (maxY < 0 && minY < 0) {
            flexiBoxHeight = Math.abs(maxY) - Math.abs(minY);
        }

        boundingBoxRect
            .attr("x", -xTranslation / graphZoom + BOUNDARY_MARGIN / 2)
            .attr("width", width / graphZoom - BOUNDARY_MARGIN)
            .attr("y", -yTranslation / graphZoom + BOUNDARY_MARGIN / 2)
            .attr("height", height / graphZoom - BOUNDARY_MARGIN);

        flexibleContainerRect
            .attr("x", minX)
            .attr("y", minY)
            .attr("width", flexiBoxWidth)
            .attr("height", flexiBoxHeight);
        return {
            x: minX,
            y: minY,
            maxX: maxX,
            maxY: maxY,
            width: flexiBoxWidth,
            height: flexiBoxHeight,
        };
    }

    // Checks if zoomValue is in bounds when zoom in and out
    function flexZoomInBounds(zoomValue) {
        if (flexibleContainer) {
            updateZoomContainerInfo();
            flexibleContainer = calcFlexiBox();
            if (flexibleContainer.width * zoomValue > width) {
                return false;
            } else if (flexibleContainer.height * zoomValue > height) {
                return false;
            }
        }
        return true;
    }

    // Only calculate Left and Top boundary margins because calculate rightboundary and bottomboundary in tick
    function getLeftXBoundaryMargin() {
        return !adaptive && flexibleContainer
            ? -xTranslation / graphZoom + BOUNDARY_MARGIN / 2
            : BOUNDARY_MARGIN;
    }

    function getTopYBoundaryMargin() {
        return !adaptive && flexibleContainer
            ? -yTranslation / graphZoom + BOUNDARY_MARGIN / 2
            : BOUNDARY_MARGIN;
    }

    // Tick only runs while the graph physics are still running.
    // (I.e. when the graph is completely relaxed, tick stops running.)
    function tick() {
        var getSelfReferringEdge = function (node) {
            return link
                .select("path")
                ["_groups"][0].map(function (path) {
                    return path.__data__;
                })
                .filter(function (pathData) {
                    return pathData.source === node && pathData.source === pathData.target;
                })[0];
        };
        var getSelfReferringRadius = function (edge) {
            return edge ? 17 + getEdgeThickness(edge) / 2 : 0;
        };

        var SELF_REFERRING_Y_OFFSET = 6;
        var MAX_WIDTH = 5000;
        var MAX_HEIGHT = 5000;
        var OFFSET_VALUE = 5;

        if (!adaptive) {
            flexibleContainer = calcFlexiBox();
        }

        // this controls movement and position of nodes, clamps the nodes to boundary
        try {
            node.attr("x", function (d) {
                var selfReferringEdge = getSelfReferringEdge(d);
                var selfReferringEdgeWidth = selfReferringEdge
                    ? getSelfReferringRadius(selfReferringEdge) + selfReferringEdge.strokeWidth + 2
                    : 0;
                var rightBoundary =
                    width - (d.textWidth + OFFSET_VALUE) - BOUNDARY_MARGIN - selfReferringEdgeWidth;
                if (!adaptive) {
                    rightBoundary =
                        -xTranslation / graphZoom +
                        BOUNDARY_MARGIN / 2 +
                        width / graphZoom -
                        BOUNDARY_MARGIN -
                        (d.textWidth + OFFSET_VALUE) -
                        selfReferringEdgeWidth;
                }
                // currentXPos bounds the graph when toggle to !adaptive and moves each of the nodes to be in bounds
                var currentXPos = Math.max(getLeftXBoundaryMargin(), Math.min(rightBoundary, d.x));
                if (
                    adaptive &&
                    width < MAX_WIDTH &&
                    (currentXPos === getLeftXBoundaryMargin() || currentXPos === rightBoundary)
                ) {
                    if (!d3.select(this).classed("fixed")) {
                        width += OFFSET_VALUE;
                        boundingBoxContainer.attr("width", width);

                        link.attr("x1", function (d) {
                            return d.source.x;
                        }).attr("x2", function (d) {
                            return d.target.x;
                        });

                        node.attr("x", function (d) {
                            return d.x;
                        });
                    }
                }
                return (d.x = currentXPos);
            })
                .attr("y", function (d) {
                    var selfReferringEdge = getSelfReferringEdge(d);
                    var selfReferringEdgeHeight = selfReferringEdge
                        ? getSelfReferringRadius(selfReferringEdge) +
                          selfReferringEdge.strokeWidth +
                          SELF_REFERRING_Y_OFFSET +
                          0.5
                        : 0;
                    var bottomBoundary =
                        height - nodeHeight - BOUNDARY_MARGIN - selfReferringEdgeHeight;
                    if (!adaptive) {
                        bottomBoundary =
                            -yTranslation / graphZoom +
                            BOUNDARY_MARGIN / 2 +
                            height / graphZoom -
                            BOUNDARY_MARGIN -
                            nodeHeight -
                            selfReferringEdgeHeight;
                    }
                    // currentYPos bounds the graph when toggle to !adaptive and moves each of the nodes to be in bounds
                    var currentYPos = Math.max(
                        getTopYBoundaryMargin(),
                        Math.min(bottomBoundary, d.y)
                    );

                    if (
                        adaptive &&
                        height < MAX_HEIGHT &&
                        (currentYPos === getTopYBoundaryMargin() || currentYPos === bottomBoundary)
                    ) {
                        if (!d3.select(this).classed("fixed")) {
                            height += OFFSET_VALUE;
                            boundingBoxContainer.attr("height", height);
                            link.attr("y1", function (d) {
                                return d.source.y;
                            }).attr("y2", function (d) {
                                return d.target.y;
                            });

                            node.attr("y", function (d) {
                                return d.y;
                            });
                        }
                    }
                    return (d.y = currentYPos);
                })
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            /* Allows for looping edges.
             * From http://stackoverflow.com/questions/16358905/d3-force-layout-graph-self-linking-node
             */

            link.selectAll("path").attr("d", function (d) {
                if (d.target === d.source) {
                    var x1 = d.source.x;
                    var y1 = d.source.y;
                    var x2 = d.target.x;
                    var y2 = d.target.y;
                    var dx = x2 - x1;
                    var dy = y2 - y1;
                    var dr = Math.sqrt(dx * dx + dy * dy);

                    // Defaults for normal edge.
                    var drx = dr;
                    var dry = dr;
                    var xRotation = 0; // degrees
                    var largeArc = 0; // 1 or 0
                    var sweep = 1; // 1 or 0
                    var offset = parseFloat(d.strokeWidth);

                    // Edge adjustment values when long self-node edges get hidden behind the node.
                    var DEFAULT_NODE_SHIFT = 1.033;
                    var SHORT_NODE_LIMIT = 135;
                    var ADDITIONAL_SHIFT = 0.07;
                    var END_POINT_ADJUSTMENT = 1.2;

                    // Self edge.
                    if (x1 === x2 && y1 === y2) {
                        // Move the position of the loop.
                        x1 = d.source.x + d.source.textWidth * DEFAULT_NODE_SHIFT;
                        y1 = d.source.y + nodeHeight / 2 + SELF_REFERRING_Y_OFFSET;

                        // Fiddle with this angle to get loop oriented.
                        // (Future: This doesn't appear to change anything?)
                        xRotation = 45;

                        // Needs to be 1.
                        largeArc = 1;

                        // Change sweep to change orientation of loop.
                        sweep = 1;

                        drx = getSelfReferringRadius(d);
                        dry = getSelfReferringRadius(d);

                        // For whatever reason the arc collapses to a point if the beginning
                        // and ending points of the arc are the same, so kludge it.
                        if (d.source.textWidth > SHORT_NODE_LIMIT) {
                            DEFAULT_NODE_SHIFT += ADDITIONAL_SHIFT;
                        }
                        x2 =
                            d.source.x +
                            (d.source.textWidth / END_POINT_ADJUSTMENT) * DEFAULT_NODE_SHIFT;
                        y2 = d.source.y + nodeHeight;

                        if (d.value < 0 && grnState.colorOptimal) {
                            offset = Math.max(10, parseFloat(d.strokeWidth));
                        }
                    }

                    d.label = {
                        x: Math.min(width - 13 * offset, x1), // For 4 decimal places
                        y: Math.min(height - offset, y1 + dry * 3),
                    };

                    return (
                        "M" +
                        x1 +
                        "," +
                        y1 +
                        "A" +
                        drx +
                        "," +
                        dry +
                        " " +
                        xRotation +
                        "," +
                        largeArc +
                        "," +
                        sweep +
                        " " +
                        x2 +
                        "," +
                        (y2 + offset)
                    );
                } else {
                    return moveTo(d) + lineTo(d);
                }
            });

            link.select("path.main").attr("marker-end", function (d) {
                var x1 = d.source.x;
                var y1 = d.source.y;
                var x2 = d.target.x;
                var y2 = d.target.y;
                var minimum = "";
                var selfRef = "";

                if (normalize(d) <= grayThreshold) {
                    minimum = "gray";
                }

                if (x1 === x2 && y1 === y2) {
                    selfRef = "_SelfReferential";
                }

                if (d.type === "repressor" && grnState.colorOptimal) {
                    if (d.tanRatioMoveable > d.tanRatioFixed || d.target === d.source) {
                        // if horizontal repressor
                        return (
                            "url(#repressorHorizontal" +
                            selfRef +
                            "_StrokeWidth" +
                            d.strokeWidth +
                            minimum +
                            ")"
                        );
                    } else {
                        // otherwise vertical repressor
                        return (
                            "url(#repressor" +
                            selfRef +
                            "_StrokeWidth" +
                            d.strokeWidth +
                            minimum +
                            ")"
                        );
                    }
                } else {
                    // otherwise arrowhead
                    return (
                        "url(#arrowhead" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")"
                    );
                }
            });

            link.select("text")
                .attr("x", function (d) {
                    return d.label.x;
                })
                .attr("y", function (d) {
                    return d.label.y;
                });
        } catch (e) {
            console.log(e);
            console.warn("Detected invalid node. Moving on to next node.");
        }
    }

    function normalize(d) {
        return Math.abs(d.value / maxWeight).toPrecision(4);
    }

    function dragstart(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        if (!adaptive) {
            /* fx and fy stands for fixed x and y which is when node is fixed to a position or
                to prevent tick from adjusting position of node
            */
            // prevents nodes from being dragged outside of right boundary
            if (
                d3.event.x + d.textWidth <=
                -xTranslation / graphZoom +
                    BOUNDARY_MARGIN / 2 +
                    width / graphZoom -
                    BOUNDARY_MARGIN
            ) {
                d.fx = d3.event.x;
            } else {
                d.fx =
                    -xTranslation / graphZoom +
                    BOUNDARY_MARGIN / 2 +
                    width / graphZoom -
                    BOUNDARY_MARGIN -
                    d.textWidth;
            }

            // prevent nodes from being dragged out of bottom boundary
            if (
                d3.event.y + nodeHeight <=
                -yTranslation / graphZoom +
                    BOUNDARY_MARGIN / 2 +
                    height / graphZoom -
                    BOUNDARY_MARGIN
            ) {
                // fy stands for fixed y
                d.fy = d3.event.y;
            } else {
                d.fy =
                    -yTranslation / graphZoom +
                    BOUNDARY_MARGIN / 2 +
                    height / graphZoom -
                    BOUNDARY_MARGIN -
                    nodeHeight;
            }
        } else {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
    }

    grnState.simulation = simulation;

    // The restrict graph state is sometimes carried over across reloads
    restrictGraphToViewport($("input[name=viewport]").prop("checked"));

    modifyChargeParameter(grnState.chargeSlider.currentVal);
    modifyLinkDistanceParameter(grnState.linkDistanceSlider.currentVal);

    $(".startDisabled").removeClass("disabled");
};
