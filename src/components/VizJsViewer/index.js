import { h, Component } from 'preact' // eslint-disable-line no-unused-vars

const Viz = window.Viz || undefined

export default class VizJsViewer extends Component {
    constructor (props) {
        super(props)

        this.props = props

        this.state = {
            graphSvgData: ''
        }

        this.buildGraph()
    }

    componentWillReceiveProps (nextProps) {
        this.props = nextProps

        this.buildGraph()
    }

    buildGraph () {
        const graphSvgData = Viz(this.props.graph)

        this.setState({ graphSvgData })
    }

    render () {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.state.graphSvgData }} />
        )
    }
}