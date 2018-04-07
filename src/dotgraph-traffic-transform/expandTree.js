import makeTrafficNode from './makeTrafficNode'

export default function expandTree (nodeTree) {
    const tree = []

    const expandTreePart = entries => {
        for (const node of entries) {
            if (nodeTree[node])
                tree.push(
                    makeTrafficNode(node, expandTreePart(nodeTree[node]))
                )
            else
                tree.push(
                    makeTrafficNode(node)
                )
        }
    }

    expandTreePart(nodeTree[Symbol.for('entryNodes')])

    return tree
}