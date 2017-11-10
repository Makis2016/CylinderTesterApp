import React, { Component } from 'react';
import Icon from 'uxcore-icon';
import EmptyData from 'uxcore-empty-data';
import TestInfo from './testInfo';
import { getId, getName, getTime } from '../../../common/UserStore';

export default class TestEndInfo extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            clientHeight: document.body.clientHeight
        };

        /**
         * 大小改变事件处理函数
         */
        this.mResizeHandler = () => {
            this.setState({ clientHeight: document.body.clientHeight });
        };

    }

    componentDidMount() {
        window.addEventListener('resize', this.mResizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.mResizeHandler);
    }

    render() {

        let deviceName = getName();
        let id = getId();

        return (
            <div style={{ width: '100%' }} className='flex flex-direction-row'>
                <style>{'.uxicon-left:before{color:black}'}</style>
                <div className='flex flex-direction-row flex-align-items-center flex-justify-content-space-between' style={{ height: 50, background: '#F8F8F8', width: '100%', position: 'fixed', zIndex: 1, fontSize: 14, color: '#101010' }}>
                    <Icon name="left" onClick={() => this._pre()}/>
                    <div>{deviceName}</div>
                    <div></div>
                </div>
                {
                    id > 0 ?
                        <div className='flex fillParent' style={{ marginTop: 50, padding: 10 }}>
                            <TestInfo id={id} isResult={true} />
                        </div>
                        :
                        <div className='flex fillParent flex-align-items-center flex-justify-content-center' style={{ marginTop: 50, padding: 10 }}>
                            <EmptyData />
                        </div>
                }
            </div>
        );
    }

    _pre() {
        this.context.router.push({
            pathname: '/report'
        });
    }
}