import React from 'react';
import Select, { Option } from 'uxcore-select2';
import { requestAjax } from '../../utils/requestUtils';

export default class UxSelect extends Select {
    static propTypes = {
        url: React.PropTypes.string, // 请求URL
        method: React.PropTypes.string, // 请求类型 get post
        dropdownClassName: React.PropTypes.string,
        options: React.PropTypes.array
    }

    static defaultProps = {
        url: null,
        method: 'post',
        options: [],
        style: { width: 200 },
        dropdownClassName: 'kuma-select2-selected-has-icon'
    }

    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options,
            status: this.props.url == null ? 'loaded' : 'loading'
        };
    }

    componentWillMount() {
        if ((this.props.url !== null) && (this.state.status === 'loading')) {
            requestAjax({
                url: this.props.url,
                method: this.props.method,
                success: (response) => {
                    this.setState({
                        status: 'loaded'
                    });
                }
            }, false);
        }
    }

    render() {
        let list = [];
        if (this.state.status === 'loading') {
            list.push(
                <div key='loading'>
                    <i className='kuma-load-more-icon-loading'></i>
                </div>);
        } else {
            list.push(
                this.state.options.map(options => <Option key={options.key}>{options.value}</Option>)
            );
        }
        return (
            <Select {...this.propTypes} style={this.props.style}>
                {list}
            </Select>
        );
    }

}