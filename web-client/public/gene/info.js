(function () {
    var search = location.search.substring(1);
    var obj = search?JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g ,'":"') + '"}',
      function ( key, value) {
          return key === "" ? value : decodeURIComponent(value);
      }):{};

    document.title = "Information About " + obj.symbol;
    $("#gene-name").text(obj.symbol + " Saccharomyces cerevisiae");
    // This is cite used to find the parsing:
    // https://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object

    var api = window.api;
    api.getGeneInformation(obj.symbol).done(function (gene) {
        console.log(gene);

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
        $(".ensemblDescription").text("Description: " + ensemblInfo).attr({ href: ensemblHrefTemplate + ensemblInfo });

        var uniSpecies = gene.uniprot.species;
        $(".uniProtSpecies").text("Species: " + uniSpecies).attr({ href: uniprotHrefTemplate + uniSpecies });

        var ncbiLocus = gene.ncbi.locusTag;
        $(".ncbiLocusTag").text("Locus Tag: " + ncbiLocus).attr({ href: ncbiHrefTemplate + ncbiLocus });

        var jasparFam = gene.jaspar.family;
        $(".jasparFamily").text("Family: " + jasparFam).attr({ href: jasparHrefTemplate + jasparFam });

        var ncbiChromosome = gene.ncbi.chromosomeSequence;
        $(".chromosomeSequence").text("Chromosome Sequence: " + ncbiChromosome).attr({ href: ncbiHrefTemplate + ncbiChromosome });

      // DNA Sequence Tab
        var ensemblDNA = gene.ensembl.dnaSequence;
        $(".dnaSequence").text(ensemblDNA).attr({ href: ensemblHrefTemplate + ensemblDNA });

      // Protein Information

        var uniprotProteinType = gene.uniprot.proteinType;
        $(".proteinType").text("Protein Type: " + uniprotProteinType).attr({ href: uniprotHrefTemplate + uniprotProteinType });

        var uniprotProteinSequence = gene.uniprot.proteinSequence;
        $(".proteinSequence").text("Protein Sequence: " + uniprotProteinSequence).attr({ href: uniprotHrefTemplate + uniprotProteinSequence });

      // Gene mapping
        var geneMap = gene.ensembl.geneMap;
        $(".geneMap").text("Gene Map: " + geneMap).attr({ href: ensemblHrefTemplate + geneMap });

      // Regulation Information
        var sgdRequlators = gene.sgd.regulators;
        $(".regulators").text("Regulators: " + sgdRequlators).attr({ href: sgdHrefTemplate + sgdRequlators });

        var sgdTargets = gene.sgd.targets;
        $(".targets").text("Targets: " + sgdTargets).attr({ href: sgdHrefTemplate + sgdTargets });

      // Interaction: Physical Reaction

        var sgdInteractions = gene.sgd.totalInteractions;
        $(".totalInteractions").text("Total Interactions: " + sgdInteractions).attr({ href: sgdHrefTemplate + sgdInteractions });

        var sgdAffinityCaptureMS = gene.sgd.affinityCaptureMS;
        $(".affinityCaptureMS").text("Affinity Capture MS: " + sgdAffinityCaptureMS).attr({ href: sgdHrefTemplate + sgdAffinityCaptureMS });

        var sgdAffinityCaptureRNA = gene.sgd.affinityCaptureRNA;
        $(".affinityCaptureRNA").text("Affinity Capture RNA: " + sgdAffinityCaptureRNA).attr({ href: sgdHrefTemplate + sgdAffinityCaptureRNA });

        var sgdAffinityCaptureWesterns = gene.sgd.affinityCaptureWestern;
        $(".affinityCaptureWestern").text("Affinity Capture Westerns: " + sgdAffinityCaptureWesterns).attr({ href: sgdHrefTemplate + sgdAffinityCaptureWesterns });

        var sgdBiochemicalActivity = gene.sgd.biochemicalActivity;
        $(".biochemicalActivity").text("Biochemical Activity: " + sgdBiochemicalActivity).attr({ href: sgdHrefTemplate + sgdBiochemicalActivity });

        var sgdColocalization = gene.sgd.colocalization;
        $(".colocalization").text("Colocalization: " + sgdColocalization).attr({ href: sgdHrefTemplate + sgdColocalization });

        var sgdReconstitutedComplex = gene.sgd.reconstitutedComplex;
        $(".reconstitutedComplex").text("Reconstituted Complex: " + sgdReconstitutedComplex).attr({ href: sgdHrefTemplate + sgdReconstitutedComplex });

        var sgdTwoHybrid = gene.sgd.twoHybrid;
        $(".twoHybrid").text("Two Hybrid: " + sgdTwoHybrid).attr({ href: sgdHrefTemplate + sgdTwoHybrid });

      // Genetic Interactions

        var sgdDosage = gene.sgd.dosageRescue;
        $(".dosageRescue").text("Dosage Rescue: " + sgdDosage).attr({ href: sgdHrefTemplate + sgdDosage });

        var sgdNegGen = gene.sgd.negativeGenetic;
        $(".negativeGenetic").text("Negative Genetic: " + sgdNegGen).attr({ href: sgdHrefTemplate + sgdNegGen });

        var sgdEnhance = gene.sgd.phenotypicEnhancement;
        $(".phenotypicEnhancement").text("Phenotypic Enhancement: " + sgdEnhance).attr({ href: sgdHrefTemplate + sgdEnhance });

        var sgdSuppress = gene.sgd.phenotypicSuppression;
        $(".phenotypicSuppression").text("Phenotypic Suppression: " + sgdSuppress).attr({ href: sgdHrefTemplate + sgdSuppress });

        var sgdGrowthDefect = gene.sgd.syntheticGrowthDefect;
        $(".syntheticGrowthDefect").text("Synthetic Growth Defect: " + sgdGrowthDefect).attr({ href: sgdHrefTemplate + sgdGrowthDefect });

        var sgdHaploin = gene.sgd.syntheticHaploinsufficiency;
        $(".syntheticHaploinsufficiency").text("Synthetic Haploin Sufficiency: " + sgdHaploin).attr({ href: sgdHrefTemplate + sgdHaploin });

        var sgdLethality = gene.sgd.syntheticLethality;
        $(".syntheticLethality").text("Synthetic Lethality: " + sgdLethality).attr({ href: sgdHrefTemplate + sgdLethality });

        var sgdRescue = gene.sgd.sgdRescue;
        $(".syntheticRescue").text("Synthetic Rescue: " + sgdRescue).attr({ href: sgdHrefTemplate + sgdRescue });


      // Gene Ontology
        var sgdSummary = gene.sgd.geneOntologySummary;
        $(".geneSummary").text("Gene Summary: " + sgdSummary).attr({ href: sgdHrefTemplate + sgdSummary });

        var sgdMolecularFunction = gene.sgd.molecularFunction;
        $(".molecularFunction").text("Molecular Function: " + sgdMolecularFunction).attr({ href: sgdHrefTemplate + sgdMolecularFunction });

        var sgdBiologicalProcess = gene.sgd.biologicalProcess;
        $(".biologicalProcess").text("Biological Process: " + sgdBiologicalProcess).attr({ href: sgdHrefTemplate + sgdBiologicalProcess });

        var sgdCellularComponent = gene.sgd.cellularComponent;
        $(".cellularComponent").text("Cellular Component: " + sgdCellularComponent).attr({ href: sgdHrefTemplate + sgdCellularComponent });

        // Fequency Matrix and Sequence Logo
        var sequenceLogo = gene.jaspar.sequenceLogo;
        $(".sequenceLogo").attr({ src : sequenceLogo });

        var frequencyMatrix = gene.jaspar.frequencyMatrix;
        var a = "";
        for (var i = 0; i < frequencyMatrix.A.length; i++) {
            a += "<td>" + frequencyMatrix.A[i] + "</td>";
        }
        $(".frequencyOfA").append($(a));
        var c = "";
        for (var k = 0; k < frequencyMatrix.C.length; k++) {
            c += "<td>" + frequencyMatrix.C[k] + "</td>";
        }
        $(".frequencyOfC").append($(c));
        var g = "";
        for (var j = 0; j < frequencyMatrix.G.length; j++) {
            g += "<td>" + frequencyMatrix.G[j] + "</td>";
        }
        $(".frequencyOfG").append($(g));
        var t = "";
        for (var h = 0; h < frequencyMatrix.T.length; h++) {
            t += "<td>" + frequencyMatrix.T[h] + "</td>";
        }
        $(".frequencyOfT").append($(t));
    });
})();
