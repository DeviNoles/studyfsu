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

  regLogin(screen){

    this.props.navigation.navigate('Login')
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
    try {
      var keys = Object.keys(allStudents);

      randomUser = keys[Math.floor(Math.random()*keys.length)];

      console.log('Random User: ' +  randomUser)
    } catch (e) {
       console.log('No Matches Available')
    } finally {

    }


},
function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


}

matched(){


  db.ref('matched/' + this.state.currentUser).update({
  [randomUser]: true

  });
  //check if match
  firebase.database().ref(`matched/${randomUser}/${this.state.currentUser}`).once("value", snapshot => {
     if (snapshot.exists()){
        console.log("MATCHED ON BOTH SIDES");
        const email = snapshot.val();
        firebase.database().ref(`possible_matches/${this.state.currentUser}/${randomUser}`).remove();
        this.loadRandomCard();
      }
      else{
        firebase.database().ref(`possible_matches/${this.state.currentUser}/${randomUser}`).remove();
        this.loadRandomCard();
      }
  });

}

decline(){
  firebase.database().ref(`possible_matches/${this.state.currentUser}/${randomUser}`).remove();
  this.loadRandomCard();
}


  render() {
    return (
      <View>
      <Text>
      </Text>
      <Button
   onPress={() => this.matched()}
   title="Match"
   color="#841584"
 />
    <Button
    onPress={() => this.decline()}
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
