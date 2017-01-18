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
} from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';

import { filterAdd, filterRemove } from '../../redux/modules/filter';

export default compose(
  connect(
    (state) => ({
      filter: state.filter,
    }),
    (dispatch) => ({
      addFilter: (name) => dispatch(filterAdd({ name })),
      removeFilter: (name) => dispatch(filterRemove({ name })),
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
    this.dismissModal = this.dismissModal.bind(this)
  }

  dismissModal() {
    Actions.refresh({ hide: true });
  }

  renderRow(data) {
    return (
      <TouchableHighlight style={{ width: this.width, height: 50, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                          onPress={() => this.props.filter.items.includes(data) ? this.props.removeFilter(data) : this.props.addFilter(data)}>
        <Text style={{ color: "white", paddingLeft: 10, fontStyle: 'italic' }}>
          <Icon name={this.props.filter.items.includes(data) ? 'circle' : 'circle-o'} size={18} style={{ color: this.props.filter.items.includes(data) ? '#FF80AB' : 'white', paddingRight: 5}} /> {data}
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    const { filter } = this.props;

    if(this.props.hide){
      return (
        <View>
        </View>
      )
    } else {
      return (
        <Modal
          animationDuration={300}
          swipeThreshold={100}
          position={"bottom"}
          isOpen={!this.state.hide}
          onClosed={this.dismissModal}
          style={{height: this.height / 2}}
          swipeToClose={false}
          swipeArea={0}
        >
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text onPress={this.dismissModal}>CANCEL</Text>
            <Text>CLEAR</Text>
          </View>
          <ListView
            key={`filter-list-${filter.items.length}`}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
            style={{ backgroundColor: '#0277BD', }}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
        </Modal>
      );
    }
  }
});
