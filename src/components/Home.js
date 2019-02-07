import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text} from 'react-native';

import Swiper from 'react-native-swiper'
import { createStackNavigator,createAppContainer } from "react-navigation";
import Card from './Card';
import Profile from './Profile';

import firebase from "firebase";

var database = firebase.database();
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

class TitleText extends React.Component {
  render() {
    return (
      <Text style={{ fontSize: 48, color: 'white' }}>
        {this.props.label}
      </Text>
    )
  }
}

class Home extends React.Component {

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

        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={true}
          index={1}
          >
          <View style={this.viewStyle()}>
            <TitleText label="Top" />
          </View>
          <View style={styles.profile}>
            <Profile/>
          </View>
          <View style={this.viewStyle()}>
            <TitleText label="Bottom" />
          </View>
        </Swiper>

        <View style={this.viewStyle()}>
          <Text>CHAT SCREEN</Text>
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

export default Home
