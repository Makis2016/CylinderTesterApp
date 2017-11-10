/**
 * 业务常量配置
 */
export const Constants = {
    /**
     * 默认
     */
    default: {
        // 上升沿斜率最小
        upwardslopeMin: 1,
        // 上升沿斜率最大
        upwardslopeMax: 1000,
        // 下降沿斜率最小
        downslopeMin: 1,
        // 下降沿斜率最大
        downslopeMax: 1000,
        // 脉冲电流给定值最小
        pulsecurrentMin: -100,
        // 脉冲电流给定值最大
        pulsecurrentMax: 100,
        // 转换电压最小
        transformvolMin: 40,
        // 转换电压最大
        transformvolMax: 350,

        // 工艺电流最小
        currentMin: 0,
        // 工艺电流最大
        currentMax: 100,
        // 工艺电压最小
        volMin: 40,
        // 工艺电压最大
        volMax: 350,
        // 工艺功率最小
        powerMin: 0,
        // 工艺功率最大
        powerMax: 30,
        // 工艺转换电压最小
        ctransformvolMin: 40,
        // 工艺转换电压最大
        ctransformvolMax: 350,
        // 工艺转换电流最小
        ctransformCurrentMin: -100,
        // 工艺转换电流最大
        ctransformCurrentMax: 100,


        require: '该输入项为必输项'
    }
};

export const BThemes = {
    default: {
        // 按钮选中背景颜色
        buttonClickColor:'',
        // 统一背景颜色
        commonBackGroundColor:'',
    }
};

export function getBetweenMsg(begin, end) {
    return '请输入' + begin + '到' + end + '之间的值';
}


