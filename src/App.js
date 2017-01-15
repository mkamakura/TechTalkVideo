import React, { Component } from 'react';
import Home from './components/Home';

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
      <ScrollableTabView style={{marginTop: 20, }} renderTabBar={() => <TabBar someProp={'here'} />}>
        <Home tabLabel="New" />
        <Home tabLabel="Favorite" />
      </ScrollableTabView>
    )
  }
}
