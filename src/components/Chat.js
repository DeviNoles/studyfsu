import React, { Component } from 'react';
import {

  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ListView,
  View,
  FlatList,
  Dimensions
} from 'react-native';
import firebase from "firebase"
import Nav from './global-widgets/nav'
import SwipeCards from 'react-native-swipe-cards';
import Iconz from 'react-native-vector-icons/Ionicons';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


var image1 = require('../images/fsu.png')

const numColumns = 2
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};


var newMatches = [{
  "id": 1,
  "first_name": "Sarah",
  "message": "Suspendisse accumsan tortor quis turpis.",
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
      convoData: ds.cloneWithRows(newMatches),
    }
    this.createChat = this.createChat.bind(this)
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


  createChat = function (name) {
          return (
            <View>
            <Card title="CARD WITH DIVIDER">

              <View>

                <Text>{name}</Text>
              </View>
            </Card>
            </View>
          )
      }


renderCards = ()=>{

  for (var key in newMatches) {
    console.log("User " + newMatches[key]['first_name']); // "User john is #234"
return(
  this.createChat(newMatches[key]['first_name'])

  )
}

}
renderItem = ({ item, index }) => {
  if (item.empty === true) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  }
  return (
    <View
      style={styles.item}
    >
      <Text style={styles.itemText}>{item.key}</Text>
    </View>
  );
};

render() {
  const data = [
    { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
    // { key: 'K' },
    // { key: 'L' },
  ];
  return (
    <FlatList
      data={data}
      style={styles.container}
      renderItem={this.renderItem}
      numColumns={numColumns}
    />
  );
}
}

const styles = StyleSheet.create({
container: {
  marginVertical: 20,
},
item: {
  backgroundColor: '#4D243D',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  margin: 5,
  height: Dimensions.get('window').width / numColumns, // approximate a square
},
itemInvisible: {
  backgroundColor: 'transparent',
},
itemText: {
  color: '#fff',
},
});
