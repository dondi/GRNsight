
/* globals d3 */
/* eslint-disable no-use-before-define, func-style */
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

/* eslint-disable no-unused-vars */
var drawGraph = function (nodes, links, positiveWeights, negativeWeights, sheetType, warnings, sliderController, normalization, grayThreshold) {
/* eslint-enable no-unused-vars */

    var $container = $(".grnsight-container");
    d3.selectAll("svg").remove();

    $container.removeClass(CURSOR_CLASSES).addClass("cursorGrab"); // allow graph dragging right away

    var width = $container.width();
    var height = $container.height();
    var nodeHeight = 30;
    var colorOptimal = true;

    var CURSOR_CLASSES = "cursorGrab cursorGrabbing";

    var zoomSliderScale = 1; // Tracks the value of the zoom slider, initally at 100%
    $("#zoomPercent").html(100 + "%"); // initalize zoom percentage value

    $("#warningMessage").html(warnings.length !== 0 ? "Click here in order to view warnings." : "");

    var getNodeWidth = function (node) {
        return node.name.length * 12 + 5;
    };

  // If colorOptimal is false, then weighting is ignored, and the lines are all drawn as if it was an unweighted sheet
    if (!$("#colorEdges").hasClass("active")) {
        colorOptimal = false;
    }

    var adaptive = !$("input[name='viewport']").prop("checked");

    var MIN_SCALE = 0.25;
    var ADAPTIVE_MAX_SCALE = 4; // regardless of whether the viewport is fixed or adaptive, the zoom slider now operates on the same scale

    var minimumScale = MIN_SCALE;
    var maximumScale = ADAPTIVE_MAX_SCALE;

    var allWeights = positiveWeights.concat(negativeWeights);

    if (!colorOptimal) {
        for (var i = 0; i < allWeights.length; i++) {
            if ( allWeights[i] !== 0 ) {
                allWeights[i] = 1;
            }
        }
    } else {
        for (var i = 0; i < allWeights.length; i++ ) {
            allWeights[i] = Math.abs((allWeights[i]).toPrecision(4));
        }
    }

  // normalization all weights b/w 2-14
    var normMax = +$("#normalization-max").val();
    var totalScale = d3.scale.linear()
    .domain([0, normalization && normMax > 0 ? normMax : d3.max(allWeights)])
    .range([2, 14])
    .clamp(true);

    var unweighted = false;

  // normalization all weights b/w size 2 and size 14
  // if unweighted, weight is 2
    if (sheetType === "unweighted") {
        totalScale = d3.scale.quantile()
        .domain(d3.extent(allWeights))
        .range(["2"]);
        unweighted = true;
        $(".normalization-form").append("placeholder='unweighted'");
    } else {
        document.getElementById("normalization-max").setAttribute("placeholder", d3.max(allWeights));
    }

    var getEdgeThickness = function (edge) {
        return Math.round(totalScale(Math.abs(edge.value)));
    };

    var force = d3.layout.force()
      .size([width, height])
      .on("tick", tick)
      .linkDistance($("#linkDistInput").val())
      .charge($("#chargeInput").val())
      .chargeDistance($("#chargeDistInput").val())
      .gravity($("#gravityInput").val());

    var drag = force.drag()
      .origin(function(d) {
          return d;
      })
      .on("dragstart", dragstart);

    var manualZoom = false;
    var zoom = d3.behavior.zoom()
    .center([width / 2, height / 2])
    .scaleExtent([minimumScale, maximumScale])
    .on("zoom", zoomed);

    var svg = d3.select($container[0]).append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom).on("wheel.zoom", null) // disables mouse wheel zooming
      .append("g") // required for zoom to work
        .attr("class", "boundingBox")
        .attr("width", width)
        .attr("height", height)
        .append("g"); // appended another g here...

    d3.select("svg").on("dblclick.zoom", null); // disables double click zooming

  // This rectangle catches all of the mousewheel and pan events, without letting
  // them bubble up to the body.
    var innerRect = svg.append("rect") // eslint-disable-line no-unused-vars
                     .attr("width", width)
                     .attr("height", height)
                     .style("fill", "none")
                     .style("pointer-events", "all")
                     .attr("stroke", adaptive ? "none" : "#9A9A9A")
                     .append("g");


    function zoomed() {
      // this part is not working
        if (!adaptive) { // Limit to viewport
            var scale = zoom.scale();
            var scaledWidth = scale * width;
            var scaledHeight = scale * height;
            var maxX = width - scaledWidth;
            var maxY = height - scaledHeight;

            d3.event.translate[0] = Math.min(Math.max(d3.event.translate[0], 0), maxX);
            d3.event.translate[1] = Math.min(Math.max(d3.event.translate[1], 0), maxY);
            zoom.translate([d3.event.translate[0], d3.event.translate[1]]);
        }
        svg.attr("transform", "translate(" + zoom.translate() + ")scale(" + d3.event.scale + ")");

    }

    d3.selectAll(".scrollBtn").on("click", null); // Remove event handlers, if there were any.
    var arrowMovement = [ "Up", "Left", "Right", "Down" ];
    arrowMovement.forEach(function (direction) {
        d3.select(".scroll" + direction).on("click", function () {
            move(direction.toLowerCase());
        });
    });

    d3.select(".center").on("click", center);

    var leftPoints;
    var rightPoints;
    var scaleIncreasePerLeftPoint;
    var scaleIncreasePerRightPoint;
/*
    We have to do some mapping so that the zoom slider appears as it should.
    Zooming out sets the scale to a value between 0 and 1. Zooming in sets it
    to a value between 1 and infinity. A scale of 0.25 to 5 on a zoom slider
    without transformations will have 1 at the very far left. However, that's
    an inaccurate way to represent what's actually happening. So this function
    maps the scale from 0 to some x, with that x being calculated based on the
    input scales.
*/
    var setupZoomSlider = function (minScale) {
      // If the maximumScale is 1, we won't need to calculate any values from 1 to maxScale.
      // So we'll just treat it as 0.

        maxScale = ADAPTIVE_MAX_SCALE;

      // Each integer on the zoom is equivalent to 100 steps.
        var NUMBER_POINTS_PER_INT = 100;

      // Get the value that, if multiplied by the minScale value, would return 1. (ex: 0.25 * 4 = 1)
      // This gives us the equivalent value of this minimum scale, should it be treated
      // as a scale increase. This mostly allows us to treat this minimum scale as a non-decimal value,
      // but it also provides a way to compare the total effect this minimum scale would have
      // in a way that is easier to understand.
        var minScaleReversed = 100 / (minScale * 100);

      // Number of points required to display the minimum scale, now that's it's been transformed. These
      // are the points that represent everything on the scale less than one.
        leftPoints = minScaleReversed * NUMBER_POINTS_PER_INT;

      // We want to end up with a total increase that, once we've gone through all the
      // left points, produces 1 when added to minscale. So for scale 0.25 with 400
      // left points, we need to know what we could add to 0.25 400 times to produce 1.
      // We divide 0.75 by 400  to get that result.
        scaleIncreasePerLeftPoint = (1 - minScale) / leftPoints;

      // Points representing scales greater than 1.
        rightPoints = maxScale * NUMBER_POINTS_PER_INT;

      // For the same concept as above, we need to figure out what to add to 1 so
      // so that we can end up with maxScale. Note that we start at 1 and not 0 because
      // the scale is beginning at 1.
        scaleIncreasePerRightPoint = (maxScale - 1) / rightPoints;
        var totalPoints = leftPoints + rightPoints;

      // Returns the x that we're mapping to. Now we can set up the range slider.
        var maxRangeValue = totalPoints / 100;

        $(".zoomSlider").attr("min", 0);
        $(".zoomSlider").attr("max", maxRangeValue);
        $(".zoomSlider").val(0.01 * leftPoints);
    };

    setupZoomSlider(minimumScale);

    function updateZoomPercent() {
        var value = Math.round(($(".zoomSlider").val() / 8 * 200));
        value = value === 0 ? 1 : value;
        $("#zoomPercent").html(value + "%");
    }

    function getMappedValue(scale) {
      // Reverse the calculations from setupZoomSlider to get value from equivalentScale
        var equivalentPoint;
        if (scale <= 1) {
            equivalentPoint = (scale - minimumScale) / (scaleIncreasePerLeftPoint * 100);
        } else {
            equivalentPoint = (scale - 1) / scaleIncreasePerRightPoint + leftPoints;
            equivalentPoint /= 100;
        }
        $(".zoomSlider").val(equivalentPoint.toFixed(2));
    }

    d3.select(".zoomSlider").on("input", function () {
        var value = $(this).val();
        if (!adaptive && value >= ADAPTIVE_MAX_SCALE) {
            value = 4;
            var currentPoint = value * 100;
            var equivalentScale;
            if (currentPoint <= leftPoints) {
                equivalentScale = minimumScale;
                equivalentScale += scaleIncreasePerLeftPoint * currentPoint;
            } else {
                currentPoint = currentPoint - leftPoints;
                equivalentScale = 1;
                equivalentScale += scaleIncreasePerRightPoint * currentPoint;
            }
            zoomSliderScale = equivalentScale;
          // zoom.scale(equivalentScale);
            manualZoomFunction(equivalentScale);
            $(".zoomSlider").val(ADAPTIVE_MAX_SCALE);
            updateZoomPercent();
            return;
        }
        if (!adaptive && value < ADAPTIVE_MAX_SCALE || adaptive) {
            var currentPoint = value * 100;
            var equivalentScale;
            if (currentPoint <= leftPoints) {
                equivalentScale = minimumScale;
                equivalentScale += scaleIncreasePerLeftPoint * currentPoint;
            } else {
                currentPoint = currentPoint - leftPoints;
                equivalentScale = 1;
                equivalentScale += scaleIncreasePerRightPoint * currentPoint;
            }
            zoomSliderScale = equivalentScale;
          // zoom.scale(equivalentScale);
            manualZoomFunction(equivalentScale);
        }
    }).on("mousedown", function () {
        manualZoom = true;
    }).on("mouseup", function () {
        manualZoom = false;
    });

    var manualZoomFunction = function (zoomScale) {
        if (zoomScale < 1) {
            $container.removeClass(CURSOR_CLASSES).addClass("cursorGrab");
        } else if (!adaptive && zoomScale >= 1) {
            $container.removeClass(CURSOR_CLASSES);
        }
        updateZoomPercent();
        var container = d3.select($container[0]).select("svg").select("g");
        var h = container.attr("height");
        var w = container.attr("width");
        container.attr("transform",
              "translate(" + w / 2 + ", " + h / 2 + ") " +
              "scale(" + zoomScale + ") " +
              "translate(" + (-w / 2) + ", " + (-h / 2) + ")"
          );
    };

    d3.selectAll(".boundBoxSize").on("click", function () {
        var newWidth = $container.width();
        var newHeight = $container.height();

        if (adaptive) {
            width = (width < newWidth) ? newWidth : width;
            height = (height < newHeight) ? newHeight : height;
        } else {
            width = newWidth;
            height = newHeight;
        }

      // Subtract 1 from SVG height if we are fitting to window so as to prevent scrollbars from showing up
      // Is inconsistent, but I'm tired of fighting with it...
        d3.select("svg").attr("width", newWidth)
          .attr("height", $(".grnsight-container").hasClass("containerFit") ? newHeight - 1 : newHeight);
        d3.select("rect").attr("width", width).attr("height", height);
        d3.select(".boundingBox").attr("width", width).attr("height", height);
        force.size([width, height]).resume();
    });

    d3.selectAll("input[name=viewport]").on("change", function () {
        var fixed = $(this).prop("checked");
        if (!fixed) {
            $container.addClass("cursorGrab");
            adaptive = true;
            d3.select("rect").attr("stroke", "none");
        } else if (fixed) {
            adaptive = false;
            $container.removeClass(CURSOR_CLASSES);
            if (zoomSliderScale > 1) {
                $(".zoomSlider").val(ADAPTIVE_MAX_SCALE);
                manualZoomFunction(1);
                $container.removeClass(CURSOR_CLASSES);
            }
            width = $container.width();
            height = $container.height();
            d3.select("rect").attr("stroke", "#9A9A9A")
          .attr("width", width)
          .attr("height", height);
            $(".boundingBox").attr("width", width).attr("height", height);
            center();
        }
        force.size([width, height]).resume();
    });

    $(window).on("resize", function () {
        if ($container.hasClass("containerFit")) {
            $(".boundBoxSize").trigger("click");
        }
    });

    $container.on("mousedown", function () {
        $container.removeClass(CURSOR_CLASSES).addClass("cursorGrabbing");
        if (!adaptive) {
            $container.removeClass(CURSOR_CLASSES);
        }
    }).on("mouseup", function () {
        $container.removeClass(CURSOR_CLASSES).addClass("cursorGrab");
        if (!adaptive) {
            $container.removeClass(CURSOR_CLASSES);
        }
    });

    function center() {
        svg.call(zoom.event);
        var scale = zoom.scale();
        var viewportWidth = $container.width();
        var viewportHeight = $container.height();
        var boundingBoxWidth = $(".boundingBox").attr("width");
        var boundingBoxHeight = d3.select(".boundingBox").select("g").attr("height");
        boundingBoxHeight = boundingBoxHeight === null ? $(".boundingBox").attr("height") : boundingBoxHeight;

        var scaledWidth = scale * boundingBoxWidth;
        var scaledHeight = scale * boundingBoxHeight;

        var translatedWidth = (viewportWidth - scaledWidth) / 2;
        var translatedHeight = (viewportHeight - scaledHeight) / 2;
        zoom.translate([translatedWidth, translatedHeight]);
        svg.transition().call(zoom.event);
    }

  /* Credit to https://bl.ocks.org/mbostock/7ec977c95910dd026812 */
    function move(direction) {
        svg.call(zoom.event);
        var currentTransform = d3.transform(svg.attr("transform"));
        var currentTranslate = [0, 0];
        if (currentTransform) {
            currentTranslate = d3.transform(currentTransform).translate;
        }
        currentTranslate[0] += (direction === "left" ? 50 : (direction === "right" ? -50 : 0));
        currentTranslate[1] += (direction === "up" ? 50 : (direction === "down" ? -50 : 0));
        zoom.translate(currentTranslate);
        svg.transition().call(zoom.event);
    }

    var defs = svg.append("defs");

    var link = svg.selectAll(".link");
    var node = svg.selectAll(".node");
    var weight = svg.selectAll(".weight");


    force.nodes(nodes)
       .links(links)
       .start();

    link = link.data(links)
             .enter().append("g")
             .attr("class", "link")
             .attr("strokeWidth", getEdgeThickness);

    node = node.data(nodes)
             .enter().append("g")
             .attr("class", "node")
             .attr("id", function(d) {
                 return "node" + d.index;
             })
             .attr("width", getNodeWidth)
             .attr("height", nodeHeight)
             .call(drag);

    if (sheetType === "weighted") {
        link.append("path")
      .attr("class", "mousezone")
      .style("stroke-width", function (d) {
          var baseThickness = getEdgeThickness(d);
          return Math.max(baseThickness, 7);
      });
    }

    var grayThreshold = +$("#grayThresholdValue").val();

    link.append("path")
    .attr("class", "main")
    .attr("id", function (d) {
        return "path" + d.source.index + "_" + d.target.index;
    }).style("stroke-width", function (d) {
        return d.strokeWidth = getEdgeThickness(d);
    }).style("stroke", function (d) {
        if (unweighted || !colorOptimal) {
            return "black";
        } else if (normalize(d) <= grayThreshold) {
            return "gray";
        } else {
            return d.stroke;
        }
    }).attr("marker-end", function (d) {
        var x1 = d.source.x;
        var y1 = d.source.y;
        var x2 = d.target.x;
        var y2 = d.target.y;
        var minimum = "";
        var selfRef = "";
        var yOffsets;
        var xOffsets;
        var color;

        if (Math.abs(d.value / (d3.max(allWeights))) <= grayThreshold) {
            minimum = "gray";
        }
        if ( x1 === x2 && y1 === y2 ) {
            selfRef = "_SelfReferential";
        }
        // If the same ID is created twice (usually happens in the unweighted GRNS), it causes unpredictable behavior
        // in the markers. To prevent this, first we check to make sure the ID about to be created doesn't exist.
        if ( $("#" + d.type + selfRef + "_StrokeWidth" + d.strokeWidth + minimum).length !== 0 ) {
            return "url(#" + d.type + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
        } else {

          // If negative, you need one bar for horizontal and one for vertical. If the user is not coloring the weighted
          // sheets, then we make all of the markers arrowheads.
            if (d.value < 0 && colorOptimal) {
                defs.append("marker")
             .attr("id", "repressor" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum)
             .attr("refX", function() {
                 xOffsets = {
                     2 : 1, 3 : 2, 4 : 2, 5 : 2, 6 : 2.5, 7 : 3, 8 : 3.5,
                     9 : 4, 10 : 4.5, 11 : 5, 12 : 5, 13 : 5.5, 14 : 6
                 };
                 return xOffsets[d.strokeWidth];
             })
             .attr("refY", function() {
                 yOffsets = {
                     2 : 13, 3 : 13, 4 : 13.5, 5 : 14, 6 : 15.5, 7 : 17, 8 : 17,
                     9 : 17, 10 : 17, 11 : 17, 12 : 18.5, 13 : 18, 14 : 19.25
                 };
                 return yOffsets[d.strokeWidth];
             })
             .attr("markerUnits", "userSpaceOnUse")
             .attr("markerWidth", function() {
                 return d.strokeWidth;
             })
             .attr("markerHeight", function() {
                 return 25 + d.strokeWidth;
             })
             .attr("orient", 180)
             .append("rect")
                .attr("width", function() {
                    return d.strokeWidth;
                })
                .attr("height", function () {
                    return 25 + d.strokeWidth;
                })
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("style", function() {
                    if ( normalize(d) <= grayThreshold) {
                        color = "gray";
                    } else {
                        color = d.stroke;
                    }
                    return "stroke:" + color + "; fill: " + color + "; stroke-width: 0";
                });

                defs.append("marker")
             .attr("id", "repressorHorizontal" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum)
             .attr("refX", function() {
                 if (x1 === x2 && y1 === y2) { // if self referential...
                     xOffsets = {
                         2 : 14, 3 : 15, 4 : 15, 5 : 15, 6 : 16, 7 : 16.5, 8 : 16.5,
                         9 : 17, 10 : 17.5, 11 : 18, 12 : 19, 13 : 19.5, 14 : 16
                     };
                 } else {
                     xOffsets = {
                         2 : 13, 3 : 13, 4 : 13.5, 5 : 14, 6 : 15.5, 7 : 16.5, 8 : 17,
                         9 : 16, 10 : 17, 11 : 17, 12 : 16, 13 : 18, 14 : 18
                     };
                 }
                 return xOffsets[d.strokeWidth];
             })
             .attr("refY", function() {
                 yOffsets = {
                     2 : 1, 3 : 2, 4 : 2, 5 : 2, 6 : 2.5, 7 : 3, 8 : 3.5,
                     9 : 4, 10 : 4.5, 11 : 5, 12 : 5, 13 : 5.5, 14 : 6
                 };
                 return yOffsets[d.strokeWidth];
             })
             .attr("markerUnits", "userSpaceOnUse")
             .attr("markerWidth", function() {
                 return 25 + d.strokeWidth;
             })
             .attr("markerHeight", function() {
                 return d.strokeWidth;
             })
             .attr("orient", 180)
             .append("rect")
                .attr("width", function() {
                    return 25 + d.strokeWidth;
                })
                .attr("height", function() {
                    return d.strokeWidth;
                })
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("style", function() {
                    if (normalize(d) <= grayThreshold) {
                        color = "gray";
                    } else {
                        color = d.stroke;
                    }
                    return "stroke:" + color + "; fill: " + color + "; stroke-width: 0";
                });
            } else {
            // Arrowheads
                if (d.strokeWidth === 2) {
                    d.strokeWidth = 4;
                }
                defs.append("marker")
              .attr("id",  "arrowhead" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum)
              .attr("viewBox", "0 0 15 15")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("refX", function () {
                // Individual offsets for each possible stroke width
                  return ((x1 === x2 && y1 === y2) ?
                  {
                      2: 9, 3: 8.5, 4: 9, 5: 9, 6: 9, 7: 9,
                      8: 8.3, 9: 9.1, 10: 10, 11: 9.5, 12: 9, 13: 8.3,
                      14: 8.3
                  } : {
                      2: 11.75, 3: 11, 4: 9.75, 5: 9.25,  6: 8.5, 7: 10,
                      8: 9.75, 9: 9.5, 10: 9, 11: 9.5, 12: 9.5, 13: 9.25,
                      14: 9
                  }
                )[d.strokeWidth];
              })
              .attr("refY", function () {
                  return ((x1 === x2 && y1 === y2) ?
                  {
                      2: 6.7, 3: 6, 4: 6, 5: 5.5, 6: 5, 7: 5.75,
                      8: 5.7, 9: 6, 10: 5.7, 11: 5.5, 12: 5.9, 13: 6,
                      14: 5.75
                  } : {
                      2: 5, 3: 5, 4: 4.8, 5: 5, 6: 5, 7: 4.98,
                      8: 4.9, 9: 5.2, 10: 4.85, 11: 4.7, 12: 5.15,
                      13: 5, 14: 5.3
                  }
                )[d.strokeWidth];
              })
              .attr("markerUnits", "userSpaceOnUse")
              .attr("markerWidth", function() {
                  return 12 + ((d.strokeWidth < 7) ? d.strokeWidth * 2.25 : d.strokeWidth * 3);
              })
              .attr("markerHeight", function() {
                  return 5 + ((d.strokeWidth < 7) ? d.strokeWidth * 2.25 : d.strokeWidth * 3);
              })
              .attr("orient", function () {
                  return (x1 === x2 && y1 === y2) ?
                  {
                      2: 270, 3: 270, 4: 268, 5: 264, 6: 268, 7: 252,
                      8: 248, 9: 243, 10: 240, 11: 240, 12: 235, 13: 233,
                      14: 232
                  }[d.strokeWidth] : "auto";
              })
              .append("path")
                .attr("d", "M 0 0 L 14 5 L 0 10 Q 6 5 0 0")
                .attr("style", function () {
                    if (unweighted || !colorOptimal) {
                        color = "black";
                    } else if ( normalize(d) <= grayThreshold) {
                        color = "gray";
                    } else {
                        color = d.stroke;
                    }
                    return "stroke: " + color + "; fill: " + color;
                });
            }
        }
        return "url(#" + d.type + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
    });

    if (sheetType === "weighted") {
        link.append("text")
        .attr("class", "weight")
        .attr("text-anchor", "middle")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.value.toPrecision(4);
        });

        weight = weight.data(links)
        .enter().append("text")
        .attr("class", "weight")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.value.toPrecision(4);
        })
        .each(function (d) {
            d.weightElement = d3.select(this);
        });

    }

  /* Big thanks to the following for the smart edges
   * https://github.com/cdc-leeds/PolicyCommons/blob/b0dea2a4171989123cbee377a6ae260b8612138e/visualize/conn-net-svg.js#L119
   */
    var moveTo = function (d) {
        var node = d3.select("#node" + d.source.index);
        var w = parseFloat(node.attr("width"));
        var h = parseFloat(node.attr("height"));

        d.source.newX = d.source.x + (w / 2);
        d.source.newY = d.source.y + (h / 2);

        return "M" + d.source.newX + "," + d.source.newY + " ";
    };

    var CURVE_THRESHOLD = 200;
    var lineTo = function (d) {
        var node = d3.select("#node" + d.target.index);
        var w = +node.attr("width");
        var h = +node.attr("height");
        var x1 = d.source.x;
        var y1 = d.source.y;
        var x2 = d.target.x;
        var y2 = d.target.y;

        d.target.centerX = d.target.x + (w / 2);
        d.target.centerY = d.target.y + (h / 2);

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
        if (((d.target.newX > d.source.x) && (d.target.newY > d.source.y)) ||
                  ((d.target.newX < d.source.x) && (d.target.newY < d.source.y))) {
            vx = -vx; vy = -vy;
        }

        var curveToStraight = (umagnitude - CURVE_THRESHOLD) / 4;
        var inlineOffset = Math.max(umagnitude / 4, curveToStraight);
        var orthoOffset = Math.max(0, curveToStraight);
        var cp1x = x1 + inlineOffset * ux + vx * orthoOffset;
        var cp1y = y1 + inlineOffset * uy + vy * orthoOffset;
        var cp2x = x2 - inlineOffset * ux + vx * orthoOffset;
        var cp2y = y2 - inlineOffset * uy + vy * orthoOffset;

        d.label = {
            x: (x1 + cp1x + cp2x + x2) / 4,
            y: (y1 + cp1y + cp2y + y2) / 4
        };

        cp1x = Math.min(Math.max(0, cp1x), width);
        cp1y = Math.min(Math.max(0, cp1y), height);
        cp2x = Math.min(Math.max(0, cp2x), width);
        cp2y = Math.min(Math.max(0, cp2y), height);
        return "C" + cp1x + " " + cp1y + ", " +
              cp2x + " " + cp2y + ", " +
              x2 + " " + y2;
    };

    function smartPathEnd(d, w, h) {
        var MINIMUM_DISTANCE = 8;

    // Set an offset if the edge is a repressor to make room for the flat arrowhead
        var globalOffset = parseFloat(d.strokeWidth);

        if (d.value < 0 && colorOptimal) {
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
        d.tanRatioMoveable = Math.abs(d.target.centerY - d.source.newY) / Math.abs(d.target.centerX - d.source.newX);
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
                    d.target.newX = d.target.x + w + globalOffset + 0.25 * d.strokeWidth - thicknessAdjustment;
                } else {
                    d.target.newX = d.target.x + w + globalOffset;
                }
            }

      // Now use a bit of trigonometry to work out the y-coord.

      // By default assume path intersects towards top of node
            d.target.newY = d.target.centerY - ((d.target.centerX - d.target.x) * d.tanRatioMoveable);

      // But...
            if (d.target.centerY < d.source.newY) {
        // i.e. if target node is above the source node
        // then path intersects towards bottom of the node
                d.target.newY = (2 * d.target.y) - d.target.newY + h;
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
                    d.target.newY = d.target.y + h + globalOffset + 0.25 * d.strokeWidth - thicknessAdjustment;
                } else {
                    d.target.newY = d.target.y + h + globalOffset;
                }
            }

      // Now use a bit of trigonometry to work out the x-coord.

      // By default assume path intersects towards lefthand side
            d.target.newX = d.target.centerX - ((d.target.centerY - d.target.y) / d.tanRatioMoveable);

      // But...
            if (d.target.centerX < d.source.newX) {
        // i.e. if target node is to left of the source node
        // then path intersects towards the righthand side
                d.target.newX = (2 * d.target.x) - d.target.newX + w;
            }
        }
    }

    var dblclick = function (d) {
        d3.event.stopPropagation();
        d3.select(this).classed("fixed", d.fixed = false);
    };

    var nodeTextDblclick = function (d) {
    // Relay the double-click to our parent.
        dblclick.call(this.parentNode, d);
    };

    var rect = node.append("rect")
     .attr("width", function(d) {
         return this.parentNode.getAttribute("width");
     })
     .attr("height", function() {
         return this.parentNode.getAttribute("height");
     })
     .attr("stroke-width", "2px")
     .on("dblclick", dblclick);

    var text = node.append("text")
    .attr("dy", 22)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("stroke-width", "0")
    .style("fill", "black")
    .text(function(d) {
        return d.name;
    })
    .attr("dx", function (d) {
        var textWidth = this.getBBox().width;
        d.textWidth = textWidth < 68.5625 ? 68.5625 : textWidth; // minimum width
        return d.textWidth / 2 + 3;
    })
    .on("dblclick", nodeTextDblclick);

    rect
    .attr("width", function(d) {
        return d.textWidth + 6;
    });

    node
    .attr("width", function(d) {
        return d.textWidth;
    });

    $(".node").css({
        "cursor": "move",
        "fill": "white",
        "stroke": "#000",
        "stroke-width": "1.5px"
    });

    $(".link").css({
        "stroke": "#000",
        "fill": "none",
        "stroke-width": "1.5px"
    });

    var currentWeightVisibilitySetting = null;

    if (sheetType === "weighted") {
        if ($(".weightedGraphOptions").hasClass("hidden")) {
            $(".weightedGraphOptions").removeClass("hidden");
        }
        var setWeightsVisability = function() {

            var WEIGHTS_SHOW_MOUSE_OVER_CLASS = ".weightsMouseOver";
            var WEIGHTS_HIDE_CLASS            = ".weightsNever";
            var WEIGHTS_SHOW_ALWAYS_CLASS = ".weightsAlways";

            var WEIGHT_VISIBILITY_SETTINGS = [
                WEIGHTS_SHOW_MOUSE_OVER_CLASS,
                WEIGHTS_HIDE_CLASS,
                WEIGHTS_SHOW_ALWAYS_CLASS
            ];

            var latestWeightVisibilitySetting = WEIGHT_VISIBILITY_SETTINGS.filter(function (setting) {
                return $(setting).hasClass("selected");
            })[0];

            if (currentWeightVisibilitySetting === latestWeightVisibilitySetting) {
                return;
            }

            currentWeightVisibilitySetting = latestWeightVisibilitySetting;
            var showWeight = function (d) {
                var mouse = d3.mouse(this);
                d.weightElement
          .attr("x", mouse[0])
          .attr("y", mouse[1])
          .classed("visible", true);
            };

            var hideWeight = function (d) {
                d.weightElement
          .attr("x", null)
          .attr("y", null)
          .classed("visible", false);
            };

            if (currentWeightVisibilitySetting === WEIGHTS_SHOW_MOUSE_OVER_CLASS) {
                link.selectAll(".weight")
          .classed("visible", false);

                link.on("mouseover", showWeight).on("mouseout", hideWeight);
                weight.on("mouseover", showWeight).on("mouseout", hideWeight);

            } else if (currentWeightVisibilitySetting === WEIGHTS_HIDE_CLASS) {
                link.selectAll(".weight")
          .classed("visible", false);

                link.on("mouseover", null).on("mouseout", null);
                weight.on("mouseover", null).on("mouseout", null);

            } else if (currentWeightVisibilitySetting === WEIGHTS_SHOW_ALWAYS_CLASS) {
                link.selectAll(".weight")
          .classed("visible", true);

                link.on("mouseover", null).on("mouseout", null);
                weight.on("mouseover", null).on("mouseout", null);
            }
        };

        setInterval(setWeightsVisability, 100);
    } else {
        if (!$(".weightedGraphOptions").hasClass("hidden")) {
            $(".weightedGraphOptions").addClass("hidden");
        }
    }

  // Tick only runs while the graph physics are still running. (I.e. when the graph is completely relaxed, tick stops running.)
    function tick() {
        var getSelfReferringEdge = function (node) {
            return link.select("path")[0].map(function (path) {
                return path.__data__;
            }).filter(function (pathData) {
                return pathData.source === node && pathData.source === pathData.target;
            })[0];
        };
        var getSelfReferringRadius = function (edge) {
            return edge ? 17 + (getEdgeThickness(edge) / 2) : 0;
        };
        var BOUNDARY_MARGIN = 5;
        var SELF_REFERRING_Y_OFFSET = 6;
        MAX_WIDTH = 5000;
        MAX_HEIGHT = 5000;
        OFFSET_VALUE = 5;

        try {
            node.attr("x", function (d) {
                var selfReferringEdge = getSelfReferringEdge(d);

                var selfReferringEdgeWidth = (selfReferringEdge ? getSelfReferringRadius(selfReferringEdge) +
              selfReferringEdge.strokeWidth + 2 : 0);
                var rightBoundary = width - d.textWidth - BOUNDARY_MARGIN - selfReferringEdgeWidth;
                var currentXPos = Math.max(BOUNDARY_MARGIN, Math.min(rightBoundary, d.x));
                if (adaptive && width < MAX_WIDTH &&
             (currentXPos === BOUNDARY_MARGIN || currentXPos === rightBoundary)) {
                    if (!d3.select(this).classed("fixed")) {
                        width += OFFSET_VALUE;
                        svg.attr("width", width);
                        force.size([width, height]).resume();
                    }
                }
                return d.x = currentXPos;
            }).attr("y", function (d) {
                var selfReferringEdge = getSelfReferringEdge(d);
                var selfReferringEdgeHeight = (selfReferringEdge ? getSelfReferringRadius(selfReferringEdge) +
            selfReferringEdge.strokeWidth + SELF_REFERRING_Y_OFFSET + 0.5 : 0);
                var bottomBoundary = height - nodeHeight - BOUNDARY_MARGIN - selfReferringEdgeHeight;
                var currentYPos = Math.max(BOUNDARY_MARGIN, Math.min(bottomBoundary, d.y));
                if (adaptive && height < MAX_HEIGHT &&
             (currentYPos === BOUNDARY_MARGIN || currentYPos === bottomBoundary)) {
                    if (!d3.select(this).classed("fixed")) {
                        height += OFFSET_VALUE;
                        svg.attr("height", height);
                        force.size([width, height]).resume();
                    }
                }
                return d.y = currentYPos;
            }).attr("transform", function (d) {
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
                    var largeArc = 0;  // 1 or 0
                    var sweep = 1;     // 1 or 0
                    var offset = parseFloat(d.strokeWidth);

          // Self edge.
                    if (x1 === x2 && y1 === y2) {
            // Move the position of the loop.
                        x1 = d.source.x + (d.source.textWidth);
                        y1 = d.source.y + (nodeHeight / 2) + SELF_REFERRING_Y_OFFSET;

            // Fiddle with this angle to get loop oriented.
                        xRotation = 45;

            // Needs to be 1.
                        largeArc = 1;

            // Change sweep to change orientation of loop.
                        sweep = 1;

                        drx = getSelfReferringRadius(d);
                        dry = getSelfReferringRadius(d);

            // For whatever reason the arc collapses to a point if the beginning
            // and ending points of the arc are the same, so kludge it.
                        x2 = d.source.x + d.source.textWidth / 1.2;
                        y2 = d.source.y + nodeHeight;

                        if (d.value < 0 && colorOptimal) {
                            offset = Math.max(10, parseFloat(d.strokeWidth));
                        }
                    }

                    d.label = { x: x1, y: y1 + dry * 3 };

                    return "M" + x1 + "," + y1 +
                 "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " +
                       x2  + "," + (y2 + offset);
                } else {
                    return moveTo(d) + lineTo(d);
                }
            });

            link.select("path.main").attr("marker-end", function(d) {
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

                if (d.type === "repressor" && colorOptimal) {
                    if ((d.tanRatioMoveable > d.tanRatioFixed) || (d.target === d.source)) { // if horizontal repressor
                        return "url(#repressorHorizontal" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
                    } else { // otherwise vertical repressor
                        return "url(#repressor" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
                    }
                } else { // otherwise arrowhead
                    return "url(#arrowhead" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
                }
            });

            link.select("text").attr("x", function (d) {
                return d.label.x;
            }).attr("y", function (d) {
                return d.label.y;
            });

        } catch (e) {
            console.warn("Detected invalid node. Moving on to next node.");
        }
    }

    function normalize(d) {
        return Math.abs(d.value / (d3.max(allWeights)));
    }

    function dragstart(d) {
        var node = d3.select(this);
        d3.event.sourceEvent.stopPropagation();
        node.classed("fixed", d.fixed = true);
    }

    sliderController.addForce(force);
    sliderController.configureForceHandlers();

    $(".startDisabled").removeClass("disabled");
};
