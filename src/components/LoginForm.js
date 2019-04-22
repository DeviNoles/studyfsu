import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet,View,TextInput, TouchableOpacity, Text, StatusBar, Alert} from 'react-native';



import{Container, Content,Header,Form,Input,Item,Button, Label} from 'native-base';

import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCcszyokJC7yX686UpB3X5t352CN4PufEE",
  authDomain: "studyfsu-74a19.firebaseapp.com",
  databaseURL: "https://studyfsu-74a19.firebaseio.com",
  storageBucket: "studyfsu-74a19.appspot.com",
};

firebase.initializeApp(config)
var auth = firebase.auth();
var database = firebase.database();

export default class LoginForm extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

loginUser = (email, password) => {
  console.log('Logging In...')
    auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            // Sign in success
            // Route to site here
            console.log('Logged In')
            this.props.navLogin('Home');
        })
    .catch(function(error) {
      // Handle Errors here.
      Alert.alert(
         'Incorrect Login',
         'Please Try Again',
         [
           {text: 'OK', onPress: () => console.warn('Incorrect Login'), style: 'cancel'}
         ]
       );
    })

}
signUpUser = () => {
  this.props.regLogin('Registration');
}

  render() {
    return (

      <View style={styles.container}>
      <StatusBar
      barStyle = "light-content"
      />

      <TextInput
      style = {styles.input}
      placeholder = "FSU Email"
      returnKeyType="next"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(email) => this.setState({email})}
      onSubmitEditing={() => this.passwordInput.focus()}
       />
      <TextInput
      style = {styles.input}
      secureTextEntry
      placeholder = "Password"
      onChangeText={(password) => this.setState({password})}
      returnKeyType="go"
      ref={(input) => this.passwordInput = input}
      />

    
      <TouchableOpacity
      style={styles.ButtonContainer}
      onPress={() => this.loginUser(this.state.email, this.state.password)}
      >
        <Text style = {styles.ButtonText}>LOGIN</Text>
      </TouchableOpacity>


      <TouchableOpacity
      style={styles.SignUpButtonContainer}

      onPress={() => this.signUpUser()}
      >
        <Text style = {styles.ButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 200,
    backgroundColor: 'rgb(120,47,65)',
    paddingBottom: 100,
    flexDirection: 'column',
    flex: 1
  },
  input:{
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  ButtonContainer:{
    backgroundColor: 'rgb(206,184,136)',
    paddingVertical: 15,
    marginBottom: 30,
    justifyContent: 'center',
    borderRadius: 180


  },
  SignUpButtonContainer:{
    backgroundColor: 'rgb(206,184,136)',
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 180

  },
  ButtonText:{
    textAlign:'center'
  }

});
