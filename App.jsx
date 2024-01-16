/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Container from './src/Container';
//'#F7DC6F'
const App = () => {
  return (
    <SafeAreaView>
      <View style={{ height: '100%', width: '100%', backgroundColor: '#F7DC6F', paddingVertical: 20 }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: 'black', fontFamily: 'serif', textAlign: 'center' }}>Pomodoro App</Text>
        <Container />
      </View>
    </SafeAreaView>
  );
};

export default App;