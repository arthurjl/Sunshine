import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native';
import MorseButton from '../components/MorseButton.js';
import Question from '../components/Question.js';
import GLOBALS from '../constants/Globals.js';
import InputScreen from '../components/InputScreen.js';


export default class GameScreen extends React.Component {
  state = {
    translatedCode: {
      code: '',
      correct: false,
      morseCode: '',
      numWrong: 0,
    },
    timerID: '',
    questionData: this.props.navigation.state.params.questionData,
    questionIndex: 0,
    startingTime: new Date(),
    numWrong: 0,
  }

  getFlatListRef = (ref) => {
    this.flatListRef = ref;
  }

  sendCode = (code) => {
    // console.log(code);
    // this.flatListRef.scrollToEnd({animated: true}); 
    // this.flatListRef.scrollToIndex({animated: true, index: 3, viewPosition: 0.5})

    clearTimeout(this.state.timerID);

    this.setState(prevState => {

      const newCode = prevState.translatedCode.morseCode + code;
      // console.log("new code is: " + prevState.morseCode + " + " + code + " = " + newCode);
      
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
    const correct = this.state.questionData.length > this.state.questionIndex && translation === this.state.questionData[this.state.questionIndex].letter;




    this.setState(prevState => {
      if (correct) {
        const index = this.state.questionIndex + 1 >= this.state.questionData.length ? 
            this.state.questionIndex :
            this.state.questionIndex + 1;
        this.flatListRef.scrollToIndex({animated: true, index: index, viewPosition: 0.5})

        const clone = this.state.questionData.slice(0);
        clone[this.state.questionIndex] = {
          ...clone[this.state.questionIndex],
          shouldDisplayCode: true,
          isCompleted: true,
        };
        return {
          ...prevState,
          translatedCode: {correct: correct, code: translation, morseCode: '', numWrong: 0},
          questionIndex: this.state.questionIndex + 1,
          questionData: clone,
        };
      } else {
        if (prevState.translatedCode.numWrong === 3) {
          let clone = this.state.questionData.slice(0);
          clone[this.state.questionIndex] = {
            ...clone[this.state.questionIndex],
            shouldDisplayCode: true,
          }
          return {
            ...prevState,
            translatedCode: {...prevState.translatedCode, correct: correct, code: translation, morseCode: ''},
            questionData: clone,
            numWrong: prevState.numWrong + 1,
          }
        }
        return {
          ...prevState,
          translatedCode: {...prevState.translatedCode, correct: correct, code: translation, morseCode: '', numWrong: prevState.translatedCode.numWrong + 1},
          numWrong: prevState.numWrong + 1,
        };
      }
    });


    if (this.state.questionIndex >= this.state.questionData.length) {
      let endTime = new Date();
      this.props.navigation.replace('GameOver', { 
        par: this.props.navigation.state.params.par,
        time: endTime.getTime() - this.state.startingTime.getTime(),
        numWrong: this.state.numWrong,
        questionData: this.props.navigation.state.params.questionData,
        score: this.props.navigation.state.params.score,
        updateScore: (newScore) => this.props.navigation.state.params.updateScore(newScore),
        playAgain: () => this.props.navigation.state.params.playAgain(),
      });
    } else {
      setTimeout(() => this.setState(prevState => {
        return {...prevState, translatedCode: {...prevState.translatedCode, correct: false, code: ''}};
      }), GLOBALS.TIME_DISPLAYED);
    }
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
      <View style={styles.container}>
        
        <View style={styles.questionsContainer}>
          <Button
            title="Back to Levels"
            onPress={() => this.props.navigation.navigate('Levels')}
          />
          <Question questions={this.state.questionData} getRef={this.getFlatListRef} />
          
        </View>

        

        <View style={styles.inputContainer}>
          <View style={styles.codeScreen}>
              <InputScreen display={this.state.translatedCode} />            
          </View>
          <View style={styles.buttonsContainer}>
            <MorseButton morseValue='.' sendCode={this.sendCode} backgroundColor='#E5D352'/>
            <MorseButton morseValue='-' sendCode={this.sendCode} backgroundColor='#D9E76C'/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionsContainer: {
    alignSelf: 'stretch',
    flex: 5,
    backgroundColor: '#F2EFEA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flex: 5,
    backgroundColor: 'white'
  },
  inputContainer: {
    alignSelf: 'stretch',
    flex: 2,
  },
  codeScreen: {
    flex: 1,
    alignSelf: 'stretch',
  }
});

const createQuestion = (letter, questionNumber) => ({
  key: questionNumber,
  letter: letter,
  shouldDisplayCode: false,
  isCompleted: false,
});


const sampleInput = [
  createQuestion('a', '1'),
  createQuestion('b', '2'),
  createQuestion('c', '3'),
  createQuestion('d', '4'),
  createQuestion('a', '5'),
  createQuestion('g', '6'),
  createQuestion('c', '7'),
  
];

