/*http://bl.ocks.org/mbostock/4062045 used as reference
 *As well as http://bl.ocks.org/mbostock/3750558
 *and http://bl.ocks.org/mbostock/950642
 *and http://bl.ocks.org/mbostock/1153292
 */
 

  var drawGraph = function (nodes, links) {
    /*
    var nodes = [
      {name: 'ACE2'},
      {name: 'AFT2'},
      {name: 'CIN5'},
      {name: 'FHL1'},
      {name: 'FKH2'},
      {name: 'GLN3'},
      {name: 'HAP5'}];

    var links = [
      {'source':1,'target':0},
      {'source':4,'target':2}
    ];
    */
  
    var width = 960,
        height = 700;
  
    var color = d3.scale.category20();

    var diagonal = d3.svg.diagonal()
      .projection(function(d) {return [d.y, d.x];});

    var force = d3.layout.force()
        .size([width, height])
        .on("tick", tick)
        .linkDistance(80)
        .charge(-300);

    var drag = force.drag()
        .on("dragstart", dragstart);
  
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);
    
    //Adding the arrowheads
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewbox", "0 0 6 6")
      .attr("refX", 6)
      .attr("refY", 3)
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 6 3 L 0 6 Z"); 
  
    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");

    force.nodes(nodes)
         .links(links)
         .start();
         
    node = node.data(nodes)
               .enter().append("g")
               .attr("class", "node")
               .call(force.drag);
           
    link = link.data(links)
               .enter().append("g")
               .attr("class", "link");
               
    /*Big thanks to the following for the smart edges
     *https://github.com/cdc-leeds/PolicyCommons/blob/b0dea2a4171989123cbee377a6ae260b8612138e/visualize/conn-net-svg.js#L119
     */
    link.append("path")
        .attr("d", function(d) {
          return moveTo(d) + lineTo(d);
        }) 
        .attr("marker-end", "url(#arrowhead)");      
        
    node.append("rect")
       .attr("width", function (d) {
           return d.name.length * 20;
       })
       .attr("height", 30)
       .on("dblclick", dblclick);
           
    node.append("text")
      .attr("dx", 15)
      .attr("dy", 15)
      .style("font-size", "14px")
      .style("stroke-width", "0")
      .style("fill", "black")
      .text(function(d) {return d.name;});



           
    $('.node').css({
      'cursor': 'move',
      'fill': 'white',
      'stroke': '#000',
      'stroke-width': '1.5px'
    });

    $('.link').css({
      'stroke': '#000',
      'stroke-width': '1.5px'
    });

    function tick() {
      link.attr("x1", function(d) { return d.source.x;})
          .attr("y1", function(d) { return d.source.y;})
          .attr("x2", function(d) { return d.target.x;})
          .attr("y2", function(d) { return d.target.y;});

      node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")";});
    }

    function dblclick(d) {
      d3.select(this).classed("fixed", d.fixed = false);
    }

    function dragstart(d) {
      d3.select(this).classed("fixed", d.fixed = true);
    }
    
    function moveTo(d) {
      var node = d3.select("#node" + d.source.index),
          w = parseFloat(node.attr("width")),
          h = parseFloat(node.attr("height"));
          
      d.source.newX = d.source.x + (w/2);
      d.source.newY = d.source.y + (h/2);
          
      return "M" + d.source.newX + "," + d.target.newY;
    }
    
    function lineTo(d) {
      var node = d3.select("#node" + d.target.index),
          w = parseFloat(node.attr("width")),
          h = parseFloat(node.attr("height"));
          
      d.target.centerX = d.target.x + (w/2);
      d.target.centerY = d.target.y + (h/2);
      
      //This function calculates the newX and newY
      smartPathEnd(d, w, h);
      
      return " L" + d.target.newX + "," + d.target.newY;
    }
  }
