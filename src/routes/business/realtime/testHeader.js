import React, { Component } from 'react';
import { requestAjax } from '../../../utils/requestUtils';
import { deviceStatus } from '../../../utils/commonUtil';

/**
 * 测试界面头部
 * 
 * @export
 * @class TestHeader
 * @extends {Component}
 */
export default class TestHeader extends Component {
    static propTypes = {
        deviceInfo: React.PropTypes.object
    }

    static defaultProps = {
        deviceInfo: {
            eDeviceStatus: '', // 设备状态
            ner: 0 // NER合格值
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            disRate: 0,
            showWarningImg: this.props.deviceInfo.warningType == 'LEVEL4' ? 'visible' : 'hidden',
        };
        this.mId = this.props.deviceInfo.id;

        this._getDisRate();

        // 告警图片闪烁
        this.mImgTimer = setInterval(() => {
            if (this.state.showWarningImg == 'hidden') {
                this.setState({
                    showWarningImg: 'visible'
                });
            } else {
                this.setState({
                    showWarningImg: 'hidden'
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.mImgTimer);
    }

    componentWillReceiveProps(newprops) {
        this.mId = newprops.deviceInfo.id;
        this._getDisRate();
    }

    render() {
        let textFontSize = 15;
        let warning = '请检查测试系统管路是否泄漏或调压阀设置是否正常';
        let testingTypeText = '';

        // 常压
        if (this.props.deviceInfo.testingMode == 'CONSTANTPRESSURE') {
            warning = '请检查测试系统及管路是否泄漏';
        } else if (this.props.deviceInfo.testingMode == 'PRESSUREBEARING') {
            // 承压
            warning = '请检查测试系统管路是否泄漏或调压阀设置是否正常';
        }

        if (this.props.deviceInfo.testingMode == 'CONSTANTPRESSURE' && this.props.deviceInfo.testingType == 'AUTO') {
            testingTypeText = '自动测试（常压模式）';
        } else if (this.props.deviceInfo.testingMode == 'PRESSUREBEARING' && this.props.deviceInfo.testingType == 'AUTO') {
            testingTypeText = '自动测试（承压模式）';
        } else if (this.props.deviceInfo.testingMode == 'CONSTANTPRESSURE' && this.props.deviceInfo.testingType == 'MANUAL') {
            testingTypeText = '手动测试（常压模式）';
        } else if (this.props.deviceInfo.testingMode == 'PRESSUREBEARING' && this.props.deviceInfo.testingType == 'MANUAL') {
            testingTypeText = '手动测试（承压模式）';
        }

        return (
            <div className='flex flex-direction-column'>
                <div className='flex flex-direction-column fillParent flex-justify-content-space-between '>
                    {
                        this.props.deviceInfo.testingType != 'STANDARD' ?
                            <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                                <div style={{ fontSize: textFontSize }}>测试模式：</div>
                                <div style={{ color: '#259b24', fontSize: textFontSize }}>{testingTypeText}</div>
                            </div>
                            :
                            <div></div>
                    }
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>测试阶段：</div>
                        <div style={{ color: '#259b24', fontSize: textFontSize}}>{deviceStatus(this.props.deviceInfo.testingStatus)}</div>
                        <div></div>
                    </div>
                    {
                        this.props.deviceInfo.warningType != 'LEVEL4' ?
                            <div>
                            </div>
                            :
                            <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                                <div style={{ fontSize: textFontSize }}>告警信息：</div>
                                <div style={{ color: '#259b24', fontSize: textFontSize,width:250 }}>{warning}<img src={require('./warning.png')} height={textFontSize} width={textFontSize} style={{ visibility: this.state.showWarningImg }} /></div>
                            </div>
                    }
                </div>
                <div className='flex flex-direction-column fillParent flex-justify-content-space-between'>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>合格值：</div>
                        <div style={{ fontSize: textFontSize }}>{this.props.deviceInfo.ner + '%/d'}</div>
                    </div>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>预估值：</div>
                        <div style={{ fontSize: textFontSize }}>{this.state.disRate + '%/d'}</div>
                    </div>
                </div>
            </div>
        );
    }


    _getDisRate() {
        if (this.mId) {
            requestAjax({
                url: 'getDiscreetValue',
                params: { cylinderId: this.mId },
                success: (result) => {
                    if (result.success) {
                        this.setState({
                            disRate: result.content.data
                        });
                    }
                },
                fail: (result) => {

                }
            });
        }

    }

}