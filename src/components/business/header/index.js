import React, { Component } from 'react';
import Badge from 'uxcore-badge';
import Button from 'uxcore-button';
import Popover from 'uxcore-popover';
//import { CacheLink } from 'react-keeper';
import { Link } from 'react-router';
import { Themes } from '../../../common/Themes';
import { requestAjax } from '../../../utils/requestUtils';
import { MobileUrlConfig } from '../../../mobileUrlConfig';
/**
 * 主页头部
 * 
 * @export
 * @class Header
 * @extends {Component}
 */
export default class Header extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        username: React.PropTypes.string, // 当前用户名
        headImage: React.PropTypes.string // 当前用户头像
    }

    constructor(props) {
        super(props);
        this.state = {
            count: null
        };

        // this._alarmCount();
    }

    // componentDidMount() {
    //     setInterval(
    //         () => this._alarmCount(), 5000);
    // }

    render() {
        let overlay = this._overlay();
        return (
            <div className="flex fillParent cHeader" style={styles.header}>
                <div className="flex flex-direction-row fillParent flex-align-items-center" style={styles.header}>
                    <div className="flex flex-direction-row fillParent flex-align-items-center flex-justify-content-flex-start" style={{ color: '#000000', fontSize: 20 }}>
                        <img src="./resources/images/slogo.png" style={{ width: 60, height: 40, marginRight: 10 }} />
                        焊接绝热气瓶静态蒸发率自动检测平台
                    </div>
                    <div className='flex flex-align-items-center flex-shrink-0' style={{ width: 100 }}>
                        <Badge count={this.state.count}>
                            <Link to={'alarm'}>
                                <img style={{width:24,height:24}} src="./resources/images/gaojing.png" />
                            </Link>
                        </Badge>
                    </div>
                    <div style={styles.username} className='flex flex-align-items-center flex-shrink-0'>
                        <Popover overlay={overlay} placement="bottomRight" trigger='click'>
                            <div style={{ cursor: 'pointer', background: 'url("' + MobileUrlConfig.host + (this.props.headImage == '' ? './resources/images/head.png' : this.props.headImage) + '") 0 0 no-repeat', float: 'left', height: 30, width: 30, borderRadius: '100%', backgroundSize: 'cover', backgroundColor: '#ffffff', marginRight: 10 }}></div>
                        </Popover>
                    </div>

                </div>
            </div>
        );
    }

    _overlay() {
        return (
            <div className='flex flex-direction-column'>
                <div className='flex flex-direction-row flex-align-items-center'>
                    <div style={{ background: 'url("' + MobileUrlConfig.host + (this.props.headImage == '' ? './resources/images/head.png' : this.props.headImage) + '") 0 0 no-repeat', float: 'left', height: 30, width: 30, borderRadius: '100%', backgroundSize: 'cover', backgroundColor: '#ffffff', marginRight: 10 }}></div>
                    {this.props.username}
                </div>
                <div className='flex flex-justify-content-flex-end flex-align-items-flex-end'>
                    
                    <a onClick={() => this._signout()} href='javascript:void(0);'>
                        <Button type="primary">注销</Button>
                    </a>
                </div>
            </div>
        );
    }

    /**
     * 退出
     * 
     * @memberOf Header
     */
    _signout() {
        window.location = './login.html';
    }

    /**
     * 跳转告警列表页面
     */
    _alarmCount() {
        requestAjax({
            url: 'getAlarmCount',
            success: (result) => {
                this.setState({
                    count: result.data
                });
            },
            fail: (result) => {
            }
        }, false);
    }

}

const styles = {
    header: {
        height: Themes.default.headerHight,
        maxHeight: Themes.default.headerHight,
        backgroundColor: Themes.default.headerBackgrondColor,
        lineHeight: Themes.default.headerHight + 'px',
        backgroundSize: 'cover',
        color:'#ffffff'
    },
    username: {
        color: Themes.default.commonColor,
        width: 100
    }
};