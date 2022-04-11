import {CREATE_NETWORK_CLASS, CREATE_NETWORK_MODAL} from "./constants";
import { queryNetworkDatabase } from "./api/grnsight-api";
import { grnState } from "./grnstate";

export const createNetwork = function () {
    const createHTMLforForm = (sources) => {
        let result =  `
            <form id=\'createNetworkForm\'>
                <h2 id=\'createNetwork\'>Create Network</h2>
        <div class=\'form-group\'>
            <label for=\'network-source\' id=\'network-source-label\'>Network Source</label>
            <select class=\'network-dropdown\' id=\'network-source\'>
                <option value=\'none\' selected=\'true\' disabled hidden>Select Network Source</option> 
                    `;
        for (let source in sources) {
            result += `
                        <option value=\'${source}\'>${sources[source]}</option>
            `;
        }
        result += `</select>
                </div>
        <div class=\'form-group\'>
                    <label for=\'network-search-bar\' id=\'network-source-label\'>Select genes</label>
                    <input type=\'search\' id=\'network-search-bar\' name=\'network-search-bar\'>
            </input>
            <a href=\'#\' id=\'enter-search\' class=\'search-button\'>
            <span class=\'glyphicon glyphicon-search\'></span>
            </a>
        </div>
        <div id=\'selected-genes-container\'>
            <div id=\'selected-genes\'>
                <p>Added genes go here! Click on a gene to remove it</p>
            </div>
        </div>
        <input type=\'button\' id=\'submit-network\' value=\'Create Network\'></input>
            </form
        `;
        return result;
    };
    const createGeneButtons = function () {
        let result =  `<div id=\'selected-genes\'>
                        <p>Added genes go below! Click on a gene to remove it.</p>
                        <div id=\'custom-network-genes-container\'>
        `
        for (let gene of grnState.customWorkbook.genes) {
            result += `
                <div class=\'custom-network-gene\' id=${gene.geneId}>
                    <p class=\'custom-network-gene-display-id\'>
                        ${gene.displayGeneId}
                        <span class=\'custom-network-gene-id\'>(${gene.geneId})</span
                    </p>
                </div>
            `
        }
        
        result += "</div></div>"
        return result
    };
    const displayCurrentGenes = function () {
        $("#selected-genes").remove();
        $("#selected-genes-container").append(createGeneButtons());
        for (let i in grnState.customWorkbook.genes) {
            $(`#${grnState.customWorkbook.genes[i].geneId}`).on("click", (ev) => {
                ev.stopPropagation();
                $(`#${grnState.customWorkbook.genes[i].geneId}`).remove();
                grnState.customWorkbook.genes.splice(i, 1);
            });
        }
    };

    const addGene = function() {
        let gene = `${$("#network-search-bar").val()}`
        $("#network-search-bar").val("")
        // get genes from database
            queryNetworkDatabase({type:"NetworkSource"}).then(function (response) {
                $("#creatNetworkQuestions-container").append(createHTMLforForm(Object.keys(response.sources)));
            }).catch(function (error) {
                console.log(error.stack);
                console.log(error.name);
                console.log(error.message);
            });
    };

    const updateGenes = function () {
        addGene();
        displayCurrentGenes();
    };

    const displayCreateNetworkModal = function () {
        $("#createNetworkForm").remove();
        grnState.customWorkbook = {
            genes : [{geneId: "a", displayGeneId: "A"},
            {geneId: "b", displayGeneId: "B"},
            {geneId: "c", displayGeneId: "C"}]
        };
    // get sources from database
        let sources = queryNetworkDatabase({type:"NetworkSource"});
        queryNetworkDatabase({type:"NetworkSource"}).then(function (response) {
            $("#creatNetworkQuestions-container").append(createHTMLforForm(response.sources));
        }).catch(function (error) {
            console.log(error.stack);
            console.log(error.name);
            console.log(error.message);
        });
        $("#enter-search").on("click", (ev) => {
            ev.stopPropagation();
            updateGenes();
        });
        $("#network-search-bar").on("keydown", (ev) => {
            if(ev.key === 'Enter') {
                ev.preventDefault();
                ev.stopPropagation();
                updateGenes();
            }
        });
        $(CREATE_NETWORK_MODAL).modal("show");
    };

    const performNetworkCreation = function () {
        return function () {
            displayCreateNetworkModal();
        };
    };


    // $(CREATE_NETWORK_CLASS).one("click", performNetworkCreation());
    $("body").on("click", CREATE_NETWORK_CLASS, performNetworkCreation());
};
