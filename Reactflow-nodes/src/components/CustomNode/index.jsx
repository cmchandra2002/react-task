import { v4 as uuidv4 } from 'uuid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';


import {
    useReactFlow,
    Handle,
    Position,
} from 'reactflow';

import './styles.css';

const CustomNode = ({ id }) => {

    const reactFlowInstance = useReactFlow();


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


export default CustomNode;
