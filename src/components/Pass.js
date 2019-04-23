import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, TextInput, Button} from 'react-native';

import { createStackNavigator,createAppContainer } from "react-navigation";
import { Avatar } from 'react-native-elements';
import { Container, Row, Col, Grid } from 'react-bootstrap';
import firebase from "firebase";

export default class Pass extends Component {
  
  constructor(props) {
  super(props);
  this.state = { text: 'Useless Placeholder' };
}

    sendEmail = (email) =>{
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Email sent.
        console.log('Email Sent')
      }).catch(function(error) {
        // An error happened.
      });
    }


  render() {
    return (
  <View style={styles.container}>
  <TextInput
  style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
  onChangeText={(email) => this.setState({email})}
  value={this.state.email}
   />
     <Button
  onPress={() => this.sendEmail(this.state.email)}
  title="Send Password Reset Email"
  color="#841584"
/>

</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom:100,

  },

});
