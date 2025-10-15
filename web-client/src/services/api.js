// TODO: make this port dynamic in the future based on environment
const API_URL = "http://localhost:5000";

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
            console.log("Fetched demo workbook successfully");
            return response.json();
        })
        .catch(error => {
            console.error("Error fetching demo workbook:", error);
            throw error; // Re-throw to allow handling by the calling function
        });
}

/**
 * Available demo types with their descriptions
 */
export const DEMO_TYPES = {
    unweighted:
        "Demo #1: Unweighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)",
    weighted:
        "Demo #2: Weighted GRN (15 genes, 28 edges, Dahlquist Lab unpublished data)",
    schadeInput: "Demo #3: Unweighted GRN (21 genes, 31 edges)",
    schadeOutput:
        "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)",
    ppi: "Demo #5: Protein-Protein Interaction (18 proteins, 81 edges)",
};
