import { TWO_COLUMN_SHEETS } from "./constants.js";

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

const getChosenTwoColumnSheets = chosenSheets => {
    if (!chosenSheets) return [];
    return TWO_COLUMN_SHEETS.filter(sheetName => chosenSheets.includes(sheetName));
};

const hasWarningCode = (warningsList, code) => warningsList.some(w => w.warningCode === code);

const getMissingAllGenesAndValuesCode = sheetName =>
    `MISSING_ALL_GENES_AND_VALUES_IN_TWO_COLUMN_SHEET_${sheetName.toUpperCase()}`;
const getMissingAllValuesCode = sheetName =>
    `MISSING_ALL_VALUES_IN_TWO_COLUMN_SHEET_${sheetName.toUpperCase()}`;

const buildMissingOrEmptyWarning = ({
    sheetName,
    isMissing,
    warningsConstants,
    workbookWarnings = [],
}) => {
    const hasMissingAllGenesAndValuesWarning = hasWarningCode(
        workbookWarnings,
        getMissingAllGenesAndValuesCode(sheetName)
    );
    const hasMissingAllValuesWarning = hasWarningCode(
        workbookWarnings,
        getMissingAllValuesCode(sheetName)
    );

    if (hasMissingAllGenesAndValuesWarning) {
        return warningsConstants.MISSING_ALL_GENES_AND_VALUES_IN_TWO_COLUMN_SHEET(
            sheetName,
            /* isAllGenesMissing= */ true
        );
    } else if (hasMissingAllValuesWarning) {
        return warningsConstants.MISSING_ALL_GENES_AND_VALUES_IN_TWO_COLUMN_SHEET(
            sheetName,
            /* isAllGenesMissing= */ false
        );
    } else {
        return warningsConstants.MISSING_OR_EMPTY_TWO_COLUMN_SHEET(sheetName, isMissing);
    }
};

export const buildPreFetchTwoColumnWarnings = ({
    workbookTwoColumnSheets,
    chosenSheets,
    source,
    warningsConstants,
    workbookWarnings,
}) => {
    const chosenTwoColumnSheets = getChosenTwoColumnSheets(chosenSheets);

    const warningsToAdd = [];
    const sheetsToFetch = [];

    for (const sheetName of chosenTwoColumnSheets) {
        const sheetData = (workbookTwoColumnSheets || {})[sheetName];
        const isMissing = sheetData === null || sheetData === undefined;
        const isEmpty = !isMissing && Object.keys(sheetData.data || {}).length === 0;

        if (isMissing || isEmpty) {
            if (source === "userInput") {
                const warning = buildMissingOrEmptyWarning({
                    sheetName,
                    isMissing,
                    warningsConstants,
                    workbookWarnings,
                });
                warningsToAdd.push(warning);
            }
            sheetsToFetch.push(sheetName);
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
    warningsConstants
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
            warningsConstants,
        });

        if (warning) warnings.push(warning);
    }
    return warnings;
};
