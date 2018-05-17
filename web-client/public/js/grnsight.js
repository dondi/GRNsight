var setupHandlers = require("setupHandlers");
var updateApp = require("updateApp");
var grnState = require("grnState");
const drawGraph = require("./graph").drawGraph;
const sliderObject = require("./sliders").sliderObject;
const sliderGroupController = require("./sliders").sliderGroupController;
const container = require("./container").container;
const displayStatistics = require("./graph-statistics").displayStatistics; // eslint-disable-line no-unused-vars
const upload = require("./upload").upload;
const nodeColoringController = require("./node-coloring").nodeColoringController;

container();
upload(sliderObject, sliderGroupController, drawGraph, nodeColoringController);
