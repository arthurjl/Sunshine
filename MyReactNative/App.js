import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MusicPlayer from './src/MusicPlayer.js';
import Main from './src/screens/Main.js';

const MainNavigator = createStackNavigator(
  {
    Home: MusicPlayer,
    Mood: Main,
  },
  {
    initialRouteName: 'Mood',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    
  }
);

const App = createAppContainer(MainNavigator);

export default App;

// import React from 'react';
// import Main from './src/screens/Main.js';

// export default class App extends React.Component {
//   render() {
//     return <Main />;
//   }
// }

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
