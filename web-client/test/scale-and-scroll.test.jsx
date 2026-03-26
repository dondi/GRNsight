import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ScaleAndScroll from "../src/components/ScaleAndScroll";
import { GrnStateContext } from "../src/App";
import {
  NETWORK_GRN_MODE_FULL,
  ZOOM_SLIDER_MIDDLE,
  zoomScaleSliderLeft,
  zoomScaleSliderRight,
} from "../src/helpers/constants";

vi.mock("../src/helpers/restrictGraphToViewportHelpers", () => ({
  flexZoomInBounds: vi.fn(() => true),
  viewportBoundsMoveDrag: vi.fn(() => true),
}));

import { flexZoomInBounds } from "../src/helpers/restrictGraphToViewportHelpers";

const baseContext = overrides => ({
  zoomPercent: 100,
  setZoomPercent: vi.fn(),
  networkMode: NETWORK_GRN_MODE_FULL,
  adaptive: true,
  ...overrides,
});

describe("ScaleAndScroll", () => {
  let originalRequestAnimationFrame;
  let originalCancelAnimationFrame;

  beforeEach(() => {
    vi.clearAllMocks();
    let id = 0;
    originalRequestAnimationFrame = globalThis.requestAnimationFrame;
    originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
    globalThis.requestAnimationFrame = vi.fn(cb => {
      id += 1;
      cb();
      return id;
    });
    globalThis.cancelAnimationFrame = vi.fn();
  });

  afterEach(() => {
    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
    globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
  });

  it("updates zoom when adaptive is true using left slider mapping", async () => {
    const setZoomPercent = vi.fn();

    const { container } = render(
      <GrnStateContext.Provider value={baseContext({ setZoomPercent, adaptive: true })}>
        <ScaleAndScroll getViewportBoundsData={vi.fn()} />
      </GrnStateContext.Provider>
    );

    const slider = container.querySelector("#zoomSlider");
    fireEvent.change(slider, { target: { value: "2" } });

    const expected = Math.floor(zoomScaleSliderLeft()(2));
    await waitFor(() => {
      expect(setZoomPercent).toHaveBeenCalledWith(expected);
    });
  });

  it("uses non-adaptive bounds data and cancels pending frame before scheduling next update", async () => {
    const setZoomPercent = vi.fn();
    const getViewportBoundsData = vi.fn(() => ({
      nodes: [{ x: 1, y: 1 }],
      width: 1104,
      height: 648,
      xTranslation: 0,
      yTranslation: 0,
      zoomScale: 1,
    }));

    const { container } = render(
      <GrnStateContext.Provider value={baseContext({ setZoomPercent, adaptive: false })}>
        <ScaleAndScroll getViewportBoundsData={getViewportBoundsData} />
      </GrnStateContext.Provider>
    );

    const slider = container.querySelector("#zoomSlider");
    fireEvent.change(slider, { target: { value: "8" } });
    fireEvent.change(slider, { target: { value: "7" } });

    const expectedSecond = Math.floor(zoomScaleSliderRight()(7));

    await waitFor(() => {
      expect(getViewportBoundsData).toHaveBeenCalled();
      expect(flexZoomInBounds).toHaveBeenCalled();
      expect(globalThis.cancelAnimationFrame).toHaveBeenCalled();
      expect(setZoomPercent).toHaveBeenCalledWith(expectedSecond);
    });
  });

  it("does not update zoom in non-adaptive mode when viewport data has no nodes", async () => {
    const setZoomPercent = vi.fn();
    const getViewportBoundsData = vi.fn(() => ({
      nodes: [],
      width: 1104,
      height: 648,
      xTranslation: 0,
      yTranslation: 0,
      zoomScale: 1,
    }));

    const { container } = render(
      <GrnStateContext.Provider value={baseContext({ setZoomPercent, adaptive: false })}>
        <ScaleAndScroll getViewportBoundsData={getViewportBoundsData} />
      </GrnStateContext.Provider>
    );

    const slider = container.querySelector("#zoomSlider");
    fireEvent.change(slider, { target: { value: "3.5" } });

    await waitFor(() => {
      expect(getViewportBoundsData).toHaveBeenCalled();
      expect(setZoomPercent).not.toHaveBeenCalled();
      expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();
    });
  });
});
