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
        showsPagination={true}
        index={1}>
        <View style={this.viewStyle()}>
          <Card/>
        </View>


          <View style={styles.profile}>
            <Profile/>

          </View>



        <View style={this.viewStyle()}>
          <Chat/>
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
    backgroundColor: 'rgb(120,47,65)',
    height: 300
  },
  bio:{
    backgroundColor: 'rgb(206,184,136)',
    height: 300
  }
});
