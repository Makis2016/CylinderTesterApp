
import React, { Component } from 'react';

/**
 * 首页提示色块条
 */
export default class ColorBar extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        return (
            <div style={styles.bar} className='flex ie9-colorBar'>
                <label style={styles.block}>故障：</label>
                <div style={styles.color1}></div>
                <label style={styles.block}>充电：</label>
                <div style={styles.color2}></div>
                <label style={styles.block}>放电：</label>
                <div style={styles.color3}></div>
                <label style={styles.block}>脉冲：</label>
                <div style={styles.color4}></div>
                <label style={styles.block}>静置：</label>
                <div style={styles.color5}></div>
                <label style={styles.block}>待机：</label>
                <div style={styles.color6}></div>
                <label style={styles.block}>暂停：</label>
                <div style={styles.color7}></div>
            </div>
        );
    }
}

const styles = {
    bar: {
        paddingTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    block: {
        height: 15,
        paddingLeft: 22
    },
    color1: {
        width: 50,
        height: 15,
        marginTop: 5,
        backgroundColor: '#E12727'
    },
    color2: {
        width: 50,
        height: 15,
        marginTop: 5,
        backgroundColor: '#29AB4B'
    },
    color3: {
        width: 50,
        height: 15,
        marginTop: 5,
        backgroundColor: '#E16D27'
    },
    color4: {
        width: 50,
        height: 15,
        marginTop: 5,
        backgroundColor: '#1FB7A0'
    },
    color5: {
        width: 50,
        height: 15,
        marginTop: 5,
        backgroundColor: '#1F8FB7'
    },
    color6: {
        width: 50,
        height: 15,
        marginTop: 5,
        backgroundColor: '#2CD4D2'
    },
    color7: {
        width: 50,
        height: 15,
        marginTop: 5,
        backgroundColor: '#E4E621'
    }
};