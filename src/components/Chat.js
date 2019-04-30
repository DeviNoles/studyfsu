import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase from "firebase"
import ChatList from "./ChatList"

export default class Chat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentWillReceiveProps(props) {

      console.log(props);

    }



    async componentWillMount() {
      setArray = (id)=>{
        this.state.data.push({key: id})
        console.log("Data Array is " + this.state.data)
      }
      await this.setState({user: this.props.user})

      await firebase.database().ref('matched/' + this.state.user).on('value', function(data) {
        data.forEach(function(element) {
          setArray(element.key)
          console.log(element.key);
});
        });
    }

    render() {
        return (
          <View>
          <Text>Chat Screen</Text>
          </View>
        )
    }
}
