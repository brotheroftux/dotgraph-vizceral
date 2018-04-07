import makeConnection from './makeConnection'

export default function expandConnections (nodeTree, entryPoint) {
    const connections = []

    const expandTreePart = entry => {
        for (const node of nodeTree[entry]) {
            connections.push(
                makeConnection(entry, node)
            )
            
            if(nodeTree[node])
                expandTreePart(node)
        }
    }

    expandTreePart(entryPoint)

    return connections
}