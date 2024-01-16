/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Timer = ({ time }) => {
    const formattedTime = `${Math.floor(time / 60)
        .toString()
        .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
    return (
        <View style={styles.timerStyle}>
            <Text style={styles.formatTime}>{formattedTime}</Text>
        </View>
    );

};


const styles = StyleSheet.create({
    timerStyle: {
        width: '90%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 2000,
        backgroundColor: 'white',
    },
    formatTime: {
        fontSize: 80,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
});

export default Timer;