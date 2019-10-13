import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import GLOBALS from '../constants/Globals.js';
import LevelButton from '../components/LevelButton.js';
import LevelsData from '../assets/LevelsData.js';

import MorsePanel from '../components/MorsePanel.js';



export default class LevelsScreen extends React.Component {
  state = {
    scoresAreLoaded: false,
    levelsScores: {},
  }

  componentDidMount = () => {
    this.loadingItems();
  }


  playGame = (index, learnOrPlay) => {
    if (learnOrPlay === 'learn') {
      this.playLearnGame(index);
    } else if (learnOrPlay === 'play')  {
      this.playPlayGame(index);
    } else {
      console.log("error: " + learnOrPlay);
    }
  }

  playLearnGame = (index) => {
    let prevScore = typeof this.state.levelsScores[index] !== 'undefined' && typeof this.state.levelsScores[index].learn !== 'undefined' ?
      this.state.levelsScores[index].learn : {};
    this.props.navigation.push('Game', {
      questionData: createRandomLearnQuestions(10, LevelsData[index]),
      par: createPar(15000, 1, 20000, 2),
      score: prevScore,
      updateScore: (newScore) => {this.updateScores({learn: newScore}, index)},
      playAgain: () => {this.playLearnGame(index)}
    } );
  }

  playPlayGame = (index) => {
    let prevScore = typeof this.state.levelsScores[index] !== 'undefined' && typeof this.state.levelsScores[index].play !== 'undefined' ?
      this.state.levelsScores[index].play : {};
    this.props.navigation.push('Game', {
      questionData: createRandomQuestions(10, makePlayGameBank(index)),
      par: createPar(15000, 1, 20000, 2),
      score: prevScore,
      updateScore: (newScore) => {this.updateScores({play: newScore}, index)},
      playAgain: () => {this.playPlayGame(index)}
    } );
  }

  updateScores = (newScore, index) => {
    console.log("scores are being updated");
    let combined = { ...this.state.levelsScores, [index]: {...this.state.levelsScores[index], ...newScore}};
    this.setState((prevState) => {
      return {...prevState, levelsScores: combined};
    });

    AsyncStorage.setItem('scores', JSON.stringify(combined));
    
  }

  loadingItems = async () => {
    try {
      const scores = await AsyncStorage.getItem('scores');
      this.setState((prevState) => {
        return {
          ...prevState,
          scoresAreLoaded: true,
          levelsScores: JSON.parse(scores) || {}
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  isCorrect = (translation) => {
    if (translation === 'h') {
      return true;
    }
    return "n/a";
  }

  translationAction = (translation) => {
    if (translation === 'h') {
      this.props.navigation.navigate('Home');
    }
  }

  render() {

    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch'}}>
        <View style={styles.topContainer}> 
          <View style={{alignSelf: 'stretch', alignItems: 'flex-start'}}>
            <Text>
              {'.... <<'} <Text style={{fontWeight: 'bold'}}>h</Text>ome
            </Text>
          </View>
          <Text style={{fontSize: 25, fontFamily: 'American Typewriter'}}>Levels</Text>
          <View style={{alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>
              Learn
            </Text>
            <Text>
              {'< Click on the stars to pick a level >'}
            </Text>
            <Text>
              Play
            </Text>
          </View>
          
          
          

          {this.state.scoresAreLoaded ? (
            <ScrollView style={styles.container}>
              {LevelsData
                .map((item, index) => (
                  <LevelButton
                   levelLetters={LevelsData[index]}
                   numStars={{
                    learn: typeof this.state.levelsScores[index] !== 'undefined' && typeof this.state.levelsScores[index].learn !== 'undefined' ? this.state.levelsScores[index].learn.numStars : 0, 
                    play: typeof this.state.levelsScores[index] !== 'undefined' && typeof this.state.levelsScores[index].play !== 'undefined'  ? this.state.levelsScores[index].play.numStars : 0,
                  }}
                   startGame={this.playGame}
                   index={index}
                   key={index}
                  />
                ))
              }
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
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
      
      <Text style={{color: 'slategrey', fontSize: 20, paddingLeft: 100}}>
        <Text style={{fontWeight: "bold", textTransform: 'capitalize', fontSize: 25, color: 'lightslategrey'}}>
          {word.charAt(0)}
        </Text>
        {word.substring(1)}
      </Text>
      <Text style={{fontSize: 20, color: 'lightslategrey', paddingRight: 100}}>{translation}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  topContainer: {
    alignSelf: 'stretch',
    flex: 5,
    backgroundColor: '#F2EFEA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  container: {
    flex: 1,
    alignSelf:'stretch',
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

const makePlayGameBank = (index) => {
  let result = LevelsData[index];
  result = result.concat(result);
  result = result.concat(LevelsData[Math.floor(Math.random() * (index + 1))]);
  result = result.concat(result);
  result = result.concat(LevelsData[Math.floor(Math.random() * (index))]);
  return result;
}


const createQuestion = (letter, questionNumber) => ({
  key: questionNumber,
  letter: letter,
  shouldDisplayCode: false,
  isCompleted: false,
});

const createLearnQuestion = (letter, questionNumber) => ({
  key: questionNumber,
  letter: letter,
  shouldDisplayCode: true,
  isCompleted: false,
});

const createPar = (threeTime, threeWrong, twoTime, twoWrong) => ({
  three: { time: threeTime, wrong: threeWrong },
  two: { time: twoTime, wrong: twoWrong },
})

const createRandomQuestions = (numQuestions, letters) => {
  let result = [];
  let i;
  for (i = 0; i < numQuestions; i++) {
    result[i] = createQuestion(letters[Math.floor(Math.random() * letters.length)], i + '');
  }
  return result;
}

const createRandomLearnQuestions = (numQuestions, letters) => {
  let result = [];
  let i;
  for (i = 0; i < numQuestions; i++) {
    result[i] = createLearnQuestion(letters[Math.floor(Math.random() * letters.length)], i + '');
  }
  return result;
}


const sampleInput = [
  createQuestion('c', '1'),
  createQuestion('a', '2'),
  createQuestion('t', '3'),
  createQuestion('d', '4'),
  createQuestion('e', '5'),
  createQuestion('f', '6'),
  createQuestion('g', '7'),
];

const sampleInputAlphabet = [
  createQuestion('a', '1'),
  createQuestion('b', '2'),
  createQuestion('c', '3'),
  createQuestion('d', '4'),
  createQuestion('e', '5'),
  createQuestion('f', '6'),
  createQuestion('g', '7'),
  createQuestion('h', '8'),
  createQuestion('i', '9'),
  createQuestion('u', '10'),
  createQuestion('t', '11'),
  createQuestion('s', '12'),
  createQuestion('r', '13'),
  createQuestion('q', '14'),
  createQuestion('p', '15'),
  createQuestion('o', '16'),
  createQuestion('n', '17'),
  createQuestion('m', '18'),
  createQuestion('l', '19'),
  createQuestion('k', '20'),
  createQuestion('j', '21'),
  createQuestion('z', '22'),
  createQuestion('v', '23'),
  createQuestion('y', '24'),
  createQuestion('x', '25'),
  createQuestion('w', '26'),
  createQuestion('f', '27'),
  createQuestion('g', '28'),
];
