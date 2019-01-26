import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet,View, Image, KeyboardAvoidingView} from 'react-native';
import { NavigationActions } from 'react-navigation';

import LoginForm from './LoginForm';

export default class LoginScreen extends Component {
  constructor() {
         super();

         this.navLogin= this.navLogin.bind(this);
     }
     navLogin(screen) {
        // do whatever you need
        this.props.navigation.navigate('Home');

    }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
      <View style={styles.LogoContainer}>
      <Image style={styles.Logo} source={require('../images/fsu.png')}/>
      </View>

      <LoginForm
      navLogin={this.navLogin}
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
  }
});
