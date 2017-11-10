
import { Constants } from '../common/constants';

/**
 *  分钟转换时间显示
 */
export function formatDuring(time){
    if (time == null || time == undefined || time == '') {
        return '00:00';
    }
    let minutes = parseInt(time % 60);
    let hours = parseInt(time / 60);
    let sHours = '';
    let sMinutes = '';

    if(hours == 0){
        sHours = '00';
    }else if(hours < 10){
        sHours = '0' + hours;
    }else{
        sHours = hours;
    }

    if(minutes == 0){
        sMinutes = '00';
    }else if(minutes < 10){
        sMinutes = '0' + minutes;
    }else{
        sMinutes = minutes;
    }

    return sHours + ':' + sMinutes;
}

/**
 *  对应状态名称
 */
export function deviceStatus(value){
    return Constants.eDeviceStatus[value];
}

/**
 * 对应介质名称
 */
export function media(value){
    return Constants.eMedia[value];
}

/**
 *  对应测试类型名称
 */
export function testingType(value){
    return Constants.eTestType[value];
}

export function validityStatus(value){
    return Constants.eValidityStatus[value];
}
