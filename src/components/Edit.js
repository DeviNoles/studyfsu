import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { Avatar } from 'react-native-elements';
import {StyleSheet,View,TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import{Container, Content,Header,Form,Input,Item,Button, Label} from 'native-base';

import firebase from "firebase";

var auth = firebase.auth();
var database = firebase.database();
var firestore = firebase.storage()

export default class Edit extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      fullname: null,
      email: null,
      password: null,
      passwordConfirm: null,
      currentID: null,
      avi: '',
      image: '',
      bio: null
    })
  }

componentWillMount(){

this.setState({currentFullName: ''})
var user = firebase.auth().currentUser;
this.setState({currentID: user.uid})
console.log('Edit logged in user id is' + user.uid)

var ref = database.ref('users/' + user.uid);

ref.once("value", (data) =>{
// do some stuff once
this.setState({currentFullName: data.val().name})
this.setState({currentMajor: data.val().major})

});
}

updateUserInfo = () => {

  database.ref('users/' + this.state.currentID).update({
    name: this.state.currentFullName,
    major: this.state.currentMajor,
    email: this.state.currentEmail,
    age: this.state.currentAge,
    bio: this.state.currentBio
  });
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
  var uri = this.state.image
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
        source={this.state.image}
        onPress={() => this.editAvi()}
        showEditButton
        activeOpacity={0.7}
      />
      </View>
<View>
      <TextInput
      style = {styles.input}
      placeholder = "Full Name"
      returnKeyType="next"
      autoCorrect={false}
      onChangeText={(currentFullName) => this.setState({currentFullName})}
      onSubmitEditing={() => this.majorInput.focus()}
      ref={(input) => this.nameInput = input}
      value={this.state.currentFullName}
       />
</View>


    <TextInput
      style = {styles.input}
    placeholder = "Major"
    returnKeyType="next"
    autoCorrect={false}
    onChangeText={(currentMajor) => this.setState({currentMajor})}
    onSubmitEditing={() => this.emailInput.focus()}
    ref={(input) => this.majorInput = input}
    value={this.state.currentMajor}
    />
    <TextInput
      style = {styles.input}
    placeholder = "E-Mail Address"
    returnKeyType="next"
    autoCorrect={false}
    onChangeText={(currentEmail) => this.setState({currentEmail})}
    onSubmitEditing={() => this.ageInput.focus()}
    ref={(input) => this.emailInput = input}
    value={this.state.currentEmail}
    />


    <TextInput
      style = {styles.input}
    placeholder = "Age"
    returnKeyType="next"
    autoCorrect={false}
    onChangeText={(currentAge) => this.setState({currentAge})}
    onSubmitEditing={() => this.bioInput.focus()}
    ref={(input) => this.ageInput = input}
    value={this.state.currentAge}
    />



    <TextInput
      style = {styles.input}
    placeholder = "Bio"
    returnKeyType="next"
    autoCorrect={false}
    onChangeText={(currentBio) => this.setState({currentBio})}
    ref={(input) => this.bioInput = input}
    value={this.state.currentBio}
    />

      <TouchableOpacity
      style={styles.ButtonContainer}
      onPress={() => this.updateUserInfo()} // should update the database
      >
        <Text style = {styles.ButtonText}>SAVE</Text>
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
    marginVertical: 10,
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
