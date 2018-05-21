var setupHandlers = require("./setuphandlers");
var updateApp = require("./updateapp");
var grnState = require("./grnstate");
const drawGraph = require("./graph").drawGraph;
const sliderObject = require("./sliders").sliderObject;
const sliderGroupController = require("./sliders").sliderGroupController;
const container = require("./container").container;
const displayStatistics = require("./graph-statistics").displayStatistics; // eslint-disable-line no-unused-vars
const upload = require("./upload").upload;
const nodeColoringController = require("./node-coloring").nodeColoringController;

container();
upload(sliderObject, sliderGroupController, drawGraph, nodeColoringController);
console.log("HELLO WORLD");
setupHandlers(grnState);
console.log("HELLO WORLD");
updateApp(grnState);
