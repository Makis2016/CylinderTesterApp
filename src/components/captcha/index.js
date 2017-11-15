import React from 'react';
import { Host } from '../../host';
import { requestAjax } from '../../utils/requestUtils';

export default class Captcha extends React.Component {
    static propTypes = {
        code: React.PropTypes.string // 验证码
    }

    constructor(props) {
        super(props);

        this.state = {
            captcha: ''
        };

        this._clickCaptcha();
    }


    render() {
        return (
            <div style={{ cursor: 'pointer', width: 100, height: 35,lineHeight:'35px',fontSize:'xx-large',background: 'linear-gradient(to right, #DCDAB7,#A68E77,#D0D4B6,#716253)' }} onClick={() => this._clickCaptcha()}>
                {this.state.captcha}
            </div>
        );
    }



    _clickCaptcha() {
        requestAjax({
            url: 'captcha',
            success: (result) => {
                this.setState({
                    captcha: result.content.data
                });
            },
            fail: () => {
                this.setState({
                    captcha: '加载失败'
                });
            }
        });
    }
}
