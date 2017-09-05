import { h, Component } from 'preact';
import {Sigma, RandomizeNodePositions, RelativeSize, NodeShapes} from 'react-sigma';
import style from './style';

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
	}

	onClickNode(e) {
		console.log(e);
	}

	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>

				<Sigma
					graph={myGraph}
					settings={{drawEdges: true, clone: false}}
					onClickNode={this.onClickNode}
				>
					<RelativeSize initialSize={15} />
					<RandomizeNodePositions />
				</Sigma>
			</div>
		);
	}
}
