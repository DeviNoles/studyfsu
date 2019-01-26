import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text} from 'react-native';

import { createStackNavigator,createAppContainer } from "react-navigation";
import { Avatar } from 'react-native-elements';
import { Container, Row, Col, Grid } from 'react-bootstrap';
import AddClass from './AddClass';
import firebase from "firebase";

var database = firebase.database();
export default class HomeProfile extends Component {


  getUser(){
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      console.log(user.email)
      return user.email
    }   else {
  // No user is signed in.
  console.log('wtf')
  }
  }

  render() {

    return (

  <View style={styles.container}>
      <View style={styles.avi}>
      <Avatar
        size="xlarge"
        rounded
        title="DM"
        activeOpacity={0.7}
      />
      </View>


      <Text>{this.getUser()}</Text>
      <AddClass/>

</View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom:100

  },
  avi:{
    paddingVertical: 80
  },
  buttons:{

  }
});
