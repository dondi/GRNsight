import { displayStatistics } from "./graph-statistics";
import { upload } from "./upload";
import { generateNetwork } from "./generateNetwork";

import { grnState } from "./grnstate";
import { queryDefaultDataset } from "./api/grnsight-api.js";
import { updateApp } from "./update-app";
import { setupHandlers } from "./setup-handlers";

async function updateDefaultDataset() {
    try {
        const response = await queryDefaultDataset({ type: "DefaultDataset" });
        grnState.database = response;
        return response.defaultDataset.join();
    } catch (error) {
        console.log(error.stack);
        console.log(error.name);
        console.log(error.message);
    }
}

async function initializeGrnsight() {
    const defaultDataset = await updateDefaultDataset();
    grnState.defaultDataset = defaultDataset;

    setupHandlers(grnState);
    updateApp(grnState);

    upload();
    generateNetwork();
}

initializeGrnsight();
