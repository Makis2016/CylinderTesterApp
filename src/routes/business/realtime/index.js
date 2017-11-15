import React, { Component } from 'react';
import Message from 'uxcore-message';
import Form, { FormRow, InputFormField, OtherFormField, CascadeSelectFormField } from 'uxcore-form';
import Button from 'uxcore-button';
import DeviceCell from './deviceCell';
import { requestAjax } from '../../../utils/requestUtils';
import TabHeader from '../../../components/tabHeader/tabHeader';
import CheckableListView from '../../../components/listview/checkableListView';
import Footer from '../../../components/footer/footer';

/**
 * 实时数据
 * 
 */
export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceList: [],
            Date: new Date(),
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            areaData: {},
            alarmCount: 0,
            firstLoad: true,
            clientwidth: document.body.clientWidth
        };

        this._getAreas();
        this.mAreaId;
        this.deviceName;

        // this.mTimerList = setInterval(() => {
        //     // this._selectDeviceList();
        //     this._getWarningCount();
        // }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.mTimerList);
    }

    render() {
        let deviceList = [];
        for (let data in this.state.deviceList) {
            deviceList.push(<DeviceCell device={this.state.deviceList[data]} />);
        }

        let preBtn = null;
        let cWidth = (this.state.clientwidth - 150) / 3;

        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <TabHeader leftIcon={preBtn} />
                <style>{'.searchRow{margin-left:40px}'}</style>
                <div className='flex flex-direction-column height-hundred-percent' style={{ marginTop: 15 }}>
                    <div className='flex flex-direction-column flex-justify-content-center' style={{borderBottom:'1px solid'}}>
                        <Form ref="searchForm" >
                            <FormRow>
                                <CascadeSelectFormField jsxstyle={{ width: cWidth }} jsxlabel="区域" jsxname="city" jsxdata={this.state.areaData} jsxplaceholder={['省', '市', '区']} />
                            </FormRow>
                            <FormRow className='searchRow'>
                                <InputFormField jsxname="deviceName" jsxlabel="设备名称" jsxshowLabel={false} jsxplaceholder="输入设备名称进行查询" />
                                <OtherFormField className="searchButton">
                                    <Button onClick={() => this._handleSearch()}>查询</Button>
                                    <Button onClick={() => this._refresh()}>清空</Button>
                                </OtherFormField>
                            </FormRow>
                        </Form>
                    </div>
                    <div className='flex flex-direction-column' style={{ overflow: 'auto', width: '100%' }}>
                        <div>
                            <CheckableListView
                                ref='listview'
                                columns={2}
                                firstLoad={this.state.firstLoad}
                                onFetch={(page, resolve, reject) => this._onFetch(page, resolve, reject)}
                                renderCell={(cellId, cellData) => this._renderCell(cellId, cellData)}
                                style={{ height: document.body.clientHeight }}
                            >
                            </CheckableListView>
                            <div style={{ height: 70 }}></div>
                            <Footer
                                index={1}
                                alarmCount={this.state.alarmCount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 获取数据列表
     * 
     */
    _onFetch(page, resolve) {
        requestAjax({
            url: 'selectDeviceList',
            params: { area: this.mAreaId, currentPage: page, pageSize: this.state.pageSize, deviceName: this.deviceName },
            success: (result) => {
                if (result.success) {
                    resolve(result.content.data);
                    this.setState({
                        Date: new Date(),
                        totalCount: result.content.totalCount
                    });
                }
            },
            fail: (result) => {
                Message['info'](result.errorMsg);
            }
        }, false);
    }

    /**
     * 渲染单个Cell
     * 
     */
    _renderCell(cellId, cellData) {
        return (
            <DeviceCell device={cellData} />
        );
    }

    /**
     * 获取区域下拉框组件数据
     * 
     */
    _getAreas() {
        requestAjax({
            url: 'getAreaData',
            method: 'post',
            success: (resp) => {
                if (resp.success) {
                    this.setState({
                        areaData: resp.content.data
                    });
                }
            }
        });
    }

    /**
     * 获取告警条数
     * 
     */
    _getWarningCount() {
        requestAjax({
            url: 'selectRealTimeWarning',
            success: (result) => {
                if (result.success) {
                    let count = result.content.data.length;
                    if (count > 0) {
                        this.setState({
                            alarmCount: count
                        });
                    }
                }
            }
        }, false);
    }

    /**
     * 清空搜索条件
     * 
     */
    _refresh() {
        let form = this.refs.searchForm;
        form.setValues({
            deviceName: '',
            city: []
        });
        this.mAreaId = 0;
        this.deviceName = '';
        this.refs.listview.reload();
    }

    /**
     * 查询事件
     * 
     */
    _handleSearch() {
        let data = this.refs.searchForm.getValues().values;
        let citys = [];
        let area = 0;
        if (data.city != undefined) {
            citys = data.city;
        }
        if (citys.length > 0) {
            area = parseInt(citys[citys.length - 1]);
        }
        this.mAreaId = area;
        this.deviceName = data.deviceName;

        this.refs.listview.reload();
    }
} 