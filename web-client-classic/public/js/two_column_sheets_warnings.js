import { TWO_COLUMN_SHEETS } from "./constants.js";

const getGeneNames = function (workbookGenes) {
    const genes = workbookGenes ? workbookGenes : [];
    return genes.map(g => g.name).filter(g => Boolean(g));
};

const computePartialMissingGeneNames = (geneNames, dataByGene) => {
    if (!dataByGene) return geneNames;
    return geneNames.filter(g => dataByGene[g] === undefined);
};

const buildMissingGenesWarning = ({ sheetName, missingGenes, exportWarningsConstants }) => {
    if (!missingGenes.length) return null;
    const warnings = exportWarningsConstants.MISSING_DATABASE_RATES_FOR_TWO_COLUMN_SHEET(
        sheetName,
        missingGenes.join(", ")
    );
    return warnings;
};

const getChosenTwoColumnSheets = chosenSheets => {
    if (!chosenSheets) return [];
    return TWO_COLUMN_SHEETS.filter(sheetName => chosenSheets.includes(sheetName));
};

const findWarningByCode = (warningsList, code) => warningsList.find(w => w.warningCode === code);
const toExportWarningFromImportWarning = importWarning => {
    if (!importWarning) return null;
    return {
        ...importWarning,
        // TODO: Need to also include that the warning is there because of the imported workbook
        errorDescription: importWarning.errorDescription.replace(/\bimported\b/gi, "exported"),
    };
};
const migrateImportWarnings = (workbookWarnings, codes) => {
    const found = codes.map(code => findWarningByCode(workbookWarnings, code)).filter(Boolean);
    return found.map(toExportWarningFromImportWarning);
};

const buildMissingOrEmptyWarning = ({
    sheetName,
    isMissing,
    exportWarningsConstants,
    workbookWarnings = [],
}) => {
    const missingAllGenesAndValues = findWarningByCode(
        workbookWarnings,
        `MISSING_ALL_GENES_AND_VALUES_${sheetName.toUpperCase()}`
    );
    const missingAllValues = findWarningByCode(
        workbookWarnings,
        `MISSING_ALL_VALUES_${sheetName.toUpperCase()}`
    );
    if (missingAllGenesAndValues) {
        return exportWarningsConstants.MISSING_ALL_GENES_AND_VALUES(sheetName, true);
    }

    if (missingAllValues) {
        return exportWarningsConstants.MISSING_ALL_GENES_AND_VALUES(sheetName, false);
    }

    return exportWarningsConstants.MISSING_OR_EMPTY_TWO_COLUMN_SHEET(sheetName, isMissing);
};

const wrongGeneOrderWarning = (sheetName, workbookWarnings, exportWarningsConstants) => {
    if (findWarningByCode(workbookWarnings, `WRONG_GENE_ORDER_${sheetName.toUpperCase()}`)) {
        return exportWarningsConstants.WRONG_GENE_ORDER(sheetName);
    }
};

export const buildPreFetchTwoColumnWarnings = ({
    workbookTwoColumnSheets,
    chosenSheets,
    source,
    exportWarningsConstants,
    workbookWarnings,
}) => {
    const chosenTwoColumnSheets = getChosenTwoColumnSheets(chosenSheets);

    const warningsToAdd = [];
    const sheetsToFetch = [];

    for (const sheetName of chosenTwoColumnSheets) {
        const sheetUpperName = sheetName.toUpperCase();
        const sheetData = (workbookTwoColumnSheets || {})[sheetName];
        const isMissing = sheetData === null || sheetData === undefined;
        const isEmpty = !isMissing && Object.keys(sheetData.data || {}).length === 0;

        if (isMissing || isEmpty) {
            if (source === "userInput") {
                const warning = buildMissingOrEmptyWarning({
                    sheetName,
                    isMissing,
                    exportWarningsConstants,
                    workbookWarnings,
                });
                warningsToAdd.push(warning);
            }

            if (sheetName.includes("optimized")) {
                continue;
            }

            sheetsToFetch.push(sheetName);
        }

        // Carry import warning to export warning if applicable
        const importWarningCodesToMigrate = [
            `MISSING_GENES_AND_VALUES_${sheetUpperName}`,
            `EXTRA_GENES_${sheetUpperName}`,
            `MISSING_VALUES_${sheetUpperName}`,
        ];
        warningsToAdd.push(...migrateImportWarnings(workbookWarnings, importWarningCodesToMigrate));

        const wrongGeneOrder = wrongGeneOrderWarning(
            sheetName,
            workbookWarnings,
            exportWarningsConstants
        );
        if (wrongGeneOrder) {
            warningsToAdd.push(wrongGeneOrder);
        }
    }

    return {
        chosenTwoColumnSheets,
        sheetsToFetch,
        warningsToAdd: warningsToAdd,
    };
};

export const buildPostFetchTwoColumnWarnings = (
    workbookGenes,
    workbookTwoColumnSheets,
    chosenSheets,
    exportWarningsConstants
) => {
    const genes = getGeneNames(workbookGenes);
    const warnings = [];

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

        const warning = buildMissingGenesWarning({
            sheetName,
            missingGenes,
            exportWarningsConstants,
        });

        if (warning) warnings.push(warning);
    }
    return warnings;
};
