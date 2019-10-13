import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GLOBALS from '../constants/Globals.js';

const QuestionLetter = ({letter, shouldDisplayCode, isCompleted}) => {
  return (
    <View style = {[isCompleted ? styles.completed : styles.notCompleted, styles.questionContainer]}>
      <Text style = {[styles.letter, isCompleted ? styles.completed : styles.notCompleted]}>{letter}</Text>
      <Text style = {styles.code}>{shouldDisplayCode ? GLOBALS.LETTER[letter] : ' '}</Text>
    </View>
  );
};

export default QuestionLetter;

const styles = StyleSheet.create({
  questionContainer: {
    paddingVertical: 25,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
    width: 175,
  },
  letter: {
    fontSize: 100,
    color: 'white',
    textAlign: 'center',
  },
  code: {
    fontSize: 70,
    color: 'silver',
    textAlign: 'center',
  },
  completed: {
    backgroundColor: '#5FAD56',
    color: 'silver'
  },
  notCompleted : {
    backgroundColor: '#F78154'
  }
});