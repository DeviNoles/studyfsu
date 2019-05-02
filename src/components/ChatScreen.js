import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { Avatar } from 'react-native-elements';
import {StyleSheet,View,TextInput, TouchableOpacity, Text, StatusBar, Alert} from 'react-native';
import{Container, Content,Header,Form,Input,Item,Button, Label} from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "firebase";

var auth = firebase.auth();
var database = firebase.database();
var firestore = firebase.storage()

export default class Edit extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      messages: ['yo'],
    })
  }

  get ref() {
  return firebase.database().ref('messages');
  }
// 2.
on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
// 3.
parse = snapshot => {
  // 1.
  const { timestamp: numberStamp, text, user } = snapshot.val();
  const { key: _id } = snapshot;
  // 2.
  const timestamp = new Date(numberStamp);
  // 3.
  const message = {
    _id,
    timestamp,
    text,
    user,
  };
 return message;
};
// 4.
off() {
  this.ref.off();
}

componentWillMount(){
  console.log('CHAG SCREEN MOUNTED')

}

sendMessage = (message) =>{
  this.state.messages.push(message)

}


  render() {
    return (


      <GiftedChat
             messages={this.state.messages}
             onSend = {(message) => this.sendMessage(message)}
             user={{_id: this.props.user}}
           />



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
