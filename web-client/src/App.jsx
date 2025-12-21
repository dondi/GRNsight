import Navbar from "./components/Navbar";
import Graph from "./components/Graph";
import Sidebar from "./components/Sidebar";
import { useState, createContext } from "react";
import { Grommet } from "grommet";
import { theme } from "./theme";
import "./App.css";

// Create a context for the GRN state
export const GrnStateContext = createContext();

function App() {
    const [networkMode, setNetworkMode] = useState(
        "Protein-Protein Interaction"
    );
    const [enableNodeColoring, setEnableNodeColoring] = useState(false);
    const [enableEdgeColoring, setEnableEdgeColoring] = useState(false);
    const [linkDistance, setLinkDistance] = useState(500);
    const [charge, setCharge] = useState(-50);
    const [lockForceParameters, setLockForceParameters] = useState(false);
    const [averageReplicateValuesTop, setAverageReplicateValuesTop] =
        useState(false);
    const [averageReplicateValuesBottom, setAverageReplicateValuesBottom] =
        useState(false);
    const [logFoldChangeMax, setLogFoldChangeMax] = useState(3);
    const [edgeWeightVisibility, setEdgeWeightVisibility] = useState(
        "Show With Mouse Over"
    );
    const [edgeWeightNormalization, setEdgeWeightNormalization] =
        useState(2.971);
    const [grayThreshold, setGrayThreshold] = useState(5);
    const [showGrayEdgesDashed, setShowGrayEdgesDashed] = useState(false);
    const [restrictGraphToViewport, setRestrictGraphToViewport] =
        useState(false);
    const [demoValue, setDemoValue] = useState(null);
    // TODO: make viewSize dynamic to user's screen size
    const [viewSize, setViewSize] = useState("Small (1104 X 648 pixels)");
    const [adaptive, setAdaptive] = useState(true);

  // Add state for network data
  const [networkData, setNetworkData] = useState(null);

  // All state and setters bundled into a single value for context
  const grnStateValue = {
    networkMode,
    setNetworkMode,
    enableNodeColoring,
    setEnableNodeColoring,
    enableEdgeColoring,
    setEnableEdgeColoring,
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
    demoValue,
    setDemoValue,
    networkData,
    setNetworkData,
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
