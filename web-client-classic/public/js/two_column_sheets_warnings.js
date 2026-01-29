const TWO_COLUMN_SHEETS = ["production_rates", "degradation_rates"];

const getGeneNames = function (workbook) {
    const genes = workbook && workbook.genes ? workbook.genes : [];
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

const buildMissingGenesWarning = ({ sheetName, missingGenes, warnings }) => {
    if (!missingGenes.length) return null;
    const gen = warningGeneratorBySheet(warnings)[sheetName];
    return gen ? gen(missingGenes.join(", ")) : null;
};

export const buildWorkbookTwoColumnMissingGenesWarnings = (workbook, warnings, chosenSheets) => {
    const genes = getGeneNames(workbook);
    const messages = [];

    for (const sheetName of TWO_COLUMN_SHEETS) {
        if (chosenSheets && !chosenSheets.includes(sheetName)) {
            continue;
        }

        const twoColumnSheets = workbook.twoColumnSheets || {};
        const sheet = twoColumnSheets[sheetName] || {};
        const data = sheet.data || null;

        const missingGenes =
            !data || Object.keys(data).length === 0
                ? genes
                : computePartialMissingGeneNames(genes, data);

        const msg = buildMissingGenesWarning({
            sheetName,
            missingGenes,
            warnings,
        });

        if (msg) messages.push(msg);
    }

    return messages;
};
