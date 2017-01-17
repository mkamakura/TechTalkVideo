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
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TalkList extends Component {

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
    const YOUTUBE_API_KEY = 'AIzaSyCOgdzy8MCs7YAcww8HlZ-Oi_r0QtBMZ5Y';
    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet%2CcontentDetails&maxResults=50&playlistId=${this.props.playlistid}&key=${YOUTUBE_API_KEY}`)
      .then((response) => {
        this.setState({ dataSource: this.ds.cloneWithRows(response.data.items) });
      }).catch((error) => {
        console.error(error);
    });
  }

  renderRow(data) {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + data.contentDetails.videoId)}
        style={{ backgroundColor: 'white', width: this.itemWidth, height: 200 }}>
        <Image source={{ uri: data.snippet.thumbnails.high.url }} style={{ flex: 1, justifyContent: 'flex-end' }} >
          <View style={{ opacity: 0.8, }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}><Icon name="youtube-play" size={18} style={{ color: '#e62117' }} /> {data.snippet.title}</Text>
          </View>
        </Image>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ListView
        enableEmptySections={true}
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        style={{ flex: 1, }}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.renderRow(rowData)}
      />
    );
  }
}
