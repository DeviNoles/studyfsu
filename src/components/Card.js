import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, TextInput, Button} from 'react-native';
import { createStackNavigator,createAppContainer } from "react-navigation";
import Swiper from 'react-native-swiper';
import firebase from "firebase";
var db = firebase.database();
var randomUser
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.getUserID(),
      randomMajor: null,
      randomName: null,
      randomID: '',
      randomavi:''
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



getRandomID = (callbac)=>{
  var ref = db.ref('possible_matches/' + this.state.currentUser);
  // Attach an asynchronous callback to read the data at posts reference
  ref.on("value",
  (data) =>{
    var allStudents = data.val();
    try {
      var keys = Object.keys(allStudents);
      randomUser = keys[Math.floor(Math.random()*keys.length)];
      console.log(randomUser)
      this.setState({randomID: randomUser})

      return this.state.randomID

    }
    catch (e){
       console.log(e)
    }
    finally{

    }
},
function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}
componentWillMount(){
  this.getRandomID();
}

setData = () => {
  console.log('When setData is called' + this.state.randomID)
  var ref = db.ref('users/' + this.state.randomID);
  console.log(ref)
  ref.once("value", (data) =>{
// do some stuff once
  this.setState({randomName: data.val().name})
  this.setState({randomMajor: data.val().major})
});
}
getRandomName = () =>{

  return this.state.randomName
}
getRandomMajor = () =>{
  return this.state.randomMajor
}
matched(){
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
        this.getRandomID();
      }
      else{
        firebase.database().ref(`possible_matches/${this.state.currentUser}/${this.state.randomID}`).remove();
        this.getRandomID();
      }
  });
}
decline(){
  firebase.database().ref(`possible_matches/${this.state.currentUser}/${randomUser}`).remove();
  this.getRandomID();
}
  render() {
    return (
      <View style={styles.randomInfo}>
      <Text>
      Here
      {this.getRandomName()}
      {this.getRandomMajor()}
      </Text>
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
  container: {
    flex: 1
  },
  randomInfo:{
    flex: 1
  }
});
