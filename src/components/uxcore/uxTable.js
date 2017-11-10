import React from 'react';
import Table from 'uxcore-table';
import deepcopy from 'lodash/cloneDeep';
import upperFirst from 'lodash/upperFirst';
import Const from 'uxcore-const';
import assign from 'object-assign';
import util from 'uxcore-table/build/util';
import Mask from 'uxcore-table/build/Mask';
import classnames from 'classnames';
import Animate from 'uxcore-animate';
import UxHeader from './uxHeader';
import UxTbody from './uxTbody';
import 'whatwg-fetch';
import { MobileUrlConfig } from '../../mobileUrlConfig';

/**
 * uxcore-table 扩展类
 * 
 * @export
 * @class UxTable
 * @extends {Table}
 */
class UxTable extends Table {

    /**
     * 删除全部记录
     * 
     * @param {any} obj
     * @param {any} cb
     * 
     */
    deleteAllRecords(cb) {
        var content = deepcopy(this.state.data);
        content.data = [];
        this.data = content;
        this.uid = 0;
        this.setState({
            data: content
        }, () => {
            if (cb) {
                cb();
            }
        });
    }

    /**
     * 删除全部记录，查询对应行数的空行
     * 
     * @param {any} obj
     * @param {any} cb
     */
    deleteAllRecordsAndInsert(count) {
        var content = deepcopy(this.state.data);
        content.data = [];
        this.data = content;
        this.uid = 0;
        this.setState({
            data: content
        }, () => {
            if (count) {
                this.addManyEmptyRows(count);
            }
        });
    }


    /**
     * 新增jsxid，treeid
     * 
     * @param {any} obj
     * @returns
     * 
     */
    addJSXIdsForRecord(obj) {
        const me = this;
        let objAux = deepcopy(obj);
        if (objAux instanceof Array) {
            objAux = objAux.map((item) => {
                const newItem = deepcopy(item);
                newItem.__treeId__ = me.uid.toString();
                if (newItem.jsxid === undefined || newItem.jsxid == null) {
                    me.uid += 1;
                    newItem.jsxid = me.uid;
                }
                if (!newItem.__mode__) {
                    newItem.__mode__ = Const.MODE.EDIT;
                }
                return newItem;
            });
        } else {
            objAux.__treeId__ = me.uid.toString();
            me.uid += 1;
            objAux.jsxid = me.uid;

        }
        return objAux;
    }


    /**
     * 新加行，表格内容设为编辑模式
     * 
     * @param {any} cb
     * 
     */
    addEmptyRows() {
        const data = deepcopy(this.data.data || this.data.datas);
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            item.__mode__ = Const.MODE.EDIT;
        }
        this.updateRecord(data, this.addEmptyRow);
    }

    /**
     * 加入多个空行
     * 
     * @param {any} count 
     * 
     */
    addManyEmptyRows(count) {
        let objAux = [];
        for (let i = 0; i < count; i++) {
            objAux[i] = {};
        }

        this.insertRecords(objAux);
    }

    /**
     * 
     * 修改获取远程数据方法
     * @param {any} from
     * @param {any} props
     * @param {any} [cb=() => { }]
     * 
     * @memberOf UxTable
     */
    fetchRemoteData(from, props, cb = () => { }) {
        const me = this;
        if (me.request) {
            me.request.abort();
        }
        if (!me.state.showMask) {
            me.setState({
                showMask: true,
            });
        }

        let opts = {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        };
        opts.body = this.toString(me.getQueryObj(from, props));

        require('es6-promise').polyfill();
        return new Promise((resolve, reject) => {
            let isResponseOK;
            fetch(props.fetchUrl, opts)
                .then((response) => {
                    isResponseOK = response.ok;
                    return response.json();
                })
                .then((responseData) => {
                    if ((responseData != null) && (responseData.content != null)) {
                        const processedData = me.addValuesInData(props.processData(deepcopy(responseData.content)));
                        if ((processedData != null) && (processedData.data != null)) {
                            const updateObj = {
                                data: processedData,
                                showMask: false,
                                expandedKeys: util.getDefaultExpandedKeys(processedData.data, props.levels),
                            };

                            if (processedData.currentPage !== undefined) {
                                updateObj.currentPage = processedData.currentPage;
                            }
                            me.data = deepcopy(processedData);
                            me.setState(updateObj, () => { cb(); });
                        }
                    } else if (!responseData.success && responseData.errorMsg == 'unauthorized') {
                        location.href = MobileUrlConfig.loginHtml;
                    }
                })
                .catch((err) => {
                    props.onFetchError(err);
                    me.setState({
                        data: {
                            data: [],
                        },
                        showMask: false,
                    });
                });
        });

    }

    /**
     * 获取单元格
     * 
     * @param {any} dataKey
     * @param {any} index
     * @returns
     * 
     * @memberOf UxTable
     */
    getCell(dataKey, index) {
        return document.getElementById(dataKey + '.' + index).getElementsByClassName('kuma-input')[0];
    }

    handleDoubleClickRow(data) {
        if (typeof this.props.handleDoubleClickRow === 'function') {
            this.props.handleDoubleClickRow(data);
        }
    }

    handleClick() {
        if (typeof this.props.handleClickRow === 'function') {
            this.props.handleClickRow();
        }
    }

    toString(obj) {
        return obj ? Object.keys(obj).sort().map(function (key) {
            let val = obj[key];
            if (Array.isArray(val)) {
                if (val.length == 0) {
                    return encodeURIComponent(key) + '=';
                }
                return val.sort().map(function (val2) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                }).join('&');
            } else if (typeof (val) == 'undefined') {
                val = '';
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }).join('&') : '';
    }

    renderHeader(renderHeaderProps, fixedColumn) {
        if (!this.props.showHeader) {
            return null;
        }
        return (
            <div className="kuma-uxtable-header-wrapper">
                <UxHeader
                    {...renderHeaderProps}
                    fixedColumn={fixedColumn}
                    ref={util.saveRef(`header${upperFirst(fixedColumn)}`, this)}
                    onScroll={this.handleHeaderScroll}
                />
            </div>
        );
    }

    renderTbody(renderBodyProps, bodyHeight, fixedColumn) {
        const isFixedTable = ['fixed', 'rightFixed'].indexOf(fixedColumn) !== -1;
        const scrollBarWidth = util.measureScrollbar();
        return (
            <div
                className={classnames('kuma-uxtable-body-wrapper', {
                    'kuma-uxtable-fixed-body-wrapper': isFixedTable,
                })}
                style={{
                    height: isFixedTable ? (bodyHeight - scrollBarWidth) : bodyHeight,
                }}
            >
                <UxTbody
                    {...renderBodyProps}
                    fixedColumn={fixedColumn}
                    onScroll={this.handleBodyScroll}
                    ref={util.saveRef(`body${upperFirst(fixedColumn)}`, this)}
                />
                {!isFixedTable ? <Animate showProp="visible" transitionName="tableMaskFade">
                    <Mask visible={this.state.showMask} text={this.props.loadingText} />
                </Animate> : null}
            </div>
        );
    }

}

Table.CellField.prototype.render = function render() {
    const me = this;
    const specificCls = me.addSpecificClass();
    return (
        <div
            className={classnames({
                hasError: !me.state.pass,
                [specificCls]: !!specificCls,
                [me.props.prefixCls]: true,
                [me.props.className]: !!me.props.className,
            })}
            id={me.getName()}
        >
            {me.renderContent()}
        </div>
    );
};

Table.CellField.prototype.validate = function validate(value, cb) {
    var me = this;
    if (me.getName && (typeof me.getName === 'function')) {
        let cellfield = document.getElementById(me.getName());
        if (cellfield != null) {
            let input = cellfield.getElementsByClassName('kuma-input');
            if (input != null && input.length > 0) {
                if (input[0].getAttribute('readOnly'))
                    return true;
            }
        }
    }

    var actualValue = value === undefined ? me.props.value : value;
    var rowData = me.props.rowData;
    var rules = me.props.column.rules;

    var pass = true;
    var errMsg = '';
    if ((typeof rules === 'undefined' ? 'undefined' : typeof (rules)) === 'object' && !Array.isArray(rules)) {
        pass = !!rules.validator(actualValue, rowData);
        errMsg = rules.errMsg;
    } else if (Array.isArray(rules)) {
        for (var i = 0; i < rules.length; i++) {
            pass = rules[i].validator(actualValue, rowData);
            if (!pass) {
                errMsg = rules[i].errMsg;
                break;
            }
        }
    } else if (typeof rules === 'function') {
        // pass should be false if rules return a string which is an errMsg;
        errMsg = rules(actualValue, rowData);
        pass = errMsg === true || errMsg === undefined;
        errMsg = typeof errMsg === 'boolean' ? '' : errMsg;
    }
    if (cb) {
        cb(pass);
    }
    me.setState({
        pass: pass,
        errMsg: errMsg
    });
    return pass;
};
//}



UxTable.propTypes = assign({ handleDoubleClickRow: React.PropTypes.func, handleClickRow: React.PropTypes.func }, Table.propTypes);

UxTable.defaultProps = assign({ handleDoubleClickRow: null, handleClickRow: null }, Table.defaultProps);

module.exports = UxTable;