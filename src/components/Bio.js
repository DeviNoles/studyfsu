import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, Dimensions, Button,TextInput} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { createStackNavigator,createAppContainer } from "react-navigation";
import { Avatar } from 'react-native-elements';
import { Container, Row, Col, Grid } from 'react-bootstrap';
import AddClass from './AddClass';
import firebase from "firebase";
var database = firebase.database();
var name
export default class Bio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentID: null,
      currentUser: null,
      currentRandomUser: '',
      major: null,
      avi: '',
      bio: 'bio dawg',
      height: null
    }
    this.getUserName = this.getUserName.bind(this)
    this.getMajor = this.getMajor.bind(this)
  }
componentWillMount(){
  var user = firebase.auth().currentUser;
  if (user){
    console.log('ID is: ' + user.uid)
    var ref = database.ref('users/' + user.uid);
    ref.once("value", (data) =>{
// do some stuff once
    this.setState({currentID: user.uid})
    this.setState({currentUser: data.val().name})
    this.setState({major: data.val().major})
    this.getAvi()
});
  }
}
  getUserName(){
    return this.state.currentUser
  }
  getMajor(){
    return this.state.major
  }
getAvi = ()=>{
  var storage = firebase.storage().ref();
  storage.child('images/' + this.state.currentID).getDownloadURL().then((url) =>{
    this.setState({avi: url})
    console.log(this.state.avi)
  })
}
  render() {
    return (
  <View style={styles.container}>
      <View style={styles.BioTitle}>
      <Text>Bio</Text>
      </View>
      <TextInput
        multiline={true}
        onChangeText={(text) => {
            this.setState({ bio: text })
        }}
        onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height })
        }}
        style={[styles.default, {height: Math.max(35, this.state.height)}]}
        value={this.state.bio}
      />


</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom:100,
    backgroundColor:'rgb(206,184,136)'
  },

  BioTitle:{
    alignItems:'center',
    justifyContent:'center'
  }

});
