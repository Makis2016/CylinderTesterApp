import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, List } from 'antd-mobile';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.

export default class Demo extends React.Component {
    state = {
        date: now
    }
    render() {
        return (
            <div style={{width:'100%'}}>
            <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                
                <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">Date</List.Item>
                </DatePicker>
            </List>
            </div>
        );
    }
}
