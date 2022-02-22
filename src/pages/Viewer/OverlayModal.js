import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { NodePlayerView } from 'react-native-nodemediaclient';
import styles from './styles';
import { RTMP_SERVER } from '../../config';
import TestImage from '../../assets/ico_live.png';

export default class OverlayModal extends Component {
  render() {
    const { show, roomName } = this.props;
    let multiUrl = ``;
    if (roomName === '1') {
      multiUrl = `${RTMP_SERVER}/live/2`;
    } else {
      multiUrl = `${RTMP_SERVER}/live/3`;
    }
    if (show) {
      return (
        <View style={styles.Modalcontainer}>
          <Image source={TestImage} style={styles.LiveImage} />
        </View>
      );
    }

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

OverlayModal.propTypes = {
  show: PropTypes.bool,
  roomName: PropTypes.string,
};

OverlayModal.defaultProps = {
  show: true,
  roomName: '',
};

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
