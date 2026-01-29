import { useEffect, useRef, useContext, useState } from "react";
import * as d3 from "d3";
import { GrnStateContext } from "../App";
import { getDemoWorkbook, getDemoEndpoint, getNetworkMode } from "../services/api";
import ScaleAndScroll from "./ScaleAndScroll";
import {
  BOUNDARY_MARGIN,
  ZOOM_DISPLAY_MINIMUM_VALUE,
  ZOOM_DISPLAY_MAXIMUM_VALUE,
  ZOOM_DISPLAY_MIDDLE,
  ZOOM_ADAPTIVE_MAX_SCALE,
  MINIMUM_NODE_WIDTH,
  NODE_MARGIN,
  NODE_HEIGHT,
  NODE_TEXT_HEIGHT,
  MIN_SCALE,
  MIDDLE_SCALE,
  EDGE_RED,
  EDGE_BLACK,
  EDGE_BLUE,
} from "../constants";
import {
  getNodeWidth,
  getEdgeThickness,
  getEdgeColor,
  createPath,
  createSelfLoop,
  calcAllWeights,
  calcMaxWeight,
} from "../helpers/graphHelpers";
import { createEdgeMarker } from "../helpers/markerHelpers";
import "../App.css";
import { ZOOM_PERCENT } from "../../../web-client-classic/public/js/constants";

export default function Graph() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const simulationRef = useRef(null);
  const zoomRef = useRef(null);
  const zoomContainerRef = useRef(null);

  // The workbook or sheetType are not needed in global state outside of Graph, so keep them local
  const [workbook, setWorkbook] = useState(null);
  const [sheetType, setSheetType] = useState(null);
  const [allWeights, setAllWeights] = useState([]);
  const [maxWeight, setMaxWeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    colorOptimal,
    linkDistance,
    charge,
    demoValue,
    networkMode,
    setNetworkMode,
    grayThreshold,
    zoomPercent,
  } = useContext(GrnStateContext);

  // Load workbook data
  useEffect(() => {
    if (!demoValue) return;

    const demoEndpoint = getDemoEndpoint(demoValue);
    setLoading(true);

    getDemoWorkbook(demoEndpoint)
      .then(data => {
        setWorkbook(data);
        setSheetType(data.sheetType);
        console.log("data", data);
        setNetworkMode(getNetworkMode(data.meta.data.workbookType));
        const weights = calcAllWeights(data, colorOptimal);
        setAllWeights(weights);
        setMaxWeight(calcMaxWeight(weights));
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [demoValue]);

  useEffect(() => {
    if (!zoomRef.current || !svgRef.current || !containerRef.current) return;
    const scale = zoomPercent / 100;
    const svg = d3.select(svgRef.current);
    const transform = d3.zoomIdentity.scale(scale);
    svg.call(zoomRef.current.transform, transform);
  }, [zoomPercent]);

  // Main D3 rendering effect
  useEffect(() => {
    if (!workbook || !svgRef.current || !containerRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);

    const defs = svg.append("defs");

    // Create zoom container
    const zoomContainer = svg.append("g").attr("class", "zoom-container");
    zoomContainerRef.current = zoomContainer.node(); // Store reference

    const zoom = d3
      .zoom()
      .scaleExtent([MIN_SCALE, ZOOM_ADAPTIVE_MAX_SCALE])
      .on("zoom", event => {
        zoomContainer.attr("transform", event.transform);
      });

    zoomRef.current = zoom;

    const boundingBoxContainer = zoomContainer.append("g").attr("class", "bounding-box-container");

    // this controls the D-pad
    d3.selectAll(".scrollBtn").on("click", null); // Remove event handlers, if there were any.
    var arrowMovement = ["Up", "Left", "Right", "Down"];
    arrowMovement.forEach(function (direction) {
      d3.select(".scroll" + direction).on("click", function () {
        move(direction.toLowerCase());
      });
    });
    d3.select(".center").on("click", center);

    // Create force simulation
    const simulation = d3
      .forceSimulation(workbook.genes)
      .force(
        "link",
        d3
          .forceLink(workbook.links)
          .id(d => d.index)
          .distance(linkDistance)
      )
      .force("charge", d3.forceManyBody().strength(charge))
      .force("center", d3.forceCenter(width / 2, height / 2));

    simulationRef.current = simulation;

    // Create links
    const link = boundingBoxContainer
      .selectAll(".link")
      .data(workbook.links)
      .enter()
      .append("g")
      .attr("class", "link");

    // Add paths with arrowheads
    link
      .append("path")
      .attr("class", "link-path")
      .style("stroke", d => {
        d.stroke = getEdgeColor(workbook, d, grayThreshold, maxWeight, colorOptimal);
        return d.stroke;
      })
      .style("stroke-width", d => {
        d.strokeWidth = colorOptimal ? getEdgeThickness(workbook, colorOptimal, d) : 2;
        return d.strokeWidth;
      })
      .style("fill", "none");

    const drag = d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);

    // Create nodes
    const node = boundingBoxContainer
      .selectAll(".node")
      .data(workbook.genes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(drag)
      .on("dblclick", dblclick);

    // Add rectangles for nodes
    node
      .append("rect")
      .attr("width", d => getNodeWidth(d))
      .attr("height", NODE_HEIGHT)
      .style("fill", "white")
      .style("stroke", "#000")
      .style("stroke-width", "1.5px");

    // Add text labels
    node
      .append("text")
      .attr("class", "node-text")
      .attr("dy", NODE_TEXT_HEIGHT)
      .attr("dx", d => getNodeWidth(d) / 2)
      .attr("fill", "rgb(0, 0, 0)")
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .style("stroke-width", "0")
      .style("font-family", "sans-serif")
      .text(d => d.name);

    // Update node widths based on text
    node.each(function (d) {
      const textWidth = this.querySelector("text").getBBox().width;
      d.textWidth = Math.max(textWidth, MINIMUM_NODE_WIDTH);
      d3.select(this)
        .select("rect")
        .attr("width", NODE_MARGIN + d.textWidth + NODE_MARGIN);
    });

    // TODO: for issue #1309, this is a good place to investigate to lock nodes. compare dragended to web-client-classic behavior
    // Helper functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      event.stopPropagation();
    }

    function dblclick(event, d) {
      d.fx = null;
      d.fy = null;
    }

    // TODO: may need to change this when have dymanic viewport width
    function center() {
      var viewportWidth = width;
      var viewportHeight = height;
      zoom.translateTo(zoomContainer, width / 2, height / 2);
    }

    // move: Moves graph with D-pad
    // TODO: will need to update with adaptive
    function move(direction) {
      var moveWidth = direction === "left" ? -50 : direction === "right" ? 50 : 0;
      var moveHeight = direction === "up" ? -50 : direction === "down" ? 50 : 0;
      // if (adaptive) {
      zoom.translateBy(zoomContainer, moveWidth, moveHeight);
      // } else if (!adaptive) {
      //   if (viewportBoundsMoveDrag(graphZoom, moveWidth, moveHeight)) {
      //     zoom.translateBy(zoomContainer, moveWidth, moveHeight);
      //   }
      // }
    }

    // Tick function
    simulation.on("tick", () => {
      // Update link positions with Bézier curves
      link
        .select("path")
        .attr("d", d => {
          if (d.source === d.target) {
            return createSelfLoop(d, width, height, colorOptimal);
          }
          return createPath(d, width, height);
        })
        .attr("marker-end", d => {
          return createEdgeMarker({
            defs,
            d,
            grayThreshold,
            sheetType,
            maxWeight,
            colorOptimal,
            networkMode,
          });
        });

      // Update node positions
      node.attr("transform", d => {
        d.x = Math.max(
          BOUNDARY_MARGIN,
          Math.min(width - BOUNDARY_MARGIN - (d.textWidth || MINIMUM_NODE_WIDTH), d.x)
        );
        d.y = Math.max(BOUNDARY_MARGIN, Math.min(height - BOUNDARY_MARGIN - NODE_HEIGHT, d.y));
        return `translate(${d.x},${d.y})`;
      });
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [workbook, linkDistance, charge, colorOptimal, grayThreshold]);
  if (loading) {
    return <div className="grnsight-container">Loading graph...</div>;
  }

  if (error) {
    return <div className="grnsight-container">Error: {error}</div>;
  }

  return (
    <div
      ref={containerRef}
      className="grnsight-container"
      style={{ width: "100%", height: "600px" }}
    >
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
      <ScaleAndScroll />
    </div>
  );
}
