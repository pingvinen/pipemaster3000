import {h, Component} from 'preact';
import style from './pipeline.css';
import api from 'api';
import Graph from 'react-graph-vis';
import SelectedNodeInfo from './components/SelectedNodeInfo';

export default class PipelineScene extends Component {

    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.onClickNode = this.onClickNode.bind(this);
        this.getGraph = this.getGraph.bind(this);

        this.state = {
            traces: [],
            lookup: {},
            selected: {
                component: '',
                received: '',
                sent: ''
            }
        };
    }

    getTraces(correlationId) {
        api.get(`/api/traces/${correlationId}`)
            .then((response) => {
                console.log(response);
                this.setState({
                    traces: response.items,
                    selected: {
                        component: '',
                        received: '',
                        sent: ''
                    }
                });
            });
    }

    componentDidMount() {
        this.getTraces(this.props.correlationId);
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.correlationId !== this.props.correlationId) {
            this.getTraces(nextProps.correlationId);
        }
    }

    onClickNode(e) {
        if (!e.nodes || e.nodes.length === 0) {
            // user clicked something other than a node
            this.setState({
                selected: {
                    component: '',
                    received: '',
                    sent: ''
                }
            });
            return;
        }

        const nodeInfo = this.state.lookup[e.nodes[0]];

        this.setState({
            selected: {
                component: nodeInfo.component,
                received: nodeInfo.received,
                sent: nodeInfo.sent
            }
        });
    }

    setLookup(node, key, value) {
        const state = this.state;

        if (!state.lookup[node]) {
            state.lookup[node] = {};
        }

        state.lookup[node][key] = value;
    }

    getNodeId(component) {
        return `n${component}`;
    }

    getGraph(traces) {
        const nodes = {};
        const edges = {};

        // make nodes
        traces.forEach(t => {
            const nodeId = this.getNodeId(t.sender);

            if (!nodes[t.sender]) {
                nodes[t.sender] = {
                    id: nodeId,
                    label: t.sender
                };
            }

            // make lookup
            this.setLookup(nodeId, 'component', t.sender);
            this.setLookup(nodeId, t.action, t.payload);
        });

        // make edges
        traces.forEach(t => {
            const path = t.path;

            if (path.length > 1) {
                const fromNode = path[path.length-2];
                const toNode = path[path.length-1];

                const id = `${fromNode}_to_${toNode}`;

                if (!edges[id]) {
                    edges[id] = {
                        from: this.getNodeId(fromNode),
                        to: this.getNodeId(toNode)
                    };
                }
            }
        });

        return {
            nodes: Object.values(nodes),
            edges: Object.values(edges)
        };
    }

    render(props, state) {
        let graph = this.getGraph(state.traces);

        const options = {
            layout: {
                hierarchical: {
                    enabled: true,
                    direction: "LR",
                    parentCentralization: false,
                    sortMethod: "directed"
                }
            },
            edges: {
                color: "#000000"
            },
            nodes: {
                physics: false
            }
        };

        const events = {
            select: this.onClickNode
        };

        return (
            <div class={style.this}>
                <h1>Pipeline {props.correlationId}</h1>

                <Graph
                    graph={graph}
                    options={options}
                    events={events}
                />

                <SelectedNodeInfo
                    component={state.selected.component}
                    received={state.selected.received}
                    sent={state.selected.sent}
                />
            </div>
        );
    }
}
