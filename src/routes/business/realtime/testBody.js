import React, { Component } from 'react';
import Formatter from 'uxcore-formatter';
import { formatDuring, media } from '../../../utils/commonUtil';

/**
 * 测试界面公共显示区域
 * 
 * @export
 * @class TestBody
 * @extends {Component}
 */
export default class TestBody extends Component {
    static propTypes = {
        deviceInfo: React.PropTypes.object
    }

    static defaultProps = {
        deviceInfo: {
            staticBeginTime: '',
            staticEndTime: '',
            staticRunTime: '',
            testingBeginTime: '',
            testingEndTime: '',
            testingRunTime: '',
            evaporationNorm: '',
            testMedia: ''
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            clientWidth: document.body.clientWidth
        };
    }

    render() {
        let textFontSize = 15 ;
        return (
            <div className='flex flex-direction-column'>
                <div className='flex flex-direction-column'>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>测试介质：</div>
                        <div style={{ fontSize: textFontSize,width:200 }}>{media(this.props.deviceInfo.testingMedia)}</div>
                    </div>
                </div>
                <div className='flex flex-direction-column'>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>静置开始时间：</div>
                        {
                            (this.props.deviceInfo.staticBeginTime == null)?
                            <div style={{ fontSize: textFontSize,width:200 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            :
                            <div style={{ fontSize: textFontSize,width:200 }}>{Formatter.date(new Date(this.props.deviceInfo.staticBeginTime), 'YYYY-MM-DD HH:mm')}</div>
                        }
                    </div>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>结束时间：</div>
                        {
                            (this.props.deviceInfo.staticEndTime == null) ?
                                <div style={{ fontSize: textFontSize,width:200 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                :
                                <div style={{ fontSize: textFontSize,width:200 }}>{Formatter.date(new Date(this.props.deviceInfo.staticEndTime), 'YYYY-MM-DD HH:mm')}</div>
                        }
                    </div>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>累计时长(时:分)：</div>
                        <div style={{ fontSize: textFontSize,width:150 }}>{formatDuring(this.props.deviceInfo.staticRunTime)}</div>
                    </div>
                </div>
                <div className='flex flex-direction-column fillParent flex-justify-content-space-between'>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>测试开始时间：</div>
                        {
                            (this.props.deviceInfo.testingBeginTime == null) ?
                                <div style={{ fontSize: textFontSize,width:200 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                :
                                <div style={{ fontSize: textFontSize,width:200 }}>{Formatter.date(new Date(this.props.deviceInfo.testingBeginTime), 'YYYY-MM-DD HH:mm')}</div>
                        }

                    </div>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>结束时间：</div>
                        {
                            (this.props.deviceInfo.testingEndTime == null) ?
                                <div style={{ fontSize: textFontSize,width:200 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                :
                                <div style={{ fontSize: textFontSize,width:200 }}>{Formatter.date(new Date(this.props.deviceInfo.testingEndTime), 'YYYY-MM-DD HH:mm')}</div>
                        }
                    </div>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>累计时长(时:分)：</div>
                        <div style={{ fontSize: textFontSize,width:150 }}>{formatDuring(this.props.deviceInfo.testingRunTime)}</div>
                    </div>
                </div>
            </div>
        );
    }
}