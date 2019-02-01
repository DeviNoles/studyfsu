import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text} from 'react-native';

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
      currentRandomUser: ''
    }
    this.getUser = this.getUser.bind(this)
  }

componentWillMount(){
  var user = firebase.auth().currentUser;
  if (user){
    console.log('ID is: ' + user.uid)

    var ref = database.ref('users/' + user.uid);
    console.log(ref)
    ref.once("value", (data) =>{
// do some stuff once
    console.log(data.val().name)
    this.setState({currentUser: data.val().name})
    console.log(this.state.currentUser)
});
  }
}
  getUser(){
    return this.state.currentUser
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
          <Text>{this.getUser()}</Text>
      </View>



      <AddClass/>

</View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom:100

  },
  avi:{
    paddingVertical: 80
  },
  buttons:{

  }
});
