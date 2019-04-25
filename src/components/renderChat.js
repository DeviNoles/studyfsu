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


export default class renderChat extends Component {

  constructor(props){
    super(props)
    this.state = {

      loaded: false
    }
  }

  async componentWillMount(){
    await this.getCurrentUser(this.getMatched);
    


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



render() {
  return (
<View>
    {this.state.loaded ? this.content() : null}
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
  height: Dimensions.get('window').width / numColumns, // approximate a square
},
itemInvisible: {
  backgroundColor: 'transparent',
},
itemText: {
  color: '#fff',
},
});
