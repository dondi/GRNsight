import { createContext } from 'react';

export const GrnState = createContext({
    networkMode: null, setNetworkMode: () => {},
    enableNodeColoring: null, setEnableNodeColoring: () => {},
    enableEdgeColoring: null, setEnableEdgeColoring: () => {},
    linkDistance: null, setLinkDistance: () => {},
    charge: null, setCharge: () => {},
    lockForceParameters: null, setLockForceParameters: () => {},
    averageReplicateValuesTop: null, setAverageReplicateValuesTop: () => {},
    averageReplicateValuesBottom: null, setAverageReplicateValuesBottom: () => {},
    logFoldChangeMax: null, setLogFoldChangeMax: () => {},
    edgeWeightVisibility: null, setEdgeWeightVisibility: () => {},
    edgeWeightNormalization: null, setEdgeWeightNormalization: () => {},
    grayThreshold: null, setGrayThreshold: () => {},
    showGrayEdgesDashed: null, setShowGrayEdgesDashed: () => {},
    restrictGraphToViewport: null, setRestrictGraphToViewport: () => {},
    demoValue: null, setDemoValue: () => {},
    viewSize: null, setViewSize: () => {}
});