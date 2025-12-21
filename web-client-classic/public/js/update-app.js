import { drawGraph, updaters } from "./graph";
import { uploadState } from "./upload";
import { displayGraphWarnings, displayPPINodeColorWarning } from "./warnings";
import { max } from "d3-array";
import { grnState } from "./grnstate";

import {
    HOST_SITE,
    FILE_NAME,
    FORCE_GRAPH,
    GRID_LAYOUT,
    GREY_EDGES_DASHED_MENU,
    GREY_EDGES_DASHED_SIDEBAR,
    MIN_EDGE_WEIGHT_NORMALIZATION,
    MAX_EDGE_WEIGHT_NORMALIZATION,
    GREY_EDGE_THRESHOLD_MENU,
    GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR,
    GREY_EDGE_THRESHOLD_TEXT_SIDEBAR,
    WEIGHTS_SHOW_MOUSE_OVER_MENU,
    WEIGHTS_SHOW_ALWAYS_MENU,
    WEIGHTS_HIDE_MENU,
    WEIGHTS_SHOW_MOUSE_OVER_SIDE,
    WEIGHTS_SHOW_ALWAYS_SIDE,
    WEIGHTS_HIDE_SIDE,
    WEIGHTS_SHOW_MOUSE_OVER_CLASS,
    WEIGHTS_SHOW_ALWAYS_CLASS,
    WEIGHTS_HIDE_CLASS,
    SHOW_WEIGHTS_MOUSEOVER,
    SHOW_ALL_WEIGHTS,
    HIDE_ALL_WEIGHTS,
    COLOR_EDGES_MENU,
    COLOR_EDGES_SIDEBAR,
    ACTIVE_COLOR_OPTION,
    GRAVITY_LENGTH_WITHOUT_ZERO,
    LOCK_SLIDERS_MENU,
    LOCK_SLIDERS_BUTTON,
    RESET_SLIDERS_SIDEBAR,
    RESET_SLIDERS_MENU,
    UNDO_SLIDERS_RESET_SIDEBAR,
    UNDO_SLIDERS_RESET_MENU,
    LINK_DIST_CLASS,
    LINK_DIST_SLIDER_SIDEBAR,
    LINK_DIST_MENU,
    LINK_DIST_VALUE,
    CHARGE_CLASS,
    CHARGE_SLIDER_SIDEBAR,
    CHARGE_MENU,
    CHARGE_VALUE,
    LAYOUT_SIDEBAR_PANEL,
    NODE_COLORING_MENU,
    NODE_COLORING_TOGGLE_MENU,
    NODE_COLORING_MENU_CLASS,
    NODE_COLORING_NAVBAR_OPTIONS,
    NODE_COLORING_SIDEBAR_BODY,
    NODE_COLORING_SIDEBAR_PANEL,
    NODE_COLORING_SIDEBAR_HEADER_LINK,
    NODE_COLORING_TOGGLE_SIDEBAR,
    AVG_REPLICATE_VALS_TOP_MENU,
    AVG_REPLICATE_VALS_TOP_SIDEBAR,
    AVG_REPLICATE_VALS_BOTTOM_MENU,
    AVG_REPLICATE_VALS_BOTTOM_SIDEBAR,
    LOG_FOLD_CHANGE_MAX_VALUE_MENU,
    LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT,
    MINIMUM_MAX_LOG_FOLD_CHANGE,
    MAXIMUM_MAX_LOG_FOLD_CHANGE,
    DEFAULT_MAX_LOG_FOLD_CHANGE,
    TOP_DATASET_SELECTION_SIDEBAR,
    TOP_DATASET_SELECTION_MENU,
    BOTTOM_DATASET_SELECTION_SIDEBAR,
    BOTTOM_DATASET_SELECTION_MENU,
    LOG_FOLD_CHANGE_MAX_VALUE_CLASS,
    LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON,
    LOG_FOLD_CHANGE_MAX_VALUE_HEADER,
    MAX_NUM_CHARACTERS_DROPDOWN,
    ENDS_IN_EXPRESSION_REGEXP,
    ZOOM_CONTROL,
    ZOOM_DISPLAY_MIDDLE,
    ZOOM_ADAPTIVE_MAX_SCALE,
    ZOOM_INPUT,
    ZOOM_SLIDER,
    EXPORT_WEIGHTED_CLASS,
    EDGE_WEIGHT_MENU_CLASS,
    EDGE_WEIGHT_SIDEBAR,
    EDGE_WEIGHT_SIDEBAR_HEADER_LINK,
    SPECIES_DISPLAY,
    EXPRESSION_DB_LOADER,
    EXPRESSION_DB_LOADER_TEXT,
    SPECIES_BUTTON_CRESS,
    SPECIES_BUTTON_FLY,
    SPECIES_BUTTON_HUMAN,
    SPECIES_BUTTON_MOUSE,
    SPECIES_BUTTON_NEMATODE,
    SPECIES_BUTTON_YEAST,
    VIEWPORT_FIT,
    VIEWPORT_S,
    VIEWPORT_M,
    VIEWPORT_L,
    VIEWPORT_SIZE_S_DROPDOWN,
    VIEWPORT_SIZE_M_DROPDOWN,
    VIEWPORT_SIZE_L_DROPDOWN,
    VIEWPORT_SIZE_FIT_DROPDOWN,
    VIEWPORT_SIZE_S_SIDEBAR,
    VIEWPORT_SIZE_M_SIDEBAR,
    VIEWPORT_SIZE_L_SIDEBAR,
    VIEWPORT_SIZE_FIT_SIDEBAR,
    VIEWPORT_INIT,
    NETWORK_MODE_INFO,
    NETWORK_MODE_MENU,
    EXPORT_TO_UNWEIGHTED_GML_MENU,
    NETWORK_GRN_MODE,
    NETWORK_PPI_MODE,
    //   EXPRESSION_SOURCE,
} from "./constants";

import { queryExpressionDatabase } from "./api/grnsight-api.js";

// In this transitory state, updateApp might get called before things are completely set up, so for now
// we define this wrapper function that guards against uninitialized values.

queryExpressionDatabase({ type: "ExpressionDatasets" })
    .then(function (response) {
        grnState.database = response;
    })
    .catch(function (error) {
        console.log(error.stack);
        console.log(error.name);
        console.log(error.message);
    });

const refreshApp = () => {
    if (uploadState && uploadState.currentWorkbook) {
        drawGraph(uploadState.currentWorkbook);
    }
};

const displayworkbook = (workbook, name) => {
    uploadState.currentWorkbook = workbook;
    $("#graph-metadata").html(
        workbook.genes.length + " nodes<br>" + workbook.links.length + " edges"
    );

    if (workbook.warnings.length > 0) {
        displayGraphWarnings(workbook.warnings);
    }

    $(FILE_NAME).text(name); // Set the name of the file to display in the top bar
    $("input[type='range']").off("input"); // I have no idea why I do this. Investigate later.
};

// Value Validators
export const valueValidator = (min, max, value) => {
    return Math.min(max, Math.max(min, value));
};

const edgeWeightNormalizationInputValidation = value => {
    return value === ""
        ? ""
        : valueValidator(MIN_EDGE_WEIGHT_NORMALIZATION, MAX_EDGE_WEIGHT_NORMALIZATION, value);
};

const synchronizeNormalizationValues = value => {
    var validated = edgeWeightNormalizationInputValidation(value);
    $("#normalization-max").val(validated);
    $("#edge-weight-normalization-factor-menu").val(validated);
};

const grayEdgeInputValidator = value => {
    return valueValidator(0, 100, value);
};

const logFoldChangeMaxValueInputValidation = value => {
    if (value === "" || value === "0") {
        return DEFAULT_MAX_LOG_FOLD_CHANGE;
    } else if (value < MINIMUM_MAX_LOG_FOLD_CHANGE) {
        return MINIMUM_MAX_LOG_FOLD_CHANGE;
    } else if (value > MAXIMUM_MAX_LOG_FOLD_CHANGE) {
        return MAXIMUM_MAX_LOG_FOLD_CHANGE;
    } else {
        return value;
    }
};

// Weight Visualization Function
const showEdgeWeightOptions = () => {
    $(EDGE_WEIGHT_MENU_CLASS).removeClass("disabled");
    $(EXPORT_WEIGHTED_CLASS).removeClass("startDisabled").removeClass("disabled");
    $(EDGE_WEIGHT_SIDEBAR).removeClass("disabled");
    $(EDGE_WEIGHT_SIDEBAR_HEADER_LINK).attr("data-toggle", "collapse");
};

const hideEdgeWeightOptions = () => {
    $(EDGE_WEIGHT_MENU_CLASS).addClass("disabled");
    $(EXPORT_WEIGHTED_CLASS).removeClass("startDisabled").addClass("disabled");
    $(EDGE_WEIGHT_SIDEBAR).addClass("disabled");
    $(EDGE_WEIGHT_SIDEBAR_HEADER_LINK).attr("data-toggle", "");
};

const synchronizeGrayEdgeValues = value => {
    var validatedInput = grayEdgeInputValidator(value);
    $(GREY_EDGE_THRESHOLD_MENU).val(validatedInput);
    $(GREY_EDGE_THRESHOLD_TEXT_SIDEBAR).text(validatedInput + "%");
    $(GREY_EDGE_THRESHOLD_SLIDER_SIDEBAR).val(validatedInput / 100);
};

const synchronizeShowWeightsMouseover = () => {
    $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").addClass("glyphicon-ok");
    $(WEIGHTS_SHOW_ALWAYS_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_HIDE_MENU + " span").removeClass("glyphicon-ok");

    $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).prop("checked", "checked");
    $(WEIGHTS_SHOW_ALWAYS_SIDE).removeProp("checked");
    $(WEIGHTS_HIDE_SIDE).removeProp("checked");

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).addClass("selected");
    $(WEIGHTS_SHOW_ALWAYS_CLASS).removeClass("selected");
    $(WEIGHTS_HIDE_CLASS).removeClass("selected");
};

const synchronizeShowAllWeights = () => {
    $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_SHOW_ALWAYS_MENU + " span").addClass("glyphicon-ok");
    $(WEIGHTS_HIDE_MENU + " span").removeClass("glyphicon-ok");

    $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).removeProp("checked");
    $(WEIGHTS_SHOW_ALWAYS_SIDE).prop("checked", "checked");
    $(WEIGHTS_HIDE_SIDE).removeProp("checked");

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).removeClass("selected");
    $(WEIGHTS_SHOW_ALWAYS_CLASS).addClass("selected");
    $(WEIGHTS_HIDE_CLASS).removeClass("selected");
};

const synchronizeHideAllWeights = () => {
    $(WEIGHTS_SHOW_MOUSE_OVER_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_SHOW_ALWAYS_MENU + " span").removeClass("glyphicon-ok");
    $(WEIGHTS_HIDE_MENU + " span").addClass("glyphicon-ok");

    $(WEIGHTS_SHOW_MOUSE_OVER_SIDE).removeProp("checked");
    $(WEIGHTS_SHOW_ALWAYS_SIDE).removeProp("checked");
    $(WEIGHTS_HIDE_SIDE).prop("checked", "checked");

    $(WEIGHTS_SHOW_MOUSE_OVER_CLASS).removeClass("selected");
    $(WEIGHTS_SHOW_ALWAYS_CLASS).removeClass("selected");
    $(WEIGHTS_HIDE_CLASS).addClass("selected");
};

// Viewport
const synchronizeViewportSizeSmall = () => {
    $(VIEWPORT_SIZE_S_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_M_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_L_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_FIT_DROPDOWN + " span").removeClass("glyphicon-ok");

    $(VIEWPORT_SIZE_S_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_M_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_L_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_FIT_SIDEBAR).removeProp("checked");

    $(VIEWPORT_SIZE_S_SIDEBAR).prop("checked", "checked");
    $(VIEWPORT_SIZE_S_DROPDOWN + " span").addClass("glyphicon-ok");
};

const synchronizeViewportSizeMedium = () => {
    $(VIEWPORT_SIZE_S_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_M_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_L_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_FIT_DROPDOWN + " span").removeClass("glyphicon-ok");

    $(VIEWPORT_SIZE_S_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_M_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_L_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_FIT_SIDEBAR).removeProp("checked");

    $(VIEWPORT_SIZE_M_SIDEBAR).prop("checked", "checked");
    $(VIEWPORT_SIZE_M_DROPDOWN + " span").addClass("glyphicon-ok");
};

const synchronizeViewportSizeLarge = () => {
    $(VIEWPORT_SIZE_S_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_M_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_L_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_FIT_DROPDOWN + " span").removeClass("glyphicon-ok");

    $(VIEWPORT_SIZE_S_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_M_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_L_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_FIT_SIDEBAR).removeProp("checked");

    $(VIEWPORT_SIZE_L_SIDEBAR).prop("checked", "checked");
    $(VIEWPORT_SIZE_L_DROPDOWN + " span").addClass("glyphicon-ok");
};

const synchronizeViewportSizeFit = () => {
    $(VIEWPORT_SIZE_S_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_M_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_L_DROPDOWN + " span").removeClass("glyphicon-ok");
    $(VIEWPORT_SIZE_FIT_DROPDOWN + " span").removeClass("glyphicon-ok");

    $(VIEWPORT_SIZE_S_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_M_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_L_SIDEBAR).removeProp("checked");
    $(VIEWPORT_SIZE_FIT_SIDEBAR).removeProp("checked");

    $(VIEWPORT_SIZE_FIT_SIDEBAR).prop("checked", "checked");
    $(VIEWPORT_SIZE_FIT_DROPDOWN + " span").addClass("glyphicon-ok");
};

const updateViewportSize = currentValue => {
    // These values are bound to the layout dimensions of the GRNsight website.
    const WIDTH_OFFSET = 250;
    const HEIGHT_OFFSET = 53;

    let container = $(".grnsight-container");

    const fitContainer = dimensions => {
        const fitWidth = dimensions ? dimensions.width - WIDTH_OFFSET : container.width();
        const fitHeight = dimensions
            ? dimensions.height - dimensions.top - HEIGHT_OFFSET
            : container.height();

        container.css({
            width: fitWidth,
            height: fitHeight,
        });
    };

    const fitContainerToWindow = () => {
        fitContainer({
            width: $(window).width(),
            height: $(window).height(),
            top: 0,
        });
    };

    const requestWindowDimensions = () => {
        // We send a message if we are in an iframe, and manipulate directly if we aren’t.
        if (window === window.top) {
            fitContainerToWindow();
        } else {
            window.top.postMessage("dimensions", HOST_SITE);
        }
    };

    let grnsightContainerClass = `grnsight-container ${currentValue}`;
    if (!container.hasClass(currentValue)) {
        container.attr("class", grnsightContainerClass);
        if (currentValue === VIEWPORT_FIT) {
            requestWindowDimensions();
        } else {
            container.css({ width: "", height: "" });
        }
    }

    // Added synchronization
    if (currentValue === VIEWPORT_S) {
        synchronizeViewportSizeSmall();
    } else if (currentValue === VIEWPORT_M) {
        synchronizeViewportSizeMedium();
    } else if (currentValue === VIEWPORT_L) {
        synchronizeViewportSizeLarge();
    } else if (currentValue === VIEWPORT_FIT) {
        fitContainer(grnState.dimensions);
        synchronizeViewportSizeFit();
    } else if (currentValue === VIEWPORT_INIT) {
        // First time around: initialize.
        requestWindowDimensions();
    }
};

// Expression DB Functions
const startLoadingIcon = function () {
    $(EXPRESSION_DB_LOADER).css("display", "block");
    $(EXPRESSION_DB_LOADER_TEXT).css("display", "block");
};
const stopLoadingIcon = function () {
    $(EXPRESSION_DB_LOADER).css("display", "none");
    $(EXPRESSION_DB_LOADER_TEXT).css("display", "none");
};
const enableNodeColoringUI = function () {
    grnState.nodeColoring.nodeColoringEnabled = true;
    $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).removeClass("hidden");
    $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON).removeClass("hidden");
    $(LOG_FOLD_CHANGE_MAX_VALUE_HEADER).removeClass("hidden");
};

const adjustGeneNameForExpression = function (gene) {
    const geneName = gene.name;
    return grnState.workbook.meta.data.workbookType === NETWORK_PPI_MODE && geneName.endsWith("p")
        ? geneName.slice(0, -1)
        : geneName;
};

const loadExpressionDatabase = function (isTopDataset) {
    const dataset = isTopDataset
        ? grnState.nodeColoring.topDataset
        : grnState.nodeColoring.bottomDataset;
    startLoadingIcon();
    queryExpressionDatabase({
        type: "ExpressionTimePoints",
        dataset,
    })
        .then(function (timepointsResponse) {
            queryExpressionDatabase({
                type: "ExpressionData",
                dataset,
                genes: grnState.workbook.genes.map(adjustGeneNameForExpression).join(","),
                timepoints: timepointsResponse[dataset],
            })
                .then(function (response) {
                    if (isTopDataset) {
                        grnState.workbook.expression[grnState.nodeColoring.topDataset] = response;
                    } else {
                        grnState.workbook.expression[grnState.nodeColoring.bottomDataset] =
                            response;
                    }
                    enableNodeColoringUI();
                    stopLoadingIcon();
                    updaters.renderNodeColoring();
                })
                .catch(function (error) {
                    console.log(error.stack);
                    console.log(error.name);
                    console.log(error.message);
                });
        })
        .catch(function (error) {
            console.log(error.stack);
            console.log(error.name);
            console.log(error.message);
        });
};

// Sliders Functions
const updateSliderState = slidersLocked => {
    const forceGraphDisabled = grnState.graphLayout === GRID_LAYOUT || slidersLocked;
    if (forceGraphDisabled) {
        $(RESET_SLIDERS_MENU).parent().addClass("disabled");
        $(UNDO_SLIDERS_RESET_MENU).parent().addClass("disabled");
        $(LINK_DIST_CLASS).parent().addClass("disabled");
        $(CHARGE_CLASS).parent().addClass("disabled");
    } else {
        $(RESET_SLIDERS_MENU).parent().removeClass("disabled");
        $(UNDO_SLIDERS_RESET_MENU).parent().removeClass("disabled");
        $(LINK_DIST_CLASS).parent().removeClass("disabled");
        $(CHARGE_CLASS).parent().removeClass("disabled");
    }

    $(LINK_DIST_SLIDER_SIDEBAR).prop("disabled", forceGraphDisabled);
    $(CHARGE_SLIDER_SIDEBAR).prop("disabled", forceGraphDisabled);
    $(RESET_SLIDERS_SIDEBAR).prop("disabled", forceGraphDisabled);

    if (slidersLocked) {
        $(`${LOCK_SLIDERS_MENU} span`).removeClass("invisible").addClass("glyphicon-ok");
    } else {
        $(`${LOCK_SLIDERS_MENU} span`).removeClass("glyphicon-ok").addClass("invisible");
    }

    $(LOCK_SLIDERS_BUTTON).prop("checked", slidersLocked);

    if (!grnState.showUndoReset) {
        $(UNDO_SLIDERS_RESET_SIDEBAR).prop("disabled", true);
    }
};

export const modifyChargeParameter = value => {
    grnState.simulation.force("charge").strength(value);
    grnState.simulation.alpha(1);
};

export const modifyLinkDistanceParameter = value => {
    grnState.simulation.force("link").distance(value);
    grnState.simulation.alpha(1);
};

const updateChargeSliderValues = () => {
    if (grnState.workbook !== null) {
        modifyChargeParameter(grnState.chargeSlider.currentVal);
    }
    $(CHARGE_VALUE).text(grnState.chargeSlider.currentVal);
    $(CHARGE_MENU).val(grnState.chargeSlider.currentVal);
    $(CHARGE_SLIDER_SIDEBAR).val(grnState.chargeSlider.currentVal);
    $(CHARGE_SLIDER_SIDEBAR).html(
        grnState.chargeSlider.currentVal +
            (grnState.chargeSlider.needsAppendedZeros &&
            grnState.chargeSlider.currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO
                ? "0"
                : "")
    );
};

const updateLinkDistanceSliderValues = () => {
    if (grnState.workbook !== null) {
        modifyLinkDistanceParameter(grnState.linkDistanceSlider.currentVal);
    }
    $(LINK_DIST_VALUE).text(grnState.linkDistanceSlider.currentVal);
    $(LINK_DIST_MENU).val(grnState.linkDistanceSlider.currentVal);
    $(LINK_DIST_SLIDER_SIDEBAR).val(grnState.linkDistanceSlider.currentVal);
    $(LINK_DIST_SLIDER_SIDEBAR).html(
        grnState.linkDistanceSlider.currentVal +
            (grnState.linkDistanceSlider.needsAppendedZeros &&
            grnState.linkDistanceSlider.currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO
                ? "0"
                : "")
    );
};

// Grid Layout Functions
const expandLayoutSidebar = () => {
    $(LAYOUT_SIDEBAR_PANEL).addClass("in");
};

export const hasExpressionData = sheets => {
    return Object.keys(sheets).some(property => property.match(ENDS_IN_EXPRESSION_REGEXP));
};

const updatetoForceGraph = () => {};

const updatetoGridLayout = () => {};

// Node Coloring Functions
const showNodeColoringMenus = () => {
    $(NODE_COLORING_SIDEBAR_PANEL).removeClass("disabled");
    $(NODE_COLORING_SIDEBAR_PANEL).addClass("in");
    $(NODE_COLORING_MENU).removeClass("disabled");
    $(NODE_COLORING_MENU_CLASS).removeClass("disabled");
    $(NODE_COLORING_SIDEBAR_HEADER_LINK).attr("data-toggle", "collapse");
};

const disableNodeColoringMenus = () => {
    $(NODE_COLORING_SIDEBAR_PANEL).addClass("disabled");
    $(NODE_COLORING_SIDEBAR_PANEL).removeClass("in");
    $(NODE_COLORING_MENU_CLASS).addClass("disabled");
    $(NODE_COLORING_MENU).addClass("disabled");
    $(NODE_COLORING_SIDEBAR_HEADER_LINK).attr("data-toggle", "");
};

const isNewWorkbook = name => {
    return grnState.nodeColoring.lastDataset === null || grnState.nodeColoring.lastDataset !== name;
};

// Workbook Mode Functions
const updateModeViews = () => {
    // Select correct dropdown item
    const workbookMode =
        grnState.mode === NETWORK_GRN_MODE
            ? "Gene Regulatory Network"
            : "Protein-Protein Interaction";
    $(NETWORK_MODE_MENU).text(workbookMode);
    $(NETWORK_MODE_INFO).text(workbookMode);
};

const resetDemoDropdown = () => {
    $("#demoSourceDropdown option").removeAttr("selected");
    $("#demoSourceDropdown").val("none");
};

const checkWorkbookModeSettings = () => {
    const hasExpression = hasExpressionData(grnState.workbook.expression);

    if (grnState.mode === NETWORK_PPI_MODE || !hasExpression) {
        grnState.nodeColoring.nodeColoringEnabled = false;
        grnState.nodeColoring.showMenu = true;
        grnState.colorOptimal = false;
        showNodeColoringMenus();
        hideEdgeWeightOptions();
        updateModeViews();
    } else if (grnState.mode === NETWORK_GRN_MODE) {
        grnState.nodeColoring.nodeColoringEnabled = true;
        grnState.nodeColoring.showMenu = true;
        grnState.colorOptimal = true;
        showNodeColoringMenus();
        showEdgeWeightOptions();
        updateModeViews();
    }
};

$("body").on("click", () => {
    if (grnState.workbook) {
        if (grnState.mode === NETWORK_PPI_MODE) {
            $(EXPORT_TO_UNWEIGHTED_GML_MENU).addClass("disabled");
        } else if (grnState.mode === NETWORK_GRN_MODE) {
            $(EXPORT_TO_UNWEIGHTED_GML_MENU).removeClass("disabled");
        }
    }
});

const shortenExpressionSheetName = name => {
    return name.length > MAX_NUM_CHARACTERS_DROPDOWN
        ? name.slice(0, MAX_NUM_CHARACTERS_DROPDOWN) + "..."
        : name;
};

const updateSpeciesMenu = () => {
    $(SPECIES_DISPLAY).val(grnState.genePageData.species);
    $(SPECIES_BUTTON_CRESS + " span").removeClass("glyphicon-ok");
    $(SPECIES_BUTTON_FLY + " span").removeClass("glyphicon-ok");
    $(SPECIES_BUTTON_HUMAN + " span").removeClass("glyphicon-ok");
    $(SPECIES_BUTTON_YEAST + " span").removeClass("glyphicon-ok");
    $(SPECIES_BUTTON_NEMATODE + " span").removeClass("glyphicon-ok");
    $(SPECIES_BUTTON_MOUSE + " span").removeClass("glyphicon-ok");
    if ($(SPECIES_DISPLAY).val() === "Arabidopsis_thaliana") {
        $(SPECIES_BUTTON_CRESS + " span").addClass("glyphicon-ok");
    }
    if ($(SPECIES_DISPLAY).val() === "Drosophila_melanogaster") {
        $(SPECIES_BUTTON_FLY + " span").addClass("glyphicon-ok");
    }
    if ($(SPECIES_DISPLAY).val() === "Caenorhabditis_elegans") {
        $(SPECIES_BUTTON_NEMATODE + " span").addClass("glyphicon-ok");
    }
    if ($(SPECIES_DISPLAY).val() === "Homo_sapiens") {
        $(SPECIES_BUTTON_HUMAN + " span").addClass("glyphicon-ok");
    }
    if ($(SPECIES_DISPLAY).val() === "Mus_musculus") {
        $(SPECIES_BUTTON_MOUSE + " span").addClass("glyphicon-ok");
    }
    if ($(SPECIES_DISPLAY).val() === "Saccharomyces_cerevisiae") {
        $(SPECIES_BUTTON_YEAST + " span").addClass("glyphicon-ok");
    }
};

// helper method to check if the given data, a taxon id or a species name
// is contained within the identified species, if it exists at all.
export const identifySpeciesMenu = data => {
    var nameTax = grnState.nameToTaxon;
    for (var n in nameTax) {
        if (Object.values(nameTax[n]).includes(data.toString())) {
            grnState.genePageData.commonName = n;
            grnState.genePageData.species = nameTax[n].spec;
            grnState.genePageData.taxonJaspar = nameTax[n].jaspar;
            grnState.genePageData.taxonUniprot = nameTax[n].uniprot;
            grnState.genePageData.ensembl = nameTax[n].ensembl;
            grnState.genePageData.mine = nameTax[n].mine;
            $(SPECIES_DISPLAY).val(grnState.genePageData.species);
            updateSpeciesMenu();
            return grnState.genePageData.identified;
        }
    }
    return false;
};

const identifySpeciesOrTaxon = data => {
    var nameTax = grnState.nameToTaxon;
    for (var n in nameTax) {
        if (n === data) {
            // <-- change if to work
            grnState.genePageData.commonName = n;
            grnState.genePageData.species = nameTax[n].spec;
            grnState.genePageData.taxonJaspar = nameTax[n].jaspar.toString();
            grnState.genePageData.taxonUniprot = nameTax[n].uniprot.toString();
            grnState.genePageData.identified = true;
            grnState.genePageData.ensembl = nameTax[n].ensembl;
            grnState.genePageData.mine = nameTax[n].mine;
            $(SPECIES_DISPLAY).val(grnState.genePageData.species);
            updateSpeciesMenu();
            return grnState.genePageData.identified;
        }
        for (var t in Object.values(nameTax[n])) {
            if (Object.values(nameTax[n])[t] === data) {
                grnState.genePageData.commonName = n;
                grnState.genePageData.species = nameTax[n].spec;
                grnState.genePageData.taxonJaspar = nameTax[n].jaspar.toString();
                grnState.genePageData.taxonUniprot = nameTax[n].uniprot.toString();
                grnState.genePageData.identified = true;
                grnState.genePageData.ensembl = nameTax[n].ensembl;
                grnState.genePageData.mine = nameTax[n].mine;
                $(SPECIES_DISPLAY).val(grnState.genePageData.species);
                updateSpeciesMenu();
                return grnState.genePageData.identified;
            }
        }
    }
    return false;
};

// renderNodeColoring: function () { }, // defined in graph.js

const clearDropdownMenus = () => {
    $(TOP_DATASET_SELECTION_SIDEBAR).html("");
    $(BOTTOM_DATASET_SELECTION_SIDEBAR).html("");
    $(TOP_DATASET_SELECTION_MENU).html("");
    $(BOTTOM_DATASET_SELECTION_MENU).html("");
};

const resetDatasetDropdownMenus = workbook => {
    clearDropdownMenus();
    $(".dataset-option").remove(); // clear all menu dataset options

    grnState.nodeColoring.nodeColoringOptions.workbookExpressions = [];
    grnState.nodeColoring.nodeColoringOptions.databaseExpressions = [];

    var createHTMLforDataset = function (groupLabel, items) {
        let html = `
            <li class="dataset-group-label">
              <strong>${groupLabel}</strong>
            </li>`;
        items.forEach(name => {
            html += `
              <li class=\"dataset-option node-coloring-menu\" value=\"${name}\">
              <a data-expression=\"${name}\">
                  <span class=\"glyphicon\"></span>
                  &nbsp;${name}
              </a>
              </li>`;
        });
        return html;
    };

    for (var property in workbook.expression) {
        if (property.match(ENDS_IN_EXPRESSION_REGEXP)) {
            grnState.nodeColoring.nodeColoringOptions.workbookExpressions.push({
                value: property,
            });
        }
    }

    // Add expression database options
    grnState.database.expressionDatasets.forEach(option =>
        grnState.nodeColoring.nodeColoringOptions.databaseExpressions.push({
            value: [option],
        })
    );

    $(BOTTOM_DATASET_SELECTION_SIDEBAR).append(
        $("<option>").attr("value", "Same as Top Dataset").text("Same as Top Dataset")
    );

    $(BOTTOM_DATASET_SELECTION_MENU).append(
        createHTMLforDataset("Same as Top Dataset", ["Same as Top Dataset"])
    );

    // $(DATA_SET_SELECT).append($("<option>").attr("value", "Dahlquist").text("Dahlquist"));

    const addOptionsToDropdown = (options, groupLabel) => {
        let topOptgroup = $("<optgroup>").attr("label", groupLabel);
        let bottomOptgroup = $("<optgroup>").attr("label", groupLabel);
        const datasetValues = options.map(o => o.value).filter(Boolean);
        datasetValues.forEach(name => {
            var shortenedSheetName = shortenExpressionSheetName(name);
            let topOption = $("<option>")
                .addClass("dataset-option")
                .attr("value", name)
                .text(shortenedSheetName);
            let bottomOption = $("<option>")
                .addClass("dataset-option")
                .attr("value", name)
                .text(shortenedSheetName);
            topOptgroup.append(topOption);
            bottomOptgroup.append(bottomOption);
        });
        $(TOP_DATASET_SELECTION_SIDEBAR).append(topOptgroup);
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).append(bottomOptgroup);
        const groupHTML = createHTMLforDataset(groupLabel, datasetValues);
        $(TOP_DATASET_SELECTION_MENU).append(groupHTML);
        $(BOTTOM_DATASET_SELECTION_MENU).append(groupHTML);
    };

    // Add Workbook Expressions
    if (grnState.workbookType === "upload") {
        addOptionsToDropdown(
            grnState.nodeColoring.nodeColoringOptions.workbookExpressions,
            "User-uploaded"
        );
    } else {
        addOptionsToDropdown(grnState.nodeColoring.nodeColoringOptions.workbookExpressions, "Demo");
    }

    // Always add database expressions
    addOptionsToDropdown(
        grnState.nodeColoring.nodeColoringOptions.databaseExpressions,
        "Expression Database"
    );
    $("#topDatasetDropdownMenu li a span").first().addClass("glyphicon-ok");
    $("#bottomDatasetDropdownMenu li a span").first().addClass("glyphicon-ok");
};

const updateLogFoldChangeMaxValue = () => {
    var value = logFoldChangeMaxValueInputValidation(grnState.nodeColoring.logFoldChangeMaxValue);
    $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT).val(value);
    $(LOG_FOLD_CHANGE_MAX_VALUE_MENU).val(value);
    updaters.renderNodeColoring();
};

const removeAllChecksFromMenuDatasetOptions = id => {
    $(`${id} li a span`).each(function () {
        $(this).removeClass("glyphicon-ok");
    });
};

const updateTopDataset = () => {
    $(TOP_DATASET_SELECTION_SIDEBAR).val(grnState.nodeColoring.topDataset);
    removeAllChecksFromMenuDatasetOptions(TOP_DATASET_SELECTION_MENU);
    $(
        `${TOP_DATASET_SELECTION_MENU} li[value='${grnState.nodeColoring.topDataset}'] a span`
    ).addClass("glyphicon-ok");
    updaters.renderNodeColoring();
};

const updateBottomDataset = () => {
    if (grnState.nodeColoring.bottomDataSameAsTop) {
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).val("Same as Top Dataset");
        removeAllChecksFromMenuDatasetOptions(BOTTOM_DATASET_SELECTION_MENU);
        $(`${BOTTOM_DATASET_SELECTION_MENU} li[value='${"Same as Top Dataset"}'] a span`).addClass(
            "glyphicon-ok"
        );
    } else {
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).val(grnState.nodeColoring.bottomDataset);
        removeAllChecksFromMenuDatasetOptions(BOTTOM_DATASET_SELECTION_MENU);

        $(
            `${BOTTOM_DATASET_SELECTION_MENU} li[value='${grnState.nodeColoring.bottomDataset}'] a span`
        ).addClass("glyphicon-ok");
    }

    updaters.renderNodeColoring();
};

if (!grnState.genePageData.identified) {
    $(SPECIES_DISPLAY).val(grnState.genePageData.species);
}

export const updateApp = grnState => {
    if (grnState.newWorkbook) {
        checkWorkbookModeSettings();
        grnState.normalizationMax = max(
            grnState.workbook.positiveWeights.concat(grnState.workbook.negativeWeights)
        );
        displayworkbook(grnState.workbook, grnState.name);
        expandLayoutSidebar();
        clearDropdownMenus();
        // check if the species has been identified yet, if not try to identify it
        // also checks if the areas have been populated at all
        var workbookSpecies = grnState.workbook.meta.species;
        var workbookTaxon = grnState.workbook.meta.taxon_id;
        if (identifySpeciesOrTaxon(workbookSpecies) || identifySpeciesOrTaxon(workbookTaxon)) {
            identifySpeciesOrTaxon(workbookSpecies);
            identifySpeciesOrTaxon(workbookTaxon);
        }

        // nodeColoringEnabled will only be set the very first time; because otherwise the user will have
        // made a choice and we will let the choice stick.
        if (hasExpressionData(grnState.workbook.expression)) {
            resetDatasetDropdownMenus(grnState.workbook);
            if (grnState.nodeColoring.nodeColoringEnabled === undefined) {
                grnState.nodeColoring.nodeColoringEnabled = true;
            }

            if (isNewWorkbook(name)) {
                grnState.nodeColoring.showMenu = true;
                grnState.nodeColoring.lastDataset = name;
                showNodeColoringMenus();
            }
            grnState.nodeColoring.topDataset = $(TOP_DATASET_SELECTION_SIDEBAR)
                .find(":selected")
                .attr("value");
            if (
                $(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value") ===
                "Same as Top Dataset"
            ) {
                grnState.nodeColoring.bottomDataset = grnState.nodeColoring.topDataset;
                grnState.nodeColoring.bottomDataSameAsTop = true;
            } else {
                grnState.nodeColoring.bottomDataset = $(BOTTOM_DATASET_SELECTION_SIDEBAR)
                    .find(":selected")
                    .attr("value");
                grnState.nodeColoring.bottomDataSameAsTop = false;
            }
        } else {
            if (grnState.nodeColoring.nodeColoringEnabled === undefined) {
                grnState.nodeColoringEnabled = false;
            }
        }
        if (!grnState.demoDropdownValue) {
            resetDemoDropdown();
        }

        refreshApp();

        // Rare exception to the MVC cycle: right now we have no way of knowing whether the workbook has changed
        // (which is what necessitates displayworkbook), so we mark the model here.
        grnState.newWorkbook = false;
    }

    synchronizeNormalizationValues(grnState.normalizationMax);
    synchronizeGrayEdgeValues(grnState.grayEdgeThreshold);

    // Dashed Line Synchronization
    if (grnState.dashedLine) {
        $(GREY_EDGES_DASHED_MENU + " span").addClass("glyphicon-ok");
        $(GREY_EDGES_DASHED_MENU).prop("checked", "checked");
        $(GREY_EDGES_DASHED_SIDEBAR).prop("checked", "checked");
    } else {
        $(GREY_EDGES_DASHED_MENU + " span").removeClass("glyphicon-ok");
        $(GREY_EDGES_DASHED_MENU).removeProp("checked");
        $(GREY_EDGES_DASHED_SIDEBAR).removeProp("checked");
    }

    // Weights functions
    if (grnState.edgeWeightDisplayOption === SHOW_WEIGHTS_MOUSEOVER) {
        synchronizeShowWeightsMouseover();
    } else if (grnState.edgeWeightDisplayOption === SHOW_ALL_WEIGHTS) {
        synchronizeShowAllWeights();
    } else if (grnState.edgeWeightDisplayOption === HIDE_ALL_WEIGHTS) {
        synchronizeHideAllWeights();
    }

    // Enable/Disable Colored edges
    $(COLOR_EDGES_SIDEBAR).prop("checked", grnState.colorOptimal);
    const classFunction = `${grnState.colorOptimal ? "add" : "remove"}Class`;
    $(COLOR_EDGES_MENU)[classFunction](ACTIVE_COLOR_OPTION);
    $(`${COLOR_EDGES_MENU}>span`)[classFunction]("glyphicon-ok");

    // Graph Layout
    if (grnState.graphLayout === FORCE_GRAPH) {
        updatetoForceGraph();
    } else if (grnState.graphLayout === GRID_LAYOUT) {
        updatetoGridLayout();
    }

    // Viewport
    updateViewportSize(grnState.viewportSize);

    // Node Coloring
    if (
        grnState.workbook !== null &&
        grnState.nodeColoring.nodeColoringEnabled &&
        hasExpressionData(grnState.workbook.expression)
    ) {
        grnState.nodeColoring.showMenu = true;
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).prop("checked", true);
        $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).prop("checked", true);
        $(`${NODE_COLORING_TOGGLE_MENU} span`).addClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).prop("checked", true);
        $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).val(DEFAULT_MAX_LOG_FOLD_CHANGE);
        $(NODE_COLORING_SIDEBAR_BODY).removeClass("hidden");
        $(NODE_COLORING_MENU).removeClass("hidden");
        $(NODE_COLORING_NAVBAR_OPTIONS).removeClass("hidden");
        if (grnState.mode === NETWORK_PPI_MODE) {
            displayPPINodeColorWarning(grnState.ppiNodeColorWarningDisplayed);
            grnState.ppiNodeColorWarningDisplayed = true;
        }
        if (
            grnState.database.expressionDatasets.includes(grnState.nodeColoring.topDataset) &&
            grnState.workbook.expression[grnState.nodeColoring.topDataset] === undefined
        ) {
            if ($(NODE_COLORING_TOGGLE_SIDEBAR).prop("checked")) {
                loadExpressionDatabase(true);
            }
        } else if (
            grnState.database.expressionDatasets.includes(grnState.nodeColoring.bottomDataset) &&
            !grnState.nodeColoring.bottomDataSameAsTop &&
            grnState.workbook.expression[grnState.nodeColoring.bottomDataset] === undefined
        ) {
            if (!grnState.nodeColoring.bottomDataSameAsTop) {
                loadExpressionDatabase(false);
            }
        } else {
            updaters.renderNodeColoring();
        }
    } else if (
        grnState.workbook !== null &&
        !hasExpressionData(grnState.workbook.expression) &&
        grnState.nodeColoring.nodeColoringEnabled
    ) {
        if (
            grnState.workbook.expression[grnState.nodeColoring.topDataset] === undefined ||
            (!grnState.nodeColoring.bottomDataSameAsTop &&
                grnState.workbook.expression[grnState.nodeColoring.bottomDataset] === undefined)
        ) {
            updaters.removeNodeColoring();
            resetDatasetDropdownMenus(grnState.workbook);
        }
        grnState.nodeColoring.showMenu = true;
        grnState.nodeColoring.topDataset = grnState.nodeColoring.topDataset
            ? grnState.nodeColoring.topDataset
            : "Dahlquist_2018_wt";
        grnState.nodeColoring.bottomDataset = grnState.nodeColoring.bottomDataset
            ? grnState.nodeColoring.bottomDataset
            : "Dahlquist_2018_wt";
        $(NODE_COLORING_TOGGLE_SIDEBAR).prop("checked", true);
        $(`${NODE_COLORING_TOGGLE_MENU} span`).addClass("glyphicon-ok");
        $(NODE_COLORING_SIDEBAR_BODY).removeClass("hidden");
        $(NODE_COLORING_MENU).removeClass("hidden");
        $(NODE_COLORING_NAVBAR_OPTIONS).removeClass("hidden");
        $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).val(DEFAULT_MAX_LOG_FOLD_CHANGE);
        $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).addClass("hidden");
        $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_BUTTON).addClass("hidden");
        $(LOG_FOLD_CHANGE_MAX_VALUE_HEADER).addClass("hidden");
        if ($(NODE_COLORING_TOGGLE_SIDEBAR).prop("checked")) {
            if (grnState.workbook.expression[grnState.nodeColoring.topDataset] === undefined) {
                loadExpressionDatabase(true);
            } else if (
                !grnState.nodeColoring.bottomDataSameAsTop &&
                grnState.workbook.expression[grnState.nodeColoring.bottomDataset] === undefined
            ) {
                loadExpressionDatabase(false);
            } else {
                enableNodeColoringUI();
                // There is as problem here! When a dataset from the database is used to do node coloring,
                // but then the layout of the graph is changed (force graph to grid layout, for instance),
                // node coloring goes away, seemingly inexplicably.
                // !!!!! TEMPORARY WORKAROUND:
                //   Calling `updaters.renderNodeColoring()` inline does not succeed; instead, a delay
                //   has to take place, done here via `setTimeout`.
                //
                //   The delay is built-in to the cases where a query has to happen first.
                //
                //   For some reason, calling updates.renderNodeColoring() _synchronously_ does not
                //   actually perform the node coloring.
                //
                //   Investigate why a timeout is required in order for node coloring to take place
                //   successfully in this case.
                setTimeout(() => updaters.renderNodeColoring(), 250);
            }
            if (grnState.mode === NETWORK_PPI_MODE) {
                displayPPINodeColorWarning(grnState.ppiNodeColorWarningDisplayed);
                grnState.ppiNodeColorWarningDisplayed = true;
            }
        }
    } else if (grnState.workbook !== null && !grnState.nodeColoring.nodeColoringEnabled) {
        $(NODE_COLORING_SIDEBAR_BODY).addClass("hidden");
        $(NODE_COLORING_MENU).addClass("disabled");
        $(NODE_COLORING_NAVBAR_OPTIONS).addClass("hidden");
        $(`${NODE_COLORING_TOGGLE_MENU} span`).removeClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).prop("checked", false);
        if (grnState.mode === NETWORK_PPI_MODE) {
            grnState.ppiNodeColorWarningDisplayed = false;
        }
    }

    if (grnState.workbook !== null && grnState.workbook.sheetType === "weighted") {
        showEdgeWeightOptions();
    } else if (grnState.workbook !== null && grnState.workbook.sheetType === "unweighted") {
        hideEdgeWeightOptions();
    } else {
        hideEdgeWeightOptions();
    }

    if (grnState.nodeColoring.averageTopDataset) {
        $(AVG_REPLICATE_VALS_TOP_MENU + " span").addClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_TOP_MENU).prop("checked", "checked");
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).prop("checked", "checked");
        updaters.renderNodeColoring();
    } else {
        $(AVG_REPLICATE_VALS_TOP_MENU + " span").removeClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_TOP_MENU).removeProp("checked");
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).removeProp("checked");
        updaters.renderNodeColoring();
    }

    if (grnState.nodeColoring.averageBottomDataset) {
        $(AVG_REPLICATE_VALS_BOTTOM_MENU + " span").addClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_BOTTOM_MENU).prop("checked", "checked");
        $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).prop("checked", "checked");

        updaters.renderNodeColoring();
    } else {
        $(AVG_REPLICATE_VALS_BOTTOM_MENU + " span").removeClass("glyphicon-ok");
        $(AVG_REPLICATE_VALS_BOTTOM_MENU).removeProp("checked");
        $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).removeProp("checked");

        updaters.renderNodeColoring();
    }

    if (grnState.nodeColoring.showMenu) {
        showNodeColoringMenus();
    } else {
        disableNodeColoringMenus();
    }

    updateLogFoldChangeMaxValue();
    updateTopDataset();
    updateBottomDataset();
    updateSliderState(grnState.slidersLocked);

    if (grnState.showUndoReset) {
        $(UNDO_SLIDERS_RESET_SIDEBAR).prop("disabled", false);
        $(UNDO_SLIDERS_RESET_MENU).parent().removeClass("disabled");
    } else {
        $(UNDO_SLIDERS_RESET_SIDEBAR).prop("disabled", true);
        $(UNDO_SLIDERS_RESET_MENU).parent().addClass("disabled");
    }

    updateChargeSliderValues();
    updateLinkDistanceSliderValues();

    $(ZOOM_CONTROL).prop({ disabled: !grnState.workbook });
    if (!grnState.workbook) {
        // Set initial values when there is no workbook: this is necessarily explicit because Firefox
        // preserves these values even upon a browser reload.
        $(ZOOM_INPUT).val(ZOOM_DISPLAY_MIDDLE);
        $(ZOOM_SLIDER).val(ZOOM_ADAPTIVE_MAX_SCALE);
    }

    if (grnState.workbook != null) {
        $("#gridLayout").removeClass("disabled");
        $("#gridLayoutButton").removeClass("disabled");
    }
    refreshApp();
};

export { stopLoadingIcon, startLoadingIcon, adjustGeneNameForExpression };
