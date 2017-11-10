import React from 'react';
import Row from 'uxcore-table/build/Row';
import deepcopy from 'lodash/cloneDeep';
const classnames = require('classnames');
import UxCell from './uxCell';

/**
 * 重写ROW双击方法
 * 
 * @export
 * @class UxRow
 * @extends {Row}
 */
export default class UxRow extends Row {
    handleDoubleClick(rowData) {
        const table = this.props.root;
        if (table.props.doubleClickToEdit) {
            table.editRow(deepcopy(rowData), (rowData) => table.handleDoubleClickRow(rowData));
        }
    }

    handleClick() {
        const table = this.props.root;
        if (typeof table.handleClick === 'function')
            table.handleClick();
    }

    render() {
        const props = this.props;
        let _columns = [];
        let _style = {};
        const _data = props.data;
        const me = this;
        const otherCls = props.addRowClassName(_data[props.index]);

        if (!this.props.visible) {
            _style = {
                display: 'none',
            };
        }

        props.columns.forEach((column) => {
            if ('group' in column) {
                _columns = _columns.concat(column.columns);
            } else {
                _columns.push(column);
            }
        });

        let firstVisableColumn = 0;

        return (
            <li
                className={classnames({
                    [this.props.prefixCls]: true,
                    [`${this.props.prefixCls}-hover`]: props.isHover,
                    [otherCls]: !!otherCls,
                    even: (props.index % 2 === 1),
                    last: props.last,
                })}
                style={_style}
                onClick={() => {
                    this.handleClick(props.rowData);
                }}
                onDoubleClick={() => {
                    this.handleDoubleClick(props.rowData);
                }}
                onMouseEnter={() => {
                    this.handleMouseEnter();
                }}
                onMouseLeave={() => {
                    this.handleMouseLeave();
                }}
            >
                <div className={`${this.props.prefixCls}-cells`}>
                    {_columns.map((item, index) => {
                        const rowSelectorInTreeMode =
                            (['checkboxSelector', 'radioSelector'].indexOf(item.type) !== -1)
                            && (props.renderModel === 'tree');
                        if (item.hidden || rowSelectorInTreeMode) {
                            return null;
                        }
                        firstVisableColumn += 1;
                        let hasSubComp = !!props.subComp;
                        if (!hasSubComp) {
                            hasSubComp = props.renderSubComp
                                ? !!props.renderSubComp(deepcopy(props.rowData))
                                : false;
                        }
                        const renderProps = {
                            key: `cell${index}`,
                            column: item,
                            root: props.root,
                            locale: props.locale,
                            rowData: props.rowData,
                            rowIndex: props.rowIndex,
                            index: props.index,
                            changeSelected: props.changeSelected,
                            rowSelection: props.rowSelection,
                            actions: props.actions,
                            mode: props.mode,
                            handleDataChange: props.handleDataChange,
                            attachCellField: props.attachCellField,
                            detachCellField: props.detachCellField,
                            last: (index === _columns.length - 1),
                            cellIndex: index,
                            hasSubComp,
                            showSubCompCallback: me.showSubCompFunc.bind(me),
                        };

                        if (firstVisableColumn === 1) {
                            return (<UxCell {...renderProps} >
                                {me.renderIndent()}
                                {me.renderExpandIcon(props.rowIndex)}
                                {me.renderTreeRowSelector()}
                            </UxCell>);
                        }
                        // if have vertical data structure, how to process it
                        return <UxCell {...renderProps} />;
                    })}
                </div>
                {me.renderChild()}
                {this.renderSubComp()}
            </li>
        );
    }

}