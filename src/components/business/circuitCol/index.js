import React, { Component } from 'react';
import LiquidGauge from '../../../components/liquidGauge';
import Marquee from '../../../components/marqueeLabel';
import './circuitCol.less';

/**
 *  回路单元格
 */
export default class CircuitCol extends Component {

    static propTypes = {
        circuit: React.PropTypes.object.isRequired,
        dbClickFunc: React.PropTypes.func,
        clickFunc: React.PropTypes.func,
        currentMId: React.PropTypes.number
    }

    static defaultProps = {
        dbClickFunc: () => { },
        clickFunc: () => { }
    }

    constructor(props) {
        super(props);

        this.state = {
            circuit: this.props.circuit,
            classList: 'batteryGroup'
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            circuit: nextProps.circuit
        });
    }

    render() {
        let circuitColor = 'batteryGroup';
        if (this.props.currentMId == this.props.circuit.mId) {
            circuitColor = 'batteryGroup batteryGroupClick';
        }


        let data = this.state.circuit;
        let monitorStatus = '';
        let imageUrl = '';
        let background = '#ffffff';
        let color = '';
        let outbackgroundColor = '#efe9d9';

        if (data.mMonitorStatus == 'Charge') {
            monitorStatus = '充电中';
            imageUrl = './resources/images/circuitCol/congdian.png';
        } else if (data.mMonitorStatus == 'Discharge') {
            monitorStatus = '放电中';
            imageUrl = './resources/images/circuitCol/fangdian.png';
        } else if (data.mMonitorStatus == 'FloatCharge') {
            monitorStatus = '浮充';
        } else {
            monitorStatus = '非充非放';
        }

        if (data.mAlarmLevel == 'Level1' || data.mAlarmLevel == 'Level2') {
            background = '#F3EDA3';
            outbackgroundColor = '#ffffff';
        } else if (data.mAlarmLevel == 'Level3') {
            background = '#B70005';
            color = '#ffffff';
            outbackgroundColor = '#ffffff';
        }

        let mShortAreaNamePath = this.state.circuit.mShortAreaNamePath;
        if (this.state.circuit.mShortAreaNamePath == undefined || this.state.circuit.mShortAreaNamePath == 'undefined') {
            mShortAreaNamePath = '';
        }

        return (
            <div
                className={circuitColor}
                style={{ background: background, color: color, cursor: 'pointer' }}
                onDoubleClick={() => this.props.dbClickFunc(this.state.circuit)}
                onClick={() => this.props.clickFunc(this.state.circuit.mId)}
            >
                <div style={styles.citcuitName}>
                    <Marquee text={mShortAreaNamePath + this.state.circuit.mName} width={150}/>
                </div>
                <div className='batteryGroup_outer_ring' >
                    <LiquidGauge
                        valueText={this.state.circuit.mElectricity}
                        radius={45}
                        outBackgroundColor={outbackgroundColor}
                        style={{ backgroundColor: '#d3cdbf', borderRadius: '100%' }}
                    />
                    <div className='batteryGroup_ring_content_start'>{monitorStatus}</div>
                    <div className='batteryGroup_mark_ring' style={{ backgroundImage: 'url(' + imageUrl + ')', backgroundColor: outbackgroundColor }}></div>
                </div>
                <div className='batteryGroup_content'>
                    <div className='batteryGroup_content_voltage'>{this.state.circuit.mVoltage}V</div>
                    <div className='batteryGroup_content_current'>{this.state.circuit.mCurrent}A</div>
                </div>
            </div>
        );
    }

    _onClick() {
        if (this.state.classList == 'batteryGroup batteryGroupClick') {
            this.setState({
                classList: 'batteryGroup'
            });
        } else {
            this.setState({
                classList: 'batteryGroup batteryGroupClick'
            });
        }

    }
}

const styles = {
    citcuitName: {
        fontSize: 15,
        display: 'block',
        height: 26,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
};