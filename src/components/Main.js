import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';
import Home from './Home';
import Card from './Card'
import RegistrationScreen from './RegistrationScreen';


import firebase from "firebase";

const RootStackNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: Home
    },
    Registration: {
      screen: RegistrationScreen
    },

  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
    }
  }
);

const HomeNavigator = createStackNavigator(
  {
  Home: Home

},
{
    initialRouteName: 'Home',
  }
);


const RootContainer = createAppContainer(RootStackNavigator);
const HomeContainer = createAppContainer(HomeNavigator);

export default class Main extends Component {
  static navigationOptions = {
      header: null
    };
  constructor(props) {
  super(props);

}


  render() {
      return (
        <View style={styles.container}>

      <RootContainer/>

        </View>
      );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
