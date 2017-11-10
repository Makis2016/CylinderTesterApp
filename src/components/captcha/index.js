import React from 'react';
import { Host } from '../../host';


export default class Captcha extends React.Component {
    static propTypes = {
        code: React.PropTypes.string // 验证码
    }

    constructor(props) {
        super(props);

        this.state = {
            captchaUrl: Host.WEB + 'servlet/captchaCode' + '?t=' + Math.random()
        };
    }


    render() {
        return (
            <img src={this.state.captchaUrl}
                onClick={() => this._clickCaptcha()}
                style={{ cursor: 'pointer', width: 100, height: 35 }}
                alt='点击刷新'
            />
        );
    }

    _clickCaptcha() {
        let captchaUrl = Host.WEB + 'servlet/captchaCode' + '?t=' + Math.random();
        this.setState({ captchaUrl });
    }
}
