import { h, Component } from 'preact';
import Graph from 'react-graph-vis';
import SelectedNodeInfo from './components/SelectedNodeInfo';
import style from './style';


const messageTraces = [
	{
		sender: "A",
		action: "sent",
		path: "A",
		messageId: "666",
		payload: "<yay>from A</yay>"
	},
	{
		sender: "B",
		action: "received",
		path: "A-B",
		messageId: "666",
		payload: "<yay>from A</yay>"
	},
	{
		sender: "B",
		action: "sent",
		path: "A-B",
		messageId: "666",
		payload: "<yay>from A with mods by B</yay>"
	},
	{
		sender: "C",
		action: "received",
		path: "A-B-C",
		messageId: "666",
		payload: "<yay>from A with mods by B</yay>"
	},
	{
		sender: "X",
		action: "received",
		path: "A-B-X",
		messageId: "666",
		payload: "<yay>from A with mods by B</yay>"
	},
	{
		sender: "C",
		action: "sent",
		path: "A-B-C",
		messageId: "666",
		payload: "completely transformed by C"
	},
	{
		sender: "X",
		action: "sent",
		path: "A-B-X",
		messageId: "666",
		payload: "X for the win"
	},
	{
		sender: "D",
		action: "received",
		path: "A-B-C-D",
		messageId: "666",
		payload: "completely transformed by C"
	},
	{
		sender: "Y",
		action: "received",
		path: "A-B-X-Y",
		messageId: "666",
		payload: "X for the win"
	}
];

const myGraph = {
	nodes: [
		{id: 1, label: 'Node 1', color: '#e04141'},
		{id: 2, label: 'Node 2', color: '#e09c41'},
		{id: 3, label: 'Node 3', color: '#e0df41'},
		{id: 4, label: 'Node 4', color: '#7be041'},
		{id: 5, label: 'Node 5', color: '#41e0c9'}
	],
	edges: [
		{from: 1, to: 2},
		{from: 1, to: 3},
		{from: 2, to: 4},
		{from: 2, to: 5}
	]
};

export default class Home extends Component {
	constructor() {
		super();
		this.onClickNode = this.onClickNode.bind(this);
		this.getGraph = this.getGraph.bind(this);

		this.state = {
			lookup: {},
			selected: {
				component: '',
				received: '',
				sent: ''
			}
		};
	}

	onClickNode(e) {
		if (!e.nodes || e.nodes.length == 0) {
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
		
		console.log(e);

		const nodeInfo = this.state.lookup[e.nodes[0]];

		console.log(nodeInfo);

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
			const parts = t.path.split('-');

			if (parts.length > 1) {
				const fromNode = parts[parts.length-2];
				const toNode = parts[parts.length-1];

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
		let graph = this.getGraph(messageTraces);
		// graph = myGraph;

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

		console.log(graph);
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
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
