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


export default class MusicScreen extends React.Component {


  render() {

    return (
      <LinearGradient 
        colors={['#AEAFAF', '#C2C2C2', '#C2C2C2', '#2F373F']}
        style={styles.container}
      >

        <View style={styles.umbrellaContainer}>

        </View>

        <View style={styles.musicPlayerContainer}>

        </View>

      </LinearGradient>
    );
  }
}

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },


  umbrellaContainer: {
    flex: 2,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
  },


  musicPlayerContainer: {
    flex: 1,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },

  iconSize: {
    width: 200,
    height: 200
  },

  weather: {


  }


});
