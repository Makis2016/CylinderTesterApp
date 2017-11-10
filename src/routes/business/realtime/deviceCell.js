import React, { Component } from 'react';
import Dialog from 'uxcore-dialog';
import './deviceCell.less';
import { setConfig } from '../../../common/UserStore';

/**
 *  设备单个Cell
 * 
 */
export default class DeviceCell extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        device: {}
    };

    constructor(props) {
        super(props);
    }

    render() {

        let device = this.props.device; // 对象信息
        let onlineImage = device.online ? './resources/images/online.png' : './resources/images/offline.png'; // 在线图片显示

        return (
            <div className='flex' style={{flex:1}} >
                {
                    // device.online ?
                    //<Link to='/deviceInfo' state={{ id: device.id, name: device.deviceName }}>
                    <div className='flex flex-direction-column flex-justify-content-center' style={styles.main} onClick={() => this._gdeviceInfo(device.id, device.deviceName)}>
                        <div className='warning' style={styles.icon}><img style={{ display: device.warningType == 'LEVEL4' ? 'inline' : 'none' }} src='./resources/images/warning1.png' /></div>
                        <div className='flex flex-justify-content-center'><img src='./resources/images/device.png' /></div>
                        <div className='flex flex-justify-content-center' style={{ marginTop: 10 }}>{device.deviceName}</div>
                        <div className={device.online ? 'online' : ''} style={styles.icon}><img style={{ width: 20, height: 20 }} src={onlineImage} /></div>
                    </div>
                    //</Link>
                    // :
                    // <div className='flex flex-direction-column flex-justify-content-center' style={styles.main} onClick={() => this._showOnlineDialog()}>
                    //     <div className='warning' style={styles.icon}><img style={{ display: device.warningType == 'LEVEL4' ? 'inline' : 'none' }} src='./resources/images/warning1.png' /></div>
                    //     <div className='flex flex-justify-content-center'><img src='./resources/images/device.png' /></div>
                    //     <div className='flex flex-justify-content-center' style={{ marginTop: 10 }}>{device.deviceName}</div>
                    //     <div style={styles.icon}><img style={{ width: 20, height: 20 }} src={onlineImage} /></div>
                    // </div>
                }

            </div>
        );
    }

    _gdeviceInfo(id, name) {
        setConfig(id, name, null);
        this.context.router.push({
            pathname: '/deviceInfo'
        });
    }

    _showOnlineDialog() {
        Dialog.info({
            title: '提示',
            content: '该设备处于离线状态',
            onOk: function () { }
        });
    }
}

const styles = {
    main: {
        border: '1px solid #D6D6D6',
        // width: 100,
        // height: 120,
        borderRadius: '10%',
        // marginRight: 30,
        // marginBottom: 10,
        margin:20,
        width:'100%'
    },
    icon: {
        marginRight: 5,
        textAlign: 'right',
        height: 20
    }
};