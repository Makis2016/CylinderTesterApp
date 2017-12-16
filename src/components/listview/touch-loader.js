'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./touch-loader.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATS = {
    init: '',
    pulling: 'pulling',
    enough: 'pulling enough',
    refreshing: 'refreshing',
    refreshed: 'refreshed',
    reset: 'reset',

    loading: 'loading' // loading more
};

// pull to refresh
// tap bottom to load more
exports.default = _react2.default.createClass({
    displayName: 'react-touch-loader',
    getInitialState: function getInitialState() {
        return {
            loaderState: STATS.init,
            pullHeight: 0,
            progressed: 0
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            distanceToRefresh: 60,
            distanceEndToRefresh: 50
        };
    },
    setInitialTouch: function setInitialTouch(touch) {
        this._initialTouch = {
            clientY: touch.clientY
        };
    },
    calculateDistance: function calculateDistance(touch) {
        return touch.clientY - this._initialTouch.clientY;
    },

    // 拖拽的缓动公式 - easeOutSine
    easing: function easing(distance) {
        // t: current time, b: begInnIng value, c: change In value, d: duration
        var t = distance;
        var b = 0;
        var d = screen.availHeight; // 允许拖拽的最大距离
        var c = d / 2.5; // 提示标签最大有效拖拽距离

        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    canRefresh: function canRefresh() {
        return this.props.onRefresh && [STATS.refreshing, STATS.loading].indexOf(this.state.loaderState) < 0;
    },
    touchStart: function touchStart(e) {
        if (!this.canRefresh()) return;
        if (e.touches.length == 1) this._initialTouch = {
            clientY: e.touches[0].clientY,
            scrollTop: this.refs.panel.scrollTop,
            upFlag:false
        };
    },
    touchMove: function touchMove(e) {
        if (!this.canRefresh()) return;
        var scrollTop = this.refs.panel.scrollTop;
        if (scrollTop == 0) {
            scrollTop = this.refs.panel.getBoundingClientRect().top;
        }
        
        var distance = this.calculateDistance(e.touches[0]);
        if (distance > 0 && scrollTop >= -1 && !this._initialTouch.upFlag) {
            var pullDistance = distance - this._initialTouch.scrollTop;
            if (pullDistance < 0) {
                // 修复webview滚动过程中touchstart时计算panel.scrollTop不准
                pullDistance = 0;
                this._initialTouch.scrollTop = distance;
            }
            var pullHeight = this.easing(pullDistance);
            if (pullHeight) e.preventDefault(); // 减弱滚动

            this.setState({
                loaderState: pullHeight > this.props.distanceToRefresh ? STATS.enough : STATS.pulling,
                pullHeight: pullHeight
            });
        } else {
            this._initialTouch.upFlag = true;
        }
    },
    touchEnd: function touchEnd() {
        if (!this.canRefresh()) return;
        var endState = {
            loaderState: STATS.reset,
            pullHeight: 0
        };

        if (this.state.loaderState == STATS.enough) {
            // refreshing
            this.setState({
                loaderState: STATS.refreshing,
                pullHeight: 0
            });

            // trigger refresh action
            this.props.onRefresh(function () {
                // resove
                this.setState({
                    loaderState: STATS.refreshed,
                    pullHeight: 0
                });
                let thiz = this;
                setTimeout(function() {
                    var newState = {};
                    newState.loaderState = STATS.init;
                    newState.progressed = 1;
                    thiz.setState(newState);
                }, 1000);

            }.bind(this), function () {
                // reject
                this.setState(endState); // reset
            }.bind(this));
        } else this.setState(endState); // reset
    },
    loadMore: function loadMore() {
        this.setState({ loaderState: STATS.loading });
        this.props.onLoadMore(function () {
            // resolve
            this.setState({ loaderState: STATS.init });
        }.bind(this));
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.initializing < 2) this.setState({
            progressed: 0 // reset progress animation state
        });
    },
    animationEnd: function animationEnd() {
        var newState = {};

        if (this.state.loaderState == STATS.refreshed) newState.loaderState = STATS.init;
        if (this.props.initializing > 1) newState.progressed = 1;

        this.setState(newState);
    },
    render: function render() {
        var _props = this.props;
        var className = _props.className;
        var initializing = _props.initializing;
        var _state = this.state;
        var loaderState = _state.loaderState;
        var pullHeight = _state.pullHeight;
        var progressed = _state.progressed;

        var style = pullHeight ? {
            WebkitTransform: 'translate3d(0,' + pullHeight + 'px,0)'
        } : null;

        var progressClassName = '';
        if (!progressed) {
            // if (initializing > 0) progressClassName += ' tloader-progress';
            if (initializing > 1) progressClassName += ' ed';
        }

        let flesh;
        if (_props.showFresh)
            flesh = _react2.default.createElement(
                'div',
                { className: 'tloader-symbol' },
                _react2.default.createElement(
                    'div',
                    { className: 'tloader-msg' },
                    _react2.default.createElement('i', null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'tloader-loading' },
                    _react2.default.createElement('i', { className: 'ui-loading' })
                )
            );

        return _react2.default.createElement(
            'div',
            {
                ref: 'panelContainer',
                className: 'tloader state-' + loaderState + ' ' + className + progressClassName,
                onTouchStart: this.touchStart,
                onTouchMove: this.touchMove,
                onTouchEnd: this.touchEnd,
                onAnimationEnd: this.animationEnd
            },
            flesh,
            _react2.default.createElement(
                'div',
                { className: 'tloader-body', ref: 'panel', style: style },
                this.props.children
            )
        );
    }
});