import { describe, it, expect } from "vitest";
import {
  normalize,
  smartPathEnd,
  getEdgeMarkerId,
  createAllMarkers,
} from "../src/helpers/markerHelpers";
import { EDGE_RED, EDGE_BLUE, EDGE_BLACK, NETWORK_GRN_MODE_FULL } from "../src/helpers/constants";

function makeDefsRecorder() {
  const markers = [];

  const createBuilder = node => ({
    attr(name, value) {
      node.attrs[name] = typeof value === "function" ? value() : value;
      return this;
    },
    append(tag) {
      const child = { tag, attrs: {}, child: null };
      node.child = child;
      return createBuilder(child);
    },
  });

  return {
    defs: {
      append(tag) {
        const marker = { tag, attrs: {}, child: null };
        markers.push(marker);
        return createBuilder(marker);
      },
    },
    markers,
  };
}

function buildEdge(overrides = {}) {
  return {
    strokeWidth: 12,
    value: -1,
    target: {
      x: 0,
      y: 0,
      centerX: 50,
      centerY: 25,
      textWidth: 100,
    },
    source: {
      newX: 100,
      newY: 25,
      x: 100,
      y: 25,
      textWidth: 80,
    },
    ...overrides,
  };
}

describe("markerHelpers targeted lines", () => {
  it("normalizes edge value precision", () => {
    expect(normalize({ value: -2 }, 8)).toBe("0.2500");
  });

  it("smartPathEnd updates minimumDistance and repressor globalOffset", () => {
    const d = buildEdge({
      strokeWidth: 12,
      value: -5,
      source: { newX: 120, newY: 25, x: 120, y: 25, textWidth: 80 },
    });

    smartPathEnd(d, 100, 50, true);

    expect(d.target.newX).toBeDefined();
    expect(d.target.newY).toBeDefined();
  });

  it("smartPathEnd keeps stroke-width offset when edge is not a color-optimal repressor", () => {
    const d = buildEdge({
      strokeWidth: 12,
      value: 3,
      source: { newX: 100, newY: 50, x: 100, y: 50, textWidth: 80 },
    });

    smartPathEnd(d, 100, 50, true);

    expect(d.target.newX).toBe(112);
    expect(d.target.newY).toBe(62);
  });

  it("smartPathEnd handles corner intersection path with right/bottom corner assignment", () => {
    const d = buildEdge({
      strokeWidth: 10,
      source: { newX: 100, newY: 50, x: 100, y: 50, textWidth: 80 },
    });

    // tanRatioMoveable === tanRatioFixed, and both center comparisons are true.
    smartPathEnd(d, 100, 50, true);

    expect(d.target.newX).toBe(0 + 100 + 10);
    expect(d.target.newY).toBe(0 + 50 + 10);
  });

  it("smartPathEnd keeps left/top corner defaults when source is left and above in corner intersections", () => {
    const d = buildEdge({
      strokeWidth: 10,
      source: { newX: 0, newY: 0, x: 0, y: 0, textWidth: 80 },
    });

    smartPathEnd(d, 100, 50, true);

    expect(d.target.newX).toBe(-10);
    expect(d.target.newY).toBe(-10);
  });

  it("smartPathEnd handles vertical-side intersection path", () => {
    const d = buildEdge({
      strokeWidth: 8,
      source: { newX: 200, newY: 60, x: 200, y: 60, textWidth: 80 },
    });

    // tanRatioMoveable < tanRatioFixed path.
    smartPathEnd(d, 100, 50, true);

    expect(d.target.newX).toBeGreaterThan(100);
    expect(d.target.newY).toBeGreaterThan(0);
  });

  it("smartPathEnd keeps left-side x in vertical intersections when source is not to the right", () => {
    const d = buildEdge({
      strokeWidth: 8,
      source: { newX: 0, newY: 40, x: 0, y: 40, textWidth: 80 },
    });

    smartPathEnd(d, 100, 50, true);

    expect(d.target.newX).toBe(-8);
  });

  it("smartPathEnd handles horizontal-side intersection for non-arrowhead and arrowhead types", () => {
    const nonArrow = buildEdge({
      strokeWidth: 8,
      type: "repressor",
      source: { newX: 40, newY: 80, x: 40, y: 80, textWidth: 80 },
    });

    const arrow = buildEdge({
      strokeWidth: 8,
      type: "arrowhead",
      source: { newX: 40, newY: 80, x: 40, y: 80, textWidth: 80 },
    });

    // tanRatioMoveable > tanRatioFixed path.
    smartPathEnd(nonArrow, 100, 50, true);
    smartPathEnd(arrow, 100, 50, true);

    expect(nonArrow.target.newY).toBeGreaterThan(arrow.target.newY);
  });

  it("smartPathEnd keeps top-side y in horizontal intersections when source is not below target", () => {
    const d = buildEdge({
      strokeWidth: 8,
      type: "arrowhead",
      source: { newX: 40, newY: -30, x: 40, y: -30, textWidth: 80 },
    });

    smartPathEnd(d, 100, 50, true);

    expect(d.target.newY).toBe(-8);
  });

  it("smartPathEnd reflects x for horizontal-side intersections when target is left of source", () => {
    const d = buildEdge({
      strokeWidth: 8,
      type: "arrowhead",
      source: { newX: 200, newY: 200, x: 200, y: 200, textWidth: 80 },
    });

    smartPathEnd(d, 100, 50, true);

    expect(d.target.newX).toBeGreaterThan(d.target.centerX);
  });

  it("createAllMarkers builds all marker families in GRN mode with expected attributes", () => {
    const { defs, markers } = makeDefsRecorder();

    createAllMarkers({ defs, links: [], networkMode: NETWORK_GRN_MODE_FULL });

    expect(markers).toHaveLength(312);

    const repressor14blueSelf = markers.find(
      m => m.attrs.id === "repressor_SelfReferential_StrokeWidth14blue"
    );
    expect(repressor14blueSelf.attrs.refX).toBe(6);
    expect(repressor14blueSelf.attrs.refY).toBe(19.25);
    expect(repressor14blueSelf.attrs.markerUnits).toBe("userSpaceOnUse");

    const horizontal9blue = markers.find(
      m => m.attrs.id === "repressorHorizontal_StrokeWidth9blue"
    );
    expect(horizontal9blue.attrs.refX).toBe(16);
    expect(horizontal9blue.attrs.refY).toBe(4);
    expect(horizontal9blue.attrs.markerWidth).toBe(34);
    expect(horizontal9blue.attrs.markerHeight).toBe(9);

    const horizontal9blueSelf = markers.find(
      m => m.attrs.id === "repressorHorizontal_SelfReferential_StrokeWidth9blue"
    );
    expect(horizontal9blueSelf.attrs.refX).toBe(17);

    const arrow14blueSelf = markers.find(
      m => m.attrs.id === "arrowhead_SelfReferential_StrokeWidth14blue"
    );
    expect(arrow14blueSelf.attrs.refX).toBe(8.3);
    expect(arrow14blueSelf.attrs.refY).toBe(6);
    expect(arrow14blueSelf.attrs.orient).toBe(232);

    const arrow14blue = markers.find(m => m.attrs.id === "arrowhead_StrokeWidth14blue");
    expect(arrow14blue.attrs.refX).toBe(9);
    expect(arrow14blue.attrs.refY).toBe(5.3);
    expect(arrow14blue.attrs.orient).toBe("auto");

    const arrow6black = markers.find(m => m.attrs.id === "arrowhead_StrokeWidth6");
    expect(arrow6black.attrs.markerWidth).toBe(25.5);
    expect(arrow6black.attrs.markerHeight).toBe(18.5);
    expect(arrow6black.child.attrs.style).toContain(EDGE_BLACK);

    const arrow8gray = markers.find(m => m.attrs.id === "arrowhead_StrokeWidth8gray");
    expect(arrow8gray.attrs.markerWidth).toBe(36);
    expect(arrow8gray.attrs.markerHeight).toBe(29);

    const arrow10red = markers.find(m => m.attrs.id === "arrowhead_StrokeWidth10red");
    expect(arrow10red.child.attrs.style).toContain(EDGE_RED);
  });

  it("createAllMarkers skips arrowheads outside GRN full mode", () => {
    const { defs, markers } = makeDefsRecorder();

    createAllMarkers({ defs, links: [], networkMode: "Protein-Protein Interaction" });

    expect(markers).toHaveLength(208);
    expect(markers.some(m => m.attrs.id?.startsWith("arrowhead"))).toBe(false);
    expect(markers.some(m => m.attrs.id === "repressor_StrokeWidth2")).toBe(true);
    expect(markers.some(m => m.attrs.id === "repressorHorizontal_StrokeWidth2")).toBe(true);
  });

  it("getEdgeMarkerId maps stroke colors to gray/red/blue marker suffixes", () => {
    const base = {
      source: { x: 0, y: 0, textWidth: 80 },
      target: { x: 100, y: 0, textWidth: 80 },
      strokeWidth: 4,
      value: 1,
    };

    const gray = getEdgeMarkerId({ d: { ...base, stroke: "gray" }, colorOptimal: false });
    const red = getEdgeMarkerId({ d: { ...base, stroke: EDGE_RED }, colorOptimal: false });
    const blue = getEdgeMarkerId({ d: { ...base, stroke: EDGE_BLUE }, colorOptimal: false });

    expect(gray).toContain("gray");
    expect(red).toContain("red");
    expect(blue).toContain("blue");
  });

  it("getEdgeMarkerId keeps default color key for black stroke", () => {
    const marker = getEdgeMarkerId({
      d: {
        source: { x: 0, y: 0, textWidth: 80 },
        target: { x: 100, y: 0, textWidth: 80 },
        stroke: EDGE_BLACK,
        strokeWidth: 4,
        value: 1,
      },
      colorOptimal: false,
    });

    expect(marker).toBe("url(#arrowhead_StrokeWidth4)");
  });

  it("getEdgeMarkerId returns repressorHorizontal marker for self-referential negative edges", () => {
    const d = {
      source: { x: 10, y: 10, textWidth: 80 },
      target: { x: 10, y: 10, textWidth: 80 },
      stroke: EDGE_BLUE,
      strokeWidth: 6,
      value: -2,
    };

    const marker = getEdgeMarkerId({ d, colorOptimal: true });

    expect(marker).toContain("repressorHorizontal");
    expect(marker).toContain("_SelfReferential");
  });

  it("getEdgeMarkerId returns repressor marker for non-self negative edges with shallow approach", () => {
    const d = {
      source: { x: 0, y: 0, textWidth: 80 },
      target: { x: 300, y: 10, textWidth: 80 },
      stroke: EDGE_BLUE,
      strokeWidth: 6,
      value: -2,
    };

    const marker = getEdgeMarkerId({ d, colorOptimal: true });

    expect(marker).toContain("repressor_StrokeWidth");
  });
});
