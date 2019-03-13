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
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

var image1 = require('../images/fsu.png')

var emptyConvos = []

var convos = [{
  "id": 1,
  "name": "Diane",
  "message": "Suspendisse accumsan tortor quis turpis.",
  "image" : image1
}, {
  "id": 2,
  "name": "Lois",
  "message": "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
  "image" : image1
}, {
  "id": 3,
  "name": "Mary",
  "message": "Duis bibendum.",
  "image" : image1
}, {
  "id": 4,
  "name": "Susan",
  "message": "Praesent blandit.",
  "image" : image1
}, {
  "id": 5,
  "name": "Betty",
  "message": "Mauris enim leo, rhoncus sed, vestibulum, cursus id, turpis.",
  "image" : image1
}, {
  "id": 6,
  "name": "Deborah",
  "message": "Aliquam sit amet diam in magna bibendum imperdiet.",
  "image" : image1
}, {
  "id": 7,
  "name": "Frances",
  "message": "Phasellus sit amet erat.",
  "image" : image1
}, {
  "id": 8,
  "name": "Joan",
  "message": "Vestibulum ante ipsum bilia Curae; Duis faucibus accumsan odio.",
  "image" : image1
}, {
  "id": 9,
  "name": "Denise",
  "message": "Aliquam non mauris.",
  "image" : image1
}, {
  "id": 10,
  "name": "Rachel",
  "message": "Nulla ac enim.",
  "image" : image1
}]

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

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ChatScreen extends Component {
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
    var ref = firebase.database().ref('matched/' + this.state.currentUser)
    var cur = this.state.currentUser
    ref.on('value', function(snapshot) {
    snapshot.forEach((childid)=>{ //for each user that ive liked
      var childref = firebase.database().ref('matched/' + childid.key) // reference to the matched i want to check
      childref.on("value", snapshot => {
         if (snapshot.exists())
         {
           snapshot.forEach((childchildid)=>{
             if(childchildid.key == cur){
              firebase.database().ref('users/' + childid.key).once('value').then(function(snapshot) {
              snapshot.forEach((thischild)=>{
                if(thischild.key=='id'){
                  console.log(thischild.val()) // what i want to pass into the message object array
                }
                else if(thischild.key=='name'){
                  console.log(thischild.val()) // what i want to pass into the message object array
                }
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
  eachPic(x){
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
      <View style = {{flex:1}}>

      <ScrollView style={styles.container}>
      <TextInput
      style = {{height:50, }}
      placeholder="Search"
      />
      <View style={styles.matches}>
      <Text style = {{color:'#da533c', fontWeight:'600', fontSize:12}}>NEW MATCHES!</Text>
      <ListView
      horizontal={true}
      scrollEnabled = {false}
      showsHorizontalScrollIndicator = {false}
    dataSource={this.state.convoData}
    pageSize = {5}
      renderRow={(rowData) =>this.convoRender(rowData)}
      />
      </View>
      <View style = {{margin:10}}>
      <Text style = {{color:'#da533c', fontWeight:'600', fontSize:12}}>MESSAGES</Text>
      <ListView
      horizontal={false}
      scrollEnabled = {false}
      showsHorizontalScrollIndicator = {false}
    dataSource={this.state.convoData}
    pageSize = {5}
      renderRow={(rowData) =>this.convoRender(rowData)}
      />
      </View>

        </ScrollView>
        </View>
    )
}
}
//onPress = {() => this.renderNope()}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  matches:{
  borderTopWidth:1,
  paddingTop:15,
  borderTopColor:'#da533c',
  borderBottomWidth:1,
  paddingBottom:15,
  borderBottomColor:'#e3e3e3'
  },
  buttons:{
    width:80,
    height:80,
    borderWidth:10,
    borderColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40
  },
  buttonSmall:{
    width:50,
    height:50,
    borderWidth:10,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  }

});
