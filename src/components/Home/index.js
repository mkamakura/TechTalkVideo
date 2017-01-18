import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../backend/firebase';

import { initFilter } from '../../redux/modules/filter';
import FilterModal from '../FilterModal';
import Color from '../common/Colors';

export default compose(
  connect(
    (state) => ({
      filter: state.filter,
    }),
    (dispatch) => ({
      initFilter: (names) => dispatch(initFilter({ names })),
    }),
  )
)(class Home extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };


    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      const confs = snapshot.val();
      const filterMaster = [];
      this.setState({ dataSource: this.ds.cloneWithRows(snapshot.val()) });
      confs.forEach((conf) =>
        conf.tags.forEach((tag) =>
          !filterMaster.includes(tag) && filterMaster.push(tag)));
      this.props.initFilter(filterMaster);
    });
  }

  renderRow(data, filters) {
    let isMatch = false;
    if (filters.length === 0) isMatch = true;
    if (!isMatch) data.tags.forEach((tag) => filters.forEach((item) => tag === item && (isMatch = true)));

    if (isMatch) {
      return (
        <TouchableOpacity
          onPress={() => Actions.talks({ title: data.name, playlistid: data.playlistid })}
          style={styles.confItem}>
          <Image source={{ uri: data.image }} style={styles.confItemImage} >
            <View style={styles.confItemInfoArea}>
              <Text style={styles.confItemInfoAreaTitle}>
                <Icon name="youtube-play" style={styles.confItemInfoAreaTitleIcon} /> {data.name}
              </Text>
              <Text style={styles.confItemInfoAreaDate}>
                <Icon name="calendar" style={styles.confItemInfoAreaDateIcon} /> {data.date}
              </Text>
            </View>
          </Image>
        </TouchableOpacity>
      );
    }

    return null;
  }

  renderHeader(filters) {
    return (
      <View style={styles.filterArea}>
        <Text style={styles.filterAreaText} ellipsizeMode="tail" numberOfLines={1}>
          <Icon name="filter" style={styles.filterAreaTextIcon}/> {filters.join(', ')}
        </Text>
      </View>
    );
  }

  render() {
    const { visible, selected } = this.props.filter;
    return (
      <View style={styles.root}>
        <ListView
          id={`conf-list-${selected.length}`}
          enableEmptySections={true}
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          dataSource={this.state.dataSource}
          renderHeader={() => selected.length > 0 && this.renderHeader(selected)}
          renderRow={(rowData) => this.renderRow(rowData, selected)}
        />
        {visible && <FilterModal />}
      </View>
    );
  }
});

const deviceWidth = Dimensions.get('window').width;
const itemWidth = (Dimensions.get('window').width) / 2;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  filterArea: {
    height: 30,
    width: deviceWidth,

    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,

    borderTopColor: Color.cellBorder,
    borderBottomColor: Color.cellBorder,
    backgroundColor: Color.darkBackground,
  },
  filterAreaText: {
    color: 'white',
    fontStyle: 'italic',
  },
  filterAreaTextIcon: {
    fontSize: 18,
  },

  confItem: {
    backgroundColor: 'white',
    width: itemWidth,
    height: 200,
  },
  confItemImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  confItemInfoArea: {
    opacity: 0.8,
  },
  confItemInfoAreaTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confItemInfoAreaTitleIcon: {
    color: Color.youtube,
    fontSize: 18,
  },
  confItemInfoAreaDate: {
    textAlign: 'center',
  },
  confItemInfoAreaDateIcon: {
    color: Color.calender,
    fontSize: 14,
  }

});
