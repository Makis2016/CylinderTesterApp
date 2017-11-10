import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }


export default class UxScrollableInkTabBar extends ScrollableInkTabBar {
    render() {
        var inkBarNode = this.getInkBarNode();
        var tabs = this.getTabss();
        var scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
        return this.getRootNode(scrollbarNode);
    }

    getTabss() {
        var _this = this;
        var props = this.props;
        var children = props.panels;
        var activeKey = props.activeKey;
        var rst = [];
        var prefixCls = props.prefixCls;

        _react2['default'].Children.forEach(children, function (child) {
            if (!child) {
                return;
            }
            var key = child.key;
            var cls = activeKey === key ? prefixCls + '-tab-active' : '';
            cls += ' ' + prefixCls + '-tab';
            var events = {};
            if (child.props.disabled) {
                cls += ' ' + prefixCls + '-tab-disabled';
            } else {
                events = {
                    onClick: _this.onTabClick.bind(_this, key)
                };
            }
            var ref = {};
            if (activeKey === key) {
                ref.ref = 'activeTab';
            }
            rst.push(_react2['default'].createElement(
                'div',
                (0, _extends3['default'])({
                    role: 'tab',
                    'aria-disabled': child.props.disabled ? 'true' : 'false',
                    'aria-selected': activeKey === key ? 'true' : 'false'
                }, events, {
                        className: cls,
                        key: key
                    }, ref),
                child.props.tab,
                _react2['default'].createElement('span',
                {
                    onClick:(e)=>child.props.remove(e),
                    style:{marginLeft:5}
                },'x')
            ));
        });

        return rst;
    }
}