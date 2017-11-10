
import React from 'react';
import PullToRefreshListView from './pullToRefreshListView';

/**
 * 缓存数据列表
 */
export default class CacheableListView extends PullToRefreshListView {
    static propTypes = {
        key: React.PropTypes.string, // KEY
        onFetch: React.PropTypes.func // 获取数据函数
    };

    /**
     * Creates an instance of CacheableListView.
     *
     * @param {any} props 参数
     */
    constructor(props) {
        super(props);

        this.state.onFetch = (page, resolve, reject) => this._onFetch(page, resolve, reject);
    }

    _onFetch(page, resolve, reject) {
        if (typeof this.props.onFetch !== 'undefined')
            return this.props.onFetch(page, resolve, reject);

        // 获取网络数据
        fetch(this.props.url + '/' + this.props.key + '/' + page)
            .then((response) => response.json())
            .then((json) => resolve(json.data))
            .catch(() => {
                // TODO: toast
                resolve([]);
            });
    }
}