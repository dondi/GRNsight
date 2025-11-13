import { get } from "jquery";
import {
  UNWEIGHTED_DEMO_NAME,
  WEIGHTED_DEMO_NAME,
  SCHADE_INPUT_NAME,
  SCHADE_OUTPUT_NAME,
  PPI_DEMO_NAME,
} from "../constants";
// TODO: make this port dynamic in the future based on environment
const API_URL = `http://localhost:${import.meta.env.VITE_PORT}`;

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
 * @param {string} demoValue - React element representing the selected demo
 * @returns {string|null} Returns the corresponding endpoint name (unweighted, weighted, schadeInput, schadeOutput, ppi) or error if not found
 */
export const getDemoEndpoint = demoValue => {
  const mapping = Object.entries(DEMO_TYPES).find(
    ([_, value]) => value === demoValue.props.children
  );
  return mapping ? mapping[0] : Error("Demo not found");
};

/**
 * Available demo types with their descriptions
 */
// TODO: Should I point to the constants in web-client-classic instead?

export const DEMO_TYPES = {
  unweighted: UNWEIGHTED_DEMO_NAME,
  weighted: WEIGHTED_DEMO_NAME,
  schadeInput: SCHADE_INPUT_NAME,
  schadeOutput: SCHADE_OUTPUT_NAME,
  ppi: PPI_DEMO_NAME,
};

// import { get } from "jquery";
// import {
//   UNWEIGHTED_DEMO_NAME,
//   WEIGHTED_DEMO_NAME,
//   SCHADE_INPUT_NAME,
//   SCHADE_OUTPUT_NAME,
//   PPI_DEMO_NAME,
// } from "../constants";
// // TODO: make this port dynamic in the future based on environment
// // const env = process.env.NODE_ENV || "development";
// // const config = require("../../../server/config/config")[env];
// const API_URL = getApiUrl();

// /**
//  * Fetches a demo workbook from the server
//  * @param {string} demoType - Type of demo to fetch (unweighted, weighted, schadeInput, schadeOutput, ppi)
//  * @returns {Promise<Object>} The workbook data
//  */
// export async function getDemoWorkbook(demoType) {
//   console.log("api url:", API_URL);
//   return fetch(`${API_URL}/demo/${demoType}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Network response failed: ${response.status}`);
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.error("Error fetching demo workbook:", error);
//       throw error; // Re-throw to allow handling by the calling function
//     });
// }

// /**
//  * Map from demo display names to API endpoint names
//  * @param {string} demoValue - React element representing the selected demo
//  * @returns {string|null} Returns the corresponding endpoint name (unweighted, weighted, schadeInput, schadeOutput, ppi) or error if not found
//  */
// export function getDemoEndpoint(demoValue) {
//   const mapping = Object.entries(DEMO_TYPES).find(
//     ([_, value]) => value === demoValue.props.children
//   );
//   return mapping ? mapping[0] : Error("Demo not found");
// }

// export function getApiUrl() {
//   return `http://localhost:${import.meta.env.VITE_PORT}`;
// }

// export const DEMO_TYPES = {
//   unweighted: UNWEIGHTED_DEMO_NAME,
//   weighted: WEIGHTED_DEMO_NAME,
//   schadeInput: SCHADE_INPUT_NAME,
//   schadeOutput: SCHADE_OUTPUT_NAME,
//   ppi: PPI_DEMO_NAME,
// };
