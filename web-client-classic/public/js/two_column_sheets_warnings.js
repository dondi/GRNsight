const TWO_COLUMN_SHEETS = ["production_rates", "degradation_rates", "threshold_b"];

const getGeneNames = function (workbookGenes) {
    const genes = workbookGenes ? workbookGenes : [];
    return genes.map(g => g.name).filter(g => Boolean(g));
};

const computePartialMissingGeneNames = (geneNames, dataByGene) => {
    if (!dataByGene) return geneNames;
    return geneNames.filter(g => dataByGene[g] === undefined);
};

const warningGeneratorBySheet = warnings => ({
    production_rates: warnings.MISSING_PRODUCTION_RATES,
    degradation_rates: warnings.MISSING_DEGRADATION_RATES,
});

const buildMissingGenesWarning = ({ sheetName, missingGenes, warningsConstants }) => {
    if (!missingGenes.length) return null;
    const gen = warningGeneratorBySheet(warningsConstants)[sheetName];
    return gen ? gen(missingGenes.join(", ")) : null;
};

export const buildWorkbookTwoColumnMissingGenesWarnings = (
    workbookGenes,
    workbookTwoColumnSheets,
    chosenSheets,
    warningsConstants,
    workbookWarnings
) => {
    const genes = getGeneNames(workbookGenes);
    const messages = [];

    for (const sheetName of TWO_COLUMN_SHEETS) {
        if (chosenSheets && !chosenSheets.includes(sheetName)) {
            continue;
        }

        const twoColumnSheets = workbookTwoColumnSheets || {};
        const sheet = twoColumnSheets[sheetName] || {};
        const data = sheet.data || null;

        const missingGenes =
            !data || Object.keys(data).length === 0
                ? genes
                : computePartialMissingGeneNames(genes, data);

        const msg = buildMissingGenesWarning({
            sheetName,
            missingGenes,
            warningsConstants,
        });

        if (msg) messages.push(msg);
    }

    const exisitingWarnings = new Set(workbookWarnings.map(w => w.errorDescription));

    const uniqueWarnings = messages.filter(w => !exisitingWarnings.has(w.errorDescription));
    return uniqueWarnings;
};
