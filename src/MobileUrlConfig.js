/**
 * Created by yaowenkai on 2016/9/1.
 * 用于异步加载的url配置
 */
export const MobileUrlConfig = {
    // host: 'http://localhost:8080/',
    host: 'http://139.224.71.144:20080/cylinder/',
    indexHtml: 'index.html',
    loginHtml: 'index.html#/login', // 登录页面
    login: 'login', // 登录
    loginout: 'logout', // 登出
    uploadImageUrl: 'upload/imageUpload', // 图片上传服务地址
    getAreaData: 'area/casData', // 获取区域级联数据
    getAreasById: 'area/listById', // 获取全部区域
    getAuthArea: 'area/getAuthArea',// 获取权限区域
    selectDeviceList: 'realtime/selectDeviceList', // 设备实时数据列表
    loadDetail: 'realtime/selectCylinderByDeviceId',
    loadEndDetail: 'realtime/loadEndDetail',
    getCylinderInfoById: 'realtime/getCylinderInfoById',
    getDiscreetValue: 'realtime/getDiscreetValue',
    areaParentList: 'area/parentList', // 获取地区父级列表
    selectResultByResultId: 'realtime/selectResultByResultId', // 获取测试结果
    echart: 'realtime/echart', // 获取图表数据
    selectTestingProcessById: 'realtime/selectTestingProcessById',
    selectHistory: 'history/selectHistory',
    selectRealTimeWarning: 'realtime/selectRealTimeWarning',
    captcha: 'icloud/captcha',
    selectAllArea: 'area/selectAllArea',
    getStandardStaticRate:'realtime/getStandardStaticRate'
};