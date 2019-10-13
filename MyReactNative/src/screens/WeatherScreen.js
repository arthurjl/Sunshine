import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  Image,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';


export default class WeatherScreen extends React.Component {


  render() {
    return (
      <LinearGradient 
        colors={weather.sunny}
        style={styles.container}
      >
         
          <Image source={require('../assets/Images/sun.png')}  style={styles.iconSize} />

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconSize: {
    width: 200,
    height: 200
  },

  weather: {
    sunny: ['#7DBCDE', '#01BFFF', '#7DBCDE'],

  }


});
