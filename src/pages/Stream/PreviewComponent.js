import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { HTTP } from '../../config';
import get from 'lodash/get';
import { NodePlayerView } from 'react-native-nodemediaclient';

const styles = StyleSheet.create({
  previewimage: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

class PreviewComponent extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const roomName = get(data, 'roomName');

    this.state = {
      inputUrl: null,
    };

    this.roomName = roomName;
  }

  componentDidMount() {
    let inputUrl = '';

    switch (this.roomName) {
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
        inputUrl = `${HTTP}/live/${this.roomName}.flv`;
        break;
    }
    this.setState({ inputUrl: inputUrl });
  }

  componentWillUnmount() {
    if (this.nodePlayerView) this.nodePlayerView.stop();
  }

  render() {
    // if (!props.preview) inputUrl = null;
    if (!this.state.inputUrl) {
      return null;
    }
    return (
      <NodePlayerView
        style={styles.previewimage}
        inputUrl={this.state.inputUrl}
        ref={(vb) => {
          this.nodePlayerView = vb;
        }}
        scaleMode="ScaleToFill"
        bufferTime={300}
        maxBufferTime={1000}
        audioEnable={false}
        autoplay
      />
    );
  }
}

export default PreviewComponent;
