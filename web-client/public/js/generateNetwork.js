/* eslint-disable max-len */
import {CREATE_NETWORK_CLASS, CREATE_NETWORK_MODAL} from "./constants";
import { queryNetworkDatabase, uploadCustomWorkbook } from "./api/grnsight-api";
import { grnState } from "./grnstate";

export const generateNetwork = function () {
    const GENE_EXCEPTIONS = {
        "DUR1,2" : "DUR12",
        "IMP2'" : "IMP21",
        "ARG5,6" : "ARG56",
        "ADE5,7" : "ADE57",
        "MF(ALPHA)1" : "YPL187W",
        "MF(ALPHA)2" : "YGL089C"
    };
    const createHTMLforForm = (sources, selected) => {
        let result =  `
            <div id=\'generateNetworkFormContainer\' '>
                <h2 id=\'generateNetwork\'>Generate Network</h2>
                <div class=\'form-group\'>
                    <label for=\'network-source\' id=\'network-source-label\'>Network Source</label>
                    <select class=\'network-dropdown btn btn-default\' id=\'network-source\'>
            `;
        if (sources.length !== 1) {
            for (let source in sources) {
                result += `
                            <option value=\'${sources[source]} ${selected == sources[source]?"\'selected=\'true":"" }\'>${sources[source]}</option>
                `;
            }
        } else {
            result += `
                        <option value=\'${sources[0]}\' selected=\'true\' disabled hidden>${sources[0]}</option>
            `;
        }
        result += `</select>
                   <p>Warning: changing network source will clear the list of genes below.</p>
                </div>
        <div class=\'form-group\' id=\'getNetworkGenesForm\'>
            <form id=\'getNetworkGenesForm\' class=\'NetworkGenesForm\' >
                <label for=\'network-search-bar\' id=\'network-source-label\'>Select genes</label>
                <input type=\'text\' id=\'network-search-bar\' name=\'network-search-bar\'></input>
                <button id=\'enter-search\' type=\'submit\' class=\'search-button btn btn-default\'>
                    <span class=\'glyphicon glyphicon-search\'></span>
                </button>
            </form>
        </div>
        <div id=\'selected-genes-container\'>
            <div id=\'selected-genes\'>
                <p>Added genes go here! Click on a gene to remove it.</p>
            </div>
        `;
        return result;
    };
    const createGeneButtons = function () {
        let result =  `<div id=\'selected-genes\'>
                        <p>Added genes go below! Click on a gene to remove it.</p>
                        <div id=\'custom-network-genes-container\'>
        `;
        for (let gene in grnState.customWorkbook.genes) {
            result += `
                <div class=\'custom-network-gene\' id=${gene}>
                    <p class=\'custom-network-gene-display-id\'>
                        ${grnState.customWorkbook.genes[gene]}
                    </p>
                    <p class=\'custom-network-gene-id\'>
                        (${gene})
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
            $(`#${gene}`).on("click", (ev) => {
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
        const searchGene = `${$("#network-search-bar").val()}`.toUpperCase();
        $("#network-search-bar").val("");
        const gene = validGene(searchGene);
        if (gene === "") {
            alert(`Gene: ${searchGene} is not to GRNsight specifications. Genes must be 12 characters or less,
containing "-", "_", and alpha-numeric characters only`);
        } else {
            let source = grnState.customWorkbook.source;
            let headers = {
                type:"NetworkGeneFromSource",
                gene: gene,
                source:grnState.customWorkbook.sources[source].source,
                timestamp:grnState.customWorkbook.sources[source].timestamp
            };
            queryNetworkDatabase(headers).then(function (response) {
                if (response.geneId !== null && response.displayGeneId !== null) {
                    grnState.customWorkbook.genes[response.geneId] = response.displayGeneId;
                    displayCurrentGenes();
                } else {
                    alert(
                        `Gene: ${searchGene} was not found in this database. Please check for any typos and try again.`
                    );
                }
            }).catch(function (error) {
                console.log(error.stack);
                console.log(error.name);
                console.log(error.message);
            });

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
            genes : {},
            source : null,
            sources : null
        };
    // get sources from database
        queryNetworkDatabase({type:"NetworkSource"}).then(function (response) {
            grnState.customWorkbook.sources = response.sources;
            grnState.customWorkbook.source = Object.keys(response.sources).length >= 1 ?
                Object.keys(response.sources)[0] : null;
            $("#generateNetworkQuestions-container").append(createHTMLforForm(Object.keys(response.sources), grnState.customWorkbook.source));
        }).catch(function (error) {
            console.log(error.stack);
            console.log(error.name);
            console.log(error.message);
        });
        $(CREATE_NETWORK_MODAL).modal("show");
    };

    $("body").on("click", CREATE_NETWORK_CLASS, function (event) {
        event.preventDefault();
        event.stopPropagation();
        displayGenerateNetworkModal();
    });

    $("body").on("change", "#network-source", function (event) {
        grnState.customWorkbook.source = $("#network-source").val();
        grnState.customWorkbook.genes = {};
        event.stopPropagation();
        displayCurrentGenes();
    });
    $("body").on("click", "#submit-network", function () {
        let genesAmount = Object.keys(grnState.customWorkbook.genes).length;
        if (genesAmount === 0 ) {
            alert("Network must have at least 1 gene");
        } else if (genesAmount > 75) {
            alert(`GRNsight is only capable of handling 75 genes at most. Your proposed network contains
 ${genesAmount} genes. Please remove some genes from your proposed network.`);
        } else {
            const genes = Object.keys(grnState.customWorkbook.genes);
            const display_genes = Object.keys(grnState.customWorkbook.genes).map(g => grnState.customWorkbook.genes[g]);
            const source = grnState.customWorkbook.source;
            const headers = {
                type:"GenerateNetwork",
                genes: genes.join(","),
                source:grnState.customWorkbook.sources[source].source,
                timestamp:grnState.customWorkbook.sources[source].timestamp
            };
            queryNetworkDatabase(headers).then(function (response) {
                grnState.customWorkbook.links = response.links;
                const links = Object.entries(grnState.customWorkbook.links);
                const genesAmount = genes.length;
                const edgesAmount = links.flatMap( (entry) => entry[1].map((target) => [entry[0], target])).length;
                if (edgesAmount > 100) {
                    alert(`GRNsight is only capable of handling 100 edges at most. Your proposed network contains
 ${edgesAmount} regulatory connections. Please remove some genes from your proposed network.`);
                } else {
                    const name = `GRN(${grnState.customWorkbook.source};${genesAmount} genes, ${edgesAmount} edges)`;
                    const l = []
                    for (let link of links){
                        const r = link[0];
                        for (let t of link[1]) {
                            l.push(`${grnState.customWorkbook.genes[r]}->${grnState.customWorkbook.genes[t]}`)
                        }
                    }
                    const workbook = {name, genes: display_genes, links : l.join(",")};
                    uploadCustomWorkbook(workbook, grnState);
                    $(CREATE_NETWORK_MODAL).modal("hide");
                }
            }).catch(function (error) {
                console.log(error.stack);
                console.log(error.name);
                console.log(error.message);
            });
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
