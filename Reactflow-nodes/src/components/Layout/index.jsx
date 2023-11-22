import ELK from 'elkjs';

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

export default getLayoutedElements;