
import React, { Component } from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
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

class Init extends Component {
  componentDidMount() {
    setTimeout(() => {
      Actions.main()
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Store List</Text>
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
  headerTitle: {
    fontSize: 48,
    fontWeight: "400",
    color: '#FFF'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Init);
