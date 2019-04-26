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

var data = [{key: 'DontUseThiss'}]


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
      loaded: false
    }
  }

  async componentWillMount(){
    await this.getCurrentUser(this.getMatched);
    console.log('MOUNTED AND DONE')
      this.setState({loaded: true})
  }

  async getCurrentUser(callback){
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.

      await this.setState({currentUser: user.uid})
      await callback();
    }
  else {
  // No user is signed in.
  console.log('ERROR!')
  }
}

componentDidMount(){

}

formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
getMatched = (callback)=>{
//function for getting chats

    var ref = firebase.database().ref('matched/' + this.state.currentUser)
    var cur = this.state.currentUser
    var currentName;
    var currentMajor;
    var index = 1;
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
                  if(index==snapshot.length-1){
                    console.log('LAST ELEMENT IS: ' + thischild.val())
                  }
                  currentName = thischild.val()
                  data.push({
                    key: currentName
                  });
                   // what i want to pass into the message object array
                   console.log('CURRENT NAME' + currentName);

                   if(index==(snapshot.numChildren()-1)){
                     console.log('INDEX IS : ' + index)
                     console.log(snapshot.numChildren()-1)
                     console.log(data[0]['key'])
                     this.setState({loaded: true})

                   }
                     index++;
                }

                else if(thischild.key=='major'){
                  console.log('Matched Major Name ' + thischild.val()) // what i want to pass into the message object array
                  currentMajor = thischild.val()
                }
              })
            })
             }
           }) // end of foreach
          }
      });
})
})
}


renderItem = ({ item, index }) => {
  if (item.empty === true) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  }
  else if(item.key != 'DontUseThiss'){
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  }

};


content(){

  return (
    <View style={styles.background}>
    <FlatList
      data={this.formatData(data, numColumns)}
      style={styles.container}
      renderItem={this.renderItem}
      numColumns={numColumns}
    />
    </View>
  );
}

emptyContent(){
  return(
    <View>
    <Text> Nothing Loaded Yet</Text>
    </View>
  )
}


render() {
  return (
<View>
    {this.state.loaded ? this.content() : this.emptyContent()}
</View>
  )
}
}

const styles = StyleSheet.create({
container: {
  marginVertical: 20,
},
background:{
  backgroundColor: '#CEB888'
},
item: {
  backgroundColor: '#4D243D',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 2,
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
