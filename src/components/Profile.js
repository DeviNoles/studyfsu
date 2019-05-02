import React, { Component } from 'react';
import {StyleSheet,View, Image, KeyboardAvoidingView, Text, Dimensions, Button,TextInput, TouchableOpacity} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { createStackNavigator,createAppContainer } from "react-navigation";
import { Avatar } from 'react-native-elements';
import { Container, Row, Col, Grid } from 'react-bootstrap';
import AddClass from './AddClass';
import Bio from './Bio';
import Edit from './Edit'
import firebase from "firebase";
var database = firebase.database();
import Modal from "react-native-modal";

export default class HomeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentID: null,
      currentUser: null,
      currentRandomUser: '',
      major: null,
      avi: '',
      height: null,
      bio: null,
      isModalVisible: false,
      isEditModalVisible: false
    }
    this.getUserName = this.getUserName.bind(this)
    this.getMajor = this.getMajor.bind(this)
    this.getCurrentBio = this.getCurrentBio.bind(this)
  }
componentWillMount(){
  var user = firebase.auth().currentUser;
  if (user){
    var ref = database.ref('users/' + user.uid);
    ref.on("value", (data) =>{
// do some stuff once
    this.setState({currentID: user.uid})
    this.setState({currentUser: data.val().name})
    this.setState({major: data.val().major})
    this.setState({bio: data.val().bio})
    this.getAvi()
});
  }
}

  getUserName(){
    return this.state.currentUser
  }
  getMajor(){
    return this.state.major
  }
  getCurrentBio(){
    return this.state.bio
  }

getAvi = ()=>{
  var storage = firebase.storage().ref();
  storage.child('images/' + this.state.currentID).getDownloadURL().then((url) =>{
    this.setState({avi: url})
    console.log(this.state.avi)
  })
}

toggleModal = () =>{
   this.setState({ isModalVisible: !this.state.isModalVisible });
   console.log('Modal Toggled')
   this.setState({modal: 'on'})
   console.log('Refreshed')
   this.getAvi()
}

toggleEditModal = () =>{
   this.setState({ isEditModalVisible: !this.state.isEditModalVisible });
   console.log('Modal Toggled')
   console.log('Refreshed')
   this.getAvi()
}
  render() {
    return (

  <View style={styles.container}>

  <View style={styles.profile}>
      <View style={styles.avi}>
      <Avatar
        size="xlarge"
        rounded
        activeOpacity={0.7}
        source={{uri:this.state.avi}}
        onPress={() => this.toggleEditModal()}
        showEditButton
      />
      <View style={styles.userName}>
          <Text style={{color: 'white'}}>{this.state.currentUser}</Text>
          <Text style={{color: 'white'}}>{this.state.major}</Text>
          </View>
</View>
      </View>

          <Modal
          onBackdropPress={() => this.toggleModal()}
          isVisible={this.state.isModalVisible}>
         <View style={styles.modalContainer}>
           <Text>Your Classes:</Text>
           <AddClass/>
           <TouchableOpacity onPress={this.toggleModal}>
             <Text>Exit</Text>
           </TouchableOpacity>
         </View>
       </Modal>

      <TouchableOpacity
               style={styles.classesbutton}
               onPress={() => this.toggleModal()}>
               <Text style={{color: 'white'}}>
               Classes
              </Text>
        </TouchableOpacity>

        <Modal
        isVisible={this.state.isEditModalVisible}
        onBackdropPress={() => this.toggleEditModal()}>
        <View>
           <Edit/>
           <TouchableOpacity onPress={this.toggleModal}>

           </TouchableOpacity>
           </View>
       </Modal>

      <View style={styles.bio}>
      <Text style={{color: 'white'}}>Your Bio:</Text>
      </View>
      <View style={styles.bioInfo}>
      <Text style={{color: 'white'}}>
      {this.getCurrentBio()}
      </Text>


      </View>



</View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom:100,
    flex: 1
  },
  avi:{
    paddingVertical: 80,
  },
  userName:{
    margin: 15,
    alignItems: 'center',
    color:'white !important'
  },
  profile:{

    height: 300
  },
  bio:{

    marginTop: 40,
    textAlign: 'left',
    textAlign: 'left',
    width: 350,
    padding:15,
    borderBottomWidth:1,
    borderColor:'#e3e3e3',
    marginTop:10,
    marginBottom:10

  },
  bioInfo: {
    paddingVertical: 10,
    textAlign: 'left',
    textAlign: 'left',
    width: 350,
    padding:15,
    borderBottomWidth:1,
    borderColor:'#e3e3e3',
    marginTop:10,
    marginBottom:10
  },
  editbutton: {
    position: 'absolute',
      left: 0,
      bottom: 10,
      marginRight: 0,
      marginLeft: 10,
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: 'green',
      borderRadius: 10,
      borderColor: 'white',
  },
  classesbutton: {
      position: 'absolute',
        right: 0,
        bottom: 10,
        marginRight: 0,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        backgroundColor: 'rgb(120,47,65)',
        borderRadius: 10,
        borderColor: 'white',

  },

  modalContainer:{
  flex: 1,
   alignItems: "center",
   backgroundColor: 'rgb(206,184,136)',
   padding: 25,
   margin: 0,
   borderRadius: 4,
   borderColor: "rgba(0, 0, 0, 0.1)",
 },
 editModalContainer:{
 flex: 1,
  alignItems: "center",
  backgroundColor: 'rgb(206,184,136)',
  margin: 0,
  borderRadius: 4,
  borderColor: "rgba(0, 0, 0, 0.1)",
},




});
