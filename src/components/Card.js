import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, TextInput, Button} from 'react-native';

import { createStackNavigator,createAppContainer } from "react-navigation";

import Swiper from 'react-native-swiper';

import firebase from "firebase";

var db = firebase.database();
var randomUser
export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.getUserID(),
      currentRandomUser: ''
    }
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
  var ref = db.ref('possible_matches/' + this.state.currentUser);

  // Attach an asynchronous callback to read the data at posts reference
  ref.on("value",

  function(data) {
    var allStudents = data.val();
    var keys = Object.keys(allStudents);
    var i = 0;
    randomUser = keys[Math.floor(Math.random()*keys.length)];

    console.log('Random User: ' +  randomUser)

},
function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    return randomUser;
}

matched(){
  db.ref('matched/' + this.state.currentUser).update({
  [this.state.currentRandomUser]: true

  });
}



  render() {
    return (
      <View>
      {this.loadRandomCard()}
      <Button
   onPress={() => this.loadRandomCard()}
   title="Match"
   color="#841584"
 />
 <Button
onPress={() => this.loadRandomCard()}
title="Decline"
color="#841584"
/>
        </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
