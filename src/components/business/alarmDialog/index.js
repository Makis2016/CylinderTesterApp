import React, { Component } from 'react';

/**
 * 告警界面弹出框
 * 
 * @export
 * @class Header
 * @extends {Component}
 */
export default class AlarmDialog extends Component {

    static propTypes = {
        level: React.PropTypes.string,
        title:React.PropTypes.string,
        content:React.PropTypes.string
    }

    static defaultProps = {
        level: '',
        title:'',
        content:''
    }

    render() {

    }

    _renderBody() {
        return (
            <div className="kuma-confirm-body">
                <div>{this.props.level}</div>
                <div className="kuma-confirm-body-main">
                    <span className="kuma-confirm-title">{this.props.title}</span>
                    <div className="kuma-confirm-content">{this.props.content}</div>
                </div>
            </div>
        );
    }


}