(function () {

    $(".sourceLink, button").click(function (event) {
        event.preventDefault();
        var anchorName = $(this).attr("data-target") + "Heading";
        $("html, body").animate({scrollTop: $(anchorName).offset().top});
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

    var search = location.search.substring(1);
    var obj = search ? JSON.parse("{\"" + search.replace(/&/g, "','").replace(/=/g, "\":\"") + "\"}",
        function ( key, value) {
            return key === "" ? value : decodeURIComponent(value);
        }) : {};

    document.title = "GRNsight - " + obj.symbol;
    $("#gene-name").text(obj.symbol);
    // This is cite used to find the parsing:
    // https://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object

    var api = window.api;

    api.getGeneInformation(obj.symbol).done(function (gene) {

        const sgdHrefTemplate = "https://www.yeastgenome.org/locus/";
        const sgdId = gene.sgd.sgdID;
        $(".sgd-link").text(sgdId).attr({ href: sgdHrefTemplate + sgdId });

        const ncbiHrefTemplate = "https://www.ncbi.nlm.nih.gov/gene/";
        const ncbiId = gene.ncbi.ncbiID;
        $(".ncbi-link").text(ncbiId).attr({ href: ncbiHrefTemplate + ncbiId });

        const ensemblHrefTemplate = "https://www.ensembl.org/Saccharomyces_cerevisiae/Gene/Summary?g=";
        const ensemblId = gene.ensembl.ensemblID;
        $(".ensembl-link").text(ensemblId).attr({ href: ensemblHrefTemplate + ensemblId });

        const uniprotHrefTemplate = "http://www.uniprot.org/uniprot/";
        const uniprotId = gene.uniprot.uniprotID;
        $(".uniprot-link").text(uniprotId).attr({ href: uniprotHrefTemplate + uniprotId });

        const jasparHrefTemplate = "http://jaspar.genereg.net/matrix/";
        const jasparId = gene.jaspar.jasparID;
        $(".jaspar-link").text(jasparId).attr({ href: jasparHrefTemplate + jasparId });

        // General Information Section
        var geneDescription = gene.sgd.description;
        $(".geneDescription").text(geneDescription).attr({ href: sgdHrefTemplate + geneDescription });


        var uniSpecies = gene.uniprot.species;
        $(".uniProtSpecies").text(uniSpecies).attr({ href: uniprotHrefTemplate + uniSpecies });

        var ncbiLocus = gene.ncbi.locusTag;
        $(".ncbiLocusTag").text(ncbiLocus).attr({ href: ncbiHrefTemplate + ncbiLocus });

        var jasparClass = gene.jaspar.class;
        $(".jasparClass").text(jasparClass).attr({ href: jasparHrefTemplate + jasparClass });

        var jasparFam = gene.jaspar.family;
        $(".jasparFamily").text(jasparFam).attr({ href: jasparHrefTemplate + jasparFam });

        var ncbiChromosome = gene.ncbi.chromosomeSequence;
        $(".chromosomeSequence").text(ncbiChromosome).attr({ href: ncbiHrefTemplate + ncbiChromosome });

        // DNA Sequence Tab
        var ensemblDNA = gene.ensembl.dnaSequence;
        $(".dnaSequence").text(ensemblDNA).attr({ href: ensemblHrefTemplate + ensemblDNA });

        // Protein Information

        var uniprotProteinType = gene.uniprot.proteinType;
        $(".proteinType").text(uniprotProteinType).attr({ href: uniprotHrefTemplate + uniprotProteinType });

        var uniprotProteinSequence = gene.uniprot.proteinSequence;
        $(".proteinSequence").text(uniprotProteinSequence.replace(/\s/g, "")).attr({ href: uniprotHrefTemplate
          + uniprotProteinSequence });

        // Regulation Information
        var regulators = gene.regulators.regulators;
        $(".regulators").append("<dl class=\"row regulatorsTable\"></dl>");
        for (let k = 0; k < regulators.length; k++) {
            $(".regulatorsTable").append("<dt class=\"col-xl-3\">" + regulators[k].regulator + "</dt>");
            $(".regulatorsTable").append("<dd class=\"sgdSource col-xl-9\">"
            + regulators[k].regulationOf + "</dd>");
        }

        var targets = gene.regulators.targets;
        $(".targets").append("<dl class=\"row targetsTable\"></dl>");
        for (let k = 0; k < targets.length; k++) {
            $(".targetsTable").append("<dt class=\"col-xl-3\">" + targets[k].target + "</dt>");
            $(".targetsTable").append("<dd class=\"sgdSource col-xl-9\">"
            + targets[k].regulationOf + "</dd>");
        }

        // Interaction: Physical Reaction

        var sgdInteractions = gene.sgd.totalInteractions;
        $(".totalInteractions").text(sgdInteractions).attr({ href: sgdHrefTemplate + sgdInteractions });

        var sgdAffinityCaptureMS = gene.sgd.affinityCaptureMS;
        $(".affinityCaptureMS").text(sgdAffinityCaptureMS).attr({ href: sgdHrefTemplate + sgdAffinityCaptureMS });

        var sgdAffinityCaptureRNA = gene.sgd.affinityCaptureRNA;
        $(".affinityCaptureRNA").text(sgdAffinityCaptureRNA).attr({ href: sgdHrefTemplate + sgdAffinityCaptureRNA });

        var sgdAffinityCaptureWesterns = gene.sgd.affinityCaptureWestern;
        $(".affinityCaptureWestern").text(sgdAffinityCaptureWesterns).attr(
            { href: sgdHrefTemplate + sgdAffinityCaptureWesterns });

        var sgdBiochemicalActivity = gene.sgd.biochemicalActivity;
        $(".biochemicalActivity").text(sgdBiochemicalActivity).attr({ href: sgdHrefTemplate + sgdBiochemicalActivity });

        var sgdColocalization = gene.sgd.colocalization;
        $(".colocalization").text(sgdColocalization).attr({ href: sgdHrefTemplate + sgdColocalization });

        var sgdReconstitutedComplex = gene.sgd.reconstitutedComplex;
        $(".reconstitutedComplex").text(sgdReconstitutedComplex).attr(
            { href: sgdHrefTemplate + sgdReconstitutedComplex });

        var sgdTwoHybrid = gene.sgd.twoHybrid;
        $(".twoHybrid").text(sgdTwoHybrid).attr({ href: sgdHrefTemplate + sgdTwoHybrid });

        // Genetic Interactions

        var sgdDosage = gene.sgd.dosageRescue;
        $(".dosageRescue").text(sgdDosage).attr({ href: sgdHrefTemplate + sgdDosage });

        var sgdNegGen = gene.sgd.negativeGenetic;
        $(".negativeGenetic").text(sgdNegGen).attr({ href: sgdHrefTemplate + sgdNegGen });

        var sgdEnhance = gene.sgd.phenotypicEnhancement;
        $(".phenotypicEnhancement").text(sgdEnhance).attr({ href: sgdHrefTemplate + sgdEnhance });

        var sgdSuppress = gene.sgd.phenotypicSuppression;
        $(".phenotypicSuppression").text(sgdSuppress).attr({ href: sgdHrefTemplate + sgdSuppress });

        var sgdGrowthDefect = gene.sgd.syntheticGrowthDefect;
        $(".syntheticGrowthDefect").text(sgdGrowthDefect).attr({ href: sgdHrefTemplate + sgdGrowthDefect });

        var sgdHaploin = gene.sgd.syntheticHaploinsufficiency;
        $(".syntheticHaploinsufficiency").text(sgdHaploin).attr({ href: sgdHrefTemplate + sgdHaploin });

        var sgdLethality = gene.sgd.syntheticLethality;
        $(".syntheticLethality").text(sgdLethality).attr({ href: sgdHrefTemplate + sgdLethality });

        var sgdRescue = gene.sgd.syntheticRescue;
        $(".syntheticRescue").text(sgdRescue).attr({ href: sgdHrefTemplate + sgdRescue });


        // Gene Ontology
        var sgdSummary = gene.sgd.geneOntologySummary;
        $(".geneSummary").text(sgdSummary).attr({ href: sgdHrefTemplate + sgdSummary });

        var molecularFunction = gene.geneOntology.molecularFunction;
        var link;
        if (molecularFunction !== "Not found") {
            $(".molecularFunction").append("<dl class=\"row molecularFunctionTable\"></dl>");
            for (let k = 0; k < molecularFunction.length; k++) {
                link = "https://www.yeastgenome.org" + molecularFunction[k].link;
                $(".molecularFunctionTable").append("<dd><a href=\"" + link
                + "\" class=\"col-xl-3\">" + molecularFunction[k].id + "</a></dd>");
                $(".molecularFunctionTable").append("<dd class=\"sgdSource col-xl-9\">"
                + molecularFunction[k].displayName + "</dd>");
            }
        } else {
            $(".molecularFunction").text("Not found").attr({ class : "sgdSource"});
        }


        let biologicalProcess = gene.geneOntology.biologicalProcess;
        if (biologicalProcess !== "Not found") {
            $(".biologicalProcess").append("<dl class=\"row biologicalProcessTable\"></dl>");
            for (let k = 0; k < biologicalProcess.length; k++) {
                link = "https://www.yeastgenome.org" +  biologicalProcess[k].link;
                $(".biologicalProcessTable").append("<dd><a href=\"" + link
                + "\"  class=\"col-xl-3\">" + biologicalProcess[k].id + "</a></dd>");
                $(".biologicalProcessTable").append("<dd class=\"sgdSource col-xl-9\">"
                + biologicalProcess[k].displayName + "</dd>");
            }
        } else {
            $(".biologicalProcess").text("Not found").attr({ class : "sgdSource"});
        }

        let cellularComponent = gene.geneOntology.cellularComponent;
        if (biologicalProcess !== "Not found") {
            $(".cellularComponent").append("<dl class=\" row cellularComponentTable\"></dl>");
            for (let k = 0; k < cellularComponent.length; k++) {
                link = "https://www.yeastgenome.org" +  cellularComponent[k].link;
                $(".cellularComponentTable").append("<dd><a href=\"" + link
                + "\" class=\"col-xl-3\">" + cellularComponent[k].id + "</a></dd>");
                $(".cellularComponentTable").append("<dd class=\"sgdSource col-xl-9\">"
                + cellularComponent[k].displayName + "</dd>");
            }
        } else {
            $(".cellularComponent").text("Not found").attr({ class : "sgdSource"});
        }


        // Fequency Matrix and Sequence Logo
        var sequenceLogo = gene.jaspar.sequenceLogo;
        $(".sequenceLogo").attr({ src : sequenceLogo });

        var frequencyMatrix = gene.jaspar.frequencyMatrix;

        var a = "";
        try {
            for (var i = 0; i < frequencyMatrix.A.length; i++) {
                a += "<td>" + frequencyMatrix.A[i] + "</td>";
            }
        } catch (e) {
            a += "<td> Not found </td>";
        }

        $(".frequencyOfA").append($(a));

        var c = "";
        try {
            for (var k = 0; k < frequencyMatrix.C.length; k++) {
                c += "<td>" + frequencyMatrix.C[k] + "</td>";
            }
        } catch (e) {
            c += "<td> Not found </td>";
        }
        $(".frequencyOfC").append($(c));

        var g = "";
        try {
            for (var j = 0; j < frequencyMatrix.C.length; j++) {
                g += "<td>" + frequencyMatrix.C[j] + "</td>";
            }
        } catch (e) {
            g += "<td> Not found </td>";
        }
        $(".frequencyOfG").append($(g));

        var t = "";
        try {
            for (var h = 0; h < frequencyMatrix.C.length; h++) {
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

        $("<a class=\"sourceLink\"> <sup>[1]</sup></a>").appendTo(".sgdSource");
        $("<a class=\"sourceLink\"><sup>[2]</sup></a>").appendTo(".uniprotSource");
        $("<a class=\"sourceLink\"><sup>[3]</sup></a>").appendTo(".ensemblSource");
        $("<a class=\"sourceLink\"><sup>[4]</sup></a>").appendTo(".ncbiSource");
        $("<a class=\"sourceLink\"><sup>[5]</sup></a>").appendTo(".jasparSource");



        $("a").attr("target", "blank");

    });
})();
