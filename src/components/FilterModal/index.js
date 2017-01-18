import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';

import { addFilter, removeFilter, clearFilter, visibleFilter } from '../../redux/modules/filter';
import Color from '../common/Colors';

export default compose(
  connect(
    (state) => ({
      filter: state.filter,
    }),
    (dispatch) => ({
      addFilter: (name) => dispatch(addFilter({ name })),
      removeFilter: (name) => dispatch(removeFilter({ name })),
      clearFilter: () => dispatch(clearFilter()),
      visibleFilter: () => dispatch(visibleFilter()),
    }),
  )
)(class FilterModal extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows(['JavaScript', 'CSS', 'Node.js', 'Google', 'Facebook']),
    };

    this.width = Dimensions.get('window').width;
    this.height = Dimensions.get('window').height;
  }

  renderRow(data, id, selected) {
    const { removeFilter, addFilter } = this.props;
    const style =
      selected.includes(data) ? { backgroundColor: Color.tagColor[id] } : {borderColor: Color.tagColor[id], borderWidth: 1};

    return (
      <TouchableHighlight style={styles.listAreaRow}
                          onPress={() => selected.includes(data) ? removeFilter(data) : addFilter(data)}>
        <View style={styles.listAreaView}>
          <View style={[styles.checkbox, style]} />
          <Text style={styles.listAreaText}>{data}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      visibleFilter,
      clearFilter,
      filter
    } = this.props;

    return (
      <Modal
        animationDuration={300}
        swipeThreshold={100}
        position={"bottom"}
        isOpen={true}
        onClosed={this.props.visibleFilter}
        style={styles.root}
        swipeToClose={false}
        swipeArea={0}
      >
        <View style={styles.header}>
          <Text onPress={visibleFilter}>CANCEL</Text>
          <Text onPress={clearFilter}>CLEAR</Text>
        </View>
        <ListView
          key={`filter-list-${filter.selected.length}`}
          contentContainerStyle={{ flexWrap: 'wrap' }}
          style={{ backgroundColor: '#0277BD', }}
          dataSource={this.state.dataSource}
          renderRow={(rowData, secid, rowId) => this.renderRow(rowData, rowId, filter.selected)}
        />
      </Modal>
    );
  }
});

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const modalHeight = deviceHeight / 2;
const SIZE = 24;

const styles = StyleSheet.create({
  root: {
    height: modalHeight,
  },

  header: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  listArea: {
    backgroundColor: Color.darkBackground,
  },
  listAreaRow: {
    width: deviceWidth,
    height: 50,

    flex: 1,

    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  listAreaView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  listAreaText: {
    color: 'white',
    fontStyle: 'italic',
    flex: 1,
  },
  checkbox: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    marginRight: 10,
    marginLeft: 10,
  },
});
