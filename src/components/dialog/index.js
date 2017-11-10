import React, { Component } from 'react';
import Dialog from 'uxcore-dialog';
import UxEmptyData from '../uxcore/uxEmptyData';

function noop() {
}

export default class ReportDialog extends Component {
    static propTypes = {
        renderContent: React.PropTypes.func, // dialog显示内容
        visible: React.PropTypes.bool, // 是否显示
        width: React.PropTypes.number, // 宽度
        onOk: React.PropTypes.func, // 确定的函数
        onCancel: React.PropTypes.func, // 取消的函数
        title: React.PropTypes.string // 标题
    }

    static defaultProps = {
        renderContent: noop,
        onOk: noop,
        onCancel: noop,
        title: '',
        visible: false,
        width: 520
    }

    constructor(props) {
        super(props);
        this.state = {
            showEmpty: false
        };
    }

    componentWillUpdate(nextProps, nextState) {
        const { visible } = this.props;
        if (!visible && nextProps.visible) {
            this.props = nextProps;
            this.status = nextState;
            this.fetchData();
        }
    }

    setShowEmpty(flag) {
        this.setState({ showEmpty: flag });
    }

    render() {
        let list = [];
        if (this.state.showEmpty) {
            list.push(<div key={'renderEmpty'}>{this.renderEmpty()}</div>);
        } else {
            list.push(<div key={'renderBody'}>{this.renderBody()}</div>);
        }

        return (
            <Dialog
                ref="uxDialog"
                width={this.props.width}
                visible={this.props.visible}
                title={this.props.title}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}>
                {list}
            </Dialog>
        );
    }

    renderBody() {

    }

    renderEmpty() {
        return (<div className='flex flex flex-justify-content-center'><UxEmptyData style={{ width: '200px' }} /></div>);
    }

    fetchData() {

    }

}