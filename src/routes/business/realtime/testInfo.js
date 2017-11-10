import React, { Component } from 'react';
import TestHeader from './testHeader';
import TestBody from './testBody';
import TestEchart from './testEchart';
import { requestAjax } from '../../../utils/requestUtils';
import TestEnd from './testEnd';

/**
 * 
 * @export
 * @class StandardTest
 * @extends {Component}
 */
export default class TestInfo extends Component {
    static contextTypes = {
        id: React.PropTypes.number,
        isResult: React.PropTypes.bool
    }

    static propTypes = {
        id: 0,
        isResult: false
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

        this._getCylinderInfoById();
    }

    componentWillReceiveProps(newprops) {
        this.mId = newprops.id;
        this.mResult = newprops.isResult;
        this._getCylinderInfoById();
    }

    render() {
        return (
            <div className='flex flex-direction-column fillParent'>
                {
                    this.mResult ? (this.mId == this.state.deviceInfo.id)?
                        <TestEnd deviceInfo={this.state.deviceInfo} />:<div></div>
                        :
                        <div>
                            <div style={{ marginTop: 10 }}></div>
                            <TestHeader
                                deviceInfo={this.state.deviceInfo}
                            />
                            <div style={{ marginTop: 10 }}></div>

                            <div style={{ marginTop: 10 }}></div>
                            <TestBody
                                deviceInfo={this.state.deviceInfo}
                            />
                            <div style={{ marginTop: 10 }}></div>
                            {
                                ((!this.state.deviceInfo.testingStatus) || (this.state.deviceInfo.testingStatus == 'IDLE')) ?
                                    <div></div>
                                    :
                                    <TestEchart cylinderId={this.mId} mResult={this.mResult} testMedia={this.state.deviceInfo.testingMedia} testStatus={this.state.deviceInfo.testingStatus} testingMode={this.state.deviceInfo.testingMode}/>
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
                    if(result.success){
                         this.setState({
                        deviceInfo: result.content.data
                       });
                    }                   
                }
            });
        }

    }
}
