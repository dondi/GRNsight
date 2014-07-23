/*http://bl.ocks.org/mbostock/4062045 used as reference
 *As well as http://bl.ocks.org/mbostock/3750558
 *and http://bl.ocks.org/mbostock/950642
 *and http://bl.ocks.org/mbostock/1153292
 */
  var drawGraph = function (runNum, nodes, links, positiveWeights, negativeWeights, controls, networkType) {
    var $container = $(".grnsight-container");
    d3.selectAll("svg").remove();
    var width = $container.width(),
        height = $container.height(),
        nodeHeight = 30,
        gridWidth = 300;

    var allWeights = positiveWeights.concat(negativeWeights);

    for(var i = 0; i < allWeights.length; i++ ) {
      allWeights[i] = Math.abs((allWeights[i]).toPrecision(4));
    }
    

    var positiveScale,
        //positiveHighlight,
        totalScale,
        normalizedScale,
        unweighted = false;
    
    if (d3.min(positiveWeights) == d3.max(positiveWeights)) {
      positiveScale = d3.scale.quantile()
                              .domain(positiveWeights)
                              .range(["2"]);

      totalScale = d3.scale.quantile()
                           .domain(d3.extent(allWeights))
                           .range(["2"]);

      normalizedScale = d3.scale.linear()
                                .domain(d3.extent(allWeights))
                                .range(["2"]);
      /*positiveHighlight = d3.scale.quantile()
                                  .domain(positiveWeights)
                                  .range(["4"]);*/
                              
      unweighted = true;
    } else {
      positiveScale = d3.scale.quantile()
                        .domain(positiveWeights)
                        .range(["2", "6", "10", "14"]);

      totalScale = d3.scale.linear()
                           .domain(d3.extent(allWeights))
                           .range([2, 14]);

      normalizedScale = d3.scale.linear()
                                .domain(d3.extent(allWeights));

      /*positiveHighlight = d3.scale.quantile()
                                  .domain(positiveWeights)
                                  .range(["4", "8", "12", "16"]);*/
    }

    /*for(var i = 0; i < negativeWeights.length; i++) {
      negativeWeights[i] = Math.abs(negativeWeights[i]);
    }*/
                  
    var negativeScale = d3.scale.quantile()
                          .domain(negativeWeights)
                          .range(["2", "6", "10", "14"]);

    /*var negativeHighlight = d3.scale.quantile()
                                    .domain(negativeWeights)
                                    .range(["4", "8", "12", "16"]);*/
                       
    snapToGrid = function(val, gridSize) {
      return gridSize * Math.round(val/gridSize);
    };
    
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
          
    //Adding the arrowheads
    /*defs.append("marker")
      .attr("id", "arrowhead2")
      //.attr("viewBox", "0 0 10 10")
      .attr("refX", 13)
      .attr("refY", 5)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 14)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 14 5 L 0 10 z")
        .attr("style", function () {
          if (unweighted) {
            return "stroke: black; fill: black";
          } else {
            return "stroke: gray; fill: gray";
          }
        });
        
    defs.append("marker")
      .attr("id", "arrowhead6")
      //.attr("viewBox", "0 0 10 10")
      .attr("refX", 13)
      .attr("refY", 8.5)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 20)
      .attr("markerHeight", 16)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 20 7 L 0 16 z")
        .attr("style", "stroke: MediumVioletRed; fill: MediumVioletRed");
        
    defs.append("marker")
      .attr("id", "arrowhead10")
      //.attr("viewBox", "0 0 10 10")
      .attr("refX", 15)
      .attr("refY", 11)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 26)
      .attr("markerHeight", 22)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 26 11 L 0 22 z")
        .attr("style", "stroke: MediumVioletRed; fill: MediumVioletRed");
        
    defs.append("marker")
      .attr("id", "arrowhead14")
      //.attr("viewBox", "0 0 10 10")
      .attr("refX", 14)
      .attr("refY", 13.5)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 32)
      .attr("markerHeight", 28)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 32 14 L 0 28 z")
        .attr("style", "stroke: MediumVioletRed; fill: MediumVioletRed");

    //Flat arrowheads for repression, vertical
    defs.append("marker")
       .attr("id", "repressor2")
       .attr("viewBox", "0 0 24 24")
       .attr("refX", 11)
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
       .attr("refX", 11)
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
       .attr("refX", 11)
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
       .attr("refX", 11)
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
       .attr("refX", 11)
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
       .attr("refX", 11)
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
       .attr("refX", 11)
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
       .attr("refX", 11)
       .attr("refY", 12)
       .attr("markerUnits", "userSpaceOnUse")
       .attr("markerWidth", 32)
       .attr("markerHeight", 32)
       .attr("orient", "angle")
       .append("path")
         .attr("d", "M 0 12 L 24 12 Z")
         .attr("style", "stroke: DarkTurquoise; fill: DarkTurquoise; stroke-width: 9");*/

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
        //linkHighlight = svg.selectAll(".link");

    force.nodes(nodes)
         .links(links)
         .start();
    
    /*linkHighlight = linkHighlight.data(links)
                        .enter().append("g")
                        .attr("class", "highlight")
                        .attr("strokeWidth", function (d) {
                          if (d.value > 0) {
                            return positiveHighlight(d.value);
                          } else {
                           return negativeHighlight(d.value);
                          }
                        });*/

    link = link.data(links)
               .enter().append("g")
               .attr("class", "link")
               .attr("strokeWidth", function (d) {
                 //alert(d.value);
                 var d_AbsVal = Math.abs(d.value)
                 //alert("With abs: " + d_AbsVal);
                 return totalScale(d_AbsVal);
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

    /*linkHighlight.append("path")
                 .attr("id", function(d) {
                   return "highlight" + d.source.index + "_" + d.target.index;
                 })
                 .style("stroke-width", function (d) {
                   if (d.value > 0) {
                     return d.strokeWidth = positiveHighlight(d.value);
                   } else {
                     return d.strokeWidth = negativeHighlight(d.value);
                   }
                 })
                 .style("stroke", "white")
                 .attr("marker-end", function (d) {
                   return "url(#" + d.type + d.strokeWidth + ")";
                 })
                 .style("position", "absolute")
                 .style("z-index", "5")
                 .append("svg:title")
                   .text(function (d) {
                     return d.value.toPrecision(4);
                   });*/

    link.append("path")
        .attr("id", function(d) {
          return "path" + d.source.index + "_" + d.target.index;
        })
		    .style("stroke-width", function (d) {
          var d_absVal = Math.abs(d.value);
		      return d.strokeWidth = totalScale(d_absVal);
		    })
		    .style("stroke", function (d) {
		      if (unweighted) {
		        return "black";
          } else if(normalizedScale(Math.abs(d.value.toPrecision(4))) <= 0.05) {
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
              color;

          if(normalizedScale(Math.abs(d.value.toPrecision(4))) <= 0.05) {
            minimum = "gray";
          }

          // If negative, you need one bar for horizontal and one for vertical.
          if(d.value < 0) {
            defs.append("marker")
             .attr("id", "repressor_StrokeWidth" + d.strokeWidth + minimum)
             .attr("viewBox", "0 0 24 24")
             .attr("refX", 11)
             .attr("refY", 12)
             .attr("markerUnits", "userSpaceOnUse")
             .attr("markerWidth", function() {
               return 22 + d.strokeWidth;
             })
             .attr("markerHeight", function() {
              return 22 + d.strokeWidth;
             })
             .attr("orient", 180)
             .append("path")
                .attr("d", "M 12 0 L 12 24 Z")
                .attr("style", function() {
                  if(normalizedScale(Math.abs(d.value.toPrecision(4))) <= 0.05) {
                    color = "gray";
                  } else {
                    color = d.stroke;
                  }
                  return "stroke:" + color + "; fill: " + color + "; stroke-width: " + d.strokeWidth/2;
                });

            defs.append("marker")
             .attr("id", "repressorHorizontal_StrokeWidth" + d.strokeWidth + minimum)
             .attr("viewBox", "0 0 24 24")
             .attr("refX", 11)
             .attr("refY", 12)
             .attr("markerUnits", "userSpaceOnUse")
             .attr("markerWidth", function() {
               return 22 + d.strokeWidth;
             })
             .attr("markerHeight", function() {
               return 22 + d.strokeWidth;
             })
             .attr("orient", 180)
             .append("path")
                .attr("d", "M 0 12 L 24 12 Z")
                .attr("style", function() {
                  if(normalizedScale(Math.abs(d.value.toPrecision(4))) <= 0.05) {
                    color = "gray";
                  } else {
                    color = d.stroke;
                  }
                  return "stroke:" + color + "; fill: " + color + "; stroke-width: " + d.strokeWidth/2;
                });

          } else {
            // Arrowheads
            defs.append("marker")
              .attr("id",  "arrowhead_StrokeWidth" + d.strokeWidth + minimum)
              .attr("viewBox", "0 0 12 10")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("refX", 7.5)
              .attr("refY", function () {
                /*if(x1 === x2 && y1 === y2 && d.strokeWidth > 6.5) {
                  return 3;
                } else {*/
                  return 5;
                //}
              })
              .attr("markerUnits", "userSpaceOnUse")
              .attr("markerWidth", function() {
                return 12 + d.strokeWidth*1.5;
              })
              .attr("markerHeight", function() {
                return 8 + d.strokeWidth*1.5;
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
                  if (unweighted) {
                    color = "black";
                  } else if(normalizedScale(Math.abs(d.value.toPrecision(4))) <= 0.05) {
                    color = "gray";
                  } else {
                    color = d.stroke;
                  }
                    return "stroke: " + color + "; fill: " + color;
                });
          }
		      return "url(#" + d.type + d.strokeWidth + minimum + ")";
		    })
        //.style("position", "absolute")
        //.style("z-index", "3")
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
    
    $(node).draggable({ grid: [100, 30]});
           
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
    
      node.attr("x", function(d) {
        var nodeWidth = d.name.length * 20;
        return d.x = Math.max(0, Math.min(width - nodeWidth, d.x));
          })
         .attr("y", function(d) { return d.y = Math.max(0, Math.min(height - nodeHeight, d.y));})
         .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")";});
        /* Allows for looping edges.
         * From http://stackoverflow.com/questions/16358905/d3-force-layout-graph-self-linking-node
         */

        /*linkHighlight.select("path").attr("d", function(d) {
          
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
                  drx = 17 + radiusModifier;
                  dry = 17 + radiusModifier;

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

      linkHighlight.select("path").attr("marker-end", function(d) {
        if (d.type == "repressor") {
          if ((d.tanRatioMoveable > d.tanRatioFixed) || (d.target == d.source)) {
            return "url(#repressorHorizontal" + d.strokeWidth + ")";
          } else {
            return "url(#repressor" + d.strokeWidth + ")";
          }
        } else {
          return "url(#arrowhead" + d.strokeWidth + ")";        
        }
      });*/

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

                  /*if (d.value > 0) {
                    radiusModifier = positiveScale(d.value)/2.00;
                  } else {
                    radiusModifier = negativeScale(d.value)/2.00;
                  }*/

                  // Make drx and dry different to get an ellipse
                  // instead of a circle.
                  drx = 17 + radiusModifier;
                  dry = 17 + radiusModifier;

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
        var minimum = "";
        if(normalizedScale(Math.abs(d.value.toPrecision(4))) <= 0.05) {
          minimum = "gray";
        }
        if (d.type == "repressor") {
          if ((d.tanRatioMoveable > d.tanRatioFixed) || (d.target == d.source)) {
            return "url(#repressorHorizontal_StrokeWidth" + d.strokeWidth + minimum + ")";
          } else {
            return "url(#repressor_StrokeWidth" + d.strokeWidth + minimum + ")";
          }
        } else {
          return "url(#arrowhead_StrokeWidth" + d.strokeWidth + minimum + ")";				
        }
      });

      //Rudimentary manual redraw. This should fix the Firefox bug where the edges don't show up.
      if(runNum === 0) {
        runNum++;
        drawGraph(runNum, nodes, links, positiveWeights, negativeWeights, controls, networkType);
      }
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
    function dragend (d) {
      d3.select(this)
        .attr("x", d.x = snapToGrid(d.x, 20))
        .attr("y", d.y = snapToGrid(d.y, 20))
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")";});
      //link.select("path").attr("filter", "url(#outline)");
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
        if(toChange.length === 3) {
          toChange += "0";
        }
        $( "#gravityVal" ).html( toChange );
    }


    function updateSliders(event) {
      if( $("#lockSlidersMenu").attr('class') === 'noGlyph' ) {
        $("#lockSliders").prop('checked', true);
        $("#lockSlidersMenu").removeClass('noGlyph')
                             .html("<span class='glyphicon glyphicon-ok'></span>&nbsp; Lock Force Graph Parameters");
      } else {
        $("#lockSliders").prop('checked', false);
        $("#lockSlidersMenu").addClass('noGlyph')
                             .html("<span class='glyphicon invisible'></span>&nbsp; Lock Force Graph Parameters");
      }
      var check = $( "#lockSliders" ).prop( 'checked' );
      $( "#linkDistInput" ).prop( 'disabled', check );
      $( "#chargeInput" ).prop( 'disabled', check );
      $( "#gravityInput" ).prop( 'disabled', check );
      $( "#chargeDistInput" ).prop( 'disabled', check );
      $( "#resetSliders" ).prop( 'disabled', check );
    }

    function defaultSliders(event) {
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
        $(controls.linkSlider).on('input', updateLinkDist);
        $(controls.chargeSlider).on('input', updateCharge);
        $(controls.chargeDistSlider).on('input', updateChargeDist);
        $(controls.gravitySlider).on('input', updateGravity);
        // Handler is unbound first to prevent it from firing twice.
        $(controls.lockSliderCheckbox).unbind('click').click(updateSliders);
        $(controls.lockSliderMenu).unbind('click').click(updateSliders); 
        $(controls.resetSliderButton).unbind('click').click(defaultSliders);
        $(controls.resetSliderMenu).unbind('click').click(defaultSliders);
        $(controls.undoResetButton).unbind('click').click(undoReset);
        $(controls.undoResetMenu).unbind('click').click(undoReset);
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

}