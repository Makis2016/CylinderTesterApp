import React from 'react';
import Icon from 'uxcore-icon';

/**
 * 智能气瓶静态蒸发率测试仪 头部
 * 
 * @export
 * @class Header
 * @extends {React.Component}
 */
export default class TabHeader extends React.Component {

    static propTypes = {
        name: React.PropTypes.string, // 名字
        hasModule: React.PropTypes.bool,
        rightIcon: React.PropTypes.any,
        leftIcon: React.PropTypes.any
    }

    static defaultProps = {
        name: '',
        hasModule: true,
        leftIcon: null
    }

    render() {

        let moduleText = '';
        if (this.props.hasModule) {
            moduleText = '焊接绝热气瓶静态蒸发率测试系统';
        }
        let leftIcon = '';
        if (this.props.leftIcon != null) {
            leftIcon = this.props.leftIcon;
        }

        return (
            <div className='flex flex-direction-row flex-align-items-center flex-justify-content-space-between flex-shrink-0' style={{ backgroundColor: '#F8F8F8', height: 65,borderBottom:'1px solid' }}>

                <div className='flex flex-align-items-center' style={this.props.leftIcon ==null ?{}:styles.hasLeftBtn}>
                    {leftIcon}
                </div>

                <div style={{ fontSize: 18, color: '#101010' }}>{this.props.name + moduleText}</div>

                <div>
                    {this.props.rightIcon}
                </div>
            </div>
        );
    }

    _back() {
        history.go(-1);
    }
}

const styles = {
    hasLeftBtn:{
        width: 30, 
        height: 30, 
        backgroundColor:'#ffffff', 
        borderRadius: '100%', 
        marginLeft: 20 
    }
};