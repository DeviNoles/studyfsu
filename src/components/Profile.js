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
export default class HomeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentID: null,
      currentUser: null,
      currentRandomUser: '',
      major: null,
      avi: '',
      bio: 'ExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleTextExampleText',
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
  <View style={styles.profile}>
      <View style={styles.avi}>
      <Avatar
        size="xlarge"
        rounded
        activeOpacity={0.7}
        source={{uri:this.state.avi}}
        onPress={() => this.editAvi()}
        showEditButton
      />
      <View style={styles.userName}>
          <Text>{this.getUserName()}</Text>
          <Text>{this.getMajor()}</Text>
          </View>
</View>
      </View>
      <View>
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
      <AddClass/>
      </View>
</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom:100,
  },
  avi:{
    paddingVertical: 80,
  },
  userName:{
    margin: 15,
    alignItems: 'center',
    color:'white !important'
  },
  profile:{
    backgroundColor: 'rgb(120,47,65)',
    height: 300
  },
  bio:{
    backgroundColor: 'rgb(206,184,136)',
    height: 300
  }
});
