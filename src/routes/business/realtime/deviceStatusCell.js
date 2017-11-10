import React, { Component } from 'react';
import { Constants } from '../../../common/constants';
import { formatDuring, media, deviceStatus,testingType } from '../../../utils/commonUtil';
import { requestAjax } from '../../../utils/requestUtils';

/**
 * 自动检测单元格样式
 * 
 * @export
 * @class TesterCell
 * @extends {Component}
 */
export default class UnIdleCell extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
        onClickFunc:React.PropTypes.func
    }

    static propTypes = {
        testerData: {}, // 编辑数据内容
        index: 0,
        onClickFunc:()=>{}
    };

    constructor(props) {
        super(props);
        this.state = {
            showWarningImg: 'hidden',
            clientWidth: document.body.clientWidth,
            data: {
                p2: 0,
                f: 0
            }
        };

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

    render() {
        let contentFontSize = 15;
        let indexFontSize = 40 ;
        let indexWidth = 60 ;
        let trHeight = 90 ;
        let numberWidth = 100;
        let eDeviceStatus = this.props.testerData.testingStatus;
        let eTestType = this.props.testerData.testingType;

        let eColor = { paddingTop: 5, paddingBottom: 5, fontSize: contentFontSize, color: '#000000', whiteSpace: 'nowrap' };
        if (eTestType == Constants.eTestingType.AUTO) {
            eColor = { paddingTop: 5, paddingBottom: 5, fontSize: contentFontSize, color: '#0094ff', whiteSpace: 'nowrap' };
            //eTestTypeText = Constants.eTestType.AUTO;
        } else if (eTestType == Constants.eTestingType.STANDARD) {
            eColor = { paddingTop: 5, paddingBottom: 5, fontSize: contentFontSize, color: '#259b24', whiteSpace: 'nowrap' };
            //eTestTypeText = Constants.eTestType.STANDARD;
        } else if (eTestType == Constants.eTestingType.MANUAL) {
            eColor = { paddingTop: 5, paddingBottom: 5, fontSize: contentFontSize, color: '#ff5c00', whiteSpace: 'nowrap' };
            //eTestTypeText = Constants.eTestType.MANUAL;
        }

        let img = '';

        let TesterCellTitleWidth = { width:numberWidth,overflow:'hidden',textOverflow:'ellipsis', paddingTop: 5, paddingBottom: 5, color: '#000000', marginRight: 15, whiteSpace: 'nowrap' };

        // 告警图标
        if (this.props.testerData.warningType == 'LEVEL4' && this.props.testerData.testingStatus != 'EOT') {
            img = <img src={require('./warning.png')} height={contentFontSize} width={contentFontSize} style={{ visibility: this.state.showWarningImg, marginTop: 15 }} />;
        }

        let isResult = false;
        if (this.props.testerData.testingStatus == 'EOT') {
            isResult = true;
        }

        return (
            <div className='flex' style={{ width: '100%', height: trHeight, padding: '10px 0px', backgroundColor: this.props.testerData.selected ?'rgba(0,255,58,0.14)':'#ffffff', float: 'left', borderBottom:'1px solid #bbbbbb' }} onClick={() => this._toTestPage(this.props.testerData.id,isResult)}>
                <div style={{ fontSize: indexFontSize, width: indexWidth, textAlign: 'center' }}><span style={styles.TesterCellNum}>{this.props.index}</span></div>
                <div className='flex flex-direction-column fillParent' style={{ fontSize: contentFontSize }}>
                    <div className='flex flex-direction-row fillParent'>
                        <div style={eColor}>{testingType(this.props.testerData.testingType)}</div>
                        <div style={styles.TesterCellTitle}>测试状态：</div>
                        <div style={styles.TestTypeStyle}>{deviceStatus(this.props.testerData.testingStatus)}</div>
                        {
                            (eDeviceStatus == 'STEWING' || eDeviceStatus == 'SOT') ?
                                <div style={styles.TesterCellTitle}>静置时长：</div> : <div style={styles.TesterCellTitle}>测试时长：</div>
                        }
                        {
                            (eDeviceStatus == 'STEWING' || eDeviceStatus == 'SOT') ?
                                <div style={styles.TesterCellTitle}>{formatDuring(this.props.testerData.staticRunTime)}</div> : <div style={styles.TesterCellTitle}>{formatDuring(this.props.testerData.testingRunTime)}</div>
                        }
                    </div>
                    <div className='flex flex-direction-row fillParent flex-align-items-center'>
                        <div style={styles.TesterCellTitle}>气瓶编号：</div>
                        <div style={TesterCellTitleWidth}>{this.props.testerData.cylinderNumber}</div>
                        <div style={styles.TesterCellTitle}>测试介质：</div>
                        <div style={styles.TesterCellTitle}>{media(this.props.testerData.testingMedia)}</div>
                        <div style={styles.TesterCellTitle}>{img}</div>
                    </div>
                </div>
            </div>
        );

    }

    _toTestPage(id,isResult) {
        this.props.onClickFunc(id,isResult);
    }
}

const styles = {
    TesterCellNum: {
        left: 0,
        color: '#607d8b',
        transform: 'rotate(0deg)',
        padding: 0,
        borderRadius: 0,
        borderWidth: 0,
        borderStyle: 'solid',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        opacity: 1,
        pointerEvents: 'auto',
        textAlign: 'center'
    },
    TesterCellTitle: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#000000',
        marginLeft:4,
        whiteSpace: 'nowrap'
    },
    TestTypeStyle: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#259b24',
        marginRight: 2,
        whiteSpace: 'nowrap'
    }

};