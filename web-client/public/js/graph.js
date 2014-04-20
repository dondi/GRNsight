/*http://bl.ocks.org/mbostock/4062045 used as reference
 *As well as http://bl.ocks.org/mbostock/3750558
 *and http://bl.ocks.org/mbostock/950642
 *and http://bl.ocks.org/mbostock/1153292
 */
  var drawGraph = function (nodes, links, positiveWeights, negativeWeights, controls) {
    var $container = $(".grnsight-container");
    d3.selectAll("svg").remove();
    var width = $container.width(),
        height = $container.height(),
        nodeHeight = 30;
  
    var color = d3.scale.category20();

    var diagonal = d3.svg.diagonal()
      .projection(function(d) {return [d.y, d.x];});
      
    var positiveScale = d3.scale.quantile()
                  .domain(positiveWeights)
                  .range(["2", "6", "10", "14"]);
                  
    var negativeScale = d3.scale.quantile()
                          .domain(negativeWeights)
                          .range(["2", "6", "10", "14"]);

    var force = d3.layout.force()
        .size([width, height])
        .on("tick", tick)
        .linkDistance(200)
        .charge(-500);

    var drag = force.drag()
        .on("dragstart", dragstart);
  
    var svg = d3.select($container[0]).append("svg")
        .attr("width", width)
        .attr("height", height);
        
    var defs = svg.append("defs");
    
    //Adding the arrowheads
    defs.append("marker")
      .attr("id", "arrowhead2")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 10)
      .attr("refY", 5)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("style", "stroke: MediumVioletRed; fill: MediumVioletRed");
        
    defs.append("marker")
      .attr("id", "arrowhead6")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 15)
      .attr("markerHeight", 15)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("style", "stroke: MediumVioletRed; fill: MediumVioletRed");
        
    defs.append("marker")
      .attr("id", "arrowhead10")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 20)
      .attr("markerHeight", 20)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("style", "stroke: MediumVioletRed; fill: MediumVioletRed");
        
    defs.append("marker")
      .attr("id", "arrowhead14")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 4)
      .attr("refY", 5)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 25)
      .attr("markerHeight", 25)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("style", "stroke: MediumVioletRed; fill: MediumVioletRed");

    //Flat arrowheads for repression, vertical
    defs.append("marker")
       .attr("id", "repressor")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 24)
       .attr("markerHeight", 24)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 12 0 L 12 24 Z")
         .attr("style", "stroke: DarkTurquoise; fill: DarkTurquoise");
         
    //Flat arrowheads for repression, horizontal
    defs.append("marker")
       .attr("id", "repressorHorizontal")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 24)
       .attr("markerHeight", 24)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 0 12 L 24 12 Z")
         .attr("style", "stroke: DarkTurquoise; fill: DarkTurquoise");
  
    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");

    force.nodes(nodes)
         .links(links)
         .start();

    link = link.data(links)
               .enter().append("g")
               .attr("class", "link")
               .attr("strokeWidth", function (d) {
                 if (d.value > 0) {
                   return positiveScale(d.value);
                 } else {
                  return negativeScale(d.value);
                 }
               });
                 

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
               .attr("height", nodeHeight)
               .call(force.drag);
               
    link.append("path")
        .attr("id", function(d) {
          return "path" + d.source.index + "_" + d.target.index;
        })
		    .style("stroke", function (d) {
		      return d.stroke;
		    })
		    .style("stroke-width", function (d) {
		      if (d.value > 0) {
		        return d.strokeWidth = positiveScale(d.value);
		      } else {
		        return d.strokeWidth = negativeScale(d.value);
		      }
		    })
		    .attr("marker-end", function(d) {
		      return "url(#" + d.type + d.strokeWidth + ")";
		    }); 
           

               
    /*Big thanks to the following for the smart edges
     *https://github.com/cdc-leeds/PolicyCommons/blob/b0dea2a4171989123cbee377a6ae260b8612138e/visualize/conn-net-svg.js#L119
     */
    function moveTo(d) {
      var node = d3.select("#node" + d.source.index),
          w = parseFloat(node.attr("width")),
          h = parseFloat(node.attr("height"));
          
      d.source.newX = d.source.x + (w/2);
      d.source.newY = d.source.y + (h/2);
          
      return "M" + d.source.newX + "," + d.source.newY + " ";
    }
    
    function lineTo(d) {
      var node = d3.select("#node" + d.target.index),
          w = parseFloat(node.attr("width")),
          h = parseFloat(node.attr("height"));
          
      var x1 = d.source.x,
          y1 = d.source.y,
          x2 = d.target.x,
          y2 = d.target.y,
          dx,
          dy,
          dr,

          // Defaults for normal edge.
          drx,
          dry,
          xRotation = 0, // degrees
          largeArc = 0 // 1 or 0
          sweep = 0, //1 or 0
          offset = 0;
          
      d.target.centerX = d.target.x + (w/2);
      d.target.centerY = d.target.y + (h/2);
      
      //This function calculates the newX and newY
      smartPathEnd(d, w, h);
      dx = d.target.newX - x1;
      dy = d.target.newY - y1;
      dr = Math.sqrt(dx * dx + dy * dy);
      drx = dr,
      dry = dr;
      
      if ( ((d.target.newX > d.source.x) && (d.target.newY > d.source.y)) || ((d.target.newX < d.source.x) && (d.target.newY < d.source.y))){
        sweep = 1;
      }
      
      return "A" + drx + "," + dry + "," + xRotation + "," + largeArc + "," + sweep + "," + d.target.newX  + "," + d.target.newY;
    }
    
    function smartPathEnd(d, w, h) {
        // Set an offset if the edge is a repressor to make room for the flat arrowhead
        var offset = parseFloat(d.strokeWidth);
        
        if (d.value < 0) {
          offset = 10;
        }
				// We need to work out the (tan of the) angle between the
				// imaginary horizontal line running through the center of the
				// target node and the imaginary line connecting the center of
				// the target node with the top-left corner of the same
				// node. Of course, this angle is fixed.
				d.tanRatioFixed =
						(d.target.centerY - d.target.y)
						/
						(d.target.centerX - d.target.x);

				// We also need to work out the (tan of the) angle between the
				// imaginary horizontal line running through the center of the
				// target node and the imaginary line connecting the center of
				// the target node with the center of the source node. This
				// angle changes as the nodes move around the screen.
				d.tanRatioMoveable =
						Math.abs(d.target.centerY - d.source.newY)
						/
						Math.abs(d.target.centerX - d.source.newX); // Note,
						// JavaScript handles division-by-zero by returning
						// Infinity, which in this case is useful, especially
						// since it handles the subsequent Infinity arithmetic
						// correctly.

				// Now work out the intersection point

				if (d.tanRatioMoveable == d.tanRatioFixed) {
          // Then path is intersecting at corner of textbox so draw
          // path to that point

          // By default assume path intersects a left-side corner
          d.target.newX = d.target.x - offset;

          // But...
          if (d.target.centerX < d.source.newX) {
              // i.e. if target node is to left of the source node
              // then path intersects a right-side corner
              d.target.newX = d.target.x + w + offset;
          }

          // By default assume path intersects a top corner
          d.target.newY = d.target.y - offset;

          // But...
          if (d.target.centerY < d.source.newY) {
              // i.e. if target node is above the source node
              // then path intersects a bottom corner
              d.target.newY = d.target.y + h + offset;
          }
				}

				if (d.tanRatioMoveable < d.tanRatioFixed) {
          // Then path is intersecting on a vertical side of the
          // textbox, which means we know the x-coordinate of the
          // path endpoint but we need to work out the y-coordinate

          // By default assume path intersects left vertical side
          d.target.newX = d.target.x - offset;

          // But...
          if (d.target.centerX < d.source.newX) {
              // i.e. if target node is to left of the source node
              // then path intersects right vertical side
              d.target.newX = d.target.x + w + offset;
          }

          // Now use a bit of trigonometry to work out the y-coord.

          // By default assume path intersects towards top of node								
          d.target.newY =
              d.target.centerY - ((d.target.centerX - d.target.x)
                                  *
                                  d.tanRatioMoveable);

          // But...
          if (d.target.centerY < d.source.newY) {
              // i.e. if target node is above the source node
              // then path intersects towards bottom of the node
              d.target.newY = (2 * d.target.y) - d.target.newY + h;
          }
				}

				if (d.tanRatioMoveable > d.tanRatioFixed) {
          // Then path is intersecting on a horizontal side of the
          // textbox, which means we know the y-coordinate of the
          // path endpoint but we need to work out the x-coordinate

          // By default assume path intersects top horizontal side
          d.target.newY = d.target.y - offset;

          // But...
          if (d.target.centerY < d.source.newY) {
              // i.e. if target node is above the source node
              // then path intersects bottom horizontal side
              d.target.newY = d.target.y + h + offset;
          }

          // Now use a bit of trigonometry to work out the x-coord.

          // By default assume path intersects towards lefthand side
          d.target.newX =
              d.target.centerX - ((d.target.centerY - d.target.y)
                                  /
                                  d.tanRatioMoveable) ;

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
       .attr("stroke-width", "2px")
       .on("dblclick", dblclick);
           
    node.append("text")
      .attr("dx", function (d) {
        return (d.name.length * 20)/2;
      })
      .attr("dy", 20)
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
        link.select("path").attr("d", function(d) {
          
          if (d.target === d.source) {
            var x1 = d.source.x,
                y1 = d.source.y,
                x2 = d.target.x,
                y2 = d.target.y,
                dx = x2 - x1,
                dy = y2 - y1,
                dr = Math.sqrt(dx * dx + dy * dy),
                radiusModifier = 0,

                // Defaults for normal edge.
                drx = dr,
                dry = dr,
                xRotation = 0, // degrees
                largeArc = 0, // 1 or 0
                sweep = 1, //1 or 0
                offset = 0;

                // Self edge.
                if ( x1 === x2 && y1 === y2 ) {
                  //Move the position of the loop
                  //Couldn't figure out how to derive the width of the rectangle from here,
                  //so it is being calculated again. May need to set it when the node is created.
                  x1 = d.source.x + (d.source.name.length * 20);
                  y1 = d.source.y + (nodeHeight/2);
                  // Fiddle with this angle to get loop oriented.
                  xRotation = 45;

                  // Needs to be 1.
                  largeArc = 1;

                  // Change sweep to change orientation of loop. 
                  sweep = 1;
                  
                  if (d.value > 0) {
                    radiusModifier = positiveScale(d.value)/2;
                  } else {
                    radiusModifier = negativeScale(d.value)/2;
                  }

                  // Make drx and dry different to get an ellipse
                  // instead of a circle.
                  drx = 15 + radiusModifier;
                  dry = 15 + radiusModifier;

                  // For whatever reason the arc collapses to a point if the beginning
                  // and ending points of the arc are the same, so kludge it.
                  x2 = d.source.x + (d.source.name.length *20)/1.2;
                  y2 = d.source.y + nodeHeight;
                  
                  if (d.value < 0) {
                    offset = 10;
                  }
                } 

           return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2  + "," + (y2 + offset);
        } else {
           return moveTo(d) + lineTo(d);
        }
      });
      link.select("path").attr("marker-end", function(d) {
        if (d.type == "repressor") {
          if ((d.tanRatioMoveable > d.tanRatioFixed) || (d.target == d.source)) {
            return "url(#repressorHorizontal)";
          } else {
            return "url(#repressor)";
          }
        } else {
          return "url(#arrowhead" + d.strokeWidth + ")";				
        }
      });
      node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")";});
    }

    function dblclick(d) {
      d3.select(this).classed("fixed", d.fixed = false);
    }

    function dragstart(d) {
      d3.select(this).classed("fixed", d.fixed = true);
    }

    function updateLinkDist(event) {
        var toChange = $(this).val();
        force.linkDistance( toChange );
        force.nodes(nodes)
            .links(links)
            .start();
        $( "#linkDistVal" ).html( toChange );
    }

    function updateCharge(event) {
        var toChange = $(this).val();
        force.charge( toChange );
        force.nodes(nodes)
            .links(links)
            .start(); 
        $( "#chargeVal" ).html( toChange );
    }

    function updateChargeDist(event) {
        var toChange = $(this).val();
        force.chargeDistance( toChange );
        force.nodes(nodes)
            .links(links)
            .start();
        $( "#chargeDistVal" ).html( toChange );
    }

    // Set up our controllers if any.
    if (controls) {
        $(controls.linkSlider).change(updateLinkDist);
        $(controls.chargeSlider).change(updateCharge);
        $(controls.chargeDistSlider).change(updateChargeDist);
    }
}
