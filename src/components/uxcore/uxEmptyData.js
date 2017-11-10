import React from 'react';
import EmptyData from 'uxcore-empty-data';

/**
 * 统一定义空数据提示
 * 
 * @export
 * @class UxEmptyData
 * @extends {React.Component}
 */
export default class UxEmptyData extends React.Component {

    static propTypes = {
        emptyText: React.PropTypes.string
    }

    static defaultProps = {
        emptyText: '搜索不到相关内容'
    }

    render() {
        const { ...others } = this.props;
        return (
            <EmptyData {...others}><div>{this.props.emptyText}</div></EmptyData>
        );
    }
}
