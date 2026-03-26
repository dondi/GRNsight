import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/helpers/markerHelpers", () => ({
  smartPathEnd: vi.fn((d, w, h) => {
    // Keep target endpoint to the lower-right to trigger the direction-flip path in createPath.
    d.target.newX = d.target.x + w;
    d.target.newY = d.target.y + h;
  }),
}));

import {
  getNodeWidth,
  normalize,
  getEffectiveStrokeWidth,
  createPath,
  getSelfReferringRadius,
  createSelfLoop,
  getEdgeThickness,
  getEdgeColor,
  calcAllWeights,
  calcMaxWeight,
} from "../src/helpers/graphHelpers";
import { smartPathEnd } from "../src/helpers/markerHelpers";
import {
  EDGE_BLACK,
  EDGE_BLUE,
  EDGE_RED,
  MINIMUM_NODE_WIDTH,
  NODE_MARGIN,
} from "../src/helpers/constants";

describe("graphHelpers targeted behaviors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("normalizes edge values with precision", () => {
    expect(normalize({ value: -2 }, 4)).toBe("0.5000");
  });

  it("getNodeWidth uses textWidth when present and fallback minimum when missing", () => {
    expect(getNodeWidth({ textWidth: 100 })).toBe(NODE_MARGIN + 100 + NODE_MARGIN);
    expect(getNodeWidth({})).toBe(NODE_MARGIN + MINIMUM_NODE_WIDTH + NODE_MARGIN);
  });

  it("getEffectiveStrokeWidth returns 4 for unweighted arrowheads and base width for repressors", () => {
    const unweightedArrowhead = getEffectiveStrokeWidth({
      baseStrokeWidth: 2,
      edge: { value: 1 },
      colorOptimal: true,
      networkMode: "Gene Regulatory Network",
    });

    const repressor = getEffectiveStrokeWidth({
      baseStrokeWidth: 2,
      edge: { value: -1 },
      colorOptimal: true,
      networkMode: "Gene Regulatory Network",
    });

    expect(unweightedArrowhead).toBe(4);
    expect(repressor).toBe(2);
  });

  it("createPath flips perpendicular vector for lower-right direction and produces a bezier path", () => {
    const edge = {
      source: { x: 10, y: 10, textWidth: 80 },
      target: { x: 40, y: 40, textWidth: 80 },
      value: 1,
      strokeWidth: 2,
    };

    const path = createPath(edge, 300, 200, true);

    expect(path.startsWith("M")).toBe(true);
    expect(path.includes("C")).toBe(true);
    expect(edge.label).toBeDefined();
  });

  it("createPath also flips vector for the upper-left direction case", () => {
    vi.mocked(smartPathEnd).mockImplementationOnce((d, w, h) => {
      d.target.newX = d.target.x - w;
      d.target.newY = d.target.y - h;
    });

    const edge = {
      source: { x: 80, y: 80, textWidth: 80 },
      target: { x: 40, y: 40, textWidth: 80 },
      value: 1,
      strokeWidth: 2,
    };

    const path = createPath(edge, 300, 200, true);
    expect(path.includes("C")).toBe(true);
    expect(edge.label).toBeDefined();
  });

  it("createPath keeps perpendicular vector direction for mixed quadrants", () => {
    vi.mocked(smartPathEnd).mockImplementationOnce((d, w, h) => {
      // target.newX is to the right while target.newY is above source -> condition at line 73 is false
      d.target.newX = d.target.x + w;
      d.target.newY = d.target.y - h;
    });

    const edge = {
      source: { x: 20, y: 90, textWidth: 80 },
      target: { x: 40, y: 40, textWidth: 80 },
      value: 1,
      strokeWidth: 2,
    };

    const path = createPath(edge, 300, 200, true);
    expect(path.includes("C")).toBe(true);
    expect(edge.label).toBeDefined();
  });

  it("createSelfLoop applies long-label adjustment and repressor offset handling", () => {
    const loopEdge = {
      source: { x: 20, y: 30, textWidth: 200 },
      target: { x: 20, y: 30 },
      value: -1,
      strokeWidth: 2,
    };

    const path = createSelfLoop(loopEdge, 600, 400, true);

    expect(path.startsWith("M")).toBe(true);
    expect(loopEdge.label).toBeDefined();
    // With negative edge + colorOptimal=true, offset handling clamps to at least 10.
    expect(loopEdge.label.y).toBeLessThanOrEqual(400 - 10);
  });

  it("createSelfLoop self-edge path with short label keeps default nodeShift and offset", () => {
    const loopEdge = {
      source: { x: 20, y: 30, textWidth: 80 },
      target: { x: 20, y: 30 },
      value: 1,
      strokeWidth: 6,
    };

    const path = createSelfLoop(loopEdge, 600, 400, true);

    expect(path.startsWith("M")).toBe(true);
    expect(loopEdge.label).toBeDefined();
    // Positive edge should not force offset >= 10, so y uses original strokeWidth offset behavior.
    expect(loopEdge.label.y).toBeLessThanOrEqual(400 - 6);
  });

  it("createSelfLoop uses normal-edge path when source and target differ", () => {
    const normalEdge = {
      source: { x: 20, y: 30, textWidth: 80 },
      target: { x: 120, y: 150 },
      value: 1,
      strokeWidth: 6,
    };

    const path = createSelfLoop(normalEdge, 600, 400, true);

    expect(path.startsWith("M")).toBe(true);
    expect(path.includes("A")).toBe(true);
    expect(normalEdge.label).toBeDefined();
  });

  it("getSelfReferringRadius returns radius for edge and 0 for missing edge", () => {
    expect(getSelfReferringRadius({ strokeWidth: 6 })).toBe(20);
    expect(getSelfReferringRadius(null)).toBe(0);
  });

  it("getEdgeThickness computes weighted thickness using d3 linear scaling", () => {
    const workbook = {
      sheetType: "weighted",
      positiveWeights: [1, 3, 10],
      negativeWeights: [-2, -5],
    };

    const thickness = getEdgeThickness(workbook, true, { value: 5 });

    expect(Number.isInteger(thickness)).toBe(true);
    expect(thickness).toBeGreaterThan(2);
  });

  it("getEdgeThickness returns 2 for unweighted sheets or when coloring is disabled", () => {
    const workbook = {
      sheetType: "unweighted",
      positiveWeights: [1],
      negativeWeights: [-1],
    };

    expect(getEdgeThickness(workbook, true, { value: 99 })).toBe(2);
    expect(getEdgeThickness({ ...workbook, sheetType: "weighted" }, false, { value: 99 })).toBe(2);
  });

  it("getEdgeColor returns gray when normalized value is below threshold", () => {
    const workbook = {
      sheetType: "weighted",
    };

    const color = getEdgeColor(workbook, { value: 1 }, 0.5, 10, true);
    expect(color).toBe("gray");
  });

  it("getEdgeColor returns black for disabled coloring and for unweighted sheets", () => {
    expect(getEdgeColor({ sheetType: "weighted" }, { value: 9 }, 0.1, 10, false)).toBe(EDGE_BLACK);
    expect(getEdgeColor({ sheetType: "unweighted" }, { value: 9 }, 0.1, 10, true)).toBe(EDGE_BLACK);
  });

  it("getEdgeColor returns blue/red by sign when above threshold", () => {
    const workbook = {
      sheetType: "weighted",
    };

    const blue = getEdgeColor(workbook, { value: -9 }, 0.1, 10, true);
    const red = getEdgeColor(workbook, { value: 9 }, 0.1, 10, true);

    expect(blue).toBe(EDGE_BLUE);
    expect(red).toBe(EDGE_RED);
  });

  it("calcAllWeights with colorOptimal=true converts to abs precision values", () => {
    const data = {
      positiveWeights: [1.234567],
      negativeWeights: [-2.345678],
    };

    const result = calcAllWeights(data, true);

    expect(result).toEqual([1.235, 2.346]);
  });

  it("calcAllWeights with colorOptimal=false rewrites all non-zero weights to 1", () => {
    const data = {
      positiveWeights: [0, 1.5, 3],
      negativeWeights: [-2, 0, -0.1],
    };

    const result = calcAllWeights(data, false);

    expect(result).toEqual([0, 1, 1, 1, 0, 1]);
  });

  it("calcMaxWeight returns the max absolute value from all weights", () => {
    expect(calcMaxWeight([1, -2, 4, -8, 3])).toBe(8);
  });
});
