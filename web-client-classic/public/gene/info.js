(function () {
    $(".sourceLink, button").click(function (event) {
        event.preventDefault();
        const anchorName = $(this).attr("data-target") + "Heading";
        $("html, body").animate({ scrollTop: $(anchorName).offset().top });
        let currentButton = this;
        window.setTimeout(function () {
            /* I am exploiting Bootstrap's ARIA functionality for the
            purposes of this application*/
            let isOpen = $(currentButton).attr("aria-expanded") === "true";
            if (isOpen) {
                $(currentButton).removeAttr("data-toggle");
            }
        }, 200);
    });

    $(".accordionLink").click(function () {
        let currentDataTarget = "button[data-target=\'" + $(this).attr("href") + "\']";
        $(currentDataTarget).attr("data-toggle", "collapse");

        window.setTimeout(function () {
            let isOpen = $(currentDataTarget).attr("aria-expanded") === "true";
            if (isOpen) {
                $(currentDataTarget).removeAttr("data-toggle");
            }
        }, 200);
    });

    // object for gene page API calls
    // Thank you https://gist.github.com/pirate/9298155edda679510723
    const query = new URLSearchParams(location.search);
    const obj = {
        symbol: query.get("symbol"),
        species: query.get("species"),
        jaspar: query.get("jaspar"),
        uniprot: query.get("uniprot"),
        ensembl: query.get("ensembl"),
        mine: query.get("mine"),
    };

    document.title = "GRNsight - " + obj.symbol;
    $("#gene-name").text(obj.symbol);
    // This is cite used to find the parsing:
    // https://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object

    const api = window.api;

    api.getGeneInformation(obj).done(function (gene) {
        const locusTag = gene.ncbi.locusTag;

        const sgdHrefTemplate = "https://www.yeastgenome.org/locus/";
        const sgdId = gene.sgd.sgdID;
        $(".sgd-link").text(sgdId);
        if (sgdId !== "Not found") {
            $(".sgd-link").attr({ href: sgdHrefTemplate + sgdId });
        }

        const ncbiHrefTemplate = "https://www.ncbi.nlm.nih.gov/gene/";
        const ncbiId = gene.ncbi.ncbiID;
        $(".ncbi-link").text(ncbiId);
        if (ncbiId !== "Not found") {
            $(".ncbi-link").attr({ href: ncbiHrefTemplate + ncbiId });
        }

        const ensemblHrefTemplate = "https://www.ensembl.org/" + obj.species + "/Gene/Summary?g=";
        const ensemblPlantHrefTemplate =
            "https://www.plants.ensembl.org/ " + obj.species + "/Gene/Summary?g=";
        const ensemblId = locusTag;
        // console.log("ensembl id: " + ensemblId)
        $(".ensembl-link").text(ensemblId);
        if (ensemblId !== "Not found") {
            if (obj.ensembl === "plant") {
                $(".ensembl-link").attr({ href: ensemblPlantHrefTemplate + ensemblId });
            } else {
                $(".ensembl-link").attr({ href: ensemblHrefTemplate + ensemblId });
            }
        }

        const uniprotHrefTemplate = "http://www.uniprot.org/uniprot/";
        const uniprotId = gene.uniprot.uniprotID;
        $(".uniprot-link").text(uniprotId);
        if (uniprotId !== "Not found") {
            $(".uniprot-link").attr({ href: uniprotHrefTemplate + uniprotId });
        }

        const jasparHrefTemplate = "http://jaspar.genereg.net/matrix/";
        const jasparId = gene.jaspar.jasparID;
        $(".jaspar-link").text(jasparId);
        if (jasparId !== "Not found") {
            $(".jaspar-link").attr({ href: jasparHrefTemplate + jasparId });
        }

        // General Information Section
        const geneDescription = gene.sgd.description;
        $(".geneDescription")
            .text(geneDescription)
            .attr({ href: sgdHrefTemplate + geneDescription });

        const GRNSightSpecies = obj.species.replace("_", " "); // change to make species display work
        $(".uniProtSpecies")
            .text(GRNSightSpecies)
            .attr({ href: uniprotHrefTemplate + GRNSightSpecies });

        // This has been moved to top of function
        $(".ncbiLocusTag")
            .text(locusTag)
            .attr({ href: ncbiHrefTemplate + locusTag });

        const jasparClass = gene.jaspar.class;
        $(".jasparClass")
            .text(jasparClass)
            .attr({ href: jasparHrefTemplate + jasparClass });

        const jasparFam = gene.jaspar.family;
        $(".jasparFamily")
            .text(jasparFam)
            .attr({ href: jasparHrefTemplate + jasparFam });

        const ncbiChromosome = gene.ncbi.chromosomeSequence;
        $(".chromosomeSequence")
            .text(ncbiChromosome)
            .attr({ href: ncbiHrefTemplate + ncbiChromosome });

        // Protein Information

        const uniprotProteinType = gene.uniprot.proteinType;
        $(".proteinType")
            .text(uniprotProteinType)
            .attr({ href: uniprotHrefTemplate + uniprotProteinType });

        const uniprotProteinSequence = gene.uniprot.proteinSequence;
        if (uniprotProteinSequence !== "Not found") {
            $(".proteinSequence")
                .text(uniprotProteinSequence.replace(/\s/g, ""))
                .attr({ href: uniprotHrefTemplate + uniprotProteinSequence });
        } else {
            $(".proteinSequence")
                .text("Not found")
                .attr({ href: uniprotHrefTemplate + uniprotProteinSequence });
        }

        // Regulation Information
        const regulators = gene.regulators.regulators;

        if (regulators !== "Not found") {
            $(".regulators").append('<dl class="row regulatorsTable"></dl>');
            for (let k = 0; k < regulators.length; k++) {
                $(".regulatorsTable").append(
                    '<dt class="col-xl-3">' + regulators[k].regulator + "</dt>"
                );
                $(".regulatorsTable").append(
                    '<dd class="sgdSource col-xl-9">' + regulators[k].regulationOf + "</dd>"
                );
            }
        } else {
            $(".regulators").text("Not found").attr({ class: "sgdSource  col-sm-9" });
        }

        const targets = gene.regulators.targets;

        if (targets !== "Not found") {
            $(".targets").append('<dl class="row targetsTable"></dl>');
            for (let k = 0; k < targets.length; k++) {
                $(".targetsTable").append('<dt class="col-xl-3">' + targets[k].target + "</dt>");
                $(".targetsTable").append(
                    '<dd class="sgdSource col-xl-9">' + targets[k].regulationOf + "</dd>"
                );
            }
        } else {
            $(".targets").text("Not found").attr({ class: "sgdSource  col-sm-9" });
        }

        // Interaction: Physical Reaction

        const sgdInteractions = gene.sgd.totalInteractions;
        $(".totalInteractions")
            .text(sgdInteractions)
            .attr({ href: sgdHrefTemplate + sgdInteractions });

        const sgdAffinityCaptureMS = gene.sgd.affinityCaptureMS;
        $(".affinityCaptureMS")
            .text(sgdAffinityCaptureMS)
            .attr({ href: sgdHrefTemplate + sgdAffinityCaptureMS });

        const sgdAffinityCaptureRNA = gene.sgd.affinityCaptureRNA;
        $(".affinityCaptureRNA")
            .text(sgdAffinityCaptureRNA)
            .attr({ href: sgdHrefTemplate + sgdAffinityCaptureRNA });

        const sgdAffinityCaptureWesterns = gene.sgd.affinityCaptureWestern;
        $(".affinityCaptureWestern")
            .text(sgdAffinityCaptureWesterns)
            .attr({ href: sgdHrefTemplate + sgdAffinityCaptureWesterns });

        const sgdBiochemicalActivity = gene.sgd.biochemicalActivity;
        $(".biochemicalActivity")
            .text(sgdBiochemicalActivity)
            .attr({ href: sgdHrefTemplate + sgdBiochemicalActivity });

        const sgdColocalization = gene.sgd.colocalization;
        $(".colocalization")
            .text(sgdColocalization)
            .attr({ href: sgdHrefTemplate + sgdColocalization });

        const sgdReconstitutedComplex = gene.sgd.reconstitutedComplex;
        $(".reconstitutedComplex")
            .text(sgdReconstitutedComplex)
            .attr({ href: sgdHrefTemplate + sgdReconstitutedComplex });

        const sgdTwoHybrid = gene.sgd.twoHybrid;
        $(".twoHybrid")
            .text(sgdTwoHybrid)
            .attr({ href: sgdHrefTemplate + sgdTwoHybrid });

        // Genetic Interactions

        const sgdDosage = gene.sgd.dosageRescue;
        $(".dosageRescue")
            .text(sgdDosage)
            .attr({ href: sgdHrefTemplate + sgdDosage });

        const sgdNegGen = gene.sgd.negativeGenetic;
        $(".negativeGenetic")
            .text(sgdNegGen)
            .attr({ href: sgdHrefTemplate + sgdNegGen });

        const sgdEnhance = gene.sgd.phenotypicEnhancement;
        $(".phenotypicEnhancement")
            .text(sgdEnhance)
            .attr({ href: sgdHrefTemplate + sgdEnhance });

        const sgdSuppress = gene.sgd.phenotypicSuppression;
        $(".phenotypicSuppression")
            .text(sgdSuppress)
            .attr({ href: sgdHrefTemplate + sgdSuppress });

        const sgdGrowthDefect = gene.sgd.syntheticGrowthDefect;
        $(".syntheticGrowthDefect")
            .text(sgdGrowthDefect)
            .attr({ href: sgdHrefTemplate + sgdGrowthDefect });

        const sgdHaploin = gene.sgd.syntheticHaploinsufficiency;
        $(".syntheticHaploinsufficiency")
            .text(sgdHaploin)
            .attr({ href: sgdHrefTemplate + sgdHaploin });

        const sgdLethality = gene.sgd.syntheticLethality;
        $(".syntheticLethality")
            .text(sgdLethality)
            .attr({ href: sgdHrefTemplate + sgdLethality });

        const sgdRescue = gene.sgd.syntheticRescue;
        $(".syntheticRescue")
            .text(sgdRescue)
            .attr({ href: sgdHrefTemplate + sgdRescue });

        // Gene Ontology
        const sgdSummary = gene.sgd.geneOntologySummary;
        $(".geneSummary")
            .text(sgdSummary)
            .attr({ href: sgdHrefTemplate + sgdSummary });

        const molecularFunction = gene.geneOntology.molecularFunction;
        let link;
        if (molecularFunction !== "Not found") {
            $(".molecularFunction").append('<dl class="row molecularFunctionTable"></dl>');
            for (let k = 0; k < molecularFunction.length; k++) {
                link = "https://www.yeastgenome.org" + molecularFunction[k].link;
                $(".molecularFunctionTable").append(
                    '<dd><a href="' +
                        link +
                        '" class="col-xl-3">' +
                        molecularFunction[k].id +
                        "</a></dd>"
                );
                $(".molecularFunctionTable").append(
                    '<dd class="sgdSource col-xl-9">' + molecularFunction[k].displayName + "</dd>"
                );
            }
        } else {
            $(".molecularFunction").text("Not found").attr({ class: "sgdSource col-sm-9" });
        }

        let biologicalProcess = gene.geneOntology.biologicalProcess;
        if (biologicalProcess !== "Not found") {
            $(".biologicalProcess").append('<dl class="row biologicalProcessTable"></dl>');
            for (let k = 0; k < biologicalProcess.length; k++) {
                link = "https://www.yeastgenome.org" + biologicalProcess[k].link;
                $(".biologicalProcessTable").append(
                    '<dd><a href="' +
                        link +
                        '"  class="col-xl-3">' +
                        biologicalProcess[k].id +
                        "</a></dd>"
                );
                $(".biologicalProcessTable").append(
                    '<dd class="sgdSource col-xl-9">' + biologicalProcess[k].displayName + "</dd>"
                );
            }
        } else {
            $(".biologicalProcess").text("Not found").attr({ class: "sgdSource  col-sm-9" });
        }

        let cellularComponent = gene.geneOntology.cellularComponent;
        if (cellularComponent !== "Not found") {
            $(".cellularComponent").append('<dl class=" row cellularComponentTable"></dl>');
            for (let k = 0; k < cellularComponent.length; k++) {
                link = "https://www.yeastgenome.org" + cellularComponent[k].link;
                $(".cellularComponentTable").append(
                    '<dd><a href="' +
                        link +
                        '" class="col-xl-3">' +
                        cellularComponent[k].id +
                        "</a></dd>"
                );
                $(".cellularComponentTable").append(
                    '<dd class="sgdSource col-xl-9">' + cellularComponent[k].displayName + "</dd>"
                );
            }
        } else {
            $(".cellularComponent").text("Not found").attr({ class: "sgdSource  col-sm-9" });
        }

        // Fequency Matrix and Sequence Logo
        const sequenceLogo = gene.jaspar.sequenceLogo;
        if (sequenceLogo !== "Not found") {
            $(".sequenceLogoImage").attr({ src: sequenceLogo });
        } else {
            $(".sequenceLogo").replaceWith('<p class="jasparSource">Not found</p>');
            $(".logo").removeClass("jasparSource");
        }

        const frequencyMatrix = gene.jaspar.frequencyMatrix;

        let a = "";
        try {
            for (let i = 0; i < frequencyMatrix.A.length; i++) {
                a += "<td>" + frequencyMatrix.A[i] + "</td>";
            }
        } catch (e) {
            a += "<td> Not found </td>";
        }

        $(".frequencyOfA").append($(a));

        let c = "";
        try {
            for (let k = 0; k < frequencyMatrix.C.length; k++) {
                c += "<td>" + frequencyMatrix.C[k] + "</td>";
            }
        } catch (e) {
            c += "<td> Not found </td>";
        }
        $(".frequencyOfC").append($(c));

        let g = "";
        try {
            for (let j = 0; j < frequencyMatrix.C.length; j++) {
                g += "<td>" + frequencyMatrix.C[j] + "</td>";
            }
        } catch (e) {
            g += "<td> Not found </td>";
        }
        $(".frequencyOfG").append($(g));

        let t = "";
        try {
            for (let h = 0; h < frequencyMatrix.C.length; h++) {
                t += "<td>" + frequencyMatrix.C[h] + "</td>";
            }
        } catch (e) {
            t += "<td> Not found </td>";
        }
        $(".frequencyOfT").append($(t));

        $("#sgdSource").text("1. Saccharomyces Genome Database");
        $("#uniprotSource").text("2. UniProt");
        $("#ensemblSource").text("3. Ensembl");
        $("#ncbiSource").text("4. NCBI Gene Database");
        $("#jasparSource").text("5. JASPAR Database");

        $('<a class="sourceLink"> <sup>[1]</sup></a>').appendTo(".sgdSource");
        $('<a class="sourceLink"><sup>[2]</sup></a>').appendTo(".uniprotSource");
        $('<a class="sourceLink"><sup>[3]</sup></a>').appendTo(".ensemblSource");
        $('<a class="sourceLink"><sup>[4]</sup></a>').appendTo(".ncbiSource");
        $('<a class="sourceLink"><sup>[5]</sup></a>').appendTo(".jasparSource");

        $("a").attr("target", "blank");
    });
})();
