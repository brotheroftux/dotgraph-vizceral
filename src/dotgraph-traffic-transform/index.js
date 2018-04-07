import traverseAst from './traverseAst'
import expandTree from './expandTree'
import makeTrafficData from './makeTrafficData'
import expandConnections from './expandConnections'

export { traverseAst }

export default function transformAst (ast) {
    const nodeTree = traverseAst(ast)

    const expanded = expandTree(nodeTree)
    
    let connections = []

    for (const entryPoint of nodeTree[Symbol.for('entryNodes')]) {
        connections = connections.concat(expandConnections(nodeTree, entryPoint))
    }

    return makeTrafficData(expanded, nodeTree[Symbol.for('entryNodes')], connections)
}