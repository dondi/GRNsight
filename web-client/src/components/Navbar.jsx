import { useContext } from "react";
import { Nav, DropButton, Box, Text, Button, Tip, TextInput, Menu, Select, Drop } from "grommet";
import { Refresh, Checkmark, FolderOpen, Edge, CaretRightFill } from "grommet-icons";
import { GrnStateContext } from "../App";
import { DEMO_TYPES, LIGHT_GREEN, LIGHT_GRAY, MEDIUM_GRAY, DARK_GRAY } from "../helpers/constants";
import DottedLine from "./helper-components/DottedLine";
import DropdownMenuButton from "./helper-components/DropdownMenuButton";
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
      background={LIGHT_GREEN}
      pad={{ left: "30px", right: "15px" }}
      gap="none"
    >
      <DropButton
        label="Network"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu">
            <Text weight="bold" margin={{ left: "12px" }}>
              Network Source
            </Text>
            {/* TODO: need to make sure there is a top margin, but adding a 7px top margin causes the buttons to display 7px shifted down */}
            {/* TODO: need to style options to have no padding/margin */}
            <Box pad={{ left: "30px", bottom: "5px" }}>
              <Select
                className="demo-dropdown-navbar"
                icon={<CaretRightFill color={LIGHT_GRAY} />}
                dropAlign={{ top: "top", bottom: "top", left: "right", right: "left" }}
                options={Object.values(DEMO_TYPES).map(name => (
                  <Text key={name}>{name}</Text>
                ))}
                value={<Text>Demo</Text>}
                placeholder={<Text>Demo</Text>}
                onChange={({ option }) => setDemoValue(option)}
                size="small"
              />
            </Box>
            <DottedLine width="95%" />
            <Box pad={{ left: "30px", top: "7px", bottom: "5px" }}>
              <Button>
                <FolderOpen className="folder-icon" size="14px" />
                <Text>Open File...</Text> <Text className="italics">(.xlsx, .sif, .graphml)</Text>
              </Button>
            </Box>
            <DottedLine width="95%" />
            <Box>
              <Button margin={{ top: "7px", right: "20px", left: "30px" }}>
                <Text>Load from Database...</Text>
              </Button>
            </Box>
            <DottedLine />
            <Box>
              <Button margin={{ left: "20px" }} justify="between">
                <Refresh />
                <Text>Reload</Text>
              </Button>
            </Box>
            <DottedLine />
            <Text weight="bold" margin={{ left: "12px" }}>
              Network Mode
            </Text>
            {/* TODO: only display checkmark if selected view */}
            {/* TODO: need to display text in gray when disabled */}
            <Box margin={{ left: "50px" }}>
              <Text color={DARK_GRAY}>{networkMode}</Text>
            </Box>
            <Text weight="bold" margin={{ left: "12px" }}>
              Species
            </Text>
            <Box direction="row" margin={{ left: "50px" }}>
              <Text color={DARK_GRAY}>Saccharomyces cerevisiae</Text>
            </Box>
          </div>
        }
      />

      <DropButton
        label="Layout"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu">
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
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div>
            {enableNodeColoring ? (
              <div className="dropdown-menu">
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
              <div className="dropdown-menu">
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
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu">
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
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu">
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
            <DottedLine />

            <Button
              margin={{ horizontal: "20px", top: "3px" }}
              onClick={() => setRestrictGraphToViewport(!restrictGraphToViewport)}
            >
              <Text>Restrict Graph to Viewport</Text>
            </Button>

            <DottedLine />
            <Box margin={{ horizontal: "20px", vertical: "3px" }} direction="row">
              <Text>Zoom (25 - 200%)</Text> <TextInput />
            </Box>
          </div>
        }
      />

      <DropButton
        label="Export"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu">
            <DropdownMenuButton text="Export Data" />
            <DropdownMenuButton text="Export Image" />
            <DropdownMenuButton text="Print" />
          </div>
        }
      />

      <DropButton
        label="Help"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        dropContent={
          <div className="dropdown-menu">
            <DropdownMenuButton text="Getting Started" />
            <DropdownMenuButton text="GRNsight Wiki" />
            <DropdownMenuButton text="About GRNsight" />
          </div>
        }
      />

      {/* TODO: set width so that shorter and wider window like web-client-classic */}
      <DropButton
        label="Demo"
        dropAlign={{ top: "bottom", left: "left" }}
        pad="15px"
        icon={false}
        dropContent={
          <div className="dropdown-menu">
            {Object.values(DEMO_TYPES).map(demo => (
              <Button pad="100px" key={demo} onClick={() => setDemoValue(demo)}>
                <Text>{demo}</Text>
              </Button>
            ))}
          </div>
        }
        size="small"
      />``

      <Box id="file-name" pad="15px">
        <Text>{demoValue}</Text>
      </Box>
    </Nav>
  );
}
