import {
  NODE_HEIGHT,
  NODE_MARGIN,
  MINIMUM_NODE_WIDTH,
  EDGE_BLACK,
  EDGE_BLUE,
  EDGE_RED,
  CURVE_THRESHOLD,
  CURVE_FACTOR,
} from "../constants.js";

export function getNodeWidth(node) {
  return NODE_MARGIN + (node.textWidth || MINIMUM_NODE_WIDTH) + NODE_MARGIN;
}

/**
 * Calculate point along the full quadratic Bézier curve that goes behind the perimeter of the target box
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
function getQuadraticBezierPoint(percentAcrossFullBezierCurve, source, control, target) {
  // Bernstein basis polynomial can be used for quadratic Bézier curves
  // B(t) = (1 - t)^2 * p0 + (2(1 - t) * t) * p1 + t^2 * p2
  // multiply control point by 2, which makes the function quadratic
  const x =
    Math.pow(1 - percentAcrossFullBezierCurve, 2) * source.x +
    2 * (1 - percentAcrossFullBezierCurve) * percentAcrossFullBezierCurve * control.x +
    Math.pow(percentAcrossFullBezierCurve, 2) * target.x;
  const y =
    Math.pow(1 - percentAcrossFullBezierCurve, 2) * source.y +
    2 * (1 - percentAcrossFullBezierCurve) * percentAcrossFullBezierCurve * control.y +
    Math.pow(percentAcrossFullBezierCurve, 2) * target.y;
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
function findBezierBoxIntersection(source, control, target, boxWidth, boxHeight) {
  // Binary search to find intersection point
  // intersection = 0 is the start of the bezier curve, intersection = 1 is the end of the bezier curve
  // intersectionMin and intersectionMax define the current search interval for intersection
  let intersectionMin = 0;
  let intersectionMax = 1;

  // Complete 10 binary search iterations for sufficient precision
  for (let iteration = 0; iteration < 10; iteration++) {
    const intersectionMid = (intersectionMin + intersectionMax) / 2;
    const point = getQuadraticBezierPoint(intersectionMid, source, control, target);

    // Check if point is inside the box
    const deltaX = Math.abs(point.x - target.x);
    const deltaY = Math.abs(point.y - target.y);

    if (deltaX < boxWidth / 2 && deltaY < boxHeight / 2) {
      // Point is inside box, search earlier part of curve
      intersectionMax = intersectionMid;
    } else {
      // Point is outside box, search later part of curve
      intersectionMin = intersectionMid;
    }
  }

  return getQuadraticBezierPoint(intersectionMax, source, control, target);
}

export function createPath(d) {
  const sourceX = d.source.x + getNodeWidth(d.source) / 2;
  const sourceY = d.source.y + NODE_HEIGHT / 2;
  const targetX = d.target.x + getNodeWidth(d.target) / 2;
  const targetY = d.target.y + NODE_HEIGHT / 2;

  const targetWidth = getNodeWidth(d.target);
  const targetHeight = NODE_HEIGHT;

  // Calculate control point from source to target
  const deltaX = targetX - sourceX;
  const deltaY = targetY - sourceY;

  // Calculate distance between nodes
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  const curveToStraight = (distance - CURVE_THRESHOLD) / 4;
  const curveFactor = distance < CURVE_THRESHOLD ? 0 : CURVE_FACTOR; // Normalize by distance. Curve factor gets closer to 0 as distance increases

  const cx = (sourceX + targetX) / 2 - deltaY * curveFactor;
  const cy = (sourceY + targetY) / 2 + deltaX * curveFactor;

  // Find where the curve intersects the perimeter of the target box
  const intersection = findBezierBoxIntersection(
    { x: sourceX, y: sourceY },
    { x: cx, y: cy },
    { x: targetX, y: targetY },
    targetWidth,
    targetHeight
  );

  // Create quadratic Bézier curve ending at the box perimeter
  return `M${sourceX},${sourceY} Q${cx},${cy} ${intersection.x},${intersection.y}`;
}

export function createSelfLoop(d) {
  const nodeWidth = getNodeWidth(d.source);
  const x = d.source.x + nodeWidth;
  const y = d.source.y + NODE_HEIGHT / 2;
  const radius = 25;

  return `M${x},${y}
          A${radius},${radius} 0 1,1 ${x},${y + 0.1}`;
}

export function getEdgeThickness(workbook, enableEdgeColoring, edge) {
  if (!enableEdgeColoring || workbook.sheetType === "unweighted") {
    return 2;
  }

  const allWeights = workbook.positiveWeights.concat(workbook.negativeWeights);
  const maxWeight = Math.max(...allWeights.map(Math.abs));

  const scale = d3.scaleLinear().domain([0, maxWeight]).range([2, 14]).clamp(true);

  return Math.floor(scale(Math.abs(edge.value)));
}

export function getEdgeColor(workbook, edge) {
  if (workbook.sheetType === "unweighted") return EDGE_BLACK;
  return edge.value < 0 ? EDGE_BLUE : EDGE_RED;
}
