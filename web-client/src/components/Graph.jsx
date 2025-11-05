import { useEffect, useRef, useContext, useState } from 'react';
import * as d3 from 'd3';
// import { Grid } from 'd3-grid';
import { GrnStateContext } from '../App';
import { getDemoWorkbook, getDemoEndpoint } from '../services/api';
import {
    BOUNDARY_MARGIN,
    ZOOM_DISPLAY_MINIMUM_VALUE,
    ZOOM_DISPLAY_MAXIMUM_VALUE,
    ZOOM_DISPLAY_MIDDLE,
    ZOOM_ADAPTIVE_MAX_SCALE,
    NODE_HEIGHT,
    MINIMUM_NODE_WIDTH,
    NODE_MARGIN
} from '../constants';
// import { getEdgeColor, getEdgeThickness
// } from '../constants';
import '../App.css';

export default function Graph() {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const simulationRef = useRef(null);

    const [workbook, setWorkbook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        demoValue,
        linkDistance,
        charge,
        enableNodeColoring,
        enableEdgeColoring,
        logFoldChangeMax,
        edgeWeightVisibility
    } = useContext(GrnStateContext);

    // Constants
    const NODE_HEIGHT = 30;
    const MINIMUM_NODE_WIDTH = 68.5625;
    const NODE_MARGIN = 3;
    const MIN_SCALE = 0.25;
    const MIDDLE_SCALE = 1;

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
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        // Create zoom container
        const zoomContainer = svg.append('g')
            .attr('class', 'zoom-container');

        const boundingBoxContainer = zoomContainer.append('g')
            .attr('class', 'bounding-box-container');

        // Add bounding rect
        boundingBoxContainer.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('pointer-events', 'all');

        // Setup zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([MIN_SCALE, ZOOM_ADAPTIVE_MAX_SCALE])
            .on('zoom', (event) => {
                zoomContainer.attr('transform', event.transform);
            });

        svg.call(zoom);

        // Create force simulation
        const simulation = d3.forceSimulation(workbook.genes)
            .force('link', d3.forceLink(workbook.links)
                .id(d => d.index)
                .distance(linkDistance))
            .force('charge', d3.forceManyBody().strength(charge))
            .force('center', d3.forceCenter(width / 2, height / 2));

        simulationRef.current = simulation;

        // Create links
        const link = boundingBoxContainer.selectAll('.link')
            .data(workbook.links)
            .enter()
            .append('g')
            .attr('class', 'link');

        link.append('path')
            .attr('class', 'link-path')
            .style('stroke', d => enableEdgeColoring ? getEdgeColor(d) : '#000')
            .style('stroke-width', d => getEdgeThickness(d))
            .style('fill', 'none')
            .attr('marker-end', 'url(#arrowhead)');

        // Add arrowhead marker
        const defs = svg.append('defs');
        defs.append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '0 0 10 10')
            .attr('refX', 9)
            .attr('refY', 5)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 0 0 L 10 5 L 0 10 z')
            .style('fill', '#000');

        // Create nodes
        const node = boundingBoxContainer.selectAll('.node')
            .data(workbook.genes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // Add rectangles for nodes
        node.append('rect')
            .attr('width', d => getNodeWidth(d))
            .attr('height', NODE_HEIGHT)
            .style('fill', 'white')
            .style('stroke', '#000')
            .style('stroke-width', '2px');

        // Add text labels
        node.append('text')
            .attr('class', 'node-text')
            .attr('dy', 22)
            .attr('dx', d => getNodeWidth(d) / 2)
            .style('text-anchor', 'middle')
            .style('font-size', '18px')
            .text(d => d.name);

        // Update node widths based on text
        node.each(function(d) {
            const textWidth = this.querySelector('text').getBBox().width;
            d.textWidth = Math.max(textWidth, MINIMUM_NODE_WIDTH);
            d3.select(this).select('rect')
                .attr('width', NODE_MARGIN + d.textWidth + NODE_MARGIN);
        });

        // Tick function
        simulation.on('tick', () => {
            // Update link positions
            link.select('path')
                .attr('d', d => {
                    if (d.source === d.target) {
                        return createSelfLoop(d);
                    }
                    return createPath(d);
                });

            // Update node positions
            node.attr('transform', d => {
                d.x = Math.max(BOUNDARY_MARGIN, Math.min(width - BOUNDARY_MARGIN - (d.textWidth || MINIMUM_NODE_WIDTH), d.x));
                d.y = Math.max(BOUNDARY_MARGIN, Math.min(height - BOUNDARY_MARGIN - NODE_HEIGHT, d.y));
                return `translate(${d.x},${d.y})`;
            });
        });

        // Helper functions
        function getNodeWidth(node) {
            return NODE_MARGIN + (node.textWidth || MINIMUM_NODE_WIDTH) + NODE_MARGIN;
        }

        function getEdgeThickness(edge) {
            if (!enableEdgeColoring || workbook.sheetType === 'unweighted') {
                return 2;
            }
            const maxWeight = Math.max(...workbook.positiveWeights.concat(workbook.negativeWeights).map(Math.abs));
            const scale = d3.scaleLinear()
                .domain([0, maxWeight])
                .range([2, 14])
                .clamp(true);
            return Math.floor(scale(Math.abs(edge.value)));
        }

        function getEdgeColor(edge) {
            if (workbook.sheetType === 'unweighted') return '#000';
            return edge.value < 0 ? 'blue' : 'red';
        }

        function createPath(d) {
            const sourceX = d.source.x + getNodeWidth(d.source) / 2;
            const sourceY = d.source.y + NODE_HEIGHT / 2;
            const targetX = d.target.x + getNodeWidth(d.target) / 2;
            const targetY = d.target.y + NODE_HEIGHT / 2;

            return `M${sourceX},${sourceY} L${targetX},${targetY}`;
        }

        function createSelfLoop(d) {
            const x = d.source.x + getNodeWidth(d.source);
            const y = d.source.y + NODE_HEIGHT / 2;
            const radius = 20;

            return `M${x},${y}
                    A${radius},${radius} 0 1,1 ${x},${y + 0.1}`;
        }

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
        <div ref={containerRef} className="grnsight-container" style={{ width: '100%', height: '600px' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}