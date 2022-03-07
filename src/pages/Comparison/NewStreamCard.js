import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import get from 'lodash/get';
import * as Animatable from 'react-native-animatable';
import { HTTP } from '../../config';
import Video from 'react-native-video';
import { PanGestureHandler, LongPressGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const NewStreamCard = (props) => {
  const { data } = props;
  const roomNameInit = get(data, 'roomName');
  const [roomName, setRoomName] = useState(roomNameInit);
  const [cardOpacity, setCardOpacity] = useState(0);
  const [inputUrl, setInputUrl] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCardOpacity(1);
    }, 1000);

    let inputUrl = '';
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
        inputUrl = `${HTTP}/live/${roomName}.flv`;
        break;
    }
    setInputUrl(inputUrl);
  });

  const renderVideoPlayer = () => {
    return (
      <View>
        <Video
          style={styles.streamCard}
          source={{ uri: inputUrl }}
          muted
          cache
          resizeMode="cover"
        />
      </View>
    );
  };

  const pressed = useSharedValue(false);
  const startingPosition = 100;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      console.log('triggered start!');
      pressed.value = true;
    },
    onActive: (event, ctx) => {
      console.log('triggered Active!');
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: (event, ctx) => {
      console.log('triggered end!');
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      // backgroundColor: pressed.value ? 'white' : 'grey',
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    // <View style={styles.streamCardBackground}>
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.test, uas]} />
      {/* <Animated.View style={[uas, styles.streamCard]}>
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <ImageBackground
              source={require('../../assets/logoBW_icon.png')}
              style={styles.streamCardBackgroundLogo}
            />
          </View>
          <View style={{ opacity: cardOpacity }}>{renderVideoPlayer()}</View>
        </Animated.View> */}
    </PanGestureHandler>
    // </View>
  );
};

const styles = StyleSheet.create({
  test: {
    marginTop: 300, // do not delete
    backgroundColor: 'grey',
    width: 90,
    height: 150,
    position: 'relative',
    marginBottom: 5,
    marginLeft: 5,
  },
  streamCard: {
    width: 90,
    height: 150,
    marginBottom: 5,
    marginLeft: 5,
    position: 'relative',
    zIndex: 200,
  },
  streamCardBackground: {
    width: 100,
    height: 160,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginRight: 15,
    marginTop: 390, // do not delete
  },
  streamCardBackgroundLogo: {
    width: 80,
    height: 80,
    marginTop: 150,
  },
});

export default NewStreamCard;
