import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet,View, Image, KeyboardAvoidingView} from 'react-native';
import { NavigationActions } from 'react-navigation';

import LoginForm from './LoginForm';
import Registration from './Registration';

export default class RegistrationScreen extends Component {
  constructor() {
         super();

         this.regLogin= this.regLogin.bind(this);
     }
     navLogin(screen) {
        // do whatever you need
        this.props.navigation.navigate('Home');

    }
    regLogin(screen){

      this.props.navigation.navigate('Login')
    }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>


      <Registration
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
    backgroundColor: 'rgb(120,47,65)',
    justifyContent: 'center',
  },
  LogoContainer:{
    alignItems:'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  Logo: {
    width: 100,
    height: 100
  }
});
