import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  Image,
  Dimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';


export default class WeatherScreen extends React.Component {
  state = {
    weather: this.props.weather
  }

  render() {
    console.log(deviceWidth);
    return (
      <LinearGradient 
        colors={this.state.weather === 'sunny' ? sunny : this.state.weather === 'cloudy' ? cloudy : thunder}
        style={styles.container}
      >
        { this.state.weather === 'sunny' ? <Image source={require('../assets/Images/sun.png')}  style={styles.iconSize} /> : null}
        { this.state.weather === 'cloudy' ? <Image source={require('../assets/Images/clouds.png')}  style={styles.iconSize} /> : null}
        { this.state.weather === 'thunder' ? <Image source={require('../assets/Images/storm.png')}  style={styles.iconSize} /> : null}      

      </LinearGradient>
    );
  }
}

const sunny = ['#7DBCDE', '#01BFFF', '#7DBCDE']
const cloudy = ['#A0CEDC', '#DEE3E7', '#A0CEDC']
const thunder = ['#AEAFAF', '#C2C2C2', '#C2C2C2', '#2F373F']


const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconSize: {
    width: 200,
    height: 200,
  },

});

