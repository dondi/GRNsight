import { useEffect, useRef, useContext, useState } from "react";
import * as d3 from "d3";
import { GrnStateContext } from "../App";
import { getDemoWorkbook, getDemoEndpoint } from "../services/api";
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
} from "../helpers/graphHelpers";

import "../App.css";

export default function Graph() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const simulationRef = useRef(null);

  const [workbook, setWorkbook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    demoValue,
    linkDistance,
    charge,
    enableNodeColoring,
    enableEdgeColoring,
    logFoldChangeMax,
    edgeWeightVisibility,
    adaptive,
  } = useContext(GrnStateContext);

  // Load workbook data
  useEffect(() => {
    if (!demoValue) return;

    const demoEndpoint = getDemoEndpoint(demoValue);
    setLoading(true);

    getDemoWorkbook(demoEndpoint)
      .then(data => {
        setWorkbook(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [demoValue]);

  // Main D3 rendering effect
  useEffect(() => {
    if (!workbook || !svgRef.current || !containerRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create SVG
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);

    // Create defs for arrowhead markers
    const defs = svg.append("defs");

    // Define arrowhead markers for different colors
    const arrowColors = [
      { id: "arrowhead-black", color: EDGE_BLACK },
      { id: "arrowhead-red", color: EDGE_RED },
      { id: "arrowhead-blue", color: EDGE_BLUE },
    ];

    arrowColors.forEach(({ id, color }) => {
      defs
        .append("marker")
        .attr("id", id)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 9) // Position at arrow tip
        .attr("refY", 5) // Center vertically
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto") // Auto-rotate to match path direction
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z") // TODO: explain what this does
        .style("fill", color);
    });

    // Create zoom container
    const zoomContainer = svg.append("g").attr("class", "zoom-container");

    const boundingBoxContainer = zoomContainer.append("g").attr("class", "bounding-box-container");

    // Setup zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([MIN_SCALE, ZOOM_ADAPTIVE_MAX_SCALE])
      .on("zoom", event => {
        zoomContainer.attr("transform", event.transform);
      });

    svg.call(zoom);

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
      .style("stroke", d => getEdgeColor(workbook, d))
      .style("stroke-width", d => getEdgeThickness(workbook, enableEdgeColoring, d))
      .style("fill", "none")
      .attr("marker-end", d => {
        // Return the appropriate marker based on edge color
        if (workbook.sheetType === "unweighted") {
          return "url(#arrowhead-black)";
        }
        return d.value < 0 ? "url(#arrowhead-blue)" : "url(#arrowhead-red)";
      });

    // Create nodes
    const node = boundingBoxContainer
      .selectAll(".node")
      .data(workbook.genes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

    // Add rectangles for nodes
    node
      .append("rect")
      .attr("width", d => getNodeWidth(d))
      .attr("height", NODE_HEIGHT)
      .style("fill", "white")
      .style("stroke", "#000")
      .style("stroke-width", "2px");

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
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Tick function
    simulation.on("tick", () => {
      // Update link positions with Bézier curves
      link.select("path").attr("d", d => {
        if (d.source === d.target) {
          return createSelfLoop(d);
        }
        return createPath(d, width, height);
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
  }, [workbook, linkDistance, charge, enableEdgeColoring, enableNodeColoring]);
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
    </div>
  );
}
