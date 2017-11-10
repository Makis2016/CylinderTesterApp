import React from 'react';
import TreeSelect from 'uxcore-tree-select';
import { requestAjax } from '../../../utils/requestUtils';

/**
 * 区域选择树形下拉框
 * 
 * @export
 * @class AreaTree
 * @extends {React.Component}
 */
export default class AreaTree extends React.Component {
    static propTypes = {
        transferPane: React.PropTypes.func, // 回调的父级函数
        inputValue: React.PropTypes.string, // 默认的输入值
        value: React.PropTypes.string, // 默认的显示值
        textColor: React.PropTypes.string, // 文本颜色
        textWidth: React.PropTypes.number // 左边文本宽度
    }

    static defaultProps = {
        inputValue: null,
        value: '0',
        textColor: '#ffffff',
        textWidth: 70
    }

    componentWillReceiveProps(newprops) {
        this.state = {
            value: [newprops.value]
        };
        // 获取区域树信息
        this._fetchTreeAreaList();
    }

    constructor(props) {
        super(props);

        this.state = {
            value: [this.props.value],
            gData: [],
        };

        // 获取区域树信息
        this._fetchTreeAreaList();
    }

    render() {
        return (
            <div className="flex flex-direction-row ">
                <label className="kuma-label" style={{ width: this.props.textWidth, textAlign: 'center' }}><span className="label-content" style={{ fontSize: 15, color: this.props.textColor }}>区域：</span></label>
                <TreeSelect style={{ width: 240 }}
                    dropdownStyle={{ overflow: 'auto' }}
                    placeholder={<i>请下拉选择</i>}
                    searchPlaceholder="please search"
                    multiple={false}
                    inputValue={null}
                    value={this.state.value}
                    treeData={this.state.gData}
                    treeNodeFilterProp="title"
                    onChange={(value) => this._onChange(value)} />
            </div>
        );
    }

    /**
     * 值发生变化后回调父级函数 并修改state中value的值
     */
    _onChange(value) {
        if (typeof this.props.transferPane == 'function') {
            this.props.transferPane(value);
        }
        this.setState({ value: value });
    }

    /**
     * 获取区域树信息，成功设置state中gData信息，失败设置gData为空
     */
    _fetchTreeAreaList() {
        requestAjax({
            url: 'treeList',
            method: 'post',
            success: (resp) => {
                if (resp.success) {
                    if ((resp.content != null) && (resp.content.data != null)) {
                        this.setState({
                            gData: resp.content.data
                        });
                    } else {
                        this.setState({
                            gData: []
                        });
                    }
                }
                else {
                    this.setState({
                        gData: []
                    });
                }
            },
            fail: (resp) => {
                this.setState({
                    gData: []
                });
            }
        });
    }
}