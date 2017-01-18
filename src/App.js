import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import createStore from './redux/createStore';
import {
  Scene,
  Router,
  Actions,
} from 'react-native-router-flux';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Home from './components/Home';
import TalkList from './components/TalkList';
import Color from './components/common/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { visibleFilter } from './redux/modules/filter';

const RouterWithRedux = connect()(Router);
const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" title="root"
                 navigationBarStyle={{ backgroundColor: Color.lightBackground }}
                 titleStyle={{ color: Color.darkText }}
                 style={styles.navigation}>

            <Scene key="home" component={Home} title="Conferences"
                   renderRightButton={() => (
                     <TouchableOpacity
                       onPress={() => store.dispatch(visibleFilter())}>
                       <Text style={styles.rightText}>FILTER</Text>
                     </TouchableOpacity>)
                   }
            />
            <Scene key="talks" component={TalkList} title="Talks" renderBackButton={() => (
              <TouchableOpacity
                onPress={() => Actions.pop()}>
                <Icon name="angle-left" style={styles.backButton} />
              </TouchableOpacity>
            )} />

          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  navigation: {
    paddingTop: 64,
  },
  rightText: {
    color: Color.darkText,
  },
  backButton: {
    fontSize: 18,
    color: Color.darkText,
  }
});
