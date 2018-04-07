import makeTrafficNode from './makeTrafficNode'
import makeConnection from './makeConnection'

const GLOBAL_ENTRY = 'INTERNET'

const makeConnections = entryNodes => {
    const connections = []

    for (const nodeName of entryNodes) {
        connections.push(makeConnection(GLOBAL_ENTRY, nodeName))
    }

    return connections
}

export default (nodeTree, entryNodes, connections) => ({
    renderer: 'focusedChild',
    name: 'edge',
    nodes: [
        makeTrafficNode(GLOBAL_ENTRY),
        makeTrafficNode('REGION', nodeTree, connections)
    ],
    connections: [
        ...makeConnections(['REGION'])
    ]
})