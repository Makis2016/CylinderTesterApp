import React, { PropTypes } from 'react';
import Tabs, { TabPane } from 'uxcore-tabs';
import classnames from 'classnames';
import assign from 'object-assign';
import RcTabs from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import UxScrollableInkTabBar from './uxScrollableInkTabBar';

const TYPESUFFIX = {
    large: 'lg',
    small: 'sm',
    filter: 'filter',
    brick: 'brick',
    open: 'open',
};

export default class UxTabs extends Tabs {

    render() {
        const { props } = this;
        const { onTabClick, extraContent, animated, prefixCls } = props;
        return (
            <RcTabs
                {...props}
                className={classnames({
                    [`${prefixCls}-${TYPESUFFIX[props.type]}`]: true,
                    [props.className]: !!props.className,
                    'no-csstransitions no-flexbox': this.supportTransition.length === 0,
                })}
                renderTabBar={() => (
                    <UxScrollableInkTabBar
                        extraContent={extraContent}
                        onTabClick={onTabClick}
                    />
                )}
                renderTabContent={() => <TabContent animated={animated} />}
            />
        );
    }
}

