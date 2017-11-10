import React, { Component } from 'react';

export default class AreaCell extends Component {

    static propTypes = {
        area: React.PropTypes.object.isRequired // 区域信息
    };

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={styles.cell} >
                <div style={styles.areaName}>
                    {this.props.area.areaName}
                </div>
            </div>
        );
    }
}

const styles = {
    cell: {
        width: 140,
        height: 140,
        cursor: 'pointer',
        margin: '0 15px 10px 0',
        float: 'left',
        borderRadius: 10,
        fontSize: '15pt',
        padding: 10,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#ffffff',
        border: '1px solid transparen',
        boxShadow: '2px 2px 2px transparent',
        backgroundImage: 'url("./resources/images/map.png")'
    },
    areaName: {
        fontSize: 12,
        fontWeight: 600,
        textAlign: 'center',
        marginTop: '80%'
    }
};