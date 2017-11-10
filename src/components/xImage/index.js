
import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

export default class XImage extends Component {
    static propTypes = {
        src: React.PropTypes.any, // 图片路径
        style: React.PropTypes.object, // 图片样式
        offset: React.PropTypes.array,// 图片偏移度显示
        debounce: React.PropTypes.number, // 图片加载时间
        backgroundImgSrc: React.PropTypes.string, // 背景图
        onClick: React.PropTypes.func, // 轮播图点击事件
        footIcon: React.PropTypes.string, // 脚标图片地址
        styleFootIcon: React.PropTypes.object, // 控件样式
        styleView: React.PropTypes.object, // 控件样式
        placeHolderImage: React.PropTypes.any, // 默认图片
        placeHolderBigImage: React.PropTypes.any // 默认图片大图
    }

    /**
     * 默认属性
     */
    static defaultProps = {
        src: require('./placeHolder.png'),// 图片路径
        style: { width: '100%', height: '100%' }, // 样式
        offset: [-20, 0],// 图片偏移度显示
        debounce: 100, //图片加载时间
        backgroundImgSrc: require('./placeHolder.png'), // 默认背景图
        onClick: null,
        footIcon: null,
        styleFootIcon: { width: 20, height: 30 },
        placeHolderImage: require('./placeHolder.png'),
        placeHolderBigImage: require('./placeHolderBig.png')
    };

    constructor(props) {
        super(props);
        this.mTimer = null;
        this.mPlaceHolder = this.props.placeHolderImage;
        this.mPlaceHolderBig = this.props.placeHolderBigImage;
        this.state = {
            timeout: false
        };
    }

    componentDidMount() {
        this.mTimer = setTimeout(() => {
            this.setState({ timeout: true });
            clearTimeout(this.mTimer);
            this.mTimer = null;
        }, 100);
    }

    componentWillUnmount() {
        this.mTimer && clearTimeout(this.mTimer);
    }

    render() {
        if (this.props.footIcon) {
            return (
                <div className='flex flex1'>
                    <div style={(this.props.styleView) ? this.props.styleView : this.props.style} className='flex flex-justify-content-center persent-width persent-height'>
                        <LazyLoad
                            offset={this.props.offset}
                            placeholder={this._renderBackgroundImg(this.mPlaceHolder)}
                            debounce={this.props.debounce}
                            overflow={true}>
                            <img
                                ref="loadImage"
                                style={this.props.style.width == 0 ? null : this.props.style}
                                src={this.props.src == null ? '' : this.props.src}
                                onError={() => this.refs.loadImage.src = this.mPlaceHolder}
                                onClick={() => this._onClick()}
                                className='persent-height persent-width'
                            />
                        </LazyLoad>
                    </div>
                </div>
            );
        }
        else {
            let { width, height } = this.props.style;
            let placeHolder;
            let offset = this.props.offset;
            if ((width >= 100) || (height >= 100)) {
                placeHolder = this.mPlaceHolderBig;
                offset = [0, document.body.clientHeight];
            }
            else
                placeHolder = this.mPlaceHolder;

            return (
                <div style={(this.props.styleView) ? this.props.styleView : this.props.style} className='flex flex-justify-content-center persent-height persent-width'>
                    <LazyLoad offset={offset} placeholder={this._renderBackgroundImg(placeHolder)} debounce={this.props.debounce} overflow={true}  >
                        <img
                            ref="loadImage"
                            style={this.props.style.width == 0 ? null : this.props.style}
                            src={this.props.src == null ? '' : this.props.src}
                            onError={() => this.refs.loadImage.src = placeHolder}
                            onClick={() => this._onClick()}
                            className='persent-height persent-width'
                        />
                    </LazyLoad>
                </div>
            );
        }
    }

    // 背景图
    _renderBackgroundImg(placeHolder) {
        return (
            <img src={placeHolder} style={this.props.style.width == 0 ? null : this.props.style} />
        );
    }

    // 图片点击事件
    _onClick() {
        if (this.props.onClick)
            this.props.onClick();
    }
}