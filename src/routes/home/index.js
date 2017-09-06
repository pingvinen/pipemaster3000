import { h, Component } from 'preact';
import {Sigma, RandomizeNodePositions, RelativeSize, NodeShapes, EdgeShapes} from 'react-sigma';
import {NOverlap} from 'react-sigma/lib/NOverlap';
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
	nodes:
	[
		{id:"n1", label:"Alice"},
		{id:"n2", label:"Rabbit"}
	],
	edges:
	[
		{id:"e1",source:"n1",target:"n2",label:"SEES"}
	]
};

export default class Home extends Component {
	constructor() {
		super();
		this.onClickNode = this.onClickNode.bind(this);
		this.getGraph = this.getGraph.bind(this);
	}

	onClickNode(e) {
		console.log(e);
	}

	getNodeId(component) {
		return `n${component}`;
	}

	getGraph(traces) {
		const nodes = {};
		const edges = {};

		let x = 0;
		let y = 0;

		// make nodes
		traces.forEach(t => {
			if (!nodes[t.sender]) {
				x += 2000;
				y += 2;

				nodes[t.sender] = {
					id: this.getNodeId(t.sender),
					label: t.sender,
					x,
					y
				};
			}
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
						id,
						source: this.getNodeId(fromNode),
						target: this.getNodeId(toNode),
						label: id
					};
				}
			}
		});
		
		return {
			nodes: Object.values(nodes),
			edges: Object.values(edges)
		};
	}

	render() {
		let graph = this.getGraph(messageTraces);
		//graph = myGraph;

		const settings = {
			clone: false,
			verbose: true,
			defaultLabelSize: 20,
			minNodeSize: 15,
			maxNodeSize: 15
		};

		console.log(graph);
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>

				<div style="position: relative; background-color: green">
					<Sigma
						graph={graph}
						settings={settings}
						renderer="canvas"
						onClickNode={this.onClickNode}
					>
						<NodeShapes default="square"/>
						<EdgeShapes default="arrow"/>
						<RelativeSize initialSize={0} />
					</Sigma>
				</div>
			</div>
		);
	}
}
