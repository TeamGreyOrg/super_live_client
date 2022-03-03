import { NodePlayerView } from 'react-native-nodemediaclient';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HTTP } from '../../config';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  previewimage: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

const PreviewComponent = (props) => {
  const { roomName } = props.data;
  let inputUrl = null;
  switch (roomName) {
    case '페루산 애플망고 당일출고':
      inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy001/index.m3u8`;
      break;
    case '국산 무농약 작두콩차':
      inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy002/index.m3u8`;
      break;
    case '안다르 레깅스':
      inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy003/index.m3u8`;
      break;
    case '모니터 받침대 끝판왕':
      inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy004/index.m3u8`;
      break;
    case '새학기 노트북 구매하세요':
      inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy005/index.m3u8`;
      break;
    case '페퍼민트티 25개 할인':
      inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy006/index.m3u8`;
      break;
    default:
      inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/${roomName}/index.m3u8`;
      //inputUrl = `${HTTP}/live/${roomName}.flv`;
      break;
  }
  if (!props.preview) inputUrl = null;
  if (!inputUrl) {
    return null;
  }
  return (
    <View>
      <Video
        style={styles.previewimage}
        source={{ uri: inputUrl }}
        muted={true}
        resizeMode="cover"
      />
    </View>
  );
};

export default PreviewComponent;
