import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Home from './home';
import RealTime from './routes/business/realtime/';
import TestInfo from './routes/business/realtime/deviceInfo';
import TestEndInfo from './routes/business/realtime/testEndInfo';
import History from './routes/business/history';
import Alarm from './routes/business/alarm';
import Login from './routes/business/login';

/**
 * 路由配置类
 */
export default class RootRouters extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={hashHistory} >
                <Route name='home' path="/" component={Home} >
                    <Route path="/realTime" component={RealTime} />
                    <Route path="/deviceInfo" component={TestInfo} id={0}/>
                    <Route path="/report" component={History} />
                    <Route path="/alarm" component={Alarm} />                                                            
                    <Route path="/testEndInfo" component={TestEndInfo} />     
                    <Route path="/login" component={Login} />     
                </Route>
            </Router>
        );
    }
}