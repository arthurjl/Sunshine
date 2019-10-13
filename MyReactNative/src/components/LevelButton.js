import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/Colors.js';

export default class LevelButton extends React.Component {
  render() {
    const result = (
      <View style={[styles.container, this.props.backgroundColor]}>
        <TouchableOpacity style={[styles.buttonStyle, {justifyContent: 'flex-end', backgroundColor: COLORS.leftButton}]} onPress={() => this.props.startGame(this.props.index, "learn")}>
          <Ionicons style={{padding: 10}} color='white' name={this.props.numStars.learn >= 3 ? "ios-star" : "ios-star-outline"} size={24} />
          <Ionicons style={{padding: 10}} color='white' name={this.props.numStars.learn >= 2 ? "ios-star" : "ios-star-outline"} size={24} />
          <Ionicons style={{padding: 10}} color='white' name={this.props.numStars.learn >= 1 ? "ios-star" : "ios-star-outline"} size={24} />
        </TouchableOpacity>
        
        <Text style={styles.textStyle}>{this.props.levelLetters.toString()}</Text>
        
        <TouchableOpacity style={[styles.buttonStyle, {justifyContent: 'flex-start', backgroundColor: COLORS.rightButton}]} onPress={() => this.props.startGame(this.props.index, "play")}>
          <Ionicons style={{padding: 10}} color='white' name={this.props.numStars.play >= 1 ? "ios-star" : "ios-star-outline"} size={24} />
          <Ionicons style={{padding: 10}} color='white' name={this.props.numStars.play >= 2 ? "ios-star" : "ios-star-outline"} size={24} />
          <Ionicons style={{padding: 10}} color='white' name={this.props.numStars.play >= 3 ? "ios-star" : "ios-star-outline"} size={24} />
        </TouchableOpacity>
      </View>
      
    );

    // this.refs.touch.setOpacityTo(50);
    return result;
  }

  
}

const styles = StyleSheet.create({
  container: {
    alignSelf:'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  textStyle: {
    fontSize: 30,
    paddingHorizontal: 5,
    fontFamily: 'Menlo-Regular',
  }
  // buttonContainer: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#DDDDDD',
  //   padding: 10,
  //   flex: 1,
  // },
  // buttonText: {
  //   fontSize: 100,
  //   fontWeight: 'bold'
  // }
});