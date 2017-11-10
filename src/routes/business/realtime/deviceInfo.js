import React, { Component } from 'react';
import Icon from 'uxcore-icon';
import EmptyData from 'uxcore-empty-data';
import Formatter from 'uxcore-formatter';
import { requestAjax } from '../../../utils/requestUtils';
import DeviceCell from './deviceStatusCell';
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
            id: 0,// 
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

        this._loadDetail(null, null);

    }

    componentDidMount() {
        window.addEventListener('resize', this.mResizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.mResizeHandler);
    }

    render() {

        let deviceName = getName();

        return (
            <div style={{ width: '100%' }} className='flex flex-direction-row'>
            <style>{'.uxicon-left:before{color:black}'}</style>
                <div className='flex flex-direction-row flex-align-items-center flex-justify-content-space-between' style={{ height: 50, background: '#F8F8F8', width: '100%', position: 'fixed', zIndex: 1, fontSize: 14, color: '#101010' }}>
                    <Icon name="left" onClick={() => this._pre()}/>
                    <div>{deviceName}</div>
                    <div></div>
                </div>
                {
                    this.state.id > 0 ?
                        <div className='flex fillParent' style={{ marginTop: 50, padding: 10 }}>
                            <TestInfo id={this.state.id} isResult={this.state.isResult} />
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

        if (id) {
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
            });
        }
    }

    _onClickFunc(id, isResult) {
        this.mId = id;
        this.isResult = isResult;
        this._loadDetail(id, isResult);
    }

    _pre() {
        this.context.router.push({
            pathname: '/realTime'
        });
    }
}