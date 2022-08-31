import { displayStatistics } from "./graph-statistics"; // eslint-disable-line no-unused-vars
import { upload } from "./upload";
import { createNetwork } from "./createNetwork";

import { grnState } from "./grnstate";
import { updateApp } from "./update-app";
import { setupHandlers } from "./setup-handlers";

setupHandlers(grnState);
updateApp(grnState);

upload();
createNetwork();
