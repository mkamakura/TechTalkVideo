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
      <Icon name={this.props.title}
            style={{color: this.props.selected ? Color.darkText : Color.lightText}}
            size={20} />
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

            <Scene key="tab1"  title="home" initial icon={TabIcon} style={styles.contentStyle}
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

            <Scene key="tab2" title="bookmark" icon={TabIcon} style={styles.contentStyle}
                   navigationBarStyle={{backgroundColor: Color.lightBackground}}>
              <Scene key="bookmarks" component={Home} title="bookmarks" />
            </Scene>

            <Scene key="tab3" title="calendar" icon={TabIcon} style={styles.contentStyle}
                   navigationBarStyle={{backgroundColor: Color.lightBackground}}>
              <Scene key="schedule" component={Information} title="Schedule" />
            </Scene>

            <Scene key="tab4" title="info" icon={TabIcon} style={styles.contentStyle}
                   navigationBarStyle={{backgroundColor: Color.lightBackground}}>
              <Scene key="info" component={Information} title="information" />
            </Scene>


          </Scene>

        </RouterWithRedux>
      </Provider>
    );
  }
};

const TAB_HEIGHT = 40;

const styles = StyleSheet.create({
  contentStyle: {
    paddingTop: 64,
    paddingBottom: TAB_HEIGHT,
  },
  tabBarStyle: {
    height: TAB_HEIGHT,
    borderTopWidth: .5,
    borderColor: Color.cellBorder,
    backgroundColor: Color.lightBackground,
    opacity: 1,
  },
  rightText: {
    color: Color.darkText,
  },
  backButton: {
    fontSize: 34,
    paddingRight: 10,
    color: Color.darkText,
  },
});
