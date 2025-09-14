export const HOST_SITE = "https://dondi.github.io";

export const FILE_NAME = "#fileName";

export const GREY_EDGES_DASHED_MENU = "#grey-edges-dashed-menu";
export const GREY_EDGES_DASHED_SIDEBAR = "#dashedGrayLineButton";

export const CREATE_NETWORK_CLASS = ".create-network";
export const CREATE_NETWORK_MODAL = "#generateNetworkModal";

export const UNWEIGHTED_DEMO_ID = ".unweighted";
export const UNWEIGHTED_DEMO_PATH = "demo/unweighted";
export const UNWEIGHTED_DEMO_NAME = "Demo #1: Unweighted GRN (15 genes, 28 edges)";
export const WEIGHTED_DEMO_ID = ".weighted";
export const WEIGHTED_DEMO_PATH = "demo/weighted";
export const WEIGHTED_DEMO_NAME =
    "Demo #2: Weighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)";
export const SCHADE_INPUT_ID = ".schadeInput";
export const SCHADE_INPUT_PATH = "demo/schadeInput";
export const SCHADE_INPUT_NAME = "Demo #3: Unweighted GRN (21 genes, 31 edges)";
export const SCHADE_OUTPUT_ID = ".schadeOutput";
export const SCHADE_OUTPUT_PATH = "demo/schadeOutput";
export const SCHADE_OUTPUT_NAME =
    "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)";

export const PPI_DEMO_ID = ".ppi";
export const PPI_DEMO_PATH = "demo/ppi";
export const PPI_DEMO_NAME = "Demo #5: PPI (18 proteins, 81 edges)";

export const EXPORT_TO_EXCEL = "#exportAsExcelWkbk";
export const EXPORT_TO_UNWEIGHTED_SIF = "#exportAsUnweightedSif";
export const EXPORT_TO_WEIGHTED_SIF = "#exportAsWeightedSif";
export const EXPORT_TO_UNWEIGHTED_GML = "#exportAsUnweightedGraphMl";
export const EXPORT_TO_UNWEIGHTED_GML_MENU = "#unweightedGraphmlContainer";
export const EXPORT_TO_WEIGHTED_GML = "#exportAsWeightedGraphMl";
export const EXPORT_TO_PNG = "#exportAsPng";
export const EXPORT_TO_SVG = "#exportAsSvg";
export const EXPORT_TO_PDF = "#exportAsPdf";
export const EXPORT_WEIGHTED_CLASS = ".weighted.export";
export const EXPRESSION_SOURCE = "#expressionSource";

export const NETWORK_MODE_INFO = "#network-mode-info";
export const NETWORK_MODE_CLASS = ".network-mode";
export const NETWORK_MODE_MENU = "#network-mode-menu";

export const DEMO_INFORMATION = [
    [WEIGHTED_DEMO_ID, WEIGHTED_DEMO_PATH, WEIGHTED_DEMO_NAME],
    [UNWEIGHTED_DEMO_ID, UNWEIGHTED_DEMO_PATH, UNWEIGHTED_DEMO_NAME],
    [SCHADE_INPUT_ID, SCHADE_INPUT_PATH, SCHADE_INPUT_NAME],
    [SCHADE_OUTPUT_ID, SCHADE_OUTPUT_PATH, SCHADE_OUTPUT_NAME],
    [PPI_DEMO_ID, PPI_DEMO_PATH, PPI_DEMO_NAME],
];

export const MIN_EDGE_WEIGHT_NORMALIZATION = 0.0001;
export const MAX_EDGE_WEIGHT_NORMALIZATION = 1000;

export const DEFAULT_ZOOM_VALUE = 100;
export const BOUNDARY_MARGIN = 5;

export const GREY_EDGE_THRESHOLD_MENU = "#gray-edge-threshold-menu";
export const GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR = "#grayThresholdInput";
export const GREY_EDGE_THRESHOLD_TEXT_SIDEBAR = "#grayThresholdValue";

export const SET_NORMALIZATION_MENU = "#edge-weight-normalization-factor-menu";
export const SET_NORMALIZATION_SIDEBAR = "#normalization-button";
export const SET_NORMALIZATION_SIDEBAR_VALUE = "#normalization-max";
export const RESET_NORMALIZATION_MENU = "#reset-normalization-factor-menu";
export const RESET_NORMALIZATION_SIDEBAR = "#resetNormalizationButton";

export const WEIGHTS_SHOW_MOUSE_OVER_MENU = "#weightsMouseOverMenu";
export const WEIGHTS_SHOW_ALWAYS_MENU = "#weightsAlwaysMenu";
export const WEIGHTS_HIDE_MENU = "#weightsNeverMenu";
export const WEIGHTS_SHOW_MOUSE_OVER_SIDE = "#weightsMouseOverSide";
export const WEIGHTS_SHOW_ALWAYS_SIDE = "#weightsAlwaysSide";
export const WEIGHTS_HIDE_SIDE = "#weightsNeverSide";
export const WEIGHTS_SHOW_MOUSE_OVER_CLASS = ".weightsMouseOver";
export const WEIGHTS_SHOW_ALWAYS_CLASS = ".weightsAlways";
export const WEIGHTS_HIDE_CLASS = ".weightsNever";

export const SHOW_WEIGHTS_MOUSEOVER = "showWeightsMouseover";
export const SHOW_ALL_WEIGHTS = "showAllWeights";
export const HIDE_ALL_WEIGHTS = "hideAllWeights";

export const COLOR_EDGES = ".colorEdges";
export const ACTIVE_COLOR_OPTION = "active";
export const COLOR_EDGES_MENU = "#colorEdges";
export const COLOR_EDGES_SIDEBAR = "#colorEdgesSidebar";

export const GRAVITY_LENGTH_WITHOUT_ZERO = 3;
export const LOCK_SLIDERS_CLASS = ".lockSliders";
export const LOCK_SLIDERS_BUTTON = "#lockSlidersButton";
export const LOCK_SLIDERS_MENU = "#lockSlidersMenu";
export const RESET_SLIDERS_CLASS = ".resetSliders";
export const RESET_SLIDERS_SIDEBAR = "#resetSlidersButton";
export const RESET_SLIDERS_MENU = "#resetSlidersMenu";
export const UNDO_SLIDERS_RESET_CLASS = ".undoSliderReset";
export const UNDO_SLIDERS_RESET_ID = "#undoReset";
export const UNDO_SLIDERS_RESET_MENU = "#undoResetMenu";
export const UNDO_SLIDERS_RESET_SIDEBAR = "#undoResetButton";

export const LINK_DIST_CLASS = "#link-distance";
export const LINK_DIST_SLIDER_SIDEBAR = "#linkDistInput";
export const LINK_DIST_VALUE = "#linkDistVal";
export const LINK_DIST_MENU = "#link-distance-menu";
export const LINK_DIST_DEFAULT_VALUE = 500;
export const CHARGE_CLASS = "#charge";
export const CHARGE_SLIDER_SIDEBAR = "#chargeInput";
export const CHARGE_VALUE = "#chargeVal";
export const CHARGE_MENU = "#charge-menu";
export const CHARGE_DEFAULT_VALUE = -50;

export const GRID_LAYOUT = "GRID_LAYOUT";
export const FORCE_GRAPH = "FORCE_GRAPH";
export const FORCE_GRAPH_BUTTON = "#forceGraphButton";
export const GRID_LAYOUT_BUTTON = "#gridLayoutButton";
export const FORCE_GRAPH_MENU = "#forceGraph";
export const GRID_LAYOUT_MENU = "#gridLayout";

export const MINIMUM_MAX_LOG_FOLD_CHANGE = 0;
export const MAXIMUM_MAX_LOG_FOLD_CHANGE = 100;
export const DEFAULT_MAX_LOG_FOLD_CHANGE = 3;
export const MAX_NUM_CHARACTERS_DROPDOWN = 24;
export const LAYOUT_SIDEBAR_PANEL = "#layoutSidebarPanel";
export const EDGE_WEIGHT_MENU_CLASS = ".weightedGraphOptionsMenu";
export const EDGE_WEIGHT_SIDEBAR = ".edge-weight-sidebar";
export const EDGE_WEIGHT_SIDEBAR_HEADER_LINK = "#edgeWeightHeaderLink";
export const EXPRESSION_DB_MENU = ".data-sidebar";
export const EXPRESSION_DB_MENU_HEADER_LINK = "#dataSidebarLink";
export const EXPRESSION_DB_SIDEBAR_PANEL = "#dataSidebarPanel";
export const EXPRESSION_DB_LOADER = ".expression-db-loader";
export const EXPRESSION_DB_LOADER_TEXT = ".expression-db-loader-text";
export const DATA_SET_SELECT = "#data-set-select";
export const NODE_COLORING_MENU = ".node-coloring";
export const NODE_COLORING_MENU_CLASS = ".node-coloring-menu";
export const NODE_COLORING_NAVBAR_OPTIONS = "#node-coloring-navbar-options";
export const NODE_COLORING_SIDEBAR_PANEL = "#nodeColoringSidebarPanel";
export const NODE_COLORING_SIDEBAR_HEADER_LINK = "#nodeColoringHeaderLink";
export const NODE_COLORING_SIDEBAR_BODY = ".nodeColoringSidebarBody";
export const DATA_SIDEBAR_BODY = ".dataSidebarBody";
export const NODE_COLORING_SIDEBAR_HEADER = "#sidebarPanelHeader";
export const NODE_COLORING_TOGGLE_SIDEBAR = "#nodeColoringToggleSidebar";
export const AVG_REPLICATE_VALS_BOTTOM_SIDEBAR = "#averageDataBottom";
export const AVG_REPLICATE_VALS_TOP_SIDEBAR = "#averageDataTop";
export const AVG_REPLICATE_VALS_TOP_MENU = "#averageDataTopMenu";
export const AVG_REPLICATE_VALS_BOTTOM_MENU = "#averageDataBottomMenu";
export const NODE_COLORING_TOGGLE_MENU = "#node-coloring-toggle-menu";
export const NODE_COLORING_TOGGLE_CLASS = ".nodeColoringToggle";
export const LOG_FOLD_CHANGE_MAX_VALUE_CLASS = ".logFoldChangeMaxValue";
export const LOG_FOLD_CHANGE_MAX_VALUE_HEADER = "#logFoldChangeMaxValue";
export const LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT = "#log-fold-change-max-value-sidebar";
export const LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON = "#log-fold-change-button";
export const LOG_FOLD_CHANGE_MAX_VALUE_MENU = "#log-fold-change-max-value-menu";
export const ENDS_IN_EXPRESSION_REGEXP = /expression$/;
export const TOP_DATASET_SELECTION_MENU = "#topDatasetDropdownMenu";
export const TOP_DATASET_SELECTION_SIDEBAR = "#dataset-top";
export const BOTTOM_DATASET_SELECTION_MENU = "#bottomDatasetDropdownMenu";
export const BOTTOM_DATASET_SELECTION_SIDEBAR = "#dataset-bottom";

export const SPECIES_IDENTIFIED_NAME = "#speciesName";
export const SPECIES_DISPLAY = "#speciesDropdown";
export const SPECIES_BUTTON_YEAST = "#Saccharomyces_cerevisiae";
export const SPECIES_BUTTON_HUMAN = "#Homo_sapiens";
export const SPECIES_BUTTON_FLY = "#Drosophila_melanogaster";
export const SPECIES_BUTTON_NEMATODE = "#Caenorhabditis_elegans";
export const SPECIES_BUTTON_MOUSE = "#Mus_musculus";
export const SPECIES_BUTTON_CRESS = "#Arabidopsis_thaliana";

export const NODE_COLORING_USING_EXPRESSION_DATA = "#expressionDB";

export const ZOOM_CONTROL = ".zoom";
export const ZOOM_DISPLAY_MAXIMUM_SELECTOR = ".maximum-zoom-display";
export const ZOOM_DISPLAY_MAXIMUM_VALUE = 200;
export const ZOOM_DISPLAY_MINIMUM_SELECTOR = ".minimum-zoom-display";
export const ZOOM_DISPLAY_MINIMUM_VALUE = 25;
export const ZOOM_DISPLAY_MIDDLE = 100;
export const ZOOM_ADAPTIVE_MAX_SCALE = 4;
export const ZOOM_SLIDER = "#zoomSlider";
export const ZOOM_INPUT = "#zoomInput";
export const ZOOM_PERCENT = "#zoomPercent";

export const VIEWPORT_INIT = "containerInit";
export const VIEWPORT_FIT = "containerFit";
export const VIEWPORT_S = "containerS";
export const VIEWPORT_M = "containerM";
export const VIEWPORT_L = "containerL";

export const VIEWPORT_SIZE_S_DROPDOWN = "#viewport-size-s";
export const VIEWPORT_SIZE_M_DROPDOWN = "#viewport-size-m";
export const VIEWPORT_SIZE_L_DROPDOWN = "#viewport-size-l";
export const VIEWPORT_SIZE_FIT_DROPDOWN = "#viewport-size-fit";
export const VIEWPORT_SIZE_S_SIDEBAR = "#boundBoxS";
export const VIEWPORT_SIZE_M_SIDEBAR = "#boundBoxM";
export const VIEWPORT_SIZE_L_SIDEBAR = "#boundBoxL";
export const VIEWPORT_SIZE_FIT_SIDEBAR = "#boundBoxFit";
export const VIEWPORT_OPTION_CLASS = ".viewportOption";
export const VIEWPORT_OPTION_CLASS_SIDEBAR = ".boundBoxSize";

export const NETWORK_PPI_MODE = "protein-protein-physical-interaction";
export const NETWORK_GRN_MODE = "grn";
