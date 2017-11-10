import React, { Component } from 'react';
import UxTable from '../uxcore/uxTable';
import { getFetchUrl } from '../../utils/requestUtils';

/**
 * 表格模式
 * 
 * @export
 * @class TableGrid
 * @extends {Component}
 */
export default class TableGrid extends Component {
    static propTypes = {
        jsxcolumns: React.PropTypes.array, // 表头
        fetchUrl: React.PropTypes.string, // 链接
        showSearch: React.PropTypes.bool, // 是否显示搜索
        fetchParams: React.PropTypes.object, // 搜索条件
        actionBar: React.PropTypes.object, // 功能栏
        width: React.PropTypes.any, // 宽度
        height: React.PropTypes.any, // 高度
        renderModel: React.PropTypes.string, // 表格模式
        levels: React.PropTypes.num, // tree 模式默认展开的级数
        rowSelection: React.PropTypes.object, // 搜索触发条件
        addRowClassName: React.PropTypes.object, // 添加行内样式
        fetchDataOnMount: React.PropTypes.bool, // 是否在组件 Mount 时立刻获取一次数据
        onChange: React.PropTypes.func, // Cell值变更触发函数
        handleDoubleClickRow: React.PropTypes.func, // Row双击事件
        handleClickRow: React.PropTypes.func, // Row单击事件
        pageSize: React.PropTypes.num, // 分页条数
        showPager: React.PropTypes.bool, // 是否显示分页
        jsxdata: React.PropTypes.object, // 数据
        onFetchError: React.PropTypes.func,
        emptyText: React.PropTypes.string,
        className: React.PropTypes.any  // 样式名称
    };

    static defaultProps = {
        showSearch: false,
        jsxdata: null,
        fetchDataOnMount: true,
        fetchParams: {},
        rowSelection: null,
        actionBar: {},
        width: '100%',
        height: '100%',
        renderModel: '',
        levels: 0,
        pageSize: 20,
        showPager: true,
        handleDoubleClickRow: null,
        handleClickRow: null,
        className: 'kuma-uxtable-border-line flex fillParent flex-direction-column',
        onFetchError: () => { },
        onChange: () => { },
        emptyText: '搜索不到相关内容'
    }

    render() {
        let renderProps = {
            width: this.props.width,
            height: this.props.height,
            renderModel: this.props.renderModel,
            showSearch: this.props.showSearch,
            actionBar: this.props.actionBar,
            fetchParams: this.props.fetchParams,
            fetchUrl: this.props.fetchUrl == null ? null : getFetchUrl(this.props.fetchUrl),
            jsxcolumns: this.props.jsxcolumns,
            rowSelection: this.props.rowSelection,
            showPager: this.props.showPager,
            pagerSizeOptions: [5, 10, 20, 30, 40],
            levels: this.props.levels,
            addRowClassName: this.props.addRowClassName,
            className: this.props.className,
            processData: (data) => { return data; },
            fetchDataOnMount: this.props.fetchDataOnMount,
            pageSize: this.props.pageSize,
            onChange: this.props.onChange,
            handleDoubleClickRow: this.props.handleDoubleClickRow,
            jsxdata: this.props.jsxdata,
            onFetchError: this.props.onFetchError,
            handleClickRow: this.props.handleClickRow,
            emptyText: this.props.emptyText
        };
        
        return (<UxTable {...renderProps} ref="table" />);
    }
}