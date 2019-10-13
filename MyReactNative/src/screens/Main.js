import React from "react";
import Swiper from "react-native-web-swiper";

import WeatherScreen from './WeatherScreen.js';
import MusicScreen from './MusicScreen.js';

import {
  Text,
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  Image,
  Dimensions,
} from 'react-native';



export default class Screen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Swiper
                  loop={false}
                  showsPagination={false}
                >
                    <View style={[styles.slideContainer,styles.slide1]}>
                        <WeatherScreen weather="sunny"/>
                    </View>
                    <View style={[styles.slideContainer,styles.slide3]}>
                        <MusicScreen/>
                    </View>
                </Swiper>
            </View>
        )
    }
}

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    slideContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: deviceWidth
    },

});