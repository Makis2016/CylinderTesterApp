import React, { Component } from 'react';
import LoadMore from 'uxcore-load-more';
import Menu from 'uxcore-menu';
import { Link,browserHistory } from 'react-router';
import { SubMenu } from 'rc-menu';
import { Themes } from '../../common/Themes';
import { setMenu, getMenu } from '../../common/UserStore';
import { requestAjax } from '../../utils/requestUtils';
import { MobileUrlConfig } from '../../mobileUrlConfig';

/**
 * 显示左边菜单
 * 
 * @class TreeMenu
 * @extends {Component}
 */
export default class TreeMenu extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        transferPane: React.PropTypes.func,
    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);

        this.state = {
            rawData: [],
            loading: 'block',
            currentResource: '',
            currentPid: 0,
            clientHeight: document.body.clientHeight
        };

        /**
         * 大小改变事件处理函数
         */
        this.mResizeHandler = () => {
            this.setState({ clientHeight: document.body.clientHeight });
        };

    }

    componentWillMount() {
        this._getMenu();
    }

    componentDidMount() {
        window.addEventListener('resize', this.mResizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.mResizeHandler);
    }

    render() {
        let currentResource = this.state.currentResource;
        let currentPath = this.context.router.location.pathname || this.state.currentResource || '';
        if (currentPath == '/deviceInfo') {
            currentResource = '/realTime';
            currentPath = '/realTime';
        } else if (currentPath == '/testEndInfo'){
            currentResource = '/report';
            currentPath = '/report';
        }

        let currentPid = this.state.currentPid;
        if (currentPath == '/realTime') {
            currentPid = 57;
        }
        if (currentPid != 0) {
            currentPid = 'sub' + currentPid;
        }

        return (
            <div>
                <div style={{ display: this.state.loading }} >
                    <LoadMore status='loading' />
                </div>
                <div className='flex flex-direction-row flex-justify-content-center flex-align-items-center' style={styles.header}>系统菜单</div>
                <div style={{ overflowY: 'auto', height: this.state.clientHeight - 120,borderRight:'1px solid #bbbbbb' }} className="flex-shrink-0">
                    <Menu
                        style={styles.menu}
                        className="kuma-menu-none-border ie9-menu overflowy"
                        defaultOpenKeys={[currentPid]}
                        selectedKeys={[currentPath]}
                        defaultSelectedKeys={[currentResource]}
                        onSelect={(item, key, selectedKeys) => this._onSelect(item, key, selectedKeys)}
                        mode="inline">
                        {this._generateMenu(null)}
                    </Menu>
                </div>
            </div>
        );
    }

    _onSelect(item, key, selectedKeys) {
        if (item && item.item && item.item.props && item.item.props.datapid) {
            this._generateParentMenu(item.item.props.datapid);
        }
    }

    _generateParentMenu(pid) {
        this.setState({
            currentPid: pid
        });
    }

    /**
     * 获取全部菜单
     * 
     * @memberOf TreeMenu
     */
    _getMenu() {
        let menu = getMenu();
        if (menu != null) {
            this.setState({
                rawData: menu,
                loading: 'none',
                currentPid: this._generatePid(menu)
            });
        } else {
            requestAjax({
                url: 'resourceList',
                success: (result) => {
                    setMenu(result.content.data);
                    this.setState({
                        rawData: result.content.data,
                        currentPid: this._generatePid(result.content.data),
                        loading: 'none'
                    });
                }
            }, false);
        }
    }

    _generatePid(menu) {
        let currentPid = 0;
        if (this.context.router.location.pathname) {
            for (let key in menu) {
                let kMenu = menu[key];
                if (kMenu != null && (kMenu.path == this.context.router.location.pathname)) {
                    currentPid = kMenu.pid;
                    break;
                }
            }
        }

        return currentPid;
    }

    /**
     * 递归生成菜单列表
     * 
     * @param {menu} menu
     * @returns
     * 
     * @memberOf TreeMenu
     */
    _generateMenu(parent) {
        let menu = [], rawData = this.state.rawData;
        if ((rawData == null) || (rawData.length == 0))
            return;

        let length = rawData.length;


        for (let i = 0; i < length; i++) {
            if ((parent === null) && (rawData[i].pid == 0)) {
                if (rawData[i].path == null || rawData[i].path == '') {
                    menu.push(
                        <SubMenu key={'sub' + rawData[i].id} title={<span><span style={{ background: 'url("' + MobileUrlConfig.host + rawData[i].icon + '") 0 0 no-repeat', float: 'left', height: 20, width: 20, marginTop: 5, borderRadius: 5, backgroundSize: 'contain' }}></span><span style={styles.menuText}>{rawData[i].name}</span></span>} >
                            {this._generateMenu(rawData[i])}
                        </SubMenu>
                    );
                } else {
                    // 眼睛这个图片比例比较不同
                    let mTop = 5;
                    if (rawData[i].path == '/batteryList') mTop = 9;
                    menu.push(
                        <Menu.Item key={rawData[i].path} style={{ marginLeft: 25, color: Themes.default.mainLeftColor, backgroundColor: Themes.default.menuBackgrondColor, width: 110 }} title={rawData[i].name} className='menu-item first-menu' datapid={rawData[i].pid}>
                            <Link to={rawData[i].path} className="flex ">
                                <span style={{ marginRight: 5, background: 'url("' + MobileUrlConfig.host + rawData[i].icon + '") 0 0 no-repeat', float: 'left', height: 20, width: 20, marginTop: mTop, borderRadius: 5, backgroundSize: 'contain' }}></span>
                                {rawData[i].name}
                            </Link>
                        </Menu.Item>
                    );
                }
            }
            else {
                if ((parent !== null) && (parent.id == rawData[i].pid)) {
                    if (rawData[i].type == 0) {
                        if (rawData[i].path == null || rawData[i].path == '') {
                            menu.push(
                                <SubMenu key={'sub' + rawData[i].id} title={<span><i className="kuma-icon kuma-icon-email"></i><span style={styles.menuText}>{rawData[i].name}</span></span>} style={{ borderBottom: '1px solid blue' }}>
                                    {this._generateMenu(rawData[i])}
                                </SubMenu>
                            );
                        } else {
                            menu.push(
                                <Menu.Item key={rawData[i].path} style={styles.subMenuText} title={rawData[i].name} className='menu-item first-menu' datapid={rawData[i].pid}>
                                    <Link to={rawData[i].path}>
                                        {rawData[i].name}
                                    </Link>
                                </Menu.Item>
                            );
                        }

                    } else {
                        menu.push(
                            <Menu.Item key={rawData[i].path} style={styles.subMenuText} title={rawData[i].name} className='menu-item' datapid={rawData[i].pid}>
                                <Link to={rawData[i].path}>
                                    {rawData[i].name}
                                </Link>
                            </Menu.Item>
                        );
                    }
                }
            }
        }

        return menu;
    }



}

const styles = {
    menu: {
        width: Themes.default.mainLeftWidth,
        backgroundColor: Themes.default.menuBackgroundColor,
        zIndex: 0,
        overflowX: 'hidden',
        paddingTop: 20
    },
    submenu: {
        width: Themes.default.mainLeftWidth
    },
    menuText: {
        fontSize: 13,
        fontWeight: 'normal',
        color: Themes.default.mainLeftColor,
        marginLeft: 5
    },
    subMenuText: {
        color: Themes.default.mainLeftColor,
        backgroundColor: Themes.default.menuBackgrondColor,
        width: 80,
        marginTop: 16
    },
    test: {
        height: 40,
        width: 24,
        display: 'block',
        marginLeft: 10,
        marginRight: 8,
        float: 'left'
    },
    header: {
        height: 50,
        background: '#FF5C00',
        width: '100%',
        color: '#ffffff',
        fontSize: 14
    }
};