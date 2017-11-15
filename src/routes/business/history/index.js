import React, { Component } from 'react';
import Form, { FormRow, InputFormField, OtherFormField, CascadeSelectFormField } from 'uxcore-form';
import Button from 'uxcore-button';
import Formatter from 'uxcore-formatter';
import assign from 'object-assign';
import Message from 'uxcore-message';
import { testingType, media } from '../../../utils/commonUtil';
import { setConfig } from '../../../common/UserStore';
import TabHeader from '../../../components/tabHeader/tabHeader';
import CheckableListView from '../../../components/listview/checkableListView';
import Footer from '../../../components/footer/footer';
import { requestAjax } from '../../../utils/requestUtils';

/**
 * 历史记录列表
 * 
 */
export default class Index extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '0',
            currentPage: 1,
            pageSize: 10,
            areaData: {},
            alarmCount: 0,
            clientwidth:document.body.clientWidth
        };

        this._getAreas();

        this.mAreaId =0;
        this.deviceCode;
        this.params={areaId:null,deviceCode:null};
        // this.mTimerList = setInterval(() => {
        //     this._getWarningCount();
        // }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.mTimerList);
    }

    render() {

        let preBtn = null;
        let cWidth = (this.state.clientwidth-150)/3;
        return (
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <TabHeader leftIcon={preBtn} />
                <style>{'.searchRow{margin-left:40px}'}</style>
                <div className='flex flex-direction-column height-hundred-percent' style={{ marginTop: 10 }}>
                    <div className='flex flex-direction-column flex-justify-content-center'>
                        <Form ref="searchForm" >
                            <FormRow>
                                <CascadeSelectFormField jsxstyle={{ width: cWidth }} jsxlabel="区域" jsxname="city" jsxdata={this.state.areaData} jsxplaceholder={['省', '市', '区']} />
                            </FormRow>
                            <FormRow className='searchRow'>
                                <InputFormField jsxname="deviceCode" jsxshowLabel={false} jsxplaceholder="输入设备唯一码进行查询" />
                                <OtherFormField className="searchButton">
                                    <Button onClick={() => this._handleSearch()}>查询</Button>
                                    <Button onClick={() => this._refresh()}>清空</Button>
                                </OtherFormField>
                            </FormRow>
                        </Form>
                    </div>
                    <div className='flex flex-direction-row flex-justify-content-space-around flex-align-items-center' style={styles.title}>
                        <div style={{ width: '25%' }}>测试时间</div>
                        <div style={{ width: '25%' }}>气瓶编号</div>
                        <div style={{ width: '25%' }}>测试介质</div>
                        <div style={{ width: '25%' }}>测试方式</div>
                    </div>
                    <div className='flex flex-direction-column' style={{ overflow: 'auto', width: '100%', height: document.body.clientHeight - 49 }}>
                        <div>
                            <CheckableListView
                                ref='listview'
                                columns={1}
                                firstLoad='true'
                                onFetch={(page, resolve, reject) => this._onFetch(page, resolve, reject)}
                                renderCell={(cellId, cellData) => this._renderCell(cellId, cellData)}
                                style={{ height: document.body.clientHeight }}
                            >
                            </CheckableListView>
                            <Footer
                                index={2}
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
            url: 'selectHistory',
            params: { currentPage: page, pageSize: this.state.pageSize,areaId:this.mAreaId,deviceCode:this.deviceCode},
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
            <div className='flex flex-direction-row flex-justify-content-space-around flex-align-items-center' style={styles.cellData} onClick={() => this._gtestEndInfo(cellData.id, cellData.deviceName, Formatter.date(new Date(cellData.lastSyncTime), 'YYYY-MM-DD HH:mm:ss'))}>
                <div style={{ width: '25%' }}>{Formatter.date(new Date(cellData.testingBeginTime), 'YYYY-MM-DD HH:mm')}</div>
                <div style={{ width: '25%' }}>{cellData.cylinderNumber}</div>
                <div style={{ width: '25%' }}>{media(cellData.testingMedia)}</div>
                <div style={{ width: '25%' }}>{testingType(cellData.testingType)}</div>
            </div>
        );
    }

    /**
     * 进入测试结束界面
     * 
     */
    _gtestEndInfo(id, name, time) {
        setConfig(id, name, time);
        this.context.router.push({
            pathname: '/testEndInfo'
        });
    }

    /**
     *  搜索事件
     * 
     */
    _handleSearch() {
        let data = this.refs.searchForm.getValues().values;
        let citys = [];
        let area = 0;
        if(data.city != undefined){
            citys = data.city;
        }                
        if(citys.length > 0){
            area = parseInt(citys[citys.length - 1]);
        }
        this.mAreaId = area;
        this.deviceCode = data.deviceCode;
        this.refs.listview.reload();
    }

    /**
     *  清空搜索条件
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
     * 获取区域下拉框数据
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

}

const styles = {
    title: {
        backgroundColor: '#BBBBBB',
        height: 35,
        color: '#FFFFFF',
        fontSize: 'medium'
    },
    cellData: {
        width: '100%',
        height: 45
    }
};