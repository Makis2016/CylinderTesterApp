const Notification = require('rc-notification');
const classnames = require('classnames');
const React = require('react');

const defaultDuration = 1.5;
let messageInstance;
let key = 1;
let prefixCls = 'kuma-message';
let transitionName = 'message-moveUp';
let className;
let getContainer;
let multipleInstance = true;

function createMessageInstance() {
  if (messageInstance && messageInstance.destroy) {
    messageInstance.destroy();
  }
  messageInstance = Notification.newInstance({
    prefixCls,
    className,
    transitionName,
    getContainer,
    style: {
      left: '50%',
    }, // 覆盖原来的样式
  });
  return messageInstance;
}

function notice(content, duration = defaultDuration, type, onClose) {
  const iconClass = ({
    info: 'kuma-icon kuma-icon-information',
    success: 'kuma-icon kuma-icon-success',
    error: 'kuma-icon kuma-icon-error',
    loading: 'kuma-loading',
  })[type];
  const instance = multipleInstance && messageInstance ? messageInstance : createMessageInstance();
  instance.notice({
    key,
    duration,
    style: {
      right: '50%',
    },
    content: (
      <div
        className={classnames({
          [`${prefixCls}-container ${prefixCls}-container-${type}`]: true,
          'fn-clear': true,
        })}
      >
        <div className={'dialog-mask'}></div>
        <a href="javascript:void(0)" className="kuma-load-more-status" style={{ position: 'relative', zIndex: 1500 }}><i className={iconClass} ></i></a>
        <div className={`${prefixCls}-content`}>
          {content}
        </div>
      </div>
    ),
    onClose,
  });

  return (function () {
    const target = key;
    key += 1;
    return function () {
      instance.removeNotice(target);
    };
  }());
}

module.exports = {
  info(content, duration, onClose) {
    return notice(content, duration, 'info', onClose);
  },
  success(content, duration, onClose) {
    return notice(content, duration, 'success', onClose);
  },
  error(content, duration, onClose) {
    return notice(content, duration, 'error', onClose);
  },
  loading(content, duration, onClose) {
    return notice(content, duration, 'loading', onClose);
  },
  clear() {
    createMessageInstance();
  },
  config(options) {
    if (options) {
      prefixCls = options.prefixCls || prefixCls;
      transitionName = options.transitionName || transitionName;
      className = options.className || className;
      multipleInstance = options.multipleInstance !== false;
      getContainer = options.getContainer;
    }
  },
};
