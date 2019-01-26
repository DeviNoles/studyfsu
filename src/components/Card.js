import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text} from 'react-native';

import { createStackNavigator,createAppContainer } from "react-navigation";

import Swiper from 'react-native-swiper';

import firebase from "firebase";

var db = firebase.database();

export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {currentUser: firebase.auth().currentUser}
  }

  getUserID(){
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      console.log(user.email)
      return user.uid
    }   else {
  // No user is signed in.
  console.log('ERROR!')
  }
  }






  loadRandomCard(){
    const id = this.getUserID();
    var ref = db.ref('student_enrollments/' + id);

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(data) {
  console.log(data.val());
  }, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


  }

  render() {
    return (
      <View>
        {this.loadRandomCard()}
        <Text>MATCH SCREEN</Text>
        </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
