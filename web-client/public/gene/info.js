(function () {
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

        var sgdHrefTemplate = "https://www.yeastgenome.org/locus/";
        var sgdId = gene.sgd.sgdID;
        $(".sgd-link").text(sgdId).attr({ href: sgdHrefTemplate + sgdId });

        var ncbiHrefTemplate = "https://www.ncbi.nlm.nih.gov/gene/";
        var ncbiId = gene.ncbi.ncbiID;
        $(".ncbi-link").text(ncbiId).attr({ href: ncbiHrefTemplate + ncbiId });

        var ensemblHrefTemplate = "https://www.ensembl.org/Saccharomyces_cerevisiae/Gene/" +
        "/Summary?db=core;g=YFL039C;r=VI:53260-54696;t=";
        var ensemblId = gene.ensembl.ensemblID;
        $(".ensembl-link").text(ensemblId).attr({ href: ensemblHrefTemplate + ensemblId });

        var uniprotHrefTemplate = "http://www.uniprot.org/uniprot/";
        var uniprotId = gene.uniprot.uniprotID;
        $(".uniprot-link").text(uniprotId).attr({ href: uniprotHrefTemplate + uniprotId });

        var jasparHrefTemplate = "http://jaspar.genereg.net/matrix/";
        var jasparId = gene.jaspar.jasparID;
        $(".jaspar-link").text(jasparId).attr({ href: jasparHrefTemplate + jasparId });
        // General Information Section

        var ensemblInfo = gene.ensembl.description;
        $(".ensemblDescription").text(ensemblInfo).attr({ href: ensemblHrefTemplate + ensemblInfo });


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
        $(".proteinSequence").text(uniprotProteinSequence).attr({ href: uniprotHrefTemplate + uniprotProteinSequence });

      // Regulation Information
        var sgdRequlators = gene.sgd.regulators;
        $(".regulators").text(sgdRequlators).attr({ href: sgdHrefTemplate + sgdRequlators });

        var sgdTargets = gene.sgd.targets;
        $(".targets").text(sgdTargets).attr({ href: sgdHrefTemplate + sgdTargets });

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
        $(".molecularFunction").append("<dl class=\"molecularFunctionTable\"></dl>");
        var k;
        for (k = 0; k < molecularFunction.length; k++) {
            var link = "https://www.yeastgenome.org" + molecularFunction[k].link;
            $(".molecularFunctionTable").append("<a href=\"" + link + "\"><dt>" + molecularFunction[k].id + "</dt></a>");
            $(".molecularFunctionTable").append("<dd>" + molecularFunction[k].displayName + "</dd>");
        }

        var biologicalProcess = gene.geneOntology.biologicalProcess;
        $(".biologicalProcess").append("<dl class=\"biologicalProcessTable\"></dl>");
        for (k = 0; k < biologicalProcess.length; k++) {
            var link = "https://www.yeastgenome.org" +  biologicalProcess[k].link;
            $(".biologicalProcessTable").append("<a href=\"" + link + "\"><dt>" + biologicalProcess[k].id + "</dt></a>");
            $(".biologicalProcessTable").append("<dd>" + biologicalProcess[k].displayName + "</dd>");
        }
    //    $(".biologicalProcess").text(sgdBiologicalProcess).attr({ href: sgdHrefTemplate + sgdBiologicalProcess });

        var cellularComponent = gene.geneOntology.cellularComponent;
        $(".cellularComponent").append("<dl class=\"cellularComponentTable\"></dl>");
        for (k = 0; k < cellularComponent.length; k++) {
            var link = "https://www.yeastgenome.org" +  cellularComponent[k].link;
            $(".cellularComponentTable").append("<a href=\"" + link + "\"><dt>" + biologicalProcess[k].id + "</dt></a>");
            $(".cellularComponentTable").append("<dd>" + biologicalProcess[k].displayName + "</dd>");
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
        $("#ncbiSource").text("4. NCBI Database");
        $("#jasparSource").text("5. Jaspar Database");

        $("<a class=\"sourceLink\"> <sup>[1]</sup></a>").appendTo(".sgdSource");
        $("<a class=\"sourceLink\"><sup>[2]</sup></a>").appendTo(".uniprotSource");
        $("<a class=\"sourceLink\"><sup>[3]</sup></a>").appendTo(".ensemblSource");
        $("<a class=\"sourceLink\"><sup>[4]</sup></a>").appendTo(".ncbiSource");
        $("<a class=\"sourceLink\"><sup>[5]</sup></a>").appendTo(".jasparSource");

        $( ".sourceLink" ).attr({
            "data-toggle": "collapse",
            "data-target": "#sources",
            "href": "#sources"
        });

        $(".sourceLink, button").click(function (event) {
            event.preventDefault();
            var anchorName = $(this).attr("data-target") + "Heading";
            $("html, body").animate({scrollTop: $(anchorName).offset().top});
        });

    });
})();
