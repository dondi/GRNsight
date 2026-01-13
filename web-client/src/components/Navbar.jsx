import { useContext } from "react";
import { Nav, DropButton, Box, Text, Button, Tip, TextInput } from "grommet";
import { Refresh, Checkmark, FolderOpen, Edge } from "grommet-icons";
import { GrnStateContext } from "../App";
import {
  UNWEIGHTED_DEMO_NAME,
  WEIGHTED_DEMO_NAME,
  SCHADE_INPUT_NAME,
  SCHADE_OUTPUT_NAME,
  PPI_DEMO_NAME,
} from "../constants";
import "../App.css";

export default function Navbar({}) {
  const {
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
    demoValue,
    setDemoValue,
    viewSize,
    setViewSize,
  } = useContext(GrnStateContext);

  return (
    // TODO: need to make sure that sizing of elements is okay and consistent because right now proportions look right at 50% view
    // TODO: need to set max-width of nav? or maybe it's okay for now
    <Nav
      className="navbar"
      direction="row"
      flex="false"
      background="#dfebe5"
      pad={{ left: "30px", right: "15px" }}
      margin={{ bottom: "10px" }}
      gap="none"
    >
      <DropButton
        label="Network"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        onOpen={() => {
          console.log("dropButton opened");
        }}
        dropContent={
          <Box
            className="dropdown-menu"
            pad={{ vertical: "5px" }}
            background="white"
            width="medium"
          >
            <Text weight="bold" margin={{ left: "12px" }}>
              Network Source
            </Text>
            {/* TODO: maybe instead do a collapsible instead of a tip */}
            {/* TODO: something with pad or margin here is not working since content in tip displaying with wrong position */}
            <Box pad={{ top: "7px", bottom: "5px", left: "30px" }} align="start">
              <Tip
                plain
                dropProps={{
                  align: { left: "right", top: "top" }, // attach menu to the right side
                  plain: true,
                }}
                content={
                  <Box
                    className="dropdown-menu"
                    pad="small"
                    background="white"
                    fill="true"
                    align="start"
                  >
                    <Button
                      plain
                      label="Demo #1: Unweighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)"
                      onClick={() => {}}
                    />
                    <Button
                      plain
                      label="Demo #2: Weighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)"
                      onClick={() => {}}
                    />
                    <Button
                      plain
                      label="Demo #3: Unweighted GRN (21 genes, 31 edges)"
                      onClick={() => {}}
                    />
                    <Button
                      plain
                      label="Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)"
                      onClick={() => {}}
                    />
                    <Button plain label="Demo #5: PPI (18 proteins, 81 edges)" onClick={() => {}} />
                  </Box>
                }
              >
                <Button plain className="demo-button" label="Demo" fill="horizontal" />
              </Tip>
            </Box>
            <Box
              width="95%"
              alignSelf="center"
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            <Box>
              <Button margin={{ left: "32px", top: "7px", bottom: "5px" }}>
                <FolderOpen className="folder-icon" size="14px" />
                <Text>Open File...</Text> <Text className="italics">(.xlsx, .sif, .graphml)</Text>
              </Button>
            </Box>
            <Box
              width="95%"
              alignSelf="center"
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            <Box>
              <Button margin={{ top: "7px", right: "20px", left: "30px" }}>
                <Text>Load from Database...</Text>
              </Button>
            </Box>
            <Box
              margin={{ vertical: "9px" }}
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            <Box>
              <Button margin={{ left: "20px" }} justify="between">
                <Refresh />
                <Text>Reload</Text>
              </Button>
            </Box>
            <Box
              margin={{ vertical: "9px" }}
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            <Text weight="bold" margin={{ left: "12px" }}>
              Network Mode
            </Text>
            {/* TODO: only display checkmark if selected view */}
            {/* TODO: need to display text in gray when disabled */}
            {/* TODO: confirm that networkMode changes when graph updates */}
            <Box margin={{ left: "50px" }}>
              <Text color="#999">{networkMode}</Text>
            </Box>
            <Text weight="bold" margin={{ left: "12px" }}>
              Species
            </Text>
            <Box direction="row" margin={{ left: "50px" }}>
              <Text color="#999">Saccharomyces cerevisiae</Text>
            </Box>
          </Box>
        }
      />

      <DropButton
        label="Layout"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <Box
            className="dropdown-menu"
            direction="column"
            pad={{ vertical: "5px" }}
            background="white"
            width="medium"
          >
            <Box pad={{ left: "12px" }}>
              <Text>Graph Options</Text>
            </Box>
            {/* TODO: maybe instead do a collapsible instead of a tip */}
            <Box pad={{ horizontal: "40px", vertical: "3px" }}>
              <Button>
                <Text>Force Graph</Text>
              </Button>
            </Box>
            <Box pad={{ horizontal: "40px", vertical: "3px" }}>
              <Button>
                <Text>Grid Layout</Text>
              </Button>
            </Box>
            <Box
              margin={{ vertical: "9px" }}
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            <Box pad={{ horizontal: "40px", vertical: "3px" }}>
              <Button onClick={() => setLockForceParameters(!lockForceParameters)}>
                {lockForceParameters && <Checkmark />}
                <Text>Lock Force Graph Parameters</Text>
              </Button>
            </Box>
            <Box pad={{ horizontal: "40px", vertical: "3px" }}>
              <Button>
                <Text>Reset Force Graph Parameters</Text>
              </Button>
            </Box>
            <Box pad={{ horizontal: "40px", vertical: "3px" }}>
              <Button>
                <Text>Undo Reset</Text>
              </Button>
            </Box>
            <Box
              margin={{ vertical: "9px" }}
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            {/* TODO: restrict size of text input and restrict to number values only */}
            <Box margin={{ horizontal: "40px", vertical: "3px" }} direction="row">
              <Text>Link Distance (1 - 1000)</Text>{" "}
              <TextInput
                value={linkDistance}
                onChange={event => setLinkDistance(event.target.value)}
              />
            </Box>
            <Box margin={{ horizontal: "40px", vertical: "3px" }} direction="row">
              <Text>Charge (-2000 - 0)</Text>{" "}
              <TextInput value={charge} onChange={event => setCharge(event.target.value)} />
            </Box>
          </Box>
        }
      />

      <DropButton
        label="Node"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <Box>
            {enableNodeColoring ? (
              <Box
                className="dropdown-menu"
                direction="column"
                pad={{ vertical: "5px" }}
                background="white"
                width="medium"
              >
                {/* <Box> */}
                <Box pad={{ horizontal: "20px", vertical: "3px" }}>
                  <Button onClick={() => setEnableNodeColoring(false)}>
                    <Checkmark size="small" />
                    <Text margin={{ left: "12px" }}>Enable Node Coloring</Text>
                  </Button>
                </Box>
                <Box
                  margin={{ vertical: "9px" }}
                  border={{
                    color: "#bbb",
                    side: "top",
                    style: "dotted",
                    size: "1px",
                  }}
                ></Box>
                {/* TODO: maybe instead do a collapsible instead of a tip */}
                <Box pad={{ horizontal: "45px", vertical: "3px" }}>
                  <Button>
                    <Text>Select Top Dataset</Text>
                  </Button>
                </Box>
                <Box pad={{ horizontal: "20px", vertical: "3px" }}>
                  <Button>
                    <Checkmark size="small" />
                    {averageReplicateValuesTop && <Checkmark />}
                    <Text margin={{ left: "12px" }}>Average Replicate Values for Top Datset</Text>
                  </Button>
                </Box>
                <Box
                  margin={{ vertical: "9px" }}
                  border={{
                    color: "#bbb",
                    side: "top",
                    style: "dotted",
                    size: "1px",
                  }}
                ></Box>
                <Box pad={{ horizontal: "45px", vertical: "3px" }}>
                  <Button>
                    <Text>Select Bottom Dataset</Text>
                  </Button>
                </Box>
                <Box pad={{ horizontal: "20px", vertical: "3px" }}>
                  <Button>
                    <Checkmark size="small" />
                    {averageReplicateValuesBottom && <Checkmark />}
                    <Text margin={{ left: "12px" }}>
                      Average Replicate Values for Bottom Datset
                    </Text>
                  </Button>
                </Box>
                <Box
                  margin={{ vertical: "9px" }}
                  border={{
                    color: "#bbb",
                    side: "top",
                    style: "dotted",
                    size: "1px",
                  }}
                ></Box>
                {/* TODO: restrict size of text input and restrict to number values only */}
                <Box margin={{ horizontal: "20px", vertical: "3px" }} direction="row">
                  <Text>Log Fold Change Max Value (0.01 - 100)</Text> <TextInput />
                </Box>
              </Box>
            ) : (
              <Box
                className="dropdown-menu"
                direction="column"
                pad={{ vertical: "5px" }}
                background="white"
                width="medium"
              >
                <Box pad={{ horizontal: "20px", vertical: "3px" }}>
                  <Button onClick={() => setEnableNodeColoring(true)}>
                    <Text margin={{ left: "12px" }}>Enable Node Coloring</Text>
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        }
      />

      <DropButton
        label="Edge"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <Box
            className="dropdown-menu"
            direction="column"
            pad={{ vertical: "5px" }}
            background="white"
            width="medium"
          >
            <Box pad={{ horizontal: "20px", vertical: "3px" }}>
              <Button onClick={() => setColorOptimal(!colorOptimal)}>
                {colorOptimal && <Checkmark size="small" />}
                <Text margin={{ left: "12px" }}>Enable Edge Coloring Based on Weight Values</Text>
              </Button>
            </Box>
            <Box
              margin={{ vertical: "9px" }}
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            <Box pad={{ horizontal: "20px", vertical: "3px" }}>
              <Button pad={{ horizontal: "20px", vertical: "3px" }}>
                <Text>Only Show Edge Weights With Mouse Over</Text>
              </Button>
            </Box>
            <Box pad={{ horizontal: "20px", vertical: "3px" }}>
              <Button pad={{ horizontal: "20px", vertical: "3px" }}>
                <Text>Always Show Edge Weights</Text>
              </Button>
            </Box>
            <Box pad={{ horizontal: "20px", vertical: "3px" }}>
              <Button pad={{ horizontal: "20px", vertical: "3px" }}>
                <Text>Never Show Edge Weights</Text>
              </Button>
            </Box>
            <Box
              margin={{ vertical: "9px" }}
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            <Box margin={{ horizontal: "20px", vertical: "3px" }} direction="row">
              <Text>Edge Weight Normalization Factor (0.0001 - 1000)</Text>{" "}
              <TextInput
                value={edgeWeightNormalization}
                onChange={event => setEdgeWeightNormalization(event.target.value)}
              />
            </Box>
            <Box pad={{ horizontal: "20px", vertical: "3px" }}>
              <Button pad={{ horizontal: "20px", vertical: "3px" }}>
                <Text>Reset Edge Weight Normalization Factor</Text>
              </Button>
            </Box>
            <Box
              margin={{ vertical: "9px" }}
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            {/* TODO: restrict size of text input and restrict to number values only */}
            <Box margin={{ horizontal: "20px", vertical: "3px" }} direction="row">
              <Text>Gray Edge Threshold (0 - 100%)</Text>{" "}
              <TextInput
                value={(grayThreshold * 100).toFixed()}
                onChange={event => setGrayThreshold(event.target.value / 100)}
              />
            </Box>
            <Box pad={{ horizontal: "20px", vertical: "3px" }}>
              <Button pad={{ horizontal: "20px", vertical: "3px" }}>
                <Text>Show Gray Edges as Dashed</Text>
              </Button>
            </Box>
          </Box>
        }
      />

      <DropButton
        label="View"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <Box
            className="dropdown-menu"
            direction="column"
            pad={{ vertical: "5px" }}
            background="white"
            width="medium"
          >
            <Text margin={{ left: "small" }}>Viewport Size</Text>
            {/* only display the checkmark for the selected view size */}
            <Button
              margin={{ horizontal: "20px", top: "3px" }}
              onClick={() => setViewSize("Small (1104 X 648 pixels)")}
            >
              <Checkmark />
              <Text>Small</Text>
            </Button>
            <Button
              margin={{ horizontal: "20px", top: "3px" }}
              onClick={() => setViewSize("Medium (1414 X 768 pixels)")}
            >
              <Checkmark />
              <Text>Medium</Text>
            </Button>
            <Button
              margin={{ horizontal: "20px", top: "3px" }}
              onClick={() => setViewSize("Large (1920 X 1080 pixels)")}
            >
              <Checkmark />
              <Text>Large</Text>
            </Button>
            <Button
              margin={{ horizontal: "20px", top: "3px" }}
              onClick={() => setViewSize("Fit To Window")}
            >
              <Checkmark />
              <Text>Fit To Window</Text>
            </Button>
            <Box
              margin={{ vertical: "9px" }}
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>

            <Button
              margin={{ horizontal: "20px", top: "3px" }}
              onClick={() => setRestrictGraphToViewport(!restrictGraphToViewport)}
            >
              <Text>Restrict Graph to Viewport</Text>
            </Button>

            <Box
              margin={{ vertical: "9px" }}
              border={{
                color: "#bbb",
                side: "top",
                style: "dotted",
                size: "1px",
              }}
            ></Box>
            <Box margin={{ horizontal: "20px", vertical: "3px" }} direction="row">
              <Text>Zoom (25 - 200%)</Text> <TextInput />
            </Box>
          </Box>
        }
      />

      <DropButton
        label="Export"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <Box
            className="dropdown-menu"
            direction="column"
            pad={{ vertical: "5px" }}
            background="white"
            width="medium"
          >
            <Button margin={{ horizontal: "20px", top: "3px" }}>
              <Checkmark />
              <Text>Export Data</Text>
            </Button>
            <Button margin={{ horizontal: "20px", top: "3px" }}>
              <Text>Export Image</Text>
            </Button>
            <Button margin={{ horizontal: "20px", top: "3px" }}>
              <Text>Print</Text>
            </Button>
          </Box>
        }
      />

      <DropButton
        className="nav-button"
        label="Help"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <Box
            className="dropdown-menu"
            direction="column"
            pad={{ vertical: "5px" }}
            background="white"
            width="medium"
          >
            <Button margin={{ horizontal: "20px", top: "3px" }}>
              <Text>Getting Started</Text>
            </Button>
            <Button margin={{ horizontal: "20px", top: "3px" }}>
              <Text>GRNsight Wiki</Text>
            </Button>
            <Button margin={{ horizontal: "20px", top: "3px" }}>
              <Text>About GRNsight</Text>
            </Button>
          </Box>
        }
      />

      <DropButton
        className="nav-button"
        label="Demo"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <Box pad="small" className="dropdown-menu" background="white">
            <Button label="Demo #1: Unweighted GRN" onClick={() => {}} />
            <Button label="Demo #2: Weighted GRN" onClick={() => {}} />
            <Button label="Demo #3: Unweighted GRN" onClick={() => {}} />
            <Button label="Demo #4: Weighted GRN" onClick={() => {}} />
            <Button label="Demo #5: PPI" onClick={() => {}} />
          </Box>
        }
      />
    </Nav>
  );
}
