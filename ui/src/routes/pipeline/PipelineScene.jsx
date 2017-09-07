import {h, Component} from 'preact';

import style from './pipeline.css';

export default class PipelineScene extends Component {
    render(props, stats) {
        return (
            <div class={style.this}>
                <h1>Pipeline {props.correlationId}</h1>
            </div>
        );
    }
}
