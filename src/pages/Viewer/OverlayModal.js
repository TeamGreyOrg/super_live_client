import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import { RTMP_SERVER } from '../../config';
import test_image from '../../assets/ico_live.png'
import {Image} from 'react-native'
import { NodePlayerView } from 'react-native-nodemediaclient';

export default class OverlayModal extends Component {
  constructor(props) {
    super(props)
  };
  render() {
    const show = this.props.show;
    let multiUrl = ``;
    if (this.props.roomName == '1'){
      multiUrl = `${RTMP_SERVER}/live/2`;
    }
    else{
      multiUrl = `${RTMP_SERVER}/live/3`;
    }
    if (show){
      return (
        <View  style={styles.Modalcontainer}>
          <Image source={test_image} style={styles.LiveImage}/>
       </View>
      );
    }
    else {
      return (
          <NodePlayerView
          style={styles.PIP}
          ref={(vb) => {
            this.nodePlayerView = vb;
          }}
          inputUrl={multiUrl}
          scaleMode="ScaleAspectFit"
          bufferTime={300}
          maxBufferTime={1000}
          autoplay
        />
      );
    }
  }
}

/*
<NodePlayerView
        style={styles.PIP}
        ref={(vb) => {
          this.nodePlayerView = vb;
        }}
        inputUrl={multiUrl}
        scaleMode="ScaleAspectFit"
        bufferTime={300}
        maxBufferTime={1000}
        autoplay
      />
      */