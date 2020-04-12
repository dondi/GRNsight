import { drawGraph, updaters } from "./graph";
import { uploadState } from "./upload";
import { displayWarnings } from "./warnings";
import { max } from "d3-array";
import { grnState } from "./grnstate";

import {
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
  EXPRESSION_DB_MENU,
  GRID_LAYOUT_MENU,
  FORCE_GRAPH_MENU,
  LAYOUT_SIDEBAR_PANEL,
  NODE_COLORING_MENU,
  NODE_COLORING_TOGGLE_MENU,
  NODE_COLORING_MENU_CLASS,
  NODE_COLORING_SIDEBAR_BODY,
  DATA_SIDEBAR_BODY,
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
  NODE_COLORING_USING_EXPRESSION_DATA,
  EXPRESSION_DB_MENU_HEADER_LINK,
  EXPRESSION_DB_SIDEBAR_PANEL,
  SPECIES_IDENTIFIED_ICON_DISPLAY,
  SPECIES_DISPLAY,
  SPECIES_BUTTON_YEAST,
  SPECIES_BUTTON_HUMAN,
  SPECIES_BUTTON_FLY,
  SPECIES_BUTTON_NEMATODE,
  SPECIES_BUTTON_MOUSE,
  SPECIES_BUTTON_CRESS,
} from "./constants";

// In this transitory state, updateApp might get called before things are completely set up, so for now
// we define this wrapper function that guards against uninitialized values.
const refreshApp = () => {
    if (uploadState && uploadState.currentNetwork) {
        drawGraph(uploadState.currentNetwork);
    }
};

const displayNetwork = (network, name) => {
    uploadState.currentNetwork = network;
    // console.log("Network: ", network); // Display the network in the console
    $("#graph-metadata").html(network.genes.length + " nodes<br>" + network.links.length + " edges");

    if (network.warnings.length > 0) {
        displayWarnings(network.warnings);
    }

    $("#fileName").text(name); // Set the name of the file to display in the top bar
    $("input[type='range']").off("input"); // I have no idea why I do this. Investigate later.
};

// Value Validators
export const valueValidator = (min, max, value) => {
    return Math.min(max, Math.max(min, value));
};

const edgeWeightNormalizationInputValidation = value => {
    return value ===
    "" ? "" : valueValidator(MIN_EDGE_WEIGHT_NORMALIZATION, MAX_EDGE_WEIGHT_NORMALIZATION, value);
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

// Sliders Functions
const updateSliderState = slidersLocked => {
    const forceGraphDisabled = grnState.graphLayout === GRID_LAYOUT || slidersLocked;
    if (forceGraphDisabled) {
        $(`${LOCK_SLIDERS_MENU} span`).removeClass("invisible").addClass("glyphicon-ok");
        $(RESET_SLIDERS_MENU).parent().addClass("disabled");
        $(UNDO_SLIDERS_RESET_MENU).parent().addClass("disabled");
        $(LINK_DIST_CLASS).parent().addClass("disabled");
        $(CHARGE_CLASS).parent().addClass("disabled");
    } else {
        $(`${LOCK_SLIDERS_MENU} span`).removeClass("glyphicon-ok").addClass("invisible");
        $(RESET_SLIDERS_MENU).parent().removeClass("disabled");
        $(UNDO_SLIDERS_RESET_MENU).parent().removeClass("disabled");
        $(LINK_DIST_CLASS).parent().removeClass("disabled");
        $(CHARGE_CLASS).parent().removeClass("disabled");
    }

    $(LINK_DIST_SLIDER_SIDEBAR).prop("disabled", forceGraphDisabled);
    $(CHARGE_SLIDER_SIDEBAR).prop("disabled", forceGraphDisabled);
    $(RESET_SLIDERS_SIDEBAR).prop("disabled", forceGraphDisabled);
    $(LOCK_SLIDERS_BUTTON).prop("checked", slidersLocked);

    if (!grnState.showUndoReset) {
        $(UNDO_SLIDERS_RESET_SIDEBAR).prop("disabled", true);
    }
};

export const modifyChargeParameter = (value) => {
    grnState.simulation.force("charge").strength(value);
    grnState.simulation.alpha(1);
};

export const modifyLinkDistanceParameter = (value) => {
    grnState.simulation.force("link").distance(value);
    grnState.simulation.alpha(1);
};

const updateChargeSliderValues = () => {
    if (grnState.network !== null) {
        modifyChargeParameter(grnState.chargeSlider.currentVal);
    }
    $(CHARGE_VALUE).text(grnState.chargeSlider.currentVal);
    $(CHARGE_MENU).val(grnState.chargeSlider.currentVal);
    $(CHARGE_SLIDER_SIDEBAR).val(grnState.chargeSlider.currentVal);
    $(CHARGE_SLIDER_SIDEBAR).html(grnState.chargeSlider.currentVal +
        ((grnState.chargeSlider.needsAppendedZeros &&
            grnState.chargeSlider.currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO) ? "0" : ""));
};

const updateLinkDistanceSliderValues = () => {
    if (grnState.network !== null) {
        modifyLinkDistanceParameter(grnState.linkDistanceSlider.currentVal);
    }
    $(LINK_DIST_VALUE).text(grnState.linkDistanceSlider.currentVal);
    $(LINK_DIST_MENU).val(grnState.linkDistanceSlider.currentVal);
    $(LINK_DIST_SLIDER_SIDEBAR).val(grnState.linkDistanceSlider.currentVal);
    $(LINK_DIST_SLIDER_SIDEBAR).html(grnState.linkDistanceSlider.currentVal +
        ((grnState.linkDistanceSlider.needsAppendedZeros &&
            grnState.linkDistanceSlider.currentVal.toString().length === GRAVITY_LENGTH_WITHOUT_ZERO) ? "0" : ""));
};


const speciesIdenified = () => {
    if (grnState.genePageData.identified) {
        $(SPECIES_IDENTIFIED_ICON_DISPLAY).removeClass("glyphicon-remove");
        $(SPECIES_IDENTIFIED_ICON_DISPLAY).addClass("glyphicon-ok");
    }
    $(SPECIES_IDENTIFIED_ICON_DISPLAY).removeClass("glyphicon-remove");
    $(SPECIES_IDENTIFIED_ICON_DISPLAY).addClass("glyphicon-ok");
};


// Grid Layout Functions
const expandLayoutSidebar = () => {
    $(LAYOUT_SIDEBAR_PANEL).addClass("in");
};

const toggleLayout = (on, off) => {
    if (!$(on).prop("checked")) {
        $(on).prop("checked", true);
        $(off).prop("checked", false);
        $(`${off} span`).removeClass("glyphicon-ok");
        $(`${on} span`).addClass("glyphicon-ok");
    }
};

const updatetoForceGraph = () => {
    $(LOCK_SLIDERS_BUTTON).removeAttr("disabled");
    toggleLayout(FORCE_GRAPH_MENU, GRID_LAYOUT_MENU);
};

const updatetoGridLayout = () => {
    $(LOCK_SLIDERS_BUTTON).attr("disabled", true);
    toggleLayout(GRID_LAYOUT_MENU, FORCE_GRAPH_MENU);
};

// Node Coloring Functions
const showNodeColoringMenus = () => {
    $(NODE_COLORING_SIDEBAR_PANEL).removeClass("disabled");
    $(NODE_COLORING_SIDEBAR_PANEL).addClass("in");
    $(NODE_COLORING_MENU).removeClass("disabled");
    $(NODE_COLORING_MENU_CLASS).removeClass("disabled");
    $(NODE_COLORING_SIDEBAR_HEADER_LINK).attr("data-toggle", "collapse");
};

const showDataMenu = () => {
    $(EXPRESSION_DB_SIDEBAR_PANEL).removeClass("disabled");
    $(EXPRESSION_DB_SIDEBAR_PANEL).addClass("in");
    $(EXPRESSION_DB_MENU).removeClass("disabled");
    $(EXPRESSION_DB_MENU_HEADER_LINK).attr("data-toggle", "collapse");
}

const disableNodeColoringMenus = () => {
    $(NODE_COLORING_SIDEBAR_PANEL).addClass("disabled");
    $(NODE_COLORING_SIDEBAR_PANEL).removeClass("in");
    $(NODE_COLORING_MENU).addClass("disabled");
    $(NODE_COLORING_MENU_CLASS).addClass("disabled");
    $(NODE_COLORING_SIDEBAR_HEADER_LINK).attr("data-toggle", "");
};

const disableDataMenu = () => {
    $(EXPRESSION_DB_SIDEBAR_PANEL).addClass("disabled");
    $(EXPRESSION_DB_SIDEBAR_PANEL).removeClass("in");
    $(EXPRESSION_DB_MENU).addClass("disabled");
    $(EXPRESSION_DB_MENU_HEADER_LINK).attr("data-toggle", "collapse");
}

const isNewWorkbook = (name) => {
    return grnState.nodeColoring.lastDataset === null || grnState.nodeColoring.lastDataset !== name;
};

const shortenExpressionSheetName = (name) => {
    return (name.length > MAX_NUM_CHARACTERS_DROPDOWN) ?
      (name.slice(0, MAX_NUM_CHARACTERS_DROPDOWN) + "...") : name;
};

const hasExpressionData = (sheets) => {
    // grnState.nodeColoring.showMenu = true;
    for (var property in sheets) {
        if (property.match(ENDS_IN_EXPRESSION_REGEXP)) {
            // grnState.nodeColoring.showMenu = true;
            return true;
        }
    }
    // grnState.nodeColoring.showMenu = false;
    return false;
};

// helper method to check if the given data, a taxon id or a species name
// is contained within the identified species, if it exists at all.
const identifySpeciesOrTaxon = (data) => {
    if (grnState.genePageData.identified === true) {
        return true;
    }
    var nameTax = grnState.nameToTaxon;
    for (var n in nameTax) {
        if (Object.values(nameTax[n]).includes(data.toString())) {
            grnState.genePageData.commonName = n;
            grnState.genePageData.species = nameTax[n].spec;
            grnState.genePageData.taxonJaspar = nameTax[n].jaspar;
            grnState.genePageData.taxonUniprot = nameTax[n].uniprot;
            grnState.genePageData.identified = true;
            $(SPECIES_DISPLAY).val(grnState.genePageData.species);
            return grnState.genePageData.identified;
        }
    }
    return false;
};

    // renderNodeColoring: function () { }, // defined in graph.js

const clearDropdownMenus = () => {
    $(TOP_DATASET_SELECTION_SIDEBAR).html("");
    $(BOTTOM_DATASET_SELECTION_SIDEBAR).html("");
};

const resetDatasetDropdownMenus = (network) => {
    clearDropdownMenus();
    $(".dataset-option").remove(); // clear all menu dataset options

    var createHTMLforDataset = function (name) {
        return `
            <li class=\"dataset-option node-coloring-menu\" value=\"${name}\">
              <a>
                <span class=\"glyphicon\"></span>
                &nbsp;${name}
              </a>
            </li>`;
    };

    grnState.nodeColoring.nodeColoringOptions = [];
    for (var property in network.expression) {
        if (property.match(ENDS_IN_EXPRESSION_REGEXP)) {
            grnState.nodeColoring.nodeColoringOptions.push({value: property});
        }
    }

    // Add expression database options
    grnState.nodeColoring.nodeColoringOptions.push({value: '(DB) Barreto 2012 wt'});
    grnState.nodeColoring.nodeColoringOptions.push({value: '(DB) Dahlquist 2018 dCIN5'});
    grnState.nodeColoring.nodeColoringOptions.push({value: '(DB) Dahlquist 2018 dGLN3'});
    grnState.nodeColoring.nodeColoringOptions.push({value: '(DB) Dahlquist 2018 dHAP4'});
    grnState.nodeColoring.nodeColoringOptions.push({value: '(DB) Dahlquist 2018 dZAP1'});
    grnState.nodeColoring.nodeColoringOptions.push({value: '(DB) Dahlquist 2018 wt'});
    grnState.nodeColoring.nodeColoringOptions.push({value: '(DB) Kitagawa 2002 wt'});
    grnState.nodeColoring.nodeColoringOptions.push({value: '(DB) Thorsen 2007 wt'});

    $(BOTTOM_DATASET_SELECTION_SIDEBAR).append($("<option>")
            .attr("value", "Same as Top Dataset").text("Same as Top Dataset"));

    $(BOTTOM_DATASET_SELECTION_MENU).append(createHTMLforDataset("Same as Top Dataset"));

    // $(DATA_SET_SELECT).append($("<option>").attr("value", "Dahlquist").text("Dahlquist"));

    grnState.nodeColoring.nodeColoringOptions.forEach(function (option) {
        var shortenedSheetName = shortenExpressionSheetName(option.value);
        $(TOP_DATASET_SELECTION_SIDEBAR).append($("<option>")
              .addClass("dataset-option")
              .attr("value", option.value).text(shortenedSheetName));
        $(TOP_DATASET_SELECTION_MENU)
              .append(createHTMLforDataset(option.value));
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).append($("<option>")
              .addClass("dataset-option")
              .attr("value", option.value).text(shortenedSheetName));
        $(BOTTOM_DATASET_SELECTION_MENU)
              .append(createHTMLforDataset(option.value));
    });

    $("#topDatasetDropdownMenu li a span").first().addClass("glyphicon-ok");
    $("#bottomDatasetDropdownMenu li a span").first().addClass("glyphicon-ok");
};

const updateLogFoldChangeMaxValue = () => {
    var value = logFoldChangeMaxValueInputValidation(grnState.nodeColoring.logFoldChangeMaxValue);
    $(LOG_FOLD_CHANGE_MAX_VALUE_SIDEBAR_INPUT).val(value);
    $(LOG_FOLD_CHANGE_MAX_VALUE_MENU).val(value);
    updaters.renderNodeColoring();
};

const removeAllChecksFromMenuDatasetOptions = (id) => {
    $(`${id} li a span`).each(
        function () {
            $(this).removeClass("glyphicon-ok");
        }
    );
};

const updateTopDataset = () => {
    $(TOP_DATASET_SELECTION_SIDEBAR).val(grnState.nodeColoring.topDataset);
    removeAllChecksFromMenuDatasetOptions(TOP_DATASET_SELECTION_MENU);
    $(`${TOP_DATASET_SELECTION_MENU} li[value='${grnState.nodeColoring.topDataset}'] a span`).addClass("glyphicon-ok");
    updaters.renderNodeColoring();
    // TO DO: If bottomDataSameAsTop make bottom selction "Same As Top"
};

const updateBottomDataset = () => {
    if (grnState.nodeColoring.bottomDataSameAsTop) {
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).val("Same as Top Dataset");
        removeAllChecksFromMenuDatasetOptions(BOTTOM_DATASET_SELECTION_MENU);
        $(`${BOTTOM_DATASET_SELECTION_MENU} li[value='${"Same as Top Dataset"}'] a span`).addClass("glyphicon-ok");
    } else {
        $(BOTTOM_DATASET_SELECTION_SIDEBAR).val(grnState.nodeColoring.bottomDataset);
        removeAllChecksFromMenuDatasetOptions(BOTTOM_DATASET_SELECTION_MENU);
        /* eslint-disable max-len */
        $(`${BOTTOM_DATASET_SELECTION_MENU} li[value='${grnState.nodeColoring.bottomDataset}'] a span`)
            .addClass("glyphicon-ok");
        /* eslint-enable max-len */
    }
    updaters.renderNodeColoring();
};

export const updateApp = grnState => {
    // console.log($(NODE_COLORING_TOGGLE_SIDEBAR).prop("checked"));
    if (grnState.newNetwork) {
        grnState.normalizationMax = max(grnState.network.positiveWeights.concat(grnState.network.negativeWeights));
        displayNetwork(grnState.network, grnState.name);
        expandLayoutSidebar();
        clearDropdownMenus();
        if (hasExpressionData(grnState.network.expression)) {
            resetDatasetDropdownMenus(grnState.network);

            // check if the species has been identified yet, if not try to identify it
            // also checks if the areas have been populated at all
            if (grnState.genePageData.identified === false) {
                if (grnState.network.meta.species !== undefined) {
                    identifySpeciesOrTaxon(grnState.network.meta.species);
                }
                if (grnState.network.meta.taxon_id !== undefined) {
                    identifySpeciesOrTaxon(grnState.network.meta.taxon_id);
                }
            }

            speciesIdenified();

            grnState.nodeColoring.nodeColoringEnabled = true;
            if (isNewWorkbook(name)) {
                grnState.nodeColoring.showMenu = true;
                grnState.nodeColoring.lastDataset = name;
                showNodeColoringMenus();
            }
            grnState.nodeColoring.topDataset = $(TOP_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
            if ($(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value") === "Same as Top Dataset") {
                grnState.nodeColoring.bottomDataset = grnState.nodeColoring.topDataset;
                grnState.nodeColoring.bottomDataSameAsTop = true;
            } else {
                grnState.nodeColoring.bottomDataset =
                  $(BOTTOM_DATASET_SELECTION_SIDEBAR).find(":selected").attr("value");
                grnState.nodeColoring.bottomDataSameAsTop = false;
            }
        } else {
            grnState.nodeColoringEnabled = false;

            // $(NODE_COLORING_USING_EXPRESSION_DATA).addClass("glyphicon-ok");
            // Enable clickability of Coloring with Expression Database tab
            // If that's clicked, pop out the stuff below it (which I will write in upload.jade and then enable once this option is selected)
        }
        refreshApp();

        // Rare exception to the MVC cycle: right now we have no way of knowing whether the network has changed
        // (which is what necessitates displayNetwork), so we mark the model here.
        grnState.newNetwork = false;
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

// Species Menu
    $(SPECIES_BUTTON_YEAST).click(function () {
        grnState.genePageData.identified = false;
        identifySpeciesOrTaxon("Saccharomyces Cerevisiae");
        speciesIdenified();
    });
    $(SPECIES_BUTTON_HUMAN).click(function () {
        grnState.genePageData.identified = false;
        identifySpeciesOrTaxon("Homo Sapien");
        speciesIdenified();
    });
    $(SPECIES_BUTTON_FLY).click(function () {
        grnState.genePageData.identified = false;
        identifySpeciesOrTaxon("Drosophila Melanogaster");
        speciesIdenified();
    });
    $(SPECIES_BUTTON_NEMATODE).click(function () {
        grnState.genePageData.identified = false;
        identifySpeciesOrTaxon("Caenorhabditis Elegans");
        speciesIdenified();
    });
    $(SPECIES_BUTTON_MOUSE).click(function () {
        grnState.genePageData.identified = false;
        identifySpeciesOrTaxon("Mus Musculus");
        speciesIdenified();
    });
    $(SPECIES_BUTTON_CRESS).click(function () {
        grnState.genePageData.identified = false;
        identifySpeciesOrTaxon("Arabidopsis Thaliana");
        speciesIdenified();
    });
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


// Node Coloring
    if (grnState.network !== null && grnState.nodeColoring.nodeColoringEnabled && hasExpressionData(grnState.network.expression)) {
        grnState.nodeColoring.showMenu = true;
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).prop("checked", true);
        $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).prop("checked", true);
        $(`${NODE_COLORING_TOGGLE_MENU} span`).addClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).prop("checked", true);
        $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).val(DEFAULT_MAX_LOG_FOLD_CHANGE);
        $(NODE_COLORING_SIDEBAR_BODY).removeClass("hidden");
        updaters.renderNodeColoring();
    } else if (grnState.network !== null && !hasExpressionData(grnState.network.expression) && grnState.nodeColoring.nodeColoringEnabled){
        $(`${NODE_COLORING_TOGGLE_MENU} span`).removeClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).prop("checked", true);
        $(NODE_COLORING_SIDEBAR_BODY).addClass("hidden");
        updaters.removeNodeColoring();

        console.log("No existing expression data, but we're gonna make it work.");
        grnState.nodeColoring.showMenu = true;
        $(AVG_REPLICATE_VALS_TOP_SIDEBAR).prop("checked", true);
        $(AVG_REPLICATE_VALS_BOTTOM_SIDEBAR).prop("checked", true);
        $(`${NODE_COLORING_TOGGLE_MENU} span`).addClass("glyphicon-ok");
        $(NODE_COLORING_TOGGLE_SIDEBAR).prop("checked", true);
        $(LOG_FOLD_CHANGE_MAX_VALUE_CLASS).val(DEFAULT_MAX_LOG_FOLD_CHANGE);
        $(NODE_COLORING_SIDEBAR_BODY).removeClass("hidden");
        resetDatasetDropdownMenus(grnState.network);
        grnState.nodeColoring.nodeColoringOptions.unshift({value: 'Select Dataset from Expression Database'});
        const responseData = (name, formData) => {
            return new Promise(function(resolve, reject) {
                const uploadRoute = 'expression';
                const fullUrl = [ $("#service-root").val(), uploadRoute ].join("/");
                (formData ?
                    $.ajax({
                        url: fullUrl,
                        data: formData,
                        processData: false,
                        contentType: false,
                        type: "GET",
                        crossDomain: true
                    }) :
                    $.getJSON(fullUrl)
                    ).done((expressionData, textStatus, jqXhr) => {
                        resolve(expressionData);
                        updateApp(grnState);
        
                    }).error(console.log(error));
            })

        };
        console.log(JSON.stringify(grnState));

        async function addExpressionData() {
            try {
                let expressionData = await responseData('expression', '././controllers/database-controller.js');
                grnState.network.expression = expressionData;
                console.log("THE FULL NETWORK: " + JSON.stringify(grnState.network));
                console.log("TOP DATASET: " + JSON.stringify(grnState.nodeColoring));
                grnState.nodeColoring.nodeColoringEnabled = true;
                updaters.renderNodeColoring();
                // Currently having an error where there's no 'data' attribute of grnState.nodeColoring.topDataset
                // What is grnState.nodeColoring.topDataset supposed to look like? How do I fix this so node coloring can happen?
            } catch (error) {
                console.log(error.stack);
                console.log(error.name);
                console.log(error.message);
            }
        }

        addExpressionData();
        
    }

    if (grnState.network !== null &&  grnState.network.sheetType === "weighted") {
        showEdgeWeightOptions();
    } else if (grnState.network !== null &&  grnState.network.sheetType === "unweighted") {
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

    $(ZOOM_CONTROL).prop({ disabled: !grnState.network });
    if (!grnState.network) {
        // Set initial values when there is no network: this is necessarily explicit because Firefox
        // preserves these values even upon a browser reload.
        $(ZOOM_INPUT).val(ZOOM_DISPLAY_MIDDLE);
        $(ZOOM_SLIDER).val(ZOOM_ADAPTIVE_MAX_SCALE);
    }

    refreshApp();
};
