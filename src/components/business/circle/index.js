import React, { Component } from 'react';

/**
 * 圆形插件
 * 
 * @export
 * @class Header
 * @extends {Component}
 */
export default class Circle extends Component {
    static propTypes = {
        width: React.PropTypes.number, // 背景宽度
        marginLeft: React.PropTypes.number, // 距离左边宽度
        innerWidth: React.PropTypes.number, // 内圆直径
        outerWidth: React.PropTypes.number, // 外圆直径
        bottomWidth: React.PropTypes.number, // 底部空白高度
        imagePath: React.PropTypes.string, // 图形内小图标
        innerText: React.PropTypes.string, // 图形内文字
        innerColor: React.PropTypes.string, // 内圆背景颜色
        outerColor: React.PropTypes.string, // 外圆背景颜色
        imageStyle: React.PropTypes.object, // 图片样式
        innerTextStyle: React.PropTypes.object, // 文字样式
        divBackgroundColor: React.PropTypes.string, // 背景颜色
        title: React.PropTypes.string // 标题
    }

    static defaultProps = {
        width: 200,
        innerWidth: 100,
        outerWidth: 110,
        bottomWidth: 30,
        imagePath: '',
        marginLeft: 0,
        innerText: '',
        innerColor: '#e0673d',
        outerColor: '#d4d5d7',
        divBackgroundColor: '#ffffff',
        imageStyle: { width: 60, height: 60 },
        innerTextStyle: { color: '#ffffff', fontSize: 19 },
        title: ''
    }

    render() {
        let outerWidth = this.props.width * 225 / 330;
        let innerWidth = outerWidth * 100 / 110;
        let imageWidth = innerWidth * 60 / 100;
        let cFontSize = innerWidth * 17 / 100;
        let tFontSize = innerWidth * 15 / 100;
        return (
            <div style={{ width: this.props.width, height: this.props.width, marginLeft: this.props.marginLeft, border: '1px solid #dddddd', borderRadius: 15, backgroundColor: this.props.divBackgroundColor }} className="flex flex-justify-content-center flex-align-items-center flex-direction-column common-shadow">
                <div style={{ fontSize: cFontSize, fontWeight: 'bold' }} className="flex flex-align-items-center">{this.props.title}</div>
                <div style={{ width: outerWidth, height: outerWidth, backgroundColor: this.props.outerColor }} className="flex flex-justify-content-center flex-align-items-center common-circle">
                    <div style={{ width: innerWidth, height: innerWidth, backgroundColor: this.props.innerColor, border: '2px solid #ffffff', position: 'relative' }} className="common-circle flex flex-direction-column flex-align-items-center">
                        <img src={this.props.imagePath} style={{ width: imageWidth, height: imageWidth, marginTop: imageWidth / 6 }} />
                        <div style={{ color: '#ffffff', fontSize: tFontSize }}>
                            {this.props.innerText}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}