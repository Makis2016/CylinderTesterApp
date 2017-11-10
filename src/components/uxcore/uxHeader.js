import React from 'react';
import Header from 'uxcore-table/build/Header';
import CheckBox from 'uxcore-table/build/Cell/CheckBox';
import assign from 'object-assign';
import classnames from 'classnames';

/**
 * uxcore Header 重构
 * 
 * @export
 * @class UxHeader
 * @extends {Header}
 */
export default class UxHeader extends Header {
    renderColumn(item, index, hasGroup, last) {
        const me = this;
        const { renderModel } = me.props;
        const rowSelectorInTreeMode = (['checkboxSelector', 'radioSelector'].indexOf(item.type) !== -1)
            && (renderModel === 'tree');
        if (item.hidden || rowSelectorInTreeMode) {
            me.firstIndex = index + 1;
            return null;
        }
        const noBorderColumn = ['jsxchecked', 'jsxtreeIcon', 'jsxwhite'];
        const style = {
            width: item.width ? item.width : 100,
            textAlign: item.align ? item.align : 'left',
        };
        let v;
        if (hasGroup) {
            assign(style, {
                height: 50,
                lineHeight: '50px',
            });
        }

        if (item.type === 'checkbox' || item.type === 'checkboxSelector') {
            assign(style, {
                paddingRight: 4,
                paddingLeft: 12,
                width: item.width ? item.width : 92,
            });

            const checkBoxProps = {
                ref: me.saveRef('checkbox'),
                checked: me.props.checkStatus.isAllChecked,
                halfChecked: me.props.checkStatus.isHalfChecked,
                disable: me.props.checkStatus.isAllDisabled,
                onChange: me.handleCheckBoxChange.bind(me),
            };

            v = <CheckBox {...checkBoxProps} />;
        } else {
            const content = (typeof item.title === 'function') ? item.title() : item.title;
            const title = (typeof item.title === 'function') ? undefined : item.title;
            v = <span title={title}>{content}</span>;
        }

        if (noBorderColumn.indexOf(item.dataKey) !== -1 || last) {
            assign(style, {
                borderRight: 'none',
            });
        }

        return (
            <div
                key={index}
                className={classnames({
                    'kuma-uxtable-cell': true,
                    'show-border': me.props.showHeaderBorder,
                })}
                style={style}
            >
                {me.renderIndent(index)}
                {v}
                {me.renderMessageIcon(item)}
                {me.renderOrderIcon(item)}
            </div>
        );
    }
}