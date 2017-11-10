import React, { Component } from 'react';
import Form, { FormRow, InputFormField, Validators, SelectFormField, CascadeSelectFormField } from 'uxcore-form';
import AreaTree from '../../../components/business/areaTree';
import { requestAjax } from '../../../utils/requestUtils';

export default class EditDevice extends Component {

    static propTypes = {
        editValues: React.PropTypes.any // 编辑数据内容
    };

    constructor(props) {
        super(props);

        this.state = {
            areaData: {}
        };

        this._getAreas();
    }

    render() {

        return (
            <Form className='demoForm' jsxvalues={this.props.editValues} ref='editForm'>
                {
                    this.props.editValues.id ? (
                        <FormRow>
                            <InputFormField jsxname='id' jsxshow={false} />
                        </FormRow>
                    ) : ''
                }
                <FormRow>
                    <CascadeSelectFormField className='label150' jsxstyle={{ width: 180 }} jsxlabel='所属区域：' jsxname="areas" jsxdata={this.state.areaData} jsxplaceholder={['省', '市', '区']} />
                </FormRow>
                <FormRow>
                    <SelectFormField className='label150' jsxlabel='设备型号：' jsxname='deviceType' showSearch={false} jsxdata={[{ value: 'V1', text: 'V1' }]} jsxrules={{ validator: Validators.isNotEmpty, errMsg: '设备型号必填' }} />
                    <InputFormField className='label150' jsxlabel='设备唯一码：' jsxname='deviceCode' jsxrules={{ validator: Validators.isNotEmpty, errMsg: '设备唯一码必填' }} />
                </FormRow>
                <FormRow>
                    <InputFormField className='label150' jsxlabel='设备名称：' jsxname='deviceName' />
                    <SelectFormField className='label150' jsxlabel='是否激活：' jsxname='activation' showSearch={false} jsxdata={[{ value: '0', text: '不激活' }, { value: '1', text: '激活' }]} jsxrules={{ validator: Validators.isNotEmpty, errMsg: '激活状态必填' }} />
                </FormRow>
                <FormRow>
                    <InputFormField className='label150' jsxlabel='负责人：' jsxname='personInCharge' />
                    <InputFormField className='label150' jsxlabel='联系方式：' jsxname='telephone' />
                </FormRow>
            </Form>
        );
    }

    resetValue() {
        let form = this.refs.editForm;
        let keys = Object.keys(form.fields);
        for (let key in keys) {
            if (form.fields[keys[key]]) {
                form.fields[keys[key]].handleDataChange('', true, true);
            }
        }
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
}