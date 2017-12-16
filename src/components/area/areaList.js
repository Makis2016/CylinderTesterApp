import React, { Component } from 'react';
import Select, { Option } from 'uxcore-select2';
import { requestAjax } from '../../utils/requestUtils';

export default class AreaList extends Component {

    static propTypes = {
        width: React.PropTypes.number,
        defaultValues:React.PropTypes.any
    };

    static defaultProps = {
        width: 100
    }

    constructor(props) {
        super(props);
        this.state = ({
            areaList: [],
            secondCitys: [],
            threeCitys: [],
            firstCity: '',
            secondCity: '',
            threeCity: ''
        });

        this._initData();
    }

    render() {
        let secondCityDisplay = 'block';
        let threeCityDisplay = 'block';
        let firstCityOptions = [];
        firstCityOptions.push(<Option key={0} value={''}>{'全部'}</Option>);
        let secondCityOptions = [];
        secondCityOptions.push(<Option key={0} value={''}>{'全部'}</Option>);
        let threeCityOptions = [];
        threeCityOptions.push(<Option key={0} value={''}>{'全部'}</Option>);

        this.state.areaList.map((item, index) => {
            if (item.pid == 0) {
                firstCityOptions.push(<Option key={index + 1} value={item.id}>{item.areaName}</Option>);
            }
        });

        if (!this.state.firstCity) {
            secondCityDisplay = 'none';
            threeCityDisplay = 'none';
        } else {
            // 第二个列表
            this.state.areaList.map((item) => {
                if (item.pid == this.state.firstCity) {
                    secondCityOptions.push(<Option key={item.id}>{item.areaName}</Option>);
                }
            });

            if (!this.state.secondCity) {
                threeCityDisplay = 'none';
            } else {
                // 第三个列表
                this.state.areaList.map((item) => {
                    if (item.pid == this.state.secondCity) {
                        threeCityOptions.push(<Option key={item.id}>{item.areaName}</Option>);
                    }
                });
            }
        }

        return (<div className='flex flex-direction-row'>
            <div>
                <Select showSearch={false} defaultValue={''} style={{ width: this.props.width }} onChange={(value) => this._onFirstCityChange(value)} dropdownClassName="kuma-select2-selected-has-icon">
                    {firstCityOptions}
                </Select>
            </div>
            <div>
                <Select showSearch={false} value={this.state.secondCity} style={{ width: this.props.width, display: secondCityDisplay, marginLeft: 10 }} onChange={(value) => this._onSecondCityChange(value)} dropdownClassName="kuma-select2-selected-has-icon">
                    {secondCityOptions}
                </Select>
            </div>
            <div>
                <Select showSearch={false} value={this.state.threeCity} style={{ width: this.props.width, display: threeCityDisplay, marginLeft: 10 }} onChange={(value) => this._onThreeCityChange(value)} dropdownClassName="kuma-select2-selected-has-icon">
                    {threeCityOptions}
                </Select>
            </div>
        </div>);
    }

    _onFirstCityChange(value) {
        this.setState({
            firstCity: value,
            secondCity: '',
            threeCity: ''
        });
    }

    _onSecondCityChange(value) {
        this.setState({
            secondCity: value,
            threeCity: ''
        });
    }

    _onThreeCityChange(value) {
        this.setState({
            threeCity: value
        });
    }

    _initData() {
        requestAjax({
            url: 'selectAllArea',
            success: (result) => {
                this.setState({
                    areaList: result.content.data
                });
            }
        });
    }

    getValue() {
        if (this.state.threeCity != '') {
            return this.state.threeCity;
        } else if (this.state.secondCity != '') {
            return this.state.secondCity;
        } else if(this.state.firstCity != '') {
            return this.state.firstCity;
        }
    }
}