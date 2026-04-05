import {
  DEMO_TYPES,
  NETWORK_GRN_MODE_FULL,
  NETWORK_PPI_MODE_FULL,
  NETWORK_GRN_MODE_SHORT,
  NETWORK_PPI_MODE_SHORT,
} from "../helpers/constants";
import { createFileForm } from "./upload";

// TODO: make this port dynamic in the future based on environment
const API_URL = import.meta.env.DEV
  ? `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`
  : `https://${import.meta.env.VITE_HOST}`;

const buildApiUrl = path => `${API_URL}/${path}`;

const parseResponse = async response => {
  const rawText = await response.text();
  let parsed;

  try {
    parsed = rawText ? JSON.parse(rawText) : null;
  } catch {
    parsed = rawText;
  }

  if (!response.ok) {
    const error = new Error(`Network response failed: ${response.status}`);
    error.status = response.status;
    error.data = parsed;
    throw error;
  }

  return parsed;
};

/**
 * Fetches a demo workbook from the server
 * @param {string} demoType - Type of demo to fetch (unweighted, weighted, schadeInput, schadeOutput, ppi)
 * @returns {Promise<Object>} The workbook data
 */
export async function getDemoWorkbook(demoType) {
  return fetch(buildApiUrl(`demo/${demoType}`))
    .then(parseResponse)
    .catch(error => {
      console.error("Error fetching demo workbook:", error);
      throw error;
    });
}

/**
 * Map from demo display names to API endpoint names
 * @param {Object} demoValue - Grommet Text component representing the selected demo
 * @returns {string|null} Returns the corresponding endpoint name (unweighted, weighted, schadeInput, schadeOutput, ppi) or error if not found
 */
export const getDemoEndpoint = demoValue => {
  const mapping = Object.entries(DEMO_TYPES).find(
    ([_, value]) => value === demoValue.props?.children || value === demoValue
  );
  return mapping ? mapping[0] : Error("Demo not found");
};

export const getNetworkMode = workbookType => {
  if (workbookType === NETWORK_GRN_MODE_SHORT) {
    return NETWORK_GRN_MODE_FULL;
  } else if (workbookType === NETWORK_PPI_MODE_SHORT) {
    return NETWORK_PPI_MODE_FULL;
  } else {
    throw new Error("Unknown workbook type");
  }
};

export async function getWorkbookFromForm(formData, queryURL) {
  const fullUrl = buildApiUrl(queryURL);

  if (!formData) {
    return await fetch(fullUrl).then(parseResponse);
  }

  return fetch(fullUrl, {
    method: "POST",
    body: formData,
  }).then(parseResponse);
}

export const uploadWorkbook = (file, queryURL) => {
  const formData = createFileForm(file);
  return getWorkbookFromForm(formData, queryURL);
};

export async function getWorkbookFromUrl(queryURL) {
  const fullUrl = buildApiUrl(queryURL);
  return await fetch(fullUrl).then(parseResponse);
}
