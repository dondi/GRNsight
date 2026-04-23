import { useContext, useState } from "react";
import {
  Box,
  Text,
  Button,
  Select,
  Stack,
  RangeInput,
  CheckBox,
  TextInput,
  RadioButtonGroup,
} from "grommet";
import { Refresh, FolderOpen } from "grommet-icons";
import { GrnStateContext } from "../App";
import {
  DEMO_TYPES,
  NETWORK_GRN_MODE_SHORT,
  VIEW_SIZE_SMALL,
  VIEW_SIZE_MEDIUM,
  VIEW_SIZE_LARGE,
  FIT_TO_WINDOW,
} from "../helpers/constants";
import { getNetworkMode, uploadWorkbook } from "../services/api";
import {
  annotateWorkbookLinks,
  extractWorkbookErrorMessage,
  returnUploadRoute,
  trackUploadAnalytics,
  validateUploadFile,
} from "../services/upload";
import "../App.css";
import DottedLine from "./helper-components/DottedLine";
import LoadFromDbModal from "./LoadFromDbModal";

export default function Sidebar({}) {
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
    setNetworkData,
    demoValue,
    setDemoValue,
    viewSize,
    setViewSize,
    adaptive,
    setAdaptive,
  } = useContext(GrnStateContext);

  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async event => {
    const file = event.target.files?.[0];
    const validationError = validateUploadFile(file);

    if (validationError) {
      setUploadError(validationError);
      event.target.value = "";
      return;
    }

    const uploadRoute = returnUploadRoute(file.name);
    setUploadError("");
    setIsUploading(true);

    try {
      const workbook = await uploadWorkbook(file, uploadRoute);
      const normalizedWorkbook =
        uploadRoute !== "upload" || !workbook?.positiveWeights || !workbook?.negativeWeights
          ? annotateWorkbookLinks(workbook)
          : workbook;

      setDemoValue(null);
      setNetworkData(normalizedWorkbook);

      let workbookType = normalizedWorkbook?.meta?.data?.workbookType;
      if (file.name.toLowerCase().endsWith(".sif")) {
        workbookType = normalizedWorkbook?.workbookType;
      } else if (file.name.toLowerCase().endsWith(".graphml")) {
        workbookType = NETWORK_GRN_MODE_SHORT;
      }

      try {
        setNetworkMode(getNetworkMode(workbookType));
      } catch {
        // Keep current network mode text if workbookType is unknown.
      }
      trackUploadAnalytics();
    } catch (error) {
      setUploadError(extractWorkbookErrorMessage(error.data || error.message));
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <Box id="sidebar">
      {/* Network */}
      <Box plain className="panel" margin={{ top: "5px" }}>
        <Box margin="10px">
          <Text size="18px" weight="bold">
            Network
          </Text>
        </Box>
        <Box pad={{ right: "10px", left: "10px", bottom: "10px" }}>
          <Box className="panel-dropdown-container">
            <Text weight="bold" size="small">
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
                options={Object.values(DEMO_TYPES)}
                dropProps={{ className: "demo-source-dropdown-drop" }}
                value={demoValue}
                placeholder={<Text>Select a Demo</Text>}
                onChange={({ option }) => setDemoValue(option)}
                size="14px"
              />
              <Stack anchor="center" margin={{ vertical: "6px" }}>
                <Box
                  as="label"
                  htmlFor="sidebar-file-upload"
                  className="file-input file-input-trigger"
                  direction="row"
                  align="center"
                  aria-disabled={isUploading}
                >
                  <input
                    id="sidebar-file-upload"
                    className="file-input-native"
                    type="file"
                    name="file"
                    accept=".xlsx,.sif,.graphml"
                    disabled={isUploading}
                    onChange={handleFileUpload}
                  />
                  <FolderOpen size="14px" style={{ marginRight: "4px" }} />
                  <Text size="14px">Open File</Text>
                </Box>
              </Stack>
              <Box margin={{ bottom: "15px" }}>
                <LoadFromDbModal />
              </Box>
            </Box>
          </Box>
          <DottedLine width="95%" />
          <Box className="panel-dropdown-container">
            <Button margin={{ top: "15px", bottom: "5px" }} justify="between">
              <Box
                pad={{ vertical: "6px", horizontal: "12px" }}
                direction="row"
                align="center"
                justify="center"
                gap="4px"
              >
                <Refresh size="14px" />
                <Text>Reload</Text>
              </Box>
            </Button>
          </Box>
          <DottedLine width="95%" />
          <Box margin={{ top: "10px" }}>
            <Text weight="bold" size="13px">
              Network Mode:
            </Text>
          </Box>
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
            options={Object.values(DEMO_TYPES)}
            dropProps={{ className: "demo-source-dropdown-drop" }}
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
            options={Object.values(DEMO_TYPES)}
            dropProps={{ className: "demo-source-dropdown-drop" }}
            value={demoValue}
            placeholder={<Text>Select a Demo</Text>}
            onChange={({ option }) => setDemoValue(option)}
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
              Gray Threshold (0-100%):{" "}
              <Text weight="normal">{(grayThreshold * 100).toFixed()}%</Text>
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
            options={[VIEW_SIZE_SMALL, VIEW_SIZE_MEDIUM, VIEW_SIZE_LARGE, FIT_TO_WINDOW]}
            size="small"
            value={viewSize}
            onChange={event => setViewSize(event.target.value)}
          />
          <CheckBox
            checked={!adaptive}
            label={<Text>Restrict Graph to Viewport</Text>}
            onChange={event => setAdaptive(!event.target.checked)}
          />
        </Box>
      </Box>
    </Box>
  );
}
