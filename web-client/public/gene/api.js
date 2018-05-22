"use strict";

// Using "use strict" global

(function ($) {
    window.api = {
        getGeneInformation: function (symbol) {
            var serializer = new XMLSerializer();
            var XMLParser = function (data) {
                return serializer.serializeToString(data).replace(/\<.*?\>\s?/g, "");
            };
          //  var apiErrors = [];
          //  var apiCount = 5;

            var getUniProtInfo = function (geneSymbol) {
                return $.get({
                    url: "http://www.uniprot.org/uploadlists/",
                    data: {
                        from: "GENENAME",
                        to: "ACC",
                        format: "tab",
                        taxon: "559292",
                        query: geneSymbol,
                    },
                    dataType: "text",
                    timeout: 5000,
                }).then(function (data) {
                    var regex = new RegExp(geneSymbol + "[ \t\r\n\v\f]*([A-Z0-9]+)", "gm");
                    var id = regex.exec(data)[1];
                    return $.get({
                        url: "http://www.uniprot.org/uniprot/" + id + ".xml",
                        timeout: 5000,
                    });
                }).fail(function () {
                    return $.get(this);
                });
            };

            var getNCBIInfo = function (geneSymbol) {
                return $.get({
                    url: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi",
                    data: {
                        db: "gene",
                        term: geneSymbol + "[gene]+Saccharomyces+cerevisiae[Organism]",
                    },
                    dataType: "text",
                    timeout: 5000,
                }).then(function (data) {
                    var regex = /<Id>(\d*)<\/Id>/gm;
                    var id = regex.exec(data)[1];
                    return $.get({
                        url: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=" + id,
                        dataType: "xml",
                        timeout: 5000,
                    });
                });
            };

            var getYeastMineInfo = function (geneSymbol) {
                return $.get({
                    url: "https://yeastmine.yeastgenome.org/yeastmine/service/data/Gene?symbol=" + geneSymbol,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("content-type", "application/json");
                    },
                }).then(function (data) {
                    return (data.results.filter(function (data) {
                        return data.primaryIdentifier[0] === "S";
                    }));
                });
            };

            var getEnsemblInfo = function (geneSymbol) {
                return $.get({
                    url: "http://rest.ensembl.org/lookup/symbol/saccharomyces_cerevisiae/" + geneSymbol,
                    dataType: "json",
                    timeout: 5000,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("content-type", "application/json");
                    },
                }).then(function (data) {
                    return $.get({
                        url: "http://rest.ensembl.org/lookup/id/" + data.id + "?expand=1",
                        dataType: "json",
                        timeout: 5000,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("content-type", "application/json");
                        },
                    });
                });
            };

            var getJasparInfo = function (geneSymbol) {
                return $.get({
                    url: "http://jaspar.genereg.net/api/v1/matrix/?tax_id=4932&format=json&search=" + geneSymbol,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("content-type", "application/json");
                    },
                }).then(function (data) {
                    return (data.count === 0 ? {} :
                        $.get({
                            url: "http://jaspar.genereg.net/api/v1/matrix/" + data.results[0].matrix_id,
                            dataType: "json",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("content-type", "application/json");
                            },
                        })
                    );
                });
            };


            var defaultJaspar = {
                jasparID: "Not found",
                class: "Not found",
                family: "Not found",
                sequenceLogo: "Not found",
                frequencyMatrix: "Not found"
            };

            var defaultNCBI  = {
                ncbiID: "Not found",
                locusTag: "Not found",
                alsoKnownAs: "Not found",
                chromosomeSequence: "Not found",
                genomicSequence: "Not found"
            };

            var defaultUniprot = {
                uniprotID: "Not found",
                proteinSequence: "Not found",
                proteinType: "Not found",
                species: "Not found"
            };

            var defaultEnsembl = {
                ensemblID:  "Not found",
                description: "Not found",
                dnaSequence:  "Not found",
                geneLocation:  "Not found"
            };

            var defaultYeastmine = {

                sgdID: "Not found",
                standardName: "Not found",
                systematicName: "Not found",
                regulators: "Not found",
                targets: "Not found",
                totalInteractions: "Not found",
                affinityCaptureMS: "Not found",
                affinityCaptureRNA: "Not found",
                affinityCaptureWestern: "Not found",
                biochemicalActivity: "Not found",
                colocalization: "Not found",
                reconstitutedComplex: "Not found",
                twoHybrid: "Not found",
                dosageRescue: "Not found",
                negativeGenetic: "Not found",
                phenotypicEnhancement: "Not found",
                phenotypicSuppression: "Not found",
                syntheticGrowthDefect: "Not found",
                syntheticHaploinsufficiency: "Not found",
                syntheticLethality: "Not found",
                syntheticRescue: "Not found",
                geneOntologySummary: "Not found",
                molecularFunction: "Not found",
                biologicalProcess: "Not found",
                cellularComponent: "Not found"
            };

            var defaultValues = {
                jaspar: defaultJaspar,
                ncbi: defaultNCBI,
                ensembl: defaultEnsembl,
                uniprot: defaultUniprot,
                sgd: defaultYeastmine
            };

            var parseUniprot = function (data) {
                return {
                    uniprotID: XMLParser(data.getElementsByTagName("name")[0]),
                    proteinSequence: XMLParser(data.getElementsByTagName("sequence")[0]),
                    proteinType: XMLParser(data.getElementsByTagName("protein")[0].childNodes[1].childNodes[1]),
                    species: XMLParser(data.getElementsByTagName("organism")[0].childNodes[1]),
                };
            };

            var parseNCBI = function (data) {
                var tagArray = serializer.serializeToString(
                    data.getElementsByTagName("OtherAliases")[0]).split(",");
                return {
                    ncbiID: data.getElementsByTagName("DocumentSummary")[0].getAttribute("uid"),
                    locusTag: tagArray[0].replace(/\<.*?\>\s?/g, ""),
                    alsoKnownAs: tagArray.slice(1).join().replace(/\<.*?\>\s?/g, ""),
                    chromosomeSequence: XMLParser(data.getElementsByTagName("ChrAccVer")[0]),
                    genomicSequence: XMLParser(data.getElementsByTagName("ChrLoc")[0]) + "; "
                    + XMLParser(data.getElementsByTagName("ChrAccVer")[0]) + " ("
                    + XMLParser(data.getElementsByTagName("ChrStart")[0])
                     + ".." + XMLParser(data.getElementsByTagName("ChrStop")[0]) + ")",
                };
            };

            var parseYeastmine = function (data) {
                return {
                    sgdID: data.primaryIdentifier,
                    standardName: data.symbol,
                    systematicName: data.secondaryIdentifier,
                    regulators: "N/A", // Information unavailable via regular API
                    targets: "N/A", // Information unavailable via regular API
                    totalInteractions: "N/A", // Information unavailable via regular API
                    affinityCaptureMS: "N/A", // Information unavailable via regular API
                    affinityCaptureRNA: "N/A", // Information unavailable via regular API
                    affinityCaptureWestern: "N/A", // Information unavailable via regular API
                    biochemicalActivity: "N/A", // Information unavailable via regular API
                    colocalization: "N/A", // Information unavailable via regular API
                    reconstitutedComplex: "N/A", // Information unavailable via regular API
                    twoHybrid: "N/A", // Information unavailable via regular API
                    dosageRescue: "N/A", // Information unavailable via regular API
                    negativeGenetic: "N/A", // Information unavailable via regular API
                    phenotypicEnhancement: "N/A", // Information unavailable via regular API
                    phenotypicSuppression: "N/A", // Information unavailable via regular API
                    syntheticGrowthDefect: "N/A", // Information unavailable via regular API
                    syntheticHaploinsufficiency: "N/A", // Information unavailable via regular API
                    syntheticLethality: "N/A", // Information unavailable via regular API
                    syntheticRescue: "N/A", // Information unavailable via regular API
                    geneOntologySummary: data.functionSummary,
                    molecularFunction: "N/A", // Information unavailable via regular API
                    biologicalProcess: "N/A", // Information unavailable via regular API
                    cellularComponent: "N/A", // Information unavailable via regular API
                };
            };

            var parseEnsembl = function (data) {
                return {
                    ensemblID: data.id,
                    description: data.description,
                    dnaSequence: "N/A", // Information unavailable via regular API
                    geneLocation: "N/A", // Information unavailable via regular API
                };
            };

            var parseJaspar = function (data) {

                return data ? {
                    jasparID : data.matrix_id,
                    class: data.class,
                    family: data.family,
                    sequenceLogo: data.sequence_logo,
                    frequencyMatrix: data.pfm,
                } : {};
            };

            return $.when(
             getNCBIInfo(symbol)
           ).then(function (info1) {
               defaultValues.ncbi = parseNCBI(info1);
               return getUniProtInfo(symbol);
           }).catch(function () {
               return getUniProtInfo(symbol);
           }).then(function (info2) {
               defaultValues.uniprot = parseUniprot(info2);
               return getYeastMineInfo(symbol);
           }).catch(function () {
               return getYeastMineInfo(symbol);
           }).then(function (info3) {
               defaultValues.sgd = parseYeastmine(info3[0]);
               return getEnsemblInfo(symbol);
           }).catch(function () {
               return getEnsemblInfo(symbol);
           }).then(function (info4) {
               defaultValues.ensembl = parseEnsembl(info4);
               return getJasparInfo(symbol);
           }).catch(function () {
               return getJasparInfo(symbol);
           }).then(function (info5) {
               defaultValues.jaspar = parseJaspar(info5);
               return defaultValues;
           }).catch(function () {
               return defaultValues;
           }).fail(function () {
               var errorString1 = "No gene information was retrieved for " + symbol + ".";

               var errorString2 = "This could have happened because either"
                + " GRNsight could not access the gene information from one of the source databases"
                + " or because no information exists for the gene in the source databases.";

               var errorString3 = "You can check back later to see if gene information"
                + " can be retrieved or submit an issue to https://github.com/dondi/GRNsight.";

               $("#error1").text(errorString1);
               $("#error2").text(errorString2);
               $("#error3").text(errorString3);
               $("#errorModal").modal("show");
           });
        }
    };
})($);
