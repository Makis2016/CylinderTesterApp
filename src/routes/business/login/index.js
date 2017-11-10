import React from 'react';
import Form, { InputFormField, Validators, FormRow, OtherFormField } from 'uxcore-form';
import Button from 'uxcore-button';
import Message from 'uxcore-message';
import Captcha from '../../../components/captcha';
import { requestAjax } from '../../../utils/requestUtils';
import { setUserInfo } from '../../../common/UserStore';
import TabHeader from '../../../components/tabHeader/tabHeader';

/**
 * 用户登录界面
 * 
 * @export
 * @class Login
 * @extends {Component}
 */
export default class Index extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    /**
     * 构造函数
     * 
     * @param {any} props
     * 
     * @memberOf Login
     */
    constructor(props) {
        super(props);
        this.state = {
            jsxvalues: {
                username: localStorage.getItem('username'), // 用户名
                password: '' // 密码
            },
            captchaCode: ''
        };
        this._initLogin();
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            if (e && e.keyCode == 13) {
                this._handleLogin();
            }
        });
    }

    render() {

        let preBtn = null;

        return (
            <div style={{ height: '100%',width: '100%' }}>
                <TabHeader leftIcon={preBtn} />
                <div className="flex fillParent flex-direction-column flex-align-items-center">
                    <div className="flex flex-direction-row flex-justify-content-center">
                        <div className="flex flex-direction-column">
                            <div style={{ height: 100, backgroundColor: '#FFFFFF', }} className="flex flex-direction-row flex-align-items-center flex-justify-content-center">
                                <img src={'./resources/images/slogo.png'} style={{ height: 45 }} />
                            </div>
                            <style>
                                {'.required {font-family:Simsun} .login-basic-form {width: 365px}'}
                            </style>
                            <Form ref="form" jsxvalues={this.state.jsxvalues} className="login-basic-form whiteBackground">
                                <InputFormField style={{ height: 42 }} jsxname="username" jsxlabel="" inputType='text' jsxplaceholder="请输入用户名" jsxrules={{ validator: Validators.isNotEmpty, errMsg: '请输入用户名' }}>
                                    <InputFormField.LeftAddon className='whiteBackground'>
                                        <i className="kuma-icon kuma-icon-man"></i>
                                    </InputFormField.LeftAddon>
                                </InputFormField>
                                <InputFormField className="privacyIcon" style={{ height: 42 }} jsxname="password" jsxlabel="" inputType={'password'} jsxplaceholder="请输入密码" jsxrules={{ validator: Validators.isNotEmpty, errMsg: '请输入密码' }}>
                                    <InputFormField.LeftAddon className='whiteBackground'>
                                        <i className="kuma-icon kuma-icon-privacy"></i>
                                    </InputFormField.LeftAddon>
                                </InputFormField>
                                <FormRow>
                                    <InputFormField style={{ height: 36 }} jsxname="captcha" jsxlabel="" inputType='text' jsxplaceholder="请输入验证码" jsxrules={{ validator: Validators.isNotEmpty, errMsg: '请输入验证码' }}>
                                    </InputFormField>
                                    <OtherFormField>
                                        <Captcha />
                                    </OtherFormField>
                                </FormRow>
                                <FormRow className="flex fillParent flex-align-items-center flex-justify-content-center">
                                    <OtherFormField className="flex fillParent flex-align-items-center flex-justify-content-center">
                                        <Button size="large" onClick={() => this._handleLogin()}>登录1</Button>
                                    </OtherFormField>
                                </FormRow>
                            </Form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    _initLogin() {
        requestAjax({
            url: 'loginout'
        });
    }

    /**
     * 登录按钮点击
     * 
     * @memberOf Login
     */
    _handleLogin() {
        let form = this.refs.form;
        if (!form.isDirty()) {
            requestAjax({
                url: 'login',
                params: form.getValues().values,
                success: (result) => {
                    if ((result.content) && (result.content.data)) {
                        setUserInfo(result.content.data);
                        if (result.content.data.rememberMe) {
                            localStorage.setItem('username', result.content.data.username);
                        } else {
                            localStorage.clear();
                        }
                    }
                    // location.href = Host.LOGIN;
                    this.context.router.push({
                        pathname: '/realtime'
                    });
                },
                fail: (result) => {
                    Message['info'](result.errorMsg);
                }
            });
        }
    }

    /**
     * 显示密码
     * 
     * @memberOf Login
     */
    _handleShowPassChange() {
        this.setState({
            showPass: !this.state.showPass
        });
    }
}