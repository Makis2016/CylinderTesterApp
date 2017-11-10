export function setConfig(id, name, lastSyncTime) {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('lastSyncTime');
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('lastSyncTime', lastSyncTime);
}

export function getId() {
    return sessionStorage.getItem('id');
}

export function getName() {
    return sessionStorage.getItem('name');
}

export function getTime() {
    return sessionStorage.getItem('lastSyncTime');
}

/**
 * 缓存用户信息 
 * @export
 * @param {any} userinfo
 */
export function setUserInfo(userinfo) {
    sessionStorage.clear();
    setUserAuth(userinfo.authorityList);
    sessionStorage.setItem('userInfo', JSON.stringify({ 'id': userinfo.id, 'username': userinfo.username, 'rememberMe': userinfo.rememberMe, 'headImage': userinfo.pictureUrl, 'city': userinfo.city }));
}

/**
 * 获取用户ID和名字信息
 * @export
 * @returns
 */
export function getUserInfo() {
    let userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
        var userObj = JSON.parse(userInfo);
        return userObj;
    }
    return null;
}

/**
 * 设置用户权限 
 * 
 * @param {Array} auth
 */
export function setUserAuth(auth) {
    sessionStorage.setItem('auth', auth);
}

/**
 * 判断用户是否有权限
 * 
 * @param {string} auth 权限
 * @returns true/false
 */
export function hasAuth(auth) {
    let allAuth = sessionStorage.getItem('auth');

    if ((allAuth == 'undefined') || (allAuth == null) || (allAuth == '')) {
        return false;
    } else {
        allAuth = allAuth.split(',');
        for (let cAuth in allAuth) {
            if (allAuth[cAuth] == auth) {
                return true;
            }
        }
        return false;
    }
}

export function setMenu(menu) {
    sessionStorage.setItem('menu', JSON.stringify(menu));
}

export function getMenu() {
    let menu = sessionStorage.getItem('menu');
    if (menu) {
        var menuInfo = JSON.parse(menu);
        return menuInfo;
    }
    return null;
}

export function setCurrentMenu(menu) {
    sessionStorage.setItem('currentmenu', menu);
}

export function getCurrentMenu() {
    return sessionStorage.getItem('currentmenu');
}

export function getMenuInfo(path) {
    let allMenu = getMenu();
    if (allMenu != null) {
        for (let menu in allMenu) {
            if (allMenu[menu].path == path) {
                return allMenu[menu];
            }
        }
    }
}