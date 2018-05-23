import { updateApp } from "./update-app";

import {
    GREY_EDGES_DASHED_MENU,
    GREY_EDGES_DASHED_SIDEBAR
} from "./constants";

import { setupLoadAndImportHandlers } from "./setup-load-and-import-handlers";

export const setupHandlers = grnState => {
    setupLoadAndImportHandlers(grnState);

    $(GREY_EDGES_DASHED_SIDEBAR).change(() => {
        grnState.dashedLine = $(GREY_EDGES_DASHED_SIDEBAR).prop("checked");
        updateApp(grnState);
    });

    $(GREY_EDGES_DASHED_MENU).click(() => {
        grnState.dashedLine = !$(GREY_EDGES_DASHED_MENU).prop("checked");
        updateApp(grnState);
    });
};
