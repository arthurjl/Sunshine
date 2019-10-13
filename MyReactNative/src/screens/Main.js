import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native';

import WeatherScreen from './WeatherScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <WeatherScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
