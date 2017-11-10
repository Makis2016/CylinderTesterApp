/**
 * Created by xy on 15/4/16.
 */

let UxValidator = {};

const PATTERN = {
    EMAIL: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    URL: /^https?:\/\/(?!\-)(?:[a-zA-Z\d\-]{0,62}[a-zA-Z\d]\.){1,126}(?!\d+)[a-zA-Z\d]{1,63}/,
    HEX: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
    NUM: /^((-?\d+\.\d+)|(-?\d+)|(-?\.\d+))$/,
    IDCARD: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i,
    CNMOBILE: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
};

UxValidator.isNotEmpty = (value) => {
    // empty means empty string, empty array, empty object & null & undefined
    if (typeof value == "string") {
        return value.length !== 0
    }
    else if (typeof value == 'object') {
        if (value instanceof Array) {
            return value.length !== 0
        }
        else {
            var i = 0;
            for (var key in value) {
                i++;
            }
            return !!i;
        }
    }
    else if (typeof value == 'number') {
        return true;
    }
    else {
        return !!value;
    }
};

UxValidator.isNum = (value) => {
    return PATTERN.NUM.test(value);
};

UxValidator.isInt = (value) => {
    return UxValidator.isNum(value) && parseInt(value) == value;
};

UxValidator.isDecimal = (value) => {
    return UxValidator.isNum(value) && !UxValidator.isInt(value);
};

UxValidator.isArray = (value) => {
    return Array.isArray(value);
};

UxValidator.isRegExp = (value) => {
    if (value instanceof RegExp) {
        return true;
    }
    try {
        return !!new RegExp(value);
    } catch (e) {
        return false;
    }
};

UxValidator.isObject = (value) => {
    return typeof(value) === 'object' && !UxValidator.isArray(value);
};

UxValidator.isFunc = (value) => {
    return typeof(value) === 'function';
};

UxValidator.isEmail = (value) => {
    return typeof(value) === 'string' && PATTERN.EMAIL.test(value);
};

UxValidator.isEmptyOrEmail = (value) => {
    if (typeof (value) == 'undefined') {
        return true;
    }
    if (typeof value === 'string' && value.length === 0) {
        return true;
    }
    return typeof(value) === 'string' && PATTERN.EMAIL.test(value);
};

UxValidator.isUrl = (value) => {
    return typeof(value) === 'string' && PATTERN.URL.test(value);
};

UxValidator.isHex = (value) => {
    return typeof(value) === 'string' && PATTERN.HEX.test(value);
};

UxValidator.isIdCard = (value) => {
    return typeof(value) === 'string' && PATTERN.IDCARD.test(value);
};

UxValidator.isEmptyOrIdCard = (value) => {
    if (typeof (value) == 'undefined') {
        return true;
    }
    if (typeof value === 'string' && value.length === 0) {
        return true;
    }
    return typeof(value) === 'string' && PATTERN.IDCARD.test(value);
};

UxValidator.isCNMobile = (value) => {
    return typeof(value) === 'string' && PATTERN.CNMOBILE.test(value);
};

UxValidator.isEmptyOrCNMobile = (value) => {
    if (typeof (value) == 'undefined') {
        return true;
    }
    if (typeof value === 'string' && value.length === 0) {
        return true;
    }
    return typeof(value) === 'string' && PATTERN.CNMOBILE.test(value);
};

UxValidator.between = (value,min,max) => {
    // 不是数字返回错误
    if (!PATTERN.NUM.test(value))
        return false;
    
    // 不小于最小值 不大于最大值
    if (value < min || value > max) 
        return false;
    
    return true;
};


module.exports = UxValidator;
