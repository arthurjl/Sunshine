import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import GLOBALS from '../constants/Globals.js';

export default class MorseButton extends React.Component {
  render() {
    const result = (
      <TouchableOpacity ref="touch" style={[styles.buttonContainer, {backgroundColor: this.props.backgroundColor}]} onPress={() => this.props.sendCode(this.props.morseValue)}>
        <Text style={styles.buttonText}>
          {this.props.morseValue === '.' ? GLOBALS.MORSE.DIT : (this.props.morseValue === '-' ? GLOBALS.MORSE.DAH : 'error')}
        </Text>
      </TouchableOpacity>
    );

    // this.refs.touch.setOpacityTo(50);
    return result;
  }

  
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    flex: 1,
  },
  buttonText: {
    fontSize: 100,
    fontWeight: 'bold'
  }
});