import { NETWORK_GRN_MODE_FULL, NODE_MARGIN, NODE_HEIGHT } from "./constants";
import { getNodeWidth } from "./graphHelpers";

// TODO: add description from web-client-classic
export function normalize(d, maxWeight) {
  // console.log("normalize value", Math.abs(d.value / maxWeight).toPrecision(4));
  return Math.abs(d.value / maxWeight).toPrecision(4);
}

/**
 * Creates SVG markers (arrowheads and repressor bars) for graph edges
 * @param {Object} params - Parameters for marker creation
 * @param {Object} params.defs - D3 selection of SVG defs element
 * @param {Object} params.d - Edge data object
 * @param {number} params.grayThreshold - Threshold for gray coloring
 * @param {string} params.sheetType - Type of the sheet (e.g., "weighted" or "unweighted")
 * @param {number} params.maxWeight - Maximum weight value for normalization
 * @param {boolean} params.colorOptimal - Whether optimal coloring is enabled or not for edges
 * @param {string} params.networkMode - Network mode (e.g., "Gene Regulatory Network" or "Protein-Protein Interaction")
 * @returns {string} The marker ID to be used in marker-end attribute
 */
export function createEdgeMarker(params) {
  const { defs, d, grayThreshold, sheetType, maxWeight, colorOptimal, networkMode } = params;

  const x1 = d.source.x;
  const y1 = d.source.y;
  const x2 = d.target.x;
  const y2 = d.target.y;
  let minimum = "";
  let selfRef = "";

  if (x1 === x2 && y1 === y2) {
    selfRef = "_SelfReferential";
  }

  if (d.stroke == "gray") {
    minimum = "gray";
  }

  // Create repressor markers (negative edges)
  if (d.value < 0 && colorOptimal) {
    const targetNodeWidth = getNodeWidth(d.target);
    const sourceCenterX = d.source.x + getNodeWidth(d.source) / 2;
    const sourceCenterY = d.source.y + NODE_HEIGHT / 2;
    const targetCenterX = d.target.x + targetNodeWidth / 2;
    const targetCenterY = d.target.y + NODE_HEIGHT / 2;

    // Determine which marker to use based on approach angle
    const dx = targetCenterX - sourceCenterX;
    const dy = targetCenterY - sourceCenterY;

    // Calculate the angle that defines the corner of the node
    // This is the angle from center to corner
    const cornerAngle = Math.atan2(NODE_HEIGHT / 2, targetNodeWidth / 2);

    // Calculate the actual angle of approach
    const approachAngle = Math.atan2(Math.abs(dy), Math.abs(dx));
    // const tanRatioMoveable = Math.abs(targetCenterY - sourceY) / Math.abs(targetCenterX - sourceX);
    // const tanRatioFixed = (targetCenterY - y2) / (targetCenterX - x2);
    let markerType;
    if ((x1 === x2 && y1 === y2) || approachAngle > cornerAngle) {
      // Self-referential always uses horizontal
      markerType = "repressorHorizontal";
    } else {
      // Approaching from left or right → use VERTICAL marker
      markerType = "repressor";
    }

    const markerId = markerType + selfRef + "_StrokeWidth" + d.strokeWidth + minimum;

    if (defs.select(`#${markerId}`).empty()) {
      createRepressorMarker({ defs, d, selfRef, minimum });
      createRepressorHorizontalMarker({
        defs,
        d,
        x1,
        y1,
        x2,
        y2,
        selfRef,
        minimum,
      });
    }

    return `url(#${markerId})`;
  } else {
    const arrowMarkerId = "arrowhead" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum;

    // Create arrowhead markers (positive edges)
    if (networkMode === NETWORK_GRN_MODE_FULL && defs.select(`#${arrowMarkerId}`).empty()) {
      createArrowheadMarker({
        defs,
        d,
        x1,
        y1,
        x2,
        y2,
        selfRef,
        minimum,
        sheetType,
      });
    }

    return `url(#${arrowMarkerId})`;
  }
}

/**
 * Creates a vertical repressor marker (bar)
 */
function createRepressorMarker({ defs, d, selfRef, minimum }) {
  const xOffsets = {
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

  const yOffsets = {
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

  defs
    .append("marker")
    .attr("id", "repressor" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum)
    .attr("refX", xOffsets[d.strokeWidth])
    .attr("refY", yOffsets[d.strokeWidth])
    .attr("markerUnits", "userSpaceOnUse")
    .attr("markerWidth", d.strokeWidth)
    .attr("markerHeight", 25 + d.strokeWidth)
    .attr("orient", 180)
    .append("rect")
    .attr("width", d.strokeWidth)
    .attr("height", 25 + d.strokeWidth)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("style", "stroke:" + d.stroke + "; fill: " + d.stroke + "; stroke-width: 0");
}

/**
 * Creates a horizontal repressor marker (bar)
 */
function createRepressorHorizontalMarker({ defs, d, x1, y1, x2, y2, selfRef, minimum }) {
  let xOffsets;
  if (x1 === x2 && y1 === y2) {
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

  const yOffsets = {
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

  defs
    .append("marker")
    .attr("id", "repressorHorizontal" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum)
    .attr("refX", xOffsets[d.strokeWidth])
    .attr("refY", yOffsets[d.strokeWidth])
    .attr("markerWidth", function () {
      return 25 + d.strokeWidth;
    })
    .attr("markerHeight", function () {
      return d.strokeWidth;
    })
    .attr("markerUnits", "userSpaceOnUse")
    .attr("orient", 180)
    .append("rect")
    .attr("width", 25 + d.strokeWidth)
    .attr("height", d.strokeWidth)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("style", "stroke:" + d.stroke + "; fill: " + d.stroke + "; stroke-width: 0");
}

/**
 * Creates an arrowhead marker
 */
function createArrowheadMarker({ defs, d, x1, y1, x2, y2, selfRef, minimum }) {
  if (d.strokeWidth === 2) {
    d.strokeWidth = 4;
  }

  const refXOffsets =
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
        };

  const refYOffsets =
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
        };

  const orientOffsets = {
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
  };

  defs
    .append("marker")
    .attr("id", "arrowhead" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum)
    .attr("viewBox", "0 0 15 15")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("refX", refXOffsets[d.strokeWidth])
    .attr("refY", refYOffsets[d.strokeWidth])
    .attr("markerUnits", "userSpaceOnUse")
    .attr("markerWidth", 12 + (d.strokeWidth < 7 ? d.strokeWidth * 2.25 : d.strokeWidth * 3))
    .attr("markerHeight", 5 + (d.strokeWidth < 7 ? d.strokeWidth * 2.25 : d.strokeWidth * 3))
    .attr("orient", x1 === x2 && y1 === y2 ? orientOffsets[d.strokeWidth] : "auto")
    .append("path")
    .attr("d", "M 0 0 L 14 5 L 0 10 Q 6 5 0 0")
    .attr("style", "stroke: " + d.stroke + "; fill: " + d.stroke);
}

export function smartPathEnd(d, w, h) {
  // For arrowheads when target node is to the left of source node
  var LEFT_ADJUSTMENT = 7;
  var MINIMUM_DISTANCE = 8;
  var NODE_HALF_HEIGHT = 30 / 2;

  var targetStartX = d.target.centerX + d.target.textWidth / 2;
  console.log("targetStartX", targetStartX);
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
  console.log("d.target.centerY, d.target.y", d.target.centerY, d.target.y);
  console.log("d.tanRatioFixed", d.tanRatioFixed);
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
  console.log("d.target.centerY, d.source.newY", d.target.centerY, d.source.newY);
  console.log("d.target.centerX, d.source.newX", d.target.centerX, d.source.newX);
  console.log("d.tanRatioMoveable", d.tanRatioMoveable);

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
        d.target.newY = d.target.y + h + globalOffset + 0.25 * d.strokeWidth - thicknessAdjustment;
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
