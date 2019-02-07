import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, Dimensions, Button} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { createStackNavigator,createAppContainer } from "react-navigation";
import { Avatar } from 'react-native-elements';
import { Container, Row, Col, Grid } from 'react-bootstrap';
import AddClass from './AddClass';
import firebase from "firebase";

var database = firebase.database();
var name

export default class HomeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentID: null,
      currentUser: null,
      currentRandomUser: '',
      major: null,
      image: null
    }
    this.getUserName = this.getUserName.bind(this)
    this.getMajor = this.getMajor.bind(this)
  }

componentWillMount(){
  var user = firebase.auth().currentUser;
  if (user){
    console.log('ID is: ' + user.uid)

    var ref = database.ref('users/' + user.uid);
    ref.once("value", (data) =>{
// do some stuff once
    this.setState({currentID: user.uid})
    this.setState({currentUser: data.val().name})
    this.setState({major: data.val().major})


});
  }
}
  getUserName(){
    return this.state.currentUser
  }

  getMajor(){
    return this.state.major
  }
  editAvi = async () => {
      console.log('wtf')
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        });
        if (!cancelled) {
          this.setState({ image: uri });
  }
        console.log('The image is' + this.state.image)
      };
  uploadImage = async (uri, imageName) => {
    // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  console.log(JSON.stringify(blob, null, 2))

  var ref = firebase.storage().ref().child("images/" + imageName);
  ref.put(blob);
  console.log('After')
  // We're done with the blob, close and release it


}


  render() {

    return (

  <View style={styles.container}>

      <View style={styles.avi}>
      <Avatar
        size="xlarge"
        rounded
        title="DM"
        activeOpacity={0.7}
        onPress={() => this.editAvi()}
      />
      <View style={styles.userName}>
          <Text>{this.getUserName()}</Text>
          <Text>{this.getMajor()}</Text>
          </View>
      </View>
      <View style={styles.userName}>
      <Button
   onPress={() => this.uploadImage(this.state.image, this.state.currentUser)}
   title="Upload"
   color="#841584"
 />
          </View>


      <AddClass/>

</View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom:100,


  },
  avi:{
    paddingVertical: 80,

  },
  userName:{
    margin: 15,
    alignItems: 'center',
    color:'white !important'
  }
});
