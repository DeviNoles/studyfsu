import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text} from 'react-native';
import { NavigationActions } from 'react-navigation';

import LoginForm from './LoginForm';

export default class LoginScreen extends Component {
  constructor() {
         super();

         this.navLogin= this.navLogin.bind(this);
         this.regLogin= this.regLogin.bind(this);
     }
     navLogin(screen) {
        // do whatever you need
        this.props.navigation.navigate('Home');

    }
    regLogin(screen){

      this.props.navigation.navigate('Registration')
    }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
      <View style={styles.LogoContainer}>
      <Image style={styles.Logo} source={require('../images/fsu.png')}/>
    <Text style={styles.title}>MeetFSU</Text>
      </View>

      <LoginForm
      navLogin={this.navLogin}
      regLogin={this.regLogin}
      />

      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(120,47,65)'
  },
  LogoContainer:{
    alignItems:'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  Logo: {
    width: 100,
    height: 100
  },
  title:{
    marginTop: 100,
    color: 'white',
    fontSize: 30
  }
});
