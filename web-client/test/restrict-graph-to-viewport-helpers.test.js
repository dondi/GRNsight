import { describe, it, expect } from "vitest";
import {
  calcFlexiBox,
  viewportBoundsMoveDrag,
  flexZoomInBounds,
  getLeftXBoundaryMargin,
  getTopYBoundaryMargin,
  getRightXBoundaryMargin,
  getBottomYBoundaryMargin,
} from "../src/helpers/restrictGraphToViewportHelpers";
import { BOUNDARY_MARGIN, NODE_HEIGHT } from "../src/helpers/constants";

describe("restrictGraphToViewportHelpers targeted coverage", () => {
  it("calcFlexiBox returns zeroed box for invalid inputs", () => {
    expect(calcFlexiBox(null, 200, 200, 1, 0, 0)).toEqual({
      x: 0,
      y: 0,
      maxX: 0,
      maxY: 0,
      width: 0,
      height: 0,
    });
  });

  it("calcFlexiBox uses absolute-difference width/height when both extrema are negative", () => {
    const nodes = [
      { x: -100, y: -100, textWidth: 20 },
      { x: -50, y: -50, textWidth: 20 },
    ];

    const box = calcFlexiBox(nodes, 100, 100, 1, 1000, 1000);

    expect(box.x).toBeLessThan(0);
    expect(box.maxX).toBeLessThan(0);
    expect(box.y).toBeLessThan(0);
    expect(box.maxY).toBeLessThan(0);
    expect(box.width).toBe(Math.abs(box.maxX) - Math.abs(box.x));
    expect(box.height).toBe(Math.abs(box.maxY) - Math.abs(box.y));
  });

  it("calcFlexiBox clamps minX/minY to transformed boundary margins when node minima are smaller", () => {
    const nodes = [{ x: 1, y: 1, textWidth: 20 }];

    const box = calcFlexiBox(nodes, 500, 500, 1, 0, 0);

    expect(box.x).toBe(BOUNDARY_MARGIN / 2);
    expect(box.y).toBe(BOUNDARY_MARGIN / 2);
  });

  it("calcFlexiBox preserves minX/minY when node minima are already within transformed margins", () => {
    const nodes = [{ x: 10, y: 12, textWidth: 20 }];

    const box = calcFlexiBox(nodes, 500, 500, 1, 0, 0);

    expect(box.x).toBe(10);
    expect(box.y).toBe(12);
  });

  it("viewportBoundsMoveDrag returns false on right boundary overflow", () => {
    const nodes = [{ x: 10, y: 10, textWidth: 20 }];

    const inBounds = viewportBoundsMoveDrag(1, 160, 0, nodes, 200, 200, 0, 0);

    expect(inBounds).toBe(false);
  });

  it("viewportBoundsMoveDrag returns false on left boundary overflow", () => {
    const nodes = [{ x: 10, y: 10, textWidth: 20 }];

    const inBounds = viewportBoundsMoveDrag(1, -8, 0, nodes, 200, 200, 0, 0);

    expect(inBounds).toBe(false);
  });

  it("viewportBoundsMoveDrag returns false on bottom boundary overflow", () => {
    const nodes = [{ x: 10, y: 10, textWidth: 20 }];

    const inBounds = viewportBoundsMoveDrag(1, 0, 160, nodes, 200, 200, 0, 0);

    expect(inBounds).toBe(false);
  });

  it("viewportBoundsMoveDrag returns false on top boundary overflow", () => {
    const nodes = [{ x: 10, y: 10, textWidth: 20 }];

    const inBounds = viewportBoundsMoveDrag(1, 0, -8, nodes, 200, 200, 0, 0);

    expect(inBounds).toBe(false);
  });

  it("viewportBoundsMoveDrag returns true when drag stays within all boundaries", () => {
    const nodes = [{ x: 10, y: 10, textWidth: 20 }];

    const inBounds = viewportBoundsMoveDrag(1, 1, 1, nodes, 200, 200, 0, 0);

    expect(inBounds).toBe(true);
  });

  it("flexZoomInBounds returns false when scaled box exceeds viewport", () => {
    const nodes = [{ x: 10, y: 10, textWidth: 20 }];

    const inBounds = flexZoomInBounds(10, 1, nodes, 200, 200, 0, 0);

    expect(inBounds).toBe(false);
  });

  it("flexZoomInBounds returns true when scaled box fits inside viewport", () => {
    const nodes = [{ x: 10, y: 10, textWidth: 20 }];

    const inBounds = flexZoomInBounds(1, 1, nodes, 200, 200, 0, 0);

    expect(inBounds).toBe(true);
  });

  it("getRightXBoundaryMargin returns transformed bound when adaptive is false", () => {
    const result = getRightXBoundaryMargin(false, 2, 40, 200, 28);

    expect(result).toBe(-40 / 2 + BOUNDARY_MARGIN / 2 + 200 / 2 - BOUNDARY_MARGIN);
  });

  it("getRightXBoundaryMargin returns viewport-relative bound when adaptive is true", () => {
    const result = getRightXBoundaryMargin(true, 2, 40, 200, 28);

    expect(result).toBe(200 - BOUNDARY_MARGIN - 28);
  });

  it("getBottomYBoundaryMargin returns transformed bound when adaptive is false", () => {
    const result = getBottomYBoundaryMargin(false, 2, 60, 300);

    expect(result).toBe(-60 / 2 + BOUNDARY_MARGIN / 2 + 300 / 2 - BOUNDARY_MARGIN);
  });

  it("getBottomYBoundaryMargin returns viewport-relative bound when adaptive is true", () => {
    const result = getBottomYBoundaryMargin(true, 2, 60, 300);

    expect(result).toBe(300 - BOUNDARY_MARGIN - NODE_HEIGHT);
  });

  it("getLeftXBoundaryMargin returns transformed margin when adaptive is false", () => {
    const result = getLeftXBoundaryMargin(false, 2, 40);

    expect(result).toBe(-40 / 2 + BOUNDARY_MARGIN / 2);
  });

  it("getLeftXBoundaryMargin returns base boundary margin when adaptive is true", () => {
    const result = getLeftXBoundaryMargin(true, 2, 40);

    expect(result).toBe(BOUNDARY_MARGIN);
  });

  it("getTopYBoundaryMargin returns transformed margin when adaptive is false", () => {
    const result = getTopYBoundaryMargin(false, 2, 60);

    expect(result).toBe(-60 / 2 + BOUNDARY_MARGIN / 2);
  });

  it("getTopYBoundaryMargin returns base boundary margin when adaptive is true", () => {
    const result = getTopYBoundaryMargin(true, 2, 60);

    expect(result).toBe(BOUNDARY_MARGIN);
  });
});
