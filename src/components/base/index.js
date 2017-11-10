import { Component } from 'react';

/**
 * 基础组件类型
 */
export default class BaseComponent extends Component {
    constructor(props) {
        super(props);

        this.mDialogWidth = document.body.clientWidth * 800/1366;

    }
}