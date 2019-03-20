import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, Button} from 'react-native';
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
     headerRight: (
     <Button
       onPress={() => alert('This is a button!')}
       title="Add Class"
       color="#fff"
     />
   ),
   headerLeft: null,
   headerLeft: (
   <Button
     onPress={() => alert('This is a button!')}
     title="View Classes"
     color="#fff"
   />
 ),
   },

 },

 Card: {
   screen: Card,
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
