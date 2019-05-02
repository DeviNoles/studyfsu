import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Dimensions, TouchableOpacity} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { NavigationActions, withNavigation } from 'react-navigation';
import Modal from "react-native-modal";
import ChatScreen from "./ChatScreen"

import firebase from "firebase"
const numColumns = 2;
var ind = -1;
export default class ChatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isModalVisible: false,
        }
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


componentWillMount() {

      console.log(this.props.nameArray.length)
      console.log(this.props.nameArray)
      console.log(this.props.majorArray.length)
      console.log(this.props.majorArray)


    }

    componentWillReceiveProps(props) {
      console.log(this.props.nameArray)
      console.log(this.props.majorArray)
      //  this.setState({dataSource: this.getDataSource(props.nameArray)});
    }

    toggleModal = () =>{
      console.log('Modal Toggled')
       this.setState({ isModalVisible: !this.state.isModalVisible });

       this.setState({modal: 'on'})
       console.log('Refreshed')
    }

    renderItem = ({ item, index }) => {
       if (item.empty === true) {
         return <View style={[styles.item, styles.itemInvisible]} />;
       }
       ind++
       return (
         <TouchableOpacity
         onPress={()=>this.toggleModal()}
         style={styles.item}
         >


           <Text style={styles.itemText}>{item.key}</Text>
           <Text style={styles.itemText}>{this.props.majorArray[ind]['key']}</Text>


          </TouchableOpacity>

       );
     };

     render() {
       return (
         <View>
         <Modal
         onBackdropPress={() => this.toggleModal()}
         isVisible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ChatScreen
          user = {this.props.user}
          />
        </View>
      </Modal>

      
         <FlatList
           data={this.formatData(this.props.nameArray, numColumns)}
           style={styles.container}
           renderItem={this.renderItem}
           numColumns={numColumns}
         />

</View>
       );
     }
}

const styles = StyleSheet.create({
  container: {

    marginVertical: 100,
  },
  item: {
    backgroundColor: 'rgb(120,47,65)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
