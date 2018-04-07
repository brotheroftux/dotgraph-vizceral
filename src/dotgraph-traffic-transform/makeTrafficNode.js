export default (name, children = [], connections = []) => ({
    renderer: 'region',
    class: 'normal',
    nodes: children,
    maxVolume: 1000,
    connections,
    name
})