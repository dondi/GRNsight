import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { calcMaxWeight } from "../src/helpers/graphHelpers";
import Navbar from "../src/components/Navbar";
import { GrnStateContext } from "../src/App";
import {
  NETWORK_GRN_MODE_FULL,
  ZOOM_DISPLAY_MIDDLE,
  VIEW_SIZE_SMALL,
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
      <button type="button" onClick={() => onChange({ option: toArray(options)[0] })}>
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
  networkMode: NETWORK_GRN_MODE_FULL,
  setNetworkMode: () => {},
  enableNodeColoring: false,
  setEnableNodeColoring: () => {},
  colorOptimal: true,
  setColorOptimal: () => {},
  linkDistance: 500,
  setLinkDistance: () => {},
  charge: -50,
  setCharge: () => {},
  lockForceParameters: false,
  setLockForceParameters: () => {},
  averageReplicateValuesTop: false,
  setAverageReplicateValuesTop: () => {},
  averageReplicateValuesBottom: false,
  setAverageReplicateValuesBottom: () => {},
  logFoldChangeMax: 3,
  setLogFoldChangeMax: () => {},
  edgeWeightVisibility: "Show With Mouse Over",
  setEdgeWeightVisibility: () => {},
  edgeWeightNormalization: 2.971,
  setEdgeWeightNormalization: () => {},
  grayThreshold: 0.05,
  setGrayThreshold: () => {},
  showGrayEdgesDashed: false,
  setShowGrayEdgesDashed: () => {},
  demoValue: null,
  setDemoValue: () => {},
  viewSize: VIEW_SIZE_SMALL,
  setViewSize: () => {},
  zoomPercent: ZOOM_DISPLAY_MIDDLE,
  setZoomPercent: () => {},
  adaptive: true,
  setAdaptive: () => {},
  ...overrides,
});

describe("GrnStateContext shares data across components", () => {
  it("computes reset-normalization max equivalent from positive/negative weights", () => {
    const allWeightsFirst = [
      0.7715106466403678, 5.212343052095555, 0.826365326790911, 1.5180198066137216,
      0.27964603867183396, 2.9870960868914778, 0.7743557796125339, 0.6701684007311992,
      0.22069064019031245, 0.2841810246722045, 0.08852330457981578, 0.5563132195423768,
      -1.1672013354497313, -2.4438462486461163, -1.485274408559026, -0.7371671668856121,
      -2.9527940988546217, -3.3875125167057103, -0.0735729607899455, -0.12373154839822605,
      -0.5487650216350863, -0.442904423529279, -0.8662459811465724, -2.850006860838391,
      -1.5733259134754158, -0.02279063304065471, -1.9832439149172112, -0.25954746744906587,
    ];

    const allWeightsSecond = [1, 2, 3, 4, 5, 6, 7, 8, -1, -2, -3, -4, -5, -6, -7, -8];

    expect(calcMaxWeight(allWeightsFirst)).toBe(5.212343052095555);
    expect(calcMaxWeight(allWeightsSecond)).toBe(8);
  });

  it("renders species equivalent in React UI", () => {
    render(
      <GrnStateContext.Provider value={buildContext()}>
        <Navbar />
      </GrnStateContext.Provider>
    );

    expect(screen.getByText("Saccharomyces cerevisiae")).toBeInTheDocument();
  });
});
