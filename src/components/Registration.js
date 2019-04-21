import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { Avatar } from 'react-native-elements';
import {StyleSheet,View,TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
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
var firestore = firebase.storage()

export default class Registration extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      fullname: null,
      email: null,
      password: null,
      passwordConfirm: null,
      currentID: null,
      avi: '',
      image: ''
    })
  }

componentWillMount(){
  this.setState({image:'https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249__340.png'})
}

signUpUser = (name, major, email, password, passwordConfirm, callback) => {
      auth.createUserWithEmailAndPassword(email, password)
      .then((data)=>{
        console.log(data.user.uid)
        database.ref('users/' + data.user.uid).set({
        name: name,
        major: major,
        email: email,
        password: password,
        });

        this.setState({currentID: data.user.uid})
        console.log('ID IS: ' + this.state.currentID)
        console.log('Account Created')
        callback()
        console.log('Done')
    })

}


editAvi = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      if (!cancelled) {

        this.setState({ image: uri });
      }
      console.log('The image is' + this.state.image)
    };


uploadImage = async () => {
  var uri = this.state.image//probably fix this

  // Why XMLHttpRequest? See:
// https://github.com/expo/expo/issues/2402#issuecomment-443726662
const blob = await new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    resolve(xhr.response);
  };
  xhr.onerror = function(e) {
    console.log(e);
    reject(new TypeError('Network request failed'));
  };
  xhr.responseType = 'blob';
  xhr.open('GET', uri, true);
  xhr.send(null);
});
console.log(JSON.stringify(blob, null, 2))

var ref = firebase.storage().ref().child("images/" + this.state.currentID);
ref.put(blob);
console.log('After')
//Done with the blob, close and release it
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
        source={{uri:this.state.image}}
        onPress={() => this.editAvi()}
        showEditButton

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
      onPress={() => this.signUpUser(this.state.name, this.state.major, this.state.email, this.state.password,this.state.passwordConfirm, this.uploadImage)}
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
