/**
 * Checks that drag movement keeps the graph within viewport bounds
 * @function viewportBoundsMoveDrag
 * @param {number} graphZoom - Current zoom level of the graph
 * @param {number} dx - Change in x position of the drag
 * @param {number} dy - Change in y position of the drag
 * @return {boolean} - True if the drag movement is within bounds, false otherwise
 */
export function viewportBoundsMoveDrag(graphZoom, dx, dy) {
//   flexibleContainer = calcFlexiBox();

//   if (
//     flexibleContainer.x + flexibleContainer.width + dx >=
//     -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 + width / graphZoom - BOUNDARY_MARGIN
//   ) {
//     return false;
//   }

//   if (flexibleContainer.x + dx <= getLeftXBoundaryMargin()) {
//     return false;
//   }

//   if (
//     flexibleContainer.y + flexibleContainer.height + dy >=
//     -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 + height / graphZoom - BOUNDARY_MARGIN
//   ) {
//     return false;
//   }

//   if (flexibleContainer.y + dy <= getTopYBoundaryMargin()) {
//     return false;
//   }

//   return true;
}
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
export function calcFlexiBox() {
//   const nodes = simulation.nodes();
//   let nodeWidth = 0;
//   if (nodes.length > 0) {
//     nodeWidth = nodes[0].textWidth + 8;
//   }

//   const xValuesNodes = nodes.map(node => node.x);
//   const yValuesNodes = nodes.map(node => node.y);

//   let minX = Math.min(...xValuesNodes);
//   let maxX = Math.max(...xValuesNodes) + nodeWidth;

//   let minY = Math.min(...yValuesNodes);
//   let maxY = Math.max(...yValuesNodes) + nodeHeight;

//   // Handle left x and top y boundaries to not exceed graph BOUNDARY_MARGINs
//   const BOUNDARY_MARGIN_X_L = getLeftXBoundaryMargin();
//   const BOUNDARY_MARGIN_Y_T = getTopYBoundaryMargin();
//   minX = minX < BOUNDARY_MARGIN_X_L ? BOUNDARY_MARGIN_X_L : minX;
//   minY = minY < BOUNDARY_MARGIN_Y_T ? BOUNDARY_MARGIN_Y_T : minY;

//   maxX =
//     maxX > -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 + width / graphZoom - BOUNDARY_MARGIN
//       ? -xTranslation / graphZoom + BOUNDARY_MARGIN / 2 + width / graphZoom - BOUNDARY_MARGIN
//       : maxX;

//   maxY =
//     maxY > -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 + height / graphZoom - BOUNDARY_MARGIN
//       ? -yTranslation / graphZoom + BOUNDARY_MARGIN / 2 + height / graphZoom - BOUNDARY_MARGIN
//       : maxY;

//   let flexiBoxWidth = maxX - minX;
//   if (maxX < 0 && minX < 0) {
//     flexiBoxWidth = Math.abs(maxX) - Math.abs(minX);
//   }

//   let flexiBoxHeight = maxY - minY;
//   if (maxY < 0 && minY < 0) {
//     flexiBoxHeight = Math.abs(maxY) - Math.abs(minY);
//   }

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
//   return {
//     x: minX,
//     y: minY,
//     maxX: maxX,
//     maxY: maxY,
//     width: flexiBoxWidth,
//     height: flexiBoxHeight,
//   };
}

// Checks if zoomValue is in bounds when zoom in and out
export function flexZoomInBounds(zoomValue) {
//   if (flexibleContainer) {
//     updateZoomContainerInfo();
//     flexibleContainer = calcFlexiBox();
//     if (flexibleContainer.width * zoomValue > width) {
//       return false;
//     } else if (flexibleContainer.height * zoomValue > height) {
//       return false;
//     }
//   }
//   return true;
}

// Only calculate Left and Top boundary margins because calculate rightboundary and bottomboundary in tick
function getLeftXBoundaryMargin() {
  return !adaptive && flexibleContainer
    ? -xTranslation / graphZoom + BOUNDARY_MARGIN / 2
    : BOUNDARY_MARGIN;
}

function getTopYBoundaryMargin() {
  return !adaptive && flexibleContainer
    ? -yTranslation / graphZoom + BOUNDARY_MARGIN / 2
    : BOUNDARY_MARGIN;
}
