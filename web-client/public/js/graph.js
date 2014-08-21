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
        nodeHeight = 30,
        gridWidth = 300,
        colorOptimal = true;

    // If colorOptimal is false, then weighting is ignored, and the lines are all drawn as if it was an unweighted sheet
    if($("#formatOptimal").attr('class') === 'deselectedColoring') {
      colorOptimal = false;
    }

    var allWeights = positiveWeights.concat(negativeWeights);

    if(!colorOptimal) {
      for(var i = 0; i < allWeights.length; i++) {
        if( allWeights[i] != 0 ) {
          allWeights[i] = 1;
        }
      }
    } else {
      for(var i = 0; i < allWeights.length; i++ ) {
        allWeights[i] = Math.abs((allWeights[i]).toPrecision(4));
      }
    }
    

    var totalScale,
        normalizedScale,
        unweighted = false;
    
    if (d3.min(positiveWeights) == d3.max(positiveWeights)) {
      totalScale = d3.scale.quantile()
                           .domain(d3.extent(allWeights))
                           .range(["2"]);

      normalizedScale = d3.scale.linear()
                                .domain(d3.extent(allWeights))
                                .range(["2"]);
                              
      unweighted = true;
    } else {
      totalScale = d3.scale.linear()
                           .domain(d3.extent(allWeights))
                           .range([2, 14]);

      normalizedScale = d3.scale.linear()
                                .domain(d3.extent(allWeights));
    }
                       
    //snapToGrid = function(val, gridSize) {
    //  return gridSize * Math.round(val/gridSize);
    //};
    
    var force = d3.layout.force()
        .size([width, height])
        .on("tick", tick)
        .linkDistance($("#linkDistInput").val())
        .charge($("#chargeInput").val())
        .chargeDistance($("#chargeDistInput").val())
        .gravity($("#gravityInput").val());

    var drag = force.drag()
        .on("dragstart", dragstart);
        //.on("drag", dragmove)
        //.on("dragend", dragend);
  
    var svg = d3.select($container[0]).append("svg")
        .attr("width", width)
        .attr("height", height);
        
    var defs = svg.append("defs");
          
//Thanks to http://www.benknowscode.com/2013/09/using-svg-filters-to-create-shape-outlines.html
// for the outline code  
    /*var outline = defs.append("filter")
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
                   + "\n" + "1 1 0 0 0"
                   + "\n" + "0 0 0 0 0"
                   + "\n" + "0 0 0 1 0";
            });
    
    highlight.append("feBlend")
          .attr("in", "SourceGraphic")
          .attr("in2", "drop")
          .attr("mode", "normal");*/

  
    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");

    force.nodes(nodes)
         .links(links)
         .start();
  
    link = link.data(links)
               .enter().append("g")
               .attr("class", "link")
               .attr("strokeWidth", function (d) {
                 var d_AbsVal = Math.abs(d.value)
                 return Math.round( totalScale(d_AbsVal) );
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
               .call(drag);

    link.append("path")
        .attr("id", function(d) {
          return "path" + d.source.index + "_" + d.target.index;
        })
		    .style("stroke-width", function (d) {
          var d_absVal = Math.abs(d.value);
		      return d.strokeWidth = Math.round( totalScale(d_absVal) );
		    })
		    .style("stroke", function (d) {
		      if (unweighted || !colorOptimal) {
		        return "black";
          } else if(normalize(d) <= 0.05 ) {
            return "gray";
		      } else {
		        return d.stroke;
		      }
		    })
		    .attr("marker-end", function (d) {

          var x1 = d.source.x,
              y1 = d.source.y,
              x2 = d.target.x,
              y2 = d.target.y,
              minimum = "",
              selfRef = "",
              yOffsets,
              xOffsets,
              color;

          if(Math.abs(d.value/(d3.max(allWeights))) <= 0.05) {
            minimum = "gray";
          }
          if( x1 === x2 && y1 === y2 ) {
            selfRef = "_SelfReferential";
          }

          // If the same ID is created twice (usually happens in the unweighted GRNS), it causes unpredictable behavior
          // in the markers. To prevent this, first we check to make sure the ID about to be created doesn't exist.
          if( $("#" + d.type + selfRef + "_StrokeWidth" + d.strokeWidth + minimum).length != 0 ) {
            return "url(#" + d.type + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";  
          } else {
           
            // If negative, you need one bar for horizontal and one for vertical. If the user is not coloring the weighted
            // sheets, then we make all of the markers arrowheads.
            if(d.value < 0 && colorOptimal) {
              defs.append("marker")
               .attr("id", "repressor" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum)
               .attr("refX", function() {
                 xOffsets = {
                   2 : 1, 3 : 2, 4 : 2, 5 : 2, 6 : 2, 7 : 3, 8 : 2,
                   9 : 3, 10 : 3, 11 : 4, 12 : 3, 13 : 4, 14 : 4
                 }
                 return xOffsets[d.strokeWidth];
               })
               .attr("refY", function() {
                 yOffsets = {
                   2 : 13, 3 : 13, 4 : 13.5, 5 : 14, 6 : 15.5, 7 : 17, 8 : 17,
                   9 : 17, 10 : 17, 11 : 17, 12 : 18.5, 13 : 18, 14 : 16
                 }
                 return yOffsets[d.strokeWidth];
               })
               .attr("markerUnits", "userSpaceOnUse")
               .attr("markerWidth", function() {
                 return d.strokeWidth;
               })
               .attr("markerHeight", function() {
                return 25 + d.strokeWidth;
               })
               .attr("orient", 180)
               .append("rect")
                  .attr("width", function() {
                    return d.strokeWidth;
                  })
                  .attr("height", function () {
                    return 25 + d.strokeWidth;
                  })
                  .attr("rx", 10)
                  .attr("ry", 10)
                  .attr("style", function() {
                    if( normalize(d) <= 0.05) {
                      color = "gray";
                    } else {
                      color = d.stroke;
                    }
                    return "stroke:" + color + "; fill: " + color + "; stroke-width: 0";
                  });

              defs.append("marker")
               .attr("id", "repressorHorizontal" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum)
               .attr("refX", function() {
                  if(x1 === x2 && y1 === y2) {
                    xOffsets = {
                      2 : 14, 3 : 15, 4 : 15, 5 : 15, 6 : 16, 7 : 16.5, 8 : 16.5,
                      9 : 16.5, 10 : 17.5, 11 : 18, 12 : 19, 13 : 19.5, 14 : 16
                    }
                  } else {
                    xOffsets = {
                      2 : 13, 3 : 13, 4 : 13.5, 5 : 14, 6 : 15.5, 7 : 17, 8 : 17,
                      9 : 16, 10 : 17, 11 : 17, 12 : 18.5, 13 : 18, 14 : 18
                    }
                  }
                 return xOffsets[d.strokeWidth];
               })
               .attr("refY", function() {
                 yOffsets = {
                   2 : 1, 3 : 2, 4 : 2, 5 : 2, 6 : 2, 7 : 3, 8 : 2,
                   9 : 3, 10 : 3, 11 : 4, 12 : 3, 13 : 4, 14 : 4
                 }
                 return yOffsets[d.strokeWidth];
               })
               .attr("markerUnits", "userSpaceOnUse")
               .attr("markerWidth", function() {
                 return 25 + d.strokeWidth;
               })
               .attr("markerHeight", function() {
                 return d.strokeWidth;
               })
               .attr("orient", 180)
               .append("rect")
                  .attr("width", function() {
                    return 25 + d.strokeWidth;
                  })
                  .attr("height", function() {
                    return d.strokeWidth;
                  })
                  .attr("rx", 10)
                  .attr("ry", 10)
                  .attr("style", function() {
                    if(normalize(d) <= 0.05) {
                      color = "gray";
                    } else {
                      color = d.stroke;
                    }
                    return "stroke:" + color + "; fill: " + color + "; stroke-width: 0";
                  });

            } else {
              // Arrowheads
              defs.append("marker")
                .attr("id",  "arrowhead" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum)
                .attr("viewBox", "0 0 12 12")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("refX", function() {
                  // Individual offsets for each possible stroke width
                  xOffsets = {
                    2 : 11.75, 3 : 11, 4 : 9.75, 5 : 9.25,  6 : 8.5, 7 : 10,
                    8 : 9.75, 9 : 9.5, 10 : 9, 11 : 9.5, 12 : 9.5, 13 : 9.25,
                    14 : 9
                  };
                  return xOffsets[d.strokeWidth];
                })
                .attr("refY", function () {
                  if(x1 === x2 && y1 === y2 ) {
                    yOffsets = {
                      // Most set to 5 until something can be figured out about 
                      // the centering of the self-referential arrowheads
                      2: 6.7, 3: 6,4: 5.89, 5: 5, 6: 5, 7: 5,
                      8: 5, 9: 5, 10: 5, 11: 5, 12: 5, 13: 5,
                      14: 5
                    }
                  } else {
                    yOffsets = {
                      2: 5, 3: 5, 4: 4.8, 5: 5, 6: 5, 7: 4.98,
                      8: 4.9, 9: 5.2, 10: 4.85, 11: 4.7, 12: 5.15,
                      13: 5, 14: 4.7
                    }
                  }
                  return yOffsets[d.strokeWidth];
                })
                .attr("markerUnits", "userSpaceOnUse")
                .attr("markerWidth", function() {
                  return 12 + ((d.strokeWidth < 7) ? d.strokeWidth*1.5 : d.strokeWidth*2.25);
                })
                .attr("markerHeight", function() {
                  return 5 + ((d.strokeWidth < 7) ? d.strokeWidth*1.5 : d.strokeWidth*2.25);
                })
                .attr("orient", function() {
                  if( x1 === x2 && y1 === y2 ) {
                    return 270;
                  } else {
                    return "auto";
                  }
                })
                .append("path")
                  .attr("d", "M 0 0 L 14 5 L 0 10 Q 6 5 0 0")
                  .attr("style", function () {
                    if (unweighted || !colorOptimal) {
                      color = "black";
                    } else if( normalize(d) <= 0.05) {
                      color = "gray";
                    } else {
                      color = d.stroke;
                    }
                      return "stroke: " + color + "; fill: " + color;
                    });
              }
          }
		      return "url(#" + d.type + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
		    })
		    //.attr("filter", "url(#outline)")
        .append("svg:title")
          .text(function (d) {
            return d.value.toPrecision(4);
          });

    $(".link").tooltip({
      track: true
    });

    /*Big thanks to the following for the smart edges
     *https://github.com/cdc-leeds/PolicyCommons/blob/b0dea2a4171989123cbee377a6ae260b8612138e/visualize/conn-net-svg.js#L119
     */
    function moveTo(d) {

      var node = d3.select("#node" + d.source.index);
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
        
        if (d.value < 0  && colorOptimal ) {
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

            if( d.type != "arrowhead") { 
              d.target.newX = d.target.x + w + offset + d.strokeWidth;
            } else {
              d.target.newX = d.target.x + w + offset;
            }
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
              if( d.type != "arrowhead") { 
                d.target.newY = d.target.y + h + offset + d.strokeWidth;
              } else {
                d.target.newY = d.target.y + h + offset;
              }
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
        
    var dblclick = function (d) {
      d3.select(this).classed("fixed", d.fixed = false);
    };

    var nodeTextDblclick = function (d) {
      // Relay the double-click to our parent.
      dblclick.call(this.parentNode, d);
    };

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
      .text(function(d) {return d.name;})
      .on("dblclick", nodeTextDblclick);
    
    //$(node).draggable({ grid: [100, 30]});
           
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

    /*$('.highlight').css({
      'stroke': '#000',
      'fill': 'none',
      'stroke-width': '1.5px'
    })*/

    function tick() {
      
      try {
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
                  x1 = d.source.x + (d.source.name.length * 20);
                  y1 = d.source.y + (nodeHeight/2) + 6;
                  // Fiddle with this angle to get loop oriented.
                  xRotation = 45;

                  // Needs to be 1.
                  largeArc = 1;

                  // Change sweep to change orientation of loop. 
                  sweep = 1;
                  
                  var d_AbsVal = Math.abs(d.value);
                  radiusModifier = totalScale(d_AbsVal)/2.00;

                  // Make drx and dry different to get an ellipse
                  // instead of a circle.
                  drx = 17 + radiusModifier;
                  dry = 17 + radiusModifier;

                  // For whatever reason the arc collapses to a point if the beginning
                  // and ending points of the arc are the same, so kludge it.
                  x2 = d.source.x + (d.source.name.length *20)/1.2;
                  y2 = d.source.y + nodeHeight;
                  
                  if (d.value < 0  && colorOptimal ) {
                    offset = Math.max(10, parseFloat(d.strokeWidth));
                  } 
                } 

           return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2  + "," + (y2 + offset);
        } else {
           return moveTo(d) + lineTo(d);
        }
      });

      link.select("path").attr("marker-end", function(d) {
        var x1 = d.source.x,
            y1 = d.source.y,
            x2 = d.target.x,
            y2 = d.target.y,
            minimum = "",
            selfRef = "";
        if( normalize(d) <= 0.05) {
          minimum = "gray";
        }
        if( x1 === x2 && y1 === y2 ) {
          selfRef = "_SelfReferential";
        }
        if (d.type == "repressor"  && colorOptimal ) {
          if ((d.tanRatioMoveable > d.tanRatioFixed) || (d.target == d.source)) {
            return "url(#repressorHorizontal" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
          } else {
            return "url(#repressor" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";
          }
        } else {
          return "url(#arrowhead" + selfRef + "_StrokeWidth" + d.strokeWidth + minimum + ")";				
        }
      });

      } catch(e) {
        console.warn("Detected invalid node. Moving on to next node.");
      }

      //Rudimentary manual redraw. This should fix the Firefox bug where the edges don't show up.
      //if(runNum === 0) {
      //  runNum++;
      //  drawGraph(runNum, nodes, links, positiveWeights, negativeWeights, controls);
      //}
    }

    function normalize(d) {
      return Math.abs(d.value/(d3.max(allWeights)));
    }
 
    function dragstart(d) {
      var node = d3.select(this);
      node.classed("fixed", d.fixed = true);
      /*link.select("path").attr("filter", function (d) {
        if(d.source.name == node.datum().name || d.target.name == node.datum().name) {
          return "url(#highlight)";
        } else {
          return "url(#outline)";
        }
      });*/
    }
    
    //Can't get the grid to stick for some reason
    //function dragend (d) {
    //  d3.select(this)
    //    .attr("x", d.x = snapToGrid(d.x, 20))
    //    .attr("y", d.y = snapToGrid(d.y, 20))
    //    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")";});
      //link.select("path").attr("filter", "url(#outline)");
    //}

    function updateLinkDist(event) {
        var toChange = $(this).val();
        force.linkDistance( toChange );
        force.start();
        $( "#linkDistVal" ).html( toChange );
    }

    function updateCharge(event) {
        var toChange = $(this).val();
        force.charge( toChange );
        force.start(); 
        $( "#chargeVal" ).html( toChange );
    }

    function updateChargeDist(event) {
        var toChange = $(this).val();
        force.chargeDistance( toChange );
        force.start();
        $( "#chargeDistVal" ).html( toChange );
    }

    function updateGravity(event) {
      var toChange = $(this).val();
        force.gravity( toChange );
        force.stop();
        force.start();

        // Makes 0.1 appear as 0.10, 0.2 appear as 0.20, etc.
        if(toChange.length === 3) {
          toChange += "0";
        }
        $( "#gravityVal" ).html( toChange );
    }

    function defaultSliders(event) {
      var check = $( "#lockSliders" ).prop( 'checked' );
      if( !check ) {
        allDefaults = [ $("#linkDistInput").val(), $("#chargeInput").val(), $("#chargeDistInput").val(), $("#gravityInput").val() ];
        $( "#linkDistInput" ).val(500);
        $( "#linkDistVal" ).html("500");
        $( "#chargeInput" ).val(-1000);
        $( "#chargeVal" ).html("-1000");
        $( "#gravityInput" ).val(0.1);
        $( "#gravityVal" ).html("0.10");
        $( "#chargeDistInput" ).val(1000);
        $( "#chargeDistVal" ).html("1000");
        force.linkDistance(500)
             .charge(-1000)
             .chargeDistance(1000)
             .gravity(0.1);
        force.stop();
        force.start();
        $( "#undoReset" ).prop( 'disabled', false );
      }
    }

    function undoReset(event) {
      var check =  $( "#undoReset" ).prop( 'disabled' );

      // gravityCheck used to add on the zero to 0.1 -> 0.10, 0.2 -> 0.20, etc
      var gravityCheck = "";
      if( !check ) {
        $( "#linkDistInput" ).val( allDefaults[0] );
        $( "#linkDistVal" ).html( allDefaults[0] );
        $( "#chargeInput" ).val( allDefaults[1] );
        $( "#chargeVal" ).html( allDefaults[1] );
        $( "#gravityInput" ).val( allDefaults[3] );
        if( $("#gravityInput").val().length === 3 ) {
          gravityCheck = "0";
        }
        $( "#gravityVal" ).html( allDefaults[3] + gravityCheck );
        $( "#chargeDistInput" ).val( allDefaults[2] );
        $( "#chargeDistVal" ).html( allDefaults[2] );
        force.linkDistance( allDefaults[0] )
             .charge( allDefaults[1] )
             .chargeDistance( allDefaults[2] )
             .gravity( allDefaults[3] );
        force.stop();
        force.start();
        $( "#undoReset" ).prop( 'disabled', true );
      }
    }

    /*function lockNodes(event) {
      if( $("#lockNodes").prop('checked') ) {
        force.stop();
        $('.node').selectAll()
      } else {
        force.start();
      }
    }*/

    // Set up our controllers if any.
    if (controls) {
        $(controls.linkSlider).on('input', updateLinkDist);
        $(controls.chargeSlider).on('input', updateCharge);
        $(controls.chargeDistSlider).on('input', updateChargeDist);
        $(controls.gravitySlider).on('input', updateGravity);

        // Handler is unbound first to prevent it from firing twice.
        $(controls.resetSliderButton).unbind('click').click(defaultSliders);
        $(controls.resetSliderMenu).unbind('click').click(defaultSliders);
        $(controls.undoResetButton).unbind('click').click(undoReset);
        $(controls.undoResetMenu).unbind('click').click(undoReset);
        //$(controls.lockNodes).unbind('click').click(lockNodes);
    }

    var lockCheck = $( "#lockSliders" ).prop( 'checked' );
    var allDefaults = [ $("#linkDistInput").val(), $("#chargeInput").val(), $("#chargeDistInput").val(), $("#gravityInput").val() ];

    $( "input[type='range']" ).prop( 'disabled', lockCheck );
    $( "#undoReset" ).prop( 'disabled', true );
    $( "#lockNodes").prop( 'disabled', false);

}