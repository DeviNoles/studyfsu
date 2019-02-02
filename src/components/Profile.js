import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, Dimensions} from 'react-native';

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
      currentUser: null,
      currentRandomUser: '',
      major: null
    }
    this.getUserName = this.getUserName.bind(this)
    this.getMajor = this.getMajor.bind(this)
  }


// based on iphone 5s's scale




componentWillMount(){
  var user = firebase.auth().currentUser;
  if (user){
    console.log('ID is: ' + user.uid)

    var ref = database.ref('users/' + user.uid);
    console.log(ref)
    ref.once("value", (data) =>{
// do some stuff once

    this.setState({currentUser: data.val().name})
    this.setState({major: data.val().major})

});
  }
}
  getUserName(){
    return this.state.currentUser
  }

  getMajor(){
    return this.state.major
  }


  render() {

    return (

  <View style={styles.container}>

      <View style={styles.avi}>
      <Avatar
        size="xlarge"
        rounded
        title="DM"
        activeOpacity={0.7}
      />
      <View style={styles.userName}>
          <Text>{this.getUserName()}</Text>
          <Text>{this.getMajor()}</Text>
          </View>
      </View>



      <AddClass/>

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
    color:'#FF9800'
  }
});
