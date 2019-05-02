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
import { NavigationActions } from 'react-navigation';


var image1 = require('../images/fsu.png')

const numColumns = 2

var data = []


var convoList = []

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class RenderChat extends Component {

  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentWillMount(){
    await this.getCurrentUser(this.getMatched);
    console.log('MOUNTED AND DONE')
    await  this.setState({loaded: true})
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

getMatched = (callback)=>{
//function for getting chats

    var ref = firebase.database().ref('matched/' + this.state.currentUser)
    var cur = this.state.currentUser
    var currentName;
    var currentMajor;
    var index = 0;
    ref.on('value', function(snapshot) {

    snapshot.forEach((childid)=>{ //for each user that ive liked
      var childref = firebase.database().ref('matched/' + childid.key) // reference to the matched i want to check
      console.log('Matched Users' + childid.key)

      childref.on("value", snapshot => {
        snapshot.forEach(function(element) {
          console.log(element);
});


     }
     )

})
})

}


renderItem = ({ item, index }) => {
  if (item.empty === true) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  }
  else if(item.key != 'DontUseThiss'){
    return (
      <View style={styles.item}>
      <TouchableOpacity

      onPress={() => this.rendChat}
      >


        <Text style={styles.itemText}>{item.key}</Text>


          </TouchableOpacity>
          </View>
    );
  }

};


content(){

  return (
    <View style={styles.background}>
    <Text>Rendered Screen</Text>
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
  data.forEach(function(element) {
  console.log(element['key']);
});

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
  flex: 1,
  margin: 5,

},
itemInvisible: {
  backgroundColor: 'transparent',
},
itemText: {
  color: '#fff',
},
});
