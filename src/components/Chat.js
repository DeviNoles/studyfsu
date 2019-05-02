import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase from "firebase"
import ChatList from "./ChatList"

var index = 1;

var sizeOfArray;
export default class Chat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            majorData:[],
            loading:true
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

      setMajorArray = (id)=>{
        this.state.majorData.push({key: id})
          console.log("Data Array is " + this.state.majorData[0]['key'])

          if(index == sizeOfArray){
          //  console.log(this.state.data)
            this.setState({loading: false})

          }
          index++

      }
      await this.setState({user: this.props.user})

      await firebase.database().ref('nameArray/' + this.state.user).on('value', function(data) {
        console.log('DATA SIZE IS ' + data.numChildren())
        sizeOfArray = data.numChildren()
        data.forEach(function(element) {
          setArray(element.key)
          //console.log(element.key);
});
        });

        await firebase.database().ref('majorArray/' + this.state.user).on('value', function(data) {
          console.log('DATA SIZE IS ' + data.numChildren())
          sizeOfArray = data.numChildren()
          data.forEach(function(element) {
            setMajorArray(element.key)
            //console.log(element.key);
  });
          });

    }



    render() {
      if (this.state.loading == true) {
      return <View><Text>LOADING....</Text></View>;
    }
      else{

        return (
          <View>
              <ChatList
              nameArray={this.state.data}
              majorArray={this.state.majorData}
              user = {this.state.user}

              />
          </View>
        )
      }
    }
}
