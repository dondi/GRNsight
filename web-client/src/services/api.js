import {
  UNWEIGHTED_DEMO_NAME,
  WEIGHTED_DEMO_NAME,
  SCHADE_INPUT_NAME,
  SCHADE_OUTPUT_NAME,
  PPI_DEMO_NAME,
  NETWORK_GRN_MODE_FULL,
  NETWORK_PPI_MODE_FULL,
  NETWORK_GRN_MODE_SHORT,
  NETWORK_PPI_MODE_SHORT,
} from "../constants";
// TODO: make this port dynamic in the future based on environment
const API_URL = import.meta.env.DEV
  ? `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`
  : `https://${import.meta.env.VITE_HOST}`;

/**
 * Fetches a demo workbook from the server
 * @param {string} demoType - Type of demo to fetch (unweighted, weighted, schadeInput, schadeOutput, ppi)
 * @returns {Promise<Object>} The workbook data
 */
export async function getDemoWorkbook(demoType) {
  return fetch(`${API_URL}/demo/${demoType}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response failed: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error fetching demo workbook:", error);
      throw error; // Re-throw to allow handling by the calling function
    });
}

/**
 * Map from demo display names to API endpoint names
 * @param {Object} demoValue - Grommet Text component representing the selected demo
 * @returns {string|null} Returns the corresponding endpoint name (unweighted, weighted, schadeInput, schadeOutput, ppi) or error if not found
 */
export const getDemoEndpoint = demoValue => {
  const mapping = Object.entries(DEMO_TYPES).find(
    ([_, value]) => value === demoValue.props.children
  );
  return mapping ? mapping[0] : Error("Demo not found");
};

export const getNetworkMode = workbookType => {
  if (workbookType === NETWORK_GRN_MODE_SHORT) {
    console.log("workbook type is grn");
    return NETWORK_GRN_MODE_FULL;
  } else if (workbookType === NETWORK_PPI_MODE_SHORT) {
    console.log("workbook type is ppi");
    return NETWORK_PPI_MODE_FULL;
  } else {
    console.log("workbookType", workbookType);
    throw new Error("Unknown workbook type");
  }
};

/**
 * Available demo types with their descriptions
 */
export const DEMO_TYPES = {
  unweighted: UNWEIGHTED_DEMO_NAME,
  weighted: WEIGHTED_DEMO_NAME,
  schadeInput: SCHADE_INPUT_NAME,
  schadeOutput: SCHADE_OUTPUT_NAME,
  ppi: PPI_DEMO_NAME,
};
