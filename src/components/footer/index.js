
import React, { Component } from 'react';
import { Link } from 'react-router';
import GridView from '../gridview';
import { MobileUrlConfig } from '../../mobileUrlConfig';

/**
 * 底部区域
 */
export default class Footer extends Component {
    static propTypes = {
        rawData: React.PropTypes.array, // 数据
        index: React.PropTypes.number,// 正在显示的页面序号
        params: React.PropTypes.object, // router的url参数
    };

    /**
     * 默认属性
     */
    static defaultProps = {
        rawData: [
            {
                'focus': require('./home_focus.png'),
                'normal': require('./home_normal.png'),
                'path': '/main'
            },
            {
                'focus': require('./total_focus.png'),
                'normal': require('./total_normal.png'),
                'path': '/goodsList/:actionId'
            },
            {
                'focus': require('./kill_focus.png'),
                'normal': require('./kill_normal.png'),
                'path': '/seckillView'
            },
            {
                'focus': require('./cart_focus.png'),
                'normal': require('./cart_normal.png'),
                'path': '/cartList/:actionId'
            },
            {
                'focus': require('./personal_focus.png'),
                'normal': require('./personal_normal.png'),
                'path': '/personalView/2/:actionId'
            }
        ],
        actionId:MobileUrlConfig.actionId
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: this.props.index
        };
    }


    render() {
        return (
            <div style={styles.footerContainer}>
                <GridView
                    rawData={this.props.rawData}
                    renderCell={(cellId, cellData) => this._renderCell(cellId, cellData)}
                    className='acticity-cell'
                    />
            </div>
        );
    }

    _renderCell(cellId, cellData) {
        return (
            <Link to={this._pathParamMatch(cellData.path)}>
                <div>
                    {
                        cellId + 1 == this.state.index ? (<img src={cellData.focus} style={{ width:49 }} />) : (<img src={cellData.normal} style={{ width:49 }}/>)
                    }
                </div>
            </Link>
        );
    }

    _pathParamMatch(path) {
        let params = path.split('/:');
        path = params.shift();
        if (params.length > 0) {
            for (let p of params) {
                path += '/' + (this.props[p] ? this.props[p] : this.props.params[p]);
            }
        }
        return path;
    }
}

const styles = {
    footerContainer: {
        position: 'fixed',
        bottom: 0,
        height: 49,
        backgroundColor: '#fbf5f5',
        width:'100%'
    }
};