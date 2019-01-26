import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet,View,TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';



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

    auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            // Sign in success
            // Route to site here
            console.log('Logged In')
            this.props.navLogin('Home');



        }).catch(error => {
            console.error(error);
        })

}

signUpUser = (email, password) => {


    auth.createUserWithEmailAndPassword(email, password)
    .then(function(data){


      database.ref('users/' + data.user.uid).set({
      name: "Test",
      major: "Computer Science",
      email: email,
      password: password,
      userLiked: {},
      userSwiped: {},
      userSeen: {},
      });

  //Here if you want you can sign in the user
}).catch(function(error) {
    //Handle error
});


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
      style={styles.ButtonContainer}

      onPress={() => this.signUpUser(this.state.email, this.state.password)}
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
    backgroundColor: 'rgb(120,47,65)',
    paddingBottom: 100
  },
  input:{
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  ButtonContainer:{
    backgroundColor: 'rgb(206,184,136)',
    paddingVertical: 15
  },

  ButtonContainer:{
    backgroundColor: 'rgb(206,184,136)',
    paddingVertical: 15
  },
  ButtonText:{
    textAlign:'center'
  }

});
