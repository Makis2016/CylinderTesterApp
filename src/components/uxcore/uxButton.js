import React from 'react';
import Button from 'uxcore-button';

export default class UxButton extends Button {
    static propTypes = {
        onClick: React.PropTypes.func // 按钮点击函数
    }

    static defaultProps = {
        onClick: null
    }

    render() {
        const { children,...others } = this.props;
        return (
            <Button {...others} {...this.propTypes}>{children}</Button>
        );
    }

    onClick(){
        if (this.props.onClick)
            this.props.onClick();
    }

}