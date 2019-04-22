import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, TextInput, Button, ScrollView, Dimensions, Alert} from 'react-native';
import { createStackNavigator,createAppContainer,  } from "react-navigation";
import Swiper from 'react-native-swiper';
import firebase from "firebase";
import AddClass from './AddClass';
var db = firebase.database();
var randomUser

var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.getUserID(),
      randomMajor: null,
      randomName: null,
      randomID: null
    }

  }
  regLogin(screen){
    this.props.navigation.navigate('Login')
  }
  getUserID(){
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      console.log(user.email)
      return user.uid
    }   else {
  // No user is signed in.
  console.log('ERROR!')
  }
  }
getRandomID(callback){
  var ref = db.ref('possible_matches/' + this.state.currentUser);
  // Attach an asynchronous callback to read the data at posts reference
  ref.on("value",
  async (data) =>{
    var allStudents = data.val();
    try {
      var keys = Object.keys(allStudents);
      randomUser = keys[Math.floor(Math.random()*keys.length)];
      console.log('The Random User is ' + randomUser)
      await this.setState({randomID: randomUser})
      callback()
      return this.state.randomID

    }
    catch (e){ //error?
      Alert.alert(
         'No Available Cards',
         'Add a Class to Get Started',
         [
           {text: 'OK', onPress: () => console.warn('No Available Matches'), style: 'cancel'}
         ]
       );
    }
},
function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}
componentWillMount(){
  this.getRandomID(this.setData);


}
setData = () => {
  console.log('When setData is called' + this.state.randomID)
  this.getAvi()
  var ref = db.ref('users/' + this.state.randomID);
  ref.once("value", (data) =>{
// do some stuff once
  this.setState({randomName: data.val().name})
  this.setState({randomMajor: data.val().major})
});
console.log('Random name:' + this.state.randomName)

}

getAvi = ()=>{
  var storage = firebase.storage().ref();
  storage.child('images/' + this.state.randomID).getDownloadURL().then((url) =>{
    this.setState({avi: url})
    console.log('RANDOM PIC IS ' +this.state.avi)
  })
}

getRandomName = () =>{
  return this.state.randomName
}

getRandomMajor = () =>{
  return this.state.randomMajor
}

matched = ()=>{
  db.ref('matched/' + this.state.currentUser).update({
  [randomUser]: true
  });
  //check if match
  firebase.database().ref(`matched/${this.state.randomID}/${this.state.currentUser}`).once("value", snapshot => {
     if (snapshot.exists())
     {
        console.log("MATCHED ON BOTH SIDES");
        const email = snapshot.val();
        firebase.database().ref(`possible_matches/${this.state.currentUser}/${this.state.randomID}`).remove();

      }
      else{
        firebase.database().ref(`possible_matches/${this.state.currentUser}/${this.state.randomID}`).remove();

      }
  });
}
decline = ()=>{
  firebase.database().ref(`possible_matches/${this.state.currentUser}/${randomUser}`).remove();

}
  render() {
    return (
      <View style={styles.randomInfo}>
      <View style={{flex:1}}>

     <ScrollView style={styles.container}>

     <Image source={{uri:this.state.avi}}
      resizeMode="stretch"
      style={{height:350, width:width}}
      />

      <View style={[styles.row, {marginTop:15}]}>
      <Text style = {{fontSize:19, fontWeight:'400'}}>{this.getRandomName()} </Text>
      <Text style={{fontSize:21, fontWeight:'300', marginBottom:-2}}>23</Text>
      </View>
      <View style={styles.row}>
      <Text style={{color:'#444', fontSize:15}}>{this.getRandomMajor()}</Text>
      </View>
      <View style={styles.row}>
      <Text style={{color:'#777', fontSize:11}}>less than a mile away</Text>
      </View>
      <View style={styles.description}>
      <Text style={{color:'#555'}}>BIO</Text>
      </View>


       </ScrollView>
       </View>


      <Button
   onPress={() => this.matched()}
   title="Match"
   color="#841584"
 />
    <Button
    onPress={() => this.decline()}
    title="Decline"
    color="#841584"
/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  randomInfo:{
    flex: 1
  },

  container: {
    flex: 1,

    backgroundColor: '#f7f7f7',
  },
  row: {
    flexDirection:'row',
    margin:15,
    marginBottom:0,
    marginTop:5,
    alignItems:'flex-end'
  },
  title:{
    fontSize:14,
    fontWeight:'600',
    color:'#333'
  },
  commons:{
    padding:15
  },
  buttons:{
    width:80,
    height:80,
    borderWidth:10,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40
  },
  description:{
    padding:15,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#e3e3e3',
    marginTop:10,
    marginBottom:10
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
