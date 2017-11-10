
import React from 'react';
import CheckBox from 'rc-checkbox';
import CacheableListView from './cacheableListView';

export default class CheckableListView extends CacheableListView {
    static propTypes = {
        renderCell: React.PropTypes.func,
        onItemChecked: React.PropTypes.func
    };

    /**
     * Creates an instance of CheckableListView.
     *
     * @param {any} props 参数
     */
    constructor(props) {
        super(props);

        this.state.renderCell = (cellId, cellData) => this._renderCell(cellId, cellData);
    }

    /**
     * 选择指定项目
     *
     * @param {int} id 项目索引
     */
    selectItem(id) {
        let rawData = this.getRawData();
        if (id >= rawData.length)
            return this;

        if (typeof rawData[id]['checked'] === 'undefined')
            rawData[id]['checked'] = false;

        rawData[id] = Object.assign(rawData[id], { checked: !rawData[id].checked });
        this.setRawData(rawData);

        return this;
    }

    /**
     * 选择全部项目
     */
    selectAll() {
        let rawData = this.getRawData();
        for (let item of rawData) {
            item['checked'] = true;
        }
        this.setRawData(rawData);

        return this;
    }

    /**
     * 取消选择全部项目
     */
    unselectAll() {
        let rawData = this.getRawData();
        for (let item of rawData) {
            item['checked'] = false;
        }
        this.setRawData(rawData);

        return this;
    }

    /**
     * 列表是否全选
     *
     * @returns {boolean} 是否全选
     */
    isAllSelected() {
        let rawData = this.getRawData();
        for (let i = 0; i < rawData.length; i++) {
            if (!this.props.isCheckable || !this.props.isCheckable(rawData[i], i))
                continue;
            if ((typeof rawData[i]['checked'] === 'undefined') || (!rawData[i].checked))
                return false;
        }
        return rawData.length > 0;
    }

    /**
     * 获取所有项目
     */
    getAllItems() {
        return this.getRawData();
    }

    /**
     * 获取所有项目
     */
    getCheckableItems() {
        let selectedItems = [];
        let rawData = this.getRawData();
        for (let i = 0; i < rawData.length; i++) {
            if (this.props.isCheckable && this.props.isCheckable(rawData[i], i)) {
                selectedItems.push(rawData[i]);
            }
        }

        return selectedItems;
    }

    /** 获取勾选项目
     *
     * @returns {array } 勾选项目
     */
    getAllSelectedItems() {
        let selectedItems = [];
        let rawData = this.getRawData();
        for (let i = 0; i < rawData.length; i++) {
            if (this.props.isCheckable && this.props.isCheckable(rawData[i], i) && rawData[i].checked) {
                selectedItems.push(rawData[i]);
            }
        }

        return selectedItems;
    }

    /**
     * 获取渲染行组件
     *
     * @param {int} cellId 单元索引
     * @param {any} cellData 单元数据
     * @returns {JSX.Element} 组件
     */
    _renderCellInner(cellId, cellData) {
        if (cellData == null) {
            return null;
        }

        if (typeof cellData['checked'] === 'undefined')
            cellData['checked'] = false;
        let elem = this.props.renderCell(cellId, cellData);
        if (this.props.hasCheck) {
            return (
                <div key={'checkablelistview_layout_' + cellId} className='fr-row persent-width common-check'>
                    <div className='fr-row persent-width'
                        key={'checkablelistview_div_' + cellId} onClick={(event) => {
                            event.stopPropagation();
                            this.selectItem(cellId);
                            if (typeof this.props.onItemChecked === 'function')
                                this.props.onItemChecked(cellId, cellData.checked);
                        } }>
                        <CheckBox
                            key = 'checkbox'
                            ref={(ref) => this.refs['checkbox_' + cellId] = ref }
                            checked={cellData.checked}
                            onChange={(event) => {
                                event.stopPropagation();
                                let rawData = this.getRawData().slice(0);
                                rawData[cellId] = Object.assign(rawData[cellId], { checked: event.target.checked });
                                this.setRawData(rawData);

                                if (typeof this.props.onItemChecked === 'function')
                                    this.props.onItemChecked(cellId, event.target.checked);
                            } }
                            />
                        {elem}
                    </div>
                </div>
            );
        } else {
            return (
                <div key={'checkablelistview_layout_' + cellId} className='fr-row persent-width common-check'>
                     {elem}
                </div>
            );
        }
    }
}