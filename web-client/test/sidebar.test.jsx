import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Sidebar from "../src/components/Sidebar";
import { GrnStateContext } from "../src/App";
import { DEMO_TYPES, VIEW_SIZE_SMALL, VIEW_SIZE_MEDIUM } from "../src/helpers/constants";
import { getNetworkMode, uploadWorkbook } from "../src/services/api";
import {
  annotateWorkbookLinks,
  extractWorkbookErrorMessage,
  returnUploadRoute,
  trackUploadAnalytics,
  validateUploadFile,
} from "../src/services/upload";

vi.mock("../src/services/api", () => ({
  getNetworkMode: vi.fn(),
  uploadWorkbook: vi.fn(),
}));

vi.mock("../src/services/upload", () => ({
  annotateWorkbookLinks: vi.fn(),
  extractWorkbookErrorMessage: vi.fn(),
  returnUploadRoute: vi.fn(),
  trackUploadAnalytics: vi.fn(),
  validateUploadFile: vi.fn(),
}));

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
  setNetworkData: vi.fn(),
  demoValue: null,
  setDemoValue: vi.fn(),
  viewSize: VIEW_SIZE_SMALL,
  setViewSize: vi.fn(),
  adaptive: true,
  setAdaptive: vi.fn(),
  ...overrides,
});

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.setValue = vi.fn();
    validateUploadFile.mockReturnValue(null);
    returnUploadRoute.mockReturnValue("upload");
    uploadWorkbook.mockResolvedValue({
      meta: { data: { workbookType: "grn" } },
      positiveWeights: [1],
      negativeWeights: [-1],
    });
    annotateWorkbookLinks.mockImplementation(workbook => workbook);
    getNetworkMode.mockReturnValue("Gene Regulatory Network");
    extractWorkbookErrorMessage.mockReturnValue("upload failed");
  });

  afterEach(() => {
    delete globalThis.setValue;
  });

  it("covers network, layout, node, edge, and view interactions", () => {
    const context = buildContext();

    const {
      container,
      getAllByTestId,
      getByText,
      getByLabelText,
      getAllByRole,
      getAllByLabelText,
    } = render(
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

    // File input change using hidden native input in the upload label
    const fileInput = container.querySelector("#sidebar-file-upload");
    expect(fileInput).toBeTruthy();
    fireEvent.change(fileInput, { target: { files: [{ name: "a.tsv", size: 123 }] } });

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

  it("covers upload success path and inner getNetworkMode catch", async () => {
    const context = buildContext();
    const normalizedWorkbook = {
      meta: { data: { workbookType: "grn" } },
      workbookType: "grn",
      positiveWeights: [1],
      negativeWeights: [-1],
    };

    returnUploadRoute.mockReturnValue("upload-graphml");
    uploadWorkbook.mockResolvedValue({ meta: { data: {} } });
    annotateWorkbookLinks.mockReturnValue(normalizedWorkbook);
    getNetworkMode.mockImplementation(() => {
      throw new Error("unknown workbook type");
    });

    const { container } = render(
      <GrnStateContext.Provider value={context}>
        <Sidebar />
      </GrnStateContext.Provider>
    );

    const fileInput = container.querySelector("#sidebar-file-upload");
    fireEvent.change(fileInput, {
      target: { files: [{ name: "graph.graphml", size: 123 }] },
    });

    await waitFor(() => {
      expect(uploadWorkbook).toHaveBeenCalledWith(expect.any(Object), "upload-graphml");
      expect(annotateWorkbookLinks).toHaveBeenCalled();
      expect(context.setDemoValue).toHaveBeenCalledWith(null);
      expect(context.setNetworkData).toHaveBeenCalledWith(normalizedWorkbook);
      expect(trackUploadAnalytics).toHaveBeenCalled();
      expect(fileInput.value).toBe("");
    });
  });

  it("covers upload error path and displays extracted message", async () => {
    const context = buildContext();
    const uploadError = new Error("request failed");
    uploadError.data = { errors: [{ possibleCause: "bad", suggestedFix: "retry" }] };
    uploadWorkbook.mockRejectedValue(uploadError);
    extractWorkbookErrorMessage.mockReturnValue("Your graph failed to load");

    const { container } = render(
      <GrnStateContext.Provider value={context}>
        <Sidebar />
      </GrnStateContext.Provider>
    );

    const fileInput = container.querySelector("#sidebar-file-upload");
    fireEvent.change(fileInput, {
      target: { files: [{ name: "graph.xlsx", size: 123 }] },
    });

    await waitFor(() => {
      expect(extractWorkbookErrorMessage).toHaveBeenCalled();
      expect(fileInput.value).toBe("");
    });
  });
});
