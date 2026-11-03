import {
    CREATE_NETWORK_CLASS,
    CREATE_NETWORK_MODAL,
    NETWORK_PPI_MODE,
    NETWORK_GRN_MODE,
} from "./constants";
import {
    queryNetworkDatabase,
    queryProteinProteinDatabase,
    uploadCustomWorkbook,
} from "./api/grnsight-api";
import { grnState } from "./grnstate";

export const generateNetwork = function () {
    const GENE_EXCEPTIONS = {
        "DUR1,2": "DUR12",
        "IMP2'": "IMP21",
        "ARG5,6": "ARG56",
        "ADE5,7": "ADE57",
        "MF(ALPHA)1": "YPL187W",
        "MF(ALPHA)2": "YGL089C",
    };
    const createHTMLforForm = (sources, source, networkType) => {
        const geneProtein = networkType === NETWORK_PPI_MODE ? "protein" : "gene";
        let result = `
            <div id=\'generateNetworkFormContainer\' '>
                <h2 id=\'generateNetwork\'>Generate Network</h2>
                <p>Warning: changing network type or source will clear the list of selected genes or proteins below.</p>
                <div class=\'form-group\' id=\'getNetworkTypeForm\'>
                    <label for=\'network-type\' id=\'network-type-label\'>Network Type</label>
                    <select class=\'network-dropdown btn btn-default\' id=\'network-type\'>
                        <option value=\'grn\' ${geneProtein === "gene" ? "selected=\'true\'" : ""}>Gene Regulatory</option>
                        <option value=\'protein-protein-physical-interaction\' ${geneProtein === "protein" ? "selected=\'true\'" : ""}>Protein-Protein Physical Interactions</option>
                    </select>
                </div>
                <div class=\'form-group\' id=\'getNetworkSourceForm\'>
                    <label for=\'network-source\' id=\'network-source-label\'>Network Source</label>
                    <select class=\'network-dropdown btn btn-default\' id=\'network-source\'>
            `;
        if (sources.length !== 1) {
            for (let source in sources) {
                result += `
                            <option value=\'${sources[source]}\' ${
                                source === sources[source] ? "\'selected=\'true" : ""
                            }\'>${sources[source]}</option>
                `;
            }
        } else {
            result += `
                        <option value=\'${sources[0]}\' selected=\'true\' disabled hidden>${sources[0]}</option>
            `;
        }
        result += `</select>
                </div>
        <div class='form-group' id='getNetworkStrainForm'>
            <label for='network-strain-toggle' id='network-strain-label'>Strain</label>
            <div class='multiselect-row'>
                <div class='dropdown multiselect-dropdown' id='network-strain'>
                    <button type='button' class='btn btn-default dropdown-toggle' id='network-strain-toggle'
                            data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                        <span id='network-strain-text'>Multiple options selected</span>
                        <span class='caret'></span>
                    </button>
                    <ul class='dropdown-menu multiselect-menu' id='network-strain-menu' data-multiselect='network-strain'>
                        <li><a href='#' class='multiselect-select-all' id='network-strain-select-all'
                            data-multiselect='network-strain'>Select all</a></li>
                        <li><a href='#' class='multiselect-clear' id='network-strain-clear'
                            data-multiselect='network-strain'>Clear</a></li>
                        <li role='separator' class='divider'></li>
                        <li><a href='#' class='multiselect-option selected' data-value='S288c'>S288C</a></li>
                        <li><a href='#' class='multiselect-option selected' data-value='Other'>Other</a></li>
                        <li><a href='#' class='multiselect-option selected' data-value='W303'>W303</a></li>
                        <li><a href='#' class='multiselect-option selected' data-value='CENPK'>CENPK</a></li>
                        <li><a href='#' class='multiselect-option selected' data-value='SK1'>SK1</a></li>
                        <li><a href='#' class='multiselect-option selected' data-value='Sigma1278b'>Sigma1278b</a></li>
                        <li><a href='#' class='multiselect-option selected' data-value='SEY6210'>SEY6210</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class='form-group' id='getNetworkAnnotationForm'>
            <label for='network-annotation-toggle' id='network-annotation-label'>Annotation Type</label>
            <div class='multiselect-row'>
                <div class='dropdown multiselect-dropdown' id='network-annotation'>
                    <button type='button' class='btn btn-default dropdown-toggle' id='network-annotation-toggle'
                            data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                        <span id='network-annotation-text'>Multiple options selected</span>
                        <span class='caret'></span>
                    </button>
                    <ul class='dropdown-menu multiselect-menu' id='network-annotation-menu' data-multiselect='network-annotation'>
                        <li><a href='#' class='multiselect-option selected' data-value='high-throughput'>High-throughput</a></li>
                        <li><a href='#' class='multiselect-option selected' data-value='manually-curated'>Manually curated</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class=\'form-group\' id=\'getNetworkGenesForm\'>
            <form id=\'getNetworkGenesForm\' class=\'NetworkGenesForm\' >
                <label for=\'network-search-bar\' id=\'network-source-label\'>Select ${geneProtein}</label>
                <input type=\'text\' id=\'network-search-bar\' name=\'network-search-bar\'></input>
                <button id=\'enter-search\' type=\'submit\' class=\'search-button btn btn-default\'>
                    <span class=\'glyphicon glyphicon-search\'></span>
                </button>
            </form>
        </div>
        <div id=\'selected-genes-container\'>
            <p>Added ${geneProtein}s go below! Click on a ${geneProtein} to remove it.</p>
            <div id=\'selected-genes\'>
            </div>
        `;
        return result;
    };
    const createGeneButtons = function () {
        let result = `<div id=\'selected-genes\'>
                        <div id=\'custom-network-genes-container\'>
        `;
        for (let gene in grnState.customWorkbook.genes) {
            const primaryName =
                grnState.customWorkbook.type === NETWORK_GRN_MODE
                    ? grnState.customWorkbook.genes[gene]
                    : gene;
            const secondaryName =
                grnState.customWorkbook.type === NETWORK_GRN_MODE
                    ? gene
                    : `${grnState.customWorkbook.genes[gene].displayGeneID} | ${grnState.customWorkbook.genes[gene].geneID}`;
            result += `
                <div class=\'custom-network-gene\' id=${gene}>
                    <p class=\'custom-network-gene-display-id\'>
                        ${primaryName}
                    </p>
                    <p class=\'custom-network-gene-id\'>
                        (${secondaryName})
                    </p>
                </div>
            `;
        }

        result += "</div></div>";
        return result;
    };
    const displayCurrentGenes = function () {
        $("#selected-genes").remove();
        $("#selected-genes-container").append(createGeneButtons());
        for (let gene in grnState.customWorkbook.genes) {
            $(`#${gene}`).on("click", ev => {
                ev.stopPropagation();
                $(`#${gene}`).remove();
                delete grnState.customWorkbook.genes[gene];
            });
        }
    };

    const validGene = function (gene) {
        if (/^[A-Z0-9_-]{1,12}$/.test(gene)) {
            return gene;
        }
        if (Object.keys(GENE_EXCEPTIONS).includes(gene)) {
            return GENE_EXCEPTIONS[gene];
        }
        return "";
    };
    const addGene = function () {
        const userGeneProtein =
            grnState.customWorkbook.type === NETWORK_GRN_MODE ? "Gene" : "Protein";
        const searchGeneProtein = `${$("#network-search-bar").val()}`;
        $("#network-search-bar").val("");
        const geneProtein = validGene(searchGeneProtein.toUpperCase());
        if (geneProtein === "") {
            alert(`${userGeneProtein}: "${searchGeneProtein}" is not to GRNsight specifications. ${userGeneProtein}s must be 12 characters or less,
containing "-", "_", and alpha-numeric characters only`);
        } else {
            let source = grnState.customWorkbook.source;
            if (grnState.customWorkbook.type === NETWORK_GRN_MODE) {
                let headers = {
                    type: "NetworkGeneFromSource",
                    gene: geneProtein,
                    source: grnState.customWorkbook.sources.geneRegulation[source].source,
                    timestamp: grnState.customWorkbook.sources.geneRegulation[source].timestamp,
                };
                queryNetworkDatabase(headers)
                    .then(function (response) {
                        if (response.geneId && response.displayGeneId) {
                            grnState.customWorkbook.genes[response.geneId] = response.displayGeneId;
                            displayCurrentGenes();
                        } else {
                            alert(
                                `${userGeneProtein}: "${searchGeneProtein}" was not found in this database. Please check for any typos and try again.`
                            );
                        }
                    })
                    .catch(function (error) {
                        console.log(error.stack);
                        console.log(error.name);
                        console.log(error.message);
                    });
            } else if (grnState.customWorkbook.type === NETWORK_PPI_MODE) {
                let headers = {
                    type: "NetworkFromGeneProtein",
                    geneProtein: geneProtein,
                    source: grnState.customWorkbook.sources.proteinProteinInteractions[source]
                        .source,
                    timestamp:
                        grnState.customWorkbook.sources.proteinProteinInteractions[source]
                            .timestamp,
                };
                queryProteinProteinDatabase(headers)
                    .then(function (response) {
                        if (response.standardName && response.displayGeneId && response.geneId) {
                            grnState.customWorkbook.genes[response.standardName] = {
                                displayGeneID: response.displayGeneId,
                                geneID: response.geneId,
                            };
                            displayCurrentGenes();
                        } else {
                            alert(
                                `${userGeneProtein}: "${searchGeneProtein}" was not found in this database. Please check for any typos and try again.`
                            );
                        }
                    })
                    .catch(function (error) {
                        console.log(error.stack);
                        console.log(error.name);
                        console.log(error.message);
                    });
            }
        }
    };

    const createHTMLforModalButtons = () => {
        return `
            <div id=\'generateNetworkFooter\' class=\'modal-footer-div\'>
                <div>
                    <input type=\'button\' class=\'btn btn-default\' id=\'submit-network\' value=\'Generate Network\'/>
                    <input type=\'button\' class=\'btn btn-default\' data-dismiss=\'modal\' value=\'Cancel\'  />
                </div>
            </div>
        `;
    };

    const displayGenerateNetworkModal = function () {
        $("#generateNetworkFormContainer").remove();
        $("#generateNetworkFooter").remove();
        $("#generateNetworkFooter-container").append(createHTMLforModalButtons());
        grnState.customWorkbook = {
            genes: {},
            strains: [],
            annotationTypes: [],
            type: NETWORK_GRN_MODE,
            source: null,
            sources: {
                proteinProteinInteractions: null,
                geneRegulation: null,
            },
        };
        // get sources from database
        queryProteinProteinDatabase({ type: "NetworkSource" })
            .then(function (response) {
                grnState.customWorkbook.sources.proteinProteinInteractions = response.sources;
            })
            .catch(function (error) {
                console.log(error.stack);
                console.log(error.name);
                console.log(error.message);
            });
        queryNetworkDatabase({ type: "NetworkSource" })
            .then(function (response) {
                grnState.customWorkbook.sources.geneRegulation = response.sources;
                grnState.customWorkbook.source =
                    Object.keys(response.sources).length >= 1
                        ? Object.keys(response.sources)[0]
                        : null;
                $("#generateNetworkQuestions-container").append(
                    createHTMLforForm(
                        Object.keys(response.sources),
                        grnState.customWorkbook.source,
                        grnState.customWorkbook.type
                    )
                );
                updateMultiselectUI("network-strain");
                updateMultiselectUI("network-annotation");
            })
            .catch(function (error) {
                console.log(error.stack);
                console.log(error.name);
                console.log(error.message);
            });
        $(CREATE_NETWORK_MODAL).modal("show");
    };

    const GRN_STANDARD_NAME_ID = 1;
    const PPI_STANDARD_NAME_ID = 0;

    const sortGenes = function (genes, idToSort) {
        return Object.entries(genes).sort((a, b) => a[idToSort].localeCompare(b[idToSort]));
    };

    $("body").on("click", CREATE_NETWORK_CLASS, function (event) {
        event.preventDefault();
        event.stopPropagation();
        displayGenerateNetworkModal();
    });
    $("body").on("change", "#network-type", function (event) {
        grnState.customWorkbook.type = $("#network-type").val();
        grnState.customWorkbook.genes = {};
        if (grnState.customWorkbook.type === NETWORK_PPI_MODE) {
            grnState.customWorkbook.source =
                Object.keys(grnState.customWorkbook.sources.proteinProteinInteractions).length >= 1
                    ? Object.keys(grnState.customWorkbook.sources.proteinProteinInteractions)[0]
                    : null;
            $("#generateNetworkFormContainer").remove();
            $("#generateNetworkQuestions-container").append(
                createHTMLforForm(
                    Object.keys(grnState.customWorkbook.sources.proteinProteinInteractions),
                    grnState.customWorkbook.source,
                    grnState.customWorkbook.type
                )
            );
        } else if (grnState.customWorkbook.type === NETWORK_GRN_MODE) {
            grnState.customWorkbook.source =
                Object.keys(grnState.customWorkbook.sources.proteinProteinInteractions).length >= 1
                    ? Object.keys(grnState.customWorkbook.sources.geneRegulation)[0]
                    : null;
            $("#generateNetworkFormContainer").remove();
            $("#generateNetworkQuestions-container").append(
                createHTMLforForm(
                    Object.keys(grnState.customWorkbook.sources.geneRegulation),
                    grnState.customWorkbook.source,
                    grnState.customWorkbook.type
                )
            );
        }
        updateMultiselectUI("network-strain");
        updateMultiselectUI("network-annotation");
        event.stopPropagation();
        displayCurrentGenes();
    });
    $("body").on("change", "#network-source", function (event) {
        grnState.customWorkbook.source = $("#network-source").val();
        grnState.customWorkbook.genes = {};
        event.stopPropagation();
        displayCurrentGenes();
    });
    const MULTISELECT_CONFIG = {
        "network-strain": {
            stateKey: "strains",
            placeholder: "Select strain(s)",
            defaultValue: "S288c",
        },
        "network-annotation": {
            stateKey: "annotationTypes",
            placeholder: "Select annotation type(s)",
        },
    };

    const ensureSelection = id => {
        const config = MULTISELECT_CONFIG[id];
        const $options = $(`#${id}-menu .multiselect-option`);
        if ($options.filter(".selected").length > 0) {
            return;
        }
        let $fallback = $options.filter(`[data-value="${config.defaultValue}"]`);
        if ($fallback.length === 0) {
            $fallback = $options.first();
        }
        $fallback.addClass("selected");
    };

    const updateMultiselectUI = id => {
        const config = MULTISELECT_CONFIG[id];
        ensureSelection(id);

        const $options = $(`#${id}-menu .multiselect-option`);
        const $selected = $options.filter(".selected");
        const values = $selected
            .map(function () {
                return $(this).attr("data-value");
            })
            .get();
        const labels = $selected
            .map(function () {
                return $(this).text();
            })
            .get();
        grnState.customWorkbook[config.stateKey] = values;

        let text;
        if (labels.length === 1) {
            text = labels[0];
        } else if ($options.length === labels.length) {
            text = "All"
        }
        else if (labels.length >= 2) {
            text = "Multiple items selected";
        }
        $(`#${id}-text`).text(text);

        // Select all is disabled when everything is selected.
        $(`#${id}-select-all`).parent().toggleClass("disabled", labels.length === $options.length);

        // Clear is disabled when only the default option is already selected.
        const onlyDefault =
            labels.length === 1 && values[0] === config.defaultValue;
        $(`#${id}-clear`).parent().toggleClass("disabled", onlyDefault);
    };

    $("body").on("click", ".multiselect-menu .multiselect-option", function (event) {
        event.preventDefault();
        event.stopPropagation(); // keeps the dropdown open so multiple options can be picked
        const $option = $(this);
        const $menu = $option.closest(".multiselect-menu");

        // Never allow the last selected option to be deselected
        if ($option.hasClass("selected") && $menu.find(".multiselect-option.selected").length === 1) {
            return;
        }
        $option.toggleClass("selected");
        updateMultiselectUI($menu.attr("data-multiselect"));
    });

    $("body").on("click", ".multiselect-select-all", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const id = $(this).attr("data-multiselect");
        $(`#${id}-menu .multiselect-option`).addClass("selected");
        updateMultiselectUI(id);
    });

    $("body").on("click", ".multiselect-clear", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const id = $(this).attr("data-multiselect");
        const config = MULTISELECT_CONFIG[id];
        const $options = $(`#${id}-menu .multiselect-option`);
        $options.removeClass("selected");
        $options.filter(`[data-value="${config.defaultValue}"]`).addClass("selected");
        updateMultiselectUI(id); // ensureSelection covers a missing default value
    });
    $("body").on("click", "#submit-network", function () {
        let genesAmount = Object.keys(grnState.customWorkbook.genes).length;
        if (genesAmount === 0) {
            alert("Network must have at least 1 gene");
        } else if (genesAmount > 75) {
            alert(`GRNsight is only capable of handling 75 genes at most. Your proposed network contains
 ${genesAmount} genes. Please remove some genes from your proposed network.`);
        } else {
            if (grnState.customWorkbook.type === NETWORK_GRN_MODE) {
                const sortedGenes = sortGenes(grnState.customWorkbook.genes, GRN_STANDARD_NAME_ID);
                const genes = sortedGenes.map(([key]) => key);
                const displayGenes = sortedGenes.map(([_, value]) => value);
                const source = grnState.customWorkbook.source;
                // const strain = grnState.customWorkbook.strain;
                const headers = {
                    type: "GenerateNetwork",
                    genes: genes.join(","),
                    source: grnState.customWorkbook.sources.geneRegulation[source].source,
                    timestamp: grnState.customWorkbook.sources.geneRegulation[source].timestamp,
                };
                queryNetworkDatabase(headers)
                    .then(function (response) {
                        grnState.customWorkbook.links = response.links;
                        const links = Object.entries(grnState.customWorkbook.links);
                        const genesAmount = genes.length;
                        const edgesAmount = links.flatMap(entry =>
                            entry[1].map(target => [entry[0], target])
                        ).length;
                        if (edgesAmount > 100) {
                            alert(`GRNsight is only capable of handling 100 edges at most. Your proposed network contains
    ${edgesAmount} regulatory connections. Please remove some genes from your proposed network.`);
                        } else {
                            const name = `GRN (${grnState.customWorkbook.source}; ${genesAmount} genes, ${edgesAmount} edges)`;
                            const l = [];
                            for (let link of links) {
                                const r = link[0];
                                for (let t of link[1]) {
                                    l.push(
                                        `${grnState.customWorkbook.genes[r]}->${grnState.customWorkbook.genes[t]}`
                                    );
                                }
                            }
                            const workbook = {
                                name,
                                genes: displayGenes,
                                links: l.join(","),
                                networkType: grnState.customWorkbook.type,
                            };
                            uploadCustomWorkbook(workbook, grnState);
                            $(CREATE_NETWORK_MODAL).modal("hide");
                        }
                    })
                    .catch(function (error) {
                        console.log(error.stack);
                        console.log(error.name);
                        console.log(error.message);
                    });
            } else if (grnState.customWorkbook.type === NETWORK_PPI_MODE) {
                const sortedGenes = sortGenes(grnState.customWorkbook.genes, PPI_STANDARD_NAME_ID);
                const proteins = sortedGenes.map(([key]) => key);
                const source = grnState.customWorkbook.source;
                const headers = {
                    type: "GenerateProteinNetwork",
                    proteins: proteins.join(","),
                    source: grnState.customWorkbook.sources.proteinProteinInteractions[source]
                        .source,
                    timestamp:
                        grnState.customWorkbook.sources.proteinProteinInteractions[source]
                            .timestamp,
                };
                queryProteinProteinDatabase(headers)
                    .then(function (response) {
                        grnState.customWorkbook.links = response.links;
                        const links = Object.entries(grnState.customWorkbook.links);
                        const proteinsAmount = proteins.length;
                        const edgesAmount = links.flatMap(entry =>
                            entry[1].map(target => [entry[0], target])
                        ).length;
                        if (edgesAmount > 100) {
                            alert(`GRNsight is only capable of handling 100 edges at most. Your proposed network contains
    ${edgesAmount} physical interactions. Please remove some proteins from your proposed network.`);
                        } else {
                            const name = `PPI (${grnState.customWorkbook.source}; ${proteinsAmount} proteins, ${edgesAmount} edges)`;
                            const l = [];
                            for (let link of links) {
                                const p1 = link[0];
                                for (let p2 of link[1]) {
                                    l.push(`${p1}->${p2}`);
                                }
                            }
                            const workbook = {
                                name,
                                genes: proteins,
                                links: l.join(","),
                                networkType: grnState.customWorkbook.type,
                            };
                            uploadCustomWorkbook(workbook, grnState);
                            $(CREATE_NETWORK_MODAL).modal("hide");
                        }
                    })
                    .catch(function (error) {
                        console.log(error.stack);
                        console.log(error.name);
                        console.log(error.message);
                    });
            }
        }
    });

    $("body").on("click", "#enter-search", function (event) {
        try {
            event.preventDefault();
            event.stopPropagation();
            addGene();
        } catch (error) {
            console.log(error);
        }
    });
};
