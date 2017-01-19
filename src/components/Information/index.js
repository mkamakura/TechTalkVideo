import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ListView,
} from 'react-native';
import Color from '../common/Colors';

import firebaes from '../../backend/firebase';

export default compose(
  connect(
    (state) => ({

    }),
  ),
)(class Information extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([
        {
          date: '2017/1/1',
          title: 'Happy New Year 2017!',
          message: 'hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge',
        },
        {
          date: '2017/1/1',
          title: 'Happy New Year 2017!',
          message: 'hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge',
        },
        {
          date: '2017/1/1',
          title: 'Happy New Year 2017!',
          message: 'hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge',
        },
        {
          date: '2017/1/1',
          title: 'Happy New Year 2017!',
          message: 'hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge',
        },
        {
          date: '2017/1/1',
          title: 'Happy New Year 2017!',
          message: 'hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge',
        },
        {
          date: '2017/1/1',
          title: 'Happy New Year 2017!',
          message: 'hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge hoge',
        },
      ]),
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    // TODO firebaseから取ってくる
  }

  renderRow(data) {
    return (
      <View style={styles.listRow}>
        <Text>{data.date}</Text>
        <Text>{data.title}</Text>
        <Text>{data.message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.root}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listRow: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: Color.cellBorder,
  },
});

