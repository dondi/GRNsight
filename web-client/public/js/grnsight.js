const drawGraph = require("./graph").drawGraph;
const sliderObject = require("./sliders").sliderObject;
const sliderGroupController = require("./sliders").sliderGroupController;
const container = require("./container").container;
const displayStatistics = require("./graph-statistics").displayStatistics; // eslint-disable-line no-unused-vars
const upload = require("./upload").upload;
const nodeColoringController = require("./node-coloring").nodeColoringController;
import setupHandlers from "setuphandlers";
import grnState from "grnstate";

setupHandlers(grnState);
container();
upload(sliderObject, sliderGroupController, drawGraph, nodeColoringController);
