const TWO_COLUMN_SHEETS = ["production_rates", "degradation_rates", "threshold_b"];

const getGeneNames = function (workbookGenes) {
    const genes = workbookGenes ? workbookGenes : [];
    return genes.map(g => g.name).filter(g => Boolean(g));
};

const computePartialMissingGeneNames = (geneNames, dataByGene) => {
    if (!dataByGene) return geneNames;
    return geneNames.filter(g => dataByGene[g] === undefined);
};

const buildMissingGenesWarning = ({ sheetName, missingGenes, warningsConstants }) => {
    if (!missingGenes.length) return null;
    const warnings = warningsConstants.MISSING_DATABASE_RATES_FOR_TWO_COLUMN_SHEET(
        sheetName,
        missingGenes.join(", ")
    );
    return warnings;
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

    const existingWarnings = new Set(workbookWarnings.map(w => w.errorDescription));

    const uniqueWarnings = messages.filter(w => !existingWarnings.has(w.errorDescription));
    return uniqueWarnings;
};
