import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import TestHeader from './testHeader';
import TestBody from './testBody';
import TestEchart from './testEchart';
import { requestAjax } from '../../../utils/requestUtils';
import TestEnd from './testEnd';
import StandardCell from './standardCell';

/**
 * 
 * @export
 * @class StandardTest
 * @extends {Component}
 */
export default class TestInfo extends Component {
   
    static contextTypes = {
        router: React.PropTypes.object.isRequired        
    }

    static propTypes = {
        id: 0,
        isResult: false,
        deviceId: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            clientWidth: document.body.clientWidth,
            deviceInfo: {
                id: 0,
                staticBeginTime: '',
                staticEndTime: '',
                staticRunTime: '',
                testBeginTime: '',
                testEndTime: '',
                testRunTime: '',
                eDeviceStatus: '',
                ner: '',
                evaporationNorm: '',
                testMedia: ''
            }
        };

        this.mId = this.props.id;
        this.mResult = this.props.isResult;
        this.deviceId = this.props.deviceId;

        this._getCylinderInfoById();
        this._getLastSyncTime();
        this.mWarningTimer = setInterval(() => {
            this._getCylinderInfoById();
            this._getLastSyncTime();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.mWarningTimer);
    }

    componentWillReceiveProps(newprops) {
        this.mId = newprops.id;
        this.mResult = newprops.isResult;
        this.deviceId = newprops.deviceId;
        this._getCylinderInfoById();
    }

    render() {
        return (
            <div className='flex flex-direction-column fillParent'>
                {
                    this.mResult ? (this.mId == this.state.deviceInfo.id) ?
                        <TestEnd deviceInfo={this.state.deviceInfo} /> : <div></div>
                        :
                        <div style={{ overflow: 'auto', height: document.body.clientHeight - 90 }}>
                            <div style={{ marginTop: 10 }}></div>
                            <TestHeader
                                deviceInfo={this.state.deviceInfo}
                            />
                            <TestBody
                                deviceInfo={this.state.deviceInfo}
                            />
                            {
                                ((this.state.deviceInfo.testingType) && (this.state.deviceInfo.testingType == 'STANDARD') && (this.state.deviceInfo.testingStatus) && (this.state.deviceInfo.testingStatus == 'TESTING')) ?
                                    <StandardCell cylinderId={this.mId} />
                                    :
                                    <div></div>
                            }
                            {
                                ((!this.state.deviceInfo.testingStatus) || (this.state.deviceInfo.testingStatus == 'IDLE')) ?
                                    <div></div>
                                    :
                                    <TestEchart cylinderId={this.mId} mResult={this.mResult} testMedia={this.state.deviceInfo.testingMedia} testStatus={this.state.deviceInfo.testingStatus} testingMode={this.state.deviceInfo.testingMode} />
                            }
                        </div>
                }
            </div>
        );
    }

    _getCylinderInfoById() {
        let id = this.mId;
        let url = 'getCylinderInfoById';
        if (this.mResult) {
            url = 'selectResultByResultId';
        }
        if (id) {
            requestAjax({
                controller: 'cylinder',
                params: { id: id },
                url: url,
                success: (result) => {
                    if (result.success) {
                        this.setState({
                            deviceInfo: result.content.data
                        });
                    }
                }
            }, false);
        }
    }

    _getLastSyncTime() {
        requestAjax({
            url: 'loadDetail',
            params: { id: this.deviceId },
            success: (result) => {
                let dataList = result.content.data;
                if (dataList && dataList.length >= 1) {
                    if (((Date.parse(new Date()) / 1000) - (dataList[0].lastSyncTime / 1000)) / 60 > 10) {
                        clearInterval(this.mWarningTimer);
                        Modal.alert('提示', '该设备处于离线状态', [{
                            text: '确定', onPress: () => {
                                console.log(this);
                                this.context.router.push({
                                    pathname: '/main'
                                });
                            }
                        }], 'ios');
                    }
                }
            }
        }, false);
    }
}
