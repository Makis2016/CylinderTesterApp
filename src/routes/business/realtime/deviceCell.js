import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
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
            <div className='flex flex-justify-content-center' style={{ width: '50%' }} >
                {
                    device.online ?
                        //<Link to='/deviceInfo' state={{ id: device.id, name: device.deviceName }}>
                        <div className='flex flex-direction-column flex-justify-content-center' style={styles.main} onClick={() => this._gdeviceInfo(device.id, device.deviceName)}>
                            <div className='warning' style={styles.icon}><img style={{ display: device.warningType == 'LEVEL4' ? 'inline' : 'none' }} src='./resources/images/warning1.png' /></div>
                            <div className='flex flex-justify-content-center'><img src='./resources/images/device.png' /></div>
                            <div className='flex flex-justify-content-center' style={{ marginTop: 10 }}>{device.deviceName}</div>
                            <div className={device.online ? 'online' : ''} style={styles.icon}><img style={{ width: 20, height: 20 }} src={onlineImage} /></div>
                        </div>
                        //</Link>
                        :
                        <div className='flex flex-direction-column flex-justify-content-center' style={styles.main} onClick={() => this._showOnlineDialog()}>
                            <div className='warning' style={styles.icon}></div>
                            <div className='flex flex-justify-content-center'><img src='./resources/images/device.png' /></div>
                            <div className='flex flex-justify-content-center' style={{ marginTop: 10 }}>{device.deviceName}</div>
                            <div className={device.online ? 'online' : ''} style={styles.icon}><img style={{ width: 20, height: 20 }} src={onlineImage} /></div>
                        </div>
                }

            </div>
        );
    }

    /**
     *  跳转设备测试页面
     * 
     */
    _gdeviceInfo(id, name) {
        setConfig(id, name, null);
        this.context.router.push({
            pathname: '/deviceInfo',
            query:{'index':0}
        });
    }

    /**
     * 离线弹出框提示
     * 
     */
    _showOnlineDialog() {
        Modal.alert('提示', '该设备处于离线状态', [{text:'确定'}], 'ios');
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
        margin: 10,
        width: '70%'
    },
    icon: {
        marginRight: 5,
        textAlign: 'right',
        height: 20
    }
};