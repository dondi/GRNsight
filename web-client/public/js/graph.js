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
        .charge(-500);

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
               .enter().append("g")
               .attr("class", "link"); 
                 
    node = node.data(nodes)
               .enter().append("g")
               .attr("class", "node")
               .attr("id", function(d) {
                 return "node" + d.index;
               })
               .attr("transform", function(d) {
                 return "translate(" + d.x + d.y + ")";
               })
               .attr("width", function (d) {
                 return d.name.length * 20;
               })
               .attr("height", 30)
               .call(force.drag);
               
    link.append("path")
        .attr("id", function(d) {
          return "path" + d.source.index + "_" + d.target.index;
        })
        .attr("d", function(d) {
          return moveTo(d) + lineTo(d);
        }) 
        .attr("marker-end", "url(#arrowhead)"); 
           

               
    /*Big thanks to the following for the smart edges
     *https://github.com/cdc-leeds/PolicyCommons/blob/b0dea2a4171989123cbee377a6ae260b8612138e/visualize/conn-net-svg.js#L119
     */
    function moveTo(d) {
      var node = d3.select("#node" + d.source.index),
          w = parseFloat(node.attr("width")),
          h = parseFloat(node.attr("height"));
          
      d.source.newX = d.source.x + (w/2);
      d.source.newY = d.source.y + (h/2);
          
      return "M" + d.source.newX + "," + d.source.newY;
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
    
    function smartPathEnd(d, w, h) {

				// We need to work out the (tan of the) angle between the
				// imaginary horizontal line running through the center of the
				// target node and the imaginary line connecting the center of
				// the target node with the top-left corner of the same
				// node. Of course, this angle is fixed.
				var tanRatioFixed =
						(d.target.centerY - d.target.y)
						/
						(d.target.centerX - d.target.x);

				// We also need to work out the (tan of the) angle between the
				// imaginary horizontal line running through the center of the
				// target node and the imaginary line connecting the center of
				// the target node with the center of the source node. This
				// angle changes as the nodes move around the screen.
				var tanRatioMoveable =
						Math.abs(d.target.centerY - d.source.newY)
						/
						Math.abs(d.target.centerX - d.source.newX); // Note,
						// JavaScript handles division-by-zero by returning
						// Infinity, which in this case is useful, especially
						// since it handles the subsequent Infinity arithmetic
						// correctly.

				// Now work out the intersection point

				if (tanRatioMoveable == tanRatioFixed) {
						// Then path is intersecting at corner of textbox so draw
						// path to that point

						// By default assume path intersects a left-side corner
						d.target.newX = d.target.x;

						// But...
						if (d.target.centerX < d.source.newX) {
								// i.e. if target node is to left of the source node
								// then path intersects a right-side corner
								d.target.newX = d.target.x + w;
						}

						// By default assume path intersects a top corner
						d.target.newY = d.target.y;

						// But...
						if (d.target.centerY < d.source.newY) {
								// i.e. if target node is above the source node
								// then path intersects a bottom corner
								d.target.newY = d.target.y + h;
						}
				}

				if (tanRatioMoveable < tanRatioFixed) {
						// Then path is intersecting on a vertical side of the
						// textbox, which means we know the x-coordinate of the
						// path endpoint but we need to work out the y-coordinate

						// By default assume path intersects left vertical side
						d.target.newX = d.target.x;

						// But...
						if (d.target.centerX < d.source.newX) {
								// i.e. if target node is to left of the source node
								// then path intersects right vertical side
								d.target.newX = d.target.x + w;
						}

						// Now use a bit of trigonometry to work out the y-coord.

						// By default assume path intersects towards top of node								
						d.target.newY =
								d.target.centerY - ((d.target.centerX - d.target.x)
																		*
																		tanRatioMoveable);

						// But...
						if (d.target.centerY < d.source.newY) {
								// i.e. if target node is above the source node
								// then path intersects towards bottom of the node
								d.target.newY = (2 * d.target.y) - d.target.newY + h;
						}
				}

				if (tanRatioMoveable > tanRatioFixed) {
						// Then path is intersecting on a horizontal side of the
						// textbox, which means we know the y-coordinate of the
						// path endpoint but we need to work out the x-coordinate

						// By default assume path intersects top horizontal side
						d.target.newY = d.target.y;

						// But...
						if (d.target.centerY < d.source.newY) {
								// i.e. if target node is above the source node
								// then path intersects bottom horizontal side
								d.target.newY = d.target.y + h;
						}

						// Now use a bit of trigonometry to work out the x-coord.

						// By default assume path intersects towards lefthand side
						d.target.newX =
								d.target.centerX - ((d.target.centerY - d.target.y)
																		/
																		tanRatioMoveable);

						// But...
						if (d.target.centerX < d.source.newX) {
								// i.e. if target node is to left of the source node
								// then path intersects towards the righthand side
								d.target.newX = (2 * d.target.x) - d.target.newX + w;
						}
				}
		}    
        
    node.append("rect")
       .attr("width", function() {
         return this.parentNode.getAttribute("width");
       })
       .attr("height", function() {
         return this.parentNode.getAttribute("height");
       })
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
      link.select("path")
          .attr("d", function(d) {
            return moveTo(d) + lineTo(d);
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
