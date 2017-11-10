
import React, { Component } from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import GridView from '../gridview';

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
                'text': '实时数据',
                'path': '/realTime'
            },
            {
                'text': '历史记录',
                'path': '/report'
            },
            {
                'text': '实时告警',
                'path': '/alarm'
            }
        ]
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: this.props.index
        };
    }
    componentDidMount() {
        let footer = findDOMNode(this.refs['kdfooter']);
        footer.addEventListener('touchmove', function (event) {
            event.preventDefault();
        });
    }
    render() {
        return (
            <div style={styles.footerContainer} ref={'kdfooter'}>
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
                        cellId + 1 == this.state.index ?
                            (<div style={{ fontSize: 15, marginTop: 13, color: '#FFFFFF', whiteSpace: 'nowrap' }}>{cellData.text}</div>) :
                            (<div style={{ fontSize: 15, marginTop: 13, color: '#CCD6FE', whiteSpace: 'nowrap' }}>{cellData.text}</div>)
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
        backgroundColor: '#5677FC',
        width: '100%',
        textAlign: 'center'
    }
};