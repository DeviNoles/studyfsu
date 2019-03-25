// App.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class Classes extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={styles.welcome}>Welcome to React Native</Text>
        <Text style={styles.welcome}>Welcome to React Native</Text>
        <Text style={styles.welcome}>Welcome to React Native</Text>
        <Text style={styles.welcome}>Welcome to React Native</Text>
        <Text style={styles.welcome}>Welcome to React Native</Text>
        <Text style={styles.welcome}>Welcome to React Native</Text>
        <Text style={styles.welcome}>Welcome to React Native</Text>
        <Text style={styles.welcome}>Welcome to React Native</Text>
        <Text style={styles.welcome}>Welcome to React Native</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    margin: 20,
    backgroundColor: 'orange',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
  }
});
