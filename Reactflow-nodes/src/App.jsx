import React, { useCallback, useState } from 'react';
import ELK from 'elkjs';
import { v4 as uuidv4 } from 'uuid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import ButtonEdge from './components/ButtonEdge';

import ReactFlow, {
  useReactFlow,
  ReactFlowProvider,
  Handle,
  Position,
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

const elk = new ELK();

const getLayoutedElements = async (nodes, edges, options = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',

      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  try {
    const layoutedGraph = await elk
      .layout(graph);
    return ({
      nodes: layoutedGraph.children.map((node_1) => ({
        ...node_1,
        position: { x: node_1.x, y: node_1.y },
      })),

      edges: layoutedGraph.edges,
    });
  } catch (message) {
    return console.error(message);
  }
};


const CustomNode = ({ id }) => {

  const reactFlowInstance = useReactFlow();
  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();


  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);

  }

  const handleAddButtonClick = (id) => {
    const nodes = reactFlowInstance.getNodes();
    const edges = reactFlowInstance.getEdges();

    console.log("nodesssssssss", nodes);
    console.log("edgessssssssssss", edges);

    const clickNode = nodes.find(node => node.id === id);

    const newNode = {
      id: uuidv4(),
      type: 'customNode',
      position: {
        x: generateRandomNumber(clickNode.position.x, clickNode.position.x + 1000),
        y: generateRandomNumber(clickNode.position.y, clickNode.position.y + 1000),
      },
      data: {}
    };

    setNodes(nodes => [...nodes, newNode]);

    const newEdge = {
      id: uuidv4(),
      type: 'buttonedge',
      source: id,
      target: newNode.id
    };
    setEdges(edges => [...edges, newEdge]);


  };

  const handleDeleteButtonClick = () => {

    setNodes(nodes => nodes.slice(0, -1));
    setEdges(edges => edges.slice(0, -1));

  };


  const setNodes = (newNodes) => {
    reactFlowInstance.setNodes(newNodes);
  };

  const setEdges = (newEdges) => {
    reactFlowInstance.setEdges(newEdges);
  };


  return (
    <Card variant='contained' className='card'>
      <CardHeader className='card-header'
        title="Node"
      />
      <Divider color='#ec6f2c' />
      <CardContent className='card-content'>
        <Typography>

          There are three built-in node types  that you can use. {1}
        </Typography>
      </CardContent>

      <Handle type="source" position={Position.Right} />
      <div className='buttons'>
        <button onClick={() => handleAddButtonClick(id)}>Add</button>
        <button onClick={handleDeleteButtonClick}>Delete</button>
      </div>
      <Handle type="target" position={Position.Left} />

    </Card>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};


const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const [number, setNumber] = useState(2);

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
