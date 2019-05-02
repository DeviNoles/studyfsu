import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, TouchableOpacity} from 'react-native';

import Swiper from 'react-native-swiper'
import { createStackNavigator,createAppContainer } from "react-navigation";
import Card from './Card';
import Chat from './Chat';
import Profile from './Profile';
import AddClass from './AddClass'
import firebase from "firebase";


var database = firebase.database();



export default class Home extends React.Component {


  constructor(props) {
  super(props);

  }

  async componentWillMount() {
    await this.getCurrentUser()
  }

  async getCurrentUser(){
   var user = firebase.auth().currentUser;
  await this.setState({currentUser: user.uid})


}

  viewStyle() {
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }



  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={1}>

        <View style={this.viewStyle()}>
          <Card/>
        </View>


          <View style={styles.profile}>
            <Profile/>
          </View>


        <View style={styles.profile}>
        <Chat user={this.state.currentUser}/>
        </View>


      </Swiper>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile:{
    flex: 1,
    backgroundColor: 'rgb(206,184,136)',
    height: 300
  },
  bio:{
    backgroundColor: 'rgb(206,184,136)',
    height: 300
  }
});
