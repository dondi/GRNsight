import * as d3 from "d3";

// Demo Names
export const UNWEIGHTED_DEMO_NAME =
  "Demo #1: Unweighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)";
export const WEIGHTED_DEMO_NAME =
  "Demo #2: Weighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)";
export const SCHADE_INPUT_NAME = "Demo #3: Unweighted GRN (21 genes, 31 edges)";
export const SCHADE_OUTPUT_NAME =
  "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)";
export const PPI_DEMO_NAME = "Demo #5: PPI (18 proteins, 81 edges)";
export const DEMO_TYPES = {
  unweighted: UNWEIGHTED_DEMO_NAME,
  weighted: WEIGHTED_DEMO_NAME,
  schadeInput: SCHADE_INPUT_NAME,
  schadeOutput: SCHADE_OUTPUT_NAME,
  ppi: PPI_DEMO_NAME,
};

// Graph
export const MAX_GRAPH_HEIGHT = 5000;
export const MAX_GRAPH_WIDTH = 5000;
export const NODE_POS_OFFSET = 5;
export const BOUNDARY_MARGIN = 5;
export const MINIMUM_NODE_WIDTH = 68.5625;
export const NODE_MARGIN = 4;
export const NODE_HEIGHT = 30;
export const NODE_TEXT_HEIGHT = 22;
export const MIDDLE_SCALE = 1;
export const CURVE_THRESHOLD = 200;
export const EDGE_OFFSET = 20;
export const EDGE_RED = "rgb(195,61,61)";
export const EDGE_BLUE = "rgb(51,124,183)";
export const EDGE_BLACK = "rgb(0,0,0)";
export const NETWORK_GRN_MODE_FULL = "Gene Regulatory Network";
export const NETWORK_PPI_MODE_FULL = "Protein-Protein Interaction";
export const NETWORK_GRN_MODE_SHORT = "grn";
export const NETWORK_PPI_MODE_SHORT = "protein-protein-physical-interaction";
export const SELF_REFERRING_Y_OFFSET = 6;
export const SHORT_NODE_LIMIT = 135;
export const ADDITIONAL_SHIFT = 0.07;
export const END_POINT_ADJUSTMENT = 1.2;
export const LIGHT_GREEN = "#dfebe5";
export const LIGHT_GRAY = "#ccc";
export const MEDIUM_GRAY = "#bbb";
export const DARK_GRAY = "#999";

// Viewport Size
export const VIEW_SIZE_SMALL = "Small (1104 x 648 pixels)";
export const VIEW_SIZE_MEDIUM = "Medium (1414 x 768 pixels)";
export const VIEW_SIZE_LARGE = "Large (1920 x 1080 pixels)";
export const FIT_TO_WINDOW = "Fit to Window";
export const MEDIUM_PAGE_WIDTH = 1500;
export const LARGE_PAGE_WIDTH = 2200;
export const VIEW_SIZE_DIMENSIONS = {
  [VIEW_SIZE_SMALL]: { width: 1104, height: 648 },
  [VIEW_SIZE_MEDIUM]: { width: 1414, height: 768 },
  [VIEW_SIZE_LARGE]: { width: 1920, height: 1080 },
  [FIT_TO_WINDOW]: { width: null, height: null },
};
export const WIDTH_OFFSET = 255;
export const HEIGHT_OFFSET = 53;

// Load From Database Modal
export const MAX_GENES = 75;
export const MAX_EDGES = 100;

// Zoom
export const ZOOM_DISPLAY_MINIMUM = 25;
export const ZOOM_MIN_DISPLAY = ZOOM_DISPLAY_MINIMUM;
export const ZOOM_DISPLAY_MAXIMUM = 200;
export const ZOOM_DISPLAY_MIDDLE = 100;
export const ZOOM_ADAPTIVE_MAX_DISPLAY = ZOOM_DISPLAY_MAXIMUM;
export const ZOOM_ADAPTIVE_MAX_SCALE = 4;
export const ZOOM_SLIDER_MIN = 0;
export const ZOOM_MIN_SCALE = 0.25;
export const ZOOM_MIDDLE_SCALE = 1;
export const ZOOM_SLIDER_MIDDLE = 4;
export const ZOOM_SLIDER_MAX = 8;
// Supports non-linear zoom scale so that 100% in the middle of slider
const createZoomScale = (domainMin, domainMax, rangeMin, rangeMax) =>
  d3.scaleLinear().domain([domainMin, domainMax]).range([rangeMin, rangeMax]).clamp(true);

// Converting from zoom percentage to graph zoom scale
export const zoomScaleLeft = () => {
  return createZoomScale(ZOOM_MIN_DISPLAY, ZOOM_DISPLAY_MIDDLE, ZOOM_MIN_SCALE, ZOOM_MIDDLE_SCALE);
};

export const zoomScaleRight = () => {
  return createZoomScale(
    ZOOM_DISPLAY_MIDDLE,
    ZOOM_ADAPTIVE_MAX_DISPLAY,
    ZOOM_MIDDLE_SCALE,
    ZOOM_ADAPTIVE_MAX_SCALE
  );
};

// Converting from slider input to zoom percentage
export const zoomScaleSliderLeft = () => {
  return createZoomScale(
    ZOOM_SLIDER_MIN,
    ZOOM_SLIDER_MIDDLE,
    ZOOM_DISPLAY_MINIMUM,
    ZOOM_DISPLAY_MIDDLE
  );
};

export const zoomScaleSliderRight = () => {
  return createZoomScale(
    ZOOM_SLIDER_MIDDLE,
    ZOOM_SLIDER_MAX,
    ZOOM_DISPLAY_MIDDLE,
    ZOOM_ADAPTIVE_MAX_DISPLAY
  );
};
