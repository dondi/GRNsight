import Navbar from "./components/Navbar";
import Graph from "./components/Graph";
import Sidebar from "./components/Sidebar";
import { useState, createContext } from "react";
import { Grommet } from "grommet";
import { theme } from "./theme";
import "./App.css";
import { ZOOM_DISPLAY_MIDDLE } from "./constants";

// Create a context for the GRN state
export const GrnStateContext = createContext();

function App() {
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
  const [edgeWeightNormalization, setEdgeWeightNormalization] = useState(2.971);
  const [grayThreshold, setGrayThreshold] = useState(0.05);
  const [showGrayEdgesDashed, setShowGrayEdgesDashed] = useState(false);
  const [restrictGraphToViewport, setRestrictGraphToViewport] = useState(false);
  const [demoValue, setDemoValue] = useState(null);
  // TODO: make viewSize dynamic to user's screen size
  const [viewSize, setViewSize] = useState("Small (1104 X 648 pixels)");
  const [adaptive, setAdaptive] = useState(true);
  const [networkData, setNetworkData] = useState(null);
  const [zoomPercent, setZoomPercent] = useState(ZOOM_DISPLAY_MIDDLE);
  // All state and setters bundled into a single value for context
  const grnStateValue = {
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
    restrictGraphToViewport,
    setRestrictGraphToViewport,
    viewSize,
    setViewSize,
    adaptive,
    setAdaptive,
    demoValue,
    setDemoValue,
    networkData,
    setNetworkData,
    zoomPercent,
    setZoomPercent,
  };

  return (
    <GrnStateContext.Provider value={grnStateValue}>
      <Grommet theme={theme} background={{ color: "white", dark: false }} full>
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <Graph />
        </div>
      </Grommet>
    </GrnStateContext.Provider>
  );
}

export default App;
