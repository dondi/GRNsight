import { getNodeWidth } from "./graphHelpers";
import { NODE_HEIGHT, BOUNDARY_MARGIN } from "./constants";

/**
 * Calculate a flexible bounding box around all nodes. Use the bounding box to find the most extreme
 * positions of nodes to determine whether drag movements are within bounds.
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
  const nodeWidth = getNodeWidth(nodes[0]);
  console.log("nodes: ", nodes);

  const xValuesNodes = nodes.map(node => node.x);
  const yValuesNodes = nodes.map(node => node.y);
  // console.log("xValuesNodes: ", xValuesNodes);
  // console.log("yValuesNodes: ", yValuesNodes);
  console.log("width: ", width);
  console.log("height: ", height);
  console.log("graphZoom: ", graphZoom);

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

  //   boundingBoxRect
  //     .attr("x", -xTranslation / graphZoom + BOUNDARY_MARGIN / 2)
  //     .attr("width", width / graphZoom - BOUNDARY_MARGIN)
  //     .attr("y", -yTranslation / graphZoom + BOUNDARY_MARGIN / 2)
  //     .attr("height", height / graphZoom - BOUNDARY_MARGIN);

  //   flexibleContainerRect
  //     .attr("x", minX)
  //     .attr("y", minY)
  //     .attr("width", flexiBoxWidth)
  //     .attr("height", flexiBoxHeight);
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
    console.log("exceeds right boundary");
    return false;
  }

  // left boundary
  if (flexibleContainer.x + dx <= getLeftXBoundaryMargin(false, graphZoom, xTranslation)) {
    console.log("exceeds left boundary");
    return false;
  }

  // bottom boundary
  if (
    flexibleContainer.y + flexibleContainer.height + dy >=
    -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 + height / graphZoom - BOUNDARY_MARGIN
  ) {
    console.log("exceeds bottom boundary");
    return false;
  }

  // top boundary
  if (flexibleContainer.y + dy <= getTopYBoundaryMargin(false, graphZoom, yTranslation)) {
    console.log("exceeds top boundary");
    return false;
  }

  return true;
}

// Checks if zoomValue is in bounds when zoom in and out
export function flexZoomInBounds(graphZoom, nodes, width, height, xTranslation, yTranslation) {
  const flexibleContainer = calcFlexiBox(
    nodes,
    width,
    height,
    graphZoom,
    xTranslation,
    yTranslation
  );

  console.log("flexibleContainer: ", flexibleContainer);
  // console.log("graphZoom: ", graphZoom);
  // console.log("width: ", width);
  // console.log(
  //   "flexibleContainer.width * graphZoom > width: ",
  //   flexibleContainer.width * graphZoom > width
  // );
  // console.log("height: ", height);
  // console.log(
  //   "flexibleContainer.height * graphZoom > height: ",
  //   flexibleContainer.height * graphZoom > height
  // );
  // console.log("zoomPercent: ", graphZoom);

  // console.log(
  //   "flexibleContainer.width * graphZoom > width + xTranslation: ",
  //   flexibleContainer.width * graphZoom + xTranslation * graphZoom > width
  // );
  // console.log("flexibleContainer.width * graphZoom: ", flexibleContainer.width * graphZoom);

  // console.log("width: ", width);
  // console.log(
  //   "flexibleContainer.height * graphZoom > height + yTranslation: ",
  //   flexibleContainer.height * graphZoom + yTranslation * graphZoom > height
  // );
  // console.log("flexibleContainer.height * graphZoom: ", flexibleContainer.height * graphZoom);
  // console.log("height: ", height);
  // console.log("yTranslation: ", yTranslation);
  // console.log(" ");

  if (
    flexibleContainer.width * graphZoom > width ||
    flexibleContainer.height * graphZoom > height
  ) {
    console.log("flexZoomInBounds: false");
    return false;
  } else {
    console.log("flexZoomInBounds: true");
    return true;
  }
}

// Only calculate Left and Top boundary margins because calculate rightboundary and bottomboundary in tick
function getLeftXBoundaryMargin(adaptive, graphZoom, xTranslation) {
  //   return !adaptive && flexibleContainer
  //     ? -xTranslation / graphZoom + BOUNDARY_MARGIN / 2
  //     : BOUNDARY_MARGIN;
  return !adaptive ? -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 : BOUNDARY_MARGIN;
}

function getTopYBoundaryMargin(adaptive, graphZoom, yTranslation) {
  //   return !adaptive && flexibleContainer
  //     ? -yTranslation / graphZoom + BOUNDARY_MARGIN / 2
  //     : BOUNDARY_MARGIN;
  return !adaptive ? -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 : BOUNDARY_MARGIN;
}
