import * as d3 from "d3";
import ForceGraph2D from 'react-force-graph-2d';
import { useState, useEffect, useContext } from 'react'
import { getDemoWorkbook, getDemoEndpoint } from '../services/api'
import { GrnStateContext } from '../App';
import '../App.css'

export default function Graph() {
    const [workbook, setWorkbook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [error, setError] = useState(null)
    const { demoValue } = useContext(GrnStateContext)

    useEffect(() => {
        if (!demoValue) return;
        const demoEndpoint = getDemoEndpoint(demoValue);
        console.log('demoEndpoint:', demoEndpoint)
        setLoading(true)
        getDemoWorkbook(demoEndpoint)
            .then(data => {
                setWorkbook(data)
                setLinks(data.links)
                setNodes(data.genes)
                console.log(data)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
            .finally(() => setLoading(false));

        // const simulation = d3
        //     .forceSimulation(nodes)
        //     .force(
        //         "link",
        //         d3
        //             .forceLink(links)
        //             .id(d => d.id)
        //             .distance(100)
        //     )
        //     .force("charge", d3.forceManyBody().strength(-120))
        //     .force("center", d3.forceCenter(300, 300))
        //     .on("tick", () => {
        //         setNodes([...simulation.nodes()]);
        //         setLinks([...links]);
        //     });

        // return () => simulation.stop();
    }, [demoValue])

    return (
        // <div className="grnsight-container">
        //     <svg width={600} height={600}>
        //             {links.map((link, i) => (
        //                 <line
        //                     key={i}
        //                     x1={link.source.x}
        //                     y1={link.source.y}
        //                     x2={link.target.x}
        //                     y2={link.target.y}
        //                     stroke="#ccc"
        //                     strokeWidth="1.5"
        //                 />
        //             ))}

        //         {nodes.map((node, i) => (
        //             <g key={i} transform={`translate(${node.x},${node.y})`}>
        //                 <circle r={8} fill="steelblue" />
        //                 <text textAnchor="middle" y={-12} fontSize={10} fill="black">
        //                     {node.id}
        //                 </text>
        //             </g>
        //         ))}
        //     </svg>
        // </div>
        <div className="grnsight-container">
            <ForceGraph2D
                graphData={workbook ? { nodes: nodes, links: links } : { nodes: [], links: [] }}
                width={800}
                height={600}
                nodeId="index"
            />
        </div>
    )
}

/*
 {/* <svg width={600} height={600}>
                {links.map((link, i) => (
                    <line
                        key={i}
                        // the way our nodes/links are structured, each gene/node has a x and y property
                        x1={link.source.x}
                        y1={link.source.y}
                        x2={link.target.x}
                        y2={link.target.y}
                        stroke="#ccc"
                        strokeWidth="1.5"
                    />
                ))}

                {nodes.map((node, i) => (
                    <g key={i} transform={`translate(${node.x},${node.y})`}>
                        <circle r={8} fill="steelblue" />
                        <text textAnchor="middle" y={-12} fontSize={10} fill="black">
                            {node.id}
                        </text>
                    </g>
                ))}
            </svg> */