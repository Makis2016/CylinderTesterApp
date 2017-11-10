import React, { Component } from 'react';
import assign from 'object-assign';
import XImage from '../xImage';

export default class IconCell extends Component {

    static propTypes = {
        url: React.PropTypes.string, // 图片路径
        name: React.PropTypes.string, // 名字
        style: React.PropTypes.object, // 样式
        styleView: React.PropTypes.object, // 图片控件样式
        imgStyle: React.PropTypes.object, // 图片样式
        onClick: React.PropTypes.func // 点击事件
    }

    static defaultProps = {
        url: '',
        name: '',
        style: {},
        styleView: { width: 30, height: 30 },
        imgStyle: { width: 30, height: 30 },
        onClick: null
    }

    render() {
        let style = assign(this.props.style, styles.iconCellItem);
        return (
            <div style={style} key={name} onClick={this.props.onClick}>
                <XImage
                    src={this.props.url}
                    style={this.props.imgStyle}
                    styleView={this.props.styleView}
                />
                <div>{this.props.name}</div>
            </div>
        );
    }
}

const styles = {
    iconCellItem: {
        display: 'inline - block',
        width: 70,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        borderRadius: 3,
        cursor: 'pointer'
    }
};