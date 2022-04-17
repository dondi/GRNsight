import {CREATE_NETWORK_CLASS, CREATE_NETWORK_MODAL} from "./constants";
import { queryNetworkDatabase } from "./api/grnsight-api";
import { grnState } from "./grnstate";

export const createNetwork = function () {
    const createHTMLforForm = (sources) => {
        let result =  `
            <div id=\'createNetworkFormContainer\' '>
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
                   <p>Warning: changing network source will remove all current genes in network</p>
                </div>
        <div class=\'form-group\' id=\'getNetworkGenesForm\'>
            <form id=\'getNetworkGenesForm\' method=\'post\'>
                <label for=\'network-search-bar\' id=\'network-source-label\'>Select genes</label>
                <input type=\'text\' id=\'network-search-bar\' name=\'network-search-bar\'></input>
                <button id=\'enter-search\' type=\'submit\' class=\'search-button\'>
                    <span class=\'glyphicon glyphicon-search\'></span>
                </button>
            </form>
        </div>
        <div id=\'selected-genes-container\'>
            <div id=\'selected-genes\'>
                <p>Added genes go here! Click on a gene to remove it</p>
            </div>
        </div>
        <input type=\'submit\' id=\'submit-network\' value=\'Create Network\'></input>
            </div>
        `;
        return result;
    };
    const createGeneButtons = function () {
        let result =  `<div id=\'selected-genes\'>
                        <p>Added genes go below! Click on a gene to remove it.</p>
                        <div id=\'custom-network-genes-container\'>
        `
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
            `
        }
        
        result += "</div></div>"
        return result
    };
    const displayCurrentGenes = function () {
        $("#selected-genes").remove();
        $("#selected-genes-container").append(createGeneButtons());
        for (let gene in grnState.customWorkbook.genes) {
            console.log(gene);
            $(`#${gene}`).on("click", (ev) => {
                ev.stopPropagation();
                $(`#${gene}`).remove();
                delete grnState.customWorkbook.genes[gene];
            });
        }
    };

    const addGene = function() {
        console.log("Begin Add Gene")
        let gene = `${$("#network-search-bar").val()}`;
        console.log(gene)
        // console.log("Gets here")
        // let source = grnState.customWorkbook.source
        // console.log("Gets here 2")
        $("#network-search-bar").val("")
        // console.log("Gets here")
        // console.log(`Gene: ${gene}`);
        // console.log(`Source: ${grnState.customWorkbook.sources[source].source}`);
        // console.log(`TimeStamp: ${grnState.customWorkbook.sources[source].timestamp}`);
        grnState.customWorkbook.genes[gene.toUpperCase()] = gene.toLowerCase()
        // get genes from database
            // queryNetworkDatabase({
            //     type:"NetworkGeneFromSource", 
            //     info: {
            //         gene,
            //         source:grnState.customWorkbook.sources[source].source, 
            //         timestamp:grnState.customWorkbook.sources[source].timestamp
            //     }
            // }).then(function (response) {
            //     let x = response
            //     console.log(x)
            // }).catch(function (error) {
            //     console.log(error.stack);
            //     console.log(error.name);
            //     console.log(error.message);
            // });
    };

    const updateGenes = function () {
        addGene();
        displayCurrentGenes();
    };

    const displayCreateNetworkModal = function () {
        $("#createNetworkFormContainer").remove();
        // $("#creatNetworkQuestions-container").append(createHTMLforForm(["1", "2", "3"]));
        grnState.customWorkbook = {
            genes : {},
            source : null
        };
    // get sources from database
        queryNetworkDatabase({type:"NetworkSource", info:null}).then(function (response) {
            $("#creatNetworkQuestions-container").append(createHTMLforForm(Object.keys(response.sources)));
            grnState.customWorkbook.sources = response.sources;
            console.log(grnState.customWorkbook)
        }).catch(function (error) {
            console.log(error.stack);
            console.log(error.name);
            console.log(error.message);
        });
        // $('#getNetworkGenesForm').on("submit", ev => {
        //     let gene = `${$("#network-search-bar").val()}`;
        //     let source = grnState.customWorkbook.source
        //     console.log("Gets here");
        //     ev.stopPropagation();
        //     queryNetworkDatabase({
        //         type:"NetworkGeneFromSource", 
        //         info: {
        //             gene,
        //             source:grnState.customWorkbook.sources[source].source, 
        //             timestamp:grnState.customWorkbook.sources[source].timestamp
        //         }
        //     }).then(function (response) {
        //         let x = response
        //         console.log(x)
        //     }).catch(function (error) {
        //         console.log(error.stack);
        //         console.log(error.name);
        //         console.log(error.message);
        //     });
        //     return false;
        // }); 
        $(CREATE_NETWORK_MODAL).modal("show");
    };

    const performNetworkCreation = function () {
        return function () {
            displayCreateNetworkModal();
        };
    };


    // $(CREATE_NETWORK_CLASS).one("click", performNetworkCreation());
    $("body").on("click", CREATE_NETWORK_CLASS, performNetworkCreation());
    // $("#network-source").on("change", ((ev) => {
    //     if (grnState.customWorkbook === undefined) grnState.customWorkbook = {source:null, genes: {}}
    //     grnState.customWorkbook.source = $("#network-source").val();
    //     grnState.customWorkbook.genes = {};
    //     console.log("User changed source!")
    //     console.log(grnState.customWorkbook)
        
    //     ev.stopPropagation();
    //     displayCurrentGenes();
    // })(ev));
    $("#getNetworkGenesForm").on("submit", (ev) => {
        console.log("gets here form>>?")
        ev.preventDefault();
    })
    $("#enter-search").on("click", (ev) => {
        console.log("search button has been clicked")
        console.log($('#getNetworkGenesForm').serializeArray())
        ev.stopPropagation();
        updateGenes();
    });
    $("#network-search-bar").on("keydown", (ev) => {
        if(ev.key === 'Enter') {
            console.log("search bar has been entered")
            console.log($('#getNetworkGenesForm').serializeArray())
            ev.preventDefault();
            ev.stopPropagation();
            updateGenes();
        }
    });
};
