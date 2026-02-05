import * as d3 from "d3";
import { smartPathEnd } from "./markerHelpers";
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
  EDGE_OFFSET,
} from "./constants.js";

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

export function createPath(d, width, height, colorOptimal) {
  // Calculate adjusted source and target positions to be at center of nodes
  // TODO: resolve issue where node.textWidth is initially calculated with undefined value
  // TODO: confirm whether node textWidth is defined before this function is called
  const w = getNodeWidth(d.target);
  const h = NODE_HEIGHT;
  d.source.newX = d.source.x + w / 2;
  d.source.newY = d.source.y + h / 2;

  let x1 = d.source.x;
  let y1 = d.source.y;
  let x2 = d.target.x;
  let y2 = d.target.y;

  d.target.centerX = d.target.x + w / 2;
  d.target.centerY = d.target.y + h / 2;

  // This function calculates the newX and newY.
  smartPathEnd(d, w, h, colorOptimal);
  x1 = d.source.newX;
  y1 = d.source.newY;
  x2 = d.target.newX;
  y2 = d.target.newY;

  // Unit vectors.
  let ux = x2 - x1;
  let uy = y2 - y1;
  let umagnitude = Math.sqrt(ux * ux + uy * uy);
  let vx = -uy; // Perpendicular vector.
  let vy = ux;
  let vmagnitude = Math.sqrt(vx * vx + vy * vy);
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

  cp1x = Math.min(Math.max(0, cp1x), width);
  cp1y = Math.min(Math.max(0, cp1y), height);
  cp2x = Math.min(Math.max(0, cp2x), width);
  cp2y = Math.min(Math.max(0, cp2y), height);

  d.label = {
    x: Math.min(Math.max((x1 + cp1x + cp2x + x2) / 4, EDGE_OFFSET), width - 2 * EDGE_OFFSET),
    y: Math.min(Math.max((y1 + cp1y + cp2y + y2) / 4, EDGE_OFFSET), height - EDGE_OFFSET),
  };

  return `M${d.source.newX},${d.source.newY} C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
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
