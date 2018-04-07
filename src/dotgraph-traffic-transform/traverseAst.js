export default function traverseAst (astNode) {
    const nodes = {}
    const entryNodes = []

    for (const childNode of astNode.children) {
        if (childNode.type === 'edge_stmt') {
            const sourceNode = childNode.edge_list[0].id
            const destinationNode = childNode.edge_list[1].id

            if (!nodes.hasOwnProperty(sourceNode)) {
                entryNodes.push(sourceNode)

                if (entryNodes.includes(destinationNode))
                    entryNodes.splice(entryNodes.indexOf(destinationNode), 1)
            }

            const refs = nodes[sourceNode] || []

            refs.push(destinationNode)
            nodes[sourceNode] = refs
            nodes[destinationNode] = null
        }
    }

    nodes[Symbol.for('entryNodes')] = entryNodes

    return nodes
}