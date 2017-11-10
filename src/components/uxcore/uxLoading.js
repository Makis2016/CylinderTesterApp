import React from 'react';
import Mask from 'uxcore-table/build/Mask';

/**
 * 等待loading界面
 * 
 * @export
 * @class UxLoading
 * @extends {React.Component}
 */
export default class UxLoading extends React.Component {
    static propTypes = {
        showMask: React.PropTypes.bool,
        loadingText: React.PropTypes.string
    }

    static defaultProps = {
        showMask: true,
        loadingText: 'loading'
    }

    render() {
        return (
            <Mask visible={this.props.showMask} text={this.props.loadingText} />
        );
    }
}