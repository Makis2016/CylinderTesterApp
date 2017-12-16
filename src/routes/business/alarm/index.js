import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Formatter from 'uxcore-formatter';
import { NavBar, ListView, PullToRefresh } from 'antd-mobile';
import { setConfig } from '../../../common/UserStore';
import { requestAjax } from '../../../utils/requestUtils';

const NUM_ROWS = 20;
let pageIndex = 1;
/**
 * 告警列表页面
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
            alarmCount: 0,
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true,
            bottomHeight:40
        };

        this.arr = [];
    }

    componentDidUpdate() {
        document.body.style.overflow = 'hidden';
    }

    componentDidMount() {
        const height = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this._fetchData();
        this.setState({
            height: height,
        });
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
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
                url: 'selectRealTimeWarning',
                params: { currentPage: page, pageSize: NUM_ROWS},
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
                                bottomHeight:result.content.totalCount * 55 > this.state.height ? 40 : this.state.height - result.content.totalCount * 55                                                                
                            });
                        } else {
                            this.setState({
                                hasMore: true,
                                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                                isLoading: false,
                                refreshing: false,
                                bottomHeight:result.content.totalCount * 55 > this.state.height ? 40 : this.state.height - result.content.totalCount * 55                                
                            });
                        }
                    }
                },
                fail: (result) => {
                }
            }, false);
        }
        else {
            requestAjax({
                url: 'selectRealTimeWarning',
                params: { currentPage: page, pageSize: NUM_ROWS},                
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
                                bottomHeight:result.content.totalCount * 55 > this.state.height ? 40 : this.state.height - result.content.totalCount * 55 - 80                                                               
                            });
                        } else {
                            this.setState({
                                hasMore: true,
                                dataSource: this.state.dataSource.cloneWithRows(this.arr),
                                isLoading: false,
                                refreshing: false,
                                bottomHeight:result.content.totalCount * 55 > this.state.height ? 40 : this.state.height - result.content.totalCount * 55
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
                <div className='flex flex-direction-row flex-justify-content-space-around flex-align-items-center' style={styles.cellData} onClick={() => this._gdeviceInfo(rowData.id, rowData.deviceName,rowData.cylinderId)}>
                    <div style={{ width: '33%' }}>{Formatter.date(new Date(rowData.createTime), 'YYYY-MM-DD HH:mm')}</div>
                    <div style={{ width: '33%' }}>{rowData.areaName}</div>
                    <div style={{ width: '34%' }}>{rowData.deviceName}</div>
                </div>
            );
        };

        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <NavBar
                    mode="dark"
                >焊接绝热气瓶静态蒸发率测试系统</NavBar>
                <div className='flex flex-direction-column height-hundred-percent'>
                    <div className='flex flex-direction-row flex-justify-content-space-around flex-align-items-center' style={styles.title}>
                        <div style={{ width: '33%' }}>告警时间</div>
                        <div style={{ width: '33%' }}>区域</div>
                        <div style={{ width: '34%' }}>设备名称</div>
                    </div>
                    <div className='flex flex-direction-column' style={{ overflow: 'auto', width: '100%', height: document.body.clientHeight - 49 }}>
                        <div>
                            <ListView
                                key={this.state.useBodyScroll ? '0' : '1'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}
                                renderFooter={() => (<div style={{ marginBottom: 40, textAlign: 'center',height:this.state.bottomHeight}}>
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
                                />}
                                // onEndReached={this.onEndReached}
                                // onEndReachedThreshold={10}
                                pageSize={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 进入设备测试界面
     * 
     */
    _gdeviceInfo(id, name,cylinderId) {
        setConfig(id, name, null);
        this.context.router.push({
            pathname: '/deviceInfo',
            query:{'cylinderId':cylinderId}
        });
    }

    _pre() {
        this.context.router.push({
            pathname: '/main'
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