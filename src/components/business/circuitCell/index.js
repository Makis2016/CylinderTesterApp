import React, { Component } from 'react';
import assign from 'object-assign';
import './circuitCell.less';

// 背景图片列表
const Backgrounds = [
    './resources/images/circuitCell/01.png',
    './resources/images/circuitCell/02.png',
    './resources/images/circuitCell/03.png',
    './resources/images/circuitCell/04.png',
    './resources/images/circuitCell/05.png',
    './resources/images/circuitCell/06.png',
    './resources/images/circuitCell/07.png'
];

/**
 * 回路信息单元组件
 */
export default class CircuitCell extends Component {
    static propTypes = {
        circuit: React.PropTypes.object.isRequired // 回路信息
    };

    static defaultProps = {
        circuit: {}
    };

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let circuit = this.props.circuit; // 回路信息
        let status = circuit.status; // 回路状态
        let stageType = circuit.mStageTypeString; // 阶段类型
        let current = circuit.current; // 当前电流
        let className;
        let imageUrl;
        if (status == 'FAULT' || status == 'RESETING') { //  故障

            className = 'warning';
            imageUrl = Backgrounds[0];

        } else if (status == 'FORMATING' || status == 'PAUSEING' || status == 'STOPING' || status == 'JUMPING') {

            if (stageType == '脉冲充放电' || stageType == '脉冲充电') { // 脉冲(运行)
                imageUrl = Backgrounds[3];
            } else if (current > 0) { // 充电(运行)
                imageUrl = Backgrounds[1];
            } else if (current < 0) { // 放电(运行)
                imageUrl = Backgrounds[2];
            } 
        } else if (status == 'STANDBY') {//  静置(运行)
            imageUrl = Backgrounds[4];
        }
        else if (status == 'READY' || status == 'READY_TO_RUNING') { // 待机
            imageUrl = Backgrounds[5];
        } else if (status == 'PAUSE' || status == 'RECOVERING') { // 暂停
            imageUrl = Backgrounds[6];
        }

        let style = assign({}, styles.cell, { backgroundImage: 'url(' + imageUrl + ')' });

        return (

            <div style={style} className={className}>
                <div style={styles.title}>
                    {circuit.name}
                </div>
                <div style={styles.info}>
                    {circuit.batteryGroupVoltage.toFixed(2) }V&nbsp; {current.toFixed(2) }A
                </div>
                <div style={styles.stageId}>
                    第{circuit.st}步
                </div>
                <div style={styles.stage}>
                    {stageType}
                </div>
            </div>
        );
    }
}

const styles = {
    cell: {
        width: 160,
        height: 146,
        border: 'solid',
        borderWidth: 1,
        borderColor: '#dadada',
        borderRadius: 10,
        marginLeft: 9,
        marginTop: 9,
        marginRight: 9,
        marginBottom: 9,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#ffffff'
    },
    title: {
        height: 30,
        fontSize: 16,
        fontWeight: 600,
        paddingLeft: 5,
        paddingTop: 10,
        whiteSpace:'nowrap'
    },
    info: {
        fontSize: 12,
        fontWeight: 600,
        textAlign: 'center',
        paddingTop: 36,
        color: 'white'
    },
    stageId: {
        fontSize: 12,
        fontWeight: 600,
        textAlign: 'center',
        paddingTop: 22
    },
    stage: {
        fontSize: 12,
        fontWeight: 600,
        textAlign: 'center'
    }
};