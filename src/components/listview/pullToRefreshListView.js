import '../layout.less';
import './pullToRefreshListView.less';

import Tloader from './touch-loader';
import React, { Component } from 'react';
import { StickyContainer } from 'react-sticky';
import { findDOMNode } from 'react-dom';
import { HorizontalLinearLayout } from '../layout';
import { Themes } from '../../common/Themes';
import Loading from '../loading/index';
import { Toast } from '../toast/index';

/**
 * 下拉刷新列表
 */
export default class PullToRefreshListView extends Component {
    static propTypes = {
        style: React.PropTypes.style, // 列表布局
        url: React.PropTypes.string, // URL
        loadMore: React.PropTypes.bool, // 是否加载更多
        firstLoad: React.PropTypes.bool, // 是否首次加载
        pullToRefresh: React.PropTypes.bool, // 是否下拉刷新
        leftMargin: React.PropTypes.number, // 左边距
        rightMargin: React.PropTypes.number, // 右边距
        spacePadding: React.PropTypes.number, // 间距
        columns: React.PropTypes.number, // 列数
        className: React.PropTypes.string, // 控件风格
        rawData: React.PropTypes.array, // 原始数据
        renderCell: React.PropTypes.func.isRequired, // 单元格渲染函数
        renderHeader: React.PropTypes.func, // 头部渲染函数
        renderStickyHeader: React.PropTypes.func, // 黏性头部渲染函数
        renderFooter: React.PropTypes.func, // 尾部渲染函数
        renderEmpty: React.PropTypes.func, // 空数据渲染函数
        onFetch: React.PropTypes.func, // 获取数据函数
        onDataChanged: React.PropTypes.func, // 列表刷新回调函数
        isCheckable: React.PropTypes.func, // 是否此Item可以被选中
        hasCheck: React.PropTypes.bool, // 是否有单选框
        rawLength: React.PropTypes.number // 每页显示多少条数据 查询数量小于等于这个时，显示已加载完成
    }

    static defaultProps = {
        url: null,
        loadMore: true,
        firstLoad: false,
        pullToRefresh: true,
        leftMargin: 0,
        rightMargin: 0,
        spacePadding: 0,
        columns: 1,
        className: 'listview',
        rawData: [],
        renderHeader: null,
        renderStickyHeader: null,
        renderFooter: null,
        renderEmpty: null,
        onFetch: null,
        onDataChanged: null,
        isCheckable: null,
        hasCheck: false,
        rawLength: 10,
        style: { height: document.body.clientHeight - parseInt(Themes.default.footerheight) }
    }

    /**
     * Creates an instance of PullToRefreshListView.
     *
     * @param {any} props 参数
     */
    constructor(props) {
        super(props);

        this.mCurrentPage = 1;
        this.mUrl = this.props.url;
        this.firstLoad = true;
        this.duummy = this._onScroll.bind(this);

        this.state = {
            initializing: this.props.firstLoad ? 1 : 0,
            loadMore: this.props.loadMore,
            rawData: this.props.rawData,
            onFetch: this.props.onFetch,
            mUrl: this.props.url,
            loadState: 1
        };
    }

    componentDidMount() {
        if (this.props.firstLoad) {
            this.refs['listview'].loadMore();
            this.refs['loading'].open();
        }

        let node = findDOMNode(this.refs['listview']);
        node.addEventListener('scroll', this.duummy, false);
    }

    componentWillUnmount() {
        let node = findDOMNode(this.refs['listview']);
        node.removeEventListener('scroll', this.duummy, false);
    }

    /**
     * 获取原始数据
     *
     * @returns {Array} 原始数据
     */
    getRawData() {
        return this.state.rawData;
    }

    /**
     * 设置原始数据
     *
     * @param {Array} rawData 原始数据
     */
    setRawData(rawData) {
        if ( !(rawData instanceof Array) ) {
            rawData = this.state.rawData.slice(0);
        }

        this.setState({
            rawData: rawData
        });
        if (this.props.onDataChanged !== null)
            this.props.onDataChanged();
    }

    /**
     * 重新加载数据
     */
    reload() {
        this.firstLoad = true;
        this._onRefresh();
        this.refs['loading'].open();
    }

    /**
     * 添加数据
     *
     * @param {array} data 数据
     */
    appendData(rawData) {
        this.setState({
            rawData: this.state.rawData.concat(rawData)
        });
        if (this.props.onDataChanged !== null)
            this.props.onDataChanged();
    }

    /**
     * 删除项目
     *
     * @param {int} id 项目索引
     */
    deleteItem(id) {
        let rawData = this.state.rawData.slice(0);
        rawData.splice(id, 1);
        this.setRawData(rawData);

        if (this.props.onDataChanged !== null)
            this.props.onDataChanged();
    }

    /**
     * 获取渲染组件
     *
     * @returns {JSX.Element} 组件
     */
    render() {
        if (this.props.pullToRefresh) {
            let list = [], rawData = this.state.rawData;
            let length = rawData.length;

            if (this.props.pullToRefresh)
                list.push(<div key={'freshHeader'} ref={'freshHeader'}></div>);

            if (this.props.renderHeader)
                list.push(<div key={'header'}>{this.props.renderHeader(rawData)}</div>);

            if (this.props.renderStickyHeader) {
                list.push(<div key={'stickyHeader'} ref={'stickyHeader'}></div>);
                list.push(<div key={'sticky'} ref={'sticky'} style={{position:'fixed',top:0}}>{this.props.renderStickyHeader()}</div>);
            }

            for (let row = 0, i = 0; i < length; ++row) {
                let cells = [];
                for (let j = 0; (j < this.props.columns) && (i < length); ++j, ++i) {
                    cells.push(this._renderCell(i, rawData[i]));
                }

                if (i == length && length % this.props.columns > 0) {
                    for (let k = 0; k < (this.props.columns - length % this.props.columns); k++) {
                        cells.push(<div key={'cells_' + k} className='flex1'></div>);
                    }
                }

                list.push(
                    <HorizontalLinearLayout key={'row_' + row} >
                        {cells}
                    </HorizontalLinearLayout>
                );
            }

            // 没有数据时 不显示 ‘没有更多’ 字样
            if (length == 0) {
                if (!this.firstLoad) {
                    if (this.props.renderEmpty)
                        list.push(<div key={'emptydiv'} >{this.props.renderEmpty()}</div>);
                    else {
                        list.push(
                            <div key={'emptydiv'} className='emptydiv flex flex-direction-column flex-justify-content-center flex-align-items-center'>
                                <img style={{ width: 90, height: 110 }} src={require('./empty_bg.png')} />
                                <div style={{ marginTop: 10, color: '#e5e5e5', textAlign: 'center' }}>暂时没有数据</div>
                            </div>);
                    }
                }

                if (this.props.renderFooter)
                    list.push(<div key={'footer'}>{this.props.renderFooter()}</div>);

                return (
                    <div style={{ position: 'relative' }}>
                        <Tloader
                            ref='listview'
                            initializing={this.state.initializing}
                            onRefresh={(resolve) => this._onRefresh(resolve)}
                            showFresh={!this.firstLoad}
                            onLoadMore={(resolve) => this._onLoadMore(resolve)}
                            className={this.props.className}
                            distanceEndToRefresh={this.props.style.height}
                            >
                            <StickyContainer style={this.props.style}>
                                {list}
                            </StickyContainer>
                        </Tloader>
                        <Loading ref='loading' />
                    </div>
                );
            }
            else {
                if (this.props.loadMore) {
                    let endText;
                    if (this.state.loadState == 1)
                        endText = '加载更多';
                    else if (this.state.loadState == 2)
                        endText = '正在加载...';
                    else if (this.state.loadState == 3)
                        endText = '数据加载完毕';
                    list.push(<div ref='sticky_end' key={'endText'} style={{ textAlign: 'center', padding: '12px', color: '#aaa' }}>{endText}</div>);
                }

                if (this.props.renderFooter)
                    list.push(<div key={'footer'}>{this.props.renderFooter()}</div>);

                return (
                    <div style={{ position: 'relative' }}>
                        <Tloader
                            ref='listview'
                            initializing={this.state.initializing}
                            onRefresh={(resolve) => this._onRefresh(resolve)}
                            showFresh={!this.firstLoad}
                            onLoadMore={(resolve) => this._onLoadMore(resolve)}
                            className={this.props.className}
                            distanceEndToRefresh={this.props.style.height}
                            >
                            <StickyContainer style={this.props.style}>
                                {list}
                            </StickyContainer>
                        </Tloader>
                        <Loading ref='loading' />
                    </div>
                );
            }
        }
        else {
            let list = [], rawData = this.state.rawData;
            let length = rawData.length;

            if (this.props.renderHeader)
                list.push(<div key={'header'}>{this.props.renderHeader()}</div>);

            if (this.props.renderStickyHeader) {
                list.push(<div key={'stickyHeader'} ref={'stickyHeader'}></div>);
                list.push(<div key={'sticky'} ref={'sticky'}>{this.props.renderStickyHeader()}</div>);
            }

            for (let i = 0; i < length; ++i) {
                list.push(this._renderCell(i, rawData[i]));
            }

            if (this.props.renderFooter)
                list.push(<div key={'footer'}>{this.props.renderFooter()}</div>);

            return (
                <div style={{ position: 'relative' }}>
                    <Tloader
                        ref='listview'
                        className={this.props.className}>
                        <StickyContainer style={this.props.style}>
                            {list}
                        </StickyContainer>
                    </Tloader>
                    <Loading ref='loading' />
                </div>
            );
        }
    }

    /**
     * 获取渲染行组件
     *
     * @param {int} cellId 单元索引
     * @param {any} cellData 单元数据
     * @returns {JSX.Element} 组件
     */
    _renderCell(cellId, cellData) {
        let cell = this._renderCellInner(cellId, cellData);
        return (
            <div key={'cell_' + cellId} className='flex1'>{cell}</div>
        );
    }

    /**
     * 获取渲染行组件
     *
     * @param {int} cellId 单元索引
     * @param {any} cellData 单元数据
     * @returns {JSX.Element} 组件
     */
    _renderCellInner(cellId, cellData) {
        let cell = this.props.renderCell(cellId, cellData);
        return ({ cell });
    }

    _onRefresh(resolve) {
        if (this.state.onFetch !== null) {
            let newResolve = (rawData) => {
                if (rawData && rawData.length < this.props.rawLength)
                    this.setState({ loadState: 3 });
                else
                    this.setState({ loadState: 1 });
                this.firstLoad = false;
                this.setRawData(rawData);
                this._onLoadMoreComplete(resolve);
                this.mCurrentPage++;
                this.refs['loading'].close();
            };

            let reject = () => {
                Toast('加载数据失败');
                this.refs['loading'].close();
            };

            this.mCurrentPage = 1;

            return this.state.onFetch(this.mCurrentPage, newResolve, reject);
        }

        setTimeout(() => {
            if (resolve)
                resolve();
        }, 1000);
    }

    /**
     *  加载数据
     *
     */
    _onLoadMore(resolve) {
        if (this.state.onFetch !== null) {
            let newResolve = (rawData) => {
                if (rawData && rawData.length < this.props.rawLength)
                    this.setState({ loadState: 3 });
                else
                    this.setState({ loadState: 1 });
                this.firstLoad = false;
                this.appendData(rawData);
                this._onLoadMoreComplete(resolve);
                this.mCurrentPage++;
                this.refs['loading'].close();
            };

            let reject = () => {
                Toast('加载数据失败');
                this.refs['loading'].close();
            };

            return this.state.onFetch(this.mCurrentPage, newResolve, reject);
        }

        setTimeout(() => {
            this._onLoadMoreComplete(resolve);
        }, 1000);
    }

    _onLoadMoreComplete(resolve) {
        if (resolve)
            resolve();
        
        this.setState({
            initializing: 2
        });
    }

    _onScroll(event) {
        if (typeof this.refs['sticky_end'] !== 'undefined') {
            let list = findDOMNode(this.refs['listview']);
            let endText = this.refs['sticky_end'];
            if (this.state.loadState == 1 && (endText.getBoundingClientRect().bottom < (list.getBoundingClientRect().bottom + 8))) {
                this.setState({ loadState: 2 });
                this.refs['listview'].loadMore();
            } else if (this.state.loadState == 3 && (endText.getBoundingClientRect().bottom < (list.getBoundingClientRect().bottom + 8)) ){
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
    }
}