import React, { Component } from 'react';
import { Router, Reducer, Scene } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthAction from './actions/auth';

import Init from './components/init';
import Main from './components/main';
import PeopleType from './components/peopletype';
import PeopleList from './components/peoplelist';

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

const reducerCreate = params => {
  const defaultReducer = Reducer(params);

  return (state, action) => {
    console.log("ROUTER ACTION: ", action);
    return defaultReducer(state, action);
  }
}

export default class themap extends Component {
  render() {
    return(
      <Router createReducer={reducerCreate}>
        <Scene key="root" hideNavBar>
          <Scene key="init" component={Init} title="Init" />
          <Scene key="main" component={Main} title="Main" type="replace" />
          <Scene key="peopletype" component={PeopleType} title="PeopleType" type="replace" />
          <Scene key="peoplelist" component={PeopleList} title="PeopleList" type="replace" initial />
        </Scene>
      </Router>
    );
  }
}
