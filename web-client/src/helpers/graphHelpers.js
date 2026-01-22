import * as d3 from "d3";
import {
  NODE_HEIGHT,
  NODE_MARGIN,
  MINIMUM_NODE_WIDTH,
  EDGE_BLACK,
  EDGE_BLUE,
  EDGE_RED,
  CURVE_THRESHOLD,
  SELF_REFERRING_Y_OFFSET,
  SHORT_NODE_LIMIT,
  ADDITIONAL_SHIFT,
  END_POINT_ADJUSTMENT,
} from "../constants.js";

// TODO: resolve issue where node.textWidth is initially calculated with undefined value
export function getNodeWidth(node) {
  // console.log("node.textWidth", node.textWidth, "MINIMUM_NODE_WIDTH", MINIMUM_NODE_WIDTH);
  // console.log("calculated node width:", NODE_MARGIN + (node.textWidth || MINIMUM_NODE_WIDTH) + NODE_MARGIN);
  return NODE_MARGIN + (node.textWidth || MINIMUM_NODE_WIDTH) + NODE_MARGIN;
}

// TODO: add description from web-client-classic
export function normalize(d, maxWeight) {
  return Math.abs(d.value / maxWeight).toPrecision(4);
}

/**
 * Calculate point along the full cubic Bézier curve that goes behind the perimeter of the target box
 * Can be used to find the intersection point of the Bézier curve with the box perimeter
 * @param {number} percentAcrossFullBezierCurve - Value from 0 to 1, where 0 is the start point of the full bezier curve and 1 is the end point of the full bezier curve
 * @param {Object} source - Starting point of the Bézier curve
 * @param {number} source.x - X coordinate of the starting point
 * @param {number} source.y - Y coordinate of the starting point
 * @param {Object} control - Control point of the quadratic Bézier curve
 * @param {number} control.x - X coordinate of the control point
 * @param {number} control.y - Y coordinate of the control point
 * @param {Object} target - End point of the Bézier curve
 * @param {number} target.x - X coordinate of the end point
 * @param {number} target.y - Y coordinate of the end point
 *
 * @returns {Object} Point on the Bézier curve at parameter t
 * @returns {number} return.x - X coordinate of the calculated point
 * @returns {number} return.y - Y coordinate of the calculated point
 *
 */
function getQuadraticBezierPoint(percentAcrossFullBezierCurve, source, control1, control2, target) {
  // Bernstein basis polynomial can be used to draw cubic Bézier curves
  // B(t) = (1 - t)^3 * p0 + 3(1 - t)^2 * t * p1 + 3(1 - t) * t^2 * p2 + t^3 * p3
  const x =
    Math.pow(1 - percentAcrossFullBezierCurve, 3) * source.x +
    3 * Math.pow(1 - percentAcrossFullBezierCurve, 2) * percentAcrossFullBezierCurve * control1.x +
    3 *
      (1 - percentAcrossFullBezierCurve) *
      Math.pow(percentAcrossFullBezierCurve, 2) *
      control2.x +
    Math.pow(percentAcrossFullBezierCurve, 3) * target.x;
  const y =
    Math.pow(1 - percentAcrossFullBezierCurve, 3) * source.y +
    3 * Math.pow(1 - percentAcrossFullBezierCurve, 2) * percentAcrossFullBezierCurve * control1.y +
    3 *
      (1 - percentAcrossFullBezierCurve) *
      Math.pow(percentAcrossFullBezierCurve, 2) *
      control2.y +
    Math.pow(percentAcrossFullBezierCurve, 3) * target.y;
  return { x, y };
}

/**
 * Find the intersection of a Bézier curve with a target box
 * Uses binary search to find the t value where the curve intersects the box perimeter
 * @param {Object} source - Starting point of the Bézier curve
 * @param {number} source.x - X coordinate of the source point
 * @param {number} source.y - Y coordinate of the source point
 * @param {Object} control - Control point of the quadratic Bézier curve
 * @param {number} control.x - X coordinate of the control point
 * @param {number} control.y - Y coordinate of the control point
 * @param {Object} target - End point of the Bézier curve (center of target box)
 * @param {number} target.x - X coordinate of the target point (box center)
 * @param {number} target.y - Y coordinate of the target point (box center)
 * @param {number} boxWidth - Width of the target node's bounding box
 * @param {number} boxHeight - Height of the target node's bounding box
 *
 * @returns {Object} Intersection point on the box perimeter
 * @returns {number} return.x - X coordinate of intersection point
 * @returns {number} return.y - Y coordinate of intersection point
 */
function findBezierBoxIntersection(
  source,
  control1,
  control2,
  target,
  boxWidth,
  boxHeight,
  strokeWidth,
  isRepressor
) {
  // Calculate minimum distance to ensure marker visibility
  const MINIMUM_DISTANCE = 8;

  // Apply the same logic as classic: use max of strokeWidth and MINIMUM_DISTANCE
  const globalOffset = Math.max(strokeWidth, MINIMUM_DISTANCE);

  // Expand the box by the offset amount so markers render outside the boundary
  const expandedWidth = boxWidth + 2 * globalOffset;
  const expandedHeight = boxHeight + 2 * globalOffset;

  // Binary search to find intersection point
  // intersection = 0 is the start of the bezier curve, intersection = 1 is the end of the bezier curve
  // intersectionMin and intersectionMax define the current search interval for intersection
  let intersectionMin = 0;
  let intersectionMax = 1;

  // Complete 10 binary search iterations for sufficient precision
  for (let iteration = 0; iteration < 10; iteration++) {
    const intersectionMid = (intersectionMin + intersectionMax) / 2;
    const point = getQuadraticBezierPoint(intersectionMid, source, control1, control2, target);

    // Check if point is inside the box
    const deltaX = Math.abs(point.x - target.x);
    const deltaY = Math.abs(point.y - target.y);

    if (deltaX < expandedWidth / 2 && deltaY < expandedHeight / 2) {
      // Point is inside box, search earlier part of curve
      intersectionMax = intersectionMid;
    } else {
      // Point is outside box, search later part of curve
      intersectionMin = intersectionMid;
    }
  }

  return getQuadraticBezierPoint(intersectionMax, source, control1, control2, target);
}

export function createPath(d, width, height) {
  // Calculate adjusted source and target positions to be at center of nodes
  // TODO: resolve issue where node.textWidth is initially calculated with undefined value
  // TODO: confirm whether node textWidth is defined before this function is called
  const sourceX = d.source.x + getNodeWidth(d.source) / 2;
  const sourceY = d.source.y + NODE_HEIGHT / 2;
  const targetX = d.target.x + getNodeWidth(d.target) / 2;
  const targetY = d.target.y + NODE_HEIGHT / 2;

  const targetWidth = getNodeWidth(d.target);
  const targetHeight = NODE_HEIGHT;

  // Calculate control points from source to target
  let ux = targetX - sourceX;
  let uy = targetY - sourceY;

  const umagnitude = Math.sqrt(ux * ux + uy * uy);
  let vx = -uy; // Perpendicular vector.
  let vy = ux;
  const vmagnitude = Math.sqrt(vx * vx + vy * vy);

  ux /= umagnitude;
  uy /= umagnitude;
  vx /= vmagnitude;
  vy /= vmagnitude;

  // Check for vector direction to ensure consistent curve direction
  if ((targetX > sourceX && targetY > sourceY) || (targetX < sourceX && targetY < sourceY)) {
    vx = -vx;
    vy = -vy;
  }

  // Calculate control points between nodes
  const curveToStraight = (umagnitude - CURVE_THRESHOLD) / 4;
  const inlineOffset = Math.max(umagnitude / 4, curveToStraight);
  const orthoOffset = Math.max(0, curveToStraight);

  // Check if this is effectively a straight line since curve offset is small
  // However, this values means that nodes are within 202 pixels of each other, so will need to adjust this
  // When set orthOffset to 0, then creates issues with paths going through border of boudning box
  const isStraightLine = orthoOffset < 0.5;
  const isRepressor = d.value < 0;
  const strokeWidth = d.strokeWidth || 2;

  if (isStraightLine) {
    const endPoint = straightLineBoxIntersection(
      sourceX,
      sourceY,
      targetX,
      targetY,
      targetWidth,
      targetHeight,
      strokeWidth,
      isRepressor
    );

    return `M${sourceX},${sourceY} L${endPoint.x},${endPoint.y}`;
  } else {
    let cp1x = sourceX + inlineOffset * ux + vx * orthoOffset;
    let cp1y = sourceY + inlineOffset * uy + vy * orthoOffset;
    let cp2x = targetX - inlineOffset * ux + vx * orthoOffset;
    let cp2y = targetY - inlineOffset * uy + vy * orthoOffset;

    cp1x = Math.min(Math.max(0, cp1x), width);
    cp1y = Math.min(Math.max(0, cp1y), height);
    cp2x = Math.min(Math.max(0, cp2x), width);
    cp2y = Math.min(Math.max(0, cp2y), height);

    // Find where the curve intersects the perimeter of the target box
    const intersection = findBezierBoxIntersection(
      { x: sourceX, y: sourceY },
      { x: cp1x, y: cp1y },
      { x: cp2x, y: cp2y },
      { x: targetX, y: targetY },
      targetWidth,
      targetHeight,
      strokeWidth,
      isRepressor
    );

    // Create quadratic Bézier curve ending at the box perimeter
    return `M${sourceX},${sourceY} C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${intersection.x},${intersection.y}`;
  }
}

/**
 * Calculate the intersection point of a straight line with a rectangle
 * @param {number} x1 - Source x coordinate
 * @param {number} y1 - Source y coordinate
 * @param {number} x2 - Target x coordinate (center of target box)
 * @param {number} y2 - Target y coordinate (center of target box)
 * @param {number} boxWidth - Width of the target box
 * @param {number} boxHeight - Height of the target box
 * @returns {Object} Intersection point on box perimeter
 * @returns {number} return.x - X coordinate of intersection
 * @returns {number} return.y - Y coordinate of intersection
 */
function straightLineBoxIntersection(
  sourceX,
  sourceY,
  targetX,
  targetY,
  targetWidth,
  targetHeight,
  strokeWidth,
  isRepressor
) {
  const deltaX = targetX - sourceX;
  const deltaY = targetY - sourceY;

  if (deltaX === 0 && deltaY === 0) {
    return { x: targetX, y: targetY };
  }

  // Calculate minimum distance to ensure marker visibility
  const MINIMUM_DISTANCE = 8;
  const globalOffset = Math.max(strokeWidth, MINIMUM_DISTANCE);

  // Expand the box by the offset amount
  const expandedWidth = targetWidth + 2 * globalOffset;
  const expandedHeight = targetHeight + 2 * globalOffset;

  const halfWidth = expandedWidth / 2;
  const halfHeight = expandedHeight / 2;
  // Calculate angle of approach
  const angle = Math.atan2(deltaY, deltaX);
  const tanAngle = Math.abs(Math.tan(angle));

  let intersectX, intersectY;

  if (tanAngle < halfHeight / halfWidth) {
    // Intersects with left or right edge
    intersectX = targetX + (deltaX > 0 ? -halfWidth : halfWidth);
    intersectY = targetY + (intersectX - targetX) * (deltaY / deltaX);
  } else {
    // Intersects with top or bottom edge
    intersectY = targetY + (deltaY > 0 ? -halfHeight : halfHeight);
    intersectX = targetX + (intersectY - targetY) * (deltaX / deltaY);
  }

  return { x: intersectX, y: intersectY };
}

function getSelfReferringRadius(edge) {
  return edge ? 17 + getEdgeThickness(edge) / 2 : 0;
}

export function createSelfLoop(d, width, height, colorOptimal) {
  let x1 = d.source.x;
  let y1 = d.source.y;
  let x2 = d.target.x;
  let y2 = d.target.y;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let dr = Math.sqrt(dx * dx + dy * dy);

  // Defaults for normal edge.
  let drx = dr;
  let dry = dr;
  let xRotation = 0; // degrees
  let largeArc = 0; // 1 or 0
  let sweep = 1; // 1 or 0
  let offset = parseFloat(d.strokeWidth);

  // Edge adjustment values when long self-node edges get hidden behind the node.
  let DEFAULT_NODE_SHIFT = 1.033;

  // Self edge.
  if (x1 === x2 && y1 === y2) {
    // Move the position of the loop.
    x1 = d.source.x + d.source.textWidth * DEFAULT_NODE_SHIFT;
    y1 = d.source.y + NODE_HEIGHT / 2 + SELF_REFERRING_Y_OFFSET;

    // This angle creates the loop.
    xRotation = 45;

    // Needs to be 1.
    largeArc = 1;

    // Change sweep to change orientation of loop.
    sweep = 1;

    drx = getSelfReferringRadius(d);
    dry = getSelfReferringRadius(d);

    // For whatever reason, the arc collapses to a point if the beginning
    // and ending points of the arc are the same, so kludge it.
    if (d.source.textWidth > SHORT_NODE_LIMIT) {
      DEFAULT_NODE_SHIFT += ADDITIONAL_SHIFT;
    }
    x2 = d.source.x + (d.source.textWidth / END_POINT_ADJUSTMENT) * DEFAULT_NODE_SHIFT;
    y2 = d.source.y + NODE_HEIGHT;

    if (d.value < 0 && colorOptimal) {
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
}

export function getEdgeThickness(workbook, colorOptimal, edge) {
  if (!colorOptimal || workbook.sheetType === "unweighted") {
    return 2;
  }

  const allWeights = workbook.positiveWeights.concat(workbook.negativeWeights);
  const maxWeight = Math.max(...allWeights.map(Math.abs));

  const scale = d3.scaleLinear().domain([0, maxWeight]).range([2, 14]).clamp(true);

  return Math.floor(scale(Math.abs(edge.value)));
}

export function getEdgeColor(workbook, edge, grayThreshold, maxWeight, colorOptimal) {
  if (!colorOptimal || workbook.sheetType === "unweighted") return EDGE_BLACK;
  if (normalize(edge, maxWeight) <= grayThreshold) {
    return "gray";
  }
  return edge.value < 0 ? EDGE_BLUE : EDGE_RED;
}

export function calcAllWeights(data, colorOptimal) {
  // Create an array of all the network weights
  const allWeights = data.positiveWeights.concat(data.negativeWeights);
  // Assign the entire array weights of 1, if color edges turned off
  if (!colorOptimal) {
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

  return allWeights;
}

export function calcMaxWeight(allWeights) {
  return Math.max(Math.abs(d3.max(allWeights)), Math.abs(d3.min(allWeights)));
}


