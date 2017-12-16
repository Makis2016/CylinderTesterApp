import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Button, InputItem, Picker, List, Flex, WhiteSpace, ListView, PullToRefresh } from 'antd-mobile';
import DeviceCell from './deviceCell';
import { requestAjax } from '../../../utils/requestUtils';

const NUM_ROWS = 20;
let pageIndex = 1;
/**
 * 实时数据
 * 
 */
export default class Index extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            areaData: {},
            pickerValue: '',
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true,
            bottomHeight: 40
        };

        this._getAreas();
        this.mAreaId;
        this.deviceName;

        this.arr = [];
    }

    componentDidUpdate() {
        document.body.style.overflow = 'hidden';
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this._fetchData();
        this.setState({
            height: hei,
        });
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        pageIndex = 1;
        this._fetchData();
    };

    onEndReached = (event) => {
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        this._fetchData(++pageIndex);
    };

    _fetchData(page = 1) {
        if (page != 1) {
            requestAjax({
                url: 'selectDeviceList',
                params: { area: this.mAreaId, currentPage: page, pageSize: NUM_ROWS, deviceName: this.deviceName },
                success: (result) => {
                    if (result.success) {
                        this.arr = result.content.data;
                        this.rData = [...this.rData, ...this.arr];
                        if ((page * NUM_ROWS) >= result.content.totalCount) {
                            this.setState({
                                hasMore: false,
                                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                                isLoading: false,
                                refreshing: false,
                                bottomHeight: Math.ceil(result.content.totalCount/2) * 150  > this.state.height ? 40 : this.state.height - Math.ceil(result.content.totalCount/2) * 150 - 80  
                            });
                        } else {
                            this.setState({
                                hasMore: true,
                                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                                isLoading: false,
                                refreshing: false,
                                bottomHeight: Math.ceil(result.content.totalCount/2) * 150  > this.state.height ? 40 : this.state.height - Math.ceil(result.content.totalCount/2) * 150  - 80                                 
                            });
                        }
                    }
                },
                fail: (result) => {
                }
            }, false);
        } else {
            requestAjax({
                url: 'selectDeviceList',
                params: { area: this.mAreaId, currentPage: page, pageSize: NUM_ROWS, deviceName: this.deviceName },
                success: (result) => {
                    if (result.success) {
                        this.arr = result.content.data;
                        this.rData = result.content.data;
                        if ((page * NUM_ROWS) >= result.content.totalCount) {
                            this.setState({
                                hasMore: false,
                                dataSource: this.state.dataSource.cloneWithRows(this.arr),
                                isLoading: false,
                                refreshing: false,
                                bottomHeight: Math.ceil(result.content.totalCount/2) * 150 > this.state.height ? 40 : this.state.height - Math.ceil(result.content.totalCount/2) * 150 - 80                               
                            });
                        } else {
                            this.setState({
                                hasMore: true,
                                dataSource: this.state.dataSource.cloneWithRows(this.arr),
                                isLoading: false,
                                refreshing: false,
                                bottomHeight: Math.ceil(result.content.totalCount/2) * 150  > this.state.height ? 40 : this.state.height - Math.ceil(result.content.totalCount/2) * 150 - 80                                  
                            });
                        }
                    }
                    console.log(this.state.bottomHeight);
                },
                fail: (result) => {
                }
            }, false);
        }
    }

    render() {

        const row = (rowData) => {
            return (
                <DeviceCell device={rowData} />
            );
        };

        let district = this.state.areaData.children;

        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <NavBar
                    mode="dark"
                >焊接绝热气瓶静态蒸发率测试系统</NavBar>
                <style>{'.area .am-list-extra{flex-basis: 50% !important;}'}</style>
                <div className='flex flex-direction-column height-hundred-percent'>
                    <div className='flex flex-direction-column flex-justify-content-center' style={{ height: 125, padding: 10 }}>
                        <Flex>
                            <Flex.Item>
                                <Picker
                                    visible={this.state.visible}
                                    data={district}
                                    value={this.state.pickerValue}
                                    onChange={(v) => { this._pickerChange(v); }}
                                    onOk={() => this.setState({ visible: false })}
                                    onDismiss={() => this.setState({ visible: false })}
                                >
                                    <List.Item className='area' onClick={() => this.setState({ visible: true })}>
                                        地区
                                    </List.Item>
                                </Picker>
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="lg" />
                        <Flex justify={'center'} align={'center'} alignContent={'between'}>
                            <div style={{ width: '75%' }}>
                                <InputItem ref='deviceName' placeholder="输入设备名称进行查询" />
                            </div>
                            <Flex.Item>
                                <Button type="primary" size="large" inline={true} style={{ height: 44, lineHeight: '44px', color: '#ffffff' }} onClick={() => this._handleSearch()}>搜索</Button>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div className='flex flex-direction-column' style={{ overflow: 'auto', width: '100%' }}>
                        <div>
                            <ListView
                                className='realTime'
                                key={this.state.useBodyScroll ? '0' : '1'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}
                                renderFooter={() => (<div style={{ marginBottom: 40, textAlign: 'center',height:this.state.bottomHeight }}>
                                    {this.state.isLoading ? '正在加载...' : this.state.hasMore ? '上拉加载数据' : '没有更多数据'}
                                </div>)}
                                renderRow={row}
                                useBodyScroll={this.state.useBodyScroll}
                                style={this.state.useBodyScroll ? {} : {
                                    height: this.state.height,
                                    border: '1px solid #ddd',
                                }}
                                pullToRefresh={<PullToRefresh
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                    distanceToRefresh={50}
                                />}
                                onEndReached={this.onEndReached}
                                onEndReachedThreshold={0}
                                pageSize={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _pickerChange(v) {
        let value = v;
        if (v.length > 1) {
            if (v[v.length - 1] == 0) {
                v.pop();
            }
        }
        this.setState({
            pickerValue: value
        });
    }

    /**
     * 获取区域下拉框组件数据
     * 
     */
    _getAreas() {
        requestAjax({
            url: 'getAreaData',
            method: 'post',
            success: (resp) => {
                if (resp.success) {
                    let str = JSON.stringify(resp.content.data).replace(/contents/g, 'children').replace(/text/g, 'label');
                    this.setState({
                        areaData: JSON.parse(str)
                    });
                }
            }
        });
    }

    /**
     * 清空搜索条件
     * 
     */
    _refresh() {
        let form = this.refs.searchForm;
        form.setValues({
            deviceName: '',
            city: []
        });
        this.mAreaId = 0;
        this.deviceName = '';
        this.refs.listview.reload();
    }

    /**
     * 查询事件
     * 
     */
    _handleSearch() {

        let citys = this.state.pickerValue;
        if (citys.length > 0) {
            this.mAreaId = citys[citys.length - 1];
        }
        this.deviceName = this.refs.deviceName.state.value;

        this.onRefresh();
    }
} 