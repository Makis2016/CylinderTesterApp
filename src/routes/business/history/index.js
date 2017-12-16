import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Formatter from 'uxcore-formatter';
import { Flex, NavBar, ListView, PullToRefresh, DatePicker, List, InputItem, Button, Picker, WhiteSpace } from 'antd-mobile';
import { testingType, media } from '../../../utils/commonUtil';
import { setConfig } from '../../../common/UserStore';
import { requestAjax } from '../../../utils/requestUtils';

const NUM_ROWS = 20;
let pageIndex = 1;

/**
 * 历史记录列表
 * 
 */
export default class Index extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true,
            date: new Date(),
            areaData: {},
            pickerValue: '',
            bottomHeight: 40
        };

        this._getAreas();

        this.mAreaId = 0;
        this.deviceCode;
        this.createTime;
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
                url: 'selectHistory',
                params: { currentPage: page, pageSize: NUM_ROWS, areaId: this.mAreaId, deviceCode: this.deviceCode, createTime: Formatter.date(this.state.date, 'YYYY-MM-DD') },
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
                                bottomHeight: result.content.totalCount * 55 > this.state.height ? 40 : this.state.height - result.content.totalCount * 55 - 80
                            });
                        } else {
                            this.setState({
                                hasMore: true,
                                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                                isLoading: false,
                                refreshing: false,
                                bottomHeight: result.content.totalCount * 55 > this.state.height ? 40 : this.state.height - result.content.totalCount * 55 - 80
                            });
                        }
                    }
                },
                fail: (result) => {
                }
            }, false);
        } else {
            requestAjax({
                url: 'selectHistory',
                params: { currentPage: page, pageSize: 20, areaId: this.mAreaId, deviceCode: this.deviceCode, createTime: Formatter.date(this.state.date, 'YYYY-MM-DD') },
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
                                bottomHeight: result.content.totalCount * 55 > this.state.height ? 40 : this.state.height - result.content.totalCount * 55 - 80
                            });
                        } else {
                            this.setState({
                                hasMore: true,
                                dataSource: this.state.dataSource.cloneWithRows(this.arr),
                                isLoading: false,
                                refreshing: false,
                                bottomHeight: result.content.totalCount * 55 > this.state.height ? 40 : this.state.height - result.content.totalCount * 55 - 80
                            });
                        }
                    }
                },
                fail: (result) => {
                }
            }, false);
        }
    }

    render() {

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData) => {
            return (
                <div className='flex flex-direction-row flex-justify-content-space-around flex-align-items-center' style={styles.cellData} onClick={() => this._gtestEndInfo(rowData.id, rowData.deviceName, Formatter.date(new Date(rowData.lastSyncTime), 'YYYY-MM-DD HH:mm:ss'))}>
                    <div style={{ width: '25%' }}>{Formatter.date(new Date(rowData.testingBeginTime), 'YYYY-MM-DD HH:mm')}</div>
                    <div style={{ width: '25%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rowData.cylinderNumber}</div>
                    <div style={{ width: '25%' }}>{media(rowData.testingMedia)}</div>
                    <div style={{ width: '25%' }}>{testingType(rowData.testingType)}</div>
                </div>
            );
        };

        let district = this.state.areaData.children;
        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <NavBar
                    mode="dark"
                >焊接绝热气瓶静态蒸发率测试系统</NavBar>
                <div className='flex flex-direction-column height-hundred-percent' style={{}}>
                    <div className='flex flex-direction-column' style={{ height: 170, padding: 10 }}>
                        <Flex>
                            <Flex.Item>
                                <DatePicker
                                    mode="date"
                                    title="请选择日期"
                                    value={this.state.date}
                                    onChange={date => this.setState({ date })}
                                >
                                    <List.Item  >开始测试时间</List.Item>
                                </DatePicker>
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="lg" />
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
                        <Flex justify={'center'} alignContent={'between'}>
                            <div style={{ width: '75%' }}>
                                <InputItem ref='deviceCode' placeholder="输入设备唯一码" />
                            </div>
                            <Flex.Item>
                                <Button type="primary" size="large" inline={true} style={{ height: 44, lineHeight: '44px', color: '#ffffff' }} onClick={() => this._handleSearch()}>搜索</Button>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div className='flex flex-direction-row flex-justify-content-space-around flex-align-items-center' style={styles.title}>
                        <div style={{ width: '25%' }}>测试时间</div>
                        <div style={{ width: '25%' }}>气瓶编号</div>
                        <div style={{ width: '25%' }}>测试介质</div>
                        <div style={{ width: '25%' }}>测试方式</div>
                    </div>
                    <div className='flex flex-direction-column' style={{ overflow: 'auto', width: '100%', height: document.body.clientHeight - 49 }}>
                        <div>
                            <ListView
                                key={this.state.useBodyScroll ? '0' : '1'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}
                                renderFooter={() => (<div style={{ marginBottom: 40, textAlign: 'center', height: this.state.bottomHeight }}>
                                    {this.state.isLoading ? '正在加载...' : this.state.hasMore ? '上拉加载数据' : '没有更多数据'}
                                </div>)}
                                renderRow={row}
                                renderSeparator={separator}
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
     * 进入测试结束界面
     * 
     */
    _gtestEndInfo(id, name, time) {
        setConfig(id, name, time);
        this.context.router.push({
            pathname: '/testEndInfo'
        });
    }

    /**
     *  搜索事件
     * 
     */
    _handleSearch() {
        let citys = this.state.pickerValue;
        if (citys.length > 0) {
            this.mAreaId = citys[citys.length - 1];
        }
        this.deviceCode = this.refs.deviceCode.state.value;
        this.onRefresh();
    }

    /**
     *  清空搜索条件
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
     * 获取区域下拉框数据
     * 
     */
    _getAreas() {
        requestAjax({
            url: 'getAreaData',
            method: 'post',
            success: (resp) => {
                if (resp.success) {
                    // TODO
                    let str = JSON.stringify(resp.content.data).replace(/contents/g, 'children').replace(/text/g, 'label');
                    this.setState({
                        areaData: JSON.parse(str)
                    });
                }
            }
        });
    }

    _pre() {
        this.context.router.push({
            pathname: '/realTime'
        });
    }
}

const styles = {
    title: {
        backgroundColor: '#BBBBBB',
        height: 35,
        color: '#FFFFFF',
        fontSize: 'medium'
    },
    cellData: {
        width: '100%',
        height: 45
    }
};