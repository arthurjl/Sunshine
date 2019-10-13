import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import MorseButton from '../components/MorseButton.js';
import InputScreen from '../components/InputScreen.js';

import GLOBALS from '../constants/Globals.js';


export default class MorsePanel extends React.Component {
  state = {
    translatedCode: {
      code: '',
      morseCode: '',
      correct: true
    },
    timerID: '',
  }

  sendCode = (code) => {
    clearTimeout(this.state.timerID);

    this.setState(prevState => {

      const newCode = prevState.translatedCode.morseCode + code;
      
      const newTimerID = setTimeout(() => this.displayTranslate(newCode), GLOBALS.TIME_UNTIL_DISPLAY);

      const newState = {
        ...prevState,
        translatedCode: {...prevState.translatedCode, morseCode: newCode},
        timerID: newTimerID,
      }

      return {...newState};
    });
  }

  displayTranslate = (code) => {
    const translation = this.findValue(code);
    const correct = this.props.isCorrect(translation);

    this.setState(prevState => {
      return {
        ...prevState,
        translatedCode: {...prevState.translatedCode, code: translation, morseCode: '', correct: correct},
      };
    });

    this.props.translationAction(translation);
      
    setTimeout(() => this.setState(prevState => {
      return {...prevState, translatedCode: {...prevState.translatedCode, code: ''}};
    }), GLOBALS.TIME_DISPLAYED);
  }


  findValue = (code) => {
    // console.log("Looking for code: " + code);
    if (GLOBALS.CODE.hasOwnProperty(code)) {
      // console.log("new code is a letter: " + GLOBALS.CODE[code]);
      return GLOBALS.CODE[code];
    } else {
      return '{}';
    }
  }

  render() {
    return (

      <View style={styles.inputContainer}>
        <View style={styles.codeScreen}>
          <InputScreen display={this.state.translatedCode} />            
        </View>
        <View style={styles.buttonsContainer}>
          <MorseButton morseValue='.' sendCode={this.sendCode} backgroundColor='#E5D352'/>
          <MorseButton morseValue='-' sendCode={this.sendCode} backgroundColor='#D9E76C'/>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flex: 5,
    backgroundColor: 'white'
  },
  inputContainer: {
    alignSelf: 'stretch',
    flex: 2,
    borderTopColor: '#bbb',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  codeScreen: {
    flex: 1,
    alignSelf: 'stretch',
  }
});

