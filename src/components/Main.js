import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';
import Home from './Home';
import Card from './Card'
import ChatScreen from './ChatScreen'
import RegistrationScreen from './RegistrationScreen';


import firebase from "firebase";

const RootStackNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
     header: null,
   },},

    Home: {
      screen: Home,
      navigationOptions: {
        headerStyle: {
     backgroundColor: '#CEB888',
   },
     headerTitle: 'MeetFSU',
   },},


    Registration: {
      screen: RegistrationScreen
    },
  },

  {
    initialRouteName: 'Login',
  }
);

const RootContainer = createAppContainer(RootStackNavigator);

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
