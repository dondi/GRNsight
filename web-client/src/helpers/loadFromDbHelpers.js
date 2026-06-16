import { NETWORK_GRN_MODE_SHORT, NETWORK_PPI_MODE_SHORT } from "../helpers/constants";

const GENE_EXCEPTIONS = {
  "DUR1,2": "DUR12",
  "IMP2'": "IMP21",
  "ARG5,6": "ARG56",
  "ADE5,7": "ADE57",
  "MF(ALPHA)1": "YPL187W",
  "MF(ALPHA)2": "YGL089C",
};

export const EMPTY_WORKBOOK = {
  genes: {},
  type: NETWORK_GRN_MODE_SHORT,
  source: null,
  sources: {
    proteinProteinInteractions: {},
    geneRegulation: {},
  },
};

export const modeOptions = [
  { label: "Gene Regulatory", value: NETWORK_GRN_MODE_SHORT },
  {
    label: "Protein-Protein Physical Interactions",
    value: NETWORK_PPI_MODE_SHORT,
  },
];

export function getFirstSource(sources) {
  const keys = Object.keys(sources ?? {});
  return keys.length > 0 ? keys[0] : null;
}

export function isValidGene(gene) {
  if (/^[A-Z0-9_-]{1,12}$/.test(gene)) {
    return gene;
  }

  if (Object.prototype.hasOwnProperty.call(GENE_EXCEPTIONS, gene)) {
    return GENE_EXCEPTIONS[gene];
  }

  return "";
}

export function countEdges(links) {
  return Object.values(links ?? {}).reduce((total, targets) => {
    return total + (Array.isArray(targets) ? targets.length : 0);
  }, 0);
}

export function sortWorkbookGenes(genes, workbookType) {
  const entries = Object.entries(genes ?? {});

  if (workbookType === NETWORK_GRN_MODE_SHORT) {
    return entries.sort((a, b) => String(a[1]).localeCompare(String(b[1])));
  }

  return entries.sort((a, b) => String(a[0]).localeCompare(String(b[0])));
}
