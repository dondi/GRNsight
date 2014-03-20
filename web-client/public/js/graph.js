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
   
    link = link.data(links)
             .enter().append("path")
             .attr("class", "link")
             .attr("marker-end", "url(#arrowhead)");
         
    node = node.data(nodes)
               .enter().append("g")
               .attr("class", "node")
               .call(force.drag);
           
    node.append("rect")
       .attr("width", function (d) {
           return d.name.length * 20;
       })
       .attr("height", 30)
       .on("dblclick", dblclick);
           
    node.append("text")
      .attr("dx", function (d) {
        return (d.name.length * 20)/2;
      })
      .attr("dy", 15)
      .attr("text-anchor", "middle")
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
      'fill': 'none',
      'stroke-width': '1.5px'
    });

    function tick() {
      /* Allows for looping edges.
       * From http://stackoverflow.com/questions/16358905/d3-force-layout-graph-self-linking-node
       */
      link.attr("d", function(d) {
        var x1 = d.source.x,
            y1 = d.source.y,
            x2 = d.target.x,
            y2 = d.target.y,
            dx = x2 - x1,
            dy = y2 - y1,
            dr = Math.sqrt(dx * dx + dy * dy),

            // Defaults for normal edge.
            drx = dr,
            dry = dr,
            xRotation = 0, // degrees
            largeArc = 0, // 1 or 0
            sweep = 1; // 1 or 0

            // Self edge.
            if ( x1 === x2 && y1 === y2 ) {
              //Move the position of the loop
              //Couldn't figure out how to derive the width of the rectangle from here,
              //so it is being calculated again. May need to set it when the node is created.
              x1 = d.source.x + (d.source.name.length * 20);
              y1 = d.source.y + 15;
              // Fiddle with this angle to get loop oriented.
              xRotation = 45;

              // Needs to be 1.
              largeArc = 1;

              // Change sweep to change orientation of loop. 
              sweep = 0;

              // Make drx and dry different to get an ellipse
              // instead of a circle.
              drx = 15;
              dry = 15;

              // For whatever reason the arc collapses to a point if the beginning
              // and ending points of the arc are the same, so kludge it.
              x2 = x1 + 1;
              y2 = y1;
            } 

       return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
    });

      node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")";});
    }

    function dblclick(d) {
      d3.select(this).classed("fixed", d.fixed = false);
    }

    function dragstart(d) {
      d3.select(this).classed("fixed", d.fixed = true);
    }
  }
