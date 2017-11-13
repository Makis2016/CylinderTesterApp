
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Badge from 'uxcore-badge';

import './gridview.less';

export default class GridView extends Component {
    static propTypes = {
        rawData: React.PropTypes.array, // 原始数据
        columns: React.PropTypes.number, // 列数
        className: React.PropTypes.string, // 样式名称
        style: React.PropTypes.object, // 样式分格
        renderCell: React.PropTypes.func, // 单元格渲染函数
        alarmCount:React.PropTypes.number,// 告警条数
    }

    static defaultProps = {
        rawData: [],
        columns: 0,
        className: '',
        style: null,
        renderCell: null,
        alarmCount:0
    }

    constructor(props) {
        super(props);
        this.state = {
            mClientWidth: document.body.clientWidth,
            columns: 0
        };
        this.gridColumn = [
            {
                key: 1,
                value: 12
            },
            {
                key: 2,
                value: 6
            },
            {
                key: 3,
                value: 8
            },
            {
                key: 4,
                value: 3
            },
            {
                key: 5,
                value: 5
            },
            {
                key: 6,
                value: 2
            },
            {
                key: 7,
                value: 5
            },
            {
                key: 8,
                value: 5
            },
            {
                key: 9,
                value: 5
            },
            {
                key: 10,
                value: 5
            }
        ];
    }

    componentWillReceiveProps() {
        this.setState({ columns: this.props.columns });
    }

    render() {
        let list = [], rawData = this.props.rawData;
        let length = rawData.length;
        let xs = 6;
        let column = this.props.columns ? this.props.columns : length;

        for (let j = 0; j < this.gridColumn.length; j++) {
            if (this.gridColumn[j].key == column) {
                xs = this.gridColumn[j].value;
            }
        }

        for (let i = 0; i < length; i++) {
            if (i == 2) {
                list.push(
                    <Col key={'col_' + i} xs={xs} md={xs} className={this.props.className} >
                        <Badge count={this.props.alarmCount} className='Badge'>
                            {this.props.renderCell(i, rawData[i])}
                        </Badge>
                    </Col>
                );
            }else{
                list.push(
                    <Col key={'col_' + i} xs={xs} md={xs} className={this.props.className} >
                            {this.props.renderCell(i, rawData[i])}
                    </Col>
                );
            }
        }

        return (
            <Grid>
                <Row>
                    {list}
                </Row>
            </Grid>
        );
    }

    /**
     * 获取渲染行组件
     *
     * @param {int} cellId 单元索引
     * @param {any} cellData 单元数据
     * @returns {JSX.Element} 组件
     */
    _renderCell(cellId, cellData) {
        let cell = this.props.renderCell(cellId, cellData);
        return ({ cell });
    }
}