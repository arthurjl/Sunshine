import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import GLOBALS from '../constants/Globals.js';
import QuestionLetter from '../components/QuestionLetter.js';


// !!! WIll PROBABLY NEED TO PASS IN EXTRADATA TO FLATLIST TO MAKE SURE IT WILL RE-RENDER
export default class Questions extends React.Component {

  render() {
    const { questions } = this.props;
    return (
      <View style = {styles.container}>
        <FlatList
          ref={(ref) => { this.props.getRef(ref) }}
          horizontal={true}
          showHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ItemSeparatorComponent={tempSeparator}
          ListHeaderComponent={tempHeader}
          data = {questions}
          renderItem = {(question) => {
            // console.log(question);
            return (
              <QuestionLetter
                letter={question.item.letter}
                shouldDisplayCode={question.item.shouldDisplayCode}
                isCompleted={question.item.isCompleted}
              />
            );
          }}
        />

      </View>
    );
  }
}

const tempSeparator = () => (
  <View style={{width: 15}}>

  </View>
);

const tempHeader = () => (
  <View style={{width: 100, height: 200}}>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: 'purple',
  }
});

        // <ScrollView
        //   horizontal={true}
        //   showHorizontalScrollIndicator={false}
        // >
        //   {questions.map((question) => {
        //     console.log(question);
        //     return (
        //       <QuestionLetter letter={question.letter} shouldDisplayCode={question.shouldDisplayCode} isCompleted={question.isCompleted} />
        //     );
        //   })}
        // </ScrollView>

