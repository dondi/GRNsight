import { NETWORK_PPI_MODE } from "./constants";

export const proteinToGeneName = (name, mode) =>
    mode === NETWORK_PPI_MODE ? name.replace(/p$/i, "") : name;
