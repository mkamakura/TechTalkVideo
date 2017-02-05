import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  Dimensions,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ActionSheetIOS,
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-spinkit';
import firebase from '../../backend/firebase';

import { initFilter } from '../../redux/modules/filter';
import { addBookmark, removeBookmark, initBookmark } from '../../redux/modules/bookmark';
import FilterModal from '../FilterModal';
import Color from '../common/Colors';

export default compose(
  connect(
    (state) => ({
      filter: state.filter,
      bookbark: state.bookmark,
    }),
    (dispatch) => ({
      initFilter: (names) => dispatch(initFilter({ names })),
      onAddBookmark: (name) => dispatch(addBookmark({ name })),
      removeBookmark: (name) => dispatch(removeBookmark({ name })),
      initBookmark: () => dispatch(initBookmark()),
    }),
  )
)(class Home extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };

    this.itemWidth = deviceWidth / 2 > 200 ? 200 : deviceWidth / 2;
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

    this.props.initBookmark();
  }

  onLongPress(name) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Bookmark', 'Cancel'],
      cancelButtonIndex: 1,
      title: name
    }, (buttonIndex) => this.props.onAddBookmark(name));
  }

  renderRow(data, filterTags) {
    let isMatch = false;
    if (filterTags.length === 0) isMatch = true;
    if (!isMatch) data.tags.forEach((confTag) => filterTags.forEach((filterTag) => confTag === filterTag.name && (isMatch = true)));

    if (isMatch) {
      return (
        <TouchableOpacity
          onPress={() => Actions.talks({ title: data.name, playlistid: data.playlistid })}
          onLongPress={() => this.onLongPress(data.name)}
          style={[styles.confItem, { width: this.itemWidth }]}>
          <Image source={{ uri: data.image }} style={styles.confItemImage} indicator={ProgressBar}>
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

  renderHeader(tags) {
    return (
      <View style={styles.filterArea}>
        <Text style={styles.filterAreaText} ellipsizeMode="tail" numberOfLines={1}>
          <Icon name="filter" style={styles.filterAreaTextIcon}/> {tags.map((tag) => tag.name).join(', ')}
        </Text>
      </View>
    );
  }

  changeLayout() {
    this.itemWidth = deviceWidth / 2 > 200 ? 200 : deviceWidth / 2;
  }

  render() {
    const { visible, tags } = this.props.filter;
    const filterTags = tags.filter((tag) => tag.selected);

    return (
      <View style={styles.root} onLayout={() => this.changeLayout()}>
        <Spinner style={styles.spinner}
                 isVisible={this.state.dataSource.getRowCount() === 0}
                 size={50}
                 type='Pulse'
                 color='white' />
        <ListView
          enableEmptySections={true}
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}
          dataSource={this.state.dataSource}
          renderHeader={() => filterTags.length > 0 && this.renderHeader(filterTags)}
          renderRow={(rowData) => this.renderRow(rowData, filterTags)}
        />
        {visible && <FilterModal />}
      </View>
    );
  }
});

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.darkBackground,
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
  },

  spinner: {
    marginTop: 50,
    marginLeft: deviceWidth / 2 - 25,
  },

});
