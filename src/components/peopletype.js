
import React, { Component } from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthAction from '../actions/auth';

var { height, width } = Dimensions.get('window');

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

class PeopleType extends Component {

  onTypeClicked(type) {
    console.log('type', type);
    Actions.peoplelist();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.onTypeClicked('white')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>White</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTypeClicked('black')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Black</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onTypeClicked('brown')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Brown</Text>
          </View>
        </TouchableOpacity>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PeopleType);
