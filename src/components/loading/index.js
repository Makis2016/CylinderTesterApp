
import React, { Component } from 'react';
import './Loading.less';

export default class Message extends Component {
    constructor(props) {
        super(props);

        this.state = { isShow: false };
    }

    render() {
        let view;
        this.state.isShow ?
            view = (
                <div className='loading-view' {...this.props}>
                    <div className='loading'>
                        <div className="loading-dot" />
                        <div className="loading-dot" />
                        <div className="loading-dot" />
                        <div className="loading-dot" />
                        <div className="loading-dot" />
                        <div className="loading-dot" />
                        <div className="loading-dot" />
                        <div className="loading-dot" />
                    </div>
                </div>
            ) :
            view = null;

        return view;
    }

    open() {
        this.setState({ isShow: true });
    }

    close() {
        this.setState({ isShow: false });
    }
}