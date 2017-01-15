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

import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../backend/firebase';

export default class Home extends Component {

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
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(data.url)}
        style={{ backgroundColor: 'white', width: this.itemWidth, height: 200 }}>
          <Image source={{ uri: data.image }} style={{ flex: 1, justifyContent: 'flex-end' }} >
            <View style={{ opacity: 0.8, }}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}><Icon name="youtube-play" size={18} style={{ color: '#e62117' }} /> {data.name}</Text>
              <Text style={{ textAlign: 'center' }}><Icon name="calendar" size={14} style={{ color: 'blue' }} /> {data.date}</Text>
            </View>
          </Image>
               </TouchableOpacity>
    )
  }

  render() {
    return (
      <ListView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        style={{ flex: 1, }}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.renderRow(rowData)}
      />
    );
  }
}
