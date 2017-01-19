import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import createStore from './redux/createStore';
import {
  Scene,
  Router,
  Actions,
  ActionConst,
  TabBar,
  Modal,
} from 'react-native-router-flux';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Home from './components/Home';
import TalkList from './components/TalkList';
import Information from './components/Information';

import Color from './components/common/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { visibleFilter } from './redux/modules/filter';

const RouterWithRedux = connect()(Router);
const store = createStore();

class TabIcon extends React.Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? Color.darkText : Color.lightText}}>{this.props.title}</Text>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>

          <Scene key="tabbar" title="root" tabs
                 navigationBarStyle={{ backgroundColor: Color.lightBackground }}
                 style={styles.tabBarStyle}>

            <Scene key="tab1"  title="Confs" initial icon={TabIcon} style={{paddingTop: 64, paddingBottom: 35}}
                   navigationBarStyle={{backgroundColor: Color.lightBackground}} >
              <Scene key="home" component={Home} title="Conferences" titleStyle={{ color: Color.darkText }} renderRightButton={() => (
                <TouchableOpacity onPress={() => store.dispatch(visibleFilter())}>
                  <Text style={styles.rightText}>FILTER</Text>
                </TouchableOpacity>)} />

              <Scene key="talks" component={TalkList} title="Talks" renderBackButton={() => (
                <TouchableOpacity onPress={() => Actions.pop()}>
                  <Icon name="angle-left" style={styles.backButton} />
                </TouchableOpacity>)} />
            </Scene>

            <Scene key="tab2"  title="Info" icon={TabIcon} style={{paddingTop: 64, paddingBottom: 35}}
                   navigationBarStyle={{backgroundColor: Color.lightBackground}}>
              <Scene key="info" component={Information} title="information" />
            </Scene>

          </Scene>

        </RouterWithRedux>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 35,
    borderTopWidth: .5,
    borderColor: Color.cellBorder,
    backgroundColor: Color.lightBackground,
    opacity: 1,
  },
  rightText: {
    color: Color.darkText,
  },
  backButton: {
    fontSize: 18,
    color: Color.darkText,
  },
});
