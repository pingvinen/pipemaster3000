import {h, Component} from 'preact';
import style from './pipeline.css';
import api from 'api';

export default class PipelineScene extends Component {

    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

        this.state = {
            traces: []
        };
    }

    async getTraces(correlationId) {
        const response = await api.get(`/api/traces/${correlationId}`);

        this.setState({
            traces: response.items
        });
    }

    async componentDidMount() {
        await this.getTraces(this.props.correlationId);
    }

    async componentWillReceiveProps(nextProps) {
        await this.getTraces(nextProps.correlationId);
    }

    render(props, state) {
        return (
            <div class={style.this}>
                <h1>Pipeline {props.correlationId}</h1>

                <pre>
                {state.traces.map(x => {
                    return `${JSON.stringify(x)}\n`;
                })}
                </pre>
            </div>
        );
    }
}
