import React, { Component } from 'react';
import Tree, { TreeNode } from 'uxcore-tree';
import Message from 'uxcore-message';
import { requestAjax } from '../../utils/requestUtils';

/**
 * 区域管理页面
 */
export default class AreaList extends Component {
    static propTypes = {
        onClick: React.PropTypes.func, // 点击函数
        defaultKey:React.PropTypes.number // 默认选中ID
    }

    constructor(props) {
        super(props);
        this.pid = [0]; // 父级ID
        this.state = {
            gData: [],
            areaOption: [],
            areaOptionData: [],
            addShow: false,
            editShow: false
        };
        this._getAreas(); // 获取区域列表
    }

    render() {
        const loop = data => data.map((item) => {
            if (item && item.name) {
                if (item.data && item.data.length) {
                    return <TreeNode key={item.id} title={item.name}>{loop(item.data)}</TreeNode>;
                }
                return <TreeNode key={item.id} title={item.name} />;
            } else {
                return <TreeNode key={''} title={''} />;
            }
        });

        return (
            <div style={{ overflow: 'hidden', width: 200, fontSize: 14 }}>
                <Tree
                    onSelect={(s, e) => this._handleSelect(s, e)}
                    multiple={false}
                    defaultExpandAll={true}
                    defaultSelectedKeys={this.props.defaultKey}
                    >
                    {loop(this.state.gData)}
                </Tree>
            </div>
        );
    }

    _handleSelect(s) {
        if (this.props.onClick != null && typeof this.props.onClick === 'function') {
            this.props.onClick(s);
        }
    }

    /**
     * 获取区域列表
     */
    _getAreas() {
        requestAjax({
            url: 'getAuthArea',
            method: 'post',
            success: (resp) => {
                if (resp.success) {
                    this.setState({
                        gData: resp.content.data
                    });
                }
                else {
                    Message['info'](resp.errorMsg);
                }
            },
            fail: (resp) => {
                Message['info'](resp.errorMsg);
            }
        });
    }

}