import React from 'react';
import Cell from 'uxcore-table/build/Cell';
const Const = require('uxcore-const');
const classnames = require('classnames');
const deepcopy = require('lodash/cloneDeep');
const CheckBox = require('uxcore-table/build/Cell/CheckBox');
const Radio = require('uxcore-table/build/Cell/Radio');
const TextField = require('uxcore-table/build/CellField/TextField');
const SelectField = require('uxcore-table/build/CellField/SelectField');
const RadioField = require('uxcore-table/build/CellField/RadioField');
const util = require('uxcore-table/build/util');
const DateField = require('uxcore-date-cell-field');
const CheckField = require('uxcore-checkbox-cell-field');

const fieldsMap = {
    select: SelectField,
    text: TextField,
    radio: RadioField,
    date: DateField,
    check: CheckField,
};

export default class UxCell extends Cell {
    render() {
        const me = this;
        const props = me.props;
        const column = props.column;
        const width = column.width;
        const mode = props.rowData.__mode__;
        const style = {
            width: width || 100,
            textAlign: props.column.align ? props.column.align : 'left',
        };
        let content = deepcopy(props.rowData);
        let renderProps;

        if (column.type === 'action') {
            content = (
                <div className="action-container">
                    {me.renderActionItems(column, content, mode)}
                </div>
            );
        } else if (column.type === 'checkbox' || column.type === 'checkboxSelector') {
            style.paddingRight = 4;
            style.paddingLeft = 12;

            const checked = me.getCellData();
            let disable = props.rowSelection.isDisabled
                ? props.rowSelection.isDisabled(props.rowData) : false;
            if ('disable' in column) {
                disable = column.disable;
            } else if ('isDisable' in column) {
                disable = !!column.isDisable(props.rowData);
            }
            content = (
                <CheckBox
                    disable={disable}
                    mode={props.mode}
                    align={props.column.align}
                    checked={checked}
                    onChange={me.handleCheckChange.bind(me)}
                />
            );
        } else if (column.type === 'radioSelector') {
            style.paddingRight = 4;
            style.paddingLeft = 12;

            const checked = me.getCellData();
            let disable = props.rowSelection.isDisabled
                ? props.rowSelection.isDisabled(props.rowData) : false;
            if ('disable' in column) {
                disable = column.disable;
            } else if ('isDisable' in column) {
                disable = !!column.isDisable(props.rowData);
            }
            content = (
                <Radio
                    disable={disable}
                    mode={props.mode}
                    align={props.column.align}
                    checked={checked}
                    onChange={me.handleCheckChange.bind(me)}
                />
            );
        } else if (column.type === 'treeIcon') {
            content = me.renderTreeIcon();
            style.borderRight = 'none';
        } else if (
            (column.type === 'custom' || column.type in fieldsMap)
            && mode === Const.MODE.EDIT
            && (!('canEdit' in column) || column.canEdit(props.rowData))
        ) {
            // inline edit mode
            renderProps = {
                value: me.getEditData(),
                rowData: props.rowData,
                index: props.index,
                column,
                handleDataChange: props.handleDataChange,
                attachCellField: props.attachCellField,
                detachCellField: props.detachCellField,
            };
            let Field;

            if (column.type === 'custom') {
                Field = props.column.customField;
            } else {
                Field = fieldsMap[column.type];
            }
            content = <Field {...renderProps} />;
        } else if (column.type === 'money' || column.type === 'card' || column.type === 'cnmobile') {
            content = (
                <div
                    className="default-cell"
                    title={me.getCellData()}
                >
                    {util.formatValue(me.getCellData(), column.type, column.delimiter)}
                </div>
            );
        } else if (column.render) {
            content = column.render.apply(null, [me.getCellData(), content]);
        } else {
            content = <div className="default-cell" title={me.getCellData()}>{me.getCellData()}</div>;
        }

        const child = me.props.children;
        return (
            <div
                className={classnames({
                    [props.jsxprefixCls]: true,
                    last: props.last,
                })}
                style={style}
                id={`${me.props.column.dataKey}.${me.props.index}`}
            >
                {child}
                {content}
            </div>
        );
    }
}