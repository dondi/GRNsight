import { useContext, useEffect, useState } from "react";
import { Nav, DropButton, Box, Text, Button, TextInput } from "grommet";
import { Refresh, Checkmark, FolderOpen, CaretRightFill } from "grommet-icons";
import { GrnStateContext } from "../App";
import {
  DEMO_TYPES,
  NETWORK_GRN_MODE_FULL,
  NETWORK_GRN_MODE_SHORT,
  NETWORK_PPI_MODE_FULL,
  LIGHT_GREEN,
  LIGHT_GRAY,
  MEDIUM_GRAY,
  DARK_GRAY,
  ZOOM_DISPLAY_MINIMUM,
  ZOOM_DISPLAY_MAXIMUM,
  ZOOM_DISPLAY_MIDDLE,
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
import DottedLine from "./helper-components/DottedLine";
import DropdownMenuButton from "./helper-components/DropdownMenuButton";
import OptionalCheckmark from "./helper-components/OptionalCheckmark";
import "../App.css";
import LoadFromDbModal from "./LoadFromDbModal";

export default function Navbar({}) {
  const [zoomTextInput, setZoomTextInput] = useState(ZOOM_DISPLAY_MIDDLE);
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
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
    zoomPercent,
    setZoomPercent,
    adaptive,
    setAdaptive,
  } = useContext(GrnStateContext);

  const isZoomControlDisabled =
    networkMode !== NETWORK_GRN_MODE_FULL && networkMode !== NETWORK_PPI_MODE_FULL;

  useEffect(() => {
    setZoomTextInput(zoomPercent);
  }, [zoomPercent]);

  const valueValidator = (min, max, value) => {
    return Math.min(max, Math.max(min, value));
  };

  const zoomInputValidator = value => {
    return valueValidator(ZOOM_DISPLAY_MINIMUM, ZOOM_DISPLAY_MAXIMUM, value);
  };

  const handleZoomInputChange = event => {
    const rawValue = event.target.value;
    setZoomTextInput(rawValue);

    // Let users clear the field while typing without snapping to min zoom.
    if (rawValue === "") {
      return;
    }

    const numericValue = Number(rawValue);
    if (Number.isNaN(numericValue)) {
      return;
    }

    setZoomPercent(zoomInputValidator(numericValue));
  };

  const handleDropContentClick = event => {
    if (event.target.closest(".demo-dropdown-navbar")) {
      return;
    }

    // Allow focusing/typing in inputs without immediately closing the menu.
    if (event.target.closest('input, textarea, [contenteditable="true"], [role="textbox"]')) {
      return;
    }

    setOpenMenu(null);
  };


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
    <Nav
      className="navbar"
      direction="row"
      flex="false"
      background={LIGHT_GREEN}
      pad={{ left: "30px", right: "15px" }}
      gap="none"
    >
      <DropButton
        label="Network"
        open={openMenu === "network"}
        onOpen={() => setOpenMenu("network")}
        onClose={() => setOpenMenu(null)}
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu" onClickCapture={handleDropContentClick}>
            <Text weight="bold" margin={{ left: "12px" }}>
              Network Source
            </Text>
            <Box pad={{ left: "10px", bottom: "5px" }}>
              <DropButton
                className="demo-dropdown-navbar"
                icon={false}
                label={
                  <Box direction="row" align="center" justify="between" width="100%">
                    <Text>Demo</Text>
                    <CaretRightFill color={LIGHT_GRAY} />
                  </Box>
                }
                dropAlign={{ top: "top", bottom: "top", left: "right", right: "left" }}
                dropContent={
                  <div className="dropdown-menu demo-dropdown-menu">
                    {Object.values(DEMO_TYPES).map(demo => (
                      <Button
                        pad="100px"
                        key={demo}
                        onClick={() => {
                          setDemoValue(demo);
                          setOpenMenu(null);
                        }}
                      >
                        <Text>{demo}</Text>
                      </Button>
                    ))}
                  </div>
                }
              />
            </Box>
            <DottedLine width="95%" />
            <Box pad={{ left: "30px", top: "7px", bottom: "5px", right: "30px" }}>
              <Box
                as="label"
                htmlFor="navbar-file-upload"
                className="file-input-trigger"
                direction="row"
                align="center"
                aria-disabled={isUploading}
                pad={{ end: "6px", vertical: "6px" }}
              >
                <input
                  id="navbar-file-upload"
                  className="file-input-native"
                  type="file"
                  name="file"
                  accept=".xlsx,.sif,.graphml"
                  disabled={isUploading}
                  onChange={handleFileUpload}
                />
                <FolderOpen className="folder-icon" size="14px" />
                <Text>Open File...</Text>
                <Text className="italics">(.xlsx, .sif, .graphml)</Text>
              </Box>
            </Box>
            <DottedLine width="95%" />
            <Box>
              <LoadFromDbModal margin={{ top: "7px", right: "20px", left: "20px" }} />
            </Box>
            <DottedLine />
            <Box>
              <Button margin={{ left: "20px" }} justify="between">
                <Refresh />
                <Text>Reload</Text>
              </Button>
            </Box>
            <DottedLine />
            <Text margin={{ left: "12px" }}>Network Mode</Text>
            <Box margin={{ left: "50px" }}>
              <Text color={DARK_GRAY}>{networkMode}</Text>
            </Box>
            <Text margin={{ left: "12px" }}>Species</Text>
            <Box direction="row" margin={{ left: "50px" }}>
              <Text color={DARK_GRAY}>Saccharomyces cerevisiae</Text>
            </Box>
          </div>
        }
      />

      <DropButton
        label="Layout"
        open={openMenu === "layout"}
        onOpen={() => setOpenMenu("layout")}
        onClose={() => setOpenMenu(null)}
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu" onClickCapture={handleDropContentClick}>
            <Box pad={{ left: "12px" }}>
              <Text>Graph Options</Text>
            </Box>
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
            <DottedLine />
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
            <DottedLine />
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
          </div>
        }
      />

      <DropButton
        label="Node"
        open={openMenu === "node"}
        onOpen={() => setOpenMenu("node")}
        onClose={() => setOpenMenu(null)}
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div>
            {enableNodeColoring ? (
              <div className="dropdown-menu" onClickCapture={handleDropContentClick}>
                <Box pad={{ horizontal: "20px", vertical: "3px" }}>
                  <Button onClick={() => setEnableNodeColoring(false)}>
                    <Checkmark size="small" />
                    <Text margin={{ left: "12px" }}>Enable Node Coloring</Text>
                  </Button>
                </Box>
                <DottedLine />
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
                <DottedLine />
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
                <DottedLine />
                {/* TODO: restrict size of text input and restrict to number values only */}
                <Box margin={{ horizontal: "20px", vertical: "3px" }} direction="row">
                  <Text>Log Fold Change Max Value (0.01 - 100)</Text> <TextInput />
                </Box>
              </div>
            ) : (
              <div className="dropdown-menu" onClickCapture={handleDropContentClick}>
                <Box pad={{ horizontal: "20px", vertical: "3px" }}>
                  <Button onClick={() => setEnableNodeColoring(true)}>
                    <Text margin={{ left: "12px" }}>Enable Node Coloring</Text>
                  </Button>
                </Box>
              </div>
            )}
          </div>
        }
      />

      <DropButton
        label="Edge"
        open={openMenu === "edge"}
        onOpen={() => setOpenMenu("edge")}
        onClose={() => setOpenMenu(null)}
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu" onClickCapture={handleDropContentClick}>
            <Box pad={{ horizontal: "20px", vertical: "3px" }}>
              <Button onClick={() => setColorOptimal(!colorOptimal)}>
                {colorOptimal && <Checkmark size="small" />}
                <Text margin={{ left: "12px" }}>Enable Edge Coloring Based on Weight Values</Text>
              </Button>
            </Box>
            <DottedLine />
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
            <DottedLine />
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
                color: MEDIUM_GRAY,
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
          </div>
        }
      />

      <DropButton
        label="View"
        open={openMenu === "view"}
        onOpen={() => setOpenMenu("view")}
        onClose={() => setOpenMenu(null)}
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu" onClickCapture={handleDropContentClick}>
            <Text margin={{ left: "small" }}>Viewport Size</Text>
            <Box pad={{ horizontal: "20px", top: "3px" }}>
              <Button onClick={() => setViewSize(VIEW_SIZE_SMALL)}>
                <OptionalCheckmark desiredValue={VIEW_SIZE_SMALL} currentValue={viewSize} />
                <Text>Small (1104 x 648 pixels)</Text>
              </Button>
            </Box>
            <Box pad={{ horizontal: "20px", top: "3px" }}>
              <Button onClick={() => setViewSize(VIEW_SIZE_MEDIUM)}>
                <OptionalCheckmark desiredValue={VIEW_SIZE_MEDIUM} currentValue={viewSize} />
                <Text>Medium (1414 x 840 pixels)</Text>
              </Button>
            </Box>
            <Box pad={{ horizontal: "20px", top: "3px" }}>
              <Button onClick={() => setViewSize(VIEW_SIZE_LARGE)}>
                <OptionalCheckmark desiredValue={VIEW_SIZE_LARGE} currentValue={viewSize} />
                <Text>Large (1920 x 1080 pixels)</Text>
              </Button>
            </Box>
            <Box pad={{ horizontal: "20px", top: "3px" }}>
              <Button onClick={() => setViewSize(FIT_TO_WINDOW)}>
                <OptionalCheckmark desiredValue={FIT_TO_WINDOW} currentValue={viewSize} />
                <Text>Fit To Window</Text>
              </Button>
            </Box>
            <DottedLine />
            <Box pad={{ horizontal: "20px", top: "3px" }}>
              <Button onClick={() => setAdaptive(!adaptive)}>
                <OptionalCheckmark desiredValue={false} currentValue={adaptive} />
                <Text>Restrict Graph to Viewport</Text>
              </Button>
            </Box>

            <DottedLine />
            <Box pad={{ horizontal: "20px", vertical: "3px" }} direction="row">
              <Text color={isZoomControlDisabled ? "disabled" : undefined}>
                Zoom ({ZOOM_DISPLAY_MINIMUM} - {ZOOM_DISPLAY_MAXIMUM})
              </Text>{" "}
              <TextInput
                value={zoomTextInput}
                onChange={event => handleZoomInputChange(event)}
                disabled={isZoomControlDisabled}
              />
            </Box>
          </div>
        }
      />

      <DropButton
        label="Export"
        open={openMenu === "export"}
        onOpen={() => setOpenMenu("export")}
        onClose={() => setOpenMenu(null)}
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu" onClickCapture={handleDropContentClick}>
            <DropdownMenuButton text="Export Data" />
            <DropdownMenuButton text="Export Image" />
            <DropdownMenuButton text="Print" />
          </div>
        }
      />

      <DropButton
        label="Help"
        open={openMenu === "help"}
        onOpen={() => setOpenMenu("help")}
        onClose={() => setOpenMenu(null)}
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu" onClickCapture={handleDropContentClick}>
            <DropdownMenuButton
              text="Getting Started"
              href={
                "https://dondi.github.io/GRNsight/documentation.html#gettingStarted"
              }
              onClick={() => setOpenMenu(null)}
            />
            <DropdownMenuButton
              text="GRNsight Wiki"
              href={"https://github.com/dondi/GRNsight/wiki"}
              onClick={() => setOpenMenu(null)}
            />
            <DropdownMenuButton
              text="About GRNsight"
              href={"https://dondi.github.io/GRNsight/about.html"}
              onClick={() => setOpenMenu(null)}
            />
          </div>
        }
      />

      {/* TODO: set width so that shorter and wider window like web-client-classic */}
      <DropButton
        label="Demo"
        open={openMenu === "demo"}
        onOpen={() => setOpenMenu("demo")}
        onClose={() => setOpenMenu(null)}
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        icon={false}
        dropContent={
          <div className="dropdown-menu demo-dropdown-menu" onClickCapture={handleDropContentClick}>
            {Object.values(DEMO_TYPES).map(demo => (
              <Button
                pad="100px"
                key={demo}
                onClick={() => {
                  setDemoValue(demo);
                  setOpenMenu(null);
                }}
              >
                <Text>{demo}</Text>
              </Button>
            ))}
          </div>
        }
        size="small"
      />

      <Box id="file-name">
        <Text>{demoValue}</Text>
      </Box>
    </Nav>
  );
}
