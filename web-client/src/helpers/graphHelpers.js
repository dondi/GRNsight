// GraphHelpers.jsx
// Helper functions for d3 graph rendering and manipulation
import * as d3 from "d3";
import { NODE_HEIGHT, NODE_MARGIN, MINIMUM_NODE_WIDTH } from "../constants.js";

export function getNodeWidth(node) {
  return NODE_MARGIN + (node.textWidth || MINIMUM_NODE_WIDTH) + NODE_MARGIN;
}

export function getEdgeThickness(workbook, enableEdgeColoring, edge) {
  if (!enableEdgeColoring || workbook.sheetType === "unweighted") {
    return 2;
  }
  const maxWeight = Math.max(
    ...workbook.positiveWeights.concat(workbook.negativeWeights).map(Math.abs)
  );
  const scale = d3.scaleLinear().domain([0, maxWeight]).range([2, 14]).clamp(true);
  return Math.floor(scale(Math.abs(edge.value)));
}

// TODO: confirm that this is proper way to get edge color. blue for regression, red for activation. but some edges are still gray in demo?
export function getEdgeColor(workbook, edge) {
  if (workbook.sheetType === "unweighted") return "#000";
  // edge color is dependent on the weight values. may need to access different way
  return edge.value < 0 ? "blue" : "red";
}

export function createArrowMarkers(defs, workbook) {
  //create marker based on stroke width and color for edge (regression/activation)
}

export function createPath(d) {
  const sourceX = d.source.x + getNodeWidth(d.source) / 2;
  const sourceY = d.source.y + NODE_HEIGHT / 2;
  const targetX = d.target.x + getNodeWidth(d.target) / 2;
  const targetY = d.target.y + NODE_HEIGHT / 2;

  // Calculate midpoint for control point
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;

  // Can change this if needed, this determines how curved the edge is
  const curveFactor = 0.3;

  // Control point offset perpendicular to the line
  const cx = (sourceX + targetX) / 2 - dy * curveFactor;
  const cy = (sourceY + targetY) / 2 + dx * curveFactor;

  // Create quadratic Bézier curve
  // return m (move to) and q (quadratic Bézier curve to) SVG path commands
  return `M${sourceX},${sourceY} Q${cx},${cy} ${targetX},${targetY}`;
}

export function createSelfLoop(d) {
  const x = d.source.x + getNodeWidth(d.source);
  const y = d.source.y + NODE_HEIGHT / 2;
  const radius = 20;

  return `M${x},${y}
            A${radius},${radius} 0 1,1 ${x},${y + 0.1}`;
}
