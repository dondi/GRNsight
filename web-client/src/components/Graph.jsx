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
  ZOOM_MIN_SCALE,
  ZOOM_DISPLAY_MIDDLE,
  VIEW_SIZE_SMALL,
  FIT_TO_WINDOW,
  VIEW_SIZE_DIMENSIONS,
  HEIGHT_OFFSET,
  WIDTH_OFFSET,
  MAX_GRAPH_HEIGHT,
  NODE_POS_OFFSET,
  MAX_GRAPH_WIDTH,
  SELF_REFERRING_Y_OFFSET,
} from "../helpers/constants";
import {
  getNodeWidth,
  getEdgeThickness,
  getEffectiveStrokeWidth,
  getEdgeColor,
  createPath,
  createSelfLoop,
  calcAllWeights,
  calcMaxWeight,
  getSelfReferringRadius,
} from "../helpers/graphHelpers";
import { createAllMarkers, getEdgeMarkerId } from "../helpers/markerHelpers";
import {
  flexZoomInBounds,
  viewportBoundsMoveDrag,
  getLeftXBoundaryMargin,
  getTopYBoundaryMargin,
  getRightXBoundaryMargin,
  getBottomYBoundaryMargin,
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
  const widthBoundingBox = useRef(null);
  const heightBoundingBox = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [transformState, setTransformState] = useState({ x: 0, y: 0, k: 1 });
  const xTranslation = useRef(0);
  const yTranslation = useRef(0);
  const zoomDragPrevX = useRef(0);
  const zoomDragPrevY = useRef(0);
  const zoomScale = useRef(1);

  const {
    demoValue,
    networkData,
    viewSize,
    adaptive,
    colorOptimal,
    linkDistance,
    charge,
    networkMode,
    setNetworkMode,
    grayThreshold,
    zoomPercent,
    setZoomPercent,
  } = useContext(GrnStateContext);

  const applyWorkbookData = data => {
    setWorkbook(data);
    setNodes(data.genes || []);
    setSheetType(data.sheetType);
    const weights = calcAllWeights(data, colorOptimal);
    setAllWeights(weights);
    setMaxWeight(calcMaxWeight(weights));
    setError(null);
  };

  const getViewportBoundsData = () => ({
    nodes: simulationRef.current ? simulationRef.current.nodes() : [],
    width,
    height,
    xTranslation: transformState.x,
    yTranslation: transformState.y,
    zoomScale: transformState.k,
  });

  // Load workbook data
  useEffect(() => {
    if (!demoValue) return;
    const demoEndpoint = getDemoEndpoint(demoValue);
    setLoading(true);

    getDemoWorkbook(demoEndpoint)
      .then(data => {
        applyWorkbookData(data);
        setNetworkMode(getNetworkMode(data.meta.data.workbookType));
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        setZoomPercent(ZOOM_DISPLAY_MIDDLE);
      });
  }, [demoValue]);

  useEffect(() => {
    if (!networkData) return;

    setLoading(true);
    try {
      applyWorkbookData(networkData);
    } catch (err) {
      setError(err.message || "Failed to display uploaded graph.");
    } finally {
      setLoading(false);
      setZoomPercent(ZOOM_DISPLAY_MIDDLE);
    }
  }, [networkData]);

  // TODO: need to update with adaptive (restrict to viewport)
  useEffect(() => {
    if (!zoomRef.current || !svgRef.current || !zoomContainerRef.current) return;
    const scale = zoomPercent / 100;

    const zoomContainer = d3.select(zoomContainerRef.current);
    zoomRef.current.scaleTo(zoomContainer, scale);
    zoomScale.current = scale;
  }, [zoomPercent, adaptive, width, height, setZoomPercent]);

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
  }, [viewSize, adaptive]);

  // Change viewport size based on selection
  useEffect(() => {
    if (!viewSize) {
      setWidth(VIEW_SIZE_SMALL);
      setHeight(VIEW_SIZE_DIMENSIONS[VIEW_SIZE_SMALL].height);
      widthBoundingBox.current = VIEW_SIZE_SMALL;
      heightBoundingBox.current = VIEW_SIZE_DIMENSIONS[VIEW_SIZE_SMALL].height;
    } else if (viewSize === FIT_TO_WINDOW) {
      setWidth(windowDimensions.width - WIDTH_OFFSET);
      setHeight(windowDimensions.height - HEIGHT_OFFSET);
      widthBoundingBox.current = windowDimensions.width - WIDTH_OFFSET;
      heightBoundingBox.current = windowDimensions.height - HEIGHT_OFFSET;
    } else {
      setWidth(VIEW_SIZE_DIMENSIONS[viewSize].width);
      setHeight(VIEW_SIZE_DIMENSIONS[viewSize].height);
      widthBoundingBox.current = VIEW_SIZE_DIMENSIONS[viewSize].width;
      heightBoundingBox.current = VIEW_SIZE_DIMENSIONS[viewSize].height;
    }
  }, [viewSize, windowDimensions, adaptive]);

  // Main D3 rendering effect
  useEffect(() => {
    if (!workbook || !svgRef.current || !containerRef.current || !width || !height) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

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

    createAllMarkers({ defs, links: workbook.links, networkMode });

    const zoomContainer = svg
      .append("g")
      .attr("class", "boundingBox")
      .attr("width", widthBoundingBox.current)
      .attr("height", heightBoundingBox.current);

    zoomContainerRef.current = zoomContainer.node();

    const boundingBoxContainer = zoomContainer
      .append("g")
      .attr("width", widthBoundingBox.current)
      .attr("height", heightBoundingBox.current);

    const zoom = d3
      .zoom()
      .scaleExtent([ZOOM_MIN_SCALE, ZOOM_ADAPTIVE_MAX_SCALE])
      .on("zoom", event => {
        zoomContainer.attr("transform", event.transform);
        xTranslation.current = event.transform.x;
        yTranslation.current = event.transform.y;
        zoomScale.current = event.transform.k;
        setTransformState({ x: event.transform.x, y: event.transform.y, k: event.transform.k });
      });

    zoomRef.current = zoom;

    // Re-apply current zoom value to the newly created zoom container so bounds math
    // stays in sync after viewport-size changes.
    // Helps to ensure that nodes stay within viewport after viewport size changes, especially when toggling to !adaptive
    const initialScale = zoomPercent / 100;
    zoomScale.current = initialScale;
    zoom.scaleTo(zoomContainer, initialScale);

    // D-pad controls
    d3.selectAll(".scrollBtn").on("click", null); // Remove event handlers, if there were any.
    var arrowMovement = ["Up", "Left", "Right", "Down"];
    arrowMovement.forEach(function (direction) {
      d3.select(".scroll" + direction).on("click", function () {
        move(direction.toLowerCase());
      });
    });
    d3.select(".center").on("click", center);

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
        const baseStrokeWidth = getEdgeThickness(workbook, colorOptimal, d);
        d.baseStrokeWidth = baseStrokeWidth;
        d.strokeWidth = getEffectiveStrokeWidth({
          baseStrokeWidth,
          edge: d,
          colorOptimal,
          networkMode,
        });
        return baseStrokeWidth;
      })
      .style("fill", "none")
      .attr("marker-end", d => {
        // Set ONCE - Safari needs this to be static after markers exist
        return getEdgeMarkerId({
          d,
          colorOptimal,
          networkMode,
        });
      });

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
      const nodeWidth = getNodeWidth(d);
      if (adaptive) {
        d.fx = event.x;
        d.fy = event.y;
      } else {
        // fx and fy stands for fixed x and y which is when node is fixed to a position
        // calculate boundaries to prevent nodes and edges from being dragged outside of viewport
        const leftBoundary = getLeftXBoundaryMargin(
          adaptive,
          zoomScale.current,
          xTranslation.current
        );
        const rightBoundary = getRightXBoundaryMargin(
          adaptive,
          zoomScale.current,
          xTranslation.current,
          widthBoundingBox.current,
          nodeWidth
        );

        const topBoundary = getTopYBoundaryMargin(false, zoomScale.current, yTranslation.current);
        const selfReferringEdge = getSelfReferringEdge(d);
        const edgeHeight = selfReferringEdge
          ? getSelfReferringRadius(selfReferringEdge) +
            selfReferringEdge.strokeWidth +
            SELF_REFERRING_Y_OFFSET +
            0.5 +
            NODE_HEIGHT
          : NODE_HEIGHT;
        const bottomBoundary = getBottomYBoundaryMargin(
          adaptive,
          zoomScale.current,
          yTranslation.current,
          heightBoundingBox.current
        );

        d.fx = Math.max(leftBoundary, Math.min(rightBoundary - nodeWidth, event.x));
        const maxY = selfReferringEdge ? bottomBoundary - edgeHeight : bottomBoundary - NODE_HEIGHT;
        d.fy = Math.max(topBoundary, Math.min(maxY, event.y));
      }
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

    function getSelfReferringEdge(node) {
      return link
        .select("path")
        ["_groups"][0].map(function (path) {
          return path.__data__;
        })
        .filter(function (pathData) {
          return pathData.source === node && pathData.source === pathData.target;
        })[0];
    }

    simulation.on("tick", () => {
      const currentZoom = zoomScale.current || 1;

      node
        .attr("x", function (d) {
          const nodeWidth = getNodeWidth(d);
          const selfReferringEdge = getSelfReferringEdge(d);
          const selfReferringEdgeWidth = selfReferringEdge
            ? getSelfReferringRadius(selfReferringEdge) + selfReferringEdge.strokeWidth + 2
            : 0;
          let rightBoundary =
            widthBoundingBox.current -
            (d.textWidth + NODE_POS_OFFSET) -
            BOUNDARY_MARGIN -
            selfReferringEdgeWidth;
          if (!adaptive) {
            rightBoundary =
              getRightXBoundaryMargin(
                adaptive,
                zoomScale.current,
                xTranslation.current,
                widthBoundingBox.current,
                nodeWidth
              ) -
              (d.textWidth + NODE_POS_OFFSET) -
              selfReferringEdgeWidth;
          }
          // currentXPos bounds the graph when toggle to !adaptive and moves each of the nodes to be in bounds
          let leftBoundary = getLeftXBoundaryMargin(adaptive, currentZoom, xTranslation.current);
          let currentXPos = Math.max(leftBoundary, Math.min(rightBoundary, d.x ?? rightBoundary));
          if (
            adaptive &&
            widthBoundingBox.current < MAX_GRAPH_WIDTH &&
            (currentXPos === leftBoundary || currentXPos === rightBoundary)
          ) {
            widthBoundingBox.current += NODE_POS_OFFSET;
            boundingBoxContainer.attr("width", widthBoundingBox.current);

            link
              .attr("x1", function (d) {
                return d.source.x;
              })
              .attr("x2", function (d) {
                return d.target.x;
              });

            node.attr("x", function (d) {
              return d.x;
            });
          }
          if (!adaptive && d.fx != null) {
            d.fx = currentXPos;
          }
          return (d.x = currentXPos);
        })
        .attr("y", function (d) {
          const selfReferringEdge = getSelfReferringEdge(d);
          const selfReferringEdgeHeight = selfReferringEdge
            ? getSelfReferringRadius(selfReferringEdge) +
              selfReferringEdge.strokeWidth +
              SELF_REFERRING_Y_OFFSET +
              0.5
            : 0;
          let bottomBoundary =
            heightBoundingBox.current - NODE_HEIGHT - BOUNDARY_MARGIN - selfReferringEdgeHeight;
          if (!adaptive) {
            bottomBoundary =
              getBottomYBoundaryMargin(
                adaptive,
                zoomScale.current,
                yTranslation.current,
                heightBoundingBox.current
              ) -
              NODE_HEIGHT -
              selfReferringEdgeHeight;
          }
          // currentYPos bounds the graph when toggle to !adaptive and moves each of the nodes to be in bounds
          let topBoundary = getTopYBoundaryMargin(adaptive, currentZoom, yTranslation.current);
          let currentYPos = Math.max(topBoundary, Math.min(bottomBoundary, d.y ?? bottomBoundary));

          if (
            adaptive &&
            heightBoundingBox.current < MAX_GRAPH_HEIGHT &&
            (currentYPos === topBoundary || currentYPos === bottomBoundary)
          ) {
            if (!d3.select(this).classed("fixed")) {
              heightBoundingBox.current += NODE_POS_OFFSET;
              boundingBoxContainer.attr("height", heightBoundingBox.current);
              link
                .attr("y1", function (d) {
                  return d.source.y;
                })
                .attr("y2", function (d) {
                  return d.target.y;
                });

              node.attr("y", function (d) {
                return d.y;
              });
            }
          }
          if (!adaptive && d.fy != null) {
            d.fy = currentYPos;
          }
          return (d.y = currentYPos);
        })
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      link
        .select("path")
        .attr("d", d => {
          const baseStrokeWidth = getEdgeThickness(workbook, colorOptimal, d);
          d.strokeWidth = getEffectiveStrokeWidth({
            baseStrokeWidth,
            edge: d,
            colorOptimal,
            networkMode,
          });

          if (d.source === d.target) {
            return createSelfLoop(d, width, height, colorOptimal);
          }
          return createPath(d, width, height, colorOptimal);
        })
        .attr("marker-end", d => {
          // Update marker-end during tick so repressors can switch between horizontal/vertical
          return getEdgeMarkerId({
            d,
            colorOptimal,
            networkMode,
          });
        });

      link
        .select("text")
        .attr("x", function (d) {
          return d.label.x;
        })
        .attr("y", function (d) {
          return d.label.y;
        });
    });

    return () => {
      simulation.stop();
    };
  }, [
    workbook,
    linkDistance,
    charge,
    colorOptimal,
    grayThreshold,
    width,
    height,
    adaptive,
    windowDimensions,
    zoomPercent,
  ]);

  return (
    <div
      ref={containerRef}
      className={`grnsight-container ${isDragging ? "dragging" : "draggable"}`}
      style={width && height ? { width, height } : { ...VIEW_SIZE_DIMENSIONS[VIEW_SIZE_SMALL] }}
    >
      {loading && <div>Loading graph...</div>}
      {error && <div>Error: {error}</div>}
      <svg ref={svgRef} />
      <ScaleAndScroll getViewportBoundsData={getViewportBoundsData} />
    </div>
  );
}
