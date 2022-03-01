import { NodePlayerView } from 'react-native-nodemediaclient';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HTTP } from '../../config';

const styles = StyleSheet.create({
  previewimage: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

const PreviewComponent = (props) => {
  const { roomName } = props.data;
  let inputUrl = `${HTTP}/live/${roomName}.flv`;
  if (!props.preview) inputUrl = null;
  // console.log(inputUrl);
  if (!inputUrl) {
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
