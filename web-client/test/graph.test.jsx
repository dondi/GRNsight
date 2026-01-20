// Graph.test.jsx
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Graph from "../src/components/Graph";
import { GrnStateContext } from "../src/App";
import { getDemoWorkbook, getDemoEndpoint } from "../src/services/api";

// Mock the API module
vi.mock("../src/services/api", () => ({
  getDemoWorkbook: vi.fn(),
  getDemoEndpoint: vi.fn(),
}));

describe("Graph", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console.log in tests
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("fetches demo workbook when demoValue is provided", async () => {
    const mockDemoValue = { props: { children: "Demo #1: Unweighted GRN" } };
    const mockWorkbookData = {
      genes: [{ name: "Gene1", index: 0 }],
      links: [{ source: 0, target: 0, value: 1 }],
      sheetType: "unweighted",
    };

    getDemoEndpoint.mockReturnValue("unweighted");
    getDemoWorkbook.mockResolvedValue(mockWorkbookData);

    const mockContextValue = {
      demoValue: mockDemoValue,
      enableEdgeColoring: false,
      enableNodeColoring: false,
      linkDistance: 500,
      charge: -50,
    };

    render(
      <GrnStateContext.Provider value={mockContextValue}>
        <Graph />
      </GrnStateContext.Provider>
    );

    // Verify getDemoEndpoint was called with demoValue
    expect(getDemoEndpoint).toHaveBeenCalledWith(mockDemoValue);

    // Verify getDemoWorkbook was called with the endpoint
    expect(getDemoWorkbook).toHaveBeenCalledWith("unweighted");

    // Wait for the promise to resolve
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("demoEndpoint:", "unweighted");
      expect(console.log).toHaveBeenCalledWith(mockWorkbookData);
    });
  });

  it("handles error when fetching demo workbook fails", async () => {
    const mockDemoValue = { props: { children: "Demo #1: Unweighted GRN" } };
    const mockError = new Error("Failed to fetch workbook");

    getDemoEndpoint.mockReturnValue("unweighted");
    getDemoWorkbook.mockRejectedValue(mockError);

    const mockContextValue = {
      demoValue: mockDemoValue,
      enableEdgeColoring: false,
      enableNodeColoring: false,
      linkDistance: 500,
      charge: -50,
    };

    render(
      <GrnStateContext.Provider value={mockContextValue}>
        <Graph />
      </GrnStateContext.Provider>
    );

    // Wait for the error to be set
    await waitFor(() => {
      expect(getDemoWorkbook).toHaveBeenCalledWith("unweighted");
    });

    // Error should be caught and handled
    expect(getDemoWorkbook).toHaveBeenCalled();
  });

  it("does not fetch workbook when demoValue is null", () => {
    const mockContextValue = {
      demoValue: null,
      enableEdgeColoring: false,
      enableNodeColoring: false,
      linkDistance: 500,
      charge: -50,
    };

    render(
      <GrnStateContext.Provider value={mockContextValue}>
        <Graph />
      </GrnStateContext.Provider>
    );

    // Should return early, not call API
    expect(getDemoEndpoint).not.toHaveBeenCalled();
    expect(getDemoWorkbook).not.toHaveBeenCalled();
  });

  it("refetches workbook when demoValue changes", async () => {
    const mockDemoValue1 = { props: { children: "Demo #1: Unweighted GRN" } };
    const mockDemoValue2 = { props: { children: "Demo #2: Weighted GRN" } };
    const mockWorkbookData1 = {
      genes: [{ name: "Gene1", index: 0 }],
      links: [],
      sheetType: "unweighted",
    };
    const mockWorkbookData2 = {
      genes: [{ name: "Gene2", index: 0 }],
      links: [],
      sheetType: "weighted",
    };

    getDemoEndpoint.mockReturnValueOnce("unweighted").mockReturnValueOnce("weighted");
    getDemoWorkbook
      .mockResolvedValueOnce(mockWorkbookData1)
      .mockResolvedValueOnce(mockWorkbookData2);

    const mockContextValue = {
      demoValue: mockDemoValue1,
      enableEdgeColoring: false,
      enableNodeColoring: false,
      linkDistance: 500,
      charge: -50,
    };

    const { rerender } = render(
      <GrnStateContext.Provider value={mockContextValue}>
        <Graph />
      </GrnStateContext.Provider>
    );

    // Wait for first fetch
    await waitFor(() => {
      expect(getDemoWorkbook).toHaveBeenCalledWith("unweighted");
    });

    // Change demoValue
    const updatedContextValue = {
      ...mockContextValue,
      demoValue: mockDemoValue2,
    };

    rerender(
      <GrnStateContext.Provider value={updatedContextValue}>
        <Graph />
      </GrnStateContext.Provider>
    );

    // Wait for second fetch
    await waitFor(() => {
      expect(getDemoWorkbook).toHaveBeenCalledWith("weighted");
    });

    expect(getDemoWorkbook).toHaveBeenCalledTimes(2);
  });
});
