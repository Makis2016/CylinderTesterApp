import React, { Component } from 'react';
import Formatter from 'uxcore-formatter';
import { setConfig } from '../../../common/UserStore';
import TabHeader from '../../../components/tabHeader/tabHeader';
import CheckableListView from '../../../components/listview/checkableListView';
import Footer from '../../../components/footer/footer';
import { requestAjax } from '../../../utils/requestUtils';

export default class Index extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

    }

    render() {
        let preBtn = null;

        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <TabHeader leftIcon={preBtn} />
                <div className='flex flex-direction-column height-hundred-percent'>
                    <div className='flex flex-direction-row flex-justify-content-space-around flex-align-items-center' style={styles.title}>
                        <div style={{ width: '33%' }}>告警时间</div>
                        <div style={{ width: '33%' }}>区域</div>
                        <div style={{ width: '34%' }}>设备名称</div>
                    </div>
                    <div className='flex flex-direction-column' style={{ overflow: 'auto', width: '100%', height: document.body.clientHeight - 49 }}>
                        <div>
                            <CheckableListView
                                ref='listview'
                                columns={1}
                                firstLoad='true'
                                onFetch={(page, resolve, reject) => this._onFetch(page, resolve, reject)}
                                renderCell={(cellId, cellData) => this._renderCell(cellId, cellData)}
                                style={{ height: document.body.clientHeight }}
                            >
                            </CheckableListView>
                            <Footer
                                index={3}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _gdeviceInfo(id, name) {
        setConfig(id, name, null);
        this.context.router.push({
            pathname: '/deviceInfo'
        });
    }

    _onFetch(page, resolve) {
        requestAjax({
            url: 'selectRealTimeWarning',
            success: (result) => {
                if (result.success) {
                    resolve(result.content.data);
                }
            }
        }, false);
    }

    _renderCell(cellId, cellData) {
        return (
            <div className='flex flex-direction-row flex-justify-content-space-around flex-align-items-center' style={styles.cellData} onClick={()=>this._gdeviceInfo(cellData.id,cellData.deviceName)}>
                <div style={{width:'33%'}}>{Formatter.date(new Date(cellData.createTime), 'YYYY-MM-DD HH:mm')}</div>
                <div style={{width:'33%'}}>{cellData.areaName}</div>
                <div style={{width:'34%'}}>{cellData.deviceCode}</div>
            </div>
        );
    }
}

const styles = {
    title: {
        backgroundColor: '#BBBBBB',
        height: 35, 
        color: '#FFFFFF',
        fontSize: 'medium'
    },
    cellData:{
        width:'100%',
        height:45
    }
};