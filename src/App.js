import React, { Component } from 'react';
import Home from './components/Home';
import TalkList from './components/TalkList';
import FilterModal from './components/FilterModal';

import { connect, Provider } from 'react-redux';
import createStore from './redux/createStore';

import {
  ScrollView,
} from 'react-native';

import {
  Scene,
  Router,
  Route,
  TabBar,
  Actions,
  Modal,
} from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="modal" component={Modal} >
            <Scene key="root"  title="Tab #1" navigationBarStyle={{backgroundColor:'#B3E5FC',}} titleStyle={{color:'#01579B'}} style={{ paddingTop: 64 }}>
              <Scene key="tab1_1" component={Home} title="Conferences"
                     onRight={() => Actions.FilterModal({ message: 'hogehoge', hide: false })}
                     rightTitle="FILTER" />
              <Scene key="list" component={TalkList} title="Tab #1_2" titleStyle={{color:'#01579B'}}/>
            </Scene>
            <Scene key="FilterModal" component={FilterModal} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
