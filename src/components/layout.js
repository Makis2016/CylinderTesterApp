
import React, { Component } from 'react';
import './layout.less';

export class HorizontalLinearLayout extends Component {
    static propTypes = {
        children: React.PropTypes.any,
        className: React.PropTypes.string
    };

    static defaultProps = {
        className: 'MobileUI-LinearLayout-Horizontal'
    }

    render() {
        return (
            <div {...this.props} className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

export class VerticalLinearLayout extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div {...this.props} className="MobileUI-LinearLayout-Vertical">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayout extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div {...this.props} className="MobileUI-RelativeLayout">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayoutInParentLeftTop extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div className="MobileUI-RelativeLayout-InParentLeftTop">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayoutInParentRightTop extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div className="MobileUI-RelativeLayout-InParentRightTop">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayoutInParentLeftBottom extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div {...this.props} className="MobileUI-RelativeLayout-InParentLeftBottom">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayoutInParentRightBottom extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div {...this.props} className="MobileUI-RelativeLayout-InParentRightBottom">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayoutInParentCenter extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div className="MobileUI-RelativeLayout-InParentCenter">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayoutInParentTopCenter extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div className="MobileUI-RelativeLayout-InParentTopCenter">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayoutInParentLeftCenter extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div className="MobileUI-RelativeLayout-InParentLeftCenter">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayoutInParentRightCenter extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div className="MobileUI-RelativeLayout-InParentRightCenter">
                {this.props.children}
            </div>
        );
    }
}

export class RelativeLayoutInParentBottomCenter extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div className="MobileUI-RelativeLayout-InParentBottomCenter">
                {this.props.children}
            </div>
        );
    }
}

export class FrameLayout extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div className="MobileUI-FrameLayout">
                {this.props.children}
            </div>
        );
    }
}

export class CoverLayout extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return (
            <div className="MobileUI-CoverLayout">
                {this.props.children}
            </div>
        );
    }
}