// TODO: make this port dynamic in the future or load from env vars
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
            // return response.json();
        })
        .catch(error => {
            console.error("Error fetching demo workbook:", error);
            throw error; // Re-throw to allow handling by the calling function
        });
}

/**
 * Uploads a workbook file to the server
 * @param {File} file - The Excel file to upload
 * @returns {Promise<Object>} The parsed workbook data
 */
export async function uploadWorkbook(file) {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(
                        errorData || `Upload failed: ${response.status}`
                    );
                });
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error uploading workbook:", error);
            throw error;
        });
}

/**
 * Available demo types with their descriptions
 */
export const DEMO_TYPES = {
    unweighted: "Demo #1: Unweighted GRN",
    weighted: "Demo #2: Weighted GRN",
    schadeInput: "Demo #3: Schade Input",
    schadeOutput: "Demo #4: Schade Output",
    ppi: "Demo #5: Protein-Protein Interaction",
};
