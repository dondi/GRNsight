import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Sidebar from "../src/components/Sidebar";
import { GrnStateContext } from "../src/App";
import {
  DEMO_TYPES,
  VIEW_SIZE_SMALL,
  VIEW_SIZE_MEDIUM,
} from "../src/helpers/constants";

vi.mock("../src/components/helper-components/DottedLine", () => ({
  default: ({ width }) => <div data-testid="dotted-line">{width}</div>,
}));

vi.mock("grommet-icons", () => ({
  Refresh: () => <span>RefreshIcon</span>,
  FolderOpen: () => <span>FolderOpenIcon</span>,
  Database: () => <span>DatabaseIcon</span>,
  FormDown: () => <span>FormDownIcon</span>,
}));

vi.mock("grommet", async () => {
  const ReactImport = await import("react");

  return {
    Box: ({ children, ...props }) => <div {...props}>{children}</div>,
    Text: ({ children }) => <span>{children}</span>,
    Button: ({ children, onClick, ...props }) => (
      <button type="button" onClick={onClick} {...props}>
        {children}
      </button>
    ),
    Select: ({ onChange }) => (
      <button
        type="button"
        data-testid="select-control"
        onClick={() => onChange({ option: Object.values(DEMO_TYPES)[0] })}
      >
        Select
      </button>
    ),
    FileInput: ReactImport.forwardRef(({ onChange, ...props }, ref) => (
      <>
        <input ref={ref} data-testid="file-input" onChange={onChange} {...props} />
        <button
          type="button"
          data-testid="file-input-change"
          onClick={() => onChange({ target: { files: [{ name: "a.tsv" }, { name: "b.tsv" }] } })}
        >
          TriggerFileInput
        </button>
      </>
    )),
    Stack: ({ children }) => <div>{children}</div>,
    RangeInput: ({ value, onChange, ...props }) => (
      <input type="range" value={value} onChange={onChange} {...props} />
    ),
    CheckBox: ({ checked, onChange, label }) => (
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    ),
    TextInput: ({ value, onChange, placeholder }) => (
      <input value={value} onChange={onChange} placeholder={placeholder} readOnly={!onChange} />
    ),
    RadioButtonGroup: ({ options, value, onChange }) => (
      <button
        type="button"
        data-testid="radio-group"
        data-current={value}
        onClick={() => onChange({ target: { value: options[1] ?? options[0] } })}
      >
        Radio
      </button>
    ),
  };
});

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
  edgeWeightNormalization: 2.5,
  setEdgeWeightNormalization: vi.fn(),
  grayThreshold: 0.05,
  setGrayThreshold: vi.fn(),
  showGrayEdgesDashed: false,
  setShowGrayEdgesDashed: vi.fn(),
  demoValue: null,
  setDemoValue: vi.fn(),
  viewSize: VIEW_SIZE_SMALL,
  setViewSize: vi.fn(),
  adaptive: true,
  setAdaptive: vi.fn(),
  ...overrides,
});

describe("Sidebar", () => {
  let inputClickSpy;

  beforeEach(() => {
    vi.clearAllMocks();
    inputClickSpy = vi.spyOn(HTMLInputElement.prototype, "click").mockImplementation(() => {});
    globalThis.setValue = vi.fn();
  });

  afterEach(() => {
    delete globalThis.setValue;
    inputClickSpy.mockRestore();
  });

  it("covers network, layout, node, edge, and view interactions", () => {
    const context = buildContext();

    const { getAllByTestId, getByTestId, getByText, getByLabelText, getAllByRole, getAllByLabelText } = render(
      <GrnStateContext.Provider value={context}>
        <Sidebar />
      </GrnStateContext.Provider>
    );

    expect(getByText("Network")).toBeTruthy();
    expect(getByText("Layout")).toBeTruthy();
    expect(getByText("Node")).toBeTruthy();
    expect(getByText("Edge")).toBeTruthy();
    expect(getByText("View")).toBeTruthy();

    // Network source select
    const selects = getAllByTestId("select-control");
    fireEvent.click(selects[0]);
    expect(context.setDemoValue).toHaveBeenCalledWith(Object.values(DEMO_TYPES)[0]);

    // File input loop and hidden input trigger
    fireEvent.click(getByTestId("file-input-change"));
    fireEvent.click(getByText("FolderOpenIcon"));
    expect(inputClickSpy).toHaveBeenCalled();

    // Layout controls
    const sliders = getAllByRole("slider");
    fireEvent.change(sliders[0], { target: { value: "321" } });
    expect(context.setLinkDistance).toHaveBeenCalledWith("321");

    fireEvent.change(sliders[1], { target: { value: "-444" } });
    expect(context.setCharge).toHaveBeenCalledWith("-444");

    fireEvent.click(getByLabelText("Lock Force Parameters"));
    expect(context.setLockForceParameters).toHaveBeenCalledWith(true);

    // Node controls
    fireEvent.click(getByLabelText("Enable Node Coloring"));
    expect(context.setEnableNodeColoring).toHaveBeenCalledWith(true);

    fireEvent.click(selects[1]);
    expect(context.setDemoValue).toHaveBeenCalledTimes(2);

    const averageReplicateCheckboxes = getAllByLabelText("Average Replicate Values");
    fireEvent.click(averageReplicateCheckboxes[0]);
    expect(context.setAverageReplicateValuesTop).toHaveBeenCalledWith(true);

    fireEvent.click(selects[2]);
    expect(globalThis.setValue).toHaveBeenCalledWith(Object.values(DEMO_TYPES)[0]);

    fireEvent.click(averageReplicateCheckboxes[1]);
    expect(context.setAverageReplicateValuesBottom).toHaveBeenCalledWith(true);

    fireEvent.click(getByText("Set"));
    expect(context.setLogFoldChangeMax).toHaveBeenCalledWith(3);

    // Edge controls
    fireEvent.click(getByLabelText("Enable Edge Coloring"));
    expect(context.setColorOptimal).toHaveBeenCalledWith(false);

    const radioButtons = getAllByTestId("radio-group");
    fireEvent.click(radioButtons[0]);
    expect(context.setEdgeWeightVisibility).toHaveBeenCalled();

    expect(getByText("5%")).toBeTruthy();
    fireEvent.change(sliders[2], { target: { value: "25" } });
    expect(context.setGrayThreshold).toHaveBeenCalledWith(0.25);

    fireEvent.click(getByLabelText("Show Gray Edges as Dashed"));
    expect(context.setShowGrayEdgesDashed).toHaveBeenCalledWith(true);

    // View controls
    fireEvent.click(radioButtons[1]);
    expect(context.setViewSize).toHaveBeenCalledWith(VIEW_SIZE_MEDIUM);

    fireEvent.click(getByLabelText("Restrict Graph to Viewport"));
    expect(context.setAdaptive).toHaveBeenCalledWith(false);
  });
});
