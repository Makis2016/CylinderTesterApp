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
            pageSize: 20,
            areaData: {},
            alarmCount: 0
        };

        this._getAreas();
        this.mAreaId;

        this.mTimerList = setInterval(() => {
            // this._selectDeviceList();
            this._getWarningCount();
        }, 1000);
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

        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <TabHeader leftIcon={preBtn} />
                <div className='flex flex-direction-column height-hundred-percent' style={{ marginTop: 15 }}>
                    <div className='flex flex-direction-column flex-justify-content-center'>
                        <Form ref="searchForm" >
                            <FormRow>
                                <CascadeSelectFormField jsxstyle={{ width: 80 }} jsxlabel="区域" jsxname="city" jsxdata={this.state.areaData} jsxplaceholder={['省', '市', '区']} />
                            </FormRow>
                            <FormRow >
                                <InputFormField jsxname="deviceName" jsxlabel="区域" jsxshowLabel={false} jsxplaceholder="输入设备名称进行查询" />
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
                                firstLoad='true'
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

    _onFetch(page, resolve) {
        requestAjax({
            url: 'selectDeviceList',
            params: { area: this.mAreaId, currentPage: page, pageSize: this.state.pageSize },
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

    _renderCell(cellId, cellData) {
        return (
            <DeviceCell device={cellData} />
        );
    }

    _changePage(index) {
        this.setState({
            currentPage: index
        });
    }

    _onClickArea(key) {
        this.mAreaId = key;
        this._selectDeviceList();
    }

    _selectDeviceList() {
        requestAjax({
            url: 'selectDeviceList',
            params: { area: this.mAreaId, currentPage: this.state.currentPage, pageSize: this.state.pageSize },
            success: (result) => {
                if (result.success) {
                    this.setState({
                        deviceList: result.content.data,
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

    _getWarningCount() {
        requestAjax({
            url: 'selectRealTimeWarning',
            success: (result) => {
                if (result.success) {
                    let count = result.content.data.length;
                    if (count > 0) {
                        this.setState({
                            alarmCount:count
                        });
                    }
                }
            }
        }, false);
    }
} 