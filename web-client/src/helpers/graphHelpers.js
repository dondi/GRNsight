import { NODE_HEIGHT, NODE_MARGIN, MINIMUM_NODE_WIDTH } from "../constants.js";

export function getNodeWidth(node) {
  return NODE_MARGIN + (node.textWidth || MINIMUM_NODE_WIDTH) + NODE_MARGIN;
}

/**
 * Calculate the intersection point of a line with a rectangle
 * @param {number} x1 - Source x coordinate
 * @param {number} y1 - Source y coordinate
 * @param {number} x2 - Target x coordinate (center of target node)
 * @param {number} y2 - Target y coordinate (center of target node)
 * @param {number} boxWidth - Width of target node
 * @param {number} boxHeight - Height of target node
 * @returns {{x: number, y: number}} Intersection point on box perimeter
 */
function getBoxIntersection(x1, y1, x2, y2, boxWidth, boxHeight) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0 && dy === 0) {
    return { x: x2, y: y2 };
  }

  const halfWidth = boxWidth / 2;
  const halfHeight = boxHeight / 2;

  // Calculate which edge of the box the line intersects
  const angle = Math.atan2(dy, dx);
  const tanAngle = Math.abs(Math.tan(angle));

  let intersectX, intersectY;

  if (tanAngle < halfHeight / halfWidth) {
    // Intersects with left or right edge
    intersectX = x2 + (dx > 0 ? -halfWidth : halfWidth);
    intersectY = y2 + (intersectX - x2) * (dy / dx);
  } else {
    // Intersects with top or bottom edge
    intersectY = y2 + (dy > 0 ? -halfHeight : halfHeight);
    intersectX = x2 + (intersectY - y2) * (dx / dy);
  }

  return { x: intersectX, y: intersectY };
}

/**
 * Calculate point along a quadratic Bézier curve at parameter t (0 to 1)
 */
function getQuadraticBezierPoint(t, p0, p1, p2) {
  const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
  const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
  return { x, y };
}

/**
 * Calculate the derivative (tangent) of a quadratic Bézier curve at parameter t
 */
function getQuadraticBezierDerivative(t, p0, p1, p2) {
  const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
  const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
  return { dx, dy };
}

/**
 * Find the intersection of a Bézier curve with a target box
 * Uses binary search to find the t value where the curve intersects the box perimeter
 */
function findBezierBoxIntersection(source, control, target, boxWidth, boxHeight) {
  const p0 = source;
  const p1 = control;
  const p2 = target;

  // Binary search to find intersection point
  let tMin = 0;
  let tMax = 1;
  let iterations = 20; // Number of binary search iterations

  while (iterations > 0) {
    const tMid = (tMin + tMax) / 2;
    const point = getQuadraticBezierPoint(tMid, p0, p1, p2);

    // Check if point is inside the box
    const dx = Math.abs(point.x - target.x);
    const dy = Math.abs(point.y - target.y);

    if (dx < boxWidth / 2 && dy < boxHeight / 2) {
      // Point is inside box, search earlier part of curve
      tMax = tMid;
    } else {
      // Point is outside box, search later part of curve
      tMin = tMid;
    }

    iterations--;
  }

  return getQuadraticBezierPoint(tMax, p0, p1, p2);
}

export function createPath(d) {
  const sourceX = d.source.x + getNodeWidth(d.source) / 2;
  const sourceY = d.source.y + NODE_HEIGHT / 2;
  const targetX = d.target.x + getNodeWidth(d.target) / 2;
  const targetY = d.target.y + NODE_HEIGHT / 2;

  const targetWidth = getNodeWidth(d.target);
  const targetHeight = NODE_HEIGHT;

  // Calculate control point
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const curveFactor = 0.3;

  const cx = (sourceX + targetX) / 2 - dy * curveFactor;
  const cy = (sourceY + targetY) / 2 + dx * curveFactor;

  // Find where the curve intersects the target box
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
  if (workbook.sheetType === "unweighted") return "#000";
  return edge.value < 0 ? "blue" : "red";
}
