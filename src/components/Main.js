import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, Button, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';
import Home from './Home';
import Card from './Card'
import ChatScreen from './ChatScreen'
import Profile from './Profile'
import RegistrationScreen from './RegistrationScreen';
import firebase from "firebase";



var isModal = false;
toggleModal = () => {
    isModal = !isModal
    console.log('modal')
}


const RootStackNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
     header: null,
     gesturesEnabled: true,
   },},

    Home: {
      screen: Home,
      navigationOptions: {
        header:null,
        gesturesEnabled: false,
   },

 },

 Card: {
   screen: Card,
   navigationOptions: {
  headerVisible: false,
 },},


Profile: {
   screen: Profile,
   navigationOptions: {
  headerVisible: false,
 },},

 Registration: {
   screen: RegistrationScreen,
   navigationOptions: {
  header: null,
},},
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
