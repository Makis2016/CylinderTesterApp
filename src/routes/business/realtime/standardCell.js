import React, { Component } from 'react';
import { requestAjax } from '../../../utils/requestUtils';

/**
 * 标准测试 4个蒸发率显示单元格
 */
export default class StandardCell extends Component {
    static propTypes = {
        cylinderId: React.PropTypes.number
    };

    static defaultProps = {
        cylinderId: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            clientWidth: document.body.clientWidth,
            standData: {
                a0: 0,
                a1: 0,
                a2: 0,
                errorRate: 0
            }
        };

        // 获取三个静态蒸发率 一个误差率
        this._getStandardStaticRate();
        this.mLoadingCell = false;
        this.mTimerCell = setInterval(() => {
            if (!this.mLoadingCell) {
                this._getStandardStaticRate();
            }
        }, 1000);
    }

    render() {
        let textFontSize = 15;
        return (
            <div className='flex flex-direction-column'>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>第1个24小时静态蒸发率：</div>
                        <div style={{ fontSize: textFontSize }}>{this.state.standData.a0 + '%/d'}</div>
                    </div>
                     <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>第2个24小时静态蒸发率：</div>
                        <div style={{ fontSize: textFontSize }}>{this.state.standData.a1 + '%/d'}</div>
                    </div>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>第3个24小时静态蒸发率：</div>
                        <div style={{ fontSize: textFontSize }}>{this.state.standData.a2 + '%/d'}</div>
                    </div>
                    <div className='flex flex-direction-row' style={{ marginLeft: 20 }}>
                        <div style={{ fontSize: textFontSize }}>第2个24小时采集误差率：</div>
                        <div style={{ fontSize: textFontSize }}>{this.state.standData.errorRate}%</div>
                    </div>
            </div>
        );
    }

    /**
     * 获取标准测试 3个24小时静态蒸发率、一个误差率
     */
    _getStandardStaticRate() {
        if (this.props.cylinderId && this.props.cylinderId != 0) {
            this.mLoadingCell = true;
            requestAjax({
                controller: 'cylinder',
                params: { cylinderId: this.props.cylinderId },
                url: 'getStandardStaticRate',
                success: (result) => {
                    this.setState({
                        standData: result.content.data
                    }, () => {
                        this.mLoadingCell = false;
                    });
                },
                fail: () => {
                    this.mLoadingCell = false;
                }
            },false);
        }

    }
}