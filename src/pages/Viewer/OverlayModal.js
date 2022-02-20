import React, { Component } from 'react';
import styles from './styles';
import { NodePlayerView } from 'react-native-nodemediaclient';

export default class OverlayModal extends Component {
  constructor(props) {
    super(props)
  };
  
  render() {
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
