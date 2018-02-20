import Grid from 'd3-v4-grid';
const drawGraph = require('./graph').drawGraph;
const sliderObject = require('./sliders').sliderObject;
const sliderGroupController = require('./sliders').sliderGroupController;
const container = require('./container').container;
const displayStatistics = require('./graph-statistics').displayStatistics;
const upload = require('./upload').upload;

container();
upload(sliderObject, sliderGroupController, drawGraph);
