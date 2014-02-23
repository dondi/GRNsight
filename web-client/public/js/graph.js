/*http://bl.ocks.org/mbostock/4062045 used as reference
 *As well as http://bl.ocks.org/mbostock/3750558
 */

var width = 960,
    height = 500;
    
var color = d3.scale.category20();

var force = d3.layout.force()
    .size([width, height])
    .on("tick", tick);

var drag = force.drag()
    .on("dragstart", dragstart);
    
