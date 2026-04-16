import { describe, it, expect } from "vitest";
import { initialViewportSize } from "../src/helpers/viewportHelpers";
import {
  VIEW_SIZE_SMALL,
  VIEW_SIZE_MEDIUM,
  VIEW_SIZE_LARGE,
  MEDIUM_PAGE_WIDTH,
  LARGE_PAGE_WIDTH,
} from "../src/helpers/constants";

describe("initialViewportSize", () => {
  it("returns medium for widths strictly between medium and large breakpoints", () => {
    expect(initialViewportSize(MEDIUM_PAGE_WIDTH + 1)).toBe(VIEW_SIZE_MEDIUM);
    expect(initialViewportSize(LARGE_PAGE_WIDTH - 1)).toBe(VIEW_SIZE_MEDIUM);
  });

  it("returns large at the medium breakpoint boundary", () => {
    expect(initialViewportSize(MEDIUM_PAGE_WIDTH)).toBe(VIEW_SIZE_LARGE);
  });

  it("returns large at and above the large breakpoint", () => {
    expect(initialViewportSize(LARGE_PAGE_WIDTH)).toBe(VIEW_SIZE_LARGE);
    expect(initialViewportSize(LARGE_PAGE_WIDTH + 100)).toBe(VIEW_SIZE_LARGE);
  });

  it("returns small below the medium breakpoint", () => {
    expect(initialViewportSize(MEDIUM_PAGE_WIDTH - 1)).toBe(VIEW_SIZE_SMALL);
  });
});
