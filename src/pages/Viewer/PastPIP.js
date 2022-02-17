import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import OverlayModal from './OverlayModal.js'

export default class PastPIP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  _onPressItem() {
    this.setState((previousState) => {
    console.log(previousState.show)
      return ({
        show: !previousState.show,
      })
    });
  }

  render() {
    return (
      <View style={styles.PIPcontainer}>
        <TouchableOpacity style={styles.btnPast} onPress={() => {this._onPressItem()}}>
            <Text style={styles.MultiText}>
              Get Multi-live-view!
            </Text>
        </TouchableOpacity>
        <OverlayModal show={this.state.show} roomName={this.props.roomName}/>
      </View>
    );

  }
}