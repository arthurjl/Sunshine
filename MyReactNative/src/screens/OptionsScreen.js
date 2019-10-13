import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  AsyncStorage
} from 'react-native';

import MorsePanel from '../components/MorsePanel.js';

import GLOBALS from '../constants/Globals.js';


export default class OptionsScreen extends React.Component {

  deleteAllItems = async () => {
    try {
      await AsyncStorage.removeItem('scores');
    } catch (err) {
      console.log(err);
    }
  };

  alertToClearItems = () => {
    Alert.alert(
      'Clear Items',
      'Are you sure you want to clear all items? This cannot be undone',
      [
        {text: 'No, do not clear'},
        {text: 'Yes, clear items', onPress: () => {this.deleteAllItems();}},
      ],

    );
  }

  isCorrect = (translation) => {
    return translation === 'b' || translation === 'c';
  }

  translationAction = (translation) => {
    if (translation === 'b') {
      this.props.navigation.navigate('Home');
    } else if (translation === 'c') {
      this.alertToClearItems();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Options</Text>
          {generateOption("back to home")}
          {generateOption("clear scores")}

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
      
      <Text style={{color: 'slategrey', fontSize: 30, paddingLeft: 40}}>
        <Text style={{fontWeight: "bold", textTransform: 'capitalize', fontSize: 40, color: 'lightslategrey'}}>
          {word.charAt(0)}
        </Text>
        {word.substring(1)}
      </Text>
      <Text style={{fontSize: 30, color: 'lightslategrey', paddingRight: 40}}>{translation}</Text>
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

