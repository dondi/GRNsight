import * as d3 from "d3";
import { smartPathEnd } from "./markerHelpers";
import {
  NODE_HEIGHT,
  NODE_MARGIN,
  MINIMUM_NODE_WIDTH,
  BOUNDARY_MARGIN,
  EDGE_BLACK,
  EDGE_BLUE,
  EDGE_RED,
  CURVE_THRESHOLD,
  SELF_REFERRING_Y_OFFSET,
  SHORT_NODE_LIMIT,
  ADDITIONAL_SHIFT,
  END_POINT_ADJUSTMENT,
  EDGE_OFFSET,
} from "./constants";

function getClampBounds(edgeBounds, width, height) {
  return {
    minX: edgeBounds?.left ?? BOUNDARY_MARGIN,
    maxX: edgeBounds?.right ?? width - BOUNDARY_MARGIN,
    minY: edgeBounds?.top ?? BOUNDARY_MARGIN,
    maxY: edgeBounds?.bottom ?? height - BOUNDARY_MARGIN,
  };
}

function clampToGraphBounds(value, minBound, maxBound) {
  const resolvedMax = Math.max(minBound, maxBound);
  return Math.max(minBound, Math.min(resolvedMax, value));
}

export function getNodeWidth(node) {
  // console.log("node.textWidth", node.textWidth, "MINIMUM_NODE_WIDTH", MINIMUM_NODE_WIDTH);
  // console.log("calculated node width:", NODE_MARGIN + (node.textWidth || MINIMUM_NODE_WIDTH) + NODE_MARGIN);
  return NODE_MARGIN + (node.textWidth || MINIMUM_NODE_WIDTH) + NODE_MARGIN;
}

export function normalize(d, maxWeight) {
  return Math.abs(d.value / maxWeight).toPrecision(4);
}

export function createPath(d, width, height, colorOptimal, edgeBounds) {
  const clampBounds = getClampBounds(edgeBounds, width, height);

  const sourceW = getNodeWidth(d.source);
  const targetW = getNodeWidth(d.target);
  const h = NODE_HEIGHT;

  d.source.newX = d.source.x + sourceW / 2;
  d.source.newY = d.source.y + h / 2;

  let x1 = d.source.newX;
  let y1 = d.source.newY;

  d.target.centerX = d.target.x + targetW / 2;
  d.target.centerY = d.target.y + h / 2;

  smartPathEnd(d, targetW, h, colorOptimal);

  let x2 = d.target.newX;
  let y2 = d.target.newY;

  x1 = clampToGraphBounds(x1, clampBounds.minX, clampBounds.maxX);
  y1 = clampToGraphBounds(y1, clampBounds.minY, clampBounds.maxY);
  x2 = clampToGraphBounds(x2, clampBounds.minX, clampBounds.maxX);
  y2 = clampToGraphBounds(y2, clampBounds.minY, clampBounds.maxY);

  let ux = x2 - x1;
  let uy = y2 - y1;
  const umagnitude = Math.sqrt(ux * ux + uy * uy) || 1;
  let vx = -uy;
  let vy = ux;
  const vmagnitude = Math.sqrt(vx * vx + vy * vy) || 1;

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
  // Calculate control points between nodes
  let curveToStraight = (umagnitude - CURVE_THRESHOLD) / 4;
  let inlineOffset = Math.max(umagnitude / 4, curveToStraight);
  let orthoOffset = Math.max(0, curveToStraight);
  let cp1x = x1 + inlineOffset * ux + vx * orthoOffset;
  let cp1y = y1 + inlineOffset * uy + vy * orthoOffset;
  let cp2x = x2 - inlineOffset * ux + vx * orthoOffset;
  let cp2y = y2 - inlineOffset * uy + vy * orthoOffset;

  cp1x = clampToGraphBounds(cp1x, clampBounds.minX, clampBounds.maxX);
  cp1y = clampToGraphBounds(cp1y, clampBounds.minY, clampBounds.maxY);
  cp2x = clampToGraphBounds(cp2x, clampBounds.minX, clampBounds.maxX);
  cp2y = clampToGraphBounds(cp2y, clampBounds.minY, clampBounds.maxY);

  d.label = {
    x: Math.min(Math.max((x1 + cp1x + cp2x + x2) / 4, EDGE_OFFSET), width - 2 * EDGE_OFFSET),
    y: Math.min(Math.max((y1 + cp1y + cp2y + y2) / 4, EDGE_OFFSET), height - EDGE_OFFSET),
  };

  return `M${x1},${y1} C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
}

function getSelfReferringRadius(edge) {
  return edge ? 17 + getEdgeThickness(edge) / 2 : 0;
}

export function createSelfLoop(d, width, height, colorOptimal, edgeBounds) {
  const clampBounds = getClampBounds(edgeBounds, width, height);

  let x1 = d.source.x;
  let y1 = d.source.y;
  let x2 = d.target.x;
  let y2 = d.target.y;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dr = Math.sqrt(dx * dx + dy * dy);

  let drx = dr;
  let dry = dr;
  let xRotation = 0; // degrees
  let largeArc = 0; // 1 or 0
  let sweep = 1; // 1 or 0
  let offset = parseFloat(d.strokeWidth);
  let defaultNodeShift = 1.033;

  // Self edge
  if (x1 === x2 && y1 === y2) {
    x1 = d.source.x + d.source.textWidth * defaultNodeShift;
    y1 = d.source.y + NODE_HEIGHT / 2 + SELF_REFERRING_Y_OFFSET;

    // This angle creates the loop.
    xRotation = 45;

    // Needs to be 1.
    largeArc = 1;

    // Change sweep to change orientation of loop.
    sweep = 1;

    drx = getSelfReferringRadius(d);
    dry = getSelfReferringRadius(d);

    if (d.source.textWidth > SHORT_NODE_LIMIT) {
      defaultNodeShift += ADDITIONAL_SHIFT;
    }

    x2 = d.source.x + (d.source.textWidth / END_POINT_ADJUSTMENT) * defaultNodeShift;
    y2 = d.source.y + NODE_HEIGHT;

    if (d.value < 0 && colorOptimal) {
      offset = Math.max(10, parseFloat(d.strokeWidth));
    }
  }

  x1 = clampToGraphBounds(x1, clampBounds.minX, clampBounds.maxX);
  y1 = clampToGraphBounds(y1, clampBounds.minY, clampBounds.maxY);
  x2 = clampToGraphBounds(x2, clampBounds.minX, clampBounds.maxX);
  y2 = clampToGraphBounds(y2, clampBounds.minY, clampBounds.maxY);

  d.label = {
    x: Math.min(width - 13 * offset, x1),
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
  const allWeights = data.positiveWeights.concat(data.negativeWeights);
  // Assign the entire array weights of 1, if color edges turned off
  if (!colorOptimal) {
    for (let i = 0; i < allWeights.length; i++) {
      if (allWeights[i] !== 0) {
        allWeights[i] = 1;
      }
    }
  } else {
    for (let j = 0; j < allWeights.length; j++) {
      allWeights[j] = Math.abs(allWeights[j].toPrecision(4));
    }
  }

  return allWeights;
}

export function calcMaxWeight(allWeights) {
  return Math.max(Math.abs(d3.max(allWeights)), Math.abs(d3.min(allWeights)));
}
