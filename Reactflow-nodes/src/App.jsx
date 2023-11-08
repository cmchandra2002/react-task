import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ButtonEdge from './components/ButtonEdge/index';
import CustomNode from './components/CustomNode/index';
import getLayoutedElements from './components/Layout/index';
import ReactFlow, {
  useReactFlow,
  ReactFlowProvider,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';

import './index.css';

const initialNodes = [
  { id: uuidv4(), type: 'customNode', position: { x: 50, y: 50 }, data: {} }
];

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

const edgeTypes = {
  buttonedge: ButtonEdge,
};


const nodeTypes = {
  customNode: CustomNode,
};


const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { fitView } = useReactFlow();
  console.log('nodes', nodes)
  console.log('edges', edges)

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onLayout = useCallback(
    ({ direction }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };

      getLayoutedElements(nodes, edges, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges]
  );

  return (
    <div >

      <div style={{ height: '100vh', backgroundColor: '#1a202c' }}>
        <ReactFlow


          nodes={nodes}


          edges={edges}


          onNodesChange={onNodesChange}


          onEdgesChange={onEdgesChange}


          onConnect={onConnect}

          edgeTypes={edgeTypes}


          nodeTypes={nodeTypes}>


        </ReactFlow>

      </div>

      <Panel position="top-right">
        <button onClick={() => onLayout({ direction: 'DOWN' })}>vertical layout</button>

        <button onClick={() => onLayout({ direction: 'RIGHT' })}>horizontal layout</button>
      </Panel>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
