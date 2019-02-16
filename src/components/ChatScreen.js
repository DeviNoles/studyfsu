import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
class ChatScreen extends Component {

  // 3.
  state = {
    messages: [],
  };

  render() {
    // 4.
    return (
      <GiftedChat
        messages={this.state.messages}
      />
    );
  }
}
const styles = StyleSheet.create({});
export default ChatScreen;
