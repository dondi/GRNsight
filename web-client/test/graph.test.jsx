import { render, waitFor, fireEvent, cleanup, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Graph from "../src/components/Graph";
import { GrnStateContext } from "../src/App";
import { getDemoWorkbook, getDemoEndpoint, getNetworkMode } from "../src/services/api";
import {
  FIT_TO_WINDOW,
  WIDTH_OFFSET,
  HEIGHT_OFFSET,
  ZOOM_DISPLAY_MIDDLE,
  NETWORK_GRN_MODE_FULL,
  VIEW_SIZE_MEDIUM,
  VIEW_SIZE_DIMENSIONS,
} from "../src/helpers/constants";

vi.mock("../src/services/api", () => ({
  getDemoWorkbook: vi.fn(),
  getDemoEndpoint: vi.fn(),
  getNetworkMode: vi.fn(),
}));

const buildContext = overrides => ({
  demoValue: null,
  viewSize: null,
  adaptive: true,
  colorOptimal: false,
  linkDistance: 500,
  charge: -50,
  networkMode: NETWORK_GRN_MODE_FULL,
  setNetworkMode: vi.fn(),
  grayThreshold: 0.05,
  zoomPercent: ZOOM_DISPLAY_MIDDLE,
  setZoomPercent: vi.fn(),
  ...overrides,
});

const workbookFixture = {
  genes: [
    { name: "Gene1", index: 0 },
    { name: "Gene2", index: 1 },
  ],
  links: [
    { source: 0, target: 1, value: 1 },
    { source: 1, target: 1, value: -1 },
  ],
  sheetType: "unweighted",
  positiveWeights: [1],
  negativeWeights: [-1],
  meta: {
    data: {
      workbookType: "grn",
    },
  },
};

describe("Graph", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Needed for node.each(...) text measurement in Graph
    Object.defineProperty(SVGElement.prototype, "getBBox", {
      configurable: true,
      value: vi.fn(() => ({
        x: 0,
        y: 0,
        width: 80,
        height: 20,
      })),
    });

    // d3-zoom reads svg.width.baseVal.value and svg.height.baseVal.value in jsdom.
    // jsdom doesn't implement these animated SVG length objects by default.
    Object.defineProperty(SVGSVGElement.prototype, "width", {
      configurable: true,
      value: { baseVal: { value: 1104 } },
    });
    Object.defineProperty(SVGSVGElement.prototype, "height", {
      configurable: true,
      value: { baseVal: { value: 648 } },
    });

    // d3-drag reads event.view.document on mousedown; jsdom synthetic mouse events
    // may provide a null view, so normalize to the active window for tests.
    Object.defineProperty(MouseEvent.prototype, "view", {
      configurable: true,
      get() {
        return window;
      },
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("does not fetch workbook when demoValue is null", () => {
    const context = buildContext({ demoValue: null });

    render(
      <GrnStateContext.Provider value={context}>
        <Graph />
      </GrnStateContext.Provider>
    );

    expect(getDemoEndpoint).not.toHaveBeenCalled();
    expect(getDemoWorkbook).not.toHaveBeenCalled();
  });

  it("fetches workbook, sets graph state, and renders main d3 graph", async () => {
    const setNetworkMode = vi.fn();
    const setZoomPercent = vi.fn();

    getDemoEndpoint.mockReturnValue("unweighted");
    getDemoWorkbook.mockResolvedValue(workbookFixture);
    getNetworkMode.mockReturnValue(NETWORK_GRN_MODE_FULL);

    const context = buildContext({
      demoValue: { props: { children: "Demo #1: Unweighted GRN" } },
      setNetworkMode,
      setZoomPercent,
    });

    const { container } = render(
      <GrnStateContext.Provider value={context}>
        <Graph />
      </GrnStateContext.Provider>
    );

    await waitFor(() => {
      expect(getDemoEndpoint).toHaveBeenCalled();
      expect(getDemoWorkbook).toHaveBeenCalledWith("unweighted");
    });

    await waitFor(() => {
      expect(setNetworkMode).toHaveBeenCalledWith(NETWORK_GRN_MODE_FULL);
      expect(setZoomPercent).toHaveBeenCalledWith(ZOOM_DISPLAY_MIDDLE);
    });

    // Confirms the large d3 effect path ran
    await waitFor(() => {
      expect(container.querySelector("#exportContainer")).not.toBeNull();
      expect(container.querySelector(".boundingBox")).not.toBeNull();
      expect(container.querySelectorAll(".node").length).toBeGreaterThan(0);
      expect(container.querySelectorAll(".link").length).toBeGreaterThan(0);
    });

    // Exercise center/move handlers wired in the main effect
    const upBtn = container.querySelector(".scrollUp");
    const centerBtn = container.querySelector(".center");
    if (upBtn) fireEvent.click(upBtn);
    if (centerBtn) fireEvent.click(centerBtn);

    // Exercise node double-click handler
    const nodeEl = container.querySelector(".node");
    if (nodeEl) fireEvent.doubleClick(nodeEl);
  });

  it("handles fetch error path and still resets zoom display", async () => {
    const setZoomPercent = vi.fn();

    getDemoEndpoint.mockReturnValue("unweighted");
    getDemoWorkbook.mockRejectedValue(new Error("Failed to fetch workbook"));

    const context = buildContext({
      demoValue: { props: { children: "Demo #1: Unweighted GRN" } },
      setZoomPercent,
    });

    const { container } = render(
      <GrnStateContext.Provider value={context}>
        <Graph />
      </GrnStateContext.Provider>
    );

    await waitFor(() => {
      expect(getDemoWorkbook).toHaveBeenCalledWith("unweighted");
    });

    await waitFor(() => {
      expect(container.textContent).toContain("Error: Failed to fetch workbook");
      expect(setZoomPercent).toHaveBeenCalledWith(ZOOM_DISPLAY_MIDDLE);
    });
  });

  it("applies fit-to-window sizing and binds/unbinds resize listener", async () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const context = buildContext({
      viewSize: FIT_TO_WINDOW,
    });

    const { container, unmount } = render(
      <GrnStateContext.Provider value={context}>
        <Graph />
      </GrnStateContext.Provider>
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    const graphContainer = container.querySelector(".grnsight-container");
    await waitFor(() => {
      expect(graphContainer).not.toBeNull();
      expect(graphContainer.style.width).toBe(`${window.innerWidth - WIDTH_OFFSET}px`);
      expect(graphContainer.style.height).toBe(`${window.innerHeight - HEIGHT_OFFSET}px`);
    });

    // Exercise handleResize body so setWindowDimensions updates from current window size.
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1440 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 900 });
    fireEvent(window, new Event("resize"));

    await waitFor(() => {
      expect(graphContainer.style.width).toBe(`${1440 - WIDTH_OFFSET}px`);
      expect(graphContainer.style.height).toBe(`${900 - HEIGHT_OFFSET}px`);
    });

    Object.defineProperty(window, "innerWidth", { configurable: true, value: originalInnerWidth });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: originalInnerHeight,
    });

    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  it("uses explicit viewport preset dimensions when viewSize is not fit-to-window", async () => {
    getDemoEndpoint.mockReturnValue("unweighted");
    getDemoWorkbook.mockResolvedValue(workbookFixture);
    getNetworkMode.mockReturnValue(NETWORK_GRN_MODE_FULL);

    const context = buildContext({
      demoValue: { props: { children: "Demo #1: Unweighted GRN" } },
      viewSize: VIEW_SIZE_MEDIUM,
    });

    const { container } = render(
      <GrnStateContext.Provider value={context}>
        <Graph />
      </GrnStateContext.Provider>
    );

    const graphContainer = container.querySelector(".grnsight-container");
    await waitFor(() => {
      expect(graphContainer.style.width).toBe(`${VIEW_SIZE_DIMENSIONS[VIEW_SIZE_MEDIUM].width}px`);
      expect(graphContainer.style.height).toBe(
        `${VIEW_SIZE_DIMENSIONS[VIEW_SIZE_MEDIUM].height}px`
      );
    });
  });

  it("runs zoom sync effect when zoomPercent changes after graph mount", async () => {
    getDemoEndpoint.mockReturnValue("unweighted");
    getDemoWorkbook.mockResolvedValue(workbookFixture);
    getNetworkMode.mockReturnValue(NETWORK_GRN_MODE_FULL);

    const base = buildContext({
      demoValue: { props: { children: "Demo #1: Unweighted GRN" } },
      zoomPercent: 100,
    });

    const { container, rerender, unmount } = render(
      <GrnStateContext.Provider value={base}>
        <Graph />
      </GrnStateContext.Provider>
    );

    await waitFor(() => {
      expect(container.querySelector(".boundingBox")).not.toBeNull();
    });

    const updated = {
      ...base,
      zoomPercent: 120,
    };

    rerender(
      <GrnStateContext.Provider value={updated}>
        <Graph />
      </GrnStateContext.Provider>
    );

    await waitFor(() => {
      const transform = container.querySelector(".boundingBox")?.getAttribute("transform") || "";
      expect(transform).toContain("scale(1.2)");
    });

    // Covers cleanup path where simulation.stop() is called
    unmount();
  });

  it("executes graph zoom drag and node drag handlers in non-adaptive mode", async () => {
    getDemoEndpoint.mockReturnValue("unweighted");
    getDemoWorkbook.mockResolvedValue(workbookFixture);
    getNetworkMode.mockReturnValue(NETWORK_GRN_MODE_FULL);

    const context = buildContext({
      demoValue: { props: { children: "Demo #1: Unweighted GRN" } },
      adaptive: false,
      viewSize: VIEW_SIZE_MEDIUM,
      zoomPercent: 120,
    });

    const { container } = render(
      <GrnStateContext.Provider value={context}>
        <Graph />
      </GrnStateContext.Provider>
    );

    await waitFor(() => {
      expect(container.querySelector("svg")).not.toBeNull();
      expect(container.querySelector(".node")).not.toBeNull();
    });

    const svg = container.querySelector("svg");
    const node = container.querySelector(".node");
    const eventView = svg.ownerDocument.defaultView;
    const MouseEventCtor = eventView.MouseEvent;

    // Trigger zoom drag callbacks.
    await act(async () => {
      svg.dispatchEvent(
        new MouseEventCtor("mousedown", {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 120,
          buttons: 1,
        })
      );
      window.dispatchEvent(
        new MouseEventCtor("mousemove", {
          bubbles: true,
          cancelable: true,
          clientX: 160,
          clientY: 170,
          buttons: 1,
        })
      );
      window.dispatchEvent(
        new MouseEventCtor("mouseup", {
          bubbles: true,
          cancelable: true,
          clientX: 160,
          clientY: 170,
        })
      );
    });

    // Trigger node drag callbacks when !adaptive
    await act(async () => {
      node.dispatchEvent(
        new MouseEventCtor("mousedown", {
          bubbles: true,
          cancelable: true,
          clientX: 240,
          clientY: 210,
          buttons: 1,
        })
      );
      window.dispatchEvent(
        new MouseEventCtor("mousemove", {
          bubbles: true,
          cancelable: true,
          clientX: 900,
          clientY: 900,
          buttons: 1,
        })
      );
      window.dispatchEvent(
        new MouseEventCtor("mouseup", {
          bubbles: true,
          cancelable: true,
          clientX: 900,
          clientY: 900,
        })
      );
    });

    const nodeDatum = node.__data__;
    expect(nodeDatum.fx).not.toBeUndefined();
    expect(nodeDatum.fy).not.toBeUndefined();
  });

  it("covers adaptive boundary expansion and link label updates during ticks", async () => {
    getDemoEndpoint.mockReturnValue("unweighted");
    getDemoWorkbook.mockResolvedValue({
      ...workbookFixture,
      genes: [
        { name: "Gene1", index: 0, x: -1000, y: -1000 },
        { name: "Gene2", index: 1, x: -1000, y: -1000 },
      ],
    });
    getNetworkMode.mockReturnValue(NETWORK_GRN_MODE_FULL);

    const adaptiveContext = buildContext({
      demoValue: { props: { children: "Demo #1: Unweighted GRN" } },
      adaptive: true,
      viewSize: VIEW_SIZE_MEDIUM,
    });

    const { container } = render(
      <GrnStateContext.Provider value={adaptiveContext}>
        <Graph />
      </GrnStateContext.Provider>
    );

    await waitFor(() => {
      expect(container.querySelectorAll(".link").length).toBeGreaterThan(0);
      expect(container.querySelectorAll(".node").length).toBeGreaterThan(0);
    });

    const boundingBoxInner = container.querySelector(".boundingBox > g");
    const widthBefore = Number(boundingBoxInner.getAttribute("width"));
    const heightBefore = Number(boundingBoxInner.getAttribute("height"));

    // Push nodes against top/left boundaries so adaptive growth code executes on a later tick.
    container.querySelectorAll(".node").forEach(nodeEl => {
      const d = nodeEl.__data__;
      d.x = -2000;
      d.y = -2000;
    });

    // Add text children so link.select("text") callbacks execute and can read d.label.x/y.
    container.querySelectorAll(".link").forEach(linkGroup => {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      linkGroup.appendChild(text);
    });

    await waitFor(() => {
      const widthAfter = Number(boundingBoxInner.getAttribute("width"));
      const heightAfter = Number(boundingBoxInner.getAttribute("height"));
      expect(widthAfter).toBeGreaterThanOrEqual(widthBefore);
      expect(heightAfter).toBeGreaterThanOrEqual(heightBefore);
    });

    await waitFor(() => {
      const linkText = container.querySelector(".link text");
      // x/y being set indicates link.select("text").attr("x"|"y", ...) callbacks ran.
      expect(linkText?.getAttribute("x")).not.toBeNull();
      expect(linkText?.getAttribute("y")).not.toBeNull();
    });
  });
});
