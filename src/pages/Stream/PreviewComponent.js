import { HTTP } from '../../config';
import { NodePlayerView } from 'react-native-nodemediaclient';
import React from 'react';
import {View, StyleSheet} from 'react-native';


const styles = StyleSheet.create ({
  previewimage: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

const PreviewComponent = props => {
    const roomName = props.data.roomName;
    let inputUrl  = `${HTTP}/live/${roomName}.flv`;
    console.log(props);
    if (props.previewOFF)
      inputUrl = null;
    if (!inputUrl) {
      return null;
    }
    console.log(inputUrl);
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