import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "../src/components/Navbar";
import { GrnStateContext } from "../src/App";
import {
  ZOOM_DISPLAY_MINIMUM,
  ZOOM_DISPLAY_MAXIMUM,
  ZOOM_DISPLAY_MIDDLE,
  VIEW_SIZE_SMALL,
  VIEW_SIZE_MEDIUM,
  VIEW_SIZE_LARGE,
  FIT_TO_WINDOW,
  DEMO_TYPES,
} from "../src/helpers/constants";

vi.mock("grommet", () => {
  const toArray = value => (Array.isArray(value) ? value : [value]);

  return {
    Nav: ({ children, className }) => <nav className={className}>{children}</nav>,
    DropButton: ({ label, dropContent }) => (
      <section data-testid={`drop-${label}`}>
        <button type="button">{label}</button>
        {dropContent}
      </section>
    ),
    Box: ({ children }) => <div>{children}</div>,
    Text: ({ children }) => <span>{children}</span>,
    Button: ({ children, onClick }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    TextInput: ({ value, onChange }) => (
      <input value={value ?? ""} onChange={onChange} readOnly={!onChange} />
    ),
    Select: ({ options, onChange }) => (
      <button
        type="button"
        data-testid="demo-select"
        onClick={() => onChange({ option: toArray(options)[0] })}
      >
        Select
      </button>
    ),
  };
});

vi.mock("grommet-icons", () => ({
  Refresh: () => <span>RefreshIcon</span>,
  Checkmark: () => <span>CheckmarkIcon</span>,
  FolderOpen: () => <span>FolderOpenIcon</span>,
  CaretRightFill: () => <span>CaretRightFillIcon</span>,
}));

const buildContext = overrides => ({
  networkMode: "Gene Regulatory Network",
  setNetworkMode: vi.fn(),
  enableNodeColoring: false,
  setEnableNodeColoring: vi.fn(),
  colorOptimal: true,
  setColorOptimal: vi.fn(),
  linkDistance: 500,
  setLinkDistance: vi.fn(),
  charge: -50,
  setCharge: vi.fn(),
  lockForceParameters: false,
  setLockForceParameters: vi.fn(),
  averageReplicateValuesTop: false,
  setAverageReplicateValuesTop: vi.fn(),
  averageReplicateValuesBottom: false,
  setAverageReplicateValuesBottom: vi.fn(),
  logFoldChangeMax: 3,
  setLogFoldChangeMax: vi.fn(),
  edgeWeightVisibility: "Show With Mouse Over",
  setEdgeWeightVisibility: vi.fn(),
  edgeWeightNormalization: 2.971,
  setEdgeWeightNormalization: vi.fn(),
  grayThreshold: 0.05,
  setGrayThreshold: vi.fn(),
  showGrayEdgesDashed: false,
  setShowGrayEdgesDashed: vi.fn(),
  demoValue: null,
  setDemoValue: vi.fn(),
  viewSize: VIEW_SIZE_SMALL,
  setViewSize: vi.fn(),
  zoomPercent: ZOOM_DISPLAY_MIDDLE,
  setZoomPercent: vi.fn(),
  adaptive: true,
  setAdaptive: vi.fn(),
  ...overrides,
});

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dropdown sections and runs handlers in the default node-coloring branch", () => {
    const context = buildContext();
    const { getByTestId, getByText, getByDisplayValue, getAllByRole } = render(
      <GrnStateContext.Provider value={context}>
        <Navbar />
      </GrnStateContext.Provider>
    );

    // Network select onChange path
    fireEvent.click(getByTestId("demo-select"));
    expect(context.setDemoValue).toHaveBeenCalled();

    // Layout toggles and text inputs
    fireEvent.click(getByText("Lock Force Graph Parameters"));
    expect(context.setLockForceParameters).toHaveBeenCalledWith(true);

    fireEvent.change(getByDisplayValue("500"), { target: { value: "640" } });
    expect(context.setLinkDistance).toHaveBeenCalledWith("640");

    fireEvent.change(getByDisplayValue("-50"), { target: { value: "-125" } });
    expect(context.setCharge).toHaveBeenCalledWith("-125");

    // Node false-branch toggle
    fireEvent.click(getByText("Enable Node Coloring"));
    expect(context.setEnableNodeColoring).toHaveBeenCalledWith(true);

    // Edge toggles and inputs
    fireEvent.click(getByText("Enable Edge Coloring Based on Weight Values"));
    expect(context.setColorOptimal).toHaveBeenCalledWith(false);

    fireEvent.change(getByDisplayValue("2.971"), { target: { value: "3.2" } });
    expect(context.setEdgeWeightNormalization).toHaveBeenCalledWith("3.2");

    fireEvent.change(getByDisplayValue("5"), { target: { value: "8" } });
    expect(context.setGrayThreshold).toHaveBeenCalledWith(0.08);

    // View menu actions
    fireEvent.click(getByText("Small (1104 x 648 pixels)"));
    fireEvent.click(getByText("Medium (1414 x 840 pixels)"));
    fireEvent.click(getByText("Large (1920 x 1080 pixels)"));
    fireEvent.click(getByText("Fit To Window"));
    expect(context.setViewSize).toHaveBeenCalledWith(VIEW_SIZE_SMALL);
    expect(context.setViewSize).toHaveBeenCalledWith(VIEW_SIZE_MEDIUM);
    expect(context.setViewSize).toHaveBeenCalledWith(VIEW_SIZE_LARGE);
    expect(context.setViewSize).toHaveBeenCalledWith(FIT_TO_WINDOW);

    fireEvent.click(getByText("Restrict Graph to Viewport"));
    expect(context.setAdaptive).toHaveBeenCalledWith(false);

    // Zoom validator and input sync (valueValidator + zoomInputValidator + handler)
    const zoomInput = getByDisplayValue(String(ZOOM_DISPLAY_MIDDLE));
    fireEvent.change(zoomInput, { target: { value: String(ZOOM_DISPLAY_MAXIMUM + 500) } });
    expect(context.setZoomPercent).toHaveBeenCalledWith(ZOOM_DISPLAY_MAXIMUM);

    fireEvent.change(zoomInput, { target: { value: String(ZOOM_DISPLAY_MINIMUM - 5) } });
    expect(context.setZoomPercent).toHaveBeenCalledWith(ZOOM_DISPLAY_MINIMUM);

    // Demo drop buttons at end of Navbar
    Object.values(DEMO_TYPES).forEach(name => {
      fireEvent.click(getByText(name));
    });

    // Smoke-check many drop sections were rendered (covers large JSX range)
    expect(getAllByRole("button").length).toBeGreaterThan(20);
  });

  it("renders the node-coloring enabled branch and toggles it off", () => {
    const context = buildContext({
      enableNodeColoring: true,
      averageReplicateValuesTop: true,
      averageReplicateValuesBottom: true,
    });

    const { getAllByText } = render(
      <GrnStateContext.Provider value={context}>
        <Navbar />
      </GrnStateContext.Provider>
    );

    // In enabled branch, the same label appears and clicking it disables node coloring.
    fireEvent.click(getAllByText("Enable Node Coloring")[0]);
    expect(context.setEnableNodeColoring).toHaveBeenCalledWith(false);
  });
});
