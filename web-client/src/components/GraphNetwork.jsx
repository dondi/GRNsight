import * as d3 from "d3";
import { useEffect, useState } from "react";

export default function GeneNetwork({ data }) {
    const [nodes, setNodes] = useState(data.nodes);
    const [links, setLinks] = useState(data.links);

    useEffect(() => {
        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3
                    .forceLink(links)
                    .id(d => d.id)
                    .distance(100)
            )
            .force("charge", d3.forceManyBody().strength(-120))
            .force("center", d3.forceCenter(300, 300))
            .on("tick", () => {
                setNodes([...simulation.nodes()]);
                setLinks([...links]);
            });

        return () => simulation.stop();
    }, [data]);

    return (
        <svg width={600} height={600}>
            {/* links */}
            {links.map((link, i) => (
                <line
                    key={i}
                    x1={link.source.x}
                    y1={link.source.y}
                    x2={link.target.x}
                    y2={link.target.y}
                    stroke="#ccc"
                    strokeWidth="1.5"
                />
            ))}

            {/* nodes */}
            {nodes.map((node, i) => (
                <g key={i} transform={`translate(${node.x},${node.y})`}>
                    <circle r={8} fill="steelblue" />
                    <text textAnchor="middle" y={-12} fontSize={10} fill="black">
                        {node.id}
                    </text>
                </g>
            ))}
        </svg>
    );
}
