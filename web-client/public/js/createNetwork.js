import {CREATE_NETWORK_CLASS, CREATE_NETWORK_MODAL} from "./constants";
import { queryNetworkDatabase, uploadCustomWorkbook } from "./api/grnsight-api";
import { grnState } from "./grnstate";

export const createNetwork = function () {
    const createHTMLforForm = (sources) => {
        let result =  `
            <div id=\'createNetworkFormContainer\' '>
                <h2 id=\'createNetwork\'>Create Network</h2>
        <div class=\'form-group\'>
            <label for=\'network-source\' id=\'network-source-label\'>Network Source</label>
            <select class=\'network-dropdown btn btn-default\' id=\'network-source\'>
            `;
        if (sources.length !== 1) {
            result += "<option value=\'none\' selected=\'true\' disabled>Select Network Source</option>";
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
                <button id=\'enter-search\' type=\'submit\' class=\'search-button btn btn-default\'>
                    <span class=\'glyphicon glyphicon-search\'></span>
                </button>
            </form>
        </div>
        <div id=\'selected-genes-container\'>
            <div id=\'selected-genes\'>
                <p>Added genes go here! Click on a gene to remove it</p>
            </div>
        </div>
        <button id=\'submit-network\' class=\'btn btn-default\'>Create Network</input>
            </div>
        `;
        return result;
    };
    const getFormattedDateTime = (date) => {
        const currentYear = date.getFullYear();
        let currentDate = date.getDate();
        let currentMonth = date.getMonth() + 1;
        let currentHrs = date.getHours();
        let currentMins = date.getMinutes();
        let currentSecs = date.getSeconds();
        let currentDatetime;

        // Add 0 before date, month, hrs, mins or secs if they are less than 10
        currentDate = currentDate < 10 ? "0" + currentDate : currentDate;
        currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
        currentHrs = currentHrs < 10 ? "0" + currentHrs : currentHrs;
        currentMins = currentMins < 10 ? "0" + currentMins : currentMins;
        currentSecs = currentSecs < 10 ? "0" + currentSecs : currentSecs;

        // Create Properly formatted datetime string like `2022-09-23 17:10:26`
        currentDatetime = currentYear + "-" + currentMonth + "-" + currentDate + " " + currentHrs + ":"
            + currentMins + ":" + currentSecs;
        return currentDatetime;
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

    const addGene = function () {
        let gene = `${$("#network-search-bar").val()}`.toUpperCase();
        $("#network-search-bar").val("");
        if (!(/^[A-Z0-9_-]{1,12}$/.test(gene))) {
            alert(`Gene: ${gene} is not to GRNsight specifications. Genes must be 12 characters or less,
containing "-", "_", and alpha-numeric characters only`);
        } else {
            let source = grnState.customWorkbook.source;
            let headers = {
                type:"NetworkGeneFromSource",
                info: {
                    gene: gene,
                    source:grnState.customWorkbook.sources[source].source,
                    timestamp:grnState.customWorkbook.sources[source].timestamp
                }
            };
            queryNetworkDatabase(headers).then(function (response) {
                if (response.geneId !== null && response.displayGeneId !== null) {
                    grnState.customWorkbook.genes[response.geneId] = response.displayGeneId;
                    displayCurrentGenes();
                } else {
                    alert(`Gene: ${gene} was not found in this database. Please check for any typos and try again.`);
                }
            }).catch(function (error) {
                console.log(error.stack);
                console.log(error.name);
                console.log(error.message);
            });

        }
    };

    const displayCreateNetworkModal = function () {
        $("#createNetworkFormContainer").remove();
        grnState.customWorkbook = {
            genes : {},
            source : null,
            sources : null
        };
    // get sources from database
        queryNetworkDatabase({type:"NetworkSource", info:null}).then(function (response) {
            $("#createNetworkQuestions-container").append(createHTMLforForm(Object.keys(response.sources)));
            grnState.customWorkbook.sources = response.sources;
            grnState.customWorkbook.source = Object.keys(response.sources).length === 1 ?
                Object.keys(response.sources)[0] : null;
            let i;
            let dateTime;
            let timestamp;
            for (let source in response.sources) {
                const i = source.indexOf(":");
                const dateTime = new Date(source.substring(i + 1));
                const timestamp = getFormattedDateTime(dateTime);
                grnState.customWorkbook.sources[source].timestamp = timestamp;
            }
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
        displayCreateNetworkModal();
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

            let source = grnState.customWorkbook.source;
            let headers = {
                type:"CreateNetwork",
                info: {
                    genes: grnState.customWorkbook.genes,
                    source:grnState.customWorkbook.sources[source].source,
                    timestamp:grnState.customWorkbook.sources[source].timestamp
                }
            };
            queryNetworkDatabase(headers).then(function (response) {
                grnState.customWorkbook.links = response.links;
                let genes = grnState.customWorkbook.genes;
                let links = grnState.customWorkbook.links;
                let genesAmount = Object.keys(genes).length;
                let edgesAmount = Object.entries(links).flatMap( (entry) => {
                    return entry[1].map((target) => {
                        return [entry[0], target];
                    });
                }).length;
                if (edgesAmount > 100) {
                    alert(`GRNsight is only capable of handling 100 edges at most. Your proposed network contains
 ${edgesAmount} regulatory connections. Please remove some genes from your proposed network.`);
                } else {
                    let name = `Custom Workbook: UnweightedGRN(${genesAmount} genes, ${edgesAmount} edges)`;
                    let workbook = {name, genes, links};
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
