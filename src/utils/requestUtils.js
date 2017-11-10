import 'whatwg-fetch';
import UxMessage from '../components/uxcore/uxMessage';
import { MobileUrlConfig } from '../mobileUrlConfig';

/**
 * 获取完整接口地址
 * 
 * @param {string} interfaceName 接口名称  
 * @param {string} method get/post/delete/put/...
 * @param {string} options 操作对象
 * @param {object} body 其他参数
 * @returns {string} 拼装地址字符串
 */
export function getInterfaceUrl(interfaceName, method, options, body) {
    let url = MobileUrlConfig.host + MobileUrlConfig[interfaceName];

    if (options) {
        if (typeof options !== 'string')
            options = String(options);

        if (options.indexOf('/') === 0)
            url = url + options;
        else
            url = url + '/' + options;
    }

    if (body && (method == 'get' || method == 'GET'))
        url = url + '?' + toString(body);

    return url;
}


/**
 * 拼装跳转链接
 * 
 * @export
 * @param {any} routerName
 * @param {any} options
 * @param {any} source
 * @returns
 */
export function getLocationHref(routerName, options, source) {

    let routerUrl = location.pathname + '#/' + routerName;
    if (source) {
        routerUrl += '/' + source;
    }
    routerUrl += '/' + MobileUrlConfig.actionId;
    if (options) {
        if (typeof options !== 'string')
            options = String(options);

        if (options.indexOf('/') === 0)
            routerUrl = routerUrl + options;
        else
            routerUrl = routerUrl + '/' + options;
    }

    return routerUrl;
}

/**
 * 获取router路径
 * @param {string} routerName 路由名称
 * @param {string} options 操作对象
 * @param {string} source 表示请求来源 1-app  2-wap
 * @returns {string} 拼装地址字符串
 */
/**
 * 
 * 
 * @export
 * @param {any} routerName
 * @param {any} options
 * @param {any} source
 * @returns
 */
export function getRouterUrl(routerName, options, source) {
    let routerUrl = '/' + routerName;
    if (source) {
        routerUrl += '/' + source;
    }
    routerUrl += '/' + MobileUrlConfig.actionId;
    if (options) {
        if (typeof options !== 'string')
            options = String(options);

        if (options.indexOf('/') === 0)
            routerUrl = routerUrl + options;
        else
            routerUrl = routerUrl + '/' + options;
    }

    return routerUrl;
}

/**
 * 把对象拼接成字符串
 * 
 * @param {any} obj 对象
 * @returns {string} 字符串
 */
function toString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        let val = obj[key];
        if (Array.isArray(val)) {
            if (val.length == 0) {
                return encodeURIComponent(key) + '=';
            }
            // return val.sort().map(function (val2) {
            //     return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            // }).join('&');
            return val.map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        } else if (typeof (val) == 'undefined') {
            val = '';
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}


/**
 * 下载Excel文件
 * 
 * @export
 * @param {any} url 
 */
export function requestExcel(url) {
    fetch(url).then(function (response) {
        return response.blob();
    }).then(function (myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        let a = document.createElement('a');
        //a.href = objectURL;
        a.href = url;
        a.click();
    }).catch(() => {
        window.open(url);
        //UxMessage2.clear();
    });

}

export function requestAjax(obj, message, messageClear) {
    if (message == null) message = true;
    if (messageClear == null) messageClear = true;
    if ((obj == null) || (obj.url == null)) return;
    let interfaceName = obj.url;
    let method = (obj.method == null ? 'post' : obj.method);
    let options = (obj.options == null ? null : obj.options);
    let params = (obj.params == null ? {} : obj.params);
    UxMessage.clear();
    if (message) UxMessage['loading']('', 20000);
    requestData(interfaceName, method, options, params, obj.success, obj.fail, messageClear);
}

export function requestData(interfaceName, method, options, body, successFunc, failFunc, messageClear) {
    request(interfaceName, method, options, body)
        .then((result) => {
            if (result.success) {
                if (messageClear) UxMessage.clear();
                if (successFunc) successFunc(result);
            }
            else {
                if (messageClear) UxMessage.clear();
                if (failFunc) failFunc(result);
            }
        }).catch((e) => {
            if (messageClear) UxMessage.clear();
            if (failFunc) failFunc();
        });
}

/**
 * 网络请求方法
 * 
 * @param {string} interfaceName 接口名称
 * @param {string} method get/post/delete/put/...
 * @param {string} options 操作对象
 * @param {object} body 其他参数
 */
export function request(interfaceName, method, options, body) {
    let opts = {
        credentials: 'include',
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
    };

    let url = getInterfaceUrl(interfaceName, method, options, body);
    if (body && (method != 'get') && (method != 'GET'))
        opts.body = toString(body);
    require('es6-promise').polyfill();
    return new Promise((resolve, reject) => {
        let isResponseOK;
        fetch(url, opts)
            .then((response) => {
                isResponseOK = response.ok;
                return response.json();
            })
            .then((responseData) => {
                if (isResponseOK) {
                    if (!responseData.success && responseData.errorMsg == 'unauthorized') {
                        location.href = MobileUrlConfig.loginHtml;
                    }
                    else {
                        resolve(responseData);
                    }
                }
                else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * 获取请求URL
 * 
 * @param {any} 请求URL
 * @returns
 */
export function getFetchUrl(path) {
    return MobileUrlConfig.host + path;
}