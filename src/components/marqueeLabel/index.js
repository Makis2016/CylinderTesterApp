import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './marqueeLabel.less';

export default class MarqueeLabel extends Component {

    static propTypes = {
        text: React.PropTypes.string,
        width: React.PropTypes.number,
        end: React.PropTypes.string
    }

    static defaultProps = {
        text: '',
        width: 100,
        end: '0'
    }

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            textEnd: '',
            end: this.props.end,
            animatedWidth: 0
        };

        this._marqueeTimer = null;
    }

    componentDidMount() {
        this.scrollImgLeft();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.text.length != nextProps.text.length) {
            this.setState({
                end: '0',
                animatedWidth: 0,
                textEnd: ''
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.text.length != prevProps.text.length) {
            clearTimeout(this._marqueeTimer);
            this.scrollImgLeft();
        }
    }

    render() {

        return (
            <div className='gongao'>
                <div style={{ 'position': 'relative', 'right': this.state.animatedWidth, width: this.props.width, height: 30, margin: '0 auto', whiteSpace: 'nowrap' }} ref="scrollDiv" className='scroll_div'>
                    {
                        this.state.end == '0' ?
                            <div ref='scrollBegin' className='scroll_begin'>
                                {this.props.text}
                            </div> :
                            <div ref='scrollBegin' className='scroll_begin  flex flex-direction-row'>
                                {this.props.text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>

                    }
                    {
                        this.state.end == '0' ? <div ref='scrollEnd' className='scroll_end'>{this.state.textEnd}</div> :
                            <div ref='scrollEnd' className='scroll_end  flex flex-direction-row'>{this.state.textEnd}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    }
                </div>

            </div>
        );
    }

    scrollImgLeft() {
        const scrollBegin = ReactDOM.findDOMNode(this.refs.scrollBegin);
        const scrollDiv = ReactDOM.findDOMNode(this.refs.scrollDiv);

        if (scrollBegin.offsetWidth > scrollDiv.offsetWidth) {
            this._marqueeTimer = setInterval(() => this.marquee(), 100);
            this.setState({
                textEnd: this.props.text,
                end: '1'
            });
        } else {
            this.setState({
                end: '0'
            });
        }
    }


    marquee() {
        const scrollEnd = ReactDOM.findDOMNode(this.refs.scrollEnd);
        const scrollDiv = ReactDOM.findDOMNode(this.refs.scrollDiv);
        const scrollBegin = ReactDOM.findDOMNode(this.refs.scrollBegin);
        if (scrollEnd != null && scrollBegin != null && scrollDiv != null) {
            if (scrollEnd.offsetWidth - this.state.animatedWidth <= 0) {
                // scrollDiv.scrollLeft -= scrollBegin.offsetWidth;
                let animatedWidth = this.state.animatedWidth;
                animatedWidth -= scrollBegin.offsetWidth;
                this.setState({
                    animatedWidth
                });
            }
            else {
                // scrollDiv.scrollLeft++;
                let animatedWidth = this.state.animatedWidth;
                animatedWidth++;
                this.setState({
                    animatedWidth
                });
            }
        }
    }
}
