import { container } from "./container";
import { displayStatistics } from "./graph-statistics"; // eslint-disable-line no-unused-vars
import { upload } from "./upload";

import { grnState } from "./grnstate";
import { updateApp } from "./update-app";
import { setupHandlers } from "./setup-handlers";

setupHandlers(grnState);
updateApp(grnState);

container();
upload();
