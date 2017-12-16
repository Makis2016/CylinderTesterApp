import React from 'react';
import { Tabs, Badge } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import DeviceList from './realtime';
import History from './history';
import Alarm from './alarm';
import { requestAjax } from '../../utils/requestUtils';
import { setIndex, getIndex } from '../../common/optStore';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
            alarmCount: 0,
            index: parseInt(getIndex()) || 0
        };
        
        this._getWarningCount();
        // this.mTimerList = setInterval(() => {
        //     this._getWarningCount();
        // }, 6000);
    }

    componentWillUnmount() {
        clearInterval(this.mTimerList);
    }

    render() {

        let tabs = [
            { title: '实时数据' },
            { title: '历史记录' },
            { title: <Badge text={this.state.alarmCount} >实时告警</Badge> },
        ];

        return (<div style={{ width: '100%', overflow: 'hidden' }} className='tabs'>
            <Tabs tabs={tabs}
                tabBarPosition="bottom"
                initialPage={0}
                tabBarBackgroundColor='#108EE9'
                tabBarActiveTextColor='#ffffff'
                tabBarInactiveTextColor='#CCD6FE'
                useOnPan={false}
                onChange={() => this._getWarningCount()}
                page={this.state.index}
                onTabClick={(data, index) => this._setIndex(index)}
            >
                <DeviceList />
                <History />
                <Alarm />
            </Tabs>
        </div>);
    }

    /**
     * 获取告警条数
     * 
     */
    _getWarningCount() {
        requestAjax({
            url: 'selectRealTimeWarning',
            success: (result) => {
                if (result.success) {
                    let count = result.content.data.length;
                    if (count > 0) {
                        this.setState({
                            alarmCount: count
                        });
                    }
                }
            }
        }, false);
    }

    /**
     * 设置显示page
     * 
     */
    _setIndex(index) {
        setIndex(index);
        this.setState({ index });
    }
}
