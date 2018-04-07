import { h, Component } from 'preact' // eslint-disable-line no-unused-vars

import Editor from '@/components/Editor'
import VizJsViewer from '@/components/VizJsViewer'
import Vizceral from 'vizceral-react'

import './style.styl'

import trafficData from '@/mock-data/lotsOfTraffic'

console.log(trafficData) // eslint-disable-line no-console

export default class App extends Component {
    constructor () {
        super()

        this.state = {
            source: 'digraph { a -> b; }',
            traffic: trafficData
        }
    }

    handleGraphUpdate (graphData) {
        this.setState(graphData)
        
        console.log(this.state) // eslint-disable-line no-console
    }

    render () {
        return (
            <div class='container'>
                <Editor onParsed={this.handleGraphUpdate.bind(this)} />
                <VizJsViewer graph={this.state.source}/>
                <Vizceral traffic={this.state.traffic} />
            </div>
        )
    }
}