export const GREY_EDGES_DASHED_MENU = "#grey-edges-dashed-menu";
export const GREY_EDGES_DASHED_SIDEBAR = "#dashedGrayLineButton";

export const UNWEIGHTED_DEMO_ID   = "#unweighted";
export const UNWEIGHTED_DEMO_PATH = "demo/unweighted";
export const UNWEIGHTED_DEMO_NAME = "Demo #1: Unweighted GRN (21 genes, 50 edges)";
export const WEIGHTED_DEMO_ID     = "#weighted";
export const WEIGHTED_DEMO_PATH   = "demo/weighted";
export const WEIGHTED_DEMO_NAME   = "Demo #2: Weighted GRN (21 genes, 50 edges, Dahlquist Lab unpublished data)";
export const SCHADE_INPUT_ID      = "#schadeInput";
export const SCHADE_INPUT_PATH    = "demo/schadeInput";
export const SCHADE_INPUT_NAME    = "Demo #3: Unweighted GRN (21 genes, 31 edges)";
export const SCHADE_OUTPUT_ID     = "#schadeOutput";
export const SCHADE_OUTPUT_PATH   = "demo/schadeOutput";
export const SCHADE_OUTPUT_NAME   = "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)";

export const DEMO_INFORMATION = [
    [ WEIGHTED_DEMO_ID,   WEIGHTED_DEMO_PATH,   WEIGHTED_DEMO_NAME   ],
    [ UNWEIGHTED_DEMO_ID, UNWEIGHTED_DEMO_PATH, UNWEIGHTED_DEMO_NAME ],
    [ SCHADE_INPUT_ID,    SCHADE_INPUT_PATH,    SCHADE_INPUT_NAME    ],
    [ SCHADE_OUTPUT_ID,   SCHADE_OUTPUT_PATH,   SCHADE_OUTPUT_NAME   ]
];

export const MIN_EDGE_WEIGHT_NORMALIZATION = 0.0001;
export const MAX_EDGE_WEIGHT_NORMALIZATION = 1000;

export const GREY_EDGE_THRESHOLD_MENU           = "#gray-edge-threshold-menu";
export const GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR = "#grayThresholdInput";
export const GREY_EDGE_THRESHOLD_TEXT_SIDEBAR   = "#grayThresholdValue";

export const WEIGHTS_SHOW_MOUSE_OVER_MENU       = "#weightsMouseOverMenu";
export const WEIGHTS_SHOW_ALWAYS_MENU           = "#weightsAlwaysMenu";
export const WEIGHTS_HIDE_MENU                  = "#weightsNeverMenu";
export const WEIGHTS_SHOW_MOUSE_OVER_SIDE       = "#weightsMouseOverSide";
export const WEIGHTS_SHOW_ALWAYS_SIDE           = "#weightsAlwaysSide";
export const WEIGHTS_HIDE_SIDE                  = "#weightsNeverSide";
export const WEIGHTS_SHOW_MOUSE_OVER_CLASS      = ".weightsMouseOver";
export const WEIGHTS_SHOW_ALWAYS_CLASS          = ".weightsAlways";
export const WEIGHTS_HIDE_CLASS                 = ".weightsNever";

export const SHOW_WEIGHTS_MOUSEOVER             = "showWeightsMouseover";
export const SHOW_ALL_WEIGHTS                   = "showAllWeights";
export const HIDE_ALL_WEIGHTS                   = "hideAllWeights";

export const COLOR_EDGES                        = "#colorEdges";
export const BLACK_EDGES                        = "blackEdges";
export const ACTIVE_COLOR_OPTION                = "active";

export const GRAVITY_LENGTH_WITHOUT_ZERO = 3;
export const LOCK_SLIDERS_CLASS          = ".lockSliders";
export const LOCK_SLIDERS_BUTTON         = "#lockSlidersButton";
export const LOCK_SLIDERS_MENU_OPTION    = "#lockSlidersMenu";
export const RESET_SLIDERS_CLASS         = ".resetSliders";
export const RESET_SLIDERS_BUTTON        = "#resetSlidersButton";
export const RESET_SLIDERS_MENU_OPTION   = "#resetSlidersMenu";
export const UNDO_SLIDER_RESET_CLASS     = ".undoSliderReset";
export const UNDO_SLIDER_RESET_MENU      = "#undoResetMenu";
export const UNDO_SLIDER_RESET_BUTTON    = "#undoResetButton";

export const LINK_DIST_SLIDER_ID        = "#linkDistInput";
export const LINK_DIST_VALUE            = "#linkDistVal";
export const LINK_DIST_MENU             = "#link-distance-menu";
export const LINK_DIST_DEFAULT_VALUE    = 500;
export const CHARGE_SLIDER_ID           = "#chargeInput";
export const CHARGE_VALUE               = "#chargeVal";
export const CHARGE_MENU                = "#charge-menu";
export const CHARGE_DEFAULT_VALUE       = -50;

export const GRID_LAYOUT_BUTTON         = "#gridLayoutButton";

export const MINIMUM_MAX_LOG_FOLD_CHANGE                = -100;
export const MAXIMUM_MAX_LOG_FOLD_CHANGE                = 100;
export const DEFAULT_MAX_LOG_FOLD_CHANGE                = 3;
export const MAX_NUM_CHARACTERS_DROPDOWN                = 24;
export const NODE_COLORING_MENU                         = ".node-coloring";
export const BOTTOM_DATASET_SELECTION_SIDEBAR           = "#dataset-bottom";
export const TOP_DATASET_SELECTION_SIDEBAR              = "#dataset-top";
export const NODE_COLORING_TOGGLE_SIDEBAR               = "#nodeColoringToggle";
export const AVG_REPLICATE_VALS_BOTTOM_SIDEBAR          = "#averageDataBottom";
export const AVG_REPLICATE_VALS_TOP_SIDEBAR             = "#averageDataTop";
export const AVG_REPLICATE_VALS_TOP_MENU                = "#averageDataTopMenu";
export const AVG_REPLICATE_VALS_BOTTOM_MENU             = "#averageDataBottomMenu";
export const NODE_COLORING_TOGGLE_MENU                  = "#node-coloring-toggle-menu";
export const TOP_DATASET_SELECTION_MENU                 = "#topDatasetDropdownMenu";
export const BOTTOM_DATASET_SELECTION_MENU              = "#bottomDatasetDropdownMenu";
export const NODE_COLORING_TOGGLE_CLASS                 = ".nodeColoringToggle";
export const LOG_FOLD_CHANGE_MAX_VALUE_CLASS            = ".logFoldChangeMaxValue";
export const LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON   = "#log-fold-change-button";
export const ENDS_IN_EXPRESSION_REGEXP                  = /expression$/;
