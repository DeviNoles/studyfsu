import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { Avatar } from 'react-native-elements';
import {StyleSheet,View,TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';



import{Container, Content,Header,Form,Input,Item,Button, Label} from 'native-base';

import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCcszyokJC7yX686UpB3X5t352CN4PufEE",
  authDomain: "studyfsu-74a19.firebaseapp.com",
  databaseURL: "https://studyfsu-74a19.firebaseio.com",
  storageBucket: "studyfsu-74a19.appspot.com",
};


var auth = firebase.auth();
var database = firebase.database();

export default class Registration extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      avi: '',
      fullname: '',
      email: '',
      password: '',
      passwordConfirm: ''
    })
  }



async editAvi(){
    console.log('wtf')
       var status = Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);
       await Expo.ImagePicker.launchImageLibraryAsync({

      });
    if (!status.cancelled){
        this.setState({ avi: status.uri });
        console.log(status.uri)
      }

    };


signUpUser = (name, major, email, password, passwordConfirm) => {



      auth.createUserWithEmailAndPassword(email, password)
      .then(function(data){
        console.log('created')

        database.ref('users/' + data.user.uid).set({
        name: name,
        major: major,
        email: email,
        password: password,
        });

    //Routing to registration screen

    })


}

  render() {
    return (

      <View style={styles.container}>
      <StatusBar
      barStyle = "light-content"
      />
      <View style={styles.avi}>
      <Avatar
        size="xlarge"
        rounded
        icon={{name: 'user', type: 'font-awesome'}}
        onPress={() => this.editAvi()}
        showEditButton
        activeOpacity={0.7}
      />
      </View>
      <TextInput
      style = {styles.input}
      placeholder = "Full Name"
      returnKeyType="next"
      autoCorrect={false}
      onChangeText={(name) => this.setState({name})}
      onSubmitEditing={() => this.emailInput.focus()}
       />
      <TextInput
      style = {styles.input}
      placeholder = "FSU Email"
      returnKeyType="next"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(email) => this.setState({email})}
      onSubmitEditing={() => this.majorInput.focus()}
      ref={(input) => this.emailInput = input}
       />
       <TextInput
       style = {styles.input}
       placeholder = "Major"
       returnKeyType="next"
       autoCorrect={false}
       onChangeText={(major) => this.setState({major})}
       onSubmitEditing={() => this.passwordInput.focus()}
       ref={(input) => this.majorInput = input}
        />
      <TextInput
      style = {styles.input}
      secureTextEntry
       returnKeyType="next"
      placeholder = "Password"
      onChangeText={(password) => this.setState({password})}
      onSubmitEditing={() => this.passwordConfirmInput.focus()}
      ref={(input) => this.passwordInput = input}
      />
      <TextInput
      style = {styles.input}
      secureTextEntry
      placeholder = "Confirm Password"
      returnKeyType="go"
      onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
      ref={(input) => this.passwordConfirmInput = input}
      />
      <TouchableOpacity
      style={styles.ButtonContainer}
      onPress={() => this.signUpUser(this.state.name, this.state.major, this.state.email, this.state.password,this.state.passwordConfirm)}
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
    marginBottom: 10,
    marginVertical: 10
  },
  ButtonContainer:{
    backgroundColor: 'rgb(206,184,136)',
    paddingVertical: 15,
    marginBottom: 30,
    justifyContent: 'center',
    borderRadius: 180
  },
  LoginButtonContainer:{
    backgroundColor: 'rgb(206,184,136)',
    paddingVertical: 15,
    borderRadius: 180
  },
  ButtonText:{
    textAlign:'center'
  },
  avi:{
    alignItems: 'center',
    paddingVertical: 80
  },

});
