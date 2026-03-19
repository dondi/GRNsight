import { getNodeWidth } from "./graphHelpers";
import { NODE_HEIGHT, BOUNDARY_MARGIN } from "./constants";

/**
 * Calculate a flexible bounding box around all nodes using CURRENT graph zoom. Use the bounding box to find the most extreme
 * positions of nodes to determine whether drag movements are within bounds for NEW GRAPH ZOOM.
 * @function calcFlexiBox
 * @return {object} - Flexible bounding box around all nodes
 * x: leftmost x position (x-value where the box begins being drawn)
 * y: topmost y position (y-value where the box begins being drawn)
 * maxX: rightmost x position (x-value where the box ends)
 * maxY: bottommost y position (y-value where the box ends)
 * width: width of the box
 * height: height of the box
 */
export function calcFlexiBox(nodes, width, height, graphZoom, xTranslation, yTranslation) {
  if (
    !Array.isArray(nodes) ||
    nodes.length === 0 ||
    width == null ||
    height == null ||
    graphZoom == null ||
    graphZoom <= 0 ||
    xTranslation == null ||
    yTranslation == null
  ) {
    return { x: 0, y: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
  }
  const nodeWidth = getNodeWidth(nodes[0]);

  const xValuesNodes = nodes.map(node => node.x);
  const yValuesNodes = nodes.map(node => node.y);

  let minX = Math.min(...xValuesNodes);
  let maxX = Math.max(...xValuesNodes) + nodeWidth;

  let minY = Math.min(...yValuesNodes);
  let maxY = Math.max(...yValuesNodes) + NODE_HEIGHT;

  // Handle left x and top y boundaries to not exceed graph BOUNDARY_MARGINs
  const BOUNDARY_MARGIN_X_L = getLeftXBoundaryMargin(false, graphZoom, xTranslation);
  const BOUNDARY_MARGIN_Y_T = getTopYBoundaryMargin(false, graphZoom, yTranslation);
  minX = minX < BOUNDARY_MARGIN_X_L ? BOUNDARY_MARGIN_X_L : minX;
  minY = minY < BOUNDARY_MARGIN_Y_T ? BOUNDARY_MARGIN_Y_T : minY;

  maxX =
    maxX > -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 + width / graphZoom - BOUNDARY_MARGIN
      ? -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 + width / graphZoom - BOUNDARY_MARGIN
      : maxX;

  maxY =
    maxY > -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 + height / graphZoom - BOUNDARY_MARGIN
      ? -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 + height / graphZoom - BOUNDARY_MARGIN
      : maxY;

  let flexiBoxWidth = maxX - minX;
  if (maxX < 0 && minX < 0) {
    flexiBoxWidth = Math.abs(maxX) - Math.abs(minX);
  }

  let flexiBoxHeight = maxY - minY;
  if (maxY < 0 && minY < 0) {
    flexiBoxHeight = Math.abs(maxY) - Math.abs(minY);
  }

  return {
    x: minX,
    y: minY,
    maxX: maxX,
    maxY: maxY,
    width: flexiBoxWidth,
    height: flexiBoxHeight,
  };
}

/**
 * Checks that drag movement keeps the graph within viewport bounds
 * @function viewportBoundsMoveDrag
 * @param {number} graphZoom - Current zoom level of the graph
 * @param {number} dx - Change in x position of the drag
 * @param {number} dy - Change in y position of the drag
 * @return {boolean} - True if the drag movement is within bounds, false otherwise
 */
export function viewportBoundsMoveDrag(
  graphZoom,
  dx,
  dy,
  nodes,
  width,
  height,
  xTranslation,
  yTranslation
) {
  const flexibleContainer = calcFlexiBox(
    nodes,
    width,
    height,
    graphZoom,
    xTranslation,
    yTranslation
  );

  // right boundary
  if (
    flexibleContainer.x + flexibleContainer.width + dx >=
    -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 + width / graphZoom - BOUNDARY_MARGIN
  ) {
    return false;
  }

  // left boundary
  if (flexibleContainer.x + dx <= getLeftXBoundaryMargin(false, graphZoom, xTranslation)) {
    return false;
  }

  // bottom boundary
  if (
    flexibleContainer.y + flexibleContainer.height + dy >=
    -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 + height / graphZoom - BOUNDARY_MARGIN
  ) {
    return false;
  }

  // top boundary
  if (flexibleContainer.y + dy <= getTopYBoundaryMargin(false, graphZoom, yTranslation)) {
    return false;
  }

  return true;
}

// Checks if zoomValue is in bounds when zoom in and out
export function flexZoomInBounds(
  newGraphZoom,
  currentGraphZoom,
  nodes,
  width,
  height,
  xTranslation,
  yTranslation
) {
  const flexibleContainer = calcFlexiBox(
    nodes,
    width,
    height,
    currentGraphZoom,
    xTranslation,
    yTranslation
  );

  if (
    flexibleContainer.width * newGraphZoom > width ||
    flexibleContainer.height * newGraphZoom > height
  ) {
    return false;
  } else {
    return true;
  }
}

export function getLeftXBoundaryMargin(adaptive, graphZoom, xTranslation) {
  return !adaptive ? -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 : BOUNDARY_MARGIN;
}

export function getTopYBoundaryMargin(adaptive, graphZoom, yTranslation) {
  return !adaptive ? -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 : BOUNDARY_MARGIN;
}

export function getRightXBoundaryMargin(adaptive, graphZoom, xTranslation, width, nodeWidth) {
  return !adaptive
    ? -xTranslation.current / graphZoom +
        BOUNDARY_MARGIN / 2 +
        width / graphZoom -
        BOUNDARY_MARGIN -
        nodeWidth
    : width - BOUNDARY_MARGIN - nodeWidth;
}

export function getBottomYBoundaryMargin(adaptive, graphZoom, yTranslation, height) {
  return !adaptive
    ? -yTranslation.current / graphZoom +
        BOUNDARY_MARGIN / 2 +
        height / graphZoom -
        BOUNDARY_MARGIN -
        NODE_HEIGHT
    : height - BOUNDARY_MARGIN - NODE_HEIGHT;
}
