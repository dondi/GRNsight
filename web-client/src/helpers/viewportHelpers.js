import {
  VIEW_SIZE_SMALL,
  VIEW_SIZE_MEDIUM,
  VIEW_SIZE_LARGE,
  MEDIUM_PAGE_WIDTH,
  LARGE_PAGE_WIDTH,
} from "./constants";

export function initialViewportSize(width) {
  if (width < MEDIUM_PAGE_WIDTH) {
    console.log("initializing viewport size as small", VIEW_SIZE_SMALL);
    return VIEW_SIZE_SMALL;
  } else if (width > MEDIUM_PAGE_WIDTH && width < LARGE_PAGE_WIDTH) {
    return VIEW_SIZE_MEDIUM;
  } else {
    return VIEW_SIZE_LARGE;
  }
}
