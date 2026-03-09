import { useEffect, useRef, useContext, useState } from "react";
import * as d3 from "d3";
import { GrnStateContext } from "../App";
import { getDemoWorkbook, getDemoEndpoint, getNetworkMode } from "../services/api";
import ScaleAndScroll from "./ScaleAndScroll";
import {
  BOUNDARY_MARGIN,
  ZOOM_ADAPTIVE_MAX_SCALE,
  MINIMUM_NODE_WIDTH,
  NODE_MARGIN,
  NODE_HEIGHT,
  NODE_TEXT_HEIGHT,
  MIN_SCALE,
  ZOOM_DISPLAY_MIDDLE,
  VIEW_SIZE_SMALL,
  FIT_TO_WINDOW,
  VIEW_SIZE_DIMENSIONS,
  HEIGHT_OFFSET,
  WIDTH_OFFSET,
} from "../helpers/constants";
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
import {
  flexZoomInBounds,
  viewportBoundsMoveDrag,
} from "../helpers/restrictGraphToViewportHelpers";
import "../App.css";

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
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [nodes, setNodes] = useState([]);
  const xTranslation = useRef(0);
  const yTranslation = useRef(0);
  const zoomDragPrevX = useRef(0);
  const zoomDragPrevY = useRef(0);
  const zoomScale = useRef(1);

  const {
    colorOptimal,
    linkDistance,
    charge,
    demoValue,
    networkMode,
    setNetworkMode,
    grayThreshold,
    zoomPercent,
    setZoomPercent,
    viewSize,
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
        setNodes(data.genes);
        setSheetType(data.sheetType);
        setNetworkMode(getNetworkMode(data.meta.data.workbookType));
        const weights = calcAllWeights(data, colorOptimal);
        setAllWeights(weights);
        setMaxWeight(calcMaxWeight(weights));
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        setZoomPercent(ZOOM_DISPLAY_MIDDLE);
      });
  }, [demoValue]);

  // TODO: need to update with adaptive (restrict to viewport)
  useEffect(() => {
    if (!zoomRef.current || !svgRef.current || !zoomContainerRef.current) return;
    const scale = zoomPercent / 100;
    const zoomContainer = d3.select(zoomContainerRef.current);
    zoomRef.current.scaleTo(zoomContainer, scale);
    zoomScale.current = scale;
  }, [zoomPercent]);

  // Handle window resize for Fit to Window
  useEffect(() => {
    if (viewSize !== FIT_TO_WINDOW) return;

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewSize]);

  // Change viewport size based on selection
  useEffect(() => {
    if (!viewSize) {
      setWidth(VIEW_SIZE_SMALL);
      setHeight(VIEW_SIZE_DIMENSIONS[VIEW_SIZE_SMALL].height);
    } else if (viewSize === FIT_TO_WINDOW) {
      setWidth(windowDimensions.width - WIDTH_OFFSET);
      setHeight(windowDimensions.height - HEIGHT_OFFSET);
    } else {
      setWidth(VIEW_SIZE_DIMENSIONS[viewSize].width);
      setHeight(VIEW_SIZE_DIMENSIONS[viewSize].height);
    }
  }, [viewSize, windowDimensions]);

  // Main D3 rendering effect
  useEffect(() => {
    if (!workbook || !svgRef.current || !containerRef.current || !width || !height) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Setup cursor styling for drag of graph
    const zoomDragStarted = function (event, d) {
      zoomDragPrevX.current = event.x;
      zoomDragPrevY.current = event.y;
      setIsDragging(true);
    };

    const zoomDragged = function (event, d) {
      let scale = 1;
      if (zoomContainer.attr("transform")) {
        let string = zoomContainer.attr("transform");
        scale = 1 / +string.match(/scale\(([^\)]+)\)/)[1];
        xTranslation.current = Number(zoomContainer.attr("transform").split("(")[1].split(",")[0]);
        yTranslation.current = Number(
          zoomContainer.attr("transform").split("(")[1].split(",")[1].split(")")[0]
        );
      }

      if (
        adaptive ||
        (!adaptive &&
          flexZoomInBounds(
            zoomScale.current,
            simulation.nodes(),
            width,
            height,
            xTranslation.current,
            yTranslation.current
          ) &&
          viewportBoundsMoveDrag(
            zoomScale.current,
            event.dx,
            event.dy,
            simulation.nodes(),
            width,
            height,
            xTranslation.current,
            yTranslation.current
          ))
      ) {
        zoom.translateBy(
          zoomContainer,
          scale * (event.x - zoomDragPrevX.current),
          scale * (event.y - zoomDragPrevY.current)
        );
      }
      zoomDragPrevX.current = event.x;
      zoomDragPrevY.current = event.y;
    };

    const zoomDragEnded = function (event, d) {
      setIsDragging(false);
    };

    // zoomDrag and all functions that it calls handles cursor dragging
    const zoomDrag = d3
      .drag()
      .on("start", zoomDragStarted)
      .on("drag", zoomDragged)
      .on("end", zoomDragEnded);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("id", "exportContainer");

    svg.style("pointer-events", "all").call(zoomDrag).style("font-family", "sans-serif");

    d3.select("svg").on("dblclick.zoom", null); // disables double click zooming

    const defs = svg.append("defs");

    const zoomContainer = svg
      .append("g")
      .attr("class", "boundingBox")
      .attr("width", width)
      .attr("height", height);

    zoomContainerRef.current = zoomContainer.node();

    const boundingBoxContainer = zoomContainer.append("g");

    const boundingBoxRect = boundingBoxContainer
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("stroke", "none")
      .attr("id", "boundingBoxRect");

    const flexibleContainerRect = boundingBoxContainer
      .append("rect")
      .attr("class", "boundingBox")
      .attr("fill", "none")
      .attr("id", "flexibleContainerRect");

    const zoom = d3
      .zoom()
      .scaleExtent([MIN_SCALE, ZOOM_ADAPTIVE_MAX_SCALE])
      .on("zoom", event => {
        zoomContainer.attr("transform", event.transform);
      });

    zoomRef.current = zoom;

    // D-pad controls
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
    }

    function dblclick(event, d) {
      d.fx = null;
      d.fy = null;
    }

    function center() {
      zoom.translateTo(zoomContainer, width / 2, height / 2);
    }

    // move: Moves graph with D-pad
    function move(direction) {
      var moveWidth = direction === "left" ? -50 : direction === "right" ? 50 : 0;
      var moveHeight = direction === "up" ? -50 : direction === "down" ? 50 : 0;

      if (zoomContainer.attr("transform")) {
        xTranslation.current = Number(zoomContainer.attr("transform").split("(")[1].split(",")[0]);
        yTranslation.current = Number(
          zoomContainer.attr("transform").split("(")[1].split(",")[1].split(")")[0]
        );
      }
      if (
        adaptive ||
        (!adaptive &&
          viewportBoundsMoveDrag(
            zoomScale.current,
            moveWidth,
            moveHeight,
            simulation.nodes(),
            width,
            height,
            xTranslation.current,
            yTranslation.current
          ))
      ) {
        zoom.translateBy(zoomContainer, moveWidth, moveHeight);
      }
    }

    // Tick function
    simulation.on("tick", () => {
      link
        .select("path")
        .attr("d", d => {
          if (d.source === d.target) {
            return createSelfLoop(d, width, height, colorOptimal);
          }
          return createPath(d, width, height, colorOptimal);
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

      node.attr("transform", d => {
        d.x = Math.max(
          BOUNDARY_MARGIN,
          Math.min(width - BOUNDARY_MARGIN - (d.textWidth || MINIMUM_NODE_WIDTH), d.x)
        );
        d.y = Math.max(BOUNDARY_MARGIN, Math.min(height - BOUNDARY_MARGIN - NODE_HEIGHT, d.y));
        return `translate(${d.x},${d.y})`;
      });
    });

    return () => {
      simulation.stop();
    };
  }, [workbook, linkDistance, charge, colorOptimal, grayThreshold, viewSize, windowDimensions]);

  return (
    <div
      ref={containerRef}
      className={`grnsight-container ${isDragging ? "dragging" : "draggable"}`}
      style={width && height ? { width, height } : { ...VIEW_SIZE_DIMENSIONS[VIEW_SIZE_SMALL] }}
    >
      {loading && <div>Loading graph...</div>}
      {error && <div>Error: {error}</div>}
      <svg ref={svgRef} />
      <ScaleAndScroll
        nodes={nodes}
        width={width}
        height={height}
        xTranslation={xTranslation.current}
        yTranslation={yTranslation.current}
      />
    </div>
  );
}
