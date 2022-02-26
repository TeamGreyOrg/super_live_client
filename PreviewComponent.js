import { HTTP } from '../../config';
import { NodePlayerView } from 'react-native-nodemediaclient';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create ({
  previewimage: {
    width: '100%',
    height: '100%'
  },
});

const PreviewComponent = props => {
    const userName = props.userName;
    const inputUrl  = `${HTTP}/live/${userName}.flv`;
    if (!inputUrl) {
      inputUrl = null;
      return null;
    }
    return (
      <View>
        <NodePlayerView
          style={styles.previewimage}
          inputUrl={inputUrl}
          scaleMode="ScaleToFill"
          bufferTime={300}
          maxBufferTime={1000}
          audioEnable={false}
          autoplay
        />
      </View>
    );
  };

export default PreviewComponent;