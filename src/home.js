require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
import React from 'react';
import { request } from './utils/requestUtils';
import Header from './components/business/header';
import Menu from './components/menu';
import { getUserInfo } from './common/UserStore';


export default class Index extends React.Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = {
            alarmCount: 0 // 告警条数
        };

        //this._fetchAlarmCount();
    }

    render() {
        let userInfo = getUserInfo();
        let username = userInfo == null ? '' : userInfo.username;
        let headImage = userInfo == null ? '' : userInfo.headImage;
        if (headImage == null || headImage == 'undefined' || headImage == undefined) headImage = '';
        return (
            <div className='flex fillParent flex-direction-column flex-justify-content-space-between' style={{ height: '100%', backgroudColor: '#f0f0f2' }}>
                <div  className='flex fillParent'>
                    {this.props.children}
                </div>
            </div>
        );
    }

    /**
     * 获取告警条数
     */
    _fetchAlarmCount() {
        request('getAlarmCount', 'get', null, null).
            then((result) => {
                if (result.success) {
                    this.setState({
                        alarmCount: result.content.data
                    });
                }
            });
    }
}