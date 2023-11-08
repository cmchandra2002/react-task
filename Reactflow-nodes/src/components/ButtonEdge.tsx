import React from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, useReactFlow } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import './ButtonEdge.css';


export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const reactFlowInstance = useReactFlow();


    const onEdgeClick = (id: string) => {
        const edges = reactFlowInstance.getEdges();
        const nodes = reactFlowInstance.getNodes();

        console.log("EdgeNodesssssssssssss", nodes);
        console.log("EdgeEdgesssssssssssss", edges);

        const oldEdge = edges.find(edge => edge.id === id);
        if (oldEdge) {
            const preNode = nodes.find(node => node.id === oldEdge.source) ?? nodes[0];
            // const afterNode = nodes.find(node => node.id === oldEdge.target) ?? nodes[1];
            const newNode = {
                id: uuidv4(),
                type: 'customNode',
                position: {
                    x: preNode.position.x + 100,
                    y: preNode.position.y + 100,
                },
                data: {}
            };
            // const updatedNodes = [...nodes, newNode];

            setNodes(nodes => [...nodes, newNode]);

            const updatedEdges = edges.map(edge => {
                if (edge.id === id) {
                    return { ...edge, target: newNode.id };
                }
                return edge;
            });

            const newEdge = {
                id: uuidv4(),
                type: 'buttonedge',
                source: newNode.id,
                target: oldEdge.target
            };


            // const updatedEdges1 = [...updatedEdges, newEdge];
            setEdges([...updatedEdges, newEdge]);
            console.log(edges);
            console.log("clickedddddddddddd!", id);
        }
    };

    const setNodes = (newNodes) => {
        reactFlowInstance.setNodes(newNodes);
    };

    const setEdges = (newEdges) => {
        reactFlowInstance.setEdges(newEdges);
    };

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <button className="edgebutton" onClick={() => onEdgeClick(id)}>
                        +
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
