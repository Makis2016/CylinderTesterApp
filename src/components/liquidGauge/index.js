import React from 'react';
import LiquidFillGauge from 'react-liquid-gauge';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';

/**
 * 水波纹图表
 * 
 * @export
 * @class LiquidGauge
 * @extends {React.Component}
 */
export default class LiquidGauge extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        radius: React.PropTypes.number,// 圆半径
        valueText: React.PropTypes.number, // 水位值
        startColor: React.PropTypes.string, // 开始颜色
        endColor: React.PropTypes.string, // 结束颜色
        outBackgroundColor: React.PropTypes.string, // 外圈背景颜色
        style: React.PropTypes.object // 样式

    };

    static defaultProps = {
        radius: 50,
        valueText: 0,
        startColor: '#0196d8',
        outBackgroundColor: '#d4d5d7',
        endColor: '#003573'
    }

    render() {
        const radius = this.props.radius;
        const interpolate = interpolateRgb(this.props.startColor, this.props.endColor);
        const fillColor = interpolate(this.props.valueText / 100);

        const circleColor = interpolateRgb('#ffffff')(1);

        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];

        return (
            <div className="flex flex-align-items-center flex-justify-content-center" style={{ borderRadius: '100%', width: (radius * 2) * 110 / 100, height: (radius * 2) * 110 / 100, backgroundColor: this.props.outBackgroundColor }}>
                <LiquidFillGauge
                    style={this.props.style}
                    width={radius * 2}
                    height={radius * 2}
                    value={this.props.valueText}
                    percent="%"
                    textSize={1.5}
                    textOffsetX={0}
                    textOffsetY={0}
                    innerRadius={0.95}
                    margin={0}
                    textRenderer={(props) => {
                        const value = Math.round(props.value);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const fullStyle = {
                            fontSize: 20
                        };
                        const percentStyle = {
                            fontSize: textPixels * 0.6
                        };

                        if (value == 100) {
                            return (
                                <tspan>
                                    <tspan className="value" style={fullStyle}>FULL</tspan>
                                </tspan>
                            );
                        } else {
                            return (
                                <tspan>
                                    <tspan className="value" style={valueStyle}>{value}</tspan>
                                    <tspan style={percentStyle}>{props.percent}</tspan>
                                </tspan>
                            );
                        }
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={1}
                    waveAmplitude={2}
                    gradient
                    gradientStops={gradientStops}
                    circleStyle={{
                        fill: circleColor
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                />
            </div>
        );
    }
}