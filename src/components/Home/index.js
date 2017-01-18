import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../backend/firebase';


export default compose(
  connect(
    (state) => ({
      filter: state.filter,
    }),
  )
)(class Home extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };

    this.itemWidth = (Dimensions.get('window').width) / 2;
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      this.setState({ dataSource: this.ds.cloneWithRows(snapshot.val()) });
    });
  }

  renderRow(data) {
    const filterItems = this.props.filter.items;
    let isMatch = false;
    data.tags.forEach((tag) => filterItems.forEach((item) => tag === item ? isMatch = true : null));

    if (filterItems.length === 0 || isMatch) {
      return (
        <TouchableOpacity
          onPress={() => Actions.list({ title: data.name, playlistid: data.playlistid })}
          style={{ backgroundColor: 'white', width: this.itemWidth, height: 200 }}>
          <Image source={{ uri: data.image }} style={{ flex: 1, justifyContent: 'flex-end' }} >
            <View style={{ opacity: 0.8, }}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}><Icon name="youtube-play" size={18} style={{ color: '#e62117' }} /> {data.name}</Text>
              <Text style={{ textAlign: 'center' }}><Icon name="calendar" size={14} style={{ color: 'blue' }} /> {data.date}</Text>
            </View>
          </Image>
        </TouchableOpacity>
      );
    }

    return null;
  }

  renderHeader(items) {
    if (items.length > 0) {
      return (
        <View style={{ backgroundColor:'#0277BD', height:30, width: Dimensions.get('window').width, justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
          <Text style={{color: 'white',}}><Icon name="filter" /> {items.join(',')}</Text>
        </View>
      );
    }
    return undefined;
  }

  render() {
    const filterItems = this.props.filter.items;
    return (
      <ListView
        id={`conf-list-${filterItems}`}
        enableEmptySections={true}
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        style={{ flex: 1, }}
        dataSource={this.state.dataSource}
        renderHeader={() => this.renderHeader(filterItems)}
        renderRow={(rowData) => this.renderRow(rowData)}
      />
    );
  }
});