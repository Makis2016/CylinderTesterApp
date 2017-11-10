export function DateFormat(date, format) {
    if (!IsDate(date))
        return null;

    var o = {
        // 月份
        'M+': date.getMonth() + 1,

        // 日
        'd+': date.getDate(),

        // 小时
        'h+': date.getHours(),

        // 分
        'm+': date.getMinutes(),

        // 秒
        's+': date.getSeconds(),

        // 季度
        'q+': Math.floor((date.getMonth() + 3) / 3),

        // 毫秒
        'S': date.getMilliseconds()
    };

    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

    for (var k in o)
        if (new RegExp('(' + k + ')').test(format))
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));

    return format;
}

/**
* 判断是否为Date对象
* 
* @param {Object}
*        date Date对象
*/
function IsDate(date) {

    if (IsObject(date) && (date instanceof Date))
        return true;

    return false;
}

/**
 * 判断是否为对象
 * 
 * @param {String/Object}
 *        obj 对象或对象名
 */
function IsObject(obj) {

    if (typeof obj === 'object')
        return true;

    try {
        if (typeof (eval(obj)) === 'object')
            return true;
    }
    catch (e) {
    }

    return false;
}