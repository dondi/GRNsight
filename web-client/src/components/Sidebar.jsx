import { useRef, useContext } from "react";
import {
  Box,
  Text,
  Button,
  Select,
  FileInput,
  Stack,
  RangeInput,
  CheckBox,
  TextInput,
  RadioButtonGroup,
} from "grommet";
import { Refresh, FolderOpen, Database } from "grommet-icons";
import { GrnStateContext } from "../App";
import {
  UNWEIGHTED_DEMO_NAME,
  WEIGHTED_DEMO_NAME,
  SCHADE_INPUT_NAME,
  SCHADE_OUTPUT_NAME,
  PPI_DEMO_NAME,
} from "../constants";
import "../App.css";

export default function Sidebar({}) {
  const fileInputRef = useRef();
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
    <Box className="sidebar">
      {/* Disclaimer */}
      <Box className="panel">
        <Box margin="10px">
          <Text size="18px" weight="bold">
            Disclaimer
          </Text>
        </Box>
        <Box pad={{ right: "10px", left: "10px", bottom: "10px" }}>
          <Text size="12px">
            This version of GRNsight is currently in development and unstable. Please refer to the
            Home page for more reliable performance.
          </Text>
        </Box>
      </Box>
      {/* Network */}
      <Box plain className="panel" margin={{ top: "5px" }}>
        <Box margin="10px">
          <Text size="18px" weight="bold">
            Network
          </Text>
        </Box>
        <Box pad={{ right: "10px", left: "10px", bottom: "10px" }}>
          <Box className="panel-dropdown-container">
            <Text weight="bold" size="small" height={1.42857143}>
              Network Source
            </Text>
            <Box className="network-source-section" fill={false}>
              <Box margin="5px" fill={false}>
                <Text weight="bold" size="13px">
                  Demo
                </Text>
              </Box>
              <Select
                className="demo-source-dropdown"
                pad="0px"
                options={[
                  <Text>{UNWEIGHTED_DEMO_NAME}</Text>,
                  <Text>{WEIGHTED_DEMO_NAME}</Text>,
                  <Text>{SCHADE_INPUT_NAME}</Text>,
                  <Text>{SCHADE_OUTPUT_NAME}</Text>,
                  <Text>{PPI_DEMO_NAME}</Text>,
                ]}
                value={demoValue}
                placeholder={<Text>Select a Demo</Text>}
                onChange={({ option }) => setDemoValue(option)}
                size="small"
              />
              {/* TODO: remove browse message */}
              <Stack anchor="center" margin={{ vertical: "6px" }}>
                {/* Do a border radius, access the div that contains this FileInput */}
                <FileInput
                  className="file-input"
                  ref={fileInputRef}
                  name="file"
                  size="small"
                  messages={{ browse: " ", dropPrompt: "Open File" }}
                  onChange={event => {
                    const fileList = event.target.files;
                    for (let i = 0; i < fileList.length; i += 1) {
                      const file = fileList[i];
                    }
                  }}
                />
                <Box
                  direction="row"
                  align="center"
                  gap="small"
                  pad="medium"
                  onClick={() => fileInputRef.current.click()} // Trigger the hidden file input
                >
                  <FolderOpen />
                </Box>
              </Stack>
              <Button className="load-from-database">
                <Box pad={{ vertical: "6px", horizontal: "12px" }} direction="row" gap="4px">
                  <Database size="14px" />
                  <Text size="14px">Load from Database</Text>
                </Box>
              </Button>
            </Box>
          </Box>
          <Box
            margin={{ vertical: "9px" }}
            width="95%"
            alignSelf="center"
            border={{
              color: "#bbb",
              side: "top",
              style: "dotted",
              size: "1px",
            }}
          ></Box>
          <Button margin={{ left: "small" }} justify="between">
            <Refresh />
            <Text>Reload</Text>
          </Button>
          <Box
            margin={{ vertical: "9px" }}
            width="95%"
            alignSelf="center"
            border={{
              color: "#bbb",
              side: "top",
              style: "dotted",
              size: "1px",
            }}
          ></Box>
          <Text weight="bold" size="13px">
            Network Mode:
          </Text>
          <Box margin={{ bottom: "5px" }}>
            <Text className="italics" weight="bold" size="12px">
              {networkMode}
            </Text>
          </Box>
          <Text weight="bold" size="13px">
            Species:
          </Text>
          <Box direction="row">
            <Text className="italics" weight="bold" size="12px">
              Saccharomyces cerevisiae
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Layout */}
      <Box className="panel" margin={{ top: "5px" }}>
        <Box margin="10px">
          <Text size="18px" weight="bold">
            Layout
          </Text>
        </Box>
        <Box pad={{ right: "10px", left: "10px", bottom: "10px" }}>
          <Box className="panel-dropdown-container" direction="row" gap="5px">
            <Button>
              <Box pad={{ vertical: "6px", horizontal: "10px" }} direction="row" gap="4px">
                <Text size="14px">Force Graph</Text>
              </Box>
            </Button>
            <Button>
              <Box pad={{ vertical: "6px", horizontal: "10px" }} direction="row" gap="4px">
                <Text size="14px">Grid Layout</Text>
              </Box>
            </Button>
          </Box>
          <Box margin={{ top: "10px" }} gap="10px">
            <Box direction="column" gap="0px">
              <Text weight="bold" size="xsmall">
                Link Distance (1-1000): {linkDistance}
              </Text>
              <RangeInput
                color="blue"
                value={linkDistance}
                onChange={event => setLinkDistance(event.target.value)}
                min={1}
                max={1000}
              />
            </Box>
            <Box direction="column" gap="0px">
              <Text weight="bold" size="xsmall">
                Charge (-2000-0): {charge}
              </Text>
              <RangeInput
                color="blue"
                value={charge}
                onChange={event => setCharge(event.target.value)}
                min={-2000}
                max={0}
              />
            </Box>
          </Box>
          <CheckBox
            checked={lockForceParameters}
            label={<Text>Lock Force Parameters</Text>}
            onChange={event => setLockForceParameters(event.target.checked)}
          />
          <Box className="panel-dropdown-container" gap="5px" margin={{ top: "10px" }}>
            <Button>
              <Box pad={{ vertical: "6px", horizontal: "10px" }} alignContent="center">
                <Text size="14px">Reset Force Parameters</Text>
              </Box>
            </Button>
            <Button>
              <Box pad={{ vertical: "6px", horizontal: "10px" }} alignContent="center">
                <Text size="14px">Undo Reset</Text>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Node */}
      <Box className="panel" margin={{ top: "5px" }}>
        <Box margin="10px">
          <Text size="18px" weight="bold">
            Node
          </Text>
        </Box>
        <Box pad={{ right: "10px", left: "10px", bottom: "10px" }} gap="5px">
          <CheckBox
            checked={enableNodeColoring}
            label={<Text>Enable Node Coloring</Text>}
            onChange={event => setEnableNodeColoring(event.target.checked)}
          />
          <Text weight="bold">
            Select from user-uploaded expression data, or use data from our Expression Database
          </Text>
          <Text weight="bold">Top Dataset</Text>
          {/* TODO: replace with datasets from database */}
          <Select
            className="demo-source-dropdown"
            options={[
              <Text>
                Demo #1: Unweighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)
              </Text>,
              <Text>
                Demo #2: Weighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)
              </Text>,
              <Text>Demo #3: Unweighted GRN (21 genes, 31 edges)</Text>,
              <Text>Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)</Text>,
              <Text>Demo #5: PPI (18 proteins, 81 edges)</Text>,
            ]}
            value={demoValue}
            placeholder={<Text>Select a Demo</Text>}
            onChange={({ option }) => setDemoValue(option)}
            size="small"
          />
          <CheckBox
            checked={averageReplicateValuesTop}
            label={<Text>Average Replicate Values</Text>}
            onChange={event => setAverageReplicateValuesTop(event.target.checked)}
          />
          <Text weight="bold">Bottom Dataset</Text>
          {/* TODO: replace with datasets from database */}
          <Select
            className="demo-source-dropdown"
            pad="0px"
            options={[
              <Text>
                Demo #1: Unweighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)
              </Text>,
              <Text>
                Demo #2: Weighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)
              </Text>,
              <Text>Demo #3: Unweighted GRN (21 genes, 31 edges)</Text>,
              <Text>Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)</Text>,
              <Text>Demo #5: PPI (18 proteins, 81 edges)</Text>,
            ]}
            value={demoValue}
            placeholder={<Text>Select a Demo</Text>}
            onChange={({ option }) => setValue(option)}
            size="small"
          />
          <CheckBox
            checked={averageReplicateValuesBottom}
            label={<Text>Average Replicate Values</Text>}
            onChange={event => setAverageReplicateValuesBottom(event.target.checked)}
          />
          <Text>Log Fold Change Max Value (0.01-100):</Text>
          <Box className="panel-dropdown-container" direction="row" gap="5px">
            <TextInput value={logFoldChangeMax} placeholder="Enter max value" />
            <Button onClick={() => setLogFoldChangeMax(logFoldChangeMax)}>
              <Box pad={{ horizontal: "12px", vertical: "0px" }}>
                <Text>Set</Text>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Edge */}
      <Box className="panel" margin={{ top: "5px" }}>
        <Box margin="10px">
          <Text size="18px" weight="bold">
            Edge
          </Text>
        </Box>
        <Box pad={{ right: "10px", left: "10px", bottom: "10px" }} gap="5px">
          <CheckBox
            checked={colorOptimal}
            label={<Text>Enable Edge Coloring</Text>}
            onChange={event => setColorOptimal(event.target.checked)}
          />
          <Box>
            <Text weight="bold">Hide/Show Edge Weights</Text>
            <RadioButtonGroup
              className="sidebar-radio-buttons"
              gap="0px"
              options={[
                "Show With Mouse Over",
                "Always Show Edge Weights",
                "Never Show Edge Weights",
              ]}
              size="small"
              value={edgeWeightVisibility}
              onChange={event => setEdgeWeightVisibility(event.target.value)}
            />
          </Box>
          <Box>
            <Text weight="bold">Edge Weight Normalization Factor (0.0001-1000):</Text>
            <TextInput value={edgeWeightNormalization} />
          </Box>
          {/* TODO: need to center buttons and make the same size */}
          <Box className="panel-dropdown-container" direction="row" gap="5px">
            <Button>
              <Box pad={{ vertical: "6px", horizontal: "10px" }} direction="row" gap="4px">
                <Text size="14px">Set Factor</Text>
              </Box>
            </Button>
            <Button>
              <Box pad={{ vertical: "6px", horizontal: "10px" }} direction="row" gap="4px">
                <Text size="14px">Reset Factor</Text>
              </Box>
            </Button>
          </Box>
          <Box>
            <Text weight="bold">
              Gray Threshold (0-100%): <Text weight="normal">{grayThreshold}%</Text>
            </Text>
            <RangeInput
              color="blue"
              value={grayThreshold * 100}
              onChange={event => setGrayThreshold(event.target.value / 100)}
              min={0}
              max={100}
            />
          </Box>
          <CheckBox
            checked={showGrayEdgesDashed}
            label={<Text>Show Gray Edges as Dashed</Text>}
            onChange={event => setShowGrayEdgesDashed(event.target.checked)}
          />
        </Box>
      </Box>
      {/* View */}
      <Box className="panel" margin={{ top: "5px" }}>
        <Box margin="10px">
          <Text size="18px" weight="bold">
            View
          </Text>
        </Box>
        <Box margin="10px">
          <Text size="13px" weight="bold">
            Size
          </Text>
        </Box>
        <Box pad={{ right: "10px", left: "10px", bottom: "10px" }} gap="5px">
          <RadioButtonGroup
            className="sidebar-radio-buttons"
            gap="0px"
            options={[
              "Small (1104 X 648 pixels)",
              "Medium (1414 X 840 pixels)",
              "Large (1920 X 1080 pixels)",
            ]}
            size="small"
            value={viewSize}
            onChange={event => setViewSize(event.target.value)}
          />
          <CheckBox
            checked={restrictGraphToViewport}
            label={<Text>Restrict Graph to Viewport</Text>}
            onChange={event => setRestrictGraphToViewport(event.target.checked)}
          />
        </Box>
      </Box>
    </Box>
  );
}
