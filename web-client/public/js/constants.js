export const GREY_EDGES_DASHED_MENU = "#grey-edges-dashed-menu";
export const GREY_EDGES_DASHED_SIDEBAR = "#dashedGrayLineButton";

const UNWEIGHTED_DEMO_ID   = "#unweighted";
const UNWEIGHTED_DEMO_PATH = "demo/unweighted";
const UNWEIGHTED_DEMO_NAME = "Demo #1: Unweighted GRN (21 genes, 50 edges)";
const WEIGHTED_DEMO_ID     = "#weighted";
const WEIGHTED_DEMO_PATH   = "demo/weighted";
const WEIGHTED_DEMO_NAME   = "Demo #2: Weighted GRN (21 genes, 50 edges, Dahlquist Lab unpublished data)";
const SCHADE_INPUT_ID      = "#schadeInput";
const SCHADE_INPUT_PATH    = "demo/schadeInput";
const SCHADE_INPUT_NAME    = "Demo #3: Unweighted GRN (21 genes, 31 edges)";
const SCHADE_OUTPUT_ID     = "#schadeOutput";
const SCHADE_OUTPUT_PATH   = "demo/schadeOutput";
const SCHADE_OUTPUT_NAME   = "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)";

export const DEMO_INFORMATION = [
    [ WEIGHTED_DEMO_ID,   WEIGHTED_DEMO_PATH,   WEIGHTED_DEMO_NAME   ],
    [ UNWEIGHTED_DEMO_ID, UNWEIGHTED_DEMO_PATH, UNWEIGHTED_DEMO_NAME ],
    [ SCHADE_INPUT_ID,    SCHADE_INPUT_PATH,    SCHADE_INPUT_NAME    ],
    [ SCHADE_OUTPUT_ID,   SCHADE_OUTPUT_PATH,   SCHADE_OUTPUT_NAME   ]
];

export const MIN_EDGE_WEIGHT_NORMALIZATION = 0.0001;
export const MAX_EDGE_WEIGHT_NORMALIZATION = 1000;

export const GREY_EDGE_THRESHOLD_MENU = "#gray-edge-threshold-menu";
export const GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR = "#grayThresholdInput";
export const GREY_EDGE_THRESHOLD_TEXT_SIDEBAR = "#grayThresholdValue";

export const WEIGHTS_SHOW_MOUSE_OVER_MENU  = "#weightsMouseOverMenu";
export const WEIGHTS_SHOW_ALWAYS_MENU      = "#weightsAlwaysMenu";
export const WEIGHTS_HIDE_MENU             = "#weightsNeverMenu";
export const WEIGHTS_SHOW_MOUSE_OVER_SIDE  = "#weightsMouseOverSide";
export const WEIGHTS_SHOW_ALWAYS_SIDE      = "#weightsAlwaysSide";
export const WEIGHTS_HIDE_SIDE             = "#weightsNeverSide";
export const WEIGHTS_SHOW_MOUSE_OVER_CLASS = ".weightsMouseOver";
export const WEIGHTS_SHOW_ALWAYS_CLASS     = ".weightsAlways";
export const WEIGHTS_HIDE_CLASS            = ".weightsNever";

export const SHOW_WEIGHTS_MOUSEOVER = "showWeightsMouseover";
export const SHOW_ALL_WEIGHTS = "showAllWeights";
export const HIDE_ALL_WEIGHTS = "hideAllWeights";

export const COLOR_PREFERENCES_CLASS = ".colorPreferences";
export const ACTIVE_COLOR_OPTION     = "active";
