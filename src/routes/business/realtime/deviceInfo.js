import React, { Component } from 'react';
import EmptyData from 'uxcore-empty-data';
import { NavBar, Icon, Toast } from 'antd-mobile';
import { requestAjax } from '../../../utils/requestUtils';
import TestInfo from './testInfo';
import { getId, getName } from '../../../common/UserStore';

export default class DeviceInfo extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            statusList: [], // 状态列表
            id: props.location.query.cylinderId || 0,// 
            isResult: false,
            lastSyncTime: 0,
            clientHeight: document.body.clientHeight
        };

        /**
         * 大小改变事件处理函数
         */
        this.mResizeHandler = () => {
            this.setState({ clientHeight: document.body.clientHeight });
        };

        this.mId = null;

        this.isResult = null;

        this._loadDetail( this.mId, this.isResult);
    }

    componentDidMount() {
        window.addEventListener('resize', this.mResizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.mResizeHandler);
    }

    render() {

        let deviceName = getName();

        // Toast.loading('Loading...', 30, () => {
        //     console.log('Load complete !!!');
        // });


        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this._pre()}
                >焊接绝热气瓶静态蒸发率测试系统</NavBar>
                {
                    this.state.id > 0 ?
                        <div className='flex fillParent' style={{ overflow: 'auto' }}>
                            <TestInfo id={this.state.id} isResult={this.state.isResult} deviceId = {getId()} />
                        </div>
                        :
                        <div className='flex fillParent flex-align-items-center flex-justify-content-center' style={{ marginTop: 50, padding: 10 }}>
                            <EmptyData />
                        </div>

                }
            </div>
        );
    }

    _loadDetail(selectId, isEOT) {

        let id = getId();

        if (id && this.state.id == 0) {
            requestAjax({
                url: 'loadDetail',
                params: { id: id },
                success: (result) => {
                    let dataList = result.content.data;
                    if (dataList && dataList.length >= 1) {
                        let isResult = false;
                        if (this.mId == null && dataList[0].testingStatus == 'EOT') {
                            isResult = true;
                        }
                        if (this.mId == null) {
                            dataList[0].selected = true;
                        } else {
                            for (let data in dataList) {
                                if (dataList[data].id == this.mId) {
                                    dataList[data].selected = true;
                                } else {
                                    dataList[data].selected = false;
                                }
                            }
                        }
                        this.setState({
                            statusList: dataList,
                            id: this.mId || dataList[0].id,
                            isResult: this.isResult || isResult,
                            lastSyncTime: dataList[0].lastSyncTime
                        }, function () {
                            this.mId = selectId || dataList[0].id;
                            this.isResult = isEOT || isResult;
                        });
                    }
                }
            }, false);
        }
    }

    _onClickFunc(id, isResult) {
        this.mId = id;
        this.isResult = isResult;
        this._loadDetail(id, isResult);
    }

    _pre() {
        this.context.router.push({
            pathname: '/main'
        });
    }
}