// TODO: Should I point to the constants in web-client-classic instead?
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
export const BOUNDARY_MARGIN = 5;
export const ZOOM_DISPLAY_MINIMUM = 25;
export const ZOOM_DISPLAY_MAXIMUM = 200;
export const ZOOM_DISPLAY_MIDDLE = 100;
export const ZOOM_ADAPTIVE_MAX_SCALE = 100;
export const ZOOM_SLIDER_MIN = 0;
export const ZOOM_SLIDER_MIDDLE = 4;
export const ZOOM_SLIDER_MAX = 8;
export const MINIMUM_NODE_WIDTH = 68.5625;
export const NODE_MARGIN = 3;
// node_height is 22 in web-client-classic, but 30 in this. may need to fix later
// Alternatively, var nodeHeight = 30 in graph.js, so this value may be accurate
export const NODE_HEIGHT = 30;
export const NODE_TEXT_HEIGHT = 22;
export const MIN_SCALE = 0.25;
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
// export const DEFAULT_NODE_SHIFT = 1.033;
export const SHORT_NODE_LIMIT = 135;
export const ADDITIONAL_SHIFT = 0.07;
export const END_POINT_ADJUSTMENT = 1.2;
export const LIGHT_GREEN = "#dfebe5";
export const LIGHT_GRAY = "#ccc";
export const MEDIUM_GRAY = "#bbb";
export const DARK_GRAY = "#999";
