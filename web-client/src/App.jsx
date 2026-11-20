import { useState, createContext, useEffect } from "react";
import { Grommet, Collapsible, Button } from "grommet";
import { LinkNext } from "grommet-icons";
import Navbar from "./components/Navbar";
import Graph from "./components/Graph";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { theme } from "./helpers/theme";
import { ZOOM_DISPLAY_MIDDLE, MIN_EDGE_WEIGHT_NORMALIZATION, MAX_EDGE_WEIGHT_NORMALIZATION } from "./helpers/constants";
import { initialViewportSize } from "./helpers/viewportHelpers";
import "./App.css";

// Create a context for the GRN state
export const GrnStateContext = createContext();

function App() {
  const [open, setOpen] = useState(true);
  // State variables for GRN settings
  const [networkMode, setNetworkMode] = useState("No Network Selected");
  const [enableNodeColoring, setEnableNodeColoring] = useState(false);
  const [colorOptimal, setColorOptimal] = useState(true);
  const [linkDistance, setLinkDistance] = useState(500);
  const [charge, setCharge] = useState(-50);
  const [lockForceParameters, setLockForceParameters] = useState(false);
  const [averageReplicateValuesTop, setAverageReplicateValuesTop] = useState(false);
  const [averageReplicateValuesBottom, setAverageReplicateValuesBottom] = useState(false);
  const [logFoldChangeMax, setLogFoldChangeMax] = useState(3);
  const [edgeWeightVisibility, setEdgeWeightVisibility] = useState("Show With Mouse Over");
  const [grayThreshold, setGrayThreshold] = useState(0.05);
  const [showGrayEdgesDashed, setShowGrayEdgesDashed] = useState(false);
  const [demoValue, setDemoValue] = useState(null);
  const [viewSize, setViewSize] = useState(null);
  const [adaptive, setAdaptive] = useState(true);
  const [networkData, setNetworkData] = useState(null);
  const [zoomPercent, setZoomPercent] = useState(ZOOM_DISPLAY_MIDDLE);
  const [sheetType, setSheetType] = useState(null);
  const isWeighted = sheetType === "weighted";
  const [edgeWeightNormalization, setEdgeWeightNormalization] = useState("");
  const [defaultEdgeWeightNormalization, setDefaultEdgeWeightNormalization] = useState("");

  const applyEdgeWeightNormalization = rawValue => {
  const n = Number(rawValue);
  const next =
    String(rawValue).trim() === "" || Number.isNaN(n)
      ? defaultEdgeWeightNormalization
      : Math.min(MAX_EDGE_WEIGHT_NORMALIZATION, Math.max(MIN_EDGE_WEIGHT_NORMALIZATION, n));
  setEdgeWeightNormalization(next);
  return next;
};

  const resetEdgeWeightNormalization = () => {
    setEdgeWeightNormalization(defaultEdgeWeightNormalization);
    return defaultEdgeWeightNormalization;
  };

  // All state and setters bundled into a single value for context
  const grnState = {
    demoValue,
    setDemoValue,
    viewSize,
    setViewSize,
    adaptive,
    setAdaptive,
    networkMode,
    setNetworkMode,
    enableNodeColoring,
    setEnableNodeColoring,
    colorOptimal,
    setColorOptimal,
    linkDistance,
    setLinkDistance,
    charge,
    setCharge,
    lockForceParameters,
    setLockForceParameters,
    averageReplicateValuesTop,
    setAverageReplicateValuesTop,
    averageReplicateValuesBottom,
    setAverageReplicateValuesBottom,
    logFoldChangeMax,
    setLogFoldChangeMax,
    edgeWeightVisibility,
    setEdgeWeightVisibility,
    edgeWeightNormalization,
    setEdgeWeightNormalization,
    grayThreshold,
    setGrayThreshold,
    showGrayEdgesDashed,
    setShowGrayEdgesDashed,
    networkData,
    setNetworkData,
    zoomPercent,
    setZoomPercent,
    sheetType,
    setSheetType,
    isWeighted,
    defaultEdgeWeightNormalization,
    setDefaultEdgeWeightNormalization,
    applyEdgeWeightNormalization,
    resetEdgeWeightNormalization,
  };

  useEffect(() => {
    const initialSize = initialViewportSize(window.innerWidth);
    setViewSize(initialSize);
  }, []);

  return (
    <GrnStateContext.Provider value={grnState}>
      <Grommet theme={theme} background={{ color: "white", dark: false }} full>
        <Header />
        <Navbar />
        <div id="sidebar-graph-container">
          <div id="sidebar-container">
            <Button
              id="sidebar-toggle"
              className={open ? "" : "collapsed"}
              onClick={() => setOpen(!open)}
            >
              {open ? "Hide Panels" : <LinkNext size="14px" />}
            </Button>
            <Collapsible direction="horizontal" open={open}>
              <Sidebar />
            </Collapsible>
          </div>
          <Graph />
        </div>
      </Grommet>
    </GrnStateContext.Provider>
  );
}

export default App;
