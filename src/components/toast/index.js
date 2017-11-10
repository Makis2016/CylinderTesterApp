
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './toast.less';

const _messageHolder = document.createElement('div');
document.body.appendChild(_messageHolder);

export default class Message extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    duration: React.PropTypes.number,
    hasBack:React.PropTypes.bool
  };

  static defaultProps = {
    duration: 3000,
    hasBack:true
  };

  componentDidMount() {
    this.open();
    this._setAnimation();
  }

  /**
   * Open and close animations
   */
  _setAnimation() {
    setTimeout(() => {

      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(_messageHolder);
      }, 200);
    }, this.props.duration);
  }


  render() {
    const {children, duration, className,hasBack,...props} = this.props,

    classes = classNames({
      'toast-content': true,
      '$': className
    });

    const modal = hasBack?'toast-modal':'';

    return (
      <div className={modal} onClick={this.close}>
        <div ref='toast' className={classes} {...props}>
          {children}
        </div>
      </div>
    );
  }

  /**
   * Open the dialog
   */
  open() {
    let el = this.refs.toast;
    el.style.left = Math.max((document.documentElement.clientWidth - el.clientWidth) / 2) + 'px';
    el.style.top = Math.max((document.documentElement.clientHeight - el.clientHeight) / 2) + window.scrollY + 'px';
  }


  /**
   * Close the dialog
   */
  close() {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(_messageHolder);
    }, 200);
  }
}

// 弹出有背景的弹出框
export function Toast(text, duration) {
  ReactDOM.render(
    <Message duration={duration} >{text}</Message>,
    _messageHolder
  );
}

// 弹出没背景的弹出框
export function Toasts(text, duration) {
  ReactDOM.render(
    <Message duration={duration} hasBack={false}>{text}</Message>,
    _messageHolder
  );
}