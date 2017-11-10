import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

/**
 * 图表控件 
 * 
 * @export
 * @class Chart
 * @extends {Component}
 */
export default class Chart extends Component {
    static propTypes = {
        titleText: React.PropTypes.string, // 主标题文本
        legend: React.PropTypes.array,// 图例组件
        xData: React.PropTypes.array, // X轴显示内容
        seriesData: React.PropTypes.array, // 数据
        style: React.PropTypes.style // 图表样式
    };

    static defaultProps = {
        style: { height: '350px', width: '100%' }
    }

    render() {
        return (
            <ReactEcharts
                option={this._getOption()}
                style={this.props.style}
                className='react_for_echarts' />
        );
    }

    _getOption() {
        const option = {
            title: {
                text: this.props.titleText
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.props.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.props.xData
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: this.props.seriesData
        };

        return option;
    }
}