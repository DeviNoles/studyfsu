import React, { Component } from 'react';
import {

  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ListView,
  View
} from 'react-native';
import firebase from "firebase"
import Nav from './global-widgets/nav'
import SwipeCards from 'react-native-swipe-cards';
import Iconz from 'react-native-vector-icons/Ionicons';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


var image1 = require('../images/fsu.png')



var convos = [{
  "id": 1,
  "name": "Diane",
  "message": "Suspendisse accumsan tortor quis turpis.",
  "image" : image1
},]

var newMatches = [{
  "id": 1,
  "first_name": "Sarah",
  "image" : image1
}, {
  "id": 2,
  "first_name": "Pamela",
  "image" : image1
}, {
  "id": 3,
  "first_name": "Diana",
  "image" : image1
}, {
  "id": 4,
  "first_name": "Christina",
  "image" : image1
}, {
  "id": 5,
  "first_name": "Rebecca",
  "image" : image1
}, {
  "id": 6,
  "first_name": "Wanda",
  "image" : image1
}, {
  "id": 7,
  "first_name": "Sara",
  "image" : image1
}, {
  "id": 8,
  "first_name": "Judith",
  "image" : image1
}, {
  "id": 9,
  "first_name": "Ruby",
  "image" : image1
}, {
  "id": 10,
  "first_name": "Sandra",
  "image" : image1
}]

var convoList = []

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Chat extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(newMatches),
      convoData: ds.cloneWithRows(convos),
    }
  }

  componentWillMount(){
    this.getCurrentUser(this.getMatched);
  }
  async getCurrentUser(callback){
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      await this.setState({currentUser: user.uid})
      callback();
      return user.uid
    }
  else {
  // No user is signed in.
  console.log('ERROR!')
  }
}
getMatched = ()=>{
//function for getting chats
    var ref = firebase.database().ref('matched/' + this.state.currentUser)
    var cur = this.state.currentUser
    var currentName;
    var currentMajor;
    ref.on('value', function(snapshot) {
    snapshot.forEach((childid)=>{ //for each user that ive liked
      var childref = firebase.database().ref('matched/' + childid.key) // reference to the matched i want to check
      console.log('Matched Users' + childid.key)
      childref.on("value", snapshot => {
         if (snapshot.exists())
         {
           snapshot.forEach((childchildid)=>{
             if(childchildid.key == cur){
              firebase.database().ref('users/' + childid.key).once('value').then(function(snapshot) {
              snapshot.forEach((thischild)=>{

                if(thischild.key=='name'){
                  console.log('Matched User Name ' + thischild.val()) // what i want to pass into the message object array
                  currentName = thischild.val()
                }

                else if(thischild.key=='major'){
                  console.log('Matched Major Name ' + thischild.val()) // what i want to pass into the message object array
                  currentMajor = thischild.val()
                }

                convoList.push({
                  "id": 0,
                  "first_name": currentName
                });

              })
            })
             }
           })
          }
      });

//////////////////

})
})
}
  eachPic(x){ //live match screen
    return(
      <TouchableOpacity style={{alignItems:'center'}}>
      <Image source = {x.image} style={{width:70, height:70, borderRadius:35, margin:10}} />
      <Text style={{fontWeight:'600', color:'#444'}}>{x.first_name}</Text>
      </TouchableOpacity>
      )}


    convoRender(x){
      return(
              <TouchableOpacity style={{alignItems:'center', flexDirection:'row', marginTop:5, marginBottom:5, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
              <Image source = {x.image} style={{width:70, height:70, borderRadius:35, margin:10}} />
              <View>
              <Text style={{fontWeight:'600', color:'#111'}}>{x.name}</Text>
              <Text
              numberOfLines ={1}
              style={{fontWeight:'400', color:'#888', width:200}}>{x.message}</Text>
              </View>
              </TouchableOpacity>)}


  render() {
    return (
      <View>



      <Card title="CARD WITH DIVIDER">
  {
    newMatches.map((u, i) => {
      return (
        <View key={i}>
          <Image
            resizeMode="cover"
            source={{ uri: u.avatar }}
          />
          <Text>{u.first_name}</Text>
        </View>
      );
    })
  }
</Card>


        </View>
    )
}
}
