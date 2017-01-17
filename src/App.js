import React, { Component } from 'react';
import Home from './components/Home';
import TalkList from './components/TalkList';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './components/TabBar';

import {
  ScrollView,
} from 'react-native';

import {
  Scene,
  Router,
} from 'react-native-router-flux';

export default class App extends Component {
  render() {
    return (
      <Router style={{ paddingTop: 65 }}>
        <Scene component={Home} title="Top" key="top" />
        <Scene component={TalkList} title="List" key="list" />
      </Router>
    )
  }
}
