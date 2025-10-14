import Navbar from "./components/Navbar";
import Graph from "./components/Graph";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
// import { GrnStateContextProvider } from './GrnstateContextProvider';
import { Grommet } from "grommet";
import "./App.css";

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
    const [demoValue, setDemoValue] = useState("Demo #1: Unweighted GRN");
    // TODO: make viewSize dynamic to user's screen size
    const [viewSize, setViewSize] = useState("Small (1104 X 648 pixels)");

    const theme = {
        global: {
            colors: {
                text: "#333",
                control: {
                    transparent: "transparent",
                },
            },
            font: {
                family: "Helvetica Neue, Helvetica, Arial, sans-serif",
                height: 1.42857143,
            },
            focus: {
                border: {
                    color: "transparent",
                },
            },
            input: {
                font: {
                    size: "14px",
                },
            },
        },
        radioButton: {
            border: {
                color: "#333",
                width: "1px",
            },
            check: {
                color: "blue",
                border: {
                    color: "blue",
                },
            },
            hover: {
                border: {
                    color: "#333",
                },
            },
            size: "13px",
        },
        rangeInput: {
            thumb: {
                color: "blue",
            },
        },
        checkBox: {
            border: {
                color: "#333",
                width: "1px",
            },
            check: {
                color: "#333",
                border: {
                    color: "#333",
                },
            },
            hover: {
                border: {
                    color: "#333",
                },
            },
            stroke: {
                color: "#333",
            },
            size: "13px",
        },
        text: {
            font: {
                family: "Helvetica Neue",
                height: 1.42857143,
            },
            small: {
                height: 1.42857143,
            },
            medium: {
                size: "14px",
                height: "20px",
            },
        },
        button: {
            active: {
                default: {
                    border: {
                        width: "0px",
                    },
                },
            },
            border: {
                width: "0px",
            },
        },
        fileInput: {
            message: {
                size: "xsmall",
            },
            border: {
                style: "solid",
                color: "light-4",
                radius: "2px",
            },
            hover: {
                background: {
                    color: "light-1",
                },
                border: {
                    style: "solid",
                    color: "light-4",
                },
            },
        },
    };

    return (
        <Grommet
            theme={theme}
            background={{ color: "white", dark: false }}
            full
        >
            {/* <GrnStateContextProvider> */}
            <Navbar
                networkMode={networkMode}
                enableNodeColoring={enableNodeColoring}
                setEnableNodeColoring={setEnableNodeColoring}
                enableEdgeColoring={enableEdgeColoring}
                setEnableEdgeColoring={setEnableEdgeColoring}
                linkDistance={linkDistance}
                setLinkDistance={setLinkDistance}
                charge={charge}
                setCharge={setCharge}
                lockForceParameters={lockForceParameters}
                setLockForceParameters={setLockForceParameters}
                averageReplicateValuesTop={averageReplicateValuesTop}
                setAverageReplicateValuesTop={setAverageReplicateValuesTop}
                averageReplicateValuesBottom={averageReplicateValuesBottom}
                setAverageReplicateValuesBottom={
                    setAverageReplicateValuesBottom
                }
                logFoldChangeMax={logFoldChangeMax}
                setLogFoldChangeMax={setLogFoldChangeMax}
                edgeWeightVisibility={edgeWeightVisibility}
                setEdgeWeightVisibility={setEdgeWeightVisibility}
                edgeWeightNormalization={edgeWeightNormalization}
                setEdgeWeightNormalization={setEdgeWeightNormalization}
                grayThreshold={grayThreshold}
                setGrayThreshold={setGrayThreshold}
                showGrayEdgesDashed={showGrayEdgesDashed}
                setShowGrayEdgesDashed={setShowGrayEdgesDashed}
                restrictGraphToViewport={restrictGraphToViewport}
                setRestrictGraphToViewport={setRestrictGraphToViewport}
                viewSize={viewSize}
                setViewSize={setViewSize}
                demoValue={demoValue}
                setDemoValue={setDemoValue}
            />
            <Sidebar
                networkMode={networkMode}
                enableNodeColoring={enableNodeColoring}
                setEnableNodeColoring={setEnableNodeColoring}
                enableEdgeColoring={enableEdgeColoring}
                setEnableEdgeColoring={setEnableEdgeColoring}
                linkDistance={linkDistance}
                setLinkDistance={setLinkDistance}
                charge={charge}
                setCharge={setCharge}
                lockForceParameters={lockForceParameters}
                setLockForceParameters={setLockForceParameters}
                averageReplicateValuesTop={averageReplicateValuesTop}
                setAverageReplicateValuesTop={setAverageReplicateValuesTop}
                averageReplicateValuesBottom={averageReplicateValuesBottom}
                setAverageReplicateValuesBottom={
                    setAverageReplicateValuesBottom
                }
                logFoldChangeMax={logFoldChangeMax}
                setLogFoldChangeMax={setLogFoldChangeMax}
                edgeWeightVisibility={edgeWeightVisibility}
                setEdgeWeightVisibility={setEdgeWeightVisibility}
                edgeWeightNormalization={edgeWeightNormalization}
                setEdgeWeightNormalization={setEdgeWeightNormalization}
                grayThreshold={grayThreshold}
                setGrayThreshold={setGrayThreshold}
                showGrayEdgesDashed={showGrayEdgesDashed}
                setShowGrayEdgesDashed={setShowGrayEdgesDashed}
                restrictGraphToViewport={restrictGraphToViewport}
                setRestrictGraphToViewport={setRestrictGraphToViewport}
                viewSize={viewSize}
                setViewSize={setViewSize}
                demoValue={demoValue}
                setDemoValue={setDemoValue}
            />
            <Graph />
            {/* </GrnStateContextProvider> */}
        </Grommet>
    );
}

export default App;
