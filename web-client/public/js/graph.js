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
      
    var positiveScale,
        unweighted = false;
    
    if (d3.min(positiveWeights) == d3.max(positiveWeights)) {
      positiveScale = d3.scale.quantile()
                              .domain(positiveWeights)
                              .range(["2"]);
                              
      unweighted = true;
    } else {
      positiveScale = d3.scale.quantile()
                        .domain(positiveWeights)
                        .range(["2", "6", "10", "14"]);
    }
                  
    var negativeScale = d3.scale.quantile()
                          .domain(negativeWeights)
                          .range(["2", "6", "10", "14"]);
    
    var force = d3.layout.force()
        .size([width, height])
        .on("tick", tick)
        .linkDistance($("#linkDistInput").val())
        .charge($("#chargeInput").val())
        .chargeDistance($("#chargeDistInput").val())
        .gravity($("#gravityInput").val());

    var drag = force.drag()
        .on("dragstart", dragstart)
        .on("dragend", dragend);
  
    var svg = d3.select($container[0]).append("svg")
        .attr("width", width)
        .attr("height", height);
        
    var defs = svg.append("defs");
    
    $("path").tooltip({
      track: true
    });
    
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
        .attr("style", function () {
          if (unweighted) {
            return "stroke: black; fill: black";
          } else {
            return "stroke: gray; fill: gray";
          }
        });
        
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
       .attr("id", "repressor2")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 24)
       .attr("markerHeight", 24)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 12 0 L 12 24 Z")
         .attr("style", "stroke: gray; fill: gray");
         
    defs.append("marker")
       .attr("id", "repressor6")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 28)
       .attr("markerHeight", 28)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 12 0 L 12 24 Z")
         .attr("style", "stroke: DarkTurquoise; fill: DarkTurquoise; stroke-width: 3.5");
         
    defs.append("marker")
       .attr("id", "repressor10")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 28)
       .attr("markerHeight", 28)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 12 0 L 12 24 Z")
         .attr("style", "stroke: DarkTurquoise; fill: DarkTurquoise; stroke-width: 6.5");
         
    defs.append("marker")
       .attr("id", "repressor14")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 32)
       .attr("markerHeight", 32)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 12 0 L 12 24 Z")
         .attr("style", "stroke: DarkTurquoise; fill: DarkTurquoise; stroke-width: 9");
         
    //Flat arrowheads for repression, horizontal
    defs.append("marker")
       .attr("id", "repressorHorizontal2")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 24)
       .attr("markerHeight", 24)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 0 12 L 24 12 Z")
         .attr("style", "stroke: gray; fill: gray");

    defs.append("marker")
       .attr("id", "repressorHorizontal6")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 28)
       .attr("markerHeight", 28)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 0 12 L 24 12 Z")
         .attr("style", "stroke: DarkTurquoise; fill: DarkTurquoise; stroke-width: 3.5");
         
    defs.append("marker")
       .attr("id", "repressorHorizontal10")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 28)
       .attr("markerHeight", 28)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 0 12 L 24 12 Z")
         .attr("style", "stroke: DarkTurquoise; fill: DarkTurquoise; stroke-width: 6.5");
         
    defs.append("marker")
       .attr("id", "repressorHorizontal14")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 12)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 32)
       .attr("markerHeight", 32)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 0 12 L 24 12 Z")
         .attr("style", "stroke: DarkTurquoise; fill: DarkTurquoise; stroke-width: 9");

//Thanks to http://www.benknowscode.com/2013/09/using-svg-filters-to-create-shape-outlines.html
// for the outline code  
    var outline = defs.append("filter")
                    .attr("id", "outline");

    outline.append("feMorphology")
            .attr("result", "offset")
            .attr("in", "SourceGraphic")
            .attr("operator", "dilate")
            .attr("radius", "2");

    outline.append("feColorMatrix")
            .attr("result", "drop")
            .attr("in", "offset")
            .attr("type", "matrix")
            .attr("values", function () {
              return "1 1 1 1 1"
                   + "\n" + "1 1 1 1 1"
                   + "\n" + "1 1 1 1 1"
                   + "\n" + "0 0 0 1 0";
            });
    
    outline.append("feBlend")
          .attr("in", "SourceGraphic")
          .attr("in2", "drop")
          .attr("mode", "normal");
          
    var highlight = defs.append("filter")
                      .attr("id", "highlight");
                      
    highlight.append("feMorphology")
            .attr("result", "offset")
            .attr("in", "SourceGraphic")
            .attr("operator", "dilate")
            .attr("radius", "2");

    highlight.append("feColorMatrix")
            .attr("result", "drop")
            .attr("in", "offset")
            .attr("type", "matrix")
            .attr("values", function () {
              return "1 1 1 1 1"
                   + "\n" + "1 1 1 1 1"
                   + "\n" + "0 0 0 0 0"
                   + "\n" + "0 0 0 1 0";
            });
    
    highlight.append("feBlend")
          .attr("in", "SourceGraphic")
          .attr("in2", "drop")
          .attr("mode", "normal");
    

        
  
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
               .attr("width", function (d) {
                 return d.name.length * 20;
               })
               .attr("height", nodeHeight)
               /* Attempt to initiate a grid. Doesn't work.
               .each(function (d, i) {
                 var startX,
                     startY;
                 
                 if (i == 0) {
                   startX = 10;
                   startY = 10;
                 } else {
                   var previous = nodes[i - 1]
                       startX = previous.x + (2 * previous.width) + 20,
                       startY = previous.y + (2 * previous.height) + 15;
                       
                   if( startX < width - d.width ) {
                     startY = previous.y;
                   } else {
                    startX = 10;
                   }
                 }
                 d3.select(this).attr("x", function (d) {
                   return d.x = startX;
                 })
                 .attr("y", function (d) {
                   return d.y = startY;
                 });
               })*/
               
               /*Neither does this approach
               .attr("d", function (d, i) {
                 if (i == 0) {
                   d.x = 10;
                   d.y = 10;
                   return d;
                 } else {
                   var previous = nodes[i - 1]
                       startX = previous.x + (2 * previous.width) + 20,
                       startY = previous.y + (2 * previous.height) + 15;
                       
                   if( startX < width - d.width ) {
                     d.x = startX;
                     d.y = previous.y;
                     return d;
                   } else {
                     d.x = 10;
                     d.y = startY;
                     return d;
                   }
                 }
               })*/
               .call(force.drag);
         
    link.append("path")
        .attr("id", function(d) {
          return "path" + d.source.index + "_" + d.target.index;
        })
		    .style("stroke-width", function (d) {
		      if (d.value > 0) {
		        return d.strokeWidth = positiveScale(d.value);
		      } else {
		        return d.strokeWidth = negativeScale(d.value);
		      }
		    })
		    .style("stroke", function (d) {
		      if (unweighted) {
		        return "black";
		      } else if (d.strokeWidth == "2") {
		        return "gray";
		      } else {
		        return d.stroke;
		      }
		    })
		    .attr("marker-end", function (d) {
		      return "url(#" + d.type + d.strokeWidth + ")";
		    })
		    .attr("filter", "url(#outline)")
        .append("svg:title")
          .text(function (d) {
            return d.value.toPrecision(4);
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
          offset = Math.max(offset, 10);
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
      .attr("dy", 22)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
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
    
      node.attr("x", function(d) {
        var nodeWidth = d.name.length * 20;
        return d.x = Math.max(0, Math.min(width - nodeWidth, d.x));
      })
         .attr("y", function(d) { return d.y = Math.max(0, Math.min(height - nodeHeight, d.y));})
         .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")";});
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
                offset = parseFloat(d.strokeWidth);

                // Self edge.
                if ( x1 === x2 && y1 === y2 ) {
                  //Move the position of the loop
                  //Couldn't figure out how to derive the width of the rectangle from here,
                  //so it is being calculated again. May need to set it when the node is created.
                  x1 = d.source.x + (d.source.name.length * 20) - 5;
                  y1 = d.source.y + (nodeHeight/2);
                  // Fiddle with this angle to get loop oriented.
                  xRotation = 45;

                  // Needs to be 1.
                  largeArc = 1;

                  // Change sweep to change orientation of loop. 
                  sweep = 1;
                  
                  if (d.value > 0) {
                    radiusModifier = positiveScale(d.value)/2.00;
                  } else {
                    radiusModifier = negativeScale(d.value)/2.00;
                  }

                  // Make drx and dry different to get an ellipse
                  // instead of a circle.
                  drx = 25 + radiusModifier;
                  dry = 25 + radiusModifier;

                  // For whatever reason the arc collapses to a point if the beginning
                  // and ending points of the arc are the same, so kludge it.
                  x2 = d.source.x + (d.source.name.length *20)/1.2;
                  y2 = d.source.y + nodeHeight;
                  
                  if (d.value < 0) {
                    offset = Math.max(10, parseFloat(d.strokeWidth));
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
            return "url(#repressorHorizontal" + d.strokeWidth + ")";
          } else {
            return "url(#repressor" + d.strokeWidth + ")";
          }
        } else {
          return "url(#arrowhead" + d.strokeWidth + ")";				
        }
      });

    }

    function dblclick(d) {
      d3.select(this).classed("fixed", d.fixed = false);
    }

    function dragstart(d) {
      var node = d3.select(this);
      node.classed("fixed", d.fixed = true);
      link.select("path").attr("filter", function (d) {
        if(d.source.name == node.datum().name) {
          return "url(#highlight)";
        } else {
          return "url(#outline)";
        }
      });
    }
    
    function dragend (d) {
      link.select("path").attr("filter", "url(#outline)");
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

    function updateGravity(event) {
      var toChange = $(this).val();
        force.gravity( toChange );
        force.nodes(nodes)
            .links(links)
            .stop();
        force.start();
        $( "#gravityVal" ).html( toChange );
    }


    function updateSliders(event) {
      var check = $( "#lockSliders" ).prop( 'checked' );
      $( "#linkDistInput" ).prop( 'disabled', check );
      $( "#chargeInput" ).prop( 'disabled', check );
      $( "#gravityInput" ).prop( 'disabled', check );
      $( "#chargeDistInput" ).prop( 'disabled', check );
      $( "#resetSliders" ).prop( 'disabled', check );
    }

    function defaultSliders(event) {
      allDefaults = [ $("#linkDistInput").val(), $("#chargeInput").val(), $("#chargeDistInput").val(), $("#gravityInput").val() ];
      $( "#linkDistInput" ).val(200);
      $( "#linkDistVal" ).html("200");
      $( "#chargeInput" ).val(-500);
      $( "#chargeVal" ).html("-500");
      $( "#gravityInput" ).val(0.1);
      $( "#gravityVal" ).html("0.1");
      $( "#chargeDistInput" ).val(1000);
      $( "#chargeDistVal" ).html("1000");
      force.linkDistance(200)
           .charge(-500)
           .chargeDistance(1000)
           .gravity(0.1);
      force.nodes(nodes)
           .links(links)
           .stop();
      force.start();
      $( "#undoReset" ).prop( 'disabled', false );
    }

    function undoReset(event) {
      $( "#linkDistInput" ).val( allDefaults[0] );
      $( "#linkDistVal" ).html( allDefaults[0] );
      $( "#chargeInput" ).val( allDefaults[1] );
      $( "#chargeVal" ).html( allDefaults[1] );
      $( "#gravityInput" ).val( allDefaults[3] );
      $( "#gravityVal" ).html( allDefaults[3] );
      $( "#chargeDistInput" ).val( allDefaults[2] );
      $( "#chargeDistVal" ).html( allDefaults[2] );
      force.linkDistance( allDefaults[0] )
           .charge( allDefaults[1] )
           .chargeDistance( allDefaults[2] )
           .gravity( allDefaults[3] );
      force.nodes(nodes)
           .links(links)
           .stop();
      force.start();
      $( "#undoReset" ).prop( 'disabled', true );
    }

    // Set up our controllers if any.
    if (controls) {
        $(controls.linkSlider).change(updateLinkDist);
        $(controls.chargeSlider).change(updateCharge);
        $(controls.chargeDistSlider).change(updateChargeDist);
        $(controls.gravitySlider).change(updateGravity);
        $(controls.lockSliderCheckbox).change(updateSliders);
        $(controls.resetSliderButton).click(defaultSliders);
        $(controls.undoResetButton).click(undoReset);
    }

    var lockCheck = $( "#lockSliders" ).prop( 'checked' );

    var allDefaults = [ $("#linkDistInput").val(), $("#chargeInput").val(), $("#chargeDistInput").val(), $("#gravityInput").val() ];

    $( "#linkDistInput" ).prop( 'disabled', lockCheck );
    $( "#chargeInput" ).prop( 'disabled', lockCheck );
    $( "#chargeDistInput" ).prop( 'disabled', lockCheck );
    $( "#gravityInput" ).prop( 'disabled', lockCheck );
    $( "#resetSliders" ).prop( 'disabled', lockCheck );
    $( "#lockSliders" ).prop( 'disabled', false ); 
    $( "#undoReset" ).prop( 'disabled', true );
    $( "#errors" ).html("");

}
