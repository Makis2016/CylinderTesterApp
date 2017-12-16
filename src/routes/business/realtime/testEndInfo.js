import React, { Component } from 'react';
import EmptyData from 'uxcore-empty-data';
import { NavBar,Icon  } from 'antd-mobile';
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
            <div style={{ width: '100%',overflow:'hidden' }}>
                <style>{'.uxicon-left:before{color:black}'}</style>
                 <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this._pre()}
                >焊接绝热气瓶静态蒸发率测试系统</NavBar>
                {
                    id > 0 ?
                        <div className='flex fillParent'>
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
            pathname: '/main'
        });
    }
}