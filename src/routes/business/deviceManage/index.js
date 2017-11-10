import React, { Component } from 'react';
import Dialog from 'uxcore-dialog';
import Button from 'uxcore-button';
import Crumb from 'uxcore-crumb';
import Message from 'uxcore-message';
import Area from '../../../components/area';
import TableGrid from '../../../components/table';
import { requestAjax } from '../../../utils/requestUtils';
import { getUserInfo } from '../../../common/UserStore';
import EditDevice from './editDevice';
import Title from '../../../components/business/title';

export default class Index extends Component {

    constructor(props) {
        super(props);

        let userInfo = getUserInfo();
        let citys = userInfo == null ? '' : userInfo.city;
        let city = citys.split(',');

        this.state = {
            editShow: false,
            newShow: false,
            editValues: {},
            areaId: city[city.length - 1],
            areas: []
        };

        this.selectIds = { id: [] }; // 选中的id
        this._getCrumbItem(city[city.length - 1]);
    }

    render() {

        // 右边功能
        let actions = {};

        let Crumbs = this.state.areas;

        let CrumbsOptions = [];

        for (let i = 0; i < Crumbs.length; i++) {
            CrumbsOptions.push(<Crumb.Item >{Crumbs[i].areaName}</Crumb.Item>);
        }


        actions['编辑'] = (rowData) => {
            this._showEditDialog(rowData);
        };

        // 表头
        let columns = [
            {
                dataKey: 'select',
                type: 'checkboxSelector',
            },
            { dataKey: 'id', title: 'ID', hidden: true },
            { dataKey: 'deviceType', title: '设备型号', width: '10%' },
            {
                dataKey: 'activation', title: '是否激活', width: '10%', render: function (rowData) {
                    if (rowData == 1) {
                        return '激活';
                    } else {
                        return '未激活';
                    }
                }
            },
            { dataKey: 'deviceCode', title: '设备唯一码', width: '20%' },
            { dataKey: 'personInCharge', title: '负责人', width: '10%' },
            { dataKey: 'createTime', title: '创建时间', width: '10%' },
            {
                dataKey: 'action', title: '操作', width: '20%', type: 'action', actions: actions
            }
        ];

        return (
            <div className="flex fillParent flex-direction-column">
                <Title />
                <div className='flex flex-direction-row' style={{ marginTop: 10 }}>
                    <div className='flex'>
                        <Area onClick={(key) => this._onClickArea(key)} defaultKey={this.state.areaId} />
                    </div>
                    <div className='flex flex-direction-column ' style={{ width: '100%' }}>
                        <div className='flex flex-direction-row flex-justify-content-space-between flex-align-items-center' style={{ marginBottom: 10 }}>
                            <div>
                                <Crumb>
                                    {CrumbsOptions}
                                </Crumb>
                            </div>
                            <div>
                                {/*<Button>导入设备</Button>*/}
                                <Button onClick={() => this._showNewDialog()}>添加设备</Button>
                                {/*<Button onClick={() => this._edit()}>修改设备</Button>*/}
                                <Button onClick={() => this._deleteDevice()}>删除设备</Button>
                            </div>
                        </div>
                        <div>
                            <TableGrid
                                jsxcolumns={columns}
                                ref="grid"
                                pageSize={10}
                                fetchUrl={'device/list'}
                                fetchParams={{ areaId: this.state.areaId }}
                                showPagerSizeChanger={false}
                                rowSelection={{ onSelect: (checked, data, allData) => this._rowSelect(checked, data, allData), onSelectAll: (checked, allData) => this._rowSelectAll(checked, allData) }}
                            />
                        </div>
                    </div>
                    <Dialog ref="editDialog" width={800} visible={this.state.editShow} title="修改设备" onOk={() => this._handleEditOk()} onCancel={() => this._handleEditCancel()}>
                        <EditDevice editValues={this.state.editValues} ref="editForm" />
                    </Dialog>
                    <Dialog ref="newDialog" width={800} visible={this.state.newShow} title="添加设备" onOk={() => this._handleNewOk()} onCancel={() => this._handleNewCancel()}>
                        <EditDevice editValues={this.state.editValues} ref="newForm" />
                    </Dialog>
                </div>
            </div>
        );
    }

    _onClickArea(value) {
        this.setState({
            areaId: value
        }, this._getCrumbItem(value));
    }

    /**
     * 新增设备方法
     * 
     */
    _handleNewOk() {

        let form = this.refs.newForm.refs.editForm;
        let citys = form.getValues().values.areas;

        let data = form.getValues().values;
        data.areaId = parseInt(citys[citys.length - 1]);

        if (!form.isDirty()) {
            requestAjax({
                url: 'addDevice',
                params: data,
                success: (result) => {
                    if (result.success) {
                        Message['info'](result.errorMsg);
                        this._handleNewCancel();
                        this.refs.grid.refs.table.fetchData();
                    }else{
                        Message['info'](result.errorMsg);
                    }
                },
                fail: (result) => {
                    Message['info'](result.errorMsg);
                }
            });
        }
    }

    /**
     * 显示新增界面
     */
    _showNewDialog() {

        let areas = [];

        for (let i = 0; i < this.state.areas.length; i++) {
            areas.push(parseInt(this.state.areas[i].id));
        }

        let data = { areas: areas };

        this.setState({
            newShow: true,
            editValues: data
        });
    }

    /**
     * 新增取消
     */
    _handleNewCancel() {
        this.refs.newForm.resetValue();
        this._toggleShow('newShow');
    }

    _edit() {
        this.setState({
            editShow: true
        });
    }

    /**
     * 编辑取消
     */
    _handleEditCancel() {
        this.refs.editForm.resetValue();
        this.setState({
            editValues: {}
        });
        this._toggleShow('editShow');
    }

    /**
     * 切换显示
     * 
     * @param {any} 键值
     * 
     */
    _toggleShow(key) {
        let obj = {};
        obj[key] = !this.state[key];
        this.setState(obj);
    }

    _showEditDialog(rowData) {
        // 城市下拉框回显数据处理
        let city = rowData.areas;
        let citys = [];
        let cityArray = [];
        if (city != null) {
            citys = city.split(',');
            for (let i = 0; i < citys.length; i++) {
                cityArray.push(parseInt(citys[i]));
            }
        }
        rowData.areas = cityArray;

        this.setState({
            editShow: true,
            editValues: rowData
        });
    }

    /**
     * 表格复选框触发回调函数
     * 
     * @param {any} checked 
     * @param {any} data 
     * @param {any} allData 
     * 
     */
    _rowSelect(checked, data, allData) {
        this._rowSelectData(allData);
    }

    /**
     * 全选复选框触发回调函数
     * 
     * @param {any} checked 
     * @param {any} allData 
     * 
     */
    _rowSelectAll(checked, allData) {
        this._rowSelectData(allData);
    }

    /**
     * 选中的id
     * 
     * @param {any} allData 
     * 
     */
    _rowSelectData(allData) {
        let selectIds = [];
        for (let data in allData) {
            if (!allData.hasOwnProperty(data)) {
                continue;
            }
            selectIds.push(allData[data].id);
        }
        this.selectIds = { id: selectIds };
    }

    /**
     * 修改确定
     * 
     */
    _handleEditOk() {
        let form = this.refs.editForm.refs.editForm;
        let citys = form.getValues().values.areas;

        let data = form.getValues().values;
        data.areaId = parseInt(citys[citys.length - 1]);

        requestAjax({
            url: 'updateDevice',
            params: data,
            success: (result) => {
                Message['info'](result.errorMsg);
                this._handleEditCancel();
                this.refs.grid.refs.table.fetchData();
            },
            fail: (result) => {
                Message['info'](result.errorMsg);
            }
        });
    }

    /**
     * 删除设备
     * 
     */
    _deleteDevice() {
        if (this.selectIds.id.length == 0) {
            Message['info']('请选择一条数据');
        } else {
            Dialog.confirm({
                title: '确定删除？',
                content: '删除后无法找回,请慎重',
                onOk: () => this._handleDelOk(),
                onCancel: () => this._handleDelCancel()
            });
        }
    }

    /**
     * 确定删除设备
     * 
     */
    _handleDelOk() {
        requestAjax({
            url: 'deleteDevice',
            params: this.selectIds,
            success: (result) => {
                Message['info'](result.errorMsg);
                this._handleDelCancel();
                this.refs.grid.refs.table.fetchData();
            },
            fail: (result) => {
                Message['info'](result.errorMsg);
            }
        });
    }

    /**
     * 取消删除设备
     *  
     */
    _handleDelCancel() {
        this.setState({
            delMsgShow: false
        });
    }

    /**
     * 获取面包屑列表
     */
    _getCrumbItem(areaId) {
        requestAjax({
            url: 'areaParentList',
            params: { id: areaId },
            success: (result) => {
                this.setState({
                    areas: result.content.data
                });
            },
            fail: (result) => {
                Message['info'](result.errorMsg);
            }
        });
    }
} 