import React, { Component } from 'react';
import Icon from 'uxcore-icon';
import Formatter from 'uxcore-formatter';
import ReactEcharts from 'echarts-for-react';
import { requestAjax } from '../../../utils/requestUtils';
import { media } from '../../../utils/commonUtil';
import { Constants } from '../../../common/constants';

export default class TestEchart extends Component {
    static propTypes = {
        recordGap: React.PropTypes.number,
        startTime: React.PropTypes.any,
        endTime: React.PropTypes.any,
        testMedia: React.PropTypes.string,
        testStatus: React.PropTypes.string,
        cylinderId: React.PropTypes.number,
        mResult: React.PropTypes.bool,
        testingMode: React.PropTypes.string
    }

    static defaultProps = {
        recordGap: 30,
        mResult: false,
        testingMode: 'CONSTANTPRESSURE'
    }

    constructor(props) {
        super(props);

        this._initEchart(props);
        this._getTestingProcess(props);

        this.state = {
            allData: [],
            xData: [],
            yData: [],
            seriesName: '瞬间流量',
            unit: 'L/min',
            isEchartShow: true,
            testProcess: {
                p3: 0,
                p2: 0,
                t2: 0,
                flowmeter: 0,
                cumulativeFlowmeter: 0
            },
            start: 0,
            end: 50
        };

        this.mIndex = 1;

    }

    componentWillReceiveProps(newProps) {
        this._initEchart(newProps);
        this._getTestingProcess(newProps);
    }

    render() {
        let yData = [];
        let data = this.state.yData;
        for (let index in data) {
            if (!data[index].isTrue) {
                yData.push({ value: data[index].value, symbol: 'triangle', symbolSize: '10' });
            } else {
                yData.push({ value: data[index].value });
            }
        }



        let option = {
            title: {
            },
            tooltip: {
                formatter: '{a}</br>{b} </br>{c} ' + this.state.unit
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.xData
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} ' + this.state.unit
                }
            },
            series: [
                {
                    name: this.state.seriesName,
                    type: 'line',
                    stack: '总量',
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    // data: this.state.yData
                    data: yData
                }
            ],
            animation: false,
            dataZoom: [{
                type: 'slider',
                start: this.state.start,
                end: this.state.end
            }, {
                start: 0,
                end: 100,
                handleSize: '50%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
        };

        let onEvents = {
            'datazoom': (value) => this._onDatazoomMove(value)
        };

        let img = this.props.testingMode == 'CONSTANTPRESSURE' ? Constants.TopologicalGraph_A : Constants.TopologicalGraph_B;

        return (
            <div className='flex flex-direction-column ' style={{ overflowX: 'hidden' }}>
                <style>
                    {'.selected {color:#FFFFFF}'}
                </style>
                <div style={{ width: '100%', display: this.state.isEchartShow ? 'block' : 'none', overflowX: 'auto' }}>
                    <ReactEcharts
                        option={option}
                        className='react_for_echarts'
                       
                        onEvents={onEvents}
                    />
                    <div className='flex flex-direction-row flex-justify-content-center' style={{ fontSize: 16 }}>
                        <div>{this.state.seriesName + '曲线图'}</div>
                        {
                            this.props.testMedia ? <div style={{ marginLeft: 10 }}>{'测试介质：' + media(this.props.testMedia)}</div>
                                : <div></div>
                        }

                    </div>
                </div>
                <div className='flex fillParent flex-direction-column' style={{ width: '100%', display: this.state.isEchartShow ? 'none' : 'block' }}>
                    <div className='flex flex-direction-row flex-justify-content-center' style={{ background: 'url(' + img + ') no-repeat', height: document.body.clientHeight * 0.3, backgroundSize: 'contain', backgroundPosition: 'center' }}>
                        {/*<img style={{width:document.body.clientWidth}} src={this.props.testingMode == 'CONSTANTPRESSURE' ? Constants.TopologicalGraph_A : Constants.TopologicalGraph_B} />*/}
                    </div>
                    <div className='flex flex-direction-column flex-justify-content-center' style={{ padding: 10 }}>
                        <div className='flex flex-direction-row flex-justify-content-space-between'>
                            <span>入口压力：{this.state.testProcess.p3}MPa</span>
                            <span>被检件内压力：{this.state.testProcess.p2}MPa</span>
                        </div>
                        <div className='flex flex-direction-row flex-justify-content-space-between'>
                            <span>日平均温度：{this.state.testProcess.t2}℃</span>
                            <span>瞬时流量：{this.state.testProcess.flowmeter}L/min</span>
                        </div>
                        <div className='flex flex-direction-row flex-justify-content-space-between'>
                            <span>累计流量：{this.state.testProcess.cumulativeFlowmeter}L/min</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-direction-row flex-justify-content-space-around' style={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#108EE9', height: 43.5, color: '#CCD6FE' }}>
                    <div className='flex flex-direction-column flex-align-items-center selected' ref='flow' style={{}} onClick={() => this._changeEchart(1)} >
                        <Icon name="zhexiantu" />
                        <span style={{ whiteSpace: 'nowrap', fontSize: 14 }}>瞬时流量</span>
                    </div>
                    <div className='flex flex-direction-column flex-align-items-center' ref='test' style={this.props.testStatus != 'STEWING' ? {} : styles.disabled} onClick={() => this._changeEchart(2)}>
                        <Icon name="zhexiantu" />
                        <span style={{ whiteSpace: 'nowrap', fontSize: 14 }}>测试蒸发率</span>
                    </div>
                    <div className='flex flex-direction-column flex-align-items-center' ref='static' style={this.props.testStatus != 'STEWING' ? {} : styles.disabled} onClick={() => this._changeEchart(3)}>
                        <Icon name="zhexiantu" />
                        <span style={{ whiteSpace: 'nowrap', fontSize: 14 }}>静态蒸发率</span>
                    </div>
                    <div className='flex flex-direction-column flex-align-items-center' ref='topological' style={{}} onClick={() => this._changeEchart(4)}>
                        <Icon name="liucheng" />
                        <span style={{ whiteSpace: 'nowrap', fontSize: 14 }}>系统拓扑图</span>
                    </div>
                </div>
            </div>
        );
    }

    _onDatazoomMove(value) {
        this.setState({
            start: value.start,
            end: value.end
        });
    }

    _changeEchart(index) {
        this.mIndex = index;
        let yData = [];
        let xData = [];
        let seriesName = '';
        let data = this.state.allData;
        let unit = '';
        if (index == 1) {
            for (let index in data) {
                // yData.push(data[index].flowmeter);
                yData.push({ value: data[index].flowmeter, isTrue: data[index].reliable });
                xData.push(Formatter.date(new Date(data[index].createTime), 'YYYY-MM-DD HH:mm:ss'));
            }
            seriesName = '瞬时流量';
            unit = 'L/min';
            this.refs.flow.className += ' selected';
            this.refs.test.className = 'flex flex-direction-column flex-align-items-center';
            this.refs.static.className = 'flex flex-direction-column flex-align-items-center';
            this.refs.topological.className = 'flex flex-direction-column flex-align-items-center';
        } else if (index == 2) {
            for (let index in data) {
                // yData.push(data[index].a0);
                if (data[index].aCreateTime) {
                    yData.push({ value: data[index].a0, isTrue: data[index].reliable });
                    xData.push(Formatter.date(new Date(data[index].aCreateTime), 'YYYY-MM-DD HH:mm:ss'));
                }
            }
            seriesName = '测试蒸发率';
            unit = '%/d';
            this.refs.flow.className = 'flex flex-direction-column flex-align-items-center';
            this.refs.test.className += ' selected';
            this.refs.static.className = 'flex flex-direction-column flex-align-items-center';
            this.refs.topological.className = 'flex flex-direction-column flex-align-items-center';
        } else if (index == 3) {
            for (let index in data) {
                // yData.push(data[index].a20);
                if (data[index].aCreateTime) {
                    yData.push({ value: data[index].a20, isTrue: data[index].reliable });
                    xData.push(Formatter.date(new Date(data[index].aCreateTime), 'YYYY-MM-DD HH:mm:ss'));
                }
            }
            seriesName = '静态蒸发率';
            unit = '%/d';
            this.refs.flow.className = 'flex flex-direction-column flex-align-items-center';
            this.refs.test.className = 'flex flex-direction-column flex-align-items-center';
            this.refs.static.className += ' selected';
            this.refs.topological.className = 'flex flex-direction-column flex-align-items-center';
        } else {
            this.refs.flow.className = 'flex flex-direction-column flex-align-items-center';
            this.refs.test.className = 'flex flex-direction-column flex-align-items-center';
            this.refs.static.className = 'flex flex-direction-column flex-align-items-center';
            this.refs.topological.className += ' selected';
        }

        this.setState({
            yData: yData,
            xData: xData,
            seriesName: seriesName,
            unit: unit,
            isEchartShow: index != 4 ? true : false
        });
    }

    _initEchart(props) {
        if (!props.cylinderId)
            return;

        requestAjax({
            controller: 'cylinder',
            params: { cylinderId: props.cylinderId, recordGap: props.recordGap, mResult: props.mResult },
            url: 'echart',
            success: (result) => {
                if (result.success) {
                    let data = result.content.data;
                    let xData = [];
                    let yData = [];
                    for (let index in data) {
                        if (this.mIndex == 1) {
                            yData.push({ value: data[index].flowmeter, isTrue: data[index].reliable });
                            xData.push(Formatter.date(new Date(data[index].createTime), 'YYYY-MM-DD HH:mm:ss'));
                        } else if (this.mIndex == 2) {
                            if (data[index].aCreateTime) {
                                yData.push({ value: data[index].a0, isTrue: data[index].reliable });
                                xData.push(Formatter.date(new Date(data[index].aCreateTime), 'YYYY-MM-DD HH:mm:ss'));
                            }
                        } else if (this.mIndex == 3) {
                            if (data[index].aCreateTime) {
                                yData.push({ value: data[index].a20, isTrue: data[index].reliable });
                                xData.push(Formatter.date(new Date(data[index].aCreateTime), 'YYYY-MM-DD HH:mm:ss'));
                            }
                        }
                    }
                    this.setState({
                        allData: data,
                        xData: xData,
                        yData: yData
                    });
                }
            }
        }, false);
    }

    /**
    * 获取最新一次测试数据
    */
    _getTestingProcess(props) {
        requestAjax({
            params: { cylinderId: props.cylinderId, mResult: props.mResult },
            url: 'selectTestingProcessById',
            success: (result) => {
                if (result.success) {
                    this.setState({
                        testProcess: result.content.data
                    });
                }
            }
        }, false);
    }
}

const styles = {
    disabled: {
        color: '#A6A6A6',
        pointerEvents: 'none'
    }
};