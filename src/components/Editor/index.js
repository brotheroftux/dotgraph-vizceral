import { h, Component } from 'preact' // eslint-disable-line no-unused-vars

import { DotParser, DotGraph } from '#/dotgraph'
import transformAst, { traverseAst } from '@/dotgraph-traffic-transform'


export default class Editor extends Component {
    constructor (props) {
        super(props)

        this.props = props

        this.parseHandler = this.props.onParsed || undefined

        this.state = {
            graphSource: ''
        }
    }

    parse () {
        const ast = DotParser.parse(this.state.graphSource)
        const graph = new DotGraph(ast)

        graph.walk()

        console.log(traverseAst(graph.ast)) // eslint-disable-line no-console
        console.log(transformAst(graph.ast)) // eslint-disable-line no-console

        const traffic = transformAst(graph.ast)

        this.parseHandler({
            source: this.state.graphSource,
            traffic
        })
    }

    handleChange (event) {
        this.setState({
            graphSource: event.target.value
        })
    }

    render () {
        return (
            <div>
                <textarea onChange={this.handleChange.bind(this)}></textarea>
                <button onClick={this.parse.bind(this)}>Parse</button>
            </div>
        )
    }
}