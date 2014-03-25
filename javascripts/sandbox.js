/* Current params known:
        linkDistance
        charge



    Option idea: 
        Checkbox, keep aligned to grid?
*/

	//alert( "Just always confirming that this runs." );

	var nodes = [
        { name: 'HAP5' }, //0
        { name: 'SWI6' }, //1
        { name: 'SKO1' }, //2
        { name: 'MSS11' }, //3
        { name: 'AFT2' }, //4
        { name: 'HMO1' }, //5
        { name: 'SWI4' }, //6
        { name: 'CIN5' }, //7
        { name: 'PHD1' }, //8
        { name: 'YAP6' }, //9
        { name: 'SKN7' }, //10
        { name: 'FHL1' }, //11
        { name: 'MBP1' }, //12
        { name: 'MAL33' }, //13
        { name: 'HOT1' }, //14
        { name: 'SMP1' }, //15
        { name: 'FKH2' }, //16
        { name: 'ACE2' }, //17
        { name: 'ZAP2' }, //18
        { name: 'GLN3' }, //19
        { name: 'MGA2' } //20
    ];

    var links = [
        { 'source':1, 'target':6 },
        { 'source':1, 'target':8 },
        { 'source':2, 'target':3 },
        { 'source':2, 'target':7 },
        { 'source':2, 'target':8 },
        { 'source':2, 'target':9 },
        { 'source':4, 'target':4 },
        { 'source':6, 'target':0 },
        { 'source':6, 'target':8 },
        { 'source':7, 'target':3 },
        { 'source':7, 'target':7 },
        { 'source':7, 'target':8 },
        { 'source':7, 'target':14 },
        { 'source':7, 'target':15 },
        { 'source':8, 'target':6 },
        { 'source':8, 'target':7 },
        { 'source':8, 'target':8 },
        { 'source':8, 'target':9 },
        { 'source':8, 'target':15 }, 
        { 'source':9, 'target':6 },
        { 'source':9, 'target':7 },
        { 'source':9, 'target':9 },
        { 'source':10, 'target':3 }, 
        { 'source':10, 'target':4 },
        { 'source':10, 'target':9 },
        { 'source':10, 'target':10 },
        { 'source':10, 'target':14 },
        { 'source':11, 'target':5 },
        { 'source':11, 'target':8 }, 
        { 'source':11, 'target':9 },
        { 'source':11, 'target':15 },
        { 'source':11, 'target':16 },
        { 'source':12, 'target':6 },
        { 'source':12, 'target':12 },
        { 'source':12, 'target':12 }, 
        { 'source':12, 'target':13 },
        { 'source':13, 'target':6 }, 
        { 'source':13, 'target':19 },
        { 'source':15, 'target':13 },
        { 'source':15, 'target':15 },
        { 'source':15, 'target':20 },
        { 'source':16, 'target':9 },
        { 'source':16, 'target':16 },
        { 'source':16, 'target':17 },
        { 'source':18, 'target':17 },
        { 'source':18, 'target':18 },
        { 'source':19, 'target':19 },
        { 'source':19, 'target':20 }
    ];

    var width = 960;
    var height = 600;
  
    var color = d3.scale.category20();

    var diagonal = d3.svg.diagonal()
        .projection( function(d) {
        	return [d.y, d.x];
        });

    var force = d3.layout.force()
        .size([width, height])
        .on("tick", tick)
        .linkDistance(80)
        .charge(-300);

    var drag = force.drag()
        .on("dragstart", dragstart);
    
    //Attach the svg canvas, in this case we attach it to the pageContent paragraph  
    var svg = d3.select("#pageContent").append("svg")
        .attr("width", width)
        .attr("height", height);

    //Attach a rectangle to serve as a background
    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "white"); 
    
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
  
    var link = svg.selectAll(".link");
    var node = svg.selectAll(".node");

    force.nodes(nodes)
        .links(links)
        .start();
   
    link = link.data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#arrowhead)");
         
    node = node.data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);
           
    node.append("rect")
        .attr("width", 40)
        .attr("height", 30)
        .on("dblclick", dblclick);
           
    node.append("text")
        .attr("dx", 0)
        .attr("dy", 15)
        .style("font-size", "12px")
        .text(function(d) {
        	return d.name;
        });

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
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) {
    	    return "translate(" + d.x + "," + d.y + ")";
        });
    }

    function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
    }

    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
    } 

    function updateLinkDist(toChange) {
        force.linkDistance( toChange );
        force.nodes(nodes)
            .links(links)
            .start();
    }

    function updateCharge(toChange) {
        force.charge( toChange );
        force.nodes(nodes)
            .links(links)
            .start(); 
    }

    function updateGravity( toChange ) {
        force.charge( toChange );
        force.nodes(nodes)
            .links(links)
            .start(); 
    }

    function updateChargeDist( toChange ) {
        force.chargeDistance( toChange );
        force.nodes(nodes)
            .links(links)
            .start();
    }


	//alert( "A second confirmation that it finishes running.");

