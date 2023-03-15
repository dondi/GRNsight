import { displayStatistics } from "./graph-statistics"; // eslint-disable-line no-unused-vars
import { upload } from "./upload";
import { generateNetwork } from "./generateNetwork";

import { grnState } from "./grnstate";
import { updateApp } from "./update-app";
import { setupHandlers } from "./setup-handlers";

setupHandlers(grnState);
updateApp(grnState);

upload();
generateNetwork();
