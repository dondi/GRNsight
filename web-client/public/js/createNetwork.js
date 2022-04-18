import {CREATE_NETWORK_CLASS, CREATE_NETWORK_MODAL} from "./constants";
import { queryNetworkDatabase } from "./api/grnsight-api";
import { grnState } from "./grnstate";
import { updateApp } from "./update-app";

var helpers = require(__dirname + "../../../server/controllers/helpers");
export const createNetwork = function () {

    var processWorkbook = function (path, res, app, workbook) {
        helpers.attachCorsHeader(res, app);
        helpers.attachFileHeaders(res, path);
        return workbook.errors.length === 0
            ? // If all looks well, return the workbook with an all clear
            res.json(workbook)
            : // If all does not look well, return the workbook with an error 400
            res.status(400).json(workbook);
    };
    const createCustomWorkbook = (res, app) => {
        let genes = []
        let genesByIndex = {}
        let links = []
        let positiveWeights = []
        let i = 0
        for (let gene in grnState.customWorkbook.genes){
            genes.push({name : grnState.customWorkbook.genes[gene]});
            genesByIndex[gene] = i;
            i++;
        }
        for (let regulator in grnState.customWorkbook.links) {
            links.push({
                source: genesByIndex[regulator],
                target: genesByIndex[grnState.customWorkbook.links[regulator]],
                value:1,
                type:"arrowhead",
                stroke: "black"
            });
            positiveWeights.push(1);
        }
        let workbook =  {
            genes,
            links,
            errors: [],
            warnings: [],
            positiveWeights,
            negativeWeights: [],
            sheetType: "unweighted",
            network: {
                genes,
                links,
                errors: [],
                warnings: [],
                positiveWeights,
            },
            meta: {
                data: {
                    species: "Saccharomyces cerevisiae",
                    taxon_id: 559292
                }
            },
            test: {
            },
            expression: {
            }
        };
        return processWorkbook("CustomWorkbook/unweighted", res, app, workbook)

    }
    const createHTMLforForm = (sources) => {
        let result =  `
            <div id=\'createNetworkFormContainer\' '>
                <h2 id=\'createNetwork\'>Create Network</h2>
        <div class=\'form-group\'>
            <label for=\'network-source\' id=\'network-source-label\'>Network Source</label>
            <select class=\'network-dropdown\' id=\'network-source\'>
            `;
        if (sources.length !== 1) {
            result += `<option value=\'none\' selected=\'true\' disabled>Select Network Source</option> `
            for (let source in sources) {
                result += `
                            <option value=\'${sources[source]}\'>${sources[source]}</option>
                `;
            }
        } else {
            result += `
                        <option value=\'${sources[0]}\' selected=\'true\' disabled hidden>${sources[0]}</option>
            `;
        }
        result += `</select>
                   <p>Warning: changing network source will remove all current genes in network</p>
                </div>
        <div class=\'form-group\' id=\'getNetworkGenesForm\'>
            <form id=\'getNetworkGenesForm\'>
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
        <button id=\'submit-network\'>Create Network</input>
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
        console.log("Adding Gene")
        let gene = `${$("#network-search-bar").val()}`.toUpperCase();
        $("#network-search-bar").val("");
        let source = grnState.customWorkbook.source
        let headers = {
            type:"NetworkGeneFromSource", 
            info: {
                gene: gene,
                source:grnState.customWorkbook.sources[source].source, 
                timestamp:grnState.customWorkbook.sources[source].timestamp.substring(0,19).replace("T", " ")
            }
        }
        console.log("Adding Gene headers:")
        console.log(headers)
        queryNetworkDatabase(headers).then(function (response) {
            console.log("recieved response")
            if (response.geneId !== null && response.displayGeneId !==null) {
            grnState.customWorkbook.genes[response.geneId] = response.displayGeneId;
            displayCurrentGenes();
            }
            else {
                alert (`Gene: ${gene} was not found in this database. Please check for any typos and try again.`);
            }
        }).catch(function (error) {
            console.log(error.stack);
            console.log(error.name);
            console.log(error.message);
        });
    };

    const displayCreateNetworkModal = function () {
        $("#createNetworkFormContainer").remove();
        grnState.customWorkbook = {
            genes : {},
            source : null
        };
    // get sources from database
        queryNetworkDatabase({type:"NetworkSource", info:null}).then(function (response) {
            $("#creatNetworkQuestions-container").append(createHTMLforForm(Object.keys(response.sources)));
            grnState.customWorkbook.sources = response.sources;
            grnState.customWorkbook.source = Object.keys(response.sources).length === 1? Object.keys(response.sources)[0] : null;
            console.log(grnState.customWorkbook)
            app.get("CustomWorkbook/unweighted", function (req, res) {
                return createCustomWorkbook( res, app);
            });
        }).catch(function (error) {
            console.log(error.stack);
            console.log(error.name);
            console.log(error.message);
        });
        $(CREATE_NETWORK_MODAL).modal("show");
    };

    const performNetworkCreation = function () {
        return function () {
            displayCreateNetworkModal();
        };
    };

    $("body").on("click", CREATE_NETWORK_CLASS, performNetworkCreation());
    $("body").on("change", "#network-source", function(event) {
        grnState.customWorkbook.source = $("#network-source").val();
        grnState.customWorkbook.genes = {};
        console.log("User changed source!")
        console.log(grnState.customWorkbook) 
        event.stopPropagation();
        displayCurrentGenes();
    });
    $("body").on("click", "#submit-network", function() {
        console.log("Creating network")
        let source = grnState.customWorkbook.source
        let headers = {
            type:"CreateNetwork", 
            info: {
                genes: grnState.customWorkbook.genes,
                source:grnState.customWorkbook.sources[source].source, 
                timestamp:grnState.customWorkbook.sources[source].timestamp.substring(0,19).replace("T", " ")
            }
        }
        queryNetworkDatabase(headers).then(function (response) {
            console.log("HERE IS THE DATA FOR NETWORK CREATION");
            grnState.customWorkbook.links = response.regulatoryConnections;
            let workbook = createCustomWorkbook();
            app.get("/demo/unweighted", function (req, res) {
                return demoWorkbooks("test-files/demo-files/15-genes_28-edges_db5_Dahlquist-data_input.xlsx", res, app);
            });
            $(CREATE_NETWORK_MODAL).modal("hide");
        }).catch(function (error) {
            console.log(error.stack);
            console.log(error.name);
            console.log(error.message);
        });
        console.dir(grnState)
    });
    $("body").on("click", "#enter-search", function(event) {
        try {
            console.log("search button has been clicked")
            event.preventDefault();
            event.stopPropagation();
            addGene();
        } catch (error) {
            console.log(error);
        }
    });
};
