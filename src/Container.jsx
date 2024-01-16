/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-bitwise */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
import Timer from './Timer';
import rainImage from './assets/rain.png';
import wavesImage from './assets/waves.png';
import whiteNoiseImage from './assets/whiteNoise.png';


const options = ['Pomodoro', 'Short Break', 'Long Break'];
Sound.setCategory('Playback');

const Container = () => {

    const [time, setTime] = useState(60 * 25); // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const [isWorking, setIsWorking] = useState(true);
    const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK');


    const rainSound = new Sound('rain.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.error('Failed to load rain sound', error);
            return;
        }
        // Play the sound with an onEnd callback
        rainSound.play();
    });

    const oceanSound = new Sound('ocean.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.error('Failed to load ocean sound', error);
            return;
        }
        // Play the sound with an onEnd callback
        oceanSound.play();
    });

    const whiteNoiseSound = new Sound('whitenoise.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.error('Failed to load white noise sound', error);
            return;
        }
        // Play the sound with an onEnd callback
        whiteNoiseSound.play();
    });

    const handleStartStop = () => {
        setIsActive((prev) => !prev);

        let watchStartStop = new Sound('done.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error('Failed to load ocean sound', error);
                return;
            }

            watchStartStop.play();
        });

        watchStartStop.setVolume(50);
    };

    const handlePress = (ind) => {
        const newTime = ind === 0 ? 25 : ind === 1 ? 5 : 15;
        setCurrentTime(ind);
        setTime(newTime * 60);
    };

    useEffect(() => {
        rainSound.setVolume(10);
        oceanSound.setVolume(10);
        whiteNoiseSound.setVolume(10);

        return () => {
            rainSound.stop();
            oceanSound.stop();
            whiteNoiseSound.stop();
        };
    }, []);

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        if (time === 0) {
            setIsActive(false);
            setIsWorking(!isWorking);
            setTime(isWorking ? 300 : 1500); // 5 minutes for short break, 25 minutes for pomodoro
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    return (
        <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {options.map((option, ind) => (
                    <TouchableOpacity
                        key={ind}
                        onPress={() => handlePress(ind)}
                        style={[styles.tabStyle, currentTime !== ind && { borderColor: 'transparent' }]}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'black', fontFamily: 'serif' }}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{
                width: '100%', height: '50%', flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center', marginBottom: 20,
            }}>
                <Timer time={time} />
            </View>

            <View style={{ width: '100%', height: '7%', flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                <TouchableOpacity onPress={handleStartStop} style={styles.buttonStyle}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, fontFamily: 'serif' }}>
                        {isActive ? 'STOP' : 'START'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.musicStyle}>
                <View style={{ borderWidth: 2, borderColor: 'black', padding: 10, borderRadius: 100 }}>
                    <Image source={rainImage} style={{ width: 25, height: 25 }} />
                </View>
                <View style={{ borderWidth: 2, borderColor: 'black', padding: 10, borderRadius: 100 }}>
                    <Image source={wavesImage} style={{ width: 25, height: 25 }} />
                </View>
                <View style={{ borderWidth: 2, borderColor: 'black', padding: 10, borderRadius: 100 }}>
                    <Image source={whiteNoiseImage} style={{ width: 25, height: 25 }} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabStyle: {
        width: '33%',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 10,
        padding: 5,
        borderColor: 'white',
        marginVertical: 30,
    },
    buttonStyle: {
        width: '90%',
        height: '100%',
        color: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333333',
    },
    musicStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
});

export default Container;


// const [rainVolume, setRainVolume] = useState(0);
// const [oceanVolume, setOceanVolume] = useState(0);
// const [whiteNoiseVolume, setWhiteNoiseVolume] = useState(0);

// console.log(rainVolume);


// {/* <Slider
//     style={{ width: '80%', height: 40 }}
//     minimumValue={0}
//     maximumValue={10}
//     minimumTrackTintColor="#FFFFFF"
//     maximumTrackTintColor="#000000"
//     step={1}
//     onValueChange={(value) => setRainVolume(value)}
// />  */}