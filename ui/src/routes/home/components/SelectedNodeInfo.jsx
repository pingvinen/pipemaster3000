import {h, Component} from 'preact';

export default class SelectedNodeInfo extends Component {
    render(props, state) {
        if (!props.component) {
            return null;
        }

        return (
            <div>
                <h1>{props.component}</h1>
                
                <h2>Input</h2>
                <textarea cols="50" rows="10">{props.received}</textarea>

                <h2>Output</h2>
                <textarea cols="50" rows="10">{props.sent}</textarea>
            </div>
        );
    }
}