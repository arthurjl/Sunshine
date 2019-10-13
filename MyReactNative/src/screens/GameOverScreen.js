import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
} from 'react-native';

import MorsePanel from '../components/MorsePanel.js';
import GLOBALS from '../constants/Globals.js';

import { Ionicons } from '@expo/vector-icons';

export default class GameOverScreen extends React.Component {

  componentDidMount = () => {
    // console.log('game over mounted');
    let stars = numStars(this.props.navigation.state.params.time, this.props.navigation.state.params.numWrong, this.props.navigation.state.params.par);
    if (typeof this.props.navigation.state.params.score.numStars === 'undefined') {
      // console.log("replacing score");
      this.props.navigation.state.params.updateScore({
        time: this.props.navigation.state.params.time,
        numStars: stars,
      });
    } else if (stars > this.props.navigation.state.params.score.numStars || this.props.navigation.state.params.time < this.props.navigation.state.params.score.time) {
      // console.log("updating score");
      this.props.navigation.state.params.updateScore({
        time: Math.min(this.props.navigation.state.params.time, this.props.navigation.state.params.score.time),
        numStars: Math.max(stars, this.props.navigation.state.params.score.numStars),
      });
    }
  }

  isCorrect = (translation) => {
    return translation === 'r' || translation === 'b';
  }

  translationAction = (translation) => {
    if (translation === 'r') {
      this.props.navigation.state.params.playAgain();
    } else if (translation === 'b') {
      this.props.navigation.navigate('Levels');
    }
  }

  highScore = () => {
    // console.log(this.props.navigation.state.params.time);
    // console.log(this.props.navigation.state.params.score.time);
    if (typeof this.props.navigation.state.params.score !== 'undefined' &&
        this.props.navigation.state.params.time > this.props.navigation.state.params.score.time) {
      return this.props.navigation.state.params.score.time;
    }
    return this.props.navigation.state.params.time;
  }

  render() {
    
    let stars = numStars(this.props.navigation.state.params.time, this.props.navigation.state.params.numWrong, this.props.navigation.state.params.par);

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.starBox}>
            <Ionicons style={{padding: 10}} color='gold' name={stars >= 1 ? "ios-star" : "ios-star-outline"} size={75} />
            <Ionicons style={{padding: 10, marginBottom: 30}} color='gold' name={stars >= 2 ? "ios-star" : "ios-star-outline"} size={75} />
            <Ionicons style={{padding: 10}} color='gold' name={stars >= 3 ? "ios-star" : "ios-star-outline"} size={75} />
          </View>
          <View style={styles.scores}>
            <Text style={styles.scoreText}> Your time: { this.props.navigation.state.params.time / 1000 } seconds </Text>
            <Text style={styles.scoreText}> Best time: {this.highScore() / 1000} seconds </Text>
            <Text style={styles.scoreText}> Number Wrong: { this.props.navigation.state.params.numWrong } </Text>
          </View>
          {generateOption('redo level')}
          {generateOption('back to levels')}
        </View>
        <MorsePanel
          isCorrect={(translation) => this.isCorrect(translation)}
          translationAction={(translation) => this.translationAction(translation)}
        />
      </View>
    );
  }
}

const numStars = (time, numWrong, par) => {
  if (time < par.three.time && numWrong <= par.three.wrong) {
    return 3;
  } else if (time < par.two.time && numWrong <= par.two.wrong) {
    return 2;
  }
  return 1;
}

const styles = StyleSheet.create({
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
  starBox: {
    flexDirection: 'row',
  },
  scores: {
    padding: 30,
    paddingBottom: 50,
  },
  scoreText: {
    fontSize: 25,
  }
});


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
