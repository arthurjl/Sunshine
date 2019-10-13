import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Alert
} from 'react-native';

import MorsePanel from '../components/MorsePanel.js';

import GLOBALS from '../constants/Globals.js';


export default class HomePage extends React.Component {
  componentDidMount = () => {
    Alert.alert(
      'This App is a Work in Progress',
      'Some features and functionality not yet complete: Help Page, Design, Sound, Option for speed, ...',
      [
        {text: 'Ok'},
      ],

    );
  }

  isCorrect = (translation) => {
    return translation === 'p' || translation === 'o';
  }

  translationAction = (translation) => {
    if (translation === 'p') {
      this.props.navigation.navigate('Levels');
    } else if (translation === 'o') {
      this.props.navigation.navigate('Options');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Morse</Text>
    
          {generateOption('play')}
          {generateOption('help')}
          {generateOption('options')}
        </View>

        <MorsePanel
          isCorrect={(translation) => this.isCorrect(translation)} 
          translationAction={(translation) => this.translationAction(translation)}
        />

      </View>
    );
  }
}

const generateOption = (word) => {
  let translation = GLOBALS.LETTER[word.charAt(0)];
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
    }}>
      
      <Text style={{color: 'slategrey', fontSize: 50, paddingLeft: 40}}>
        <Text style={{fontWeight: "bold", textTransform: 'capitalize', fontSize: 60, color: 'lightslategrey'}}>
          {word.charAt(0)}
        </Text>
        {word.substring(1)}
      </Text>
      <Text style={{fontSize: 50, color: 'lightslategrey', paddingRight: 40}}>{translation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'American Typewriter',
    color: 'black',
    fontSize: 100
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topContainer: {
    alignSelf: 'stretch',
    flex: 5,
    backgroundColor: '#F2EFEA',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

