import { GrnStateContext } from '../App';
import { useContext } from 'react';

export function tick({node, link}) {
    const { adaptive } = useContext(GrnStateContext);

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
                var currentYPos = Math.max(getTopYBoundaryMargin(), Math.min(bottomBoundary, d.y));

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
                        "url(#repressor" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")"
                    );
                }
            } else {
                // otherwise arrowhead
                return "url(#arrowhead" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
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
