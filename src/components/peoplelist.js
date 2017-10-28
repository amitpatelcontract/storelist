
import React, { Component } from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  ListView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthAction from '../actions/auth';

import * as firebase from 'firebase';
const ListItem = require('../widgets/listitem');

var { height, width } = Dimensions.get('window');

const firebaseConfig = {
    apiKey: "AIzaSyBvs6P55nmLqK5RzsXgUR41XC3lh1AJOgs",
    authDomain: "malefemale-4559a.firebaseapp.com",
    databaseURL: "https://malefemale-4559a.firebaseio.com",
    projectId: "malefemale-4559a",
    storageBucket: "malefemale-4559a.appspot.com",
    messagingSenderId: "786987413406"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// map redux store to props
function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

// map actions to props
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      Auth: bindActionCreators(AuthAction, dispatch),
    }
  }
}

class PeopleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef('people');
  }

  getRef(childId) {
    return firebaseApp.database().ref().child(childId);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        alert(child.val().name);
        items.push({
          title: child.val().name,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  onAddClicked() {
    console.log('add');
  }

  render() {
    return (
      <View style={styles.container}> 
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
        <TouchableOpacity onPress={() => this.onAddClicked()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

      const onPress = () => {
        AlertIOS.alert(
          'Complete',
          null,
          [
            {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
            {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
          ]
        );
      };

      return (
        <ListItem item={item} onPress={onPress} />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#042313'
  },
  button: {
    width: width / 2,
    borderColor: 'white',
    borderWidth: 2,
    margin: 10,
    padding: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
