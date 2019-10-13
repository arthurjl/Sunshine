import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GLOBALS from '../constants/Globals.js';

const InputScreen = ({display}) => {
  let correctStyle = {};
  if (display.code && display.correct === true) {
    correctStyle = styles.correct;
  }
  if (display.code && display.correct == false) {
    correctStyle = styles.incorrect;
  }
  return (
    <Text 
      style = {[styles.text, correctStyle]}
    >
      {display.code ? display.code : display.morseCode}
    </Text>
  );
};

export default InputScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    alignSelf: 'stretch'
  },
  correct: {
    color: 'green',
    fontWeight: 'bold',
  },
  incorrect: {
    color: 'red',
    fontWeight: 'bold',
  }
});