import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, TextInput, Button} from 'react-native';

import { createStackNavigator,createAppContainer } from "react-navigation";
import { Avatar } from 'react-native-elements';
import { Container, Row, Col, Grid } from 'react-bootstrap';

import firebase from "firebase";

var database = firebase.database();
export default class AddClass extends Component {

  constructor(props) {
  super(props);
  this.state = { text: 'Useless Placeholder' };
}
getUserID(){
  var user = firebase.auth().currentUser;

  if (user) {
    // User is signed in.
    console.log(user.email)
    return user.uid
  }   else {
  // No user is signed in.
  console.log('ERROR! CANT AUTHORIZE TO ADD CLASS')
  }
}

  getUserEmail(){
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
add(data){
  var id = this.getUserID();
  var text = data
  var update = []
  database.ref('class_enrollments/' + data).update({
  [id]: true
  });


  database.ref('student_enrollments/' + id).update({
  [data]: true
  });

  var ref = database.ref('class_enrollments/' + data);

  // Attach an asynchronous callback to read the data at posts reference
  ref.on("value",

  function(data) {
    var studentsInClass = data.val();
    var keys = Object.keys(studentsInClass);

    var i = 0;
    keys.forEach(function(key) {

      if (key != id){
        database.ref('possible_matches/' + id).update({
        [key]: true

        });
        database.ref('possible_matches/' + key).update({
        [id]: true

        });
        console.log(key);
      }


});
},
function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }


  render() {

    return (

  <View style={styles.container}>


      <TextInput
       style={{height: 40, borderColor: 'gray', borderWidth: 1}}
       onChangeText={(text) => this.setState({text})}
       value={this.state.text}
     />
     <Button
  onPress={() => this.add(this.state.text)}
  title="Add Class"
  color="#841584"
/>

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
