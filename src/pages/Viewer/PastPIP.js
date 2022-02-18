import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import OverlayModal from './OverlayModal';

export default class PastPIP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  _onPressItem() {
    this.setState((previousState) => {
      console.log(previousState.show);
      return {
        show: !previousState.show,
      };
    });
  }

  render() {
    const { show } = this.state;
    const { roomName } = this.state;
    return (
      <View style={styles.PIPContainer}>
        <TouchableOpacity
          style={styles.btnPast}
          onPress={() => {
            this._onPressItem();
          }}
        >
          <Text style={styles.MultiText}>Get Multi-live-view!</Text>
        </TouchableOpacity>
        <OverlayModal show={show} roomName={roomName} />
      </View>
    );
  }
}
